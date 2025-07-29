// File: app/account/editProfile.tsx

import BaseLayout from "@/components/BaseLayout";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";

import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [userName, setUserName] = useState("Herigen");
  const [securityNumber, setSecurityNumber] = useState("019239001229991");

  const [title, setTitle] = useState("Mr");
  const [country, setCountry] = useState("Spain");
  const [email, setEmail] = useState("JohnDoe@gmail.com");
  const [maritalStatus, setMaritalStatus] = useState("Married");
  const [dob, setDob] = useState(new Date());
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [showDobPicker, setShowDobPicker] = useState(false);
  const [showArrivalPicker, setShowArrivalPicker] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <BaseLayout>
      <View style={styles.container}>
        {/* Profile Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <MaterialCommunityIcons
              name="arrow-left-top"
              size={20}
              color="white"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Account Management</Text>
          <Text style={styles.headerSubtitle}>Account {">"} Edit Profile</Text>
          <View style={styles.profileRow}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
              }}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>John Doe</Text>
              <Text style={styles.profileLocation}>Spain Citizen</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Personal Information</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.row}>
            <View style={styles.inputHalf}>
              <Text style={styles.label}>Title</Text>
              <RNPickerSelect
                onValueChange={setTitle}
                value={title}
                items={[
                  { label: "Mr", value: "Mr" },
                  { label: "Mrs", value: "Mrs" },
                ]}
                style={pickerSelectStyles}
                useNativeAndroidPickerStyle={false}
                placeholder={{ label: "Select title", value: null }}
                Icon={() => (
                  <Ionicons
                    name="caret-down-outline"
                    size={20}
                    color="#A0A0A0"
                  />
                )}
              />
            </View>

            <View style={styles.inputHalf}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Enter your first name"
                placeholderTextColor="#A0A0A0"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.inputHalf}>
              <Text style={styles.label}>Used Name (if applicable)</Text>
              <TextInput
                style={styles.input}
                value={userName}
                onChangeText={setUserName}
                editable={false}
                placeholder="Mr/Mrs"
                placeholderTextColor="#A0A0A0"
              />
            </View>
            <View style={styles.inputHalf}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Enter your first name"
                placeholderTextColor="#A0A0A0"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.inputHalf}>
              <Text style={styles.label}>Date of Birth</Text>
              <TouchableOpacity onPress={() => setShowDobPicker(true)}>
                <View style={styles.inputWithIcon}>
                  <TextInput
                    style={[styles.input, { paddingRight: 35 }]} // paddingRight for icon
                    editable={false}
                    value={dob.toLocaleDateString()}
                    placeholder="DD/MM/YYYY"
                    placeholderTextColor="#A0A0A0"
                  />
                  <Ionicons
                    name="calendar-outline"
                    size={20}
                    color="#555"
                    style={styles.icon}
                  />
                </View>
              </TouchableOpacity>

              {showDobPicker && (
                <DateTimePicker
                  value={dob}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={(event, selectedDate) => {
                    setShowDobPicker(false);
                    if (selectedDate) setDob(selectedDate);
                  }}
                />
              )}
            </View>
            <View style={styles.inputHalf}>
              <Text style={styles.label}>Country of Birth</Text>
              <RNPickerSelect
                onValueChange={setCountry}
                value={country}
                items={[
                  { label: "France", value: "France" },
                  { label: "Spain", value: "Spain" },
                  { label: "Germany", value: "Germany" },
                  { label: "India", value: "India" },
                  { label: "Other", value: "Other" },
                ]}
                style={pickerSelectStyles}
                useNativeAndroidPickerStyle={false}
                placeholder={{ label: "Select country", value: null }}
                Icon={() => (
                  <Ionicons
                    name="caret-down-outline"
                    size={20}
                    color="#A0A0A0"
                  />
                )}
              />
            </View>
          </View>

          {/* Email Dropdown */}

          <Text style={styles.label}>Email</Text>
          <RNPickerSelect
            onValueChange={setEmail}
            value={email}
            items={[
              { label: "JohnDoe@gmail.com", value: "JohnDoe@gmail.com" },
              { label: "JDoe@hotmail.com", value: "JDoe@hotmail.com" },
              { label: "john.d@example.com", value: "john.d@example.com" },
            ]}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            placeholder={{ label: "Select your email", value: null }}
            Icon={() => (
              <Ionicons name="caret-down-outline" size={20} color="#A0A0A0" />
            )}
          />

          <Text style={styles.label}>Marital Status</Text>
          <RNPickerSelect
            onValueChange={setMaritalStatus}
            value={maritalStatus}
            items={[
              { label: "Married", value: "Married" },
              { label: "Unmarried", value: "Unmarried" },
            ]}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            placeholder={{ label: "Select marital status", value: null }}
            Icon={() => (
              <Ionicons name="caret-down-outline" size={20} color="#A0A0A0" />
            )}
          />

          {/* Social Security Number */}
          <Text style={styles.label}>Social Security Number</Text>
          <TextInput
            style={styles.input}
            value={securityNumber}
            onChangeText={setSecurityNumber}
            placeholder="Enter SSN"
            placeholderTextColor="#A0A0A0"
          />

          {/* Date of Arrival in France */}
          <Text style={styles.label}>Date of Arrival in France</Text>
          <TouchableOpacity onPress={() => setShowArrivalPicker(true)}>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={[styles.input, { paddingRight: 35 }]}
                editable={false}
                value={arrivalDate.toLocaleDateString()}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#A0A0A0"
              />
              <Ionicons
                name="calendar-outline"
                size={20}
                color="#555"
                style={styles.icon}
              />
            </View>
          </TouchableOpacity>

          {showArrivalPicker && (
            <DateTimePicker
              value={arrivalDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedDate) => {
                setShowArrivalPicker(false);
                if (selectedDate) setArrivalDate(selectedDate);
              }}
            />
          )}

          <TouchableOpacity style={styles.autoFillButton}>
            <Text style={styles.autoFillText}>
              Auto fill data from CAF Form
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginRight: 16,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 24,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    color: "white",
  },
  headerSubtitle: {
    fontSize: 10,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    color: "white",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    color: "white",
    marginTop: 20,
  },
  content: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 5,
    paddingHorizontal: 24,
  },
  label: {
    color: "#2479CF",
    fontSize: 12,
    fontFamily: "Poppins-SemiBold",
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "#2479CF",
    marginTop: 6,
    backgroundColor: "#F2F2F2",
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  profileInfo: {
    flexDirection: "column",
  },
  profileName: {
    fontFamily: "Poppins-SemiBold",
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 2,
    color: "#FFFFFF",
  },
  profileLocation: {
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    gap: 8,
  },
  inputHalf: {
    flex: 1,
  },
  dropdownHalf: {
    flex: 0.6,
  },
  autoFillButton: {
    backgroundColor: "#2479CF",
    borderRadius: 10,
    marginTop: 25,
    marginBottom: 20,
    paddingVertical: 14,
    alignItems: "center",
  },
  autoFillText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },

  inputWithIcon: {
    position: "relative",
    justifyContent: "center",
  },

  icon: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -10 }],
  },
});

const pickerSelectStyles = {
  inputIOS: {
    ...styles.input,
    paddingRight: 30,
  },
  inputAndroid: {
    ...styles.input,
    paddingRight: 30,
  },
  iconContainer: {
    top: 15,
    right: 10,
  },
};

export default EditProfileScreen;
