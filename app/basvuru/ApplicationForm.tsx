"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode, RefObject } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import {
  APPLICATION_LIMITS,
  APPLICATION_MESSAGES,
  localizedOption,
  localizedText,
  pickMessage,
  questionTypeLabel,
  type LocalizedMessage,
} from "@/lib/application-form";
import { validateApplicationAnswers } from "@/lib/application-validation";
import type {
  ApplicationFieldError,
  ApplicationFormDefinition,
  ApplicationQuestion,
  Locale,
} from "@/types";

type AnswerValue = string | string[] | boolean;
type FormValues = Record<string, AnswerValue>;
type FormStatus = "idle" | "submitting" | "success" | "closed" | "notReady";
type FormError = { message: LocalizedMessage; retryAfterSeconds?: number };
type ApiPayload = {
  ok?: boolean;
  code?: string;
  messageTr?: string;
  messageEn?: string;
  fieldErrors?: unknown;
  retryAfterSeconds?: number;
};

const FIELD_PREFIX = "application-";
const choiceClassName = "mt-0.5 h-4 w-4 shrink-0 accent-[#4EFEBE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]";
const labelClassName = "mb-2 block text-sm font-medium text-white";

function fieldId(questionId: string) {
  return `${FIELD_PREFIX}${questionId}`;
}

function optionControlId(questionId: string, optionId: string) {
  return `${FIELD_PREFIX}${questionId}-${optionId}`;
}

function controlClassName(invalid: boolean) {
  return `w-full rounded-lg border bg-[#0C0C0C] px-3 py-2.5 text-white placeholder:text-white/40 transition-colors [color-scheme:dark] focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent ${invalid ? "border-red-500/70" : "border-[#2A2A2A]"}`;
}

function initialValues(questions: ApplicationQuestion[]): FormValues {
  const next: FormValues = {};
  for (const question of questions) {
    next[question.id] = question.type === "checkboxes" ? [] : question.type === "consent" ? false : "";
  }
  return next;
}

function createSubmissionKey() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

function parseFieldErrors(value: unknown): Record<string, ApplicationFieldError> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const errors: Record<string, ApplicationFieldError> = {};
  for (const [questionId, entry] of Object.entries(value as Record<string, unknown>)) {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) continue;
    const candidate = entry as { code?: unknown; messageTr?: unknown; messageEn?: unknown };
    if (typeof candidate.messageTr !== "string" || typeof candidate.messageEn !== "string") continue;
    errors[questionId] = {
      code: (typeof candidate.code === "string" ? candidate.code : "INVALID_VALUE") as ApplicationFieldError["code"],
      messageTr: candidate.messageTr,
      messageEn: candidate.messageEn,
    };
  }
  return errors;
}

function responseMessage(payload: ApiPayload | null): LocalizedMessage {
  if (payload && typeof payload.messageTr === "string" && typeof payload.messageEn === "string") {
    return { tr: payload.messageTr, en: payload.messageEn };
  }
  return APPLICATION_MESSAGES.genericError;
}

function focusFirstInvalid(questions: ApplicationQuestion[], errors: Record<string, ApplicationFieldError>) {
  const first = questions.find((question) => Boolean(errors[question.id]));
  if (!first) return;
  window.requestAnimationFrame(() => {
    const direct = document.getElementById(fieldId(first.id));
    if (direct instanceof HTMLElement) {
      direct.focus();
      return;
    }
    const named = document.getElementsByName(first.id)[0];
    if (named instanceof HTMLElement) named.focus();
  });
}

function RequiredMark({ locale }: { locale: Locale }) {
  return (
    <>
      <span aria-hidden="true" className="text-accent"> *</span>
      <span className="sr-only">{pickMessage(APPLICATION_MESSAGES.required, locale)}</span>
    </>
  );
}

function FieldMessages({
  baseId,
  help,
  error,
  locale,
}: {
  baseId: string;
  help: string;
  error?: ApplicationFieldError;
  locale: Locale;
}) {
  return (
    <>
      {help ? (
        <p id={`${baseId}-help`} className="mt-1.5 text-xs leading-relaxed text-[#AAAAAA] sm:text-sm">
          {help}
        </p>
      ) : null}
      {error ? (
        <p id={`${baseId}-error`} role="alert" className="mt-1.5 text-xs font-medium text-red-300 sm:text-sm">
          {pickMessage({ tr: error.messageTr, en: error.messageEn }, locale)}
        </p>
      ) : null}
    </>
  );
}

