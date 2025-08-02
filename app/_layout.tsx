import { store } from "@/app/store"; // ✅ make sure this path is correct
import { loadUserFromStorage } from "@/utils/authLoader";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as ReduxProvider } from "react-redux";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  const [ready, setReady] = useState(false);
  useEffect(() => {
    const prepare = async () => {
      await store.dispatch(loadUserFromStorage() as any);
      setReady(true);
      SplashScreen.hideAsync();
    };
    if (fontsLoaded) {
      prepare();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || !ready) return null;
  return (
    <ReduxProvider store={store}>
      <SafeAreaProvider>
        <PaperProvider>
          <StatusBar />
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="upload-document"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="upload-location"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="document-files"
              options={{ headerShown: false }}
            />
          </Stack>
        </PaperProvider>
      </SafeAreaProvider>
    </ReduxProvider>
  );
}
