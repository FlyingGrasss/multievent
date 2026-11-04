"use client";

import { useState } from "react";
import ApplicationQuestionsPanel from "@/app/admin/ApplicationQuestionsPanel";
import ApplicationResponsesPanel from "@/app/admin/ApplicationResponsesPanel";
import ApplicationSettingsPanel from "@/app/admin/ApplicationSettingsPanel";
import type {
  ApplicationFormDefinition,
  ApplicationSubmissionPage,
} from "@/types";

type Section = "settings" | "questions" | "responses";

type Props = {
  initialForm: ApplicationFormDefinition;
  initialSubmissions: ApplicationSubmissionPage;
};

const sections: Array<{ id: Section; label: string }> = [
  { id: "settings", label: "Form ayarları" },
  { id: "questions", label: "Sorular" },
  { id: "responses", label: "Yanıtlar" },
];

export default function ApplicationManager({ initialForm, initialSubmissions }: Props) {
  const [form, setForm] = useState(initialForm);
  const [submissionTotal, setSubmissionTotal] = useState(initialSubmissions.total);
  const [section, setSection] = useState<Section>("settings");

  function sectionLabel(id: Section) {
    const base = sections.find((item) => item.id === id)?.label ?? id;
    if (id === "questions") return `${base} (${form.questions.length})`;
    if (id === "responses") return `${base} (${submissionTotal})`;
    return base;
  }

  return (
    <section className="space-y-5">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-bold">Başvurular</h2>
            <span
              className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                form.isOpen
                  ? "border-accent/40 bg-accent/10 text-accent"
                  : "border-white/20 bg-white/5 text-white/60"
              }`}
            >
              {form.isOpen ? "Açık" : "Kapalı"}
            </span>
          </div>
          <p className="mt-1 text-sm text-white/60">Başvuru formunu, sorularını ve gelen yanıtları yönetin.</p>
        </div>
        <a
          href="/tr/basvuru"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:border-accent hover:text-accent"
        >
          Formu görüntüle
        </a>
      </header>

      <nav aria-label="Başvuru yönetimi bölümleri" className="flex flex-wrap gap-2">
        {sections.map((item) => {
          const active = section === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSection(item.id)}
              aria-pressed={active}
              className={`cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium ${
                active
                  ? "border-accent bg-accent text-black"
                  : "border-white/15 bg-[#121212] text-white/70 hover:border-accent/60 hover:text-white"
              }`}
            >
              {sectionLabel(item.id)}
            </button>
          );
        })}
      </nav>

      <div hidden={section !== "settings"}>
        <ApplicationSettingsPanel
          settings={{
            titleTr: form.titleTr,
            titleEn: form.titleEn,
            descriptionTr: form.descriptionTr,
            descriptionEn: form.descriptionEn,
            isOpen: form.isOpen,
          }}
          onSaved={(saved) => setForm((current) => ({ ...current, ...saved }))}
        />
      </div>

      <div hidden={section !== "questions"}>
        <ApplicationQuestionsPanel
          questions={form.questions}
          onChange={(questions) => setForm((current) => ({ ...current, questions }))}
        />
      </div>

      <div hidden={section !== "responses"}>
        <ApplicationResponsesPanel
          initialPage={initialSubmissions}
          onTotalChange={setSubmissionTotal}
        />
      </div>
    </section>
  );
}
