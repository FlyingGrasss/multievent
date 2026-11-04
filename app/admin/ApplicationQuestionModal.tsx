"use client";

import { useRef, useState } from "react";
import AdminModal from "@/app/admin/AdminModal";
import { saveApplicationQuestion } from "@/app/admin/application-actions";
import {
  APPLICATION_LIMITS,
  APPLICATION_QUESTION_TYPES,
  APPLICATION_QUESTION_TYPE_META,
  isOptionQuestionType,
  questionTypeLabel,
} from "@/lib/application-form";
import type {
  ApplicationQuestion,
  ApplicationQuestionInput,
  ApplicationQuestionType,
} from "@/types";

type Props = {
  question?: ApplicationQuestion;
  onClose: () => void;
  onSaved: (question: ApplicationQuestion) => void;
};

type OptionDraft = {
  key: string;
  id?: string;
  labelTr: string;
  labelEn: string;
};

const TITLE_ID = "application-question-modal-title";

export default function ApplicationQuestionModal({ question, onClose, onSaved }: Props) {
  const nextOptionKey = useRef(0);
  const [type, setType] = useState<ApplicationQuestionType>(question?.type ?? "shortText");
  const [labelTr, setLabelTr] = useState(question?.labelTr ?? "");
  const [labelEn, setLabelEn] = useState(question?.labelEn ?? "");
  const [helpTr, setHelpTr] = useState(question?.helpTr ?? "");
  const [helpEn, setHelpEn] = useState(question?.helpEn ?? "");
  const [required, setRequired] = useState(question?.required ?? false);
  const [options, setOptions] = useState<OptionDraft[]>(() => {
    const existing: OptionDraft[] = (question?.options ?? []).map((option) => ({
      key: option.id,
      id: option.id,
      labelTr: option.labelTr,
      labelEn: option.labelEn,
    }));
    const minimum = question ? APPLICATION_QUESTION_TYPE_META[question.type].minOptions : 0;
    while (existing.length < minimum) {
      existing.push({ key: `new:option:seed:${existing.length}`, labelTr: "", labelEn: "" });
    }
    return existing;
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  function makeEmptyOption(): OptionDraft {
    return { key: `new:option:${nextOptionKey.current++}`, labelTr: "", labelEn: "" };
  }

  function changeType(nextType: ApplicationQuestionType) {
    setType(nextType);
    setError("");
    const minimum = APPLICATION_QUESTION_TYPE_META[nextType].minOptions;
    if (isOptionQuestionType(nextType) && options.length < minimum) {
      const seeded = [...options];
      while (seeded.length < minimum) seeded.push(makeEmptyOption());
      setOptions(seeded);
    }
  }

  function updateOption(index: number, field: "labelTr" | "labelEn", value: string) {
    setOptions((current) =>
      current.map((option, optionIndex) => (optionIndex === index ? { ...option, [field]: value } : option)),
    );
  }

  function removeOption(index: number) {
    setOptions((current) => current.filter((_, optionIndex) => optionIndex !== index));
  }

  function moveOption(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= options.length) return;
    const next = [...options];
    const [option] = next.splice(index, 1);
    next.splice(target, 0, option);
    setOptions(next);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSaving) return;
    setError("");

    if (!labelTr.trim()) {
      setError("Soru metni (TR) zorunludur.");
      return;
    }

    const optionType = isOptionQuestionType(type);
    const minimum = APPLICATION_QUESTION_TYPE_META[type].minOptions;
    const visibleOptions = optionType
      ? options.filter((option) => option.labelTr.trim() || option.labelEn.trim())
      : [];
    if (optionType && visibleOptions.length < minimum) {
      setError(
        minimum === 1
          ? "Bu soru türü için en az bir seçenek ekleyin."
          : "Bu soru türü için en az iki seçenek ekleyin.",
      );
      return;
    }

    const submittedOptions: ApplicationQuestionInput["options"] = visibleOptions.map((option) =>
      option.id
        ? { id: option.id, labelTr: option.labelTr.trim(), labelEn: option.labelEn.trim() }
        : { labelTr: option.labelTr.trim(), labelEn: option.labelEn.trim() },
    );
    const input: ApplicationQuestionInput = {
      ...(question ? { id: question.id } : {}),
      type,
      labelTr: labelTr.trim(),
      labelEn: labelEn.trim(),
      helpTr: helpTr.trim(),
      helpEn: helpEn.trim(),
      required,
      options: submittedOptions,
    };

    setIsSaving(true);
    try {
      const result = await saveApplicationQuestion(input);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      onSaved(result.data);
      onClose();
    } catch {
      setError("Soru kaydedilemedi.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <AdminModal
      titleId={TITLE_ID}
      onClose={onClose}
      pending={isSaving}
      maxWidthClassName="max-w-3xl"
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 id={TITLE_ID} className="text-2xl font-bold">
            {question ? "Soruyu düzenle" : "Yeni soru"}
          </h2>
          {question && (
            <p className="mt-1 text-sm text-white/50">Bu soru güncellendiğinde geçmiş yanıtlar korunur.</p>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          disabled={isSaving}
          aria-label="Kapat"
          className="cursor-pointer text-2xl text-white/60 hover:text-white disabled:cursor-default disabled:opacity-50"
        >
          ×
        </button>
      </div>

      {error && (
        <p role="alert" className="mb-4 rounded-lg bg-red-950 p-3 text-sm text-red-200">
          {error}
        </p>
      )}

      <form onSubmit={submit} noValidate>
        <fieldset disabled={isSaving} className="m-0 min-w-0 space-y-4 border-0 p-0">
          <label htmlFor="application-question-type" className="block text-sm">
            <span className="mb-1 block text-white/70">Soru türü</span>
            <select
              id="application-question-type"
              value={type}
              onChange={(event) => changeType(event.target.value as ApplicationQuestionType)}
              className="w-full rounded-lg border border-white/15 bg-black p-3 outline-none focus:border-accent"
            >
              {APPLICATION_QUESTION_TYPES.map((questionType) => (
                <option key={questionType} value={questionType}>
                  {questionTypeLabel(questionType, "tr")}
                </option>
              ))}
            </select>
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label htmlFor="application-question-label-tr" className="block text-sm">
              <span className="mb-1 block text-white/70">
                Soru metni (TR) <span className="text-accent">*</span>
              </span>
              <input
                id="application-question-label-tr"
                value={labelTr}
                onChange={(event) => {
                  setLabelTr(event.target.value);
                  setError("");
                }}
                required
                aria-invalid={error === "Soru metni (TR) zorunludur." ? true : undefined}
                maxLength={APPLICATION_LIMITS.label}
                className="w-full rounded-lg border border-white/15 bg-black p-3 outline-none focus:border-accent"
              />
            </label>
            <label htmlFor="application-question-label-en" className="block text-sm">
              <span className="mb-1 block text-white/70">Soru metni (EN)</span>
              <input
                id="application-question-label-en"
                value={labelEn}
                onChange={(event) => setLabelEn(event.target.value)}
                maxLength={APPLICATION_LIMITS.label}
                className="w-full rounded-lg border border-white/15 bg-black p-3 outline-none focus:border-accent"
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label htmlFor="application-question-help-tr" className="block text-sm">
              <span className="mb-1 block text-white/70">Yardım metni (TR)</span>
              <textarea
                id="application-question-help-tr"
                value={helpTr}
                onChange={(event) => setHelpTr(event.target.value)}
                rows={2}
                maxLength={APPLICATION_LIMITS.help}
                className="w-full rounded-lg border border-white/15 bg-black p-3 outline-none focus:border-accent"
              />
            </label>
            <label htmlFor="application-question-help-en" className="block text-sm">
              <span className="mb-1 block text-white/70">Yardım metni (EN)</span>
              <textarea
                id="application-question-help-en"
                value={helpEn}
                onChange={(event) => setHelpEn(event.target.value)}
                rows={2}
                maxLength={APPLICATION_LIMITS.help}
                className="w-full rounded-lg border border-white/15 bg-black p-3 outline-none focus:border-accent"
              />
            </label>
          </div>

          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={required}
              onChange={(event) => setRequired(event.target.checked)}
              className="h-5 w-5 cursor-pointer accent-[#4EFEBE]"
            />
            <span className="text-white/80">Zorunlu alan</span>
          </label>

          {isOptionQuestionType(type) && (
            <div className="rounded-xl border border-white/10 bg-[#121212] p-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-medium">Seçenekler</h3>
                  <p className="text-xs text-white/50">
                    {type === "checkboxes"
                      ? "Çoklu seçim için en az bir seçenek gerekir."
                      : "Bu soru türü için en az iki seçenek gerekir."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (options.length >= APPLICATION_LIMITS.maxOptions) return;
                    const option = makeEmptyOption();
                    setOptions((current) => [...current, option]);
                    setError("");
                  }}
                  disabled={options.length >= APPLICATION_LIMITS.maxOptions}
                  className="cursor-pointer rounded-lg border border-white/20 px-3 py-2 text-sm hover:border-accent hover:text-accent disabled:cursor-default disabled:opacity-50"
                >
                  Seçenek ekle
                </button>
              </div>

              {options.length === 0 ? (
                <p className="rounded-lg border border-dashed border-white/15 p-4 text-center text-sm text-white/50">
                  Henüz seçenek yok.
                </p>
              ) : (
                <ul className="space-y-3">
                  {options.map((option, index) => (
                    <li
                      key={option.key}
                      className="rounded-lg border border-white/10 bg-black/40 p-3"
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <span className="w-6 shrink-0 text-xs text-white/40">{index + 1}.</span>
                        <div className="grid min-w-0 flex-1 gap-2 sm:grid-cols-2">
                          <input
                            value={option.labelTr}
                            onChange={(event) => updateOption(index, "labelTr", event.target.value)}
                            maxLength={APPLICATION_LIMITS.optionLabel}
                            placeholder="Türkçe seçenek"
                            aria-label={`${index + 1}. seçenek (TR)`}
                            className="w-full rounded-lg border border-white/15 bg-black p-2 text-sm outline-none focus:border-accent"
                          />
                          <input
                            value={option.labelEn}
                            onChange={(event) => updateOption(index, "labelEn", event.target.value)}
                            maxLength={APPLICATION_LIMITS.optionLabel}
                            placeholder="English option"
                            aria-label={`${index + 1}. seçenek (EN)`}
                            className="w-full rounded-lg border border-white/15 bg-black p-2 text-sm outline-none focus:border-accent"
                          />
                        </div>
                        <div className="flex shrink-0 gap-1">
                          <button
                            type="button"
                            onClick={() => moveOption(index, -1)}
                            disabled={index === 0}
                            aria-label={`${index + 1}. seçeneği yukarı taşı`}
                            className="cursor-pointer rounded border border-white/20 px-2 py-1 disabled:cursor-default disabled:opacity-30"
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            onClick={() => moveOption(index, 1)}
                            disabled={index === options.length - 1}
                            aria-label={`${index + 1}. seçeneği aşağı taşı`}
                            className="cursor-pointer rounded border border-white/20 px-2 py-1 disabled:cursor-default disabled:opacity-30"
                          >
                            ↓
                          </button>
                          <button
                            type="button"
                            onClick={() => removeOption(index)}
                            aria-label={`${index + 1}. seçeneği kaldır`}
                            className="cursor-pointer rounded border border-red-400/40 px-2 py-1 text-red-300 hover:bg-red-950"
                          >
                            Kaldır
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </fieldset>

        <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="cursor-pointer rounded-lg border border-white/20 px-4 py-2 disabled:cursor-default disabled:opacity-60"
          >
            Vazgeç
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="cursor-pointer rounded-lg bg-accent px-5 py-2 font-semibold text-black disabled:cursor-default disabled:opacity-60"
          >
            {isSaving ? "Kaydediliyor…" : "Kaydet"}
          </button>
        </div>
      </form>
    </AdminModal>
  );
}
