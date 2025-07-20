import { useColorScheme } from "@/hooks/useColorScheme";
import { Tabs } from "expo-router";
import React from "react";
import Account from "../../assets/images/account.svg";
import Activity from "../../assets/images/activity.svg";
import Chat from "../../assets/images/chat.svg";
import Document from "../../assets/images/document.svg";
import Home from "../../assets/images/home.svg";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2479CF",
        tabBarInactiveTintColor: colorScheme === "dark" ? "#8E8E93" : "#8E8E93",
        tabBarStyle: {
          height: 75,
          borderRadius: 12,
          backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
          borderTopColor: colorScheme === "dark" ? "#333" : "#e1e1e1",
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: "Poppins-SemiBold",
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home color={color} />,
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "Activity",
          tabBarIcon: ({ color, size }) => <Activity color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color, size }) => <Chat color={color} />,
        }}
      />
      <Tabs.Screen
        name="document"
        options={{
          title: "Document",
          tabBarIcon: ({ color, size }) => <Document color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color, size }) => <Account color={color} />,
        }}
      />
    </Tabs>
  );
}
