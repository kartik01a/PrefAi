import useFileStore from "@/app/hooks/useDocumentStore";
import { bytesToKBRounded } from "@/utils/function";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import UploadAdd from "../../../assets/images/upload-add.svg";
import { styles } from "./stepStyles";

interface Step5Props {
  handleUploadPress: () => void;
}
export const Step5 = ({ handleUploadPress }: Step5Props) => {
  const { t } = useTranslation();
  const { selectedFile, clearSelectedFile } = useFileStore();

  const handleDelete = () => {
    clearSelectedFile();
  };

  return (
    <View style={{ gap: 5 }}>
      <TouchableOpacity
        style={styles.uploadSection}
        onPress={handleUploadPress}
      >
        <View style={styles.uploadIcon}>
          <UploadAdd />
        </View>
        <Text style={styles.uploadTitle}>{t("uploadDocuments")}</Text>
        <Text style={styles.uploadSubtitle}>
          {t("uploadDocumentsDescription")}
        </Text>
      </TouchableOpacity>

      <Text style={styles.label}>{t("locationUpload")}</Text>
      {selectedFile?.name && (
        <View style={styles.fileBox}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <MaterialCommunityIcons
              name="file-pdf-box"
              size={28}
              color="#E02424"
            />
            <View>
              <Text style={styles.fileLabel}>{selectedFile?.name}</Text>
              <Text style={styles.fileMeta}>
                {bytesToKBRounded(selectedFile?.size)}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <MaterialCommunityIcons
              onPress={handleDelete}
              name="delete-outline"
              size={22}
              color="#E02424"
            />
          </View>
        </View>
      )}
    </View>
  );
};
