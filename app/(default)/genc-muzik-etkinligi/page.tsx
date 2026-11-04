import type { Metadata } from "next";
import { cookies } from "next/headers";
import YouthMusicEventPage from "@/components/YouthMusicEventPage";
import { getPublicApplicationForm } from "@/lib/application-form-data";
import { youthEventContent, youthEventText } from "@/lib/youth-event";
import type { Locale } from "@/types";

export const dynamic = "force-dynamic";

async function currentLocale(): Promise<Locale> {
  const stored = (await cookies()).get("multievent-locale")?.value;
  return stored === "tr" ? "tr" : "en";
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await currentLocale();
  const title = youthEventText(locale, youthEventContent.title);
  const description = youthEventText(locale, youthEventContent.metaDescription);
  return {
    title,
    description,
    alternates: {
      canonical: "/genc-muzik-etkinligi",
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
      url: "/genc-muzik-etkinligi",
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

export default async function YouthMusicEventRoute() {
  const form = await getPublicApplicationForm();
  return <YouthMusicEventPage applicationOpen={form?.isOpen ?? null} />;
}
