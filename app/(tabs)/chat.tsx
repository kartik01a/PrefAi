import ChatBar from "@/components/Chat/Chatbar";
import ChatHeader from "@/components/Chat/ChatHeader";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, StyleSheet, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatTab = () => {
  const colorScheme = useColorScheme();
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <LinearGradient
        colors={["#0072BB", "#4fa4f3ff"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={[styles.gradient]}
      >
        <View style={styles.outerView}>
          <ChatHeader showDate={false} />

          <ScrollView
            style={styles.scrollArea}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          ></ScrollView>

          <View style={styles.chatAssistant}>
            <ChatBar />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  outerView: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  scrollArea: {
    flex: 1,
    marginBottom: 10,
  },
  scrollContent: {
    paddingVertical: 10,
    flexGrow: 1,
  },
  chatAssistant: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    paddingHorizontal: 20,
  },
});

export default ChatTab;
