import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { Alert, I18nManager } from "react-native";
import RNRestart from "react-native-restart";
import { resources, rtlLanguages, supportedLanguages } from "./resources";

const LANGUAGE_STORAGE_KEY = "selectedLanguage";
const DEFAULT_LANGUAGE = "en";
let isInitialized = false;

const getDeviceLanguage = async (): Promise<string> => {
  try {
    const locales = getLocales();
    const languageCode = locales?.[0]?.languageCode || DEFAULT_LANGUAGE;
    const supportedCodes = supportedLanguages.map((lang) => lang.code);
    return supportedCodes.includes(languageCode)
      ? languageCode
      : DEFAULT_LANGUAGE;
  } catch (error) {
    console.log("Error getting device language:", error);
    return DEFAULT_LANGUAGE;
  }
};

export const initI18n = async (): Promise<void> => {
  if (isInitialized) return;

  let savedLanguage = DEFAULT_LANGUAGE;

  try {
    const storedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    const supportedCodes = supportedLanguages.map((lang) => lang.code);

    if (storedLanguage && supportedCodes.includes(storedLanguage)) {
      savedLanguage = storedLanguage;
    } else {
      savedLanguage = await getDeviceLanguage();
    }
  } catch (error) {
    console.log("Error loading saved language:", error);
    savedLanguage = await getDeviceLanguage();
  }

  const isRTL = rtlLanguages.includes(savedLanguage);
  if (I18nManager.isRTL !== isRTL) {
    console.warn(
      `⚠️ RTL layout mismatch for "${savedLanguage}". Restart app to apply layout direction.`
    );
  }

  try {
    await i18next.use(initReactI18next).init({
      resources,
      lng: savedLanguage,
      fallbackLng: DEFAULT_LANGUAGE,
      debug: false,
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });

    isInitialized = true;
    console.log("✅ i18n initialized with language:", savedLanguage);
  } catch (error) {
    console.error("❌ Failed to initialize i18n:", error);
    throw error;
  }
};

export const saveLanguage = async (language: string): Promise<void> => {
  try {
    const supportedCodes = supportedLanguages.map((lang) => lang.code);
    if (supportedCodes.includes(language)) {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
      if (isInitialized) {
        await i18next.changeLanguage(language);
      }
    } else {
      console.warn(`Language ${language} is not supported`);
    }
  } catch (error) {
    console.log("Error saving language:", error);
  }
};
export const loadSavedLanguage = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
  } catch (error) {
    console.error("Error loading saved language:", error);
    return null;
  }
};
export const isRTLLanguage = (languageCode: string): boolean => {
  return rtlLanguages.includes(languageCode);
};

export const changeLanguageWithRestart = async (
  languageCode: string,
  showAlert: boolean = true
): Promise<void> => {
  try {
    // Change i18n language
    await i18next.changeLanguage(languageCode);
    await saveLanguage(languageCode);

    const isRTL = isRTLLanguage(languageCode);
    const currentRTL = I18nManager.isRTL;

    if (currentRTL !== isRTL) {
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);

      if (showAlert) {
        Alert.alert(
          "Layout Direction Change",
          "The app needs to restart to apply the layout changes.",
          [
            {
              text: "Restart Now",
              onPress: () => {
                setTimeout(() => {
                  RNRestart.restart();
                }, 500);
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        setTimeout(() => {
          RNRestart.restart();
        }, 500);
      }
    }
  } catch (error) {
    console.error("Error changing language:", error);
    throw error;
  }
};

export const initializeRTL = async (): Promise<void> => {
  try {
    const savedLanguage = await loadSavedLanguage();

    if (savedLanguage) {
      const isRTL = isRTLLanguage(savedLanguage);
      const currentRTL = I18nManager.isRTL;

      if (currentRTL !== isRTL) {
        I18nManager.allowRTL(isRTL);
        I18nManager.forceRTL(isRTL);
      }
    }
  } catch (error) {
    console.error("Error initializing RTL:", error);
  }
};
