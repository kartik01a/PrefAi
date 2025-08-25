import { ChatType } from "@/app/(tabs)/chat";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { useNavigation } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

async function sendMessageToBackend(message: string): Promise<ChatType> {
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    throw new Error("Failed to send message");
  }

  return await res.json();
}

interface IProps {
  addChat: (chat: ChatType) => void;
  onUploadFile: (file: { uri: string; name: string; type: string }) => void | Promise<void>;
}

function getCurrentTime(): string {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");
  return `${hours}.${formattedMinutes} ${ampm}`;
}

const ChatBar = ({ addChat, onUploadFile }: IProps) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleAddChat = async () => {
    if (!message.trim()) return;
    const time = getCurrentTime();

    // Optimistically add to UI
    const newChat: ChatType = { message, time, messageBy: 1 };
    addChat(newChat);
    setMessage("");

    try {
      setLoading(true);
      const backendChat = await sendMessageToBackend(message);
      if (backendChat) {
        addChat({ ...backendChat, time: getCurrentTime(), messageBy: 2 });
      }
    } catch (err) {
      console.error("Chat send error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadPress = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      const file = result.assets[0];
      if (file) {
        const fileData = {
          uri: file.uri,
          name: file.name,
          type: file.mimeType ?? "application/octet-stream",
        };
        await onUploadFile(fileData);
      }
    } catch (err) {
      console.error("File upload error:", err);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", (e) =>
      setKeyboardHeight(e.endCoordinates.height)
    );
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardHeight(0)
    );

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  return (
    <View
      style={[
        styles.chatInputContainer,
        {
          bottom: keyboardHeight > 0 ? keyboardHeight : 0,
          paddingBottom: keyboardHeight > 0 ? 10 : 14,
        },
      ]}
    >
      <View style={styles.chatInputWrapper}>
        <TouchableOpacity style={styles.iconButton} onPress={handleUploadPress}>
          <MaterialCommunityIcons name="plus" size={22} color="#2479CF" />
        </TouchableOpacity>

        <TextInput
          style={styles.textInput}
          value={message}
          onChangeText={setMessage}
          placeholder={t("askMeAllAboutImmegrationTopic")}
          placeholderTextColor="#888"
          multiline
          textAlignVertical="center"
        />

        <TouchableOpacity style={styles.iconButton}>
          <MaterialCommunityIcons name="microphone" size={22} color="#2479CF" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleAddChat}
          style={styles.iconButton}
          disabled={loading}
        >
          <MaterialCommunityIcons
            name={loading ? "clock-outline" : "send"}
            size={22}
            color="#2479CF"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatBar;

const styles = StyleSheet.create({
  chatInputContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingTop: 14,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  chatInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 44,
  },
  textInput: {
    flex: 1,
    fontSize: 11,
    fontFamily: "Poppins-Regular",
    color: "#2479CF",
    paddingVertical: 8,
    paddingHorizontal: 8,
    maxHeight: 120,
    minHeight: 20,
  },
  iconButton: {
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
});
