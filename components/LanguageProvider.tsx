"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Locale } from "@/types";
import { translations, type TranslationKey } from "@/lib/i18n";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("multievent-locale");
    const systemLocale: Locale = navigator.language.toLowerCase().startsWith("tr") ? "tr" : "en";
    const nextLocale = stored === "tr" || stored === "en" ? stored : systemLocale;
    setLocaleState(nextLocale);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dataset.locale = locale;
  }, [locale]);

  const value = useMemo(() => ({
    locale,
    setLocale: (nextLocale: Locale) => {
      setLocaleState(nextLocale);
      window.localStorage.setItem("multievent-locale", nextLocale);
    },
    toggleLocale: () => {
      const nextLocale = locale === "tr" ? "en" : "tr";
      setLocaleState(nextLocale);
      window.localStorage.setItem("multievent-locale", nextLocale);
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
