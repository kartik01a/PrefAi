import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { HousingDetails } from "../formData";
import { styles } from "./stepStyles";
import { useTranslation } from "react-i18next";

interface Step2Props {
  housingDetails: HousingDetails;
  setHousingDetails: (data: Partial<HousingDetails>) => void;
}

export const Step2 = ({ housingDetails, setHousingDetails }: Step2Props) => {
  const { t } = useTranslation()
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <View style={{ gap: 16 }}>
      <View style={styles.row}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>{t('typeOfHousing')}</Text>
          <RNPickerSelect
            onValueChange={(value) => setHousingDetails({ typeOfHousing: value })}
            value={housingDetails.typeOfHousing}
            placeholder={{ label: "Select type", value: "" }}
            items={[
              { label: "Apartment", value: "Apartment" },
              { label: "House", value: "House" },
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

        <View style={styles.inputHalf}>
          <Text style={styles.label}>{t('typeOfLease')}</Text>
          <RNPickerSelect
            onValueChange={(value) => setHousingDetails({ typeOfLease: value })}
            value={housingDetails.typeOfLease}
            placeholder={{ label: "Select lease", value: "" }}
            items={[
              { label: "Furnished", value: "Furnished" },
              { label: "Unfurnished", value: "Unfurnished" },
              { label: "Sublet", value: "Sublet" },
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

      <View style={styles.row}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>{t('moveInDate')}</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={[styles.input, { paddingRight: 35 }]}
                editable={false}
                value={
                  housingDetails.moveInDate
                    ? new Date(housingDetails.moveInDate).toLocaleDateString()
                    : ""
                }
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#A0A0A0"
              />
              <MaterialCommunityIcons
                name="calendar-month-outline"
                size={20}
                color="#555"
                style={styles.icon}
              />
            </View>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              value={
                housingDetails.moveInDate
                  ? new Date(housingDetails.moveInDate)
                  : new Date()
              }
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setHousingDetails({
                    moveInDate: selectedDate.toISOString(),
                  });
                }
              }}
            />
          )}
        </View>

        <View style={styles.inputHalf}>
          <Text style={styles.label}>{t('rentAmount')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t("inputDetails")}
            placeholderTextColor="#A0A0A0"
            keyboardType="numeric"
            value={housingDetails.rentAmount}
            onChangeText={(text) => setHousingDetails({ rentAmount: text })}
          />
        </View>
      </View>

      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>{t('charges')}</Text>
        <TextInput
          style={styles.input}
          placeholder={t("inputDetails")}
          placeholderTextColor="#A0A0A0"
          value={housingDetails.chargesIfApplicable}
          onChangeText={(text) =>
            setHousingDetails({ chargesIfApplicable: text })
          }
        />
      </View>

 <View style={styles.row}>
  <View style={styles.inputHalf}>
    <Text style={styles.label}>{t("caf")}</Text>
    <TouchableOpacity
      onPress={() =>
        setHousingDetails({
          directPaymentByCAF:
            housingDetails.directPaymentByCAF === "CAF" ? "" : "CAF",
        })
      }
      style={[
        styles.input,
        {
          backgroundColor:
            housingDetails.directPaymentByCAF === "CAF" ? "#F2F2F2" : "#fff",
          borderColor:
            housingDetails.directPaymentByCAF === "CAF" ? "#2479CF" : "#ccc",
          borderWidth: 1,
          borderRadius: 8,
          paddingVertical: 12,
          alignItems: "center",
        },
      ]}
    >
      <Text
        style={{
          color:
            housingDetails.directPaymentByCAF === "CAF" ? "#2479CF" : "#333",
          fontWeight: "500",
        }}
      >
        {t("caf")}
      </Text>
    </TouchableOpacity>
  </View>

  {/* MSA */}
  <View style={styles.inputHalf}>
    <Text style={styles.label}>{t("msa")}</Text>
    <TouchableOpacity
      onPress={() =>
        setHousingDetails({
          directPaymentByCAF:
            housingDetails.directPaymentByCAF === "MSA" ? "" : "MSA",
        })
      }
      style={[
        styles.input,
        {
          backgroundColor:
            housingDetails.directPaymentByCAF === "MSA" ? "#F2F2F2" : "#fff",
          borderColor:
            housingDetails.directPaymentByCAF === "MSA" ? "#2479CF" : "#ccc",
          borderWidth: 1,
          borderRadius: 8,
          paddingVertical: 12,
          alignItems: "center",
        },
      ]}
    >
      <Text
        style={{
          color:
            housingDetails.directPaymentByCAF === "MSA" ? "#2479CF" : "#333",
          fontWeight: "500",
        }}
      >
        {t("msa")}
      </Text>
    </TouchableOpacity>
  </View>
</View>

    </View>
  );
};
