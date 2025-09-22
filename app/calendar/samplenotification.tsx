import React, { useEffect } from 'react';
import { Button, Platform, View, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  async function registerForPushNotificationsAsync() {
    if (Device.isDevice) {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission not granted!');
      }
    } else {
      Alert.alert('Must use physical device for notifications');
    }
  }

  async function scheduleNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "📢 Reminder!",
        body: 'This is a scheduled notification.',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: new Date(Date.now() + 1000), // Triggers after 10 seconds
      },
    });
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Schedule Notification" onPress={scheduleNotification} />
    </View>
  );
}