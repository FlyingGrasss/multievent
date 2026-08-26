import { Montserrat } from "next/font/google";
import AOSProvider from "@/components/AOSProvider";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";
import Navbar from "@/components/Navbar";
import { siteUrl } from "@/lib/site";
import type { Locale } from "@/types";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

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
    <html lang={locale} data-locale={locale} data-locale-pending className="overflow-x-hidden" suppressHydrationWarning>
      <script dangerouslySetInnerHTML={{ __html: `try { const route = location.pathname.match(/^\\/(tr|en)(?:\\/|$)/)?.[1]; const stored = localStorage.getItem('multievent-locale'); const l = route || (stored === 'tr' || stored === 'en' ? stored : ((navigator.language || '').toLowerCase().startsWith('tr') ? 'tr' : 'en')); document.documentElement.lang = l; document.documentElement.dataset.locale = l; } catch (_) {}` }} />
      <body className={`${montserrat.variable} overflow-x-hidden antialiased`}>
        <LanguageProvider initialLocale={locale}>
          <AOSProvider />
          <div className="min-h-screen">
            <Navbar />
            {children}
          </div>
          <Footer />
        </LanguageProvider>
        <JsonLd />
      </body>
    </html>
  );
}
