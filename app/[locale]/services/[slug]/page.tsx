import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Localized } from "@/components/Localized";
import { getSeoService, isLocale, seoServices, servicePath, supportedLocales } from "@/lib/seo-content";
import { siteUrl } from "@/lib/site";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return supportedLocales.flatMap((locale) => seoServices.map((service) => ({ locale, slug: service.slug[locale] })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const service = getSeoService(locale, slug);
  if (!service) return {};
  const canonical = servicePath(service, locale);
  return {
    title: service.title[locale],
    description: service.description[locale],
    alternates: {
      canonical,
      languages: { tr: servicePath(service, "tr"), en: servicePath(service, "en"), "x-default": servicePath(service, "tr") },
    },
    openGraph: {
      title: `${service.title[locale]} | Multi Event`,
      description: service.description[locale],
      url: canonical,
      locale: locale === "tr" ? "tr_TR" : "en_US",
      images: ["/logo.jpeg"],
    },
  };
}

export default async function ServiceLandingPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const service = getSeoService(locale, slug);
  if (!service) notFound();
  const canonical = servicePath(service, locale);
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title[locale],
      description: service.description[locale],
      url: `${siteUrl}${canonical}`,
      areaServed: { "@type": "City", name: "Bodrum" },
      provider: { "@type": "LocalBusiness", "@id": `${siteUrl}/#business`, name: "Multi Event" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faqs[locale].map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: locale === "tr" ? "Ana sayfa" : "Home", item: `${siteUrl}/${locale}` },
        { "@type": "ListItem", position: 2, name: locale === "tr" ? "Hizmetler" : "Services", item: `${siteUrl}/${locale}/services` },
        { "@type": "ListItem", position: 3, name: service.title[locale], item: `${siteUrl}${canonical}` },
      ],
    },
  ];
  const jsonLd = JSON.stringify(structuredData).replace(/</g, "\\u003c");

  return (
    <main className="mx-auto max-w-5xl px-4 pb-20 pt-10 sm:px-8 sm:pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <nav aria-label={locale === "tr" ? "Sayfa yolu" : "Breadcrumb"} className="text-sm text-text-secondary"><Link href={`/${locale}`}><Localized tr="Ana sayfa" en="Home" /></Link><span className="mx-2">/</span><Link href={`/${locale}/services`}><Localized tr="Hizmetler" en="Services" /></Link></nav>
      <article>
        <header className="mt-8 border-b border-white/10 pb-10"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Multi Event · Bodrum</p><h1 className="mt-4 text-4xl font-bold leading-tight sm:text-6xl"><Localized tr={service.title.tr} en={service.title.en} /></h1><p className="mt-6 max-w-3xl text-lg leading-8 text-text-secondary"><Localized tr={service.description.tr} en={service.description.en} /></p></header>
        <div className="mt-10 space-y-6 text-lg leading-8 text-white/85">{service.introduction.tr.map((paragraph, index) => <p key={paragraph}><Localized tr={paragraph} en={service.introduction.en[index] || paragraph} /></p>)}</div>
        <section className="mt-12 rounded-2xl border border-accent/40 bg-[#121212] p-6 sm:p-8" aria-labelledby="scope-title"><h2 id="scope-title" className="text-2xl font-bold"><Localized tr="Planlama kapsamı" en="Planning scope" /></h2><ul className="mt-5 grid gap-3 sm:grid-cols-2">{service.highlights.tr.map((highlight, index) => <li key={highlight} className="flex gap-3"><span aria-hidden="true" className="text-accent">✓</span><span><Localized tr={highlight} en={service.highlights.en[index] || highlight} /></span></li>)}</ul></section>
        <section className="mt-14" aria-labelledby="faq-title"><h2 id="faq-title" className="text-3xl font-bold"><Localized tr="Sık sorulan sorular" en="Frequently asked questions" /></h2><div className="mt-6 space-y-4">{service.faqs.tr.map((faq, index) => { const englishFaq = service.faqs.en[index] || faq; return <div key={faq.question} className="rounded-xl border border-white/10 bg-[#121212] p-6"><h3 className="text-lg font-semibold"><Localized tr={faq.question} en={englishFaq.question} /></h3><p className="mt-2 leading-7 text-text-secondary"><Localized tr={faq.answer} en={englishFaq.answer} /></p></div>; })}</div></section>
        <section className="mt-14 rounded-2xl bg-accent p-7 text-black sm:p-10"><h2 className="text-3xl font-bold"><Localized tr="Etkinliğinizi birlikte planlayalım" en="Let’s plan your event" /></h2><p className="mt-3 max-w-2xl leading-7"><Localized tr="Tarih, mekân ve ihtiyaçlarınızı paylaşın; etkinliğinize uygun kapsamı birlikte oluşturalım." en="Share your date, venue, and requirements so we can define the right scope for your event." /></p><Link href={`/${locale}/contact`} className="mt-6 inline-block rounded-full bg-black px-6 py-3 font-semibold text-white"><Localized tr="Teklif isteyin" en="Request a proposal" /></Link></section>
      </article>
    </main>
  );
}
