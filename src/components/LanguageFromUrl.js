import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const LanguagePrefixInUrl = () => {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const currentLang = i18n.language || "en"; // fallback
    const path = location.pathname;

    const langRegex = /^\/(fr|en|de|es|it)(\/|$)/; 
    const match = path.match(langRegex);

    if (!match || match[1] !== currentLang) {
      const newPath = path.replace(/^\/(fr|en|de|es|it)/, "");
      const updatedPath = `/${currentLang}${newPath}`;
      
      // Remplacer l’URL dans l'historique sans recharger la page
      window.history.replaceState(null, "", updatedPath + location.search + location.hash);
    }
  }, [location.pathname, i18n.language]);

  return null;
};

export default LanguagePrefixInUrl;
