import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import i18n from "./config";
import { type Locale, isLocale, routing } from "./routing";
import type { Namespace, TranslationValues, Translator } from "./types";

/** Drop-in for next-intl `useTranslations(namespace?)`. */
export function useTranslations(namespace?: Namespace): Translator {
  const { t } = useTranslation(undefined, { keyPrefix: namespace });
  return useMemo<Translator>(
    () => (key: string, values?: TranslationValues) => t(key, values) as string,
    [t], // `t` changes identity on language change -> consumers re-render
  );
}

/** Drop-in for next-intl `useLocale()`. */
export function useLocale(): Locale {
  const { i18n: inst } = useTranslation();
  const lng = inst.resolvedLanguage;
  return isLocale(lng) ? lng : routing.defaultLocale;
}

/** Replaces `router.replace(pathname, { locale })`. */
export function useChangeLocale() {
  const { i18n: inst } = useTranslation();
  return useCallback((locale: Locale) => inst.changeLanguage(locale), [inst]);
}

/** Non-hook translator (chart option builders, utils) ~ next-intl `getTranslations`. */
export function getTranslations(namespace?: Namespace): Translator {
  const t = i18n.getFixedT(null, null, namespace);
  return (key, values) => t(key, values) as string;
}
