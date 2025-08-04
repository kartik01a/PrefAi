import { store } from "@/app/store";
import { initI18n } from "@/i18n";
import { loadUserFromStorage } from "@/utils/authLoader";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as ReduxProvider } from "react-redux";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isI18nReady, setIsI18nReady] = useState(false);
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  useEffect(() => {
    const setupI18n = async () => {
      try {
        await initI18n();
        console.log("✅ i18n initialized");
      } catch (error) {
        console.error("❌ Failed to initialize i18n:", error);
      } finally {
        setIsI18nReady(true);
      }
    };

    setupI18n();
  }, []);

  useEffect(() => {
    const prepareApp = async () => {
      await store.dispatch(loadUserFromStorage() as any);
      await SplashScreen.hideAsync();
    };

    if (fontsLoaded && isI18nReady) {
      prepareApp();
    }
  }, [fontsLoaded, isI18nReady]);

  if (!fontsLoaded || !isI18nReady) {
    return null; 
  }

  return (
    <ReduxProvider store={store}>
      <SafeAreaProvider>
        <PaperProvider>
          <StatusBar />
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="upload-document" options={{ headerShown: false }} />
            <Stack.Screen name="upload-location" options={{ headerShown: false }} />
            <Stack.Screen name="document-files" options={{ headerShown: false }} />
          </Stack>
        </PaperProvider>
      </SafeAreaProvider>
    </ReduxProvider>
  );
}
