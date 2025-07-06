import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslation from "./translations/en/translation.json";
import frTranslation from "./translations/fr/translation.json";

function i18ninit() {
  i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      debug: false, // A passer en false à la fin
      resources: {
        en: {
          translation: enTranslation,
        },
        fr: {
          translation: frTranslation,
        },
      },
      fallbackLng: "en",
      interpolation: {
        escapeValue: false,
      },
    });
}

export default i18ninit;
