import Image from "next/image";
import Link from "next/link";
import { Localized } from "@/components/Localized";
import type { EventType, Locale } from "@/types";

function eventDate(value: EventType["eventDate"], locale: Locale) {
  if (!value) return null;
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date(value));
}

export function EventPortfolio({ events, basePath }: { events: EventType[]; basePath: string }) {
  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-8 sm:pt-16">
      <h1 className="text-center text-4xl font-bold sm:text-6xl"><Localized tr="Etkinliklerimiz" en="Our events" /></h1>
      <p className="mx-auto mt-5 max-w-3xl text-center text-lg leading-8 text-text-secondary"><Localized tr="Planlama, canlı müzik ve teknik prodüksiyon desteği verdiğimiz etkinliklerden seçkiler." en="Selected events supported by our planning, live music, and technical production services." /></p>
      {events.length === 0 ? <p className="mt-14 text-center text-text-secondary"><Localized tr="Etkinlikler yakında burada yayınlanacak." en="Events will be published here soon." /></p> : <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{events.map((event) => {
        const cover = event.media.find((item) => item.type === "image") || event.media[0];
        const dateTr = eventDate(event.eventDate, "tr");
        const dateEn = eventDate(event.eventDate, "en");
        const venueTr = event.venueTr || event.venueEn;
        const venueEn = event.venueEn || event.venueTr;
        const title = <Localized tr={event.titleTr} en={event.titleEn} />;
        return <article key={event.id} className="overflow-hidden rounded-2xl border border-white/10 bg-[#121212] transition-colors hover:border-accent"><Link href={`${basePath}/${event.slug}`} className="group block">{cover?.type === "image" ? <Image src={cover.url} alt={event.titleEn} width={640} height={400} className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105" /> : cover ? <video src={cover.url} muted playsInline preload="metadata" className="aspect-[16/10] w-full object-cover" aria-label={event.titleEn} /> : <div className="aspect-[16/10] bg-[#090909]" />}<div className="p-6">{(dateTr || venueTr || dateEn || venueEn) && <p className="text-sm text-accent"><Localized tr={[dateTr, venueTr].filter(Boolean).join(" · ")} en={[dateEn, venueEn].filter(Boolean).join(" · ")} /></p>}<h2 className="mt-2 text-2xl font-semibold">{title}</h2><p className="mt-3 line-clamp-3 leading-7 text-text-secondary"><Localized tr={event.descriptionTr} en={event.descriptionEn} /></p><span className="mt-5 inline-block text-sm font-semibold text-accent"><Localized tr="Etkinliği görün →" en="View event →" /></span></div></Link></article>;
      })}</div>}
    </main>
  );
}

export function EventDetails({ event, listingPath }: { event: EventType; listingPath: string }) {
  const dateTr = eventDate(event.eventDate, "tr");
  const dateEn = eventDate(event.eventDate, "en");
  const venueTr = event.venueTr || event.venueEn;
  const venueEn = event.venueEn || event.venueTr;
  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-8 sm:pt-16">
      <Link href={listingPath} className="text-sm font-semibold text-accent hover:underline">← <Localized tr="Tüm etkinlikler" en="All events" /></Link>
      <article>
        <header className="mt-8"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Multi Event · Bodrum</p><h1 className="mt-4 text-4xl font-bold leading-tight sm:text-6xl"><Localized tr={event.titleTr} en={event.titleEn} /></h1>{(dateTr || venueTr || dateEn || venueEn) && <p className="mt-5 text-lg text-text-secondary"><Localized tr={[dateTr, venueTr].filter(Boolean).join(" · ")} en={[dateEn, venueEn].filter(Boolean).join(" · ")} /></p>}</header>
        <div className="mt-10 whitespace-pre-line text-lg leading-8 text-white/85"><Localized tr={event.descriptionTr} en={event.descriptionEn} /></div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">{event.media.map((media) => media.type === "image" ? <Image key={media.url} src={media.url} alt={event.titleEn} width={1000} height={700} className="h-auto w-full rounded-2xl object-cover" /> : <video key={media.url} src={media.url} controls playsInline preload="metadata" className="w-full rounded-2xl bg-black" aria-label={event.titleEn} />)}</div>
      </article>
    </main>
  );
}
