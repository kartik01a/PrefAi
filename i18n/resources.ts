import en from './locales/en.json';
import ru from './locales/ru.json';
import pt from './locales/pt.json';
import zh from './locales/zh.json';
import ka from './locales/ka.json';
import ar from './locales/ar.json';

export const resources = {
  en: { translation: en },
  ru: { translation: ru },
  pt: { translation: pt },
  zh: { translation: zh },
  ka: { translation: ka },
  ar: { translation: ar },
} as const;

export const supportedLanguages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ka', name: 'Georgian', nativeName: 'ქართული' },
  // { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
];

// RTL languages
export const rtlLanguages = ['ar'];