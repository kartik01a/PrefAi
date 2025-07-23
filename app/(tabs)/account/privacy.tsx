import BaseLayout from "@/components/BaseLayout";
import OptionCard from "@/components/OptionCard";
import SettingCard from "@/components/SettingCard";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Option {
  label: string;
  checked: boolean;
}

const renderOptionModal = (
  visible: boolean,
  setVisible: (val: boolean) => void,
  options: Option[],
  toggleHandler: (index: number) => void
) => (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={() => setVisible(false)}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        {options.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.radioRow}
            onPress={() => toggleHandler(index)}
          >
            <View style={styles.checkboxWrapper}>
              <Ionicons
                name={item.checked ? "checkbox" : "square-outline"}
                size={20}
                color={item.checked ? "#2479CF" : "#999"}
              />
            </View>
            <Text style={styles.radioLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={() => setVisible(false)}
          style={styles.modalClose}
        >
          <Text style={styles.modalCloseText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const PrivacyScreen = () => {
  const navigation = useNavigation();

  const [isPrivate, setIsPrivate] = useState(false);
  const [showRetentionModal, setShowRetentionModal] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);

  const [retentionOptions, setRetentionOptions] = useState<Option[]>([
    { label: "Retain my data for analytics", checked: true },
    { label: "Allow usage for service improvement", checked: false },
    { label: "Delete data after account deletion", checked: true },
  ]);

  const [documentConsentOptions, setDocumentConsentOptions] = useState<
    Option[]
  >([
    { label: "Allow use of saved documents to autofill forms", checked: true },
    { label: "Ask every time before using a saved document", checked: false },
  ]);

  const toggleOption = (
    index: number,
    options: Option[],
    setOptions: (updated: Option[]) => void
  ) => {
    const updated = [...options];
    updated[index].checked = !updated[index].checked;
    setOptions(updated);
  };

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

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
          <Text style={styles.headerTitle}>Account Management</Text>
          <Text style={styles.headerSubtitle}>Account {">"} Privacy</Text>
          <Text style={styles.sectionTitle}>Account Privacy</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <SettingCard
            label="Private account"
            value={isPrivate}
            onChange={setIsPrivate}
          />

          <OptionCard
            label="Data Retention Preferences"
            onPress={() => setShowRetentionModal(true)}
          />
          <OptionCard
            label="Consent For Document Usage"
            onPress={() => setNotificationVisible(true)}
          />
          <OptionCard
            label="Clear My Data"
            onPress={() => router.push("/account/clearMyData")}
          />
        </View>

        {/* Modals */}
        {renderOptionModal(
          showRetentionModal,
          setShowRetentionModal,
          retentionOptions,
          (i: number) => toggleOption(i, retentionOptions, setRetentionOptions)
        )}
        {renderOptionModal(
          notificationVisible,
          setNotificationVisible,
          documentConsentOptions,
          (i: number) =>
            toggleOption(i, documentConsentOptions, setDocumentConsentOptions)
        )}
      </View>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 50 },
  header: {
    paddingBottom: 8,
    paddingHorizontal: 24,
  },
  backButton: { marginBottom: 12 },
  headerTitle: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "white",
  },
  headerSubtitle: {
    fontSize: 10,
    fontFamily: "Poppins-SemiBold",
    color: "white",
  },
  sectionTitle: {
    fontSize: 14,
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
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  checkboxWrapper: {
    backgroundColor: "#F2F2F2",
    borderRadius: 4,
    padding: 2,
  },
  radioLabel: {
    fontSize: 14,
    color: "#2479CF",
    fontFamily: "Poppins-Regular",
    marginLeft: 10,
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

export default PrivacyScreen;
