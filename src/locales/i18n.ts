import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import pl from './pl/translate.json';
import en from './en/translate.json';

const resources = {
  pl,
  en
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('appLanguage') || 'pl',
  keySeparator: false,
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
