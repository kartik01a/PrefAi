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
import { InstituteType } from "../formData";
import { styles } from "./stepStyles";

interface Step2Props {
  instituteType: InstituteType;
  setInstituteType: (data: Partial<InstituteType>) => void;
}

export const Step2 = ({ instituteType, setInstituteType }: Step2Props) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const toggleCheckbox = (field: keyof InstituteType) => {
    setInstituteType({
      [field]: instituteType[field] ? "" : "yes",
    });
  };

  const checkItems = [
    { key: "museum", label: "Museum" },
    { key: "artCenter", label: "Art Center" },
    { key: "alternativeSpace", label: "Alternative Space" },
    { key: "others", label: "Others" },
  ] as const;

  return (
    <View style={{ gap: 16 }}>
      {checkItems.map(({ key, label }) => (
        <View key={key} style={styles.inputContainerFull}>
          <TouchableOpacity
            onPress={() => toggleCheckbox(key)}
            style={[
              styles.input,
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                paddingHorizontal: 12,
              },
            ]}
          >
            <MaterialCommunityIcons
              name={
                instituteType[key] ? "checkbox-marked" : "checkbox-blank-outline"
              }
              size={20}
              color="#2479CF"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.checkBoxText}>{label}</Text>
          </TouchableOpacity>
        </View>
      ))}

      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>Project Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter project title"
          placeholderTextColor="#A0A0A0"
          value={instituteType.projectTitle}
          onChangeText={(text) => setInstituteType({ projectTitle: text })}
        />
      </View>

      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>Name of the French Artist</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter artist name"
          placeholderTextColor="#A0A0A0"
          value={instituteType.nameOfTheFrenchArtist}
          onChangeText={(text) =>
            setInstituteType({ nameOfTheFrenchArtist: text })
          }
        />
      </View>

      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>Exact Project Dates</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={[styles.input, { paddingRight: 35 }]}
              editable={false}
              value={
                instituteType.exactProjectDates
                  ? new Date(instituteType.exactProjectDates).toLocaleDateString()
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
            value={
              instituteType.exactProjectDates
                ? new Date(instituteType.exactProjectDates)
                : new Date()
            }
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setInstituteType({
                  exactProjectDates: selectedDate.toISOString(),
                });
              }
            }}
          />
        )}
      </View>
    </View>
  );
};
