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
import { ApplicantCandidate } from "../formData";
import { styles } from "./stepStyles";

interface Step1Props {
  applicantCandidate: ApplicantCandidate;
  setApplicantCandidate: (data: Partial<ApplicantCandidate>) => void;
}

export const Step1 = ({
  applicantCandidate,
  setApplicantCandidate,
}: Step1Props) => {
  const { t } = useTranslation();
  const [showDobPicker, setShowDobPicker] = useState(false);

  return (
    <View style={{ gap: 16 }}>
      <View style={styles.row}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>{t("cafBeneficiary")}</Text>
          <TextInput
            style={styles.input}
            placeholder={t("inputDetails")}
            placeholderTextColor="#A0A0A0"
            value={applicantCandidate.cafBeneficiary}
            onChangeText={(text) =>
              setApplicantCandidate({ cafBeneficiary: text })
            }
          />
        </View>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>{t("msaBeneficiary")}</Text>
          <TextInput
            style={styles.input}
            placeholder={t("inputDetails")}
            placeholderTextColor="#A0A0A0"
            value={applicantCandidate.msaBeneficiary}
            onChangeText={(text) =>
              setApplicantCandidate({ msaBeneficiary: text })
            }
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>{t("title")}</Text>
          <TextInput
            style={styles.input}
            placeholder={t("inputDetails")}
            value={applicantCandidate.title}
            onChangeText={(text) => setApplicantCandidate({ title: text })}
          />
        </View>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>{t("firstName")}</Text>
          <TextInput
            style={styles.input}
            placeholder={t("inputDetails")}
            value={applicantCandidate.firstName}
            onChangeText={(text) => setApplicantCandidate({ firstName: text })}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>{t("usedName")}</Text>
          <TextInput
            style={styles.input}
            placeholder={t("inputDetails")}
            value={applicantCandidate.usedName}
            onChangeText={(text) => setApplicantCandidate({ usedName: text })}
          />
        </View>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>{t("lastName")}</Text>
          <TextInput
            style={styles.input}
            placeholder={t("inputDetails")}
            value={applicantCandidate.lastName}
            onChangeText={(text) => setApplicantCandidate({ lastName: text })}
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
                value={
                  applicantCandidate.dateOfBirth
                    ? new Date(
                        applicantCandidate.dateOfBirth
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
                applicantCandidate.dateOfBirth
                  ? new Date(applicantCandidate.dateOfBirth)
                  : new Date()
              }
              onChange={(event, selectedDate) => {
                setShowDobPicker(false);
                if (selectedDate) {
                  setApplicantCandidate({
                    dateOfBirth: selectedDate.toISOString(),
                  });
                }
              }}
            />
          )}
        </View>

        <View style={styles.inputHalf}>
          <Text style={styles.label}>{t("countryOfBirth")}</Text>
          <TextInput
            style={styles.input}
            placeholder={t("inputDetails")}
            value={applicantCandidate.countryOfBirth}
            onChangeText={(text) =>
              setApplicantCandidate({ countryOfBirth: text })
            }
          />
        </View>
      </View>

      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>{t("maritalStatus")}</Text>
        <RNPickerSelect
          onValueChange={(value) =>
            setApplicantCandidate({ martialStatus: value })
          }
          value={applicantCandidate.martialStatus}
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

      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>{t("socialSecurityNumber")}</Text>
        <TextInput
          style={styles.input}
          placeholder={t("inputDetails")}
          keyboardType="number-pad"
          value={applicantCandidate.socialSecurityNumber}
          onChangeText={(text) =>
            setApplicantCandidate({ socialSecurityNumber: text })
          }
        />
      </View>

      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>{t("numberOfHouseholdMembers")}</Text>
        <TextInput
          style={styles.input}
          placeholder={t("inputDetails")}
          keyboardType="number-pad"
          value={applicantCandidate.numberOfHouseholdMembers}
          onChangeText={(text) =>
            setApplicantCandidate({ numberOfHouseholdMembers: text })
          }
        />
      </View>

      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>{t("fullAddress")}</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: "top" }]}
          placeholder={t("inputDetails")}
          multiline
          numberOfLines={4}
          value={applicantCandidate.fullAddress}
          onChangeText={(text) => setApplicantCandidate({ fullAddress: text })}
        />
      </View>
    </View>
  );
};
