"use client";

import { useState } from "react";
import { saveApplicationSettings } from "@/app/admin/application-actions";
import { APPLICATION_LIMITS } from "@/lib/application-form";
import type { ApplicationSettings } from "@/types";

type Props = {
  settings: ApplicationSettings;
  onSaved: (settings: ApplicationSettings) => void;
};

export default function ApplicationSettingsPanel({ settings, onSaved }: Props) {
  const [draft, setDraft] = useState<ApplicationSettings>({ ...settings });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const dirty =
    draft.titleTr !== settings.titleTr ||
    draft.titleEn !== settings.titleEn ||
    draft.descriptionTr !== settings.descriptionTr ||
    draft.descriptionEn !== settings.descriptionEn ||
    draft.isOpen !== settings.isOpen;

  function update<K extends keyof ApplicationSettings>(key: K, value: ApplicationSettings[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    setError("");
    setSuccess("");
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSaving) return;
    setIsSaving(true);
    setError("");
    setSuccess("");
    try {
      const result = await saveApplicationSettings({
        titleTr: draft.titleTr,
        titleEn: draft.titleEn,
        descriptionTr: draft.descriptionTr,
        descriptionEn: draft.descriptionEn,
        isOpen: draft.isOpen,
      });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setDraft({ ...result.data });
      onSaved(result.data);
      setSuccess("Form ayarları kaydedildi.");
    } catch {
      setError("Form ayarları kaydedilemedi.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-[#121212] p-4 sm:p-6">
      <div className="mb-5">
        <h3 className="text-xl font-semibold">Form ayarları</h3>
        <p className="text-sm text-white/50">Formun başlığını, açıklamasını ve başvuru durumunu yönetin.</p>
      </div>

      {error && (
        <p role="alert" className="mb-4 rounded-lg bg-red-950 p-3 text-sm text-red-200">
          {error}
        </p>
      )}
      {success && (
        <p role="status" className="mb-4 rounded-lg bg-emerald-950 p-3 text-sm text-emerald-200">
          {success}
        </p>
      )}

      <form onSubmit={submit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label htmlFor="application-title-tr" className="block text-sm">
            <span className="mb-1 block text-white/70">Form başlığı (TR)</span>
            <input
              id="application-title-tr"
              value={draft.titleTr}
              onChange={(event) => update("titleTr", event.target.value)}
              maxLength={APPLICATION_LIMITS.title}
              disabled={isSaving}
              className="w-full rounded-lg border border-white/15 bg-black p-3 outline-none focus:border-accent disabled:opacity-60"
            />
          </label>
          <label htmlFor="application-title-en" className="block text-sm">
            <span className="mb-1 block text-white/70">Form başlığı (EN)</span>
            <input
              id="application-title-en"
              value={draft.titleEn}
              onChange={(event) => update("titleEn", event.target.value)}
              maxLength={APPLICATION_LIMITS.title}
              disabled={isSaving}
              className="w-full rounded-lg border border-white/15 bg-black p-3 outline-none focus:border-accent disabled:opacity-60"
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label htmlFor="application-description-tr" className="block text-sm">
            <span className="mb-1 block text-white/70">Açıklama (TR)</span>
            <textarea
              id="application-description-tr"
              value={draft.descriptionTr}
              onChange={(event) => update("descriptionTr", event.target.value)}
              rows={5}
              maxLength={APPLICATION_LIMITS.description}
              disabled={isSaving}
              className="w-full rounded-lg border border-white/15 bg-black p-3 outline-none focus:border-accent disabled:opacity-60"
            />
          </label>
          <label htmlFor="application-description-en" className="block text-sm">
            <span className="mb-1 block text-white/70">Açıklama (EN)</span>
            <textarea
              id="application-description-en"
              value={draft.descriptionEn}
              onChange={(event) => update("descriptionEn", event.target.value)}
              rows={5}
              maxLength={APPLICATION_LIMITS.description}
              disabled={isSaving}
              className="w-full rounded-lg border border-white/15 bg-black p-3 outline-none focus:border-accent disabled:opacity-60"
            />
          </label>
        </div>

        <label className="flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={draft.isOpen}
            onChange={(event) => update("isOpen", event.target.checked)}
            disabled={isSaving}
            className="h-5 w-5 cursor-pointer accent-[#4EFEBE] disabled:cursor-default disabled:opacity-60"
          />
          <span className="text-white/80">Başvurular açık</span>
        </label>

        <div className="flex flex-wrap items-center justify-end gap-3 border-t border-white/10 pt-4">
          {dirty && <span className="mr-auto text-xs text-amber-300">Kaydedilmemiş değişiklikler</span>}
          <button
            type="submit"
            disabled={isSaving || !dirty}
            className="cursor-pointer rounded-lg bg-accent px-5 py-2 font-semibold text-black disabled:cursor-default disabled:opacity-60"
          >
            {isSaving ? "Kaydediliyor…" : "Kaydet"}
          </button>
        </div>
      </form>
    </section>
  );
}
