import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { ApplicantSituation } from "../formData";
import { styles } from "./stepStyles";
import { useTranslation } from "react-i18next";

interface Step3Props {
  applicantSituation: ApplicantSituation;
  setApplicantSituation: (data: Partial<ApplicantSituation>) => void;
}

export const Step3 = ({
  applicantSituation,
  setApplicantSituation,
}: Step3Props) => {
  const { t } = useTranslation()
  const handleYesNoSelection = (value: string) => {
    setApplicantSituation({
      incomeAndResourcesForThePastYearOrLast12Months:
        applicantSituation.incomeAndResourcesForThePastYearOrLast12Months === value ? "" : value,
    });
  };

  return (
    <View style={{ gap: 16 }}>
      <Text style={styles.label}>
        {t('financeFormStep3Title')}
      </Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={[
            styles.inputHalf,
            {
              backgroundColor:
                applicantSituation.incomeAndResourcesForThePastYearOrLast12Months === "Yes"
                  ? "#E6F0FC"
                  : "#fff",
              borderColor:
                applicantSituation.incomeAndResourcesForThePastYearOrLast12Months === "Yes"
                  ? "#2479CF"
                  : "#ccc",
              borderWidth: 1,
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 12,
            },
          ]}
          onPress={() => handleYesNoSelection("Yes")}
        >
          <Text
            style={{
              color:
                applicantSituation.incomeAndResourcesForThePastYearOrLast12Months === "Yes"
                  ? "#2479CF"
                  : "#333",
              fontWeight: "500",
            }}
          >
            {t('yes')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.inputHalf,
            {
              backgroundColor:
                applicantSituation.incomeAndResourcesForThePastYearOrLast12Months === "No"
                  ? "#E6F0FC"
                  : "#fff",
              borderColor:
                applicantSituation.incomeAndResourcesForThePastYearOrLast12Months === "No"
                  ? "#2479CF"
                  : "#ccc",
              borderWidth: 1,
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 12,
            },
          ]}
          onPress={() => handleYesNoSelection("No")}
        >
          <Text
            style={{
              color:
                applicantSituation.incomeAndResourcesForThePastYearOrLast12Months === "No"
                  ? "#2479CF"
                  : "#333",
              fontWeight: "500",
            }}
          >
            {t('no')}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>{t('employeeStatus')}</Text>
        <RNPickerSelect
          onValueChange={(value) =>
            setApplicantSituation({ employmentStatus: value })
          }
          value={applicantSituation.employmentStatus}
          placeholder={{ label: "Select status", value: "" }}
          items={[
            { label: "Employed", value: "Employed" },
            { label: "Self-employed", value: "Self-employed" },
            { label: "Unemployed", value: "Unemployed" },
            { label: "Student", value: "Student" },
            { label: "Retired", value: "Retired" },
          ]}
          useNativeAndroidPickerStyle={false}
          Icon={() => (
            <MaterialCommunityIcons
              name="chevron-down"
              size={20}
              color="#555"
              style={styles.icon}
            />
          )}
          style={{
            inputIOS: { ...styles.pickerInput, paddingRight: 30 },
            inputAndroid: { ...styles.pickerInput, paddingRight: 30 },
            iconContainer: { right: 10 },
          }}
        />
      </View>

      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>{t('socialSecurityCoverage')}</Text>
        <RNPickerSelect
          onValueChange={(value) =>
            setApplicantSituation({ socialSecurityCoverage: value })
          }
          value={applicantSituation.socialSecurityCoverage}
          placeholder={{ label: "Select coverage", value: "" }}
          items={[
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
            { label: "Partially Covered", value: "Partially Covered" },
          ]}
          useNativeAndroidPickerStyle={false}
          Icon={() => (
            <MaterialCommunityIcons
              name="chevron-down"
              size={20}
              color="#555"
              style={styles.icon}
            />
          )}
          style={{
            inputIOS: { ...styles.pickerInput, paddingRight: 30 },
            inputAndroid: { ...styles.pickerInput, paddingRight: 30 },
            iconContainer: { right: 10 },
          }}
        />
      </View>
    </View>
  );
};
