"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import {
  youthEventApplicationPath,
  youthEventContactPath,
  youthEventContent,
  youthEventText,
  type LocalizedText,
} from "@/lib/youth-event";

type Props = {
  applicationOpen: boolean | null;
};

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">{title}</h2>
    </div>
  );
}

export default function YouthMusicEventPage({ applicationOpen }: Props) {
  const { locale } = useLanguage();
  const content = youthEventContent;
  const t = (value: LocalizedText) => youthEventText(locale, value);

  const statusLabel = applicationOpen === true
    ? t(content.labels.statusOpen)
    : applicationOpen === false
      ? t(content.labels.statusClosed)
      : t(content.labels.statusUnknown);
  const statusNote = applicationOpen === true
    ? t(content.labels.statusOpenNote)
    : applicationOpen === false
      ? t(content.labels.statusClosedNote)
      : t(content.labels.statusUnknownNote);
  const statusClass = applicationOpen === true
    ? "rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
    : applicationOpen === false
      ? "rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/60"
      : "rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-200";
  const applicationHref = youthEventApplicationPath(locale);
  const contactHref = youthEventContactPath(locale);
  const applyLabel = applicationOpen === false ? t(content.labels.applicationPage) : t(content.labels.primaryCta);

  return (
    <main className="overflow-hidden">
      <section className="relative mx-auto max-w-6xl px-4 pb-16 pt-12 sm:pb-24 sm:pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-[38rem] w-[64rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[150px]"
        />
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">{t(content.eyebrow)}</p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] text-white sm:text-6xl">{t(content.title)}</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">{t(content.subtitle)}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={applicationHref}
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-accent/90"
              >
                {applyLabel}
              </Link>
              <a
                href="#detaylar"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent"
              >
                {t(content.labels.secondaryCta)}
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className={statusClass}>{statusLabel}</span>
              <span className="text-sm text-white/45">{statusNote}</span>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#171717] via-[#121212] to-[#0C0C0C] p-6 shadow-2xl shadow-black/50 sm:p-8">
              <div aria-hidden="true" className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
              <div className="relative flex items-center justify-between gap-4">
                <Image src="/logo.jpeg" width={56} height={55} alt="Multi Event" className="rounded" />
                <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
                  {content.heroCard.brand}
                </span>
              </div>
              <div aria-hidden="true" className="relative mt-10 text-7xl font-bold leading-none text-accent/80">♪</div>
              <p className="relative mt-4 text-2xl font-semibold text-white">{t(content.heroCard.title)}</p>
              <p className="relative mt-2 text-sm text-white/55">{t(content.heroCard.instruments)}</p>
              <p className="relative mt-1 text-xs text-white/40">{t(content.heroCard.note)}</p>
              <div className="relative mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-black/25 p-3">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">{t(content.labels.date)}</p>
                  <p className="mt-1 text-sm font-medium text-white">{t(content.labels.dateValue)}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/25 p-3">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">{t(content.labels.venue)}</p>
                  <p className="mt-1 text-sm font-medium text-white">{t(content.labels.venueValue)}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/25 p-3 sm:col-span-2">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">{t(content.labels.application)}</p>
                      <p className="mt-1 text-sm font-medium text-white">{t(content.labels.applicationValue)}</p>
                    </div>
                    <span className={statusClass}>{statusLabel}</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              aria-hidden="true"
              className="absolute -bottom-5 -right-5 h-24 w-24 rounded-full border border-accent/20"
            />
          </div>
        </div>

        <div className="relative mt-14 grid grid-cols-2 gap-3 sm:mt-20 lg:grid-cols-4">
          {content.stats.map((stat) => (
            <div key={stat.id} className="rounded-2xl border border-white/10 bg-[#121212]/85 p-4 sm:p-5">
              <p className="text-2xl font-bold text-accent sm:text-3xl">{t(stat.value)}</p>
              <p className="mt-1 text-xs leading-relaxed text-white/50 sm:text-sm">{t(stat.label)}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="detaylar" className="border-y border-white/10 bg-[#0A0A0A]/70 py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading eyebrow={t(content.about.eyebrow)} title={t(content.about.title)} />
            <div className="mt-8 rounded-2xl border border-accent/20 bg-accent/5 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">{t(content.labels.application)}</p>
              <p className="mt-2 text-lg font-semibold text-white">{t(content.labels.applicationValue)}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{statusNote}</p>
            </div>
          </div>
          <div className="space-y-5 text-sm leading-relaxed text-white/65 sm:text-base">
            {content.about.paragraphs.map((paragraph) => (
              <p key={paragraph.tr}>{t(paragraph)}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <SectionHeading eyebrow={t(content.info.eyebrow)} title={t(content.info.title)} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.info.items.map((item, index) => (
            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-[#121212] p-5 transition-colors hover:border-accent/40"
            >
              <p className="text-xs font-semibold text-accent/70">0{index + 1}</p>
              <h3 className="mt-3 font-semibold text-white">{t(item.label)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{t(item.value)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-24">
        <SectionHeading eyebrow={t(content.process.eyebrow)} title={t(content.process.title)} />
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.process.steps.map((step, index) => (
            <li key={step.id} className="rounded-2xl border border-white/10 bg-[#121212] p-5">
              <span className="text-3xl font-bold text-accent/30">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-semibold text-white">{t(step.title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{t(step.description)}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-white/10 bg-[#0A0A0A]/70 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading eyebrow={t(content.audience.eyebrow)} title={t(content.audience.title)} />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {content.audience.items.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-white/10 bg-[#121212] p-6 transition-colors hover:border-accent/40"
              >
                <h3 className="text-lg font-semibold text-white">{t(item.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{t(item.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <SectionHeading eyebrow={t(content.faq.eyebrow)} title={t(content.faq.title)} />
          <div className="space-y-3">
            {content.faq.items.map((item) => (
              <details
                key={item.id}
                className="group rounded-xl border border-white/10 bg-[#121212] p-4 open:border-accent/30 sm:p-5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-white [&::-webkit-details-marker]:hidden">
                  <span>{t(item.question)}</span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-xl text-accent transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{t(item.answer)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-20">
        <div className="relative overflow-hidden rounded-[2rem] border border-accent/20 bg-gradient-to-br from-accent/15 via-[#121212] to-[#0C0C0C] p-8 sm:p-12">
          <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
          <div className="relative max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">{t(content.cta.eyebrow)}</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">{t(content.cta.title)}</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base">{t(content.cta.body)}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={applicationHref}
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-accent/90"
              >
                {applyLabel}
              </Link>
              <Link
                href={contactHref}
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent"
              >
                {t(content.labels.contact)}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="rounded-2xl border border-white/10 bg-[#121212] p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-white">{t(content.labels.contactTitle)}</h2>
          <p className="mt-2 text-sm leading-relaxed text-white/55">{t(content.labels.contactBody)}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <a
              href={`tel:${content.contact.phone.replace(/\s/g, "")}`}
              className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white transition-colors hover:border-accent hover:text-accent"
            >
              {content.contact.phone}
            </a>
            <a
              href={`mailto:${content.contact.email}`}
              className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm break-all text-white transition-colors hover:border-accent hover:text-accent"
            >
              {content.contact.email}
            </a>
            <a
              href={content.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white transition-colors hover:border-accent hover:text-accent"
            >
              {t(content.labels.instagram)}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
