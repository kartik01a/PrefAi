import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { ParentsInformation } from "../formData";
import { styles } from "./stepStyles";

interface Step5Props {
  parentsInfo: ParentsInformation;
  setParentsInfo: (data: Partial<ParentsInformation>) => void;
}

export const Step5 = ({ parentsInfo, setParentsInfo }: Step5Props) => {
  const { t } = useTranslation();
  return (
    <View style={{ gap: 16 }}>
      {/* Are your parents still receiving aid? */}
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>
          {t("areYourParentsStillReceivingAidOnYourBehalf")}?
        </Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.radioOption,
              parentsInfo.isReceivingAid === true && styles.radioOptionSelected,
            ]}
            onPress={() => setParentsInfo({ isReceivingAid: true })}
          >
            <Text style={styles.radioOptionText}>{t("yes")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radioOption,
              parentsInfo.isReceivingAid === false &&
                styles.radioOptionSelected,
            ]}
            onPress={() => setParentsInfo({ isReceivingAid: false })}
          >
            <Text style={styles.radioOptionText}>{t("no")}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Parent's Full Name */}
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>{t("parentFullName")}</Text>
        <TextInput
          style={styles.input}
          placeholder={t("inputDetails")}
          value={parentsInfo.fullName}
          onChangeText={(text) => setParentsInfo({ fullName: text })}
        />
      </View>

      {/* Full Address */}
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>{t("fullAddress")}</Text>
        <TextInput
          style={styles.input}
          placeholder={t("inputDetails")}
          value={parentsInfo.fullAddress}
          onChangeText={(text) => setParentsInfo({ fullAddress: text })}
        />
      </View>

      {/* CAF Org & Beneficiary Number */}
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>
          {t("CAFOrganizationAndBeneficiaryNumber")}
        </Text>
        <TextInput
          style={styles.input}
          placeholder={t("inputDetails")}
          keyboardType="number-pad"
          value={parentsInfo.cafNumber}
          onChangeText={(text) => setParentsInfo({ cafNumber: text })}
        />
      </View>

      {/* Social Security Number */}
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>{t("socialSecurityNumber")}</Text>
        <TextInput
          style={styles.input}
          placeholder={t("inputDetails")}
          keyboardType="number-pad"
          value={parentsInfo.socialSecurityNumber}
          onChangeText={(text) =>
            setParentsInfo({ socialSecurityNumber: text })
          }
        />
      </View>
    </View>
  );
};
