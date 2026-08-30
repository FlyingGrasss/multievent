import AOSProvider from "@/components/AOSProvider";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";
import Navbar from "@/components/Navbar";
import { siteUrl } from "@/lib/site";
import type { Locale } from "@/types";

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#business`,
    name: "Multi Event",
    description: "Bodrum etkinlik organizasyon, düğün, canlı müzik ve etkinlik prodüksiyon hizmetleri.",
    url: siteUrl,
    image: `${siteUrl}/logo.jpeg`,
    telephone: "+905309576977",
    email: "sonertirgil@multievent.org",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Konacık Mahallesi Atatürk Bulvarı Pamir İş Merkezi No: 114-C Daire No: 8",
      addressLocality: "Bodrum",
      addressRegion: "Muğla",
      postalCode: "48400",
      addressCountry: "TR",
    },
    areaServed: ["Bodrum", "Muğla", "İzmir"],
    sameAs: ["https://www.instagram.com/multieventorg/"],
    serviceType: ["Event planning", "Wedding planning", "Live music", "Event production"],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function SiteDocument({ children, locale }: Readonly<{ children: React.ReactNode; locale: Locale }>) {
  return (
    <>
      <LanguageProvider initialLocale={locale}>
        <AOSProvider />
        <div className="min-h-screen">
          <Navbar />
          {children}
        </div>
        <Footer />
      </LanguageProvider>
      <JsonLd />
    </>
  );
}
