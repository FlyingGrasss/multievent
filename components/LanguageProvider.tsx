"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/types";
import { translations, type TranslationKey } from "@/lib/i18n";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children, initialLocale }: { children: React.ReactNode; initialLocale: Locale }) {
  const pathname = usePathname();
  const routeLocale = pathname?.match(/^\/(tr|en)(?:\/|$)/)?.[1] as Locale | undefined;
  const [locale, setLocaleState] = useState<Locale>(routeLocale || initialLocale);

  function persistLocale(nextLocale: Locale) {
    window.localStorage.setItem("multievent-locale", nextLocale);
    document.cookie = `multievent-locale=${nextLocale}; Max-Age=31536000; Path=/; SameSite=Lax`;
  }

  useEffect(() => {
    if (routeLocale) {
      setLocaleState(routeLocale);
      persistLocale(routeLocale);
      document.documentElement.lang = routeLocale;
      document.documentElement.dataset.locale = routeLocale;
      document.documentElement.removeAttribute("data-locale-pending");
      return;
    }
    const stored = window.localStorage.getItem("multievent-locale");
    const systemLocale: Locale = navigator.language.toLowerCase().startsWith("tr") ? "tr" : "en";
    const nextLocale = stored === "tr" || stored === "en" ? stored : systemLocale;
    setLocaleState(nextLocale);
    persistLocale(nextLocale);
    document.documentElement.lang = nextLocale;
    document.documentElement.dataset.locale = nextLocale;
    document.documentElement.removeAttribute("data-locale-pending");
  }, [routeLocale]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dataset.locale = locale;
  }, [locale]);

  const value = useMemo(() => ({
    locale,
    setLocale: (nextLocale: Locale) => { setLocaleState(nextLocale); persistLocale(nextLocale); },
    toggleLocale: () => {
      const nextLocale = locale === "tr" ? "en" : "tr";
      setLocaleState(nextLocale);
      persistLocale(nextLocale);
    },
    t: (key: TranslationKey) => translations[locale][key],
  }), [locale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage must be used inside LanguageProvider.");
  return value;
}
