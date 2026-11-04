"use client";

import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import {
  forteFestivalApplicationPath,
  forteFestivalContactPath,
  forteFestivalList,
  forteFestivalText,
  type ForteFestivalContent,
  type LocalizedText,
} from "@/lib/forte-festival";

type Props = {
  applicationOpen: boolean | null;
  content: ForteFestivalContent;
};

type StatusTone = "open" | "closed" | "unknown";

const HERO_PARTICLES = [
  { left: "9%", top: "24%", size: 3, delay: 0, duration: 9 },
  { left: "18%", top: "68%", size: 2, delay: 1.4, duration: 11 },
  { left: "31%", top: "38%", size: 4, delay: 2.2, duration: 10 },
  { left: "46%", top: "74%", size: 2, delay: 0.8, duration: 13 },
  { left: "58%", top: "22%", size: 3, delay: 3.1, duration: 9 },
  { left: "67%", top: "57%", size: 2, delay: 1.9, duration: 12 },
  { left: "76%", top: "32%", size: 4, delay: 0.4, duration: 10 },
  { left: "86%", top: "70%", size: 2, delay: 2.7, duration: 11 },
  { left: "93%", top: "42%", size: 3, delay: 1.1, duration: 9 },
];

function StatusBadge({ tone, children }: { tone: StatusTone; children: ReactNode }) {
  const classes = tone === "open"
    ? "border-accent/40 bg-accent/10 text-accent"
    : tone === "closed"
      ? "border-white/15 bg-white/5 text-white/60"
      : "border-amber-300/30 bg-amber-300/10 text-amber-200";
  const dot = tone === "open" ? "bg-accent" : tone === "closed" ? "bg-white/40" : "bg-amber-200";
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
      <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-accent">{eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.02] text-white sm:text-6xl">{title}</h2>
      {note ? <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/45">{note}</p> : null}
    </div>
  );
}

function SoundBars({ className = "" }: { className?: string }) {
  const heights = [34, 62, 46, 80, 55, 94, 70, 42, 76, 38, 66, 88, 52, 72, 44, 84];
  return (
    <div aria-hidden="true" className={`flex h-16 items-end gap-1.5 rounded-xl border border-white/10 bg-black/35 p-2.5 backdrop-blur ${className}`}>
      {heights.map((height, index) => (
        <span
          key={index}
          className="festival-eq flex-1 rounded-full bg-accent/80"
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

  return <div aria-hidden="true" className="fixed left-0 top-0 z-[60] h-[2px] bg-accent" style={{ width: `${progress * 100}%` }} />;
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

function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold });
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "clip";
}) {
  const { ref, visible } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${variant === "clip" ? "forte-reveal-clip" : "forte-reveal"} ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

function useParallax<T extends HTMLElement>(speed = 0.12, max = 100) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const offset = Math.min(window.scrollY * speed, max);
        element.style.transform = `translate3d(0, ${offset}px, 0) scale(1.06)`;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      cancelAnimationFrame(frame);
    };
  }, [max, speed]);

  return ref;
}

function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    element.style.transform = `perspective(900px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg) translateY(-3px)`;
  }

  function handlePointerLeave() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <div ref={ref} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave} className={`forte-tilt ${className}`}>
      {children}
    </div>
  );
}

