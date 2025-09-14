import messaging from "@react-native-firebase/messaging";

/**
 * Ask for permission and return the FCM token.
 */
export async function registerForPushNotificationsAsync() {
  try {
    // Request permission
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (!enabled) {
      console.log("🚫 Push notification permission denied");
      return null;
    }

    // Get token
    const fcmToken = await messaging().getToken();
    console.log("✅ FCM Token:", fcmToken);
    return fcmToken;
  } catch (e) {
    console.log("❌ Failed to get FCM token", e);
    return null;
  }
}

/**
 * Listen for token refresh events.
 */
export function listenForTokenRefresh(
  onToken: (token: string) => Promise<void>
) {
  return messaging().onTokenRefresh(async (token) => {
    console.log("🔄 FCM Token refreshed:", token);
    try {
      await onToken(token);
    } catch (e) {
      console.log("❌ Failed to update token on refresh", e);
    }
  });
}
