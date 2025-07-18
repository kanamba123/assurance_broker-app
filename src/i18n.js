import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

// Récupérer la langue sauvegardée dans le localStorage
const savedLanguage = localStorage.getItem('userLanguage');

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: savedLanguage || 'fr', // Utiliser la langue sauvegardée ou 'fr' par défaut
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    detection: {
      // Configuration spécifique pour le détecteur de langue
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'userLanguage', // Utiliser notre clé personnalisée
      caches: ['localStorage'],
    },
  });

export default i18n;