import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import AOSProvider from "@/components/AOSProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://multievent.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Multi Event | Bodrum Etkinlik Organizasyon",
    template: "%s | Multi Event",
  },
  description: "Bodrum etkinlik organizasyon, düğün, canlı müzik, sahne, ses ve ışık prodüksiyonu. Multi Event ile unutulmaz etkinlikler planlayın.",
  keywords: ["Bodrum etkinlik organizasyon", "Bodrum düğün organizasyonu", "Bodrum canlı müzik", "etkinlik prodüksiyon", "ses ışık kiralama"],
  authors: [{ name: "Multi Event" }],
  creator: "Multi Event",
  alternates: {
    canonical: "/",
    languages: { tr: "/", en: "/?lang=en" },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    alternateLocale: "en_US",
    url: siteUrl,
    siteName: "Multi Event",
    title: "Multi Event | Bodrum Etkinlik Organizasyon",
    description: "Bodrum'da düğün, canlı müzik ve kurumsal etkinlik organizasyonu.",
    images: [{ url: "/logo.jpeg", width: 1200, height: 630, alt: "Multi Event Bodrum etkinlik organizasyon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Multi Event | Bodrum Etkinlik Organizasyon",
    description: "Bodrum'da profesyonel etkinlik organizasyonu ve prodüksiyon.",
    images: ["/logo.jpeg"],
  },
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }, { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  manifest: "/manifest.webmanifest",
};

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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-locale="en" className="overflow-x-hidden" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0C0C0C" />
        <script dangerouslySetInnerHTML={{ __html: `try { const stored = localStorage.getItem('multievent-locale'); const l = stored === 'tr' || stored === 'en' ? stored : ((navigator.language || '').toLowerCase().startsWith('tr') ? 'tr' : 'en'); document.documentElement.lang = l; document.documentElement.dataset.locale = l; } catch (_) {}` }} />
      </head>
      <body className={`${montserrat.variable} overflow-x-hidden antialiased`}>
        <LanguageProvider>
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
