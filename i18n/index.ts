import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { resources, supportedLanguages } from './resources';

const LANGUAGE_STORAGE_KEY = 'selectedLanguage';
const DEFAULT_LANGUAGE = 'en';

// Simple, safer initialization
let isInitialized = false;

const getDeviceLanguage = (): string => {
  try {
    const locales = Localization.getLocales();
    const deviceLanguage = locales[0]?.languageCode || DEFAULT_LANGUAGE;
    const supportedCodes = supportedLanguages.map(lang => lang.code);
    return supportedCodes.includes(deviceLanguage) ? deviceLanguage : DEFAULT_LANGUAGE;
  } catch (error) {
    console.log('Error getting device language:', error);
    return DEFAULT_LANGUAGE;
  }
};

export const initI18n = async (): Promise<void> => {
  if (isInitialized) {
    return;
  }

  let savedLanguage = DEFAULT_LANGUAGE;
  
  try {
    const storedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (storedLanguage) {
      const supportedCodes = supportedLanguages.map(lang => lang.code);
      savedLanguage = supportedCodes.includes(storedLanguage) ? storedLanguage : getDeviceLanguage();
    } else {
      savedLanguage = getDeviceLanguage();
    }
  } catch (error) {
    console.log('Error loading saved language:', error);
    savedLanguage = getDeviceLanguage();
  }

  try {
    await i18next
      .use(initReactI18next)
      .init({
        resources,
        lng: savedLanguage,
        fallbackLng: DEFAULT_LANGUAGE,
        debug: false, // Set to false to avoid potential issues
        
        interpolation: {
          escapeValue: false,
        },
        
        react: {
          useSuspense: false,
        },
      });
    
    isInitialized = true;
    console.log('i18n initialized successfully with language:', savedLanguage);
  } catch (error) {
    console.error('Failed to initialize i18n:', error);
    throw error;
  }
};

export const saveLanguage = async (language: string): Promise<void> => {
  try {
    const supportedCodes = supportedLanguages.map(lang => lang.code);
    if (supportedCodes.includes(language)) {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
      if (isInitialized) {
        await i18next.changeLanguage(language);
      }
    } else {
      console.warn(`Language ${language} is not supported`);
    }
  } catch (error) {
    console.log('Error saving language:', error);
  }
};

export default i18next;