import type { Metadata } from "next";
import { EventPortfolio } from "@/components/EventPortfolio";
import { getEvents } from "@/lib/content";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "Bodrum Etkinlik Portföyü",
  description: "Multi Event'in Bodrum'da planlama, canlı müzik ve teknik prodüksiyon desteği verdiği etkinlikler.",
  alternates: { canonical: "/events", languages: { tr: "/tr/events", en: "/en/events", "x-default": "/events" } },
  openGraph: { title: "Bodrum Etkinlik Portföyü | Multi Event", description: "Multi Event etkinliklerinden fotoğraf, video ve proje detayları.", url: "/events", images: ["/logo.jpeg"] },
};

export default async function EventsPage() {
  return <EventPortfolio events={await getEvents()} basePath="/events" />;
}
