import ChatBar from "@/components/Chat/Chatbar";
import ChatCover from "@/components/Chat/ChatCover";
import ChatHeader from "@/components/Chat/ChatHeader";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import moment from "moment";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSendMessageMutation, useUploadFileMutation } from "../aiform/chatApiSlice";


export interface ChatType {
  message: string;
  time: string;
  messageBy?: 1 | 2; 
}

const ChatTab = () => {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const [chat, setChat] = useState<ChatType[]>([]);
  const [sendMessage] = useSendMessageMutation();
  const [uploadFile] = useUploadFileMutation();

  const addChat = async (newChat: ChatType) => {
    setChat((prev) => [...prev, newChat]);

    if (newChat.messageBy === 1) {
      try {
        const res = await sendMessage({ message: newChat.message }).unwrap();

        setChat((prev) => [
          ...prev,
          {
            message: res.reply,
            time: moment().format("hh:mm A"),
            messageBy: 2,
          },
        ]);
      } catch (err) {
        console.log("Chat error:", err);
      }
    }
  };
  const handleFileUpload = async (file: { uri: string; name: string; type: string }) => {
    const formData = new FormData();
    formData.append("file", {
      uri: file.uri,
      name: file.name,
      type: file.type,
    } as any);

    try {
      const res = await uploadFile(formData).unwrap();
      setChat((prev) => [
        ...prev,
        {
          message: res.reply,
          time: moment().format("hh:mm A"),
          messageBy: 2,
        },
      ]);
    } catch (err) {
      console.log("Upload error:", err);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <LinearGradient
        colors={["#0072BB", "#4fa4f3ff"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.outerView}>
          <ChatHeader showDate={chat.length !== 0} />
          {chat.length === 0 ? (
            <ChatCover />
          ) : (
            <ScrollView
              style={styles.scrollArea}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {chat.map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.outerContainer,
                    { alignItems: item.messageBy === 1 ? "flex-end" : "flex-start" },
                  ]}
                >
                  <View style={styles.timeRow}>
                    <Text style={styles.timeText}>{item.time}</Text>
                    {item.messageBy === 1 && (
                      <Text style={styles.timeText}>{t("you")}</Text>
                    )}
                    <Image
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
                      }}
                      style={styles.avatar}
                    />
                  </View>
                  <View style={styles.singleChatContainer}>
                    <Text style={styles.singleChat}>{item.message}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          )}

          <View style={styles.chatAssistant}>
            <ChatBar addChat={addChat} onUploadFile={handleFileUpload} />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  gradient: { flex: 1, paddingTop: 30 },
  outerView: { flex: 1, paddingHorizontal: 20, marginTop: 30 },
  scrollArea: { flex: 1, marginBottom: 60 },
  scrollContent: { paddingVertical: 10, flexGrow: 1 },
  chatAssistant: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    paddingHorizontal: 20,
  },
  outerContainer: { flexDirection: "column", gap: 8 },
  timeRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  avatar: { width: 24, height: 24, borderRadius: 25 },
  singleChatContainer: {
    maxWidth: "75%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 6,
    borderRadius: 10,
    marginBottom: 20,
  },
  timeText: {
    fontSize: 8,
    fontFamily: "Poppins-Medium",
    fontWeight: "500",
    color: "white",
  },
  singleChat: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    fontWeight: "400",
    color: "white",
  },
});

export default ChatTab;
