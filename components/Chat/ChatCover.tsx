import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ChatLogo from "../../assets/images/chat-logo.svg";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const ChatCover = () => {
  const { t } = useTranslation()
  let userData = useSelector((state: RootState) => state.auth.userInfo);
  const firstName = userData?.firstName || "User"
  return (
    <View style={styles.container}>
      <ChatLogo />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{t('hi')}, {firstName}</Text>
        <Text style={styles.subTitle}>
          {t('whatTranslationCanIHelpYouWithToday')}
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
