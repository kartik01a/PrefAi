import BaseLayout from "@/components/BaseLayout";
import SettingCard from "@/components/SettingCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const ClearMyData = () => {
  const navigation = useNavigation();
  const [isClear, setIsClear] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [rating, setRating] = useState(4); 
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const handleToggle = (value: boolean) => {
    if (value) {
      setShowDialog(true); 
    }
    setIsClear(value);
  };

  const handleDelete = () => {
    setShowDialog(false);
    console.log("Deleted account and all data.");
  };

  const handleCancel = () => {
    setIsClear(false); 
    setShowDialog(false);
  };

  return (
    <BaseLayout>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left-top" size={20} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Account Management</Text>
          <Text style={styles.headerSubtitle}>
            Account {">"} Privacy {">"} Clear My Data
          </Text>
          <Text style={styles.sectionTitle}>Account Privacy</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
            <SettingCard
            label="Clear My Data"
            value={isClear}
            onChange={handleToggle}
          />
          <Text style={styles.textStyle}>
            This action is irreversible and will remove all your saved documents,
            preferences, and form history.
          </Text>
        </View>

        {/* Confirmation Dialog */}
        <Modal visible={showDialog} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Are you sure you want to delete your account?</Text>
              <Text style={styles.modalSub}>How are you feeling?</Text>
              <Text style={styles.modalDesc}>
                Your input is valuable in helping us better understand your needs
                and tailor our service accordingly
              </Text>

              {/* Star Rating */}
              <View style={styles.starRow}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <MaterialCommunityIcons
                    key={i}
                    name={i <= rating ? "star" : "star-outline"}
                    size={20}
                    color="#6A6572"
                    onPress={() => setRating(i)}
                  />
                ))}
                <Text style={{ marginLeft: 8, color: "#000" }}>{rating}/5</Text>
              </View>

              {/* Buttons */}
              <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <Text style={styles.deleteButtonText}>Delete My Account & All Data</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  card: {
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
    paddingVertical: 2,
    paddingHorizontal: 16,
  },
  optionLabel: {
    fontSize: 16,
    color: "#2479CF",
    fontFamily: "Poppins-SemiBold",
  },
  textStyle: {
    color: "#2479CF",
    fontFamily: "Poppins-regular",
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#FFF",
    padding: 24,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#000",
    marginBottom: 12,
    textAlign: "center",
  },
  modalSub: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#333",
    marginBottom: 4,
    textAlign: "center",
  },
  modalDesc: {
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    color: "#4B5563",
    marginBottom: 16,
    textAlign: "center",
  },
  starRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: "#2479CF",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  deleteButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
  },
  cancelButton: {
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#999",
    backgroundColor: "#2479CF"
  },
  cancelButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
  },
});

export default ClearMyData;
