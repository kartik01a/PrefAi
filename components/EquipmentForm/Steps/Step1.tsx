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
        <View style={styles.inputContainerFull}>
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
      </View>
      <View style={styles.row}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>
            {"lastName"}{" "}
            <Text style={styles.smallLabel}>({t("inUppercase")})</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder={t("inputDetails")}
            value={applicantCandidate.lastNameUppercase}
            onChangeText={(text) =>
              setApplicantCandidate({ lastNameUppercase: text })
            }
          />
        </View>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>{t("firstName")}</Text>
          <TextInput
            style={styles.input}
            placeholder={t("inputDetails")}
            value={applicantCandidate.lastName}
            onChangeText={(text) => setApplicantCandidate({ lastName: text })}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.inputContainerFull}>
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
      </View>

      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>{t("currentEmployeeStatus")}</Text>
        <TextInput
          style={styles.input}
          placeholder={t("inputDetails")}
          value={applicantCandidate.employeeStatus}
          onChangeText={(text) =>
            setApplicantCandidate({ employeeStatus: text })
          }
        />
      </View>
    </View>
  );
};
