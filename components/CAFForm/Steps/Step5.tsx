import React from "react";
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { ParentsInformation } from "../formData";
import { styles } from "./stepStyles";

interface Step5Props {
  parentsInfo: ParentsInformation;
  setParentsInfo: (data: Partial<ParentsInformation>) => void;
}

export const Step5 = ({ parentsInfo, setParentsInfo }: Step5Props) => {
  return (
    <View style={{ gap: 16 }}>
      {/* Are your parents still receiving aid? */}
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>Are your parents still receiving aid on your behalf?</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.radioOption,
              parentsInfo.isReceivingAid === true && styles.radioOptionSelected,
            ]}
            onPress={() => setParentsInfo({ isReceivingAid: true })}
          >
            <Text style={styles.radioOptionText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radioOption,
              parentsInfo.isReceivingAid === false && styles.radioOptionSelected,
            ]}
            onPress={() => setParentsInfo({ isReceivingAid: false })}
          >
            <Text style={styles.radioOptionText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Parent's Full Name */}
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>Parent&apos;s Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter full name"
          value={parentsInfo.fullName}
          onChangeText={(text) => setParentsInfo({ fullName: text })}
        />
      </View>

      {/* Full Address */}
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>Full Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter full address"
          value={parentsInfo.fullAddress}
          onChangeText={(text) => setParentsInfo({ fullAddress: text })}
        />
      </View>

      {/* CAF Org & Beneficiary Number */}
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>CAF Organization & Beneficiary Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter CAF number"
          keyboardType="number-pad"
          value={parentsInfo.cafNumber}
          onChangeText={(text) => setParentsInfo({ cafNumber: text })}
        />
      </View>

      {/* Social Security Number */}
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>Social Security Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter SSN"
          keyboardType="number-pad"
          value={parentsInfo.socialSecurityNumber}
          onChangeText={(text) =>
            setParentsInfo({ socialSecurityNumber: text })
          }
        />
      </View>
    </View>
  );
};
