import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getArtists } from "@/lib/content";
import { isLocale } from "@/lib/seo-content";

export const revalidate = 300;
type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const isTr = locale === "tr";
  const title = isTr ? "Bodrum Canlı Müzik Sanatçıları" : "Live Music Artists in Bodrum";
  const description = isTr ? "Bodrum etkinlikleri için Multi Event canlı müzik sanatçıları, grupları ve performans seçenekleri." : "Multi Event live music artists, bands, and performance options for events in Bodrum.";
  return { title, description, alternates: { canonical: `/${locale}/team`, languages: { tr: "/tr/team", en: "/en/team", "x-default": "/team" } }, openGraph: { title: `${title} | Multi Event`, description, url: `/${locale}/team`, locale: isTr ? "tr_TR" : "en_US", images: ["/logo.jpeg"] } };
}

export default async function LocaleTeam({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const artists = await getArtists();
  const isTr = locale === "tr";
  return <main className="mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-8 sm:pt-16"><h1 className="text-center text-4xl font-bold sm:text-6xl">{isTr ? "Sanatçılarımız" : "Our artists"}</h1><p className="mx-auto mt-5 max-w-2xl text-center leading-7 text-text-secondary">{isTr ? "Bodrum'daki düğün, özel davet ve kurumsal etkinlikler için canlı performans seçeneklerini keşfedin." : "Explore live performance options for weddings, private celebrations, and corporate events in Bodrum."}</p><div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-3">{artists.map((artist) => { const content = <><Image src={artist.imageUrl} alt={isTr ? artist.nameTr : artist.nameEn} width={420} height={420} className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105" /><h2 className="p-4 text-center font-semibold">{isTr ? artist.nameTr : artist.nameEn}</h2></>; return artist.link ? <a key={artist.id} href={artist.link} target="_blank" rel="noopener noreferrer" className="group overflow-hidden rounded-2xl border border-white/10 bg-[#121212] hover:border-accent">{content}</a> : <article key={artist.id} className="group overflow-hidden rounded-2xl border border-white/10 bg-[#121212]">{content}</article>; })}</div></main>;
}
