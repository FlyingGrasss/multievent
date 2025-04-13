import type { Metadata } from "next";
import "@/app/globals.css";
import AOSProvider from "@/components/AOSProvider";





export const metadata: Metadata = {
  title: {
    default: "Multi Event | Premium Event Services in Bodrum",
    template: "%s | Multi Event" // Dynamic title for child pages
  },
  description: "Professional event planning, equipment rental, and production services in Bodrum. Contact us at +90 530 957 69 77",
  keywords: ["event planning", "Bodrum events", "party rental", "AV equipment", "event production", "Bodrum wedding planning"],
  
  // Favicons (2-file minimal approach)
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' }, // Legacy support
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }, // Google Search
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' } // iOS
    ],
  },

  // OpenGraph (Facebook, LinkedIn, WhatsApp, etc.)
  openGraph: {
    title: "Multi Event | Premium Event Services in Bodrum",
    description: "Professional event services in Bodrum - Equipment rental, production, and planning",
    url: "https://multievent.org",
    siteName: "Multi Event",
    images: [
      {
        url: "https://multievent.org/logo.jpg", // Recommended: JPG format
        width: 1200, // Ideal width
        height: 630, // Ideal ratio (1.91:1)
        alt: "Multi Event - Professional event services in Bodrum",
      },
    ],
    locale: "en_US",
    type: "website",
    // For local business (optional but recommended)
    emails: ["sonertirgil@multievent.org"],
    phoneNumbers: ["+905309576977"],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Multi Event | Premium Event Services in Bodrum",
    description: "Professional event services in Bodrum - Equipment rental, production, and planning",
    images: ["https://multievent.org/logo.jpg"], // Same as OG image
    creator: "@multievent", // Your Twitter handle (if available)
  },

  // Additional optimizations
  metadataBase: new URL("https://multievent.org"), // Base URL for all metadata
  alternates: {
    canonical: "/", // Helps prevent duplicate content
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  manifest: "/manifest.webmanifest" // Create this file
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className="overflow-x-hidden max-w-screen" lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" /> 
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta name="theme-color" content="#0C0C0C" /> 
      </head>
      <body className="overflow-x-hidden max-w-screen">
        <AOSProvider />
        {children}
      </body>
    </html>
  );
}

