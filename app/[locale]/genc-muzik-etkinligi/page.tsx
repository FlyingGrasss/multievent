import type { Metadata } from "next";
import { notFound } from "next/navigation";
import YouthMusicEventPage from "@/components/YouthMusicEventPage";
import { getPublicApplicationForm } from "@/lib/application-form-data";
import { isLocale } from "@/lib/seo-content";
import { youthEventContent, youthEventText } from "@/lib/youth-event";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const title = youthEventText(locale, youthEventContent.title);
  const description = youthEventText(locale, youthEventContent.metaDescription);
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/genc-muzik-etkinligi`,
      languages: {
        tr: "/tr/genc-muzik-etkinligi",
        en: "/en/genc-muzik-etkinligi",
        "x-default": "/genc-muzik-etkinligi",
      },
    },
    openGraph: {
      type: "website",
      siteName: "Multi Event",
      title: `${title} | Multi Event`,
      description,
      url: `/${locale}/genc-muzik-etkinligi`,
      locale: locale === "tr" ? "tr_TR" : "en_US",
      images: ["/logo.jpeg"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Multi Event`,
      description,
      images: ["/logo.jpeg"],
    },
  };
}

export default async function LocaleYouthMusicEventRoute({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const form = await getPublicApplicationForm();
  return <YouthMusicEventPage applicationOpen={form?.isOpen ?? null} />;
}
