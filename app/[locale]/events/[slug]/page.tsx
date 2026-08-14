import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventDetails } from "@/components/EventPortfolio";
import { getEventBySlug } from "@/lib/content";
import { isLocale } from "@/lib/seo-content";
import { siteUrl } from "@/lib/site";

export const revalidate = 300;
type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const event = await getEventBySlug(slug);
  if (!event) return {};
  const title = locale === "tr" ? event.titleTr : event.titleEn;
  const description = (locale === "tr" ? event.descriptionTr : event.descriptionEn).slice(0, 160);
  return { title, description, alternates: { canonical: `/${locale}/events/${slug}`, languages: { tr: `/tr/events/${slug}`, en: `/en/events/${slug}`, "x-default": `/events/${slug}` } }, openGraph: { title: `${title} | Multi Event`, description, url: `/${locale}/events/${slug}`, locale: locale === "tr" ? "tr_TR" : "en_US", images: ["/logo.jpeg"] } };
}

export default async function LocaleEventPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const event = await getEventBySlug(slug);
  if (!event) notFound();
  const title = locale === "tr" ? event.titleTr : event.titleEn;
  const description = locale === "tr" ? event.descriptionTr : event.descriptionEn;
  const data = { "@context": "https://schema.org", "@type": "Article", headline: title, description, image: `${siteUrl}/logo.jpeg`, datePublished: event.createdAt, dateModified: event.updatedAt, inLanguage: locale, author: { "@type": "Organization", name: "Multi Event", url: siteUrl } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} /><EventDetails event={event} locale={locale} listingPath={`/${locale}/events`} /></>;
}