function ApplicationField({
  question,
  locale,
  value,
  error,
  onChange,
}: {
  question: ApplicationQuestion;
  locale: Locale;
  value: AnswerValue | undefined;
  error?: ApplicationFieldError;
  onChange: (value: AnswerValue) => void;
}) {
  const baseId = fieldId(question.id);
  const label = localizedText(locale, question.labelTr, question.labelEn) || questionTypeLabel(question.type, locale);
  const help = localizedText(locale, question.helpTr, question.helpEn);
  const hasError = Boolean(error);
  const describedBy = [help ? `${baseId}-help` : null, error ? `${baseId}-error` : null].filter(Boolean).join(" ") || undefined;
  const labelContent = (
    <>
      {label}
      {question.required ? <RequiredMark locale={locale} /> : null}
    </>
  );
  const messages = <FieldMessages baseId={baseId} help={help} error={error} locale={locale} />;

  switch (question.type) {
    case "select":
      return (
        <div>
          <label htmlFor={baseId} className={labelClassName}>{labelContent}</label>
          <select
            id={baseId}
            name={question.id}
            value={typeof value === "string" ? value : ""}
            onChange={(event) => onChange(event.target.value)}
            required={question.required}
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy}
            className={controlClassName(hasError)}
          >
            <option value="">{pickMessage(APPLICATION_MESSAGES.selectPlaceholder, locale)}</option>
            {question.options.map((option) => (
              <option key={option.id} value={option.id} className="bg-[#121212] text-white">
                {localizedOption(option, locale) || option.id}
              </option>
            ))}
          </select>
          {messages}
        </div>
      );

    case "longText":
      return (
        <div>
          <label htmlFor={baseId} className={labelClassName}>{labelContent}</label>
          <textarea
            id={baseId}
            name={question.id}
            rows={5}
            maxLength={APPLICATION_LIMITS.longText}
            value={typeof value === "string" ? value : ""}
            onChange={(event) => onChange(event.target.value)}
            required={question.required}
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy}
            className={controlClassName(hasError)}
          />
          {messages}
        </div>
      );

    case "shortText":
    case "email":
    case "phone":
    case "number":
    case "date":
    case "url": {
      const inputType =
        question.type === "shortText" ? "text"
          : question.type === "phone" ? "tel"
            : question.type;
      const maxLength =
        question.type === "shortText" ? APPLICATION_LIMITS.shortText
          : question.type === "email" ? APPLICATION_LIMITS.email
            : question.type === "phone" ? APPLICATION_LIMITS.phone
              : question.type === "url" ? APPLICATION_LIMITS.url
                : undefined;
      const autoComplete =
        question.type === "email" ? "email"
          : question.type === "phone" ? "tel"
            : question.type === "url" ? "url"
              : undefined;
      const inputMode =
        question.type === "email" ? "email"
          : question.type === "phone" ? "tel"
            : question.type === "number" ? "decimal"
              : question.type === "url" ? "url"
                : undefined;

      return (
        <div>
          <label htmlFor={baseId} className={labelClassName}>{labelContent}</label>
          <input
            id={baseId}
            type={inputType}
            name={question.id}
            value={typeof value === "string" ? value : ""}
            onChange={(event) => onChange(event.target.value)}
            maxLength={maxLength}
            step={question.type === "number" ? "any" : undefined}
            autoComplete={autoComplete}
            inputMode={inputMode}
            required={question.required}
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy}
            className={controlClassName(hasError)}
          />
          {messages}
        </div>
      );
    }

    case "radio": {
      const selected = typeof value === "string" ? value : "";
      return (
        <fieldset className="min-w-0" aria-invalid={hasError || undefined} aria-describedby={describedBy}>
          <legend className={labelClassName}>{labelContent}</legend>
          <div className="space-y-2">
            {question.options.map((option) => {
              const controlId = optionControlId(question.id, option.id);
              return (
                <label key={option.id} htmlFor={controlId} className="flex cursor-pointer items-start gap-3 rounded-lg border border-[#2A2A2A] bg-[#0C0C0C] p-3 transition-colors hover:border-white/25">
                  <input
                    id={controlId}
                    type="radio"
                    name={question.id}
                    value={option.id}
                    checked={selected === option.id}
                    onChange={() => onChange(option.id)}
                    required={question.required}
                    aria-describedby={describedBy}
                    className={choiceClassName}
                  />
                  <span className="text-sm text-white">{localizedOption(option, locale) || option.id}</span>
                </label>
              );
            })}
          </div>
          {messages}
        </fieldset>
      );
    }

    case "checkboxes": {
      const selected = Array.isArray(value) ? value : [];
      return (
        <fieldset className="min-w-0">
          <legend className={labelClassName}>{labelContent}</legend>
          <div className="space-y-2">
            {question.options.map((option) => {
              const controlId = optionControlId(question.id, option.id);
              return (
                <label key={option.id} htmlFor={controlId} className="flex cursor-pointer items-start gap-3 rounded-lg border border-[#2A2A2A] bg-[#0C0C0C] p-3 transition-colors hover:border-white/25">
                  <input
                    id={controlId}
                    type="checkbox"
                    name={question.id}
                    value={option.id}
                    checked={selected.includes(option.id)}
                    onChange={(event) => {
                      const next = event.target.checked
                        ? [...selected, option.id]
                        : selected.filter((item) => item !== option.id);
                      onChange(next);
                    }}
                    aria-invalid={hasError || undefined}
                    aria-describedby={describedBy}
                    className={choiceClassName}
                  />
                  <span className="text-sm text-white">{localizedOption(option, locale) || option.id}</span>
                </label>
              );
            })}
          </div>
          {messages}
        </fieldset>
      );
    }

    case "consent":
      return (
        <div>
          <label htmlFor={baseId} className="flex cursor-pointer items-start gap-3 rounded-lg border border-[#2A2A2A] bg-[#0C0C0C] p-4 transition-colors hover:border-white/25">
            <input
              id={baseId}
              type="checkbox"
              name={question.id}
              checked={value === true}
              onChange={(event) => onChange(event.target.checked)}
              required={question.required}
              aria-invalid={hasError || undefined}
              aria-describedby={describedBy}
              className={choiceClassName}
            />
            <span className="text-sm leading-relaxed text-white">{labelContent}</span>
          </label>
          {messages}
        </div>
      );

    default:
      return null;
  }
}

