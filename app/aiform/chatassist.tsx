import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Keyboard,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import ServiceCard from "@/components/Home/ServiceCard";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const ChatAssist: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  let userData = useSelector((state: RootState) => state.auth.userInfo);
  const firstName = userData?.firstName || "User";
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

  const services = [
    {
      icon: "home-document",
      title: t("formName1"),
    },
    {
      icon: "home-document",
      title: t("formName2"),
    },
    { icon: "home-document", title: t("formName3") },
    { icon: "home-document", title: t("formName4") },
  ];

  function serviceMethod(index: number): void {
    if (index === 0) {
      router.push("/aiform/caf-declaration-form");
    } else if (index === 1) {
      router.push("/aiform/apl-form");
    } else if (index === 2) {
      router.push("/aiform/finance-form");
    } else if (index === 3) {
      router.push("/aiform/equipment-form");
    } else if ([0, 2, 3, 4].includes(index)) {
      router.push("/aiform/caf-declaration-form");
    }
  }

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop:
            Platform.OS === "android" ? StatusBar.currentHeight ?? 0 : 60,
        },
      ]}
    >
      {/* Main Content */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: keyboardHeight > 0 ? 10 : 100 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <MaterialCommunityIcons
              name="arrow-left-top"
              size={20}
              color="white"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {t("hi")}, {firstName}
          </Text>
          <Text style={styles.sectionTitle}>
            {t("whatDocumentWouldYouLikeMeToHelpYouWith")}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("cafForms")}</Text>
          <View style={styles.servicesGrid}>
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                onPress={() => serviceMethod(index)}
              />
            ))}
          </View>
        </View>

        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Other Forms</Text>
          <View style={styles.servicesGrid}>
            {services1.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                onPress={() => console.log(`Pressed ${service.title}`)}
              />
            ))}
          </View>
        </View> */}
      </ScrollView>

      {/* Fixed Chat Input Area */}
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
            <MaterialCommunityIcons
              name="microphone"
              size={22}
              color="#2479CF"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialCommunityIcons name="send" size={22} color="#2479CF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChatAssist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2479CF",
  },

  scrollContainer: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
  },

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

  backButton: {
    marginBottom: 16,
  },

  header: {
    paddingTop: 12,
    paddingHorizontal: 24,
    paddingBottom: 8,
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    color: "white",
    marginBottom: 8,
  },

  section: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 8,
    color: "#fff",
  },

  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
});
