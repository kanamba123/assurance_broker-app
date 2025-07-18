import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('fr');
  const [translations, setTranslations] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/locales/${language}/translation.json`);
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error(`Error loading translations for language ${language}:`, error);
        setTranslations({});
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [language]);

  const t = (key) => {
    const parts = key.split('.');
    let value = translations;

    for (const part of parts) {
      if (value && part in value) {
        value = value[part];
      } else {
        return key; // fallback si la clé n'existe pas
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
