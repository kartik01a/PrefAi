import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
    Platform,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { EmploymentSituation } from "../formData";
import { styles } from "./stepStyles";

interface Step6Props {
  employment: EmploymentSituation;
  setEmployment: (data: Partial<EmploymentSituation>) => void;
}

export const Step6 = ({ employment, setEmployment }: Step6Props) => {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleDateChange = (
    key: "startDate" | "endDate",
    event: any,
    selectedDate?: Date
  ) => {
    if (selectedDate) {
      const formatted = selectedDate.toISOString().split("T")[0];
      setEmployment({ [key]: formatted });
    }
  };

  return (
    <View style={{ gap: 16 }}>
      {/* Current Status - single select */}
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>Current Status</Text>
        <RNPickerSelect
          onValueChange={(value) => setEmployment({ currentStatus: value })}
          value={employment.currentStatus}
          placeholder={{ label: "Select your status", value: "" }}
          items={[
            { label: "Employed", value: "Employed" },
            { label: "Apprentice", value: "Apprentice" },
            { label: "Self-employed", value: "Self-employed" },
            { label: "Student", value: "Student" },
            { label: "Unemployed (receiving aid?)", value: "Unemployed (receiving aid?)" },
            { label: "Retired", value: "Retired" },
            { label: "On sick leave", value: "On sick leave" },
            { label: "On parental/maternity leave", value: "On parental/maternity leave" },
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

      {/* Type of Contract */}
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>Type of Contract</Text>
        <RNPickerSelect
          onValueChange={(value) => setEmployment({ contractType: value })}
          value={employment.contractType}
          placeholder={{ label: "Select contract type", value: "" }}
          items={[
            { label: "CCD", value: "CCD" },
            { label: "CDI", value: "CDI" },
            { label: "Interim", value: "Interim" },
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

      {/* Start Date & End Date */}
      <View style={styles.row}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>Start Date</Text>
          <TouchableOpacity
            style={styles.datePickerTouchable}
            onPress={() => setShowStartPicker(true)}
          >
            <Text style={styles.datePickerText}>
              {employment.startDate || "Select Date"}
            </Text>
            <MaterialCommunityIcons
              name="calendar-month-outline"
              size={20}
              color="#555"
            />
          </TouchableOpacity>
          {showStartPicker && (
            <DateTimePicker
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              value={
                employment.startDate
                  ? new Date(employment.startDate)
                  : new Date()
              }
              onChange={(e, date) => {
                setShowStartPicker(Platform.OS === "ios");
                handleDateChange("startDate", e, date);
              }}
            />
          )}
        </View>

        <View style={styles.inputHalf}>
          <Text style={styles.label}>End Date (if fixed)</Text>
          <TouchableOpacity
            style={styles.datePickerTouchable}
            onPress={() => setShowEndPicker(true)}
          >
            <Text style={styles.datePickerText}>
              {employment.endDate || "Select Date"}
            </Text>
            <MaterialCommunityIcons
              name="calendar-month-outline"
              size={20}
              color="#555"
            />
          </TouchableOpacity>
          {showEndPicker && (
            <DateTimePicker
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              value={
                employment.endDate ? new Date(employment.endDate) : new Date()
              }
              onChange={(e, date) => {
                setShowEndPicker(Platform.OS === "ios");
                handleDateChange("endDate", e, date);
              }}
            />
          )}
        </View>
      </View>

      {/* Social Contribution */}
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>Social Contribution</Text>
        <RNPickerSelect
          onValueChange={(value) => setEmployment({ socialContribution: value })}
          value={employment.socialContribution}
          placeholder={{ label: "Select option", value: "" }}
          items={[
            { label: "URSSAF", value: "URSSAF" },
            { label: "MSA", value: "MSA" },
            { label: "Others", value: "Others" },
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

      {/* Foreign Contribution Country */}
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>Foreign Contributions? Country</Text>
        <RNPickerSelect
          onValueChange={(value) =>
            setEmployment({ foreignContributionCountry: value })
          }
          value={employment.foreignContributionCountry}
          placeholder={{ label: "Select country", value: "" }}
          items={[
            { label: "France", value: "France" },
            { label: "India", value: "India" },
            { label: "USA", value: "USA" },
            { label: "Germany", value: "Germany" },
            { label: "Others", value: "Others" },
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