function Timeline({ items, t }: { items: ForteFestivalContent["program"]["items"]; t: (value: LocalizedText) => string }) {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const element = listRef.current;
    if (!element) return;
    const update = () => {
      const rect = element.getBoundingClientRect();
      const total = rect.height;
      const passed = Math.min(Math.max(window.innerHeight * 0.55 - rect.top, 0), total);
      element.style.setProperty("--timeline-progress", `${total > 0 ? (passed / total) * 100 : 0}%`);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <ol ref={listRef} className="relative mt-12 space-y-8 border-l border-white/10 pl-7 sm:pl-12" style={{ "--timeline-progress": "0%" } as CSSProperties}>
      <div aria-hidden="true" className="absolute left-0 top-0 h-[var(--timeline-progress)] w-px bg-accent transition-[height] duration-200" />
      {items.map((item, index) => (
        <li key={item.id} className="relative" data-aos="fade-up" data-aos-delay={index * 80}>
          <span aria-hidden="true" className="absolute -left-[1.94rem] top-2 h-2 w-2 rounded-full border border-accent bg-[#0B0806] sm:-left-[3.44rem]" />
          <div className="grid gap-2 sm:grid-cols-[11rem_1fr_auto] sm:items-center sm:gap-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{t(item.date)}</p>
            <div>
              <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">{t(item.title)}</h3>
              <p className="mt-1 text-sm leading-relaxed text-white/50">{t(item.description)}</p>
            </div>
            <span className="w-fit rounded-full border border-white/15 px-3 py-1 text-xs text-white/45">{t(item.location)}</span>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function ForteFestivalPage({ applicationOpen, content }: Props) {
  const { locale } = useLanguage();
  const t = (value: LocalizedText) => forteFestivalText(locale, value);
  const list = (value: { readonly tr: readonly string[]; readonly en: readonly string[] }) => forteFestivalList(locale, value);
  const reducedMotion = usePrefersReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const heroImageRef = useParallax<HTMLDivElement>(0.17, 95);
  const aboutImageRef = useParallax<HTMLDivElement>(0.045, 50);

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

  function handleHeroPointer(event: React.PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return;
    const element = heroRef.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    element.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
    element.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
  }

  return (
    <main className="forte-theme relative overflow-hidden bg-[#0B0806] text-white">
      <div aria-hidden="true" className="forte-grain pointer-events-none fixed inset-0 z-[1] opacity-[0.035] mix-blend-soft-light" />
      <ScrollProgress />

      <section
        ref={heroRef}
        onPointerMove={handleHeroPointer}
        className="relative isolate flex min-h-[calc(100svh-5rem)] items-center overflow-hidden border-b border-white/10"
      >
        <div ref={heroImageRef} className="absolute inset-0 -z-20 will-change-transform">
          <Image
            src={content.hero.backgroundImage}
            alt={t(content.hero.backgroundAlt)}
            fill
            priority
            loading="eager"
            sizes="100vw"
            className="object-cover"
            style={{ filter: "brightness(0.52) saturate(0.72) sepia(0.18)" }}
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-[#0B0806] via-[#0B0806]/85 to-[#0B0806]/25" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-[#0B0806] via-transparent to-[#0B0806]/55" />
        <div aria-hidden="true" className="forte-spotlight absolute inset-0 -z-10" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
          {HERO_PARTICLES.map((particle, index) => (
            <span
              key={index}
              className="forte-particle absolute rounded-full bg-accent"
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            />
          ))}
        </div>
        <div aria-hidden="true" className="absolute -right-24 top-1/2 -z-10 -translate-y-1/2 select-none text-[28vw] font-display font-semibold leading-none text-white/[0.025]">
          {content.hero.year}
        </div>

        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pb-20 pt-16 lg:grid-cols-[1.08fr_0.92fr] lg:pb-28 lg:pt-20">
          <div>
            <div className="festival-rise flex items-center gap-3" style={{ animationDelay: "40ms" }}>
              <span aria-hidden="true" className="h-px w-10 bg-accent" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-accent">{t(content.hero.eyebrow)}</p>
            </div>
            <h1 className="mt-6 font-display text-[15vw] font-semibold uppercase leading-[0.94] tracking-[-0.04em] text-white sm:text-7xl lg:text-[5.8rem]">
              {list(content.hero.titleLines).map((line, index) => (
                <span key={line} className="forte-title-line block">
                  <span style={{ animationDelay: `${120 + index * 120}ms` }}>{line}</span>
                </span>
              ))}
            </h1>
            <p className="festival-rise mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg" style={{ animationDelay: "520ms" }}>
              {t(content.hero.subtitle)}
            </p>
            <div className="festival-rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "620ms" }}>
              <Link
                href={applicationHref}
                className="group inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-[#0B0806] transition-colors hover:bg-accent/90"
              >
                {applicationLabel}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <a
                href="#program"
                className="inline-flex items-center gap-3 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent"
              >
                {t(content.hero.secondaryCta)}
              </a>
            </div>
            <div className="festival-rise mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "720ms" }}>
              <StatusBadge tone={statusTone}>{statusLabel}</StatusBadge>
              <span className="text-sm text-white/45">{statusNote}</span>
            </div>
          </div>

          <div className="festival-fade relative mx-auto w-full max-w-md lg:max-w-none" style={{ animationDelay: "300ms" }}>
            <TiltCard>
              <div className="forte-card-border relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-accent/20 bg-[#120B08] shadow-2xl shadow-black/60">
                <Image
                  src={content.hero.posterImage}
                  alt={t(content.hero.posterAlt)}
                  fill
                  sizes="(max-width: 1024px) 90vw, 42vw"
                  className="object-cover"
                  style={{ filter: "brightness(0.62) saturate(0.8) sepia(0.12)" }}
                />
                <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-[#0B0806] via-[#0B0806]/45 to-[#0B0806]/65" />
                <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <Image src="/logo.jpeg" width={54} height={54} alt="Multi Event" className="rounded" />
                    <span className="rounded-full border border-white/20 bg-black/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/70 backdrop-blur">
                      {content.hero.year}
                    </span>
                  </div>
                  <div>
                    <p className="w-fit rounded-full border border-white/15 bg-[#0B0806]/55 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-accent backdrop-blur">
                      {t(content.hero.eyebrow)}
                    </p>
                    <p className="mt-2 font-display text-6xl font-semibold leading-none text-white">{content.hero.year}</p>
                    <SoundBars className="mt-4" />
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="rounded-xl border border-white/15 bg-black/35 p-3 backdrop-blur">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-white/45">{t(content.hero.dateLabel)}</p>
                        <p className="mt-1 text-sm font-medium text-white">{t(content.hero.dateValue)}</p>
                      </div>
                      <div className="rounded-xl border border-white/15 bg-black/35 p-3 backdrop-blur">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-white/45">{t(content.hero.venueLabel)}</p>
                        <p className="mt-1 text-sm font-medium text-white">{t(content.hero.venueValue)}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <StatusBadge tone={statusTone}>{statusLabel}</StatusBadge>
                      <p className="text-[10px] leading-snug text-white/55">{t(content.hero.posterNote)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
            <div aria-hidden="true" className="festival-float absolute -left-5 top-12 hidden h-14 w-14 rounded-full border border-accent/40 bg-[#0B0806]/80 backdrop-blur sm:block" />
            <div aria-hidden="true" className="absolute -bottom-6 -right-6 h-28 w-28 rounded-full border border-accent/20" />
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

      <div className="relative border-y border-white/10 bg-[#120B08] py-4">
        <Marquee autoFill speed={26} gradient={false} play={!reducedMotion} pauseOnHover>
          <div className="flex items-center gap-10 pr-10">
            {list(content.marquee).map((item) => (
              <span key={item} className="flex items-center gap-10 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/45">
                {item}
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent" />
              </span>
            ))}
          </div>
        </Marquee>
      </div>

      <section id="about" className="relative border-b border-white/10 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.78fr] lg:items-center">
            <div>
              <Reveal>
                <SectionHeading eyebrow={t(content.about.eyebrow)} title={t(content.about.title)} />
              </Reveal>
              <Reveal delay={100}>
                <p className="mt-8 font-display text-3xl leading-tight text-white sm:text-4xl">{t(content.about.lead)}</p>
                <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/55 sm:text-base">
                  {content.about.paragraphs.map((paragraph) => (
                    <p key={paragraph.tr}>{t(paragraph)}</p>
                  ))}
                </div>
              </Reveal>
              <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {content.about.stats.map((stat, index) => (
                  <Reveal key={stat.id} delay={index * 80}>
                    <div className="border-t border-accent/25 pt-3">
                      <p className="font-display text-3xl font-semibold leading-none text-accent sm:text-4xl">{stat.value}</p>
                      <p className="mt-2 text-xs leading-relaxed text-white/45">{t(stat.label)}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal variant="clip" delay={150} className="relative">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] border border-white/10 bg-[#120B08] lg:max-w-none">
                <div ref={aboutImageRef} className="absolute inset-0">
                  <Image
                    src={content.about.image}
                    alt={t(content.about.imageAlt)}
                    fill
                    sizes="(max-width: 1024px) 80vw, 35vw"
                    className="object-cover"
                    style={{ filter: "brightness(0.7) saturate(0.78) sepia(0.2)" }}
                  />
                </div>
                <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-[#0B0806] via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                  <span className="rounded-full border border-accent/30 bg-[#0B0806]/70 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-accent backdrop-blur">
                    {t(content.hero.dateValue)}
                  </span>
                  <span aria-hidden="true" className="font-display text-4xl font-semibold text-white/20">{content.hero.year}</span>
                </div>
              </div>
              <div aria-hidden="true" className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full border border-accent/20" />
            </Reveal>
          </div>
        </div>
      </section>

      <section id="program" className="border-b border-white/10 bg-[#120B08] py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <SectionHeading eyebrow={t(content.program.eyebrow)} title={t(content.program.title)} />
            </Reveal>
            <p className="max-w-sm text-sm leading-relaxed text-white/45">{t(content.program.note)}</p>
          </div>
          <Timeline items={content.program.items} t={t} />
        </div>
      </section>

      <section className="border-b border-white/10 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <SectionHeading eyebrow={t(content.categories.eyebrow)} title={t(content.categories.title)} />
            </Reveal>
            <p className="max-w-sm text-sm leading-relaxed text-white/45">{t(content.categories.note)}</p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {content.categories.items.map((item, index) => (
              <Reveal key={item.id} delay={index * 60} className="h-full">
                <TiltCard className="h-full">
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#120B08] p-5 transition-colors hover:border-accent/50">
                    <div aria-hidden="true" className="absolute left-0 top-0 h-px w-full bg-linear-to-r from-accent/60 to-transparent" />
                    <div aria-hidden="true" className="absolute -right-2 -top-8 font-display text-[7rem] font-semibold leading-none text-white/[0.03] transition-colors group-hover:text-accent/[0.06]">
                      {item.letter}
                    </div>
                    <div className="relative flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">{t(item.age)}</p>
                        <p className="mt-1 font-display text-5xl font-semibold leading-none text-accent">{item.letter}</p>
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
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#120B08] py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <SectionHeading eyebrow={t(content.rules.eyebrow)} title={t(content.rules.title)} note={t(content.rules.note)} />
          </Reveal>
          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            {content.rules.groups.map((group, index) => (
              <Reveal key={group.id} delay={index * 100} className="h-full">
                <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[#0B0806] p-6 sm:p-8">
                  <div aria-hidden="true" className="absolute left-0 top-0 h-px w-full bg-linear-to-r from-accent/60 via-accent/20 to-transparent" />
                  <h3 className="font-display text-2xl font-semibold text-white">{t(group.title)}</h3>
                  <ul className="mt-5 space-y-3">
                    {list(group.items).map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/55">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 border border-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <SectionHeading eyebrow={t(content.awards.eyebrow)} title={t(content.awards.title)} note={t(content.awards.note)} />
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.awards.items.map((item, index) => (
              <Reveal key={item.id} delay={index * 80} className="h-full">
                <TiltCard className="h-full">
                  <div className="group h-full rounded-2xl border border-white/10 bg-[#120B08] p-6 transition-colors hover:border-accent/50">
                    <p className="font-display text-5xl font-semibold leading-none text-accent/70">{item.place}</p>
                    <h3 className="mt-5 font-display text-2xl font-semibold text-white">{t(item.title)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/50">{t(item.description)}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#120B08] py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <SectionHeading eyebrow={t(content.jury.eyebrow)} title={t(content.jury.title)} note={t(content.jury.note)} />
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.jury.members.map((member, index) => (
              <Reveal key={member.id} delay={index * 70}>
                <div className="rounded-2xl border border-white/10 bg-[#0B0806] p-6 text-center transition-colors hover:border-accent/40">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-accent/30 font-display text-3xl font-semibold text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-4 font-semibold text-white">{t(member.role)}</h3>
                  <p className="mt-1 text-sm text-white/40">{t(member.name)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="basvuru" className="relative overflow-hidden border-b border-white/10 py-20 sm:py-28">
        <div aria-hidden="true" className="absolute inset-0">
          <Image
            src={content.application.image}
            alt=""
            fill
            sizes="100vw"
            className="forte-kenburns object-cover"
            style={{ filter: "brightness(0.42) saturate(0.65) sepia(0.22)" }}
          />
          <div className="absolute inset-0 bg-[#0B0806]/70" />
          <div className="absolute inset-0 bg-linear-to-r from-[#0B0806] via-[#0B0806]/80 to-[#0B0806]/35" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="forte-animated-border rounded-[2.5rem] p-px">
            <div className="rounded-[2.5rem] bg-[#0B0806]/92 p-6 sm:p-12">
              <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-accent">{t(content.application.eyebrow)}</p>
                  <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.02] text-white sm:text-6xl">{t(content.application.title)}</h2>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">{t(content.application.body)}</p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link
                      href={applicationHref}
                      className="group inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-[#0B0806] transition-colors hover:bg-accent/90"
                    >
                      {applicationLabel}
                      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                    <Link
                      href={contactHref}
                      className="inline-flex items-center rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent"
                    >
                      {t(content.application.contactLabel)}
                    </Link>
                  </div>
                  <p className="mt-5 max-w-xl text-xs leading-relaxed text-white/35">{t(content.application.note)}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <StatusBadge tone={statusTone}>{statusLabel}</StatusBadge>
                    <span className="text-xs text-white/40">{statusNote}</span>
                  </div>
                </div>
                <ol className="grid gap-3 sm:grid-cols-2">
                  {content.application.steps.map((step, index) => (
                    <li key={step.id} data-aos="fade-up" data-aos-delay={index * 70} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur">
                      <p className="font-display text-2xl font-semibold text-accent/70">0{index + 1}</p>
                      <h3 className="mt-2 font-semibold text-white">{t(step.title)}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-white/50">{t(step.description)}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <Reveal>
              <SectionHeading eyebrow={t(content.faq.eyebrow)} title={t(content.faq.title)} />
            </Reveal>
            <div className="space-y-3">
              {content.faq.items.map((item, index) => (
                <Reveal key={item.id} delay={index * 45}>
                  <details className="group rounded-2xl border border-white/10 bg-[#120B08] p-5 open:border-accent/40">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-white [&::-webkit-details-marker]:hidden">
                      <span>{t(item.question)}</span>
                      <span aria-hidden="true" className="shrink-0 text-xl text-accent transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-white/55">{t(item.answer)}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#120B08] py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <SectionHeading eyebrow={t(content.gallery.eyebrow)} title={t(content.gallery.title)} />
            </Reveal>
            <p className="max-w-sm text-sm leading-relaxed text-white/45">{t(content.gallery.body)}</p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {content.gallery.items.map((item, index) => (
              <Reveal key={item.id} delay={index * 70} className={index === 0 ? "col-span-2 row-span-2 h-full" : "h-full"}>
                <TiltCard className="h-full">
                  <figure className="group relative h-full min-h-[12rem] overflow-hidden rounded-2xl border border-white/10 bg-[#0B0806]">
                    <Image
                      src={item.imageUrl}
                      alt={t(item.alt)}
                      fill
                      sizes={index === 0 ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ filter: "brightness(0.72) saturate(0.78) sepia(0.14)" }}
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-[#0B0806] via-transparent to-transparent opacity-80" />
                    <figcaption className="absolute bottom-3 left-3 right-3 text-[11px] uppercase tracking-[0.18em] text-white/65">{t(item.alt)}</figcaption>
                  </figure>
                </TiltCard>
              </Reveal>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-accent/20 bg-[#0B0806] p-5">
            <div>
              <p className="font-display text-2xl text-white">{t(content.gallery.brand)}</p>
              <p className="text-sm text-white/45">{t(content.gallery.handle)}</p>
            </div>
            <a
              href={content.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-accent/40 px-5 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-[#0B0806]"
            >
              {t(content.gallery.instagramLabel)}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-[2rem] border border-white/10 bg-[#120B08] p-8 sm:p-10">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">{t(content.contact.title)}</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/55 sm:text-base">{t(content.contact.body)}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href={`tel:${content.contact.phone.replace(/\s/g, "")}`}
                  className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm text-white transition-colors hover:border-accent hover:text-accent"
                >
                  {content.contact.phone}
                </a>
                <a
                  href={`mailto:${content.contact.email}`}
                  className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm text-white transition-colors hover:border-accent hover:text-accent"
                >
                  {content.contact.email}
                </a>
                <a
                  href={content.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm text-white transition-colors hover:border-accent hover:text-accent"
                >
                  {t(content.contact.instagramLabel)}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
