import type { Metadata } from "next";
import { cookies } from "next/headers";
import PianoFestivalPage from "@/components/PianoFestivalPage";
import { getPublicApplicationForm } from "@/lib/application-form-data";
import { pianoFestivalContent, pianoFestivalText } from "@/lib/piano-festival";
import type { Locale } from "@/types";

export const dynamic = "force-dynamic";

async function currentLocale(): Promise<Locale> {
  const stored = (await cookies()).get("multievent-locale")?.value;
  return stored === "tr" ? "tr" : "en";
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await currentLocale();
  const title = pianoFestivalText(locale, pianoFestivalContent.meta.title);
  const description = pianoFestivalText(locale, pianoFestivalContent.meta.description);
  return {
    title,
    description,
    alternates: {
      canonical: "/bodrum-piyano-festivali",
      languages: {
        tr: "/tr/bodrum-piyano-festivali",
        en: "/en/bodrum-piyano-festivali",
        "x-default": "/bodrum-piyano-festivali",
      },
    },
    openGraph: {
      type: "website",
      siteName: "Multi Event",
      title: `${title} | Multi Event`,
      description,
      url: "/bodrum-piyano-festivali",
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

export default async function BodrumPianoFestivalRoute() {
  const form = await getPublicApplicationForm();
  return <PianoFestivalPage applicationOpen={form?.isOpen ?? null} />;
}
