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
  const [showDobPicker, setShowDobPicker] = useState(false);

  return (
    <View style={{ gap: 16 }}>
      <View style={styles.row}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>CAF Beneficiary</Text>
          <TextInput
            style={styles.input}
            placeholder="CAF"
            placeholderTextColor="#A0A0A0"
            value={applicantCandidate.cafBeneficiary}
            onChangeText={(text) =>
              setApplicantCandidate({ cafBeneficiary: text })
            }
          />
        </View>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>MSA Beneficiary</Text>
          <TextInput
            style={styles.input}
            placeholder="MSA"
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
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter title"
            value={applicantCandidate.title}
            onChangeText={(text) => setApplicantCandidate({ title: text })}
          />
        </View>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter first name"
            value={applicantCandidate.firstName}
            onChangeText={(text) => setApplicantCandidate({ firstName: text })}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>Used Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter used name"
            value={applicantCandidate.usedName}
            onChangeText={(text) => setApplicantCandidate({ usedName: text })}
          />
        </View>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter last name"
            value={applicantCandidate.lastName}
            onChangeText={(text) => setApplicantCandidate({ lastName: text })}
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
          <Text style={styles.label}>Country of Birth</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter country"
            value={applicantCandidate.countryOfBirth}
            onChangeText={(text) =>
              setApplicantCandidate({ countryOfBirth: text })
            }
          />
        </View>
      </View>

      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>Marital Status</Text>
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
        <Text style={styles.label}>Social Security Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter number"
          keyboardType="number-pad"
          value={applicantCandidate.socialSecurityNumber}
          onChangeText={(text) =>
            setApplicantCandidate({ socialSecurityNumber: text })
          }
        />
      </View>

      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>Number of Household Members</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter number"
          keyboardType="number-pad"
          value={applicantCandidate.numberOfHouseholdMembers}
          onChangeText={(text) =>
            setApplicantCandidate({ numberOfHouseholdMembers: text })
          }
        />
      </View>

      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>Full Address</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: "top" }]}
          placeholder="Enter full address"
          multiline
          numberOfLines={4}
          value={applicantCandidate.fullAddress}
          onChangeText={(text) => setApplicantCandidate({ fullAddress: text })}
        />
      </View>
    </View>
  );
};
