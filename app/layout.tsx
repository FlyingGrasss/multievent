import type { Metadata } from "next";
import "@/app/globals.css";



export const metadata = {
  title: "Multi Event | Premium Event Services in Bodrum",
  description: "Professional event planning, equipment rental, and production services in Bodrum. Contact us at +90 530 957 69 77",
  keywords: ["event planning", "Bodrum events", "party rental", "AV equipment"],
  openGraph: {
    title: "Multi Event | Premium Event Services in Bodrum",
    description: "Professional event services in Bodrum",
    url: "https://multievent.org",
    siteName: "Multi Event",
    images: [
      {
        url: "https://multievent.org/logo.svg",
        width: 630,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Multi Event | Premium Event Services in Bodrum",
    description: "Professional event services in Bodrum",
    images: ["https://multievent.org/logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

