import SiteDocument from "@/components/SiteDocument";

export function generateStaticParams() {
  return [{ locale: "tr" }, { locale: "en" }];
}

export default async function LocaleRootLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  return <SiteDocument locale={locale === "tr" ? "tr" : "en"}>{children}</SiteDocument>;
}
