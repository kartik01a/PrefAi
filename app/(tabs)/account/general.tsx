import BaseLayout from "@/components/BaseLayout";
import { changeLanguageWithRestart, isRTLLanguage } from "@/i18n";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  I18nManager,
  Modal,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

const LANGUAGE_LABELS = {
  en: "English",
  zh: "Chinese",
  ka: "Georgian",
  // ar: "Arabic",
  ru: "Russian",
  pt: "Portuguese",
};

type NotificationOption = "none" | "network" | "all";

const OPTION_LABELS: Record<NotificationOption, string> = {
  none: "No One",
  network: "Your Network",
  all: "All Members",
};

const OptionCard = ({
  label,
  valueLabel,
  onPress,
}: {
  label: string;
  valueLabel?: string;
  onPress?: () => void;
}) => (
  <View style={styles.optionCard}>
    <TouchableOpacity style={styles.optionRow} onPress={onPress}>
      <View>
        <Text style={styles.optionLabel}>{label}</Text>
        {valueLabel && <Text style={styles.optionValue}>{valueLabel}</Text>}
      </View>
      <Ionicons name="chevron-forward" size={20} color="#2479CF" />
    </TouchableOpacity>
  </View>
);

const LabeledSwitch = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (val: boolean) => void;
}) => (
  <View style={styles.switchRow}>
    <Text style={styles.radioLabel}>{label}</Text>
    <Switch
      value={value}
      onValueChange={onChange}
      trackColor={{ false: "#DEDEDE", true: "#319F43" }}
      thumbColor="#FFFFFF"
    />
  </View>
);

const GeneralScreen = () => {
  const [language, setLanguage] = useState("en");
  const { t, i18n } = useTranslation();

  const [profilePhotoVisibility, setProfilePhotoVisibility] =
    useState<NotificationOption>("network");
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState<
    Record<NotificationOption, boolean>
  >({
    none: false,
    network: true,
    all: false,
  });

  const handleLanguageSelect = async (languageCode: string) => {
    if (isChangingLanguage || languageCode === language) return;

    try {
      setIsChangingLanguage(true);

      const isRTL = isRTLLanguage(languageCode);
      const currentRTL = I18nManager.isRTL;
      const needsRestart = currentRTL !== isRTL;

      if (needsRestart) {
        Alert.alert(
          t("languageChange") || "Language Change",
          t("restartRequired") ||
            "The app needs to restart to apply the layout changes for this language.",
          [
            {
              text: t("cancel") || "Cancel",
              style: "cancel",
              onPress: () => {
                setIsChangingLanguage(false);
              },
            },
            {
              text: t("changeAndRestart") || "Change & Restart",
              onPress: async () => {
                try {
                  await changeLanguageWithRestart(languageCode, false);
                } catch (error) {
                  console.error("Error changing language:", error);
                  Alert.alert(
                    t("error") || "Error",
                    t("languageChangeError") ||
                      "Failed to change language. Please try again."
                  );
                  setIsChangingLanguage(false);
                }
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        // No restart needed, just change language
        await changeLanguageWithRestart(languageCode, false);
        setLanguage(languageCode);
        setIsChangingLanguage(false);

        Alert.alert(
          t("languageChanged") || "Language Changed",
          t("languageChangedSuccess") ||
            "Language has been changed successfully.",
          [{ text: t("ok") || "OK" }]
        );
      }
    } catch (error) {
      console.error("Error in handleLanguageSelect:", error);
      Alert.alert(
        t("error") || "Error",
        t("languageChangeError") ||
          "Failed to change language. Please try again."
      );
      setIsChangingLanguage(false);
    }
  };

  const getCurrentLanguageLabel = () => {
    return (
      LANGUAGE_LABELS[language as keyof typeof LANGUAGE_LABELS] || language
    );
  };

  return (
    <BaseLayout>
      <View style={styles.container}>
        {/* Header */}
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
          <Text style={styles.headerTitle}>{t("accountManagement")}</Text>
          <Text style={styles.headerSubtitle}>
            {t("account")} {">"} {t("general")}
          </Text>
          <Text style={styles.sectionTitle}>{t("personalInformation")}</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Language Selection */}
          <RNPickerSelect
            value={language}
            onValueChange={(value) => {
              handleLanguageSelect(value);
              setLanguage(value);
            }}
            items={[
              { label: "English", value: "en" },
              { label: "Chinese ", value: "zh" },
              { label: "Georgian", value: "ka" },
              // { label: "Arabic", value: "ar" },
              { label: "Russian", value: "ru" },
              { label: "Portuguese", value: "pt" },
            ]}
            style={{
              inputIOS: { color: "transparent" },
              inputAndroid: { color: "transparent" },
              placeholder: { color: "#000" },
            }}
            useNativeAndroidPickerStyle={false}
          >
            <OptionCard
              label={`${
                t("language") || "Language"
              }: ${getCurrentLanguageLabel()}`}
            />
          </RNPickerSelect>

          {/* Profile Photo Visibility */}
          <RNPickerSelect
            value={profilePhotoVisibility}
            onValueChange={setProfilePhotoVisibility}
            items={[
              { label: "No One", value: "none" },
              { label: "Your Network", value: "network" },
              { label: "All Members", value: "all" },
            ]}
            style={{
              inputIOS: { color: "transparent" },
              inputAndroid: { color: "transparent" },
            }}
            useNativeAndroidPickerStyle={false}
          >
            <OptionCard label={t("showingProfilePhotos")} />
          </RNPickerSelect>

          {/* Notification Settings */}
          <OptionCard
            label={t("notificationsManagement")}
            onPress={() => setNotificationVisible(true)}
          />

          {/* Modal for Notification Settings */}
          <Modal
            transparent
            visible={notificationVisible}
            animationType="fade"
            onRequestClose={() => setNotificationVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                {(["none", "network", "all"] as NotificationOption[]).map(
                  (opt) => (
                    <LabeledSwitch
                      key={opt}
                      label={OPTION_LABELS[opt]}
                      value={notificationSettings[opt]}
                      onChange={(value) =>
                        setNotificationSettings((prev) => ({
                          ...prev,
                          [opt]: value,
                        }))
                      }
                    />
                  )
                )}

                <TouchableOpacity
                  onPress={() => setNotificationVisible(false)}
                  style={styles.modalClose}
                >
                  <Text style={styles.modalCloseText}>{t("close")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 20 },
  header: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingBottom: 8,
    paddingHorizontal: 24,
  },
  backButton: { marginRight: 16 },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    color: "white",
  },
  headerSubtitle: {
    fontSize: 10,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    color: "white",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    color: "white",
    marginTop: 16,
  },
  content: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  optionCard: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 16,
    overflow: "hidden",
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  optionLabel: {
    fontSize: 16,
    color: "#2479CF",
    fontFamily: "Poppins-SemiBold",
  },
  optionValue: {
    fontSize: 14,
    color: "#2479CF",
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
  },
  radioLabel: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  modalClose: {
    alignSelf: "flex-end",
    marginTop: 20,
  },
  modalCloseText: {
    color: "#2479CF",
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
  },
});

export default GeneralScreen;
