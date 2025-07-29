import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ChatLogo from "../../assets/images/chat-logo.svg";

const ChatCover = () => {
  return (
    <View style={styles.container}>
      <ChatLogo />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Hi, John</Text>
        <Text style={styles.subTitle}>
          What translations can I help you with today?
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 50
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
    color: "white",
  },
  subTitle: {
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    color: "white",
  },
});

export default ChatCover;
