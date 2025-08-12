import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import { AdditionalInformation } from "../formData";
import { styles } from "./stepStyles";

interface Step4Props {
  additionalInformation: AdditionalInformation;
  setAdditionalInformation: (data: Partial<AdditionalInformation>) => void;
}

export const Step4 = ({
  additionalInformation,
  setAdditionalInformation,
}: Step4Props) => {
  const { t } = useTranslation();
  const handleRentPaidToggle = (value: string) => {
    setAdditionalInformation({
      repaymentTerms:
        additionalInformation.repaymentTerms === value ? "" : value,
    });
  };
  const toggleCheckbox = (field: keyof AdditionalInformation) => {
    setAdditionalInformation({
      [field]: additionalInformation[field] ? "" : "yes",
    });
  };

  const categoryItems = [
    {
      key: "debtDeclaration1",
      label: t("debtDeclaration1Label"),
    },
    {
      key: "debtDeclaration2",
      label: t("debtDeclaration2Label"),
    },
  ] as const;

  return (
    <View style={{ gap: 16 }}>
      <Text style={styles.label}>{t("debtDeclaration")}</Text>
      {categoryItems.map(({ key, label }) => (
        <TouchableOpacity
          key={key}
          onPress={() => toggleCheckbox(key)}
          style={[
            styles.inputContainerFull,
            {
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#D9D9D9",
              borderRadius: 10,
              backgroundColor: "#F2F2F2",
              paddingHorizontal: 12,
              height: 48,
            },
          ]}
        >
          <MaterialCommunityIcons
            name={
              additionalInformation[key]
                ? "checkbox-marked"
                : "checkbox-blank-outline"
            }
            size={22}
            color="#2479CF"
            style={{ marginRight: 10 }}
          />
          <Text style={[styles.checkBoxText, { paddingRight: 24 }]}>
            {label}
          </Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.label}>{t("repaymentTerms")}</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={[
            styles.inputHalf,
            {
              backgroundColor:
                additionalInformation.repaymentTerms === "Yes"
                  ? "#E6F0FC"
                  : "#fff",
              borderColor:
                additionalInformation.repaymentTerms === "Yes"
                  ? "#2479CF"
                  : "#ccc",
              borderWidth: 1,
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 12,
            },
          ]}
          onPress={() => handleRentPaidToggle("Yes")}
        >
          <Text
            style={{
              color:
                additionalInformation.repaymentTerms === "Yes"
                  ? "#2479CF"
                  : "#333",
              fontWeight: "500",
            }}
          >
            15 €
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.inputHalf,
            {
              backgroundColor:
                additionalInformation.repaymentTerms === "No"
                  ? "#E6F0FC"
                  : "#fff",
              borderColor:
                additionalInformation.repaymentTerms === "No"
                  ? "#2479CF"
                  : "#ccc",
              borderWidth: 1,
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 12,
            },
          ]}
          onPress={() => handleRentPaidToggle("No")}
        >
          <Text
            style={{
              color:
                additionalInformation.repaymentTerms === "No"
                  ? "#2479CF"
                  : "#333",
              fontWeight: "500",
            }}
          >
            30 €
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
