import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomePage from "@/components/HomePage";
import { isLocale } from "@/lib/seo-content";
import { homeTitle } from "@/lib/site-metadata";

export const revalidate = 300;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const isTr = locale === "tr";
  const description = isTr
    ? "Bodrum'da düğün, canlı müzik, kurumsal etkinlik, ses, ışık ve sahne prodüksiyonu için Multi Event."
    : "Weddings, live music, corporate events, sound, lighting, and stage production in Bodrum by Multi Event.";
  return {
    title: { absolute: homeTitle },
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: { tr: "/tr", en: "/en", "x-default": "/" },
    },
    openGraph: { title: homeTitle, description, url: `/${locale}`, locale: isTr ? "tr_TR" : "en_US", images: ["/logo.jpeg"] },
  };
}

export default async function LocalizedHome({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <HomePage />;
}
