import Image from "next/image";
import Link from "next/link";
import type { EventType, Locale } from "@/types";

function eventDate(value: EventType["eventDate"], locale: Locale) {
  if (!value) return null;
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date(value));
}

export function EventPortfolio({ events, locale, basePath }: { events: EventType[]; locale: Locale; basePath: string }) {
  const isTr = locale === "tr";
  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-8 sm:pt-16">
      <h1 className="text-center text-4xl font-bold sm:text-6xl">{isTr ? "Etkinliklerimiz" : "Our events"}</h1>
      <p className="mx-auto mt-5 max-w-3xl text-center text-lg leading-8 text-text-secondary">{isTr ? "Planlama, canlı müzik ve teknik prodüksiyon desteği verdiğimiz etkinliklerden seçkiler." : "Selected events supported by our planning, live music, and technical production services."}</p>
      {events.length === 0 ? <p className="mt-14 text-center text-text-secondary">{isTr ? "Etkinlikler yakında burada yayınlanacak." : "Events will be published here soon."}</p> : <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{events.map((event) => {
        const cover = event.media.find((item) => item.type === "image") || event.media[0];
        const title = isTr ? event.titleTr : event.titleEn;
        const description = isTr ? event.descriptionTr : event.descriptionEn;
        const venue = isTr ? event.venueTr : event.venueEn;
        const date = eventDate(event.eventDate, locale);
        return <article key={event.id} className="overflow-hidden rounded-2xl border border-white/10 bg-[#121212] transition-colors hover:border-accent"><Link href={`${basePath}/${event.slug}`} className="group block">{cover?.type === "image" ? <Image src={cover.url} alt={title} width={640} height={400} className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105" /> : cover ? <video src={cover.url} muted playsInline preload="metadata" className="aspect-[16/10] w-full object-cover" aria-label={title} /> : <div className="aspect-[16/10] bg-[#090909]" />}<div className="p-6">{(date || venue) && <p className="text-sm text-accent">{[date, venue].filter(Boolean).join(" · ")}</p>}<h2 className="mt-2 text-2xl font-semibold">{title}</h2><p className="mt-3 line-clamp-3 leading-7 text-text-secondary">{description}</p><span className="mt-5 inline-block text-sm font-semibold text-accent">{isTr ? "Etkinliği görün →" : "View event →"}</span></div></Link></article>;
      })}</div>}
    </main>
  );
}

export function EventDetails({ event, locale, listingPath }: { event: EventType; locale: Locale; listingPath: string }) {
  const isTr = locale === "tr";
  const title = isTr ? event.titleTr : event.titleEn;
  const description = isTr ? event.descriptionTr : event.descriptionEn;
  const venue = isTr ? event.venueTr : event.venueEn;
  const date = eventDate(event.eventDate, locale);
  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-8 sm:pt-16">
      <Link href={listingPath} className="text-sm font-semibold text-accent hover:underline">← {isTr ? "Tüm etkinlikler" : "All events"}</Link>
      <article>
        <header className="mt-8"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Multi Event · Bodrum</p><h1 className="mt-4 text-4xl font-bold leading-tight sm:text-6xl">{title}</h1>{(date || venue) && <p className="mt-5 text-lg text-text-secondary">{[date, venue].filter(Boolean).join(" · ")}</p>}</header>
        <div className="mt-10 whitespace-pre-line text-lg leading-8 text-white/85">{description}</div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">{event.media.map((media) => media.type === "image" ? <Image key={media.url} src={media.url} alt={title} width={1000} height={700} className="h-auto w-full rounded-2xl object-cover" /> : <video key={media.url} src={media.url} controls playsInline preload="metadata" className="w-full rounded-2xl bg-black" aria-label={title} />)}</div>
      </article>
    </main>
  );
}
