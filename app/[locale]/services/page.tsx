import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServices } from "@/lib/content";
import { isLocale, seoServices, servicePath } from "@/lib/seo-content";

export const revalidate = 300;
type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const isTr = locale === "tr";
  const title = isTr ? "Bodrum Etkinlik Organizasyon Hizmetleri" : "Event Services in Bodrum";
  const description = isTr ? "Düğün, canlı müzik, kurumsal etkinlik, ses, ışık ve sahne hizmetleri." : "Wedding, live music, corporate event, sound, lighting, and stage services in Bodrum.";
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/services`, languages: { tr: "/tr/services", en: "/en/services", "x-default": "/services" } },
    openGraph: { title: `${title} | Multi Event`, description, url: `/${locale}/services`, locale: isTr ? "tr_TR" : "en_US", images: ["/logo.jpeg"] },
  };
}

export default async function LocaleServices({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const isTr = locale === "tr";
  const services = await getServices();
  return (
    <main className="mx-auto max-w-5xl px-4 pb-20 pt-12 sm:px-8 sm:pt-16">
      <h1 className="text-4xl font-bold sm:text-6xl">{isTr ? "Bodrum etkinlik organizasyon hizmetleri" : "Event services in Bodrum"}</h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-text-secondary">{isTr ? "Etkinlik planlamasından canlı müziğe, ses ve ışık sistemlerinden sahne kurulumuna kadar ihtiyacınız olan kapsamı birlikte oluşturun." : "Build the right scope for your event, from planning and live music to sound, lighting, and stage setup."}</p>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {services.map((service) => <article key={service.id} className="rounded-2xl border border-accent/50 bg-[#121212] p-6"><h2 className="text-2xl font-semibold"><span aria-hidden="true" className="mr-2">{service.icon || "✦"}</span>{isTr ? service.titleTr : service.titleEn}</h2>{(isTr ? service.descriptionTr : service.descriptionEn) && <p className="mt-3 leading-7 text-text-secondary">{isTr ? service.descriptionTr : service.descriptionEn}</p>}</article>)}
      </div>
      <section className="mt-16 border-t border-white/10 pt-12" aria-labelledby="service-guides-title">
        <h2 id="service-guides-title" className="text-3xl font-bold">{isTr ? "Bodrum etkinlik rehberleri" : "Bodrum event guides"}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {seoServices.map((service) => <Link key={service.key} href={servicePath(service, locale)} className="rounded-xl border border-white/10 bg-[#121212] p-5 hover:border-accent"><h3 className="font-semibold">{service.title[locale]}</h3><span className="mt-3 inline-block text-sm font-semibold text-accent">{isTr ? "Rehberi okuyun →" : "Read guide →"}</span></Link>)}
        </div>
      </section>
    </main>
  );
}
