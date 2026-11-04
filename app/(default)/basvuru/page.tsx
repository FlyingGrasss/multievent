import type { Metadata } from "next";
import ApplicationPage from "@/app/basvuru/ApplicationPage";
import { localizedText } from "@/lib/application-form";
import { getPublicApplicationForm } from "@/lib/application-form-data";

export const dynamic = "force-dynamic";

const fallbackTitle = "Bodrum Forte Müzik Festivali Başvurusu";
const fallbackDescription = "Bodrum Forte Müzik Festivali başvuru formu. Tüm enstrümanlar ve vokal kategorileri başvurabilir. Başvurular ücretsizdir.";

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
