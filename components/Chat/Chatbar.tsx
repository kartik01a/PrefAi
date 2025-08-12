import { ChatType } from "@/app/(tabs)/chat";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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

interface IProps {
  addChat: (chat: ChatType) => void;
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

const ChatBar = ({ addChat }: IProps) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const handleAddChat = () => {
    const time = getCurrentTime();
    if (message && time) {
      addChat({ message, time, messageBy: 1 });
      setMessage("");
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
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
        <TouchableOpacity style={styles.iconButton}>
          <MaterialCommunityIcons name="plus" size={22} color="#2479CF" />
        </TouchableOpacity>

        <TextInput
          style={styles.textInput}
          value={message}
          onChangeText={(text) => setMessage(text)}
          placeholder={t("askMeAllAboutImmegrationTopic")}
          placeholderTextColor="#888"
          multiline
          textAlignVertical="center"
        />

        <TouchableOpacity style={styles.iconButton}>
          <MaterialCommunityIcons name="microphone" size={22} color="#2479CF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAddChat} style={styles.iconButton}>
          <MaterialCommunityIcons name="send" size={22} color="#2479CF" />
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
