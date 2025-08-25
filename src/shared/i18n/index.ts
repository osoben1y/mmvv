import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translations
import translationEN from './locales/en.json';
import translationRU from './locales/ru.json';

// Language detector
const getUserLanguage = () => {
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage) return savedLanguage;
  
  // Default to Russian if no language is saved
  return 'ru';
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationEN
      },
      ru: {
        translation: translationRU
      }
    },
    lng: getUserLanguage(),
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;