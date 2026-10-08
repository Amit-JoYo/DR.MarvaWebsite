"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { translations } from "./translations";
import type { Lang, Translations } from "./types";

interface LanguageContextValue {
  lang: Lang;
  otherLang: Lang;
  dir: Translations["dir"];
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

/** The language comes from the route (/he or /en), so every page is crawlable in its own language. */
export function LanguageProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      otherLang: lang === "he" ? "en" : "he",
      dir: translations[lang].dir,
      t: translations[lang],
    }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
