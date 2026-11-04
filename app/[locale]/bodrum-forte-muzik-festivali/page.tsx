import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ForteFestivalPage from "@/components/ForteFestivalPage";
import { getPublicApplicationForm } from "@/lib/application-form-data";
import { forteFestivalContent, forteFestivalText } from "@/lib/forte-festival";
import { isLocale } from "@/lib/seo-content";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const title = forteFestivalText(locale, forteFestivalContent.meta.title);
  const description = forteFestivalText(locale, forteFestivalContent.meta.description);
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/bodrum-forte-muzik-festivali`,
      languages: {
        tr: "/tr/bodrum-forte-muzik-festivali",
        en: "/en/bodrum-forte-muzik-festivali",
        "x-default": "/bodrum-forte-muzik-festivali",
      },
    },
    openGraph: {
      type: "website",
      siteName: "Multi Event",
      title: `${title} | Multi Event`,
      description,
      url: `/${locale}/bodrum-forte-muzik-festivali`,
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

export default async function LocaleBodrumForteFestivalRoute({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const form = await getPublicApplicationForm();
  return <ForteFestivalPage applicationOpen={form?.isOpen ?? null} />;
}
