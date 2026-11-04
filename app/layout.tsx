import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { siteMetadata, siteViewport } from "@/lib/site-metadata";
import "@/app/globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = siteMetadata;
export const viewport: Viewport = siteViewport;

const localeScript = `try {
  const route = location.pathname.match(/^\\/(tr|en)(?:\\/|$)/)?.[1];
  const stored = localStorage.getItem("multievent-locale");
  const locale = route || (stored === "tr" || stored === "en" ? stored : ((navigator.language || "").toLowerCase().startsWith("tr") ? "tr" : "en"));
  document.documentElement.lang = locale;
  document.documentElement.dataset.locale = locale;
} catch (_) {
  document.documentElement.lang = "en";
  document.documentElement.dataset.locale = "en";
} finally {
  document.documentElement.removeAttribute("data-locale-pending");
}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-locale="en"
      data-locale-pending
      className="overflow-x-hidden"
      suppressHydrationWarning
    >
      <body className={`${montserrat.variable} ${cormorant.variable} overflow-x-hidden antialiased`}>
        <script dangerouslySetInnerHTML={{ __html: localeScript }} />
        {children}
      </body>
    </html>
  );
}
