import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ApplicationPage from "@/app/basvuru/ApplicationPage";
import { localizedText } from "@/lib/application-form";
import { getPublicApplicationForm } from "@/lib/application-form-data";
import { isLocale } from "@/lib/seo-content";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const isTr = locale === "tr";
  const form = await getPublicApplicationForm();
  const title = localizedText(locale, form?.titleTr, form?.titleEn)
    || (isTr ? "Bodrum Forte Müzik Festivali Başvurusu" : "Bodrum Forte Music Festival Application");
  const description = localizedText(locale, form?.descriptionTr, form?.descriptionEn)
    || (isTr
      ? "Bodrum Forte Müzik Festivali başvuru formu. Tüm enstrümanlar ve vokal kategorileri başvurabilir."
      : "Application form for the Bodrum Forte Music Festival. All instruments and vocal categories can apply.");
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/basvuru`,
      languages: { tr: "/tr/basvuru", en: "/en/basvuru", "x-default": "/basvuru" },
    },
    openGraph: {
      type: "website",
      siteName: "Multi Event",
      title: `${title} | Multi Event`,
      description,
      url: `/${locale}/basvuru`,
      locale: isTr ? "tr_TR" : "en_US",
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

export default async function LocaleApplicationPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const form = await getPublicApplicationForm();
  return <ApplicationPage form={form} />;
}
