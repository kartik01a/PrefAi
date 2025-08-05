import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
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
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>{t("fullAddress")}</Text>
        <TextInput
          style={styles.input}
          placeholder={t("inputDetails")}
          value={contactInfo.fullAddress}
          onChangeText={(text) => setContactInfo({ fullAddress: text })}
        />
      </View>
      <View style={styles.row}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>{t("city")}</Text>
          <TextInput
            style={styles.input}
            placeholder={t("inputDetails")}
            value={contactInfo.city}
            onChangeText={(text) => setContactInfo({ city: text })}
          />
        </View>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>{t("postalCode")}</Text>
          <TextInput
            style={styles.input}
            placeholder={t("inputDetails")}
            value={contactInfo.postCode}
            onChangeText={(text) => setContactInfo({ postCode: text })}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>{t("phone")}</Text>
          <TextInput
            style={styles.input}
            placeholder={t("inputDetails")}
            keyboardType="phone-pad"
            value={contactInfo.phone}
            onChangeText={(text) => setContactInfo({ phone: text })}
          />
        </View>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>{t("email")}</Text>
          <TextInput
            style={styles.input}
            placeholder={t("inputDetails")}
            keyboardType="email-address"
            value={contactInfo.email}
            onChangeText={(text) => setContactInfo({ email: text })}
          />
        </View>
      </View>
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>{t("sinceWhenDoYouLiveAtThisAddress")}</Text>
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
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>{t("doYouLiveAsACouple")}?</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.radioOption,
              contactInfo.isCouple === true && styles.radioOptionSelected,
            ]}
            onPress={() => setContactInfo({ isCouple: true })}
          >
            <Text style={styles.radioOptionText}>{t("yes")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radioOption,
              contactInfo.isCouple === false && styles.radioOptionSelected,
            ]}
            onPress={() => setContactInfo({ isCouple: false })}
          >
            <Text style={styles.radioOptionText}>{t("yes")}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>{t("howManyChildrenDoYouHave")}?</Text>
        <TextInput
          style={styles.input}
          placeholder={t("inputDetails")}
          keyboardType="number-pad"
          value={contactInfo.numberOfChildren}
          onChangeText={(text) => setContactInfo({ numberOfChildren: text })}
        />
      </View>
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>{t("numberOfPeopleInTheHousehold")}</Text>
        <TextInput
          style={styles.input}
          placeholder={t("inputDetails")}
          keyboardType="number-pad"
          value={contactInfo.householdSize}
          onChangeText={(text) => setContactInfo({ householdSize: text })}
        />
      </View>
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>
          {t("ifPartnerLivesAbroadCountryAndSinceWhen")}?
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
