import type { Metadata, Viewport } from "next";
import SiteDocument from "@/components/SiteDocument";
import { siteMetadata, siteViewport } from "@/lib/site-metadata";
import "@/app/globals.css";

export const metadata: Metadata = siteMetadata;
export const viewport: Viewport = siteViewport;

export default function DefaultRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteDocument locale="en">{children}</SiteDocument>;
}
