import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

/**
 * Ask for permission and return the Expo Push Token
 */
export async function registerForPushNotificationsAsync() {
  try {
    if (!Device.isDevice) {
      console.log("🚫 Must use physical device for Push Notifications");
      return null;
    }

    // Check & request permissions
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("🚫 Push notification permission denied");
      return null;
    }

    // ✅ Get Expo push token WITH projectId (required in Expo Go / SDK 51+)
    const projectId =
      Constants.expoConfig?.extra?.eas?.projectId ??
      Constants.easConfig?.projectId; // fallback for managed workflow
    const { data: expoPushToken } = await Notifications.getExpoPushTokenAsync({
      projectId,
    });

    console.log("✅ Expo Push Token:", expoPushToken);

    // Android channel setup
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
      });
    }

    return expoPushToken;
  } catch (e) {
    console.log("❌ Failed to get Expo push token", e);
    return null;
  }
}

/**
 * Listen for foreground notifications
 */
export function listenForNotifications(
  onNotification: (notification: Notifications.Notification) => void
) {
  return Notifications.addNotificationReceivedListener(onNotification);
}
