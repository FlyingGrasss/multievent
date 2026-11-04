"use client";

import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { useEffect, useState, type ReactNode } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import {
  forteFestivalApplicationPath,
  forteFestivalContactPath,
  forteFestivalContent,
  forteFestivalList,
  forteFestivalText,
  type LocalizedText,
} from "@/lib/forte-festival";

type Props = {
  applicationOpen: boolean | null;
};

type StatusTone = "open" | "closed" | "unknown";

function StatusBadge({ tone, children }: { tone: StatusTone; children: ReactNode }) {
  const classes = tone === "open"
    ? "border-accent/40 bg-accent/10 text-accent"
    : tone === "closed"
      ? "border-white/15 bg-white/5 text-white/60"
      : "border-amber-400/30 bg-amber-400/10 text-amber-200";
  const dot = tone === "open" ? "bg-accent" : tone === "closed" ? "bg-white/40" : "bg-amber-300";
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${classes}`}>
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {children}
    </span>
  );
}

function SectionHeading({ eyebrow, title, note }: { eyebrow: string; title: string; note?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-accent">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold leading-[1.04] text-white sm:text-5xl">{title}</h2>
      {note ? <p className="mt-4 text-sm leading-relaxed text-white/40">{note}</p> : null}
    </div>
  );
}

function SoundBars({ className = "" }: { className?: string }) {
  const heights = [34, 62, 46, 80, 55, 94, 70, 42, 76, 38, 66, 88, 52, 72, 44, 84];
  return (
    <div aria-hidden="true" className={`flex h-20 items-end gap-1.5 rounded-xl border border-white/10 bg-black/25 p-2.5 ${className}`}>
      {heights.map((height, index) => (
        <span
          key={index}
          className="festival-eq flex-1 rounded-full bg-accent/70"
          style={{
            height: `${height}%`,
            animationDelay: `${index * 90}ms`,
            animationDuration: `${1.4 + (index % 4) * 0.25}s`,
          }}
        />
      ))}
    </div>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return <div aria-hidden="true" className="fixed left-0 top-0 z-[60] h-0.5 bg-accent" style={{ width: `${progress * 100}%` }} />;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

export default function ForteFestivalPage({ applicationOpen }: Props) {
  const { locale } = useLanguage();
  const content = forteFestivalContent;
  const t = (value: LocalizedText) => forteFestivalText(locale, value);
  const list = (value: { readonly tr: readonly string[]; readonly en: readonly string[] }) => forteFestivalList(locale, value);
  const reducedMotion = usePrefersReducedMotion();

  const statusTone: StatusTone = applicationOpen === true ? "open" : applicationOpen === false ? "closed" : "unknown";
  const statusLabel = applicationOpen === true
    ? t(content.hero.statusOpen)
    : applicationOpen === false
      ? t(content.hero.statusClosed)
      : t(content.hero.statusUnknown);
  const statusNote = applicationOpen === true
    ? t(content.hero.statusOpenNote)
    : applicationOpen === false
      ? t(content.hero.statusClosedNote)
      : t(content.hero.statusUnknownNote);
  const applicationHref = forteFestivalApplicationPath(locale);
  const contactHref = forteFestivalContactPath(locale);
  const applicationLabel = applicationOpen === false ? t(content.application.closedLabel) : t(content.application.formLabel);

  return (
    <main className="overflow-hidden">
      <ScrollProgress />

      <section className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden border-b border-white/10">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(78,254,190,0.14),transparent_38%),radial-gradient(circle_at_86%_8%,rgba(78,254,190,0.07),transparent_34%)]"
        />
        <div
          aria-hidden="true"
          className="festival-drift absolute -right-16 top-1/2 -z-10 -translate-y-1/2 select-none text-[30vw] font-black leading-none tracking-[-0.09em] text-white/[0.025] sm:text-[24vw]"
        >
          {content.hero.year}
        </div>
        <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-6xl items-center gap-12 px-4 pb-16 pt-12 lg:grid-cols-[1.08fr_0.92fr] lg:pb-24 lg:pt-20">
          <div>
            <div className="festival-rise flex items-center gap-3" style={{ animationDelay: "40ms" }}>
              <span aria-hidden="true" className="h-px w-10 bg-accent" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-accent">{t(content.hero.eyebrow)}</p>
            </div>
            <h1 className="mt-6 text-5xl font-black leading-[0.88] tracking-[-0.055em] text-white sm:text-7xl lg:text-[6.2rem]">
              {list(content.hero.titleLines).map((line, index) => (
                <span key={line} className="festival-rise block" style={{ animationDelay: `${120 + index * 110}ms` }}>
                  {line}
                </span>
              ))}
            </h1>
            <p className="festival-rise mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg" style={{ animationDelay: "460ms" }}>
              {t(content.hero.subtitle)}
            </p>
            <div className="festival-rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "560ms" }}>
              <Link
                href={applicationHref}
                className="group inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-accent/90"
              >
                {applicationLabel}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <a
                href="#program"
                className="inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent"
              >
                {t(content.hero.secondaryCta)}
              </a>
            </div>
            <div className="festival-rise mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "660ms" }}>
              <StatusBadge tone={statusTone}>{statusLabel}</StatusBadge>
              <span className="text-sm text-white/40">{statusNote}</span>
            </div>
          </div>

          <div className="festival-fade relative mx-auto w-full max-w-md lg:max-w-none" style={{ animationDelay: "300ms" }}>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#101010] p-6 shadow-2xl shadow-black/60 sm:p-8">
              <div aria-hidden="true" className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
              <div className="relative flex items-center justify-between gap-4">
                <Image src="/logo.jpeg" width={54} height={53} alt="Multi Event" className="rounded" />
                <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/45">
                  {content.hero.year}
                </span>
              </div>
              <p className="relative mt-10 text-[11px] uppercase tracking-[0.3em] text-white/35">{t(content.hero.eyebrow)}</p>
              <p className="relative mt-2 text-6xl font-black leading-none tracking-[-0.06em] text-white/90">{content.hero.year}</p>
              <div className="relative mt-6">
                <SoundBars />
              </div>
              <div className="relative mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-black/25 p-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">{t(content.hero.dateLabel)}</p>
                  <p className="mt-1 text-sm font-medium text-white">{t(content.hero.dateValue)}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/25 p-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">{t(content.hero.venueLabel)}</p>
                  <p className="mt-1 text-sm font-medium text-white">{t(content.hero.venueValue)}</p>
                </div>
              </div>
              <div className="relative mt-4 flex flex-wrap items-center justify-between gap-3">
                <StatusBadge tone={statusTone}>{statusLabel}</StatusBadge>
                <p className="text-[11px] text-white/35">{t(content.hero.posterNote)}</p>
              </div>
            </div>
            <div aria-hidden="true" className="absolute -bottom-5 -right-5 h-24 w-24 rounded-full border border-accent/20" />
            <div aria-hidden="true" className="festival-float absolute -left-4 top-10 hidden h-14 w-14 rounded-full border border-accent/30 bg-[#0C0C0C]/80 backdrop-blur sm:block" />
          </div>
        </div>
        <a
          href="#about"
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/30 transition-colors hover:text-accent sm:flex"
        >
          {t(content.hero.scrollLabel)}
          <span aria-hidden="true" className="h-8 w-px bg-linear-to-b from-accent/70 to-transparent" />
        </a>
      </section>

      <div className="border-y border-white/10 bg-[#080808] py-4">
        <Marquee autoFill speed={26} gradient={false} play={!reducedMotion} pauseOnHover>
          <div className="flex items-center gap-10 pr-10">
            {list(content.marquee).map((item) => (
              <span key={item} className="flex items-center gap-10 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/40">
                {item}
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent" />
              </span>
            ))}
          </div>
        </Marquee>
      </div>

      <section id="about" className="border-b border-white/10 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div data-aos="fade-up">
              <SectionHeading eyebrow={t(content.about.eyebrow)} title={t(content.about.title)} />
            </div>
            <div data-aos="fade-up" data-aos-delay="120">
              <p className="text-2xl leading-snug text-white sm:text-3xl">{t(content.about.lead)}</p>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/55 sm:text-base">
                {content.about.paragraphs.map((paragraph) => (
                  <p key={paragraph.tr}>{t(paragraph)}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-3 sm:mt-20 sm:grid-cols-4">
            {content.about.stats.map((stat, index) => (
              <div key={stat.id} data-aos="fade-up" data-aos-delay={index * 80} className="rounded-2xl border border-white/10 bg-[#111] p-4 sm:p-5">
                <p className="text-2xl font-black tracking-[-0.04em] text-accent sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-xs leading-relaxed text-white/45 sm:text-sm">{t(stat.label)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="program" className="border-b border-white/10 bg-[#090909] py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow={t(content.program.eyebrow)} title={t(content.program.title)} />
            <p className="max-w-sm text-sm leading-relaxed text-white/40">{t(content.program.note)}</p>
          </div>
          <ol className="mt-12 divide-y divide-white/10 border-y border-white/10">
            {content.program.items.map((item, index) => (
              <li
                key={item.id}
                data-aos="fade-up"
                data-aos-delay={index * 70}
                className="group grid gap-3 py-6 transition-colors hover:bg-white/[0.02] sm:grid-cols-[12rem_1fr_auto] sm:items-center sm:gap-8"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{t(item.date)}</p>
                <div>
                  <h3 className="text-2xl font-semibold text-white transition-colors group-hover:text-accent">{t(item.title)}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/50">{t(item.description)}</p>
                </div>
                <span className="w-fit rounded-full border border-white/15 px-3 py-1 text-xs text-white/45">{t(item.location)}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-white/10 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow={t(content.categories.eyebrow)} title={t(content.categories.title)} />
            <p className="max-w-sm text-sm leading-relaxed text-white/40">{t(content.categories.note)}</p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {content.categories.items.map((item, index) => (
              <article
                key={item.id}
                data-aos="fade-up"
                data-aos-delay={index * 70}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#111] p-5 transition-colors hover:border-accent/40 sm:p-6"
              >
                <div aria-hidden="true" className="absolute -right-2 -top-8 text-[7rem] font-black leading-none text-white/[0.03] transition-colors group-hover:text-accent/[0.05]">
                  {item.letter}
                </div>
                <div className="relative flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">{t(item.age)}</p>
                    <p className="mt-1 text-5xl font-black leading-none text-accent">{item.letter}</p>
                  </div>
                  <p className="max-w-[7rem] text-right text-[11px] leading-snug text-white/40">{t(item.description)}</p>
                </div>
                <div className="relative mt-5 space-y-2">
                  <div className="rounded-xl border border-white/10 bg-black/25 p-3">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-white/35">{t(content.categories.worksLabel)}</p>
                    <p className="mt-1 text-sm font-medium text-white">{t(item.works)}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/25 p-3">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-white/35">{t(content.categories.durationLabel)}</p>
                    <p className="mt-1 text-sm font-medium text-accent">{t(item.duration)}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#090909] py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading eyebrow={t(content.rules.eyebrow)} title={t(content.rules.title)} note={t(content.rules.note)} />
          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            {content.rules.groups.map((group, index) => (
              <div key={group.id} data-aos="fade-up" data-aos-delay={index * 100} className="rounded-3xl border border-white/10 bg-[#111] p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-white">{t(group.title)}</h3>
                <ul className="mt-5 space-y-3">
                  {list(group.items).map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/55">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading eyebrow={t(content.awards.eyebrow)} title={t(content.awards.title)} note={t(content.awards.note)} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.awards.items.map((item, index) => (
              <div key={item.id} data-aos="zoom-in" data-aos-delay={index * 80} className="rounded-3xl border border-white/10 bg-[#111] p-6">
                <p className="text-4xl font-black tracking-[-0.05em] text-accent/60">{item.place}</p>
                <h3 className="mt-4 text-xl font-semibold text-white">{t(item.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{t(item.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#090909] py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading eyebrow={t(content.jury.eyebrow)} title={t(content.jury.title)} note={t(content.jury.note)} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.jury.members.map((member, index) => (
              <div key={member.id} data-aos="fade-up" data-aos-delay={index * 80} className="rounded-3xl border border-white/10 bg-[#111] p-6 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-accent/30 bg-accent/5 text-2xl font-bold text-accent">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-4 font-semibold text-white">{t(member.role)}</h3>
                <p className="mt-1 text-sm text-white/40">{t(member.name)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="basvuru" className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-accent/20 bg-linear-to-br from-accent/15 via-[#111] to-[#0C0C0C] p-6 sm:p-12">
            <div aria-hidden="true" className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
            <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-accent">{t(content.application.eyebrow)}</p>
                <h2 className="mt-3 text-3xl font-bold leading-[1.04] text-white sm:text-5xl">{t(content.application.title)}</h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">{t(content.application.body)}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={applicationHref}
                    className="group inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-accent/90"
                  >
                    {applicationLabel}
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                  <Link
                    href={contactHref}
                    className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent"
                  >
                    {t(content.application.contactLabel)}
                  </Link>
                </div>
                <p className="mt-4 max-w-xl text-xs leading-relaxed text-white/35">{t(content.application.note)}</p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <StatusBadge tone={statusTone}>{statusLabel}</StatusBadge>
                  <span className="text-xs text-white/40">{statusNote}</span>
                </div>
              </div>
              <ol className="grid gap-3 sm:grid-cols-2">
                {content.application.steps.map((step, index) => (
                  <li key={step.id} data-aos="fade-up" data-aos-delay={index * 70} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs font-semibold text-accent">0{index + 1}</p>
                    <h3 className="mt-2 font-semibold text-white">{t(step.title)}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/50">{t(step.description)}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeading eyebrow={t(content.faq.eyebrow)} title={t(content.faq.title)} />
            <div className="space-y-3">
              {content.faq.items.map((item) => (
                <details key={item.id} data-aos="fade-up" className="group rounded-2xl border border-white/10 bg-[#111] p-5 open:border-accent/30">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-white [&::-webkit-details-marker]:hidden">
                    <span>{t(item.question)}</span>
                    <span aria-hidden="true" className="shrink-0 text-xl text-accent transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">{t(item.answer)}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#090909] py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div data-aos="fade-right" className="rounded-[2rem] border border-white/10 bg-[#111] p-8 sm:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-accent">{t(content.gallery.eyebrow)}</p>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{t(content.gallery.title)}</h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">{t(content.gallery.body)}</p>
              <a
                href={content.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-3 rounded-full border border-accent/40 px-6 py-3 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-black"
              >
                {t(content.gallery.instagramLabel)}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div data-aos="fade-left" className="relative overflow-hidden rounded-[2rem] border border-accent/20 bg-linear-to-br from-accent/10 via-[#111] to-[#0C0C0C] p-8">
              <div aria-hidden="true" className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-accent/15 blur-3xl" />
              <div className="relative flex h-full flex-col justify-between gap-12">
                <div className="flex items-center gap-3">
                  <Image src="/logo.jpeg" width={44} height={43} alt="Multi Event" className="rounded" />
                  <span className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Multi Event</span>
                </div>
                <div>
                  <p aria-hidden="true" className="text-7xl font-black leading-none text-accent/20">♪</p>
                  <p className="mt-3 text-sm text-white/45">@multieventorg</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-[2rem] border border-white/10 bg-[#111] p-8 sm:p-10">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold text-white sm:text-3xl">{t(content.contact.title)}</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/55 sm:text-base">{t(content.contact.body)}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href={`tel:${content.contact.phone.replace(/\s/g, "")}`}
                  className="rounded-full border border-white/15 px-4 py-2 text-sm text-white transition-colors hover:border-accent hover:text-accent"
                >
                  {content.contact.phone}
                </a>
                <a
                  href={`mailto:${content.contact.email}`}
                  className="rounded-full border border-white/15 px-4 py-2 text-sm text-white transition-colors hover:border-accent hover:text-accent"
                >
                  {content.contact.email}
                </a>
                <a
                  href={content.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/15 px-4 py-2 text-sm text-white transition-colors hover:border-accent hover:text-accent"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
