import type { MetadataRoute } from "next";
import { getEvents } from "@/lib/content";
import { seoServices, servicePath, supportedLocales } from "@/lib/seo-content";
import { siteUrl } from "@/lib/site";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const events = await getEvents();
  const legacy: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/services`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/team`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/events`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/contact`, changeFrequency: "yearly", priority: 0.6 },
  ];
  const sectionPaths = ["", "/services", "/team", "/events", "/contact"];
  const localized: MetadataRoute.Sitemap = supportedLocales.flatMap((locale) => sectionPaths.map((path) => ({
    url: `${siteUrl}/${locale}${path}`,
    changeFrequency: path === "" ? "weekly" as const : "monthly" as const,
    priority: path === "" ? 1 : path === "/services" ? 0.9 : 0.8,
    alternates: {
      languages: {
        tr: `${siteUrl}/tr${path}`,
        en: `${siteUrl}/en${path}`,
        "x-default": `${siteUrl}${path || "/"}`,
      },
    },
  })));
  const servicePages: MetadataRoute.Sitemap = supportedLocales.flatMap((locale) => seoServices.map((service) => ({
    url: `${siteUrl}${servicePath(service, locale)}`,
    changeFrequency: "monthly" as const,
    priority: 0.9,
    alternates: {
      languages: {
        tr: `${siteUrl}${servicePath(service, "tr")}`,
        en: `${siteUrl}${servicePath(service, "en")}`,
        "x-default": `${siteUrl}${servicePath(service, "tr")}`,
      },
    },
  })));
  const legacyEventPages: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${siteUrl}/events/${event.slug}`,
    lastModified: event.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const localizedEventPages: MetadataRoute.Sitemap = supportedLocales.flatMap((locale) => events.map((event) => ({
    url: `${siteUrl}/${locale}/events/${event.slug}`,
    lastModified: event.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    alternates: {
      languages: {
        tr: `${siteUrl}/tr/events/${event.slug}`,
        en: `${siteUrl}/en/events/${event.slug}`,
        "x-default": `${siteUrl}/events/${event.slug}`,
      },
    },
  })));
  return [...legacy, ...localized, ...servicePages, ...legacyEventPages, ...localizedEventPages];
}
