"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { usePathname, useRouter } from "next/navigation";

const serviceSlugPairs = [
  ["bodrum-etkinlik-organizasyon", "bodrum-event-planning"],
  ["bodrum-dugun-organizasyonu", "bodrum-wedding-planning"],
  ["bodrum-canli-muzik", "live-music-bodrum"],
  ["kurumsal-etkinlik-organizasyonu", "corporate-events-bodrum"],
  ["ses-isik-sahne-kiralama", "sound-lighting-stage-rental-bodrum"],
] as const;

export default function LanguageSwitcher() {
  const { locale, toggleLocale } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale() {
    const nextLocale = locale === "tr" ? "en" : "tr";
    toggleLocale();
    const servicePath = pathname.match(/^\/(tr|en)\/services\/([^/]+)$/);
    if (servicePath) {
      const pair = serviceSlugPairs.find(([trSlug, enSlug]) => trSlug === servicePath[2] || enSlug === servicePath[2]);
      if (pair) {
        router.push(`/${nextLocale}/services/${nextLocale === "tr" ? pair[0] : pair[1]}`);
        return;
      }
    }
    const localizedPath = pathname.match(/^\/(tr|en)(\/.*)?$/);
    router.push(localizedPath ? `/${nextLocale}${localizedPath[2] || ""}` : `/${nextLocale}${pathname === "/" ? "" : pathname}`);
  }
  return (
    <button
      type="button"
      onClick={switchLocale}
      className="cursor-pointer rounded-full border border-white/25 px-3 py-1 text-sm font-semibold tracking-wide transition-colors hover:border-accent hover:text-accent"
      aria-label={locale === "tr" ? "Switch to English" : "Türkçeye geçiş yap"}
    >
      {locale === "tr" ? "EN" : "TR"}
    </button>
  );
}
