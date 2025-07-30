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
import { FamilySituation } from "../formData";
import { styles } from "./stepStyles";

interface Step3Props {
  familySituation: FamilySituation;
  setFamilySituation: (data: Partial<FamilySituation>) => void;
}

export const Step3 = ({ familySituation, setFamilySituation }: Step3Props) => {
  const [showDobPicker, setShowDobPicker] = useState(false);

  return (
    <View style={{ gap: 16 }}>
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>Marital Status</Text>
        <RNPickerSelect
          onValueChange={(value) =>
            setFamilySituation({ maritalStatus: value })
          }
          value={familySituation.maritalStatus}
          placeholder={{ label: "Select status", value: "" }}
          items={[
            { label: "Single", value: "Single" },
            { label: "Married", value: "Married" },
            { label: "Divorced", value: "Divorced" },
            { label: "Widowed", value: "Widowed" },
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
      <View style={styles.row}>
        <View style={styles.inputContainerFull}>
          <Text style={styles.label}>Since When</Text>
          <TouchableOpacity onPress={() => setShowDobPicker(true)}>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={[styles.input, { paddingRight: 35 }]}
                editable={false}
                value={
                  familySituation.marriageDate
                    ? new Date(
                        familySituation.marriageDate
                      ).toLocaleDateString()
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
          {showDobPicker && (
            <DateTimePicker
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              value={
                familySituation.marriageDate
                  ? new Date(familySituation.marriageDate)
                  : new Date()
              }
              onChange={(event, selectedDate) => {
                setShowDobPicker(false);
                if (selectedDate) {
                  setFamilySituation({
                    marriageDate: selectedDate.toISOString(),
                  });
                }
              }}
            />
          )}
        </View>
      </View>
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>Spouse Name (is applicable)</Text>
        <TextInput
          style={styles.input}
          placeholder="Input details"
          value={familySituation.spouseName}
          onChangeText={(text) => setFamilySituation({ spouseName: text })}
        />
      </View>
    </View>
  );
};
