import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, StyleSheet, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface BaseLayoutProps {
  children: React.ReactNode;
  edges?: ("top" | "bottom" | "left" | "right")[];
  style?: any;
  safeAreaStyle?: any;
}

export default function BaseLayout({
  children,
  edges = ["top", "left", "right"],
  style,
  safeAreaStyle,
}: BaseLayoutProps) {
  const colorScheme = useColorScheme();
  return (
    <SafeAreaView style={[styles.safeArea, safeAreaStyle]} edges={edges}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        style={styles.scrollView}
      >
        <LinearGradient
          colors={["#0072BB", "#4fa4f3ff"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={[styles.gradient, style]}
        >
          {children}
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});
