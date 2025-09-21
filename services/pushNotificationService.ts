// firebase-notifications.ts
import notifee, { AndroidImportance } from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";
import { Platform } from "react-native";

function handleRegistrationError(errorMessage: string) {
  console.error("🚨 Push Notification Error:", errorMessage);
  throw new Error(errorMessage);
}

/**
 * Request permission (iOS) and get FCM token (Android/iOS)
 */
export async function registerForFCM() {
  try {
    // On iOS: request permission
    const authStatus = (await messaging().hasPermission?.()) ?? null;
    // messaging().requestPermission() returns settings (v10+)
    const permission = await messaging().requestPermission();

    const enabled =
      permission === messaging.AuthorizationStatus.AUTHORIZED ||
      permission === messaging.AuthorizationStatus.PROVISIONAL ||
      permission === messaging.AuthorizationStatus.EPHEMERAL;

    if (!enabled) {
      handleRegistrationError(
        "Permission not granted to receive notifications"
      );
      return null;
    }

    // Important: on Android, create a notification channel (for Notifee/native)
    if (Platform.OS === "android") {
      await notifee.createChannel({
        id: "default",
        name: "Default Channel",
        importance: AndroidImportance.HIGH,
      });
    }

    // Get the FCM token
    const fcmToken = await messaging().getToken();
    if (!fcmToken) {
      handleRegistrationError("FCM token not available");
      return null;
    }

    console.log("✅ FCM Token:", fcmToken);
    return fcmToken;
  } catch (e: any) {
    handleRegistrationError(String(e));
    return null;
  }
}

/**
 * Call once at app startup (when user is available)
 * - registers handlers for foreground messages
 * - registers background handler (see below)
 */
export function useFCMListeners(onNotification: (payload: any) => void) {
  // Foreground messages
  const foregroundUnsubscribe = messaging().onMessage(async (remoteMessage) => {
    console.log("📩 FCM (foreground):", remoteMessage);

    // Display native local notification (so it shows even in foreground)
    const title = remoteMessage.notification?.title ?? "Notification";
    const body = remoteMessage.notification?.body ?? "";
    await notifee.displayNotification({
      title,
      body,
      android: { channelId: "default", smallIcon: "ic_launcher" }, // match your asset
    });

    onNotification(remoteMessage);
  });

  // When the user taps a background/quit notification (opens app)
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log("📲 Notification opened from quit state:", remoteMessage);
      }
    });

  // When app is in background and user taps the notification
  const openedUnsubscribe = messaging().onNotificationOpenedApp(
    (remoteMessage) => {
      console.log("📲 Notification opened from background:", remoteMessage);
    }
  );

  return () => {
    foregroundUnsubscribe();
    openedUnsubscribe();
  };
}

/**
 * Background message handler - MUST be in the root file (not inside component)
 * This runs when app is backgrounded/killed.
 */
export const firebaseBackgroundHandler = async (remoteMessage: any) => {
  console.log("🔁 Background message:", remoteMessage);
  // Optionally show a notification here with notifee
  await notifee.displayNotification({
    title: remoteMessage.notification?.title ?? "Background Notification",
    body: remoteMessage.notification?.body ?? "",
    android: { channelId: "default", smallIcon: "ic_launcher" },
  });
};

// register background handler (put in index.js / App.tsx top-level file)
messaging().setBackgroundMessageHandler(firebaseBackgroundHandler);
