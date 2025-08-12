import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { RentalContext } from "../formData";
import { styles } from "./stepStyles";
import { useTranslation } from "react-i18next";

interface Step4Props {
  rentalContext: RentalContext;
  setRentalContext: (data: Partial<RentalContext>) => void;
}

export const Step4 = ({ rentalContext, setRentalContext }: Step4Props) => {
  const { t } = useTranslation()
  const handleRentPaidToggle = (value: string) => {
    setRentalContext({
      isRentPaidDirectly: rentalContext.isRentPaidDirectly === value ? "" : value,
    });
  };

  return (
    <View style={{ gap: 16 }}>
      {/* Main Source of Funding */}
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>{t('mainSourceOfFunding')}</Text>
        <RNPickerSelect
          onValueChange={(value) => setRentalContext({ mainSourceOfFunding: value })}
          value={rentalContext.mainSourceOfFunding}
          placeholder={{ label: "Select source", value: "" }}
          items={[
            { label: "Government Support", value: "Government Support" },
            { label: "NGO/Non-profit", value: "NGO/Non-profit" },
            { label: "Personal Savings", value: "Personal Savings" },
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

      {/* Is Rent Paid Directly (Yes/No) */}
      <Text style={styles.label}>{t('isRentPaidDirectly')}</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={[
            styles.inputHalf,
            {
              backgroundColor: rentalContext.isRentPaidDirectly === "Yes" ? "#E6F0FC" : "#fff",
              borderColor: rentalContext.isRentPaidDirectly === "Yes" ? "#2479CF" : "#ccc",
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
              color: rentalContext.isRentPaidDirectly === "Yes" ? "#2479CF" : "#333",
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
              backgroundColor: rentalContext.isRentPaidDirectly === "No" ? "#E6F0FC" : "#fff",
              borderColor: rentalContext.isRentPaidDirectly === "No" ? "#2479CF" : "#ccc",
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
              color: rentalContext.isRentPaidDirectly === "No" ? "#2479CF" : "#333",
              fontWeight: "500",
            }}
          >
            {t('no')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
