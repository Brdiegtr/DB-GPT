import en from '@/locales/en';
import es from '@/locales/es';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export type I18nKeys = keyof typeof en;
interface Resources {
  translation: Record<I18nKeys, string>;
}

i18n.use(initReactI18next).init({
  resources: {
    // El idioma 'en' de la interfaz muestra la traducción al español
    en: {
      translation: es,
    },
    // Sin chino: cualquier idioma muestra español
    zh: {
      translation: es,
    },
  },
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: Resources;
  }
}
