import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ApplicationPage from "@/app/basvuru/ApplicationPage";
import { getPublicApplicationForm } from "@/lib/application-form-data";
import { isLocale } from "@/lib/seo-content";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const isTr = locale === "tr";
  const title = isTr ? "Genç Müzik Etkinliği Başvurusu" : "Youth Music Event Application";
  const description = isTr
    ? "Multi Event genç müzik etkinliğinde sahne almak için başvuru formunu doldurun."
    : "Fill in the application form to perform at the Multi Event youth music event.";
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/basvuru`,
      languages: { tr: "/tr/basvuru", en: "/en/basvuru", "x-default": "/basvuru" },
    },
    openGraph: {
      title: `${title} | Multi Event`,
      description,
      url: `/${locale}/basvuru`,
      locale: isTr ? "tr_TR" : "en_US",
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
