import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { siteMetadata, siteViewport } from "@/lib/site-metadata";
import "@/app/globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  preload: true,
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
      <body className={`${montserrat.variable} overflow-x-hidden antialiased`}>
        <script dangerouslySetInnerHTML={{ __html: localeScript }} />
        {children}
      </body>
    </html>
  );
}