function StatusPanel({
  title,
  body,
  locale,
  headingRef,
  children,
}: {
  title: LocalizedMessage;
  body: LocalizedMessage;
  locale: Locale;
  headingRef?: RefObject<HTMLHeadingElement | null>;
  children?: ReactNode;
}) {
  return (
    <div role="status" className="mt-8 rounded-xl border border-white/10 bg-[#121212] p-6 text-center sm:mt-10 sm:p-10">
      <h2 ref={headingRef} tabIndex={-1} className="text-xl font-semibold text-white outline-none sm:text-2xl">
        {pickMessage(title, locale)}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-[#AAAAAA] sm:text-base">{pickMessage(body, locale)}</p>
      {children}
    </div>
  );
}

export default function ApplicationForm({ form }: { form: ApplicationFormDefinition }) {
  const { locale } = useLanguage();
  const [values, setValues] = useState<FormValues>(() => initialValues(form.questions));
  const [fieldErrors, setFieldErrors] = useState<Record<string, ApplicationFieldError>>({});
  const [formError, setFormError] = useState<FormError | null>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [honeypot, setHoneypot] = useState("");
  const [submissionKey, setSubmissionKey] = useState(createSubmissionKey);
  const statusHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === "success" || status === "closed" || status === "notReady") {
      statusHeadingRef.current?.focus();
    }
  }, [status]);

  function updateValue(questionId: string, value: AnswerValue) {
    setValues((current) => ({ ...current, [questionId]: value }));
    setFieldErrors((current) => {
      if (!current[questionId]) return current;
      const next = { ...current };
      delete next[questionId];
      return next;
    });
  }

  function resetForm() {
    setValues(initialValues(form.questions));
    setFieldErrors({});
    setFormError(null);
    setHoneypot("");
    setSubmissionKey(createSubmissionKey());
    setStatus("idle");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    setFormError(null);
    setFieldErrors({});

    const validation = validateApplicationAnswers(form.questions, values);
    if (!validation.ok) {
      setFieldErrors(validation.fieldErrors);
      setFormError({ message: APPLICATION_MESSAGES.validationSummary });
      focusFirstInvalid(form.questions, validation.fieldErrors);
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, submissionKey, _mvExtra: honeypot, answers: values }),
      });
      const payload = (await response.json().catch(() => null)) as ApiPayload | null;

      if (response.ok) {
        setStatus("success");
        return;
      }

      if (payload?.code === "FORM_CLOSED") {
        setStatus("closed");
        return;
      }

      if (payload?.code === "FORM_NOT_READY") {
        setStatus("notReady");
        return;
      }

      if (payload?.code === "RATE_LIMITED") {
        const seconds =
          typeof payload.retryAfterSeconds === "number" && Number.isFinite(payload.retryAfterSeconds) && payload.retryAfterSeconds > 0
            ? Math.ceil(payload.retryAfterSeconds)
            : undefined;
        setFormError({ message: APPLICATION_MESSAGES.rateLimited, retryAfterSeconds: seconds });
        setStatus("idle");
        return;
      }

      if (payload?.code === "VALIDATION_ERROR") {
        const errors = parseFieldErrors(payload.fieldErrors);
        setFieldErrors(errors);
        setFormError({ message: APPLICATION_MESSAGES.validationSummary });
        setStatus("idle");
        focusFirstInvalid(form.questions, errors);
        return;
      }

      setFormError({ message: responseMessage(payload) });
      setStatus("idle");
    } catch {
      setFormError({ message: APPLICATION_MESSAGES.genericError });
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <StatusPanel
        title={APPLICATION_MESSAGES.successTitle}
        body={APPLICATION_MESSAGES.successBody}
        locale={locale}
        headingRef={statusHeadingRef}
      >
        <button
          type="button"
          onClick={resetForm}
          className="mt-6 rounded-lg bg-accent px-6 py-2.5 font-medium text-[#0C0C0C] transition-colors hover:bg-[#4EFEBE]/90"
        >
          {pickMessage(APPLICATION_MESSAGES.newResponse, locale)}
        </button>
      </StatusPanel>
    );
  }

  if (status === "closed") {
    return (
      <StatusPanel
        title={APPLICATION_MESSAGES.closedTitle}
        body={APPLICATION_MESSAGES.closedBody}
        locale={locale}
        headingRef={statusHeadingRef}
      />
    );
  }

  if (status === "notReady") {
    return (
      <StatusPanel
        title={APPLICATION_MESSAGES.notReadyTitle}
        body={APPLICATION_MESSAGES.notReadyBody}
        locale={locale}
        headingRef={statusHeadingRef}
      />
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-busy={status === "submitting"}
      className="relative mt-8 rounded-xl border border-white/10 bg-[#121212] p-5 sm:mt-10 sm:p-8"
    >
      <div className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden" aria-hidden="true">
        <input
          type="text"
          name="_mvExtra"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="h-px w-px border-0 p-0"
        />
      </div>

      {formError ? (
        <div role="alert" className="mb-6 rounded-lg border border-red-500/40 bg-red-950/40 p-4 text-sm text-red-200">
          <p>{pickMessage(formError.message, locale)}</p>
          {formError.retryAfterSeconds ? (
            <p className="mt-1 text-red-300/90">
              {locale === "tr"
                ? `${formError.retryAfterSeconds} saniye sonra tekrar deneyebilirsiniz.`
                : `You can try again in ${formError.retryAfterSeconds} seconds.`}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="space-y-6">
        {form.questions.map((question) => (
          <ApplicationField
            key={question.id}
            question={question}
            locale={locale}
            value={values[question.id]}
            error={fieldErrors[question.id]}
            onChange={(value) => updateValue(question.id, value)}
          />
        ))}
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={status === "submitting"}
          aria-busy={status === "submitting"}
          className="w-full rounded-lg bg-accent px-8 py-3 font-medium text-[#0C0C0C] transition-colors hover:bg-[#4EFEBE]/90 disabled:opacity-70 sm:w-auto"
        >
          {pickMessage(status === "submitting" ? APPLICATION_MESSAGES.submitting : APPLICATION_MESSAGES.submit, locale)}
        </button>
      </div>
    </form>
  );
}
