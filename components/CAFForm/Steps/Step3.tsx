import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { MsaRegistration } from "../formData";
import { styles } from "./stepStyles";

interface Step3Props {
  msaRegistration: MsaRegistration;
  setMsaRegistration: (data: Partial<MsaRegistration>) => void;
}

export const Step3 = ({ msaRegistration, setMsaRegistration }: Step3Props) => {
  const { t } = useTranslation();
  return (
    <View style={{ gap: 16 }}>
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>{t("CAFFormStep3Title")}</Text>

        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.inputHalf,
              {
                backgroundColor:
                  msaRegistration.isPreviouslyRegistered === true
                    ? "#E6F0FC"
                    : "#fff",
                borderColor:
                  msaRegistration.isPreviouslyRegistered === true
                    ? "#2479CF"
                    : "#ccc",
                borderWidth: 1,
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 12,
              },
            ]}
            onPress={() => setMsaRegistration({ isPreviouslyRegistered: true })}
          >
            <Text
              style={{
                color:
                  msaRegistration.isPreviouslyRegistered === true
                    ? "#2479CF"
                    : "#333",
                fontWeight: "500",
              }}
            >
              {t("yes")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.inputHalf,
              {
                backgroundColor:
                  msaRegistration.isPreviouslyRegistered === false
                    ? "#E6F0FC"
                    : "#fff",
                borderColor:
                  msaRegistration.isPreviouslyRegistered === false
                    ? "#2479CF"
                    : "#ccc",
                borderWidth: 1,
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 12,
              },
            ]}
            onPress={() =>
              setMsaRegistration({ isPreviouslyRegistered: false })
            }
          >
            <Text
              style={{
                color:
                  msaRegistration.isPreviouslyRegistered === false
                    ? "#2479CF"
                    : "#333",
                fontWeight: "500",
              }}
            >
              {t("no")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>{t("nameOfTheOrganization")}</Text>
        <TextInput
          style={styles.input}
          placeholder={t("inputDetails")}
          placeholderTextColor="#A0A0A0"
          value={msaRegistration.organizationName}
          onChangeText={(text) =>
            setMsaRegistration({ organizationName: text })
          }
        />
      </View>
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>{t("country")}</Text>
        <RNPickerSelect
          onValueChange={(value) =>
            setMsaRegistration({ organizationCountry: value })
          }
          value={msaRegistration.organizationCountry}
          placeholder={{ label: t("selectCountry"), value: "" }}
          items={[
            { label: "Russia", value: "Russia" },
            { label: "China", value: "China" },
            { label: "Georgia", value: "Georgia" },
            { label: "Portugal", value: "Portugal" },
            { label: "Other", value: "Other" },
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
        <Text style={styles.label}>{t("beneficiaryNumber")}</Text>
        <TextInput
          style={styles.input}
          placeholder={t("inputDetails")}
          placeholderTextColor="#A0A0A0"
          value={msaRegistration.beneficiaryNumber}
          onChangeText={(text) => {
            const numericText = text.replace(/[^0-9]/g, "");
            setMsaRegistration({ beneficiaryNumber: numericText });
          }}
          keyboardType="numeric"
          maxLength={15}
        />
      </View>
    </View>
  );
};
