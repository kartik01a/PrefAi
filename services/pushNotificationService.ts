import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

/**
 * Ask for permission and return the FCM Token
 */
export async function registerForPushNotificationsAsync() {
  try {
    if (!Device.isDevice) {
      console.log("🚫 Must use physical device for Push Notifications");
      return null;
    }

    // Request notification permissions
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

    // Android: setup notification channel (required for Android 13+)
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    // ✅ Get the real FCM device token
    const tokenResponse = await Notifications.getDevicePushTokenAsync();
    const fcmToken = tokenResponse.data;
    console.log("✅ FCM Token:", fcmToken);

    return fcmToken;
  } catch (e) {
    console.log("❌ Failed to get FCM token", e);
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

/**
 * Listen for notification interactions (when user taps notification)
 */
export function listenForNotificationInteractions(
  onInteraction: (response: Notifications.NotificationResponse) => void
) {
  return Notifications.addNotificationResponseReceivedListener(onInteraction);
}
