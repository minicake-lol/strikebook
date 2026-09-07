import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type Locale = "en" | "zh";

type I18nValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (en: string, zh: string) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const value = useMemo<I18nValue>(
    () => ({
      locale,
      setLocale,
      t: (en, zh) => (locale === "zh" ? zh : en),
    }),
    [locale],
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export function useT(): I18nValue["t"] {
  return useI18n().t;
}
