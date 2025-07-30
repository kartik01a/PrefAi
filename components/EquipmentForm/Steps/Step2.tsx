import React from "react";
import { Text, TextInput, View } from "react-native";
import { ContactDetails } from "../formData";
import { styles } from "./stepStyles";

interface Step2Props {
  contactDetails: ContactDetails;
  setContactDetails: (data: Partial<ContactDetails>) => void;
}

export const Step2 = ({ contactDetails, setContactDetails }: Step2Props) => {
  return (
    <View style={{ gap: 16 }}>
      <View style={styles.row}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>Street Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Input details"
            keyboardType="number-pad"
            value={contactDetails.streetNumber}
            onChangeText={(text) => setContactDetails({ streetNumber: text })}
          />
        </View>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>Street Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Input details"
            value={contactDetails.streetName}
            onChangeText={(text) => setContactDetails({ streetName: text })}
          />
        </View>
      </View>
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>Full Address</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: "top" }]}
          placeholder="Enter full address"
          placeholderTextColor="#A0A0A0"
          multiline
          numberOfLines={4}
          value={contactDetails.fullAddress}
          onChangeText={(text) => setContactDetails({ fullAddress: text })}
        />
      </View>
      <View style={styles.row}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>Postal</Text>
          <TextInput
            style={styles.input}
            placeholder="Input details"
            keyboardType="number-pad"
            value={contactDetails.postalCode}
            onChangeText={(text) => setContactDetails({ postalCode: text })}
          />
        </View>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            placeholder="Input details"
            value={contactDetails.city}
            onChangeText={(text) => setContactDetails({ city: text })}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Input details"
            keyboardType="number-pad"
            value={contactDetails.phoneNumber}
            onChangeText={(text) => setContactDetails({ phoneNumber: text })}
          />
        </View>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Input details"
            value={contactDetails.email}
            onChangeText={(text) => setContactDetails({ email: text })}
          />
        </View>
      </View>
    </View>
  );
};
