import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PianoFestivalPage from "@/components/PianoFestivalPage";
import { getPublicApplicationForm } from "@/lib/application-form-data";
import { pianoFestivalContent, pianoFestivalText } from "@/lib/piano-festival";
import { isLocale } from "@/lib/seo-content";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const title = pianoFestivalText(locale, pianoFestivalContent.meta.title);
  const description = pianoFestivalText(locale, pianoFestivalContent.meta.description);
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/bodrum-piyano-festivali`,
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
      url: `/${locale}/bodrum-piyano-festivali`,
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

export default async function LocaleBodrumPianoFestivalRoute({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const form = await getPublicApplicationForm();
  return <PianoFestivalPage applicationOpen={form?.isOpen ?? null} />;
}
