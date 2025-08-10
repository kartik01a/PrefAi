import { logout } from "@/features/auth/authSlice";
import { router, useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useUpdateUserLanguageMutation } from "./usersApiSlice";

const languages = [
  {
    country: "France",
    code: "FR",
    language: "Français",
    icon: require("../../assets/images/country/fr.png"),
  },
  {
    country: "English",
    code: "GB",
    language: "English",
    icon: require("../../assets/images/country/gb.png"),
  },
  {
    country: "Georgian",
    code: "GE",
    language: "ქართული ენა",
    icon: require("../../assets/images/country/ge.png"),
  },
  {
    country: "Russian",
    code: "RUS",
    language: "Русский",
    icon: require("../../assets/images/country/ru.png"),
  },
  {
    country: "Arabic",
    code: "SA",
    language: "لغة الضاد",
    icon: require("../../assets/images/country/sa.png"),
  },
  {
    country: "Portuguese",
    code: "PT",
    language: "Português",
    icon: require("../../assets/images/country/pt.png"),
  },
  {
    country: "Turkish",
    code: "TR",
    language: "Türkçe",
    icon: require("../../assets/images/country/tr.png"),
  },
  {
    country: "Mandarin",
    code: "CN",
    language: "中文 (简体)",
    icon: require("../../assets/images/country/cn.png"),
  },
];

const WelcomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const userId = useSelector((state: RootState) => state.auth.userInfo?.id);
  const [updateUserInfo] = useUpdateUserLanguageMutation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleContinue = async () => {
    if (!selectedLang || !userId) return;
    try {
      await updateUserInfo({ language: selectedLang, id: userId }).unwrap();
      dispatch(logout());
      Toast.show({
        type: "success",
        text1: "Success",
      });
      router.replace("/auth/signin");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to update language",
      });
      console.error("Failed to update language:", error);
    }
  };

  const renderLanguageItem = ({
    item,
    index,
  }: {
    item: (typeof languages)[0];
    index: number;
  }) => {
    const isSelected = selectedLang === item.code;

    return (
      <TouchableOpacity
        key={`${item.code}-${index}`}
        style={[
          styles.languageItemBox,
          isSelected && styles.languageItemSelected,
        ]}
        onPress={() => setSelectedLang(item.code)}
      >
        <View style={styles.langLeft}>
          <Image source={item.icon} style={styles.flagIcon} />
          <Text style={styles.countryText}>{item.country}</Text>
        </View>

        <View style={styles.langRight}>
          <Text style={styles.languageBracketText}>({item.language})</Text>
          {isSelected && <Text style={styles.tickIcon}>✔️</Text>}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#2479CF" />

      <View style={styles.topSection}>
        <View style={styles.logoSection}>
          <Image
            source={require("../../assets/images/prefAI.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.logoText}>{t("prefai")}</Text>
        </View>

        <View style={styles.introTextContainer}>
          <Text style={styles.welcomeTitle}>{t("welcome")}</Text>
          <Text style={styles.description}>{t("welcomeDescription")}</Text>
        </View>
      </View>

      <View style={styles.languageSection}>
        <FlatList
          data={languages}
          keyExtractor={(item, index) => `${item.code}-${index}`}
          renderItem={renderLanguageItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View
        style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}
      >
        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedLang && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!selectedLang}
        >
          <Text
            style={[
              styles.continueButtonText,
              !selectedLang && styles.continueButtonTextDisabled,
            ]}
          >
            {t("continue")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2479CF",
  },

  topSection: {
    backgroundColor: "#2479CF",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },

  logoSection: {
    alignItems: "center",
    marginBottom: 5,
  },

  logoImage: {
    width: 60,
    height: 60,
    marginBottom: 4,
  },

  logoText: {
    fontSize: 24,
    fontFamily: "Poppins-SemiBold",
    color: "#fff",
  },

  introTextContainer: {
    marginBottom: 16,
  },

  welcomeTitle: {
    fontSize: 24,
    fontFamily: "Poppins-SemiBold",
    color: "#fff",
    marginBottom: 6,
    textAlign: "left",
  },

  description: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#fff",
    textAlign: "left",
  },

  languageSection: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 30,
  },

  listContainer: {
    paddingBottom: 20,
    gap: 6,
  },

  languageItemBox: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },

  languageItemSelected: {
    backgroundColor: "#e6f0ff",
    borderColor: "#2479CF",
  },

  langLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  flagIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
    borderRadius: 12,
  },

  countryText: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#333",
  },

  langRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  languageBracketText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#8C8888",
    textAlign: "right",
  },

  tickIcon: {
    fontSize: 15,
    color: "#2479CF",
  },

  footer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
  },

  continueButton: {
    backgroundColor: "#2479CF",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  continueButtonDisabled: {
    backgroundColor: "#fff",
    borderColor: "#8C8888",
    borderWidth: 1,
  },

  continueButtonText: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#fff",
  },

  continueButtonTextDisabled: {
    color: "#8C8888",
  },
});
