import { Stack } from "expo-router";
import React from "react";

export default function AccountLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Account Management",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          title: "Edit Profile",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="general"
        options={{
          title: "General",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
