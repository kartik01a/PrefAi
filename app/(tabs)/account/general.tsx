import BaseLayout from "@/components/BaseLayout";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const languageData = [
  { label: "English (US)", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Chinese", value: "zh" },
  { label: "Japanese", value: "ja" },
];

const GeneralScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

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
          <Text style={styles.headerSubtitle}>Account {">"} General</Text>
          <Text style={styles.sectionTitle}>Personal Information</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.menuContainer}>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedLanguage}
                onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
                style={styles.picker}
                itemStyle={styles.pickerItem}
              >
                <Picker.Item label="English" value="en" />
                <Picker.Item label="Spanish" value="es" />
                <Picker.Item label="French" value="fr" />
                <Picker.Item label="Georgian" value="de" />
                <Picker.Item label="Russian" value="zh" />
                <Picker.Item label="Arabic" value="ja" />
              </Picker>
            </View>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedLanguage}
                onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
                style={styles.picker}
                itemStyle={styles.pickerItem}
              >
                <Picker.Item label="English" value="en" />
                <Picker.Item label="Spanish" value="es" />
                <Picker.Item label="French" value="fr" />
                <Picker.Item label="Georgian" value="de" />
                <Picker.Item label="Russian" value="zh" />
                <Picker.Item label="Arabic" value="ja" />
              </Picker>
            </View>

            {/* <MenuItem
              title="Showing profile photos"
              onPress={() => console.log("Profile photos pressed")}
            />

            <MenuItem
              title="Notifications management"
              onPress={() => console.log("Notifications pressed")}
            /> */}
          </View>
        </View>
      </View>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  header: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingBottom: 8,
    paddingHorizontal: 24,
  },
  backButton: {
    marginRight: 16,
  },
  headerTextContainer: {
    flex: 1,
  },
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
  content: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    color: "white",
    marginTop: 16,
  },
  menuContainer: {
    backgroundColor: "white",
  },
  dropdownValue: {
    fontSize: 14,
    color: "#2479CF",
    marginTop: 2,
  },
  pickerContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    paddingVertical: 3,
  },
  picker: {
    height: 54,
    color: "#2479CF",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  pickerItem: {
    color: "#2479CF",
    fontSize: 11,
    fontWeight: "400",
    fontFamily: "Poppins-Regular",
  },
});

export default GeneralScreen;
