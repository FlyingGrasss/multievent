import type { Metadata } from "next";
import ApplicationPage from "@/app/basvuru/ApplicationPage";
import { localizedText } from "@/lib/application-form";
import { getPublicApplicationForm } from "@/lib/application-form-data";

export const dynamic = "force-dynamic";

const fallbackTitle = "Bodrum Piyano Festivali 2026 Başvurusu";
const fallbackDescription = "Bodrum Piyano Festivali 2026 başvuru formu. Bu form yalnızca piyano öğrencileri içindir. Başvurular ücretsizdir.";

export async function generateMetadata(): Promise<Metadata> {
  const form = await getPublicApplicationForm();
  const title = localizedText("tr", form?.titleTr, form?.titleEn) || fallbackTitle;
  const description = localizedText("tr", form?.descriptionTr, form?.descriptionEn) || fallbackDescription;
  return {
    title,
    description,
    alternates: {
      canonical: "/basvuru",
      languages: { tr: "/tr/basvuru", en: "/en/basvuru", "x-default": "/basvuru" },
    },
    openGraph: {
      type: "website",
      siteName: "Multi Event",
      title: `${title} | Multi Event`,
      description,
      url: "/basvuru",
      locale: "tr_TR",
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

export default async function ApplicationRoutePage() {
  const form = await getPublicApplicationForm();
  return <ApplicationPage form={form} />;
}
