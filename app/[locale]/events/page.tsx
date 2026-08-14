import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventPortfolio } from "@/components/EventPortfolio";
import { getEvents } from "@/lib/content";
import { isLocale } from "@/lib/seo-content";

export const revalidate = 300;
type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const isTr = locale === "tr";
  const title = isTr ? "Bodrum Etkinlik Portföyü" : "Bodrum Event Portfolio";
  const description = isTr ? "Multi Event'in Bodrum'da destek verdiği etkinliklerden fotoğraflar, videolar ve proje detayları." : "Photos, videos, and project details from events supported by Multi Event in Bodrum.";
  return { title, description, alternates: { canonical: `/${locale}/events`, languages: { tr: "/tr/events", en: "/en/events", "x-default": "/events" } }, openGraph: { title: `${title} | Multi Event`, description, url: `/${locale}/events`, locale: isTr ? "tr_TR" : "en_US", images: ["/logo.jpeg"] } };
}

export default async function LocaleEventsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <EventPortfolio events={await getEvents()} locale={locale} basePath={`/${locale}/events`} />;
}
