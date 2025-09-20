import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

function handleRegistrationError(errorMessage: string) {
  console.error("🚨 Push Notification Error:", errorMessage);
  throw new Error(errorMessage);
}

export async function registerForPushNotificationsAsync() {
  try {
    if (!Device.isDevice) {
      handleRegistrationError("Must use physical device for push notifications");
      return null;
    }

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      handleRegistrationError("Permission not granted to get push token");
      return null;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError("Project ID not found in app config");
      return null;
    }
    const { data: expoPushToken } = await Notifications.getExpoPushTokenAsync({
      projectId,
    });
    console.log("✅ Expo Push Token:", expoPushToken);
    return expoPushToken;
  } catch (e: any) {
    handleRegistrationError(`${e}`);
    return null;
  }
}


export function listenForNotifications(
  onNotification: (notification: Notifications.Notification) => void
) {
  return Notifications.addNotificationReceivedListener(onNotification);
}
