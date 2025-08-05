import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { styles } from "./stepStyles";

export const Step4 = () => {
  const { t } = useTranslation();
  const bulletPoints = [
    t("step4Point1"),
    t("step4Point2"),
    t("step4Point3"),
    t("step4Point4"),
    t("step4Point5"),
  ];

  return (
    <View style={{ paddingVertical: 16, gap: 12 }}>
      <Text style={[styles.label, { marginBottom: 8 }]}>{t('weRequire')}:</Text>
      {bulletPoints.map((item, index) => (
        <View
          key={index}
          style={{ flexDirection: "row", alignItems: "flex-start" }}
        >
          <Text style={{ fontSize: 16, marginRight: 8 }}>•</Text>
          <Text style={[styles.label, { flex: 1 }]}>{item}</Text>
        </View>
      ))}
    </View>
  );
};
