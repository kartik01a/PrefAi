import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { MsaRegistration } from "../formData";
import { styles } from "./stepStyles";

interface Step3Props {
  msaRegistration: MsaRegistration;
  setMsaRegistration: (data: Partial<MsaRegistration>) => void;
}


export const Step3 = ({ msaRegistration, setMsaRegistration }: Step3Props) => {
  return (
    <View style={{ gap: 16 }}>
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>
          Have you or your spouse been previously registered in CAF/MSA in the last 2 years?
        </Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.inputHalf,
              msaRegistration.isPreviouslyRegistered === true && {
                borderColor: "#2479CF",
                borderWidth: 1,
              },
            ]}
            onPress={() => setMsaRegistration({ isPreviouslyRegistered: true })}
          >
            <Text style={styles.input}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.inputHalf,
              msaRegistration.isPreviouslyRegistered === false && {
                borderColor: "#2479CF",
                borderWidth: 1,
              },
            ]}
            onPress={() => setMsaRegistration({ isPreviouslyRegistered: false })}
          >
            <Text style={styles.input}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>Name of the organization</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter organization name"
          placeholderTextColor="#A0A0A0"
          value={msaRegistration.organizationName}
          onChangeText={(text) =>
            setMsaRegistration({ organizationName: text })
          }
        />
      </View>
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>Country</Text>
        <RNPickerSelect
          onValueChange={(value) =>
            setMsaRegistration({ organizationCountry: value })
          }
          value={msaRegistration.organizationCountry}
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
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>Beneficiary Number or Dossier Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter number"
          placeholderTextColor="#A0A0A0"
          value={msaRegistration.beneficiaryNumber}
          onChangeText={(text) =>
            setMsaRegistration({ beneficiaryNumber: text })
          }
        />
      </View>
    </View>
  );
};
