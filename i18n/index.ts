import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales } from 'expo-localization';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';
import { resources, rtlLanguages, supportedLanguages } from './resources';

const LANGUAGE_STORAGE_KEY = 'selectedLanguage';
const DEFAULT_LANGUAGE = 'en';
let isInitialized = false;

const getDeviceLanguage = async (): Promise<string> => {
  try {
    const locales = getLocales();
    const languageCode = locales?.[0]?.languageCode || DEFAULT_LANGUAGE;
    const supportedCodes = supportedLanguages.map(lang => lang.code);
    return supportedCodes.includes(languageCode) ? languageCode : DEFAULT_LANGUAGE;
  } catch (error) {
    console.log("Error getting device language:", error);
    return DEFAULT_LANGUAGE;
  }
};

export const initI18n = async (): Promise<void> => {
  console.log("⚙️ i18n: isInitialized =", isInitialized);
  if (isInitialized) return;

  let savedLanguage = DEFAULT_LANGUAGE;

  try {
    const storedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    const supportedCodes = supportedLanguages.map(lang => lang.code);

    if (storedLanguage && supportedCodes.includes(storedLanguage)) {
      savedLanguage = storedLanguage;
    } else {
      savedLanguage = await getDeviceLanguage();
    }
  } catch (error) {
    console.log('Error loading saved language:', error);
    savedLanguage = await getDeviceLanguage();
  }

  const isRTL = rtlLanguages.includes(savedLanguage);
  if (I18nManager.isRTL !== isRTL) {
    console.warn(`⚠️ RTL layout mismatch for "${savedLanguage}". Restart app to apply layout direction.`);
  }

  try {
    await i18next
      .use(initReactI18next)
      .init({
        resources,
        lng: savedLanguage,
        fallbackLng: DEFAULT_LANGUAGE,
        debug: false,
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
      });

    isInitialized = true;
    console.log('✅ i18n initialized with language:', savedLanguage);
  } catch (error) {
    console.error('❌ Failed to initialize i18n:', error);
    throw error;
  }
};
