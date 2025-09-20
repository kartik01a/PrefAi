import { store } from "@/app/store";
import {
  initI18n,
  initializeRTL,
  isRTLLanguage,
  loadSavedLanguage,
} from "@/i18n";
import { loadUserFromStorage } from "@/utils/authLoader";
import { StripeProvider } from "@stripe/stripe-react-native";
import { useFonts } from "expo-font";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { I18nManager, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Provider as ReduxProvider } from "react-redux";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isI18nReady, setIsI18nReady] = useState(false);
  const [isRTLReady, setIsRTLReady] = useState(false);
  const [appKey, setAppKey] = useState(0); // For forcing re-render

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  // Configure notification display behavior
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });

  useEffect(() => {
    const setupApp = async () => {
      try {
        await initializeRTL();
        setIsRTLReady(true);

        await initI18n();
        console.log("✅ i18n initialized");

        const savedLanguage = await loadSavedLanguage();
        if (savedLanguage) {
          const shouldBeRTL = isRTLLanguage(savedLanguage);
          const currentRTL = I18nManager.isRTL;

          if (shouldBeRTL !== currentRTL) {
            console.log("RTL mismatch detected, will need app restart");
            I18nManager.allowRTL(shouldBeRTL);
            I18nManager.forceRTL(shouldBeRTL);
          }
        }
      } catch (error) {
        console.error("❌ Failed to initialize app:", error);
      } finally {
        setIsI18nReady(true);
      }
    };

    setupApp();
  }, []);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await store.dispatch(loadUserFromStorage() as any);
      } catch (error) {
        console.error("Error loading user from storage:", error);
      } finally {
        await SplashScreen.hideAsync();
      }
    };

    if (fontsLoaded && isI18nReady && isRTLReady) {
      prepareApp();
    }
  }, [fontsLoaded, isI18nReady, isRTLReady]);

  // Show nothing while loading
  if (!fontsLoaded || !isI18nReady || !isRTLReady) {
    return null;
  }

  return (
    <ReduxProvider store={store}>
      <StripeProvider publishableKey={process.env.PUBLISHABLE_KEY}>
        <SafeAreaProvider>
          <PaperProvider>
            <View key={appKey} style={{ flex: 1 }}>
              <StatusBar />
              <Stack
                screenOptions={{
                  headerShown: false,
                  // Apply RTL-aware animations
                  animationTypeForReplace: "push",
                  animation: I18nManager.isRTL
                    ? "slide_from_left"
                    : "slide_from_right",
                }}
              >
                <Stack.Screen
                  name="(tabs)"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="upload-document"
                  options={{
                    headerShown: false,
                    presentation: "modal",
                  }}
                />
                <Stack.Screen
                  name="upload-location"
                  options={{
                    headerShown: false,
                    presentation: "modal",
                  }}
                />
                <Stack.Screen
                  name="document-files"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="file-viewer"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="voice-translation"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="cancel"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="success"
                  options={{
                    headerShown: false,
                  }}
                />
              </Stack>
              <Toast />
            </View>
          </PaperProvider>
        </SafeAreaProvider>
      </StripeProvider>
    </ReduxProvider>
  );
}
