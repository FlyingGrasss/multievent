import type { Metadata } from "next";
import { cookies } from "next/headers";
import ForteFestivalPage from "@/components/ForteFestivalPage";
import { getPublicApplicationForm } from "@/lib/application-form-data";
import { forteFestivalText } from "@/lib/forte-festival";
import { getForteFestivalContent } from "@/lib/forte-festival-store";
import type { Locale } from "@/types";

export const dynamic = "force-dynamic";

async function currentLocale(): Promise<Locale> {
  const stored = (await cookies()).get("multievent-locale")?.value;
  return stored === "tr" ? "tr" : "en";
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await currentLocale();
  const content = await getForteFestivalContent();
  const title = forteFestivalText(locale, content.meta.title);
  const description = forteFestivalText(locale, content.meta.description);
  return {
    title,
    description,
    alternates: {
      canonical: "/bodrum-forte-muzik-festivali",
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
      url: "/bodrum-forte-muzik-festivali",
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

export default async function BodrumForteFestivalRoute() {
  const [form, content] = await Promise.all([getPublicApplicationForm(), getForteFestivalContent()]);
  return <ForteFestivalPage applicationOpen={form?.isOpen ?? null} content={content} />;
}
