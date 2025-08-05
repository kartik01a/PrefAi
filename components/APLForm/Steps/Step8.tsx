import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  GestureResponderEvent,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./stepStyles";

export const Step8 = ({
  exportToPDF,
  downloadPDF,
}: {
  exportToPDF: (formData: any) => Promise<void>;
  downloadPDF: (formData: any) => Promise<void>;
}) => {
  const { t } = useTranslation();
  function handleNewForm(event: GestureResponderEvent): void {
    router.push("/");
  }

  function generateCafNotificationFilenameWithDate(date?: Date): string {
    const targetDate = date || new Date();
    const month = targetDate.toLocaleString("en-US", { month: "long" });
    const year = targetDate.getFullYear();

    return `CAF_Notification_${month}${year}.pdf`;
  }

  return (
    <View style={[styles.centeredContainer, { gap: 20 }]}>
      <Image
        source={require("../../../assets/images/success.png")}
        style={styles.successImage}
        resizeMode="contain"
      />

      <Text style={styles.successTitle}>{t("yourCAFFormIsReady")}!</Text>

      <TouchableOpacity style={styles.pdfButton}>
        <MaterialCommunityIcons name="file-pdf-box" size={24} color="#d32f2f" />
        <Text style={styles.pdfButtonText}>
          {generateCafNotificationFilenameWithDate()}
        </Text>
      </TouchableOpacity>

      <View style={styles.bulletList}>
        <Text style={styles.bulletItem}>
          ✔️ {t("allRequiredFieldsHaveBeenFilled")}.
        </Text>
        <Text style={styles.bulletItem}>
          ✔️ {t("signatureSectionIsIncluded")}.
        </Text>
        <Text style={styles.bulletItem}>✔️ {t("")}.</Text>
      </View>

      <TouchableOpacity onPress={downloadPDF} style={styles.actionButton}>
        <Text style={styles.actionButtonText}>{t("downloadPDF")}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={exportToPDF} style={styles.actionButton}>
        <Text style={styles.actionButtonText}>{t("sharePDF")}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionButtonText}>{t("saveToMyDocumentault")}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionButtonSecondary}
        onPress={handleNewForm}
      >
        <Text style={styles.actionButtonSecondaryText}>
          {t("startNewForm")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
