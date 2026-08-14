import type { Metadata, Viewport } from "next";
import SiteDocument from "@/components/SiteDocument";
import { siteMetadata, siteViewport } from "@/lib/site-metadata";
import "@/app/globals.css";

export const metadata: Metadata = siteMetadata;
export const viewport: Viewport = siteViewport;

export function generateStaticParams() {
  return [{ locale: "tr" }, { locale: "en" }];
}

export default async function LocaleRootLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  return <SiteDocument locale={locale === "tr" ? "tr" : "en"}>{children}</SiteDocument>;
}
