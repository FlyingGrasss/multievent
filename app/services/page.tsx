import type { Metadata } from "next";
import { getServices } from "@/lib/content";
import { Localized } from "@/components/Localized";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "Bodrum Etkinlik Organizasyon Hizmetleri",
  description: "Bodrum düğün organizasyonu, canlı müzik, ses, ışık, sahne ve kurumsal etkinlik hizmetleri.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Bodrum Etkinlik Organizasyon Hizmetleri | Multi Event",
    description: "Bodrum düğün organizasyonu, canlı müzik, ses, ışık, sahne ve kurumsal etkinlik hizmetleri.",
    url: "/services",
  },
};

export default async function Services() {
  const services = await getServices();
  return (
    <main className="mx-auto pb-20 max-sm:pb-12">
      <h1 className="mt-16 text-center text-6xl font-bold max-sm:mt-8 max-sm:text-3xl"><Localized tr="Hizmetlerimiz" en="Our services" /></h1>
      <p className="mx-auto mt-6 max-w-2xl px-4 text-center text-lg text-text-secondary"><Localized tr="Bodrum etkinlik organizasyon ihtiyaçlarınız için yaratıcı planlama ve güçlü prodüksiyon." en="Creative planning and powerful production for your Bodrum event." /></p>
      <ul className="mx-auto mt-12 flex max-w-2xl flex-col gap-4 px-4 text-xl max-sm:text-lg">
        {services.map((service) => <li className="rounded-lg border border-accent bg-[#121212] p-5" key={service.id}>
          <div className="flex items-start gap-3"><span aria-hidden="true">{service.icon || "✦"}</span><div><h2 className="font-semibold"><Localized tr={service.titleTr} en={service.titleEn} /></h2>{(service.descriptionTr || service.descriptionEn) && <p className="mt-2 text-base text-text-secondary"><Localized tr={service.descriptionTr || service.titleTr} en={service.descriptionEn || service.titleEn} /></p>}</div></div>
        </li>)}
      </ul>
    </main>
  );
}
