import { useTranslation } from "src/i18n";

export const useDocsTranslation = () => {
  const { t, locale } = useTranslation("docs");

  const getLocalizedLink = (path: string) => {
    return locale === "vi" ? `${path}?lang=vi` : path;
  };

  return { t, locale, getLocalizedLink };
};
