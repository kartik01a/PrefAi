// import messaging from "@react-native-firebase/messaging";

// // Ask for permissions and get token
// export async function registerForPushNotificationsAsync() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (!enabled) {
//     console.log("🚫 Push notification permission denied");
//     return null;
//   }

//   try {
//     const fcmToken = await messaging().getToken();
//     console.log("✅ FCM Token:", fcmToken);
//     return fcmToken;
//   } catch (e) {
//     console.log("❌ Failed to get FCM token", e);
//     return null;
//   }
// }
