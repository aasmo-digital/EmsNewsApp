import React, {createContext, useContext, useState} from 'react';
import en from '../../locales/en.json';
import hi from '../../locales/hi.json';

type Language = 'en' | 'hi';

const translations: Record<Language, any> = {
  en,
  hi,
};

const LanguageContext = createContext<any>(null);

export const LanguageProvider = ({children}: any) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: keyof (typeof translations)['en']) => {
    return translations[language][key];
  };

  return (
    <LanguageContext.Provider value={{language, setLanguage, t}}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within provider');
  return context;
};
