import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicesPage from "@/components/ServicesPage";
import { isLocale } from "@/lib/seo-content";

export const revalidate = 300;
type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const isTr = locale === "tr";
  const title = isTr ? "Bodrum Etkinlik Organizasyon Hizmetleri" : "Event Services in Bodrum";
  const description = isTr ? "Düğün, canlı müzik, kurumsal etkinlik, ses, ışık ve sahne hizmetleri." : "Wedding, live music, corporate event, sound, lighting, and stage services in Bodrum.";
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/services`, languages: { tr: "/tr/services", en: "/en/services", "x-default": "/services" } },
    openGraph: { title: `${title} | Multi Event`, description, url: `/${locale}/services`, locale: isTr ? "tr_TR" : "en_US", images: ["/logo.jpeg"] },
  };
}

export default async function LocaleServices({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ServicesPage />;
}
