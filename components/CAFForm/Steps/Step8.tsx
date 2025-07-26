import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
    GestureResponderEvent,
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "./stepStyles";

export const Step8 = () => {
    function handleNewForm(event: GestureResponderEvent): void {
        router.push('/');
    }

  return (
    <View style={[styles.centeredContainer, { gap: 20 }]}>
      <Image
        source={require("../../../assets/images/success.png")}
        style={styles.successImage}
        resizeMode="contain"
      />

      <Text style={styles.successTitle}>Your CAF form is ready!</Text>

      <TouchableOpacity style={styles.pdfButton}>
        <MaterialCommunityIcons name="file-pdf-box" size={24} color="#d32f2f" />
        <Text style={styles.pdfButtonText}>CAF_Notification_June2025.pdf</Text>
      </TouchableOpacity>

      <View style={styles.bulletList}>
        <Text style={styles.bulletItem}>✔️ All required fields have been filled.</Text>
        <Text style={styles.bulletItem}>✔️ Signature section is included.</Text>
        <Text style={styles.bulletItem}>✔️ Ready to send or print.</Text>
      </View>

      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionButtonText}>Download PDF</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionButtonText}>Share PDF</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionButtonText}>Save to My Document Vault</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButtonSecondary}
      onPress={handleNewForm}>
        <Text style={styles.actionButtonSecondaryText}>Start New Form</Text>
      </TouchableOpacity>
    </View>
  );
};
