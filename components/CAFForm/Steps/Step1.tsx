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
import { PersonalDetails } from "../formData";
import { styles } from "./stepStyles";

interface Step1Props {
  personalDetails: PersonalDetails;
  setPersonalDetails: (data: Partial<PersonalDetails>) => void;
}

export const Step1 = ({ personalDetails, setPersonalDetails }: Step1Props) => {
  const [showDobPicker, setShowDobPicker] = useState(false);
  const [showArrivalPicker, setShowArrivalPicker] = useState(false);

  return (
    <View style={{ gap: 16 }}>
      <View style={styles.row}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>Title</Text>
          <RNPickerSelect
            onValueChange={(value) => setPersonalDetails({ title: value })}
            value={personalDetails.title}
            placeholder={{ label: "Select Title", value: "" }}
            items={[
              { label: "Mr", value: "Mr" },
              { label: "Mrs", value: "Mrs" },
              { label: "Miss", value: "Miss" },
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
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter first name"
            placeholderTextColor="#A0A0A0"
            value={personalDetails.firstName}
            onChangeText={(text) =>
              setPersonalDetails({ firstName: text })
            }
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>Username (optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter username"
            placeholderTextColor="#A0A0A0"
            value={personalDetails.userName}
            onChangeText={(text) =>
              setPersonalDetails({ userName: text })
            }
          />
        </View>

        <View style={styles.inputHalf}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter last name"
            placeholderTextColor="#A0A0A0"
            value={personalDetails.lastName}
            onChangeText={(text) =>
              setPersonalDetails({ lastName: text })
            }
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>Date of Birth</Text>
          <TouchableOpacity onPress={() => setShowDobPicker(true)}>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={[styles.input, { paddingRight: 35 }]}
                editable={false}
                value={
                  personalDetails.dob
                    ? new Date(personalDetails.dob).toLocaleDateString()
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
              value={
                personalDetails.dob
                  ? new Date(personalDetails.dob)
                  : new Date()
              }
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedDate) => {
                setShowDobPicker(false);
                if (selectedDate) {
                  setPersonalDetails({
                    dob: selectedDate.toISOString(),
                  });
                }
              }}
            />
          )}
        </View>

        <View style={styles.inputHalf}>
          <Text style={styles.label}>Country of Birth</Text>
          <RNPickerSelect
            onValueChange={(value) =>
              setPersonalDetails({ countryOfBirth: value })
            }
            value={personalDetails.countryOfBirth}
            placeholder={{ label: "Select Country", value: "" }}
            items={[
              { label: "France", value: "France" },
              { label: "India", value: "India" },
              { label: "USA", value: "USA" },
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

      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>Marital Status</Text>
        <RNPickerSelect
          onValueChange={(value) =>
            setPersonalDetails({ maritalStatus: value })
          }
          value={personalDetails.maritalStatus}
          placeholder={{ label: "Select Status", value: "" }}
          items={[
            { label: "Single", value: "single" },
            { label: "Married", value: "married" },
            { label: "Divorced", value: "divorced" },
            { label: "Widowed", value: "widowed" },
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
        <Text style={styles.label}>Social Security Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter SSN"
          placeholderTextColor="#A0A0A0"
          keyboardType="numeric"
          value={personalDetails.socialSecurityNumber}
          onChangeText={(text) =>
            setPersonalDetails({ socialSecurityNumber: text })
          }
        />
      </View>

      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>Date of Arrival in France</Text>
        <TouchableOpacity onPress={() => setShowArrivalPicker(true)}>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={[styles.input, { paddingRight: 35 }]}
              editable={false}
              value={
                personalDetails.dateOfArrival
                  ? new Date(personalDetails.dateOfArrival).toLocaleDateString()
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
        {showArrivalPicker && (
          <DateTimePicker
            value={
              personalDetails.dateOfArrival
                ? new Date(personalDetails.dateOfArrival)
                : new Date()
            }
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(event, selectedDate) => {
              setShowArrivalPicker(false);
              if (selectedDate) {
                setPersonalDetails({
                  dateOfArrival: selectedDate.toISOString(),
                });
              }
            }}
          />
        )}
      </View>
    </View>
  );
};
