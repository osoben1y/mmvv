import { memo } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const LanguageToggle = () => {
  const { language, changeLanguage } = useLanguage();

  const toggleLanguage = () => {
    changeLanguage(language === 'ru' ? 'en' : 'ru');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 rounded-full transition-colors hover:bg-gray-700 dark:hover:bg-gray-200 flex items-center justify-center"
      aria-label={language === 'ru' ? 'Switch to English' : 'Переключить на русский'}
    >
      <span className="font-medium text-sm">
        {language === 'ru' ? 'EN' : 'RU'}
      </span>
    </button>
  );
};

export default memo(LanguageToggle);