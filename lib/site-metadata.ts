import type { Metadata, Viewport } from "next";
import { siteUrl } from "@/lib/site";

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Multi Event | Bodrum Etkinlik Organizasyon",
    template: "%s | Multi Event",
  },
  description: "Bodrum etkinlik organizasyon, düğün, canlı müzik, sahne, ses ve ışık prodüksiyonu. Multi Event ile unutulmaz etkinlikler planlayın.",
  keywords: ["Bodrum etkinlik organizasyon", "Bodrum düğün organizasyonu", "Bodrum canlı müzik", "etkinlik prodüksiyon", "ses ışık kiralama"],
  authors: [{ name: "Multi Event" }],
  creator: "Multi Event",
  alternates: {
    canonical: "/",
    languages: { tr: "/tr", en: "/en", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    alternateLocale: "en_US",
    url: siteUrl,
    siteName: "Multi Event",
    title: "Multi Event | Bodrum Etkinlik Organizasyon",
    description: "Bodrum'da düğün, canlı müzik ve kurumsal etkinlik organizasyonu.",
    images: [{ url: "/logo.jpeg", width: 1024, height: 1024, alt: "Multi Event logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Multi Event | Bodrum Etkinlik Organizasyon",
    description: "Bodrum'da profesyonel etkinlik organizasyonu ve prodüksiyon.",
    images: ["/logo.jpeg"],
  },
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  manifest: "/manifest.webmanifest",
};

export const siteViewport: Viewport = {
  themeColor: "#0C0C0C",
  colorScheme: "dark",
};
