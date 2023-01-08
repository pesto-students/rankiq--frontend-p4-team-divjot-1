import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resources from '../theme/resources';

export const fallbackLng = 'en';
export const defaultNS = 'default';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: true,
    fallbackLng,
    ns: defaultNS,
    defaultNS,
    // fallbackNS: defaultNS,
    interpolation: {
      escapeValue: false,
      prefix: '{',
      suffix: '}',
    },
    resources,
  });

export default i18n;
