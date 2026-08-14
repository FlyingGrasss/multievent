import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArtists, getServices } from "@/lib/content";
import { isLocale } from "@/lib/seo-content";

export const revalidate = 300;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const isTr = locale === "tr";
  const title = isTr ? "Bodrum Etkinlik Organizasyon" : "Event Planning in Bodrum";
  const description = isTr
    ? "Bodrum'da düğün, canlı müzik, kurumsal etkinlik, ses, ışık ve sahne prodüksiyonu için Multi Event."
    : "Weddings, live music, corporate events, sound, lighting, and stage production in Bodrum by Multi Event.";
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: { tr: "/tr", en: "/en", "x-default": "/" },
    },
    openGraph: { title: `${title} | Multi Event`, description, url: `/${locale}`, locale: isTr ? "tr_TR" : "en_US", images: ["/logo.jpeg"] },
  };
}

export default async function LocalizedHome({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const isTr = locale === "tr";
  const [allArtists, services] = await Promise.all([getArtists(), getServices()]);
  const artists = allArtists.slice(0, 6);

  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 pb-14 pt-14 sm:px-8 sm:pb-20 sm:pt-20">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">Multi Event · Bodrum</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight sm:text-6xl">
          {isTr ? "Bodrum etkinlik organizasyon ve canlı müzik" : "Event planning and live music in Bodrum"}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-text-secondary sm:text-xl">
          {isTr
            ? "Düğün, özel davet ve kurumsal etkinlikler için yaratıcı planlama, sanatçı seçimi, ses, ışık ve sahne prodüksiyonunu tek bir akışta buluşturuyoruz."
            : "We bring creative planning, artist selection, sound, lighting, and stage production together for weddings, private celebrations, and corporate events."}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href={`/${locale}/contact`} className="rounded-full bg-accent px-7 py-4 font-semibold text-black">{isTr ? "Teklif alın" : "Request a proposal"}</Link>
          <Link href={`/${locale}/services`} className="rounded-full border border-white/25 px-7 py-4 font-semibold hover:border-accent hover:text-accent">{isTr ? "Hizmetleri inceleyin" : "Explore services"}</Link>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#101012] py-14 sm:py-20" aria-labelledby="localized-services-title">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <h2 id="localized-services-title" className="text-3xl font-bold sm:text-5xl">{isTr ? "Bodrum'daki etkinliğiniz için" : "For your event in Bodrum"}</h2>
          <p className="mt-4 max-w-3xl leading-7 text-text-secondary">
            {isTr
              ? "Mekânın koşulları, davetli profili ve program hedefi doğrultusunda ihtiyacınız olan hizmetleri birlikte planlayın."
              : "Plan the services you need around the venue conditions, guest profile, and goals of your program."}
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <article key={service.id} className="rounded-2xl border border-white/10 bg-[#171719] p-6">
                <h3 className="text-xl font-semibold"><span aria-hidden="true" className="mr-2">{service.icon || "✦"}</span>{isTr ? service.titleTr : service.titleEn}</h3>
                {(isTr ? service.descriptionTr : service.descriptionEn) && <p className="mt-3 leading-7 text-text-secondary">{isTr ? service.descriptionTr : service.descriptionEn}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-8 sm:py-20" aria-labelledby="localized-artists-title">
        <div className="flex items-end justify-between gap-4">
          <div><h2 id="localized-artists-title" className="text-3xl font-bold sm:text-5xl">{isTr ? "Sanatçılarımız" : "Our artists"}</h2><p className="mt-3 text-text-secondary">{isTr ? "Etkinliğinizin atmosferine uygun canlı performans seçenekleri." : "Live performance options suited to the atmosphere of your event."}</p></div>
          <Link href={`/${locale}/team`} className="shrink-0 text-sm font-semibold text-accent hover:underline">{isTr ? "Tümünü görün" : "View all"}</Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
          {artists.map((artist) => <div key={artist.id} className="overflow-hidden rounded-2xl border border-white/10 bg-[#121212]"><Image src={artist.imageUrl} alt={isTr ? artist.nameTr : artist.nameEn} width={420} height={420} className="aspect-square w-full object-cover" /><p className="p-4 text-center font-semibold">{isTr ? artist.nameTr : artist.nameEn}</p></div>)}
        </div>
      </section>
    </main>
  );
}
