import type { Metadata } from "next";
import ServicesPage from "@/components/ServicesPage";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "Bodrum Etkinlik Organizasyon Hizmetleri",
  description: "Bodrum düğün organizasyonu, canlı müzik, ses, ışık, sahne ve kurumsal etkinlik hizmetleri.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Bodrum Etkinlik Organizasyon Hizmetleri | Multi Event",
    description: "Bodrum düğün organizasyonu, canlı müzik, ses, ışık, sahne ve kurumsal etkinlik hizmetleri.",
    url: "/services",
    images: ["/logo.jpeg"],
  },
};

export default function Services() {
  return <ServicesPage />;
}
