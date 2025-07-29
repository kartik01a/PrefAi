import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  Text,
  TextInput,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { ApplicantCandidate } from "../formData";
import { styles } from "./stepStyles";

interface Step1Props {
  applicantCandidate: ApplicantCandidate;
  setApplicantCandidate: (data: Partial<ApplicantCandidate>) => void;
}

export const Step1 = ({ applicantCandidate, setApplicantCandidate }: Step1Props) => {
  return (
    <View style={{ gap: 16 }}>
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>Name of the Non-Profit Institution</Text>
        <RNPickerSelect
          onValueChange={(value) =>
            setApplicantCandidate({ nameOfTheNonProfitInstitution: value })
          }
          value={applicantCandidate.nameOfTheNonProfitInstitution}
          placeholder={{ label: "Select Institution", value: "" }}
          items={[
            { label: "Institution A", value: "Institution A" },
            { label: "Institution B", value: "Institution B" },
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
        <Text style={styles.label}>Name & Title of the Person in Charge</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name & title"
          placeholderTextColor="#A0A0A0"
          value={applicantCandidate.nameAndTitleOfThePersonInChargeOfTheProject}
          onChangeText={(text) =>
            setApplicantCandidate({
              nameAndTitleOfThePersonInChargeOfTheProject: text,
            })
          }
        />
      </View>

      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>Full Address</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: "top" }]}
          placeholder="Enter full address"
          placeholderTextColor="#A0A0A0"
          multiline
          numberOfLines={4}
          value={applicantCandidate.fullAddress}
          onChangeText={(text) =>
            setApplicantCandidate({ fullAddress: text })
          }
        />
      </View>

      <View style={styles.row}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>Telephone</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter telephone"
            placeholderTextColor="#A0A0A0"
            keyboardType="phone-pad"
            value={applicantCandidate.telephone}
            onChangeText={(text) =>
              setApplicantCandidate({ telephone: text })
            }
          />
        </View>

        <View style={styles.inputHalf}>
          <Text style={styles.label}>Fax</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter fax"
            placeholderTextColor="#A0A0A0"
            value={applicantCandidate.fax}
            onChangeText={(text) =>
              setApplicantCandidate({ fax: text })
            }
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            placeholderTextColor="#A0A0A0"
            keyboardType="email-address"
            autoCapitalize="none"
            value={applicantCandidate.Email}
            onChangeText={(text) =>
              setApplicantCandidate({ Email: text })
            }
          />
        </View>

        <View style={styles.inputHalf}>
          <Text style={styles.label}>Website</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter website"
            placeholderTextColor="#A0A0A0"
            autoCapitalize="none"
            value={applicantCandidate.website}
            onChangeText={(text) =>
              setApplicantCandidate({ website: text })
            }
          />
        </View>
      </View>
    </View>
  );
};
