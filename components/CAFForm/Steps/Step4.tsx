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
import { ContactInformation } from "../formData";
import { styles } from "./stepStyles";

interface Step4Props {
  contactInfo: ContactInformation;
  setContactInfo: (data: Partial<ContactInformation>) => void;
}

export const Step4 = ({ contactInfo, setContactInfo }: Step4Props) => {
  const [showAddressSincePicker, setShowAddressSincePicker] = useState(false);
  const [showPartnerSincePicker, setShowPartnerSincePicker] = useState(false);

  const handleDateChange = (
    key: keyof ContactInformation,
    event: any,
    selectedDate?: Date
  ) => {
    if (selectedDate) {
      const formatted = selectedDate.toISOString().split("T")[0];
      setContactInfo({ [key]: formatted });
    }
  };

  return (
    <View style={{ gap: 16 }}>
      {/* Full Address */}
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>Full Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter full address"
          value={contactInfo.fullAddress}
          onChangeText={(text) => setContactInfo({ fullAddress: text })}
        />
      </View>

      {/* City & Post Code */}
      <View style={styles.row}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            placeholder="City"
            value={contactInfo.city}
            onChangeText={(text) => setContactInfo({ city: text })}
          />
        </View>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>Post Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Post Code"
            value={contactInfo.postCode}
            onChangeText={(text) => setContactInfo({ postCode: text })}
          />
        </View>
      </View>

      {/* Phone & Email */}
      <View style={styles.row}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone"
            keyboardType="phone-pad"
            value={contactInfo.phone}
            onChangeText={(text) => setContactInfo({ phone: text })}
          />
        </View>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={contactInfo.email}
            onChangeText={(text) => setContactInfo({ email: text })}
          />
        </View>
      </View>

      {/* Since when do you live at this address? */}
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>Since when do you live at this address?</Text>
        <TouchableOpacity
          style={[
            styles.datePickerTouchable,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            },
          ]}
          onPress={() => setShowAddressSincePicker(true)}
        >
          <Text style={styles.datePickerText}>
            {contactInfo.addressSince || "Select Date"}
          </Text>
          <MaterialCommunityIcons
            name="calendar-month-outline"
            size={20}
            color="#555"
          />
        </TouchableOpacity>
        {showAddressSincePicker && (
          <DateTimePicker
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            value={
              contactInfo.addressSince
                ? new Date(contactInfo.addressSince)
                : new Date()
            }
            onChange={(e, date) => {
              setShowAddressSincePicker(Platform.OS === "ios");
              handleDateChange("addressSince", e, date);
            }}
          />
        )}
      </View>

      {/* Do you live as a couple? */}
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>Do you live as a couple?</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.radioOption,
              contactInfo.isCouple === true && styles.radioOptionSelected,
            ]}
            onPress={() => setContactInfo({ isCouple: true })}
          >
            <Text style={styles.radioOptionText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radioOption,
              contactInfo.isCouple === false && styles.radioOptionSelected,
            ]}
            onPress={() => setContactInfo({ isCouple: false })}
          >
            <Text style={styles.radioOptionText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Children Count */}
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>How many children do you have?</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter number"
          keyboardType="number-pad"
          value={contactInfo.numberOfChildren}
          onChangeText={(text) => setContactInfo({ numberOfChildren: text })}
        />
      </View>

      {/* Household Size */}
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>Number of people in the household</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter number"
          keyboardType="number-pad"
          value={contactInfo.householdSize}
          onChangeText={(text) => setContactInfo({ householdSize: text })}
        />
      </View>

      {/* Partner Abroad: Country and Date */}
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>
          If partner lives abroad: Country and Since when?
        </Text>
        <View style={styles.row}>
          <View style={styles.inputHalf}>
            <RNPickerSelect
              onValueChange={(value) =>
                setContactInfo({ partnerAbroadCountry: value })
              }
              value={contactInfo.partnerAbroadCountry}
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
          <View style={styles.inputHalf}>
            <TouchableOpacity
              style={[
                styles.datePickerTouchable,
                {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                },
              ]}
              onPress={() => setShowPartnerSincePicker(true)}
            >
              <Text style={styles.datePickerText}>
                {contactInfo.partnerAbroadSince || "Select Date"}
              </Text>
              <MaterialCommunityIcons
                name="calendar-month-outline"
                size={20}
                color="#555"
              />
            </TouchableOpacity>
            {showPartnerSincePicker && (
              <DateTimePicker
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                value={
                  contactInfo.partnerAbroadSince
                    ? new Date(contactInfo.partnerAbroadSince)
                    : new Date()
                }
                onChange={(e, date) => {
                  setShowPartnerSincePicker(Platform.OS === "ios");
                  handleDateChange("partnerAbroadSince", e, date);
                }}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};
