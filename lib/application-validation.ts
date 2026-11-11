import { APPLICATION_LIMITS, APPLICATION_MESSAGES, fieldError, localizedOption } from "@/lib/application-form";
import type {
  ApplicationAnswerSnapshot,
  ApplicationFieldError,
  ApplicationQuestion,
} from "@/types";

export type ApplicationValidationResult =
  | { ok: true; answers: ApplicationAnswerSnapshot[] }
  | { ok: false; fieldErrors: Record<string, ApplicationFieldError> };

function cleanText(value: string) {
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
}

function singleLine(value: string) {
  return cleanText(value).trim().replace(/\s+/g, " ");
}

function isEmptyValue(raw: unknown) {
  if (raw === undefined || raw === null) return true;
  if (typeof raw === "string") return raw.trim() === "";
  if (Array.isArray(raw)) return raw.length === 0;
  if (typeof raw === "boolean") return raw === false;
  return false;
}

function optionSnapshot(question: ApplicationQuestion, optionId: string) {
  const option = question.options.find((item) => item.id === optionId);
  if (!option) return null;
  return {
    displayTr: localizedOption(option, "tr"),
    displayEn: localizedOption(option, "en"),
  };
}

export function validateApplicationAnswers(
  questions: ApplicationQuestion[],
  rawAnswers: Record<string, unknown>,
): ApplicationValidationResult {
  const fieldErrors: Record<string, ApplicationFieldError> = {};
  const answers: ApplicationAnswerSnapshot[] = [];

  for (const question of questions) {
    if (answers.length >= APPLICATION_LIMITS.maxQuestions) break;
    const raw = Object.prototype.hasOwnProperty.call(rawAnswers, question.id) ? rawAnswers[question.id] : undefined;

    if (isEmptyValue(raw)) {
      if (question.required) {
        fieldErrors[question.id] = fieldError(question.type === "checkboxes" ? "CHECKBOX_REQUIRED" : question.type === "consent" ? "CONSENT_REQUIRED" : "REQUIRED");
      }
      continue;
    }

    let value: ApplicationAnswerSnapshot["value"];
    let displayTr: string;
    let displayEn: string;

    switch (question.type) {
      case "shortText":
      case "email":
      case "phone":
      case "url": {
        if (typeof raw !== "string") {
          fieldErrors[question.id] = fieldError("INVALID_VALUE");
          continue;
        }
        let text = question.type === "shortText" ? singleLine(raw) : cleanText(raw).trim();
        if (text.length === 0) {
          if (question.required) fieldErrors[question.id] = fieldError("REQUIRED");
          continue;
        }
        const limit = question.type === "shortText"
          ? APPLICATION_LIMITS.shortText
          : question.type === "email"
            ? APPLICATION_LIMITS.email
            : question.type === "phone"
              ? APPLICATION_LIMITS.phone
              : APPLICATION_LIMITS.url;
        if (text.length > limit) {
          fieldErrors[question.id] = fieldError("TOO_LONG");
          continue;
        }
        if (question.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
          fieldErrors[question.id] = fieldError("INVALID_EMAIL");
          continue;
        }
        if (question.type === "phone") {
          const digits = text.replace(/\D/g, "");
          if (!/^[+0-9()\s.\-]+$/.test(text) || digits.length < 7 || digits.length > 15) {
            fieldErrors[question.id] = fieldError("INVALID_PHONE");
            continue;
          }
        }
        if (question.type === "url") {
          try {
            const parsed = new URL(text);
            if (parsed.protocol !== "http:" && parsed.protocol !== "https:") throw new Error("Invalid protocol");
            text = parsed.toString();
          } catch {
            fieldErrors[question.id] = fieldError("INVALID_URL");
            continue;
          }
        }
        value = text;
        displayTr = text;
        displayEn = text;
        break;
      }
      case "longText": {
        if (typeof raw !== "string") {
          fieldErrors[question.id] = fieldError("INVALID_VALUE");
          continue;
        }
        const text = cleanText(raw).replace(/\r\n?/g, "\n").trim();
        if (text.length === 0) {
          if (question.required) fieldErrors[question.id] = fieldError("REQUIRED");
          continue;
        }
        if (text.length > APPLICATION_LIMITS.longText) {
          fieldErrors[question.id] = fieldError("TOO_LONG");
          continue;
        }
        value = text;
        displayTr = text;
        displayEn = text;
        break;
      }
      case "number": {
        const text = typeof raw === "number" ? String(raw) : typeof raw === "string" ? singleLine(raw) : "";
        if (!text || !Number.isFinite(Number(text))) {
          fieldErrors[question.id] = fieldError("INVALID_NUMBER");
          continue;
        }
        if (text.length > APPLICATION_LIMITS.number) {
          fieldErrors[question.id] = fieldError("TOO_LONG");
          continue;
        }
        const number = Number(text);
        if (number < -1_000_000_000 || number > 1_000_000_000) {
          fieldErrors[question.id] = fieldError("INVALID_NUMBER");
          continue;
        }
        value = number;
        displayTr = String(number);
        displayEn = String(number);
        break;
      }
      case "date": {
        if (typeof raw !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(raw.trim())) {
          fieldErrors[question.id] = fieldError("INVALID_DATE");
          continue;
        }
        const text = raw.trim();
        const date = new Date(`${text}T00:00:00.000Z`);
        if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== text) {
          fieldErrors[question.id] = fieldError("INVALID_DATE");
          continue;
        }
        value = text;
        displayTr = text;
        displayEn = text;
        break;
      }
      case "select":
      case "radio": {
        if (typeof raw !== "string") {
          fieldErrors[question.id] = fieldError("INVALID_VALUE");
          continue;
        }
        const option = optionSnapshot(question, raw);
        if (!option) {
          fieldErrors[question.id] = fieldError("INVALID_OPTION");
          continue;
        }
        value = raw;
        displayTr = option.displayTr;
        displayEn = option.displayEn;
        break;
      }
      case "checkboxes": {
        const list = Array.isArray(raw) ? raw : typeof raw === "string" ? [raw] : null;
        if (!list || list.some((item) => typeof item !== "string")) {
          fieldErrors[question.id] = fieldError("INVALID_VALUE");
          continue;
        }
        const uniqueIds = [...new Set(list as string[])];
        if (uniqueIds.length === 0) {
          if (question.required) fieldErrors[question.id] = fieldError("CHECKBOX_REQUIRED");
          continue;
        }
        const snapshots = uniqueIds.map((id) => optionSnapshot(question, id));
        if (snapshots.some((item) => item === null)) {
          fieldErrors[question.id] = fieldError("INVALID_OPTION");
          continue;
        }
        const valid = snapshots as Array<{ displayTr: string; displayEn: string }>;
        value = uniqueIds;
        displayTr = valid.map((item) => item.displayTr).join(", ");
        displayEn = valid.map((item) => item.displayEn).join(", ");
        break;
      }
      case "consent": {
        if (raw !== true && raw !== "true") {
          if (question.required) fieldErrors[question.id] = fieldError("CONSENT_REQUIRED");
          continue;
        }
        value = true;
        displayTr = APPLICATION_MESSAGES.approved.tr;
        displayEn = APPLICATION_MESSAGES.approved.en;
        break;
      }
      case "file": {
        if (typeof raw !== "string") {
          fieldErrors[question.id] = fieldError("INVALID_FILE");
          continue;
        }
        const text = raw.trim();
        if (text.length === 0) {
          if (question.required) fieldErrors[question.id] = fieldError("REQUIRED");
          continue;
        }
        if (text.length > APPLICATION_LIMITS.url) {
          fieldErrors[question.id] = fieldError("TOO_LONG");
          continue;
        }
        try {
          const parsed = new URL(text);
          const pathname = parsed.pathname.toLowerCase();
          const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".avif"];
          const allowedExtensions = question.id === "default-payment-receipt"
            ? [...imageExtensions, ".pdf"]
            : imageExtensions;
          if (
            parsed.protocol !== "https:" ||
            !parsed.hostname.endsWith(".public.blob.vercel-storage.com") ||
            !parsed.pathname.startsWith("/applications/") ||
            !allowedExtensions.some((extension) => pathname.endsWith(extension))
          ) {
            throw new Error("Invalid uploaded file URL");
          }
          value = parsed.toString();
          displayTr = parsed.toString();
          displayEn = parsed.toString();
        } catch {
          fieldErrors[question.id] = fieldError("INVALID_FILE");
          continue;
        }
        break;
      }
      default: {
        fieldErrors[question.id] = fieldError("INVALID_VALUE");
        continue;
      }
    }

    answers.push({
      questionId: question.id,
      questionLabelTr: question.labelTr,
      questionLabelEn: question.labelEn || question.labelTr,
      questionType: question.type,
      value,
      displayTr,
      displayEn,
      sortOrder: question.sortOrder,
    });
  }

  if (Object.keys(fieldErrors).length > 0) return { ok: false, fieldErrors };
  return { ok: true, answers };
}
