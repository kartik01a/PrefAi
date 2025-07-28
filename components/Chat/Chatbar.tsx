import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ChatBar: React.FC = () => {
  const navigation = useNavigation();
  const [keyboardHeight, setKeyboardHeight] = useState(0);

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
          placeholder="Ask me all about immigration topic"
          placeholderTextColor="#888"
          multiline
          textAlignVertical="center"
        />

        <TouchableOpacity style={styles.iconButton}>
          <MaterialCommunityIcons name="microphone" size={22} color="#2479CF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
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
    backgroundColor: "#F1F1F1",
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
