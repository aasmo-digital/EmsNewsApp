// import i18n from 'i18next';
// import {initReactI18next} from 'react-i18next';
// import * as Localization from 'react-native-localize';

// import en from './locales/en.json';
// import hi from './locales/hi.json';

// const resources = {
//   hi: {translation: hi},
//   en: {translation: en},
// };

// const languageDetector = {
//   type: 'languageDetector',
//   async: true,
//   detect: callback => {
//     // Force Hindi as the starting language
//     callback('hi');
//   },
//   init: () => {},
//   cacheUserLanguage: () => {},
// };

// i18n
//   .use(languageDetector)
//   .use(initReactI18next)
//   .init({
//     compatibilityJSON: 'v3',
//     fallbackLng: 'hi',
//     resources,
//     interpolation: {
//       escapeValue: false,
//     },
//   });

// export default i18n;

// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import * as Localization from 'react-native-localize';

// import en from './locales/en.json';
// import hi from './locales/hi.json';

// const resources = {
//   en: { translation: en },
//   hi: { translation: hi },
// };

// i18n
//   .use(initReactI18next)
//   .init({
//     compatibilityJSON: 'v3',
//     fallbackLng: 'en',
//     resources,
//     interpolation: {
//       escapeValue: false,
//     },
//     lng: Localization.getLocales()[0].languageCode, // Automatically set language based on device
//     // lng:"hi"
//   });

// export default i18n;

import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './locales/en.json'; // आपका en.json
import hi from './locales/hi.json'; // आपका hi.json

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3', // React Native के लिए महत्वपूर्ण
  lng: 'en', // डिफ़ॉल्ट भाषा
  fallbackLng: 'en',
  resources: {
    en: {
      translation: en,
    },
    hi: {
      translation: hi,
    },
  },
  interpolation: {
    escapeValue: false, // React के लिए जरूरी
  },
});

export default i18next;
