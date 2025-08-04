import BaseLayout from "@/components/BaseLayout";
import OptionCard from "@/components/OptionCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ManagementScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  return (
    <BaseLayout>
      <View style={styles.container}>
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
          <Text style={styles.headerSubtitle}>{t("account")} {">"} {t('management')}</Text>
          <Text style={styles.sectionTitle}>{t('management')}</Text>
        </View>

        {/* Options */}
        <View style={styles.content}>
          <OptionCard label={t('hibernateAccount')} onPress={() => {}} />
          <OptionCard label={t('deleteAccount')} onPress={() => {}} />
        </View>
      </View>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 20 },
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
});

export default ManagementScreen;
