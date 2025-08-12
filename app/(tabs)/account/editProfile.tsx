// File: app/account/editProfile.tsx

import BaseLayout from "@/components/BaseLayout";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useNavigation } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useUpdateUserMutation } from "@/app/auth/usersApiSlice";
import { AppDispatch, RootState } from "@/app/store";
import { UserInfo } from "@/features/auth/authSlice";
import { persistUser } from "@/utils/authLoader";
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
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state: RootState) => state.auth.userInfo);
  const { t } = useTranslation();
  const [updateUser] = useUpdateUserMutation();
  const dispatch = useDispatch<AppDispatch>();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [securityNumber, setSecurityNumber] = useState("");
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [dob, setDob] = useState(new Date());
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [showDobPicker, setShowDobPicker] = useState(false);
  const [showArrivalPicker, setShowArrivalPicker] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setUserName(user.userName || "");
      setSecurityNumber(user.passportNumber || "");
      setTitle(user.title || "");
      setCountry(user.country || "");
      setEmail(user.email || "");
      setMaritalStatus(user.maritalStatus || "");
      if (user.dob) setDob(new Date(user.dob));
      if (user.arrivalDate) setArrivalDate(new Date(user.arrivalDate));
    }
  }, [user]);

  const handleUpdate = async () => {
    try {
      await updateUser({
        id: user?._id || "",
        data: {
          firstName,
          lastName,
          userName,
          securityNumber,
          title,
          country,
          email,
          maritalStatus,
          dob: dob ? dob.toISOString() : "",
          arrivalDate: arrivalDate ? arrivalDate.toISOString() : "",
        },
      }).unwrap();
      const newUserInfo: UserInfo = {
        _id: user?._id ?? "", 
        role: user?.role ?? "USER",
        provider: user?.provider ?? "manual",
        email, 
        token: user?.token,
        refreshToken: user?.refreshToken,
        active: user?.active,
        blocked: user?.blocked,
        blockReason: user?.blockReason,
        facebookId: user?.facebookId,
        linkedinId: user?.linkedinId,
        image: user?.image,
        ...user,
        firstName,
        lastName,
        userName,
        securityNumber,
        title,
        country,
        maritalStatus,
        dob: dob ? dob.toISOString() : "",
        arrivalDate: arrivalDate ? arrivalDate.toISOString() : "",
      };

      await dispatch(
        persistUser({
          data: {
            accessToken: user?.token || "",
            refreshToken: user?.refreshToken || "",
            userInfo: newUserInfo,
          },
          success: true,
        })
      );
      Toast.show({
        type: "success",
        text1: "Profile updated successfully",
      });
    } catch (error) {
      console.error("Failed to update profile:", error);
      Toast.show({
        type: "error",
        text1: "Failed to update profile",
      });
    }
  };

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
          <Text style={styles.headerTitle}>{t("accountManagement")}</Text>
          <Text style={styles.headerSubtitle}>
            {t("account")} {">"} Edit Profile
          </Text>
          <View style={styles.profileRow}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
              }}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}></Text>
              <Text style={styles.profileLocation}></Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>{t("personalInformation")}</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.row}>
            <View style={styles.inputHalf}>
              <Text style={styles.label}>{t("title")}</Text>
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
              <Text style={styles.label}>{t("firstName")}</Text>
              <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                placeholder={t("inputDetails")}
                placeholderTextColor="#A0A0A0"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.inputHalf}>
              <Text style={styles.label}>{t("usedName")}(if applicable)</Text>
              <TextInput
                style={styles.input}
                value={userName}
                onChangeText={setUserName}
                placeholder="Mr/Mrs"
                placeholderTextColor="#A0A0A0"
              />
            </View>
            <View style={styles.inputHalf}>
              <Text style={styles.label}>{t("lastName")}</Text>
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
              <Text style={styles.label}>{t("dateOfBirth")}</Text>
              <TouchableOpacity onPress={() => setShowDobPicker(true)}>
                <View style={styles.inputWithIcon}>
                  <TextInput
                    style={[styles.input, { paddingRight: 35 }]}
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
              <Text style={styles.label}>{t("countryOfBirth")}</Text>
              <RNPickerSelect
                onValueChange={setCountry}
                value={country}
                items={[
                  { label: "Russia", value: "Russia" },
                  { label: "China", value: "China" },
                  { label: "Georgia", value: "Georgia" },
                  { label: "Portugal", value: "Portugal" },
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

          <Text style={styles.label}>{t("email")}</Text>

          {(() => {
            const defaultEmailOptions = [
              { label: "JohnDoe@gmail.com", value: "JohnDoe@gmail.com" },
              { label: "JDoe@hotmail.com", value: "JDoe@hotmail.com" },
              { label: "john.d@example.com", value: "john.d@example.com" },
            ];

            const emailOptions = email
              ? defaultEmailOptions.some((item) => item.value === email)
                ? defaultEmailOptions
                : [{ label: email, value: email }, ...defaultEmailOptions]
              : defaultEmailOptions;

            return (
              <RNPickerSelect
                onValueChange={setEmail}
                value={email}
                items={emailOptions}
                style={pickerSelectStyles}
                useNativeAndroidPickerStyle={false}
                placeholder={{ label: "Select your email", value: null }}
                Icon={() => (
                  <Ionicons
                    name="caret-down-outline"
                    size={20}
                    color="#A0A0A0"
                  />
                )}
              />
            );
          })()}

          <Text style={styles.label}>{t("maritalStatus")}</Text>
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
          <Text style={styles.label}>{t("socialSecurityNumber")}</Text>
          <TextInput
            style={styles.input}
            value={securityNumber}
            onChangeText={setSecurityNumber}
            placeholder="Enter SSN"
            placeholderTextColor="#A0A0A0"
          />

          {/* Date of Arrival in France */}
          <Text style={styles.label}>{t("dateOfArrivalInFrance")}</Text>
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

          <TouchableOpacity
            style={styles.autoFillButton}
            onPress={handleUpdate}
          >
            <Text style={styles.autoFillText}>
              {t("editProfile")}
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
