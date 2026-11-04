import type { Metadata } from "next";
import ApplicationPage from "@/app/basvuru/ApplicationPage";
import { getPublicApplicationForm } from "@/lib/application-form-data";

export const dynamic = "force-dynamic";

const title = "Başvuru – Genç Müzik Etkinliği";
const description = "Multi Event genç müzik etkinliği başvuru formu. Formu doldurun; başvurunuz değerlendirildikten sonra sizinle iletişime geçelim.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/basvuru",
    languages: { tr: "/tr/basvuru", en: "/en/basvuru", "x-default": "/basvuru" },
  },
  openGraph: {
    title: `${title} | Multi Event`,
    description,
    url: "/basvuru",
    images: ["/logo.jpeg"],
  },
};

export default async function ApplicationRoutePage() {
  const form = await getPublicApplicationForm();
  return <ApplicationPage form={form} />;
}
