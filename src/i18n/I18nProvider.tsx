import { Suspense, type ReactNode } from "react";
import { I18nextProvider } from "react-i18next";

import i18n from "./config";

interface I18nProviderProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function I18nProvider({
  children,
  fallback = null,
}: I18nProviderProps) {
  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </I18nextProvider>
  );
}
