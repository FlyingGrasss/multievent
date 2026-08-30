import { cookies } from "next/headers";
import SiteDocument from "@/components/SiteDocument";

export default async function DefaultRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const storedLocale = (await cookies()).get("multievent-locale")?.value;
  const locale = storedLocale === "tr" ? "tr" : "en";
  return <SiteDocument locale={locale}>{children}</SiteDocument>;
}
