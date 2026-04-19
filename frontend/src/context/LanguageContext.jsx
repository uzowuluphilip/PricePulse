import { createContext, useContext, useState } from 'react';

export const LanguageContext = createContext();

export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'yo', name: 'Yorùbá', flag: '🇳🇬' },
];

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLang] = useState(
    localStorage.getItem('pricepulse_lang') || 'en'
  );

  const switchLanguage = (code) => {
    setCurrentLang(code);
    localStorage.setItem('pricepulse_lang', code);
    document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLang,
        switchLanguage,
        LANGUAGES,
        currentLanguage: LANGUAGES.find((l) => l.code === currentLang),
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
