// import React, {createContext, useContext, useState} from 'react';
// import en from '../../locales/en.json';
// import hi from '../../locales/hi.json';

// type Language = 'en' | 'hi';

// const translations: Record<Language, any> = {
//   en,
//   hi,
// };

// const LanguageContext = createContext<any>(null);

// export const LanguageProvider = ({children}: any) => {
//   const [language, setLanguage] = useState<Language>('en');

//   const t = (key: keyof (typeof translations)['en']) => {
//     return translations[language][key];
//   };

//   return (
//     <LanguageContext.Provider value={{language, setLanguage, t}}>
//       {children}
//     </LanguageContext.Provider>
//   );
// };

// export const useLanguage = () => {
//   const context = useContext(LanguageContext);
//   if (!context) throw new Error('useLanguage must be used within provider');
//   return context;
// };




import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

  // ✅ Load saved language from storage
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLang = await AsyncStorage.getItem('appLanguage');
        if (savedLang) {
          setLanguage(savedLang as Language);
        }
      } catch (e) {
        console.log('Failed to load language:', e);
      }
    };
    loadLanguage();
  }, []);

  // ✅ Save language when changed
  const changeLanguage = async (lang: Language) => {
    setLanguage(lang);
    try {
      await AsyncStorage.setItem('appLanguage', lang);
    } catch (e) {
      console.log('Failed to save language:', e);
    }
  };

  const t = (key: keyof (typeof translations)['en']) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{language, setLanguage: changeLanguage, t}}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within provider');
  return context;
};
