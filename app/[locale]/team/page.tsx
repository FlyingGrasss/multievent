import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TeamPage from "@/components/TeamPage";
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
  return <TeamPage />;
}
