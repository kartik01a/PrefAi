import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
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

    // Get Expo push token
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("✅ Expo Push Token:", token);

    // Android channel setup
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
      });
    }

    return token;
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
