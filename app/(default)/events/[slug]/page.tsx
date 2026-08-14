import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventDetails } from "@/components/EventPortfolio";
import { getEventBySlug } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export const revalidate = 300;
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEventBySlug((await params).slug);
  if (!event) return {};
  return { title: event.titleTr, description: event.descriptionTr.slice(0, 160), alternates: { canonical: `/events/${event.slug}`, languages: { tr: `/tr/events/${event.slug}`, en: `/en/events/${event.slug}`, "x-default": `/events/${event.slug}` } }, openGraph: { title: `${event.titleTr} | Multi Event`, description: event.descriptionTr.slice(0, 160), url: `/events/${event.slug}`, images: ["/logo.jpeg"] } };
}

export default async function EventPage({ params }: Props) {
  const event = await getEventBySlug((await params).slug);
  if (!event) notFound();
  const data = { "@context": "https://schema.org", "@type": "Article", headline: event.titleTr, description: event.descriptionTr, image: `${siteUrl}/logo.jpeg`, datePublished: event.createdAt, dateModified: event.updatedAt, author: { "@type": "Organization", name: "Multi Event", url: siteUrl } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} /><EventDetails event={event} locale="tr" listingPath="/events" /></>;
}
