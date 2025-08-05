import React from "react";
import { StyleSheet, Text } from "react-native";
import BaseLayout from "../../components/BaseLayout";
import { useTranslation } from "react-i18next";

const ActivityTab = () => {
  const { t } = useTranslation();
  return (
    <BaseLayout edges={["left", "right"]}>
      <Text style={[styles.title, { color: "#fff" }]}>{t('activity')}</Text>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "bold",
    paddingTop: 30,
    paddingHorizontal: 20,
  },
});
export default ActivityTab;
