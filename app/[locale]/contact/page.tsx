import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactForm from "@/app/contact/ContactForm";
import { isLocale } from "@/lib/seo-content";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const isTr = locale === "tr";
  const title = isTr ? "Bodrum Etkinlik Teklifi ve İletişim" : "Bodrum Event Proposal and Contact";
  const description = isTr ? "Bodrum etkinlik organizasyon, düğün ve canlı müzik teklifiniz için Multi Event ile iletişime geçin." : "Contact Multi Event for a Bodrum event-planning, wedding, or live-music proposal.";
  return { title, description, alternates: { canonical: `/${locale}/contact`, languages: { tr: "/tr/contact", en: "/en/contact", "x-default": "/contact" } }, openGraph: { title: `${title} | Multi Event`, description, url: `/${locale}/contact`, locale: isTr ? "tr_TR" : "en_US", images: ["/logo.jpeg"] } };
}

export default async function LocaleContact({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ContactForm />;
}
