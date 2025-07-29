import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import UploadAdd from "../../../assets/images/upload-add.svg";
import { styles } from "./stepStyles";

interface Step5Props {
  handleUploadPress: () => void;
}

export const Step5 = ({ handleUploadPress }: Step5Props) => {
  return (
    <View style={{ gap: 5}}>
      <TouchableOpacity
        style={styles.uploadSection}
        onPress={handleUploadPress}
      >
        <View style={styles.uploadIcon}>
          <UploadAdd />
        </View>
        <Text style={styles.uploadTitle}>Upload Documents</Text>
        <Text style={styles.uploadSubtitle}>
          You can upload document by importing{"\n"}or scanning with your camera
        </Text>
      </TouchableOpacity>

      <Text style={styles.label}>Location Upload</Text>

      <View style={styles.fileBox}>
        <Text style={styles.fileLabel}>identify folder</Text>
        <MaterialCommunityIcons name="close" size={20} color="#333" />
      </View>

      <View style={styles.fileBox}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <MaterialCommunityIcons name="file-pdf-box" size={28} color="#E02424" />
          <View>
            <Text style={styles.fileLabel}>CAF_Notification_June2025</Text>
            <Text style={styles.fileMeta}>20MB</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <MaterialCommunityIcons name="delete-outline" size={22} color="#E02424" />
          <MaterialCommunityIcons name="download" size={22} color="#2479CF" />
        </View>
      </View>

      <View style={styles.fileBox}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <MaterialCommunityIcons name="file-pdf-box" size={28} color="#E02424" />
          <View>
            <Text style={styles.fileLabel}>CAF_Balance_May2025</Text>
            <Text style={styles.fileMeta}>15MB</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <MaterialCommunityIcons name="delete-outline" size={22} color="#E02424" />
          <MaterialCommunityIcons name="download" size={22} color="#2479CF" />
        </View>
      </View>

      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 24 }}>...</Text>
      </View>

      <View style={styles.fileBox}>
        <Text style={styles.fileLabel}>CAF_Notification_June2025.pdf</Text>
        <MaterialCommunityIcons name="close" size={20} color="#333" />
      </View>
    </View>
  );
};
