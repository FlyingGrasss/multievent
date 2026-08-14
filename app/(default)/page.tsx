import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { homeTitle } from "@/lib/site-metadata";

export const revalidate = 300;

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: "Bodrum etkinlik organizasyon, düğün ve canlı müzik hizmetleri. Multi Event ile etkinliğinizi planlayın.",
  alternates: { canonical: "/", languages: { tr: "/tr", en: "/en", "x-default": "/" } },
  openGraph: {
    title: homeTitle,
    description: "Bodrum'da düğün, canlı müzik ve kurumsal etkinlik organizasyonu.",
    url: "/",
    images: ["/logo.jpeg"],
  },
};

export default function Home() {
  return <HomePage />;
}
