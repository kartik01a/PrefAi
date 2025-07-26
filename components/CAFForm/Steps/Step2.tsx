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
import { PartnerSpouse } from "../formData";
import { styles } from "./stepStyles";

interface Step2Props {
  partnerSpouse: PartnerSpouse;
  setPartnerSpouse: (data: Partial<PartnerSpouse>) => void;
}

export const Step2 = ({ partnerSpouse, setPartnerSpouse }: Step2Props) => {
  const [showDobPicker, setShowDobPicker] = useState(false);
  const [showArrivalPicker, setShowArrivalPicker] = useState(false);

  return (
    <View style={{ gap: 16 }}>
      <View style={styles.row}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>Title</Text>
          <RNPickerSelect
            onValueChange={(value) => setPartnerSpouse({ title: value })}
            value={partnerSpouse.title}
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
            value={partnerSpouse.firstName}
            onChangeText={(text) =>
              setPartnerSpouse({ firstName: text })
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
            value={partnerSpouse.userName}
            onChangeText={(text) =>
              setPartnerSpouse({ userName: text })
            }
          />
        </View>

        <View style={styles.inputHalf}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter last name"
            placeholderTextColor="#A0A0A0"
            value={partnerSpouse.lastName}
            onChangeText={(text) =>
              setPartnerSpouse({ lastName: text })
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
                  partnerSpouse.dob
                    ? new Date(partnerSpouse.dob).toLocaleDateString()
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
                partnerSpouse.dob
                  ? new Date(partnerSpouse.dob)
                  : new Date()
              }
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedDate) => {
                setShowDobPicker(false);
                if (selectedDate) {
                  setPartnerSpouse({
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
              setPartnerSpouse({ countryOfBirth: value })
            }
            value={partnerSpouse.countryOfBirth}
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
            setPartnerSpouse({ maritalStatus: value })
          }
          value={partnerSpouse.maritalStatus}
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
          value={partnerSpouse.socialSecurityNumber}
          onChangeText={(text) =>
            setPartnerSpouse({ socialSecurityNumber: text })
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
                partnerSpouse.dateOfArrival
                  ? new Date(partnerSpouse.dateOfArrival).toLocaleDateString()
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
              partnerSpouse.dateOfArrival
                ? new Date(partnerSpouse.dateOfArrival)
                : new Date()
            }
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(event, selectedDate) => {
              setShowArrivalPicker(false);
              if (selectedDate) {
                setPartnerSpouse({
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
