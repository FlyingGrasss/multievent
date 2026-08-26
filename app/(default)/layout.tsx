import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import SiteDocument from "@/components/SiteDocument";
import { siteMetadata, siteViewport } from "@/lib/site-metadata";
import "@/app/globals.css";

export const metadata: Metadata = siteMetadata;
export const viewport: Viewport = siteViewport;

export default async function DefaultRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const storedLocale = (await cookies()).get("multievent-locale")?.value;
  const locale = storedLocale === "tr" ? "tr" : "en";
  return <SiteDocument locale={locale}>{children}</SiteDocument>;
}
