"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function LanguageSwitcher() {
  const { locale, toggleLocale } = useLanguage();
  return (
    <button
      type="button"
      onClick={toggleLocale}
      className="cursor-pointer rounded-full border border-white/25 px-3 py-1 text-sm font-semibold tracking-wide transition-colors hover:border-accent hover:text-accent max-sm:px-2 max-sm:py-0.5 max-sm:text-[11px]"
      aria-label={locale === "tr" ? "Switch to English" : "Türkçeye geçiş yap"}
    >
      {locale === "tr" ? "EN" : "TR"}
    </button>
  );
}
