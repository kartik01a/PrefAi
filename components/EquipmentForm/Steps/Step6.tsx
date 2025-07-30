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
import { Declaration } from "../formData";
import { styles } from "./stepStyles";

interface Step7Props {
  declaration: Declaration;
  setDeclaration: (data: Partial<Declaration>) => void;
}

export const Step6 = ({ declaration, setDeclaration }: Step7Props) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      const formatted = selectedDate.toISOString().split("T")[0];
      setDeclaration({ dateOfSignature: formatted });
    }
    setShowDatePicker(Platform.OS === "ios");
  };

  return (
    <View style={{ gap: 16 }}>
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>Place of Signature</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter place of signature"
          value={declaration.placeOfSignature}
          onChangeText={(text) => setDeclaration({ placeOfSignature: text })}
        />
      </View>

      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>Date of Signature</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={[styles.input, { paddingRight: 35 }]}
              editable={false}
              value={
                declaration.dateOfSignature
                  ? new Date(declaration.dateOfSignature).toLocaleDateString()
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

        {showDatePicker && (
          <DateTimePicker
            value={
              declaration.dateOfSignature
                ? new Date(declaration.dateOfSignature)
                : new Date()
            }
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setDeclaration({
                  dateOfSignature: selectedDate.toISOString(),
                });
              }
            }}
          />
        )}
      </View>

      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>Signature</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: "top" }]}
          multiline
          placeholder="Type your signature"
          value={declaration.signature}
          onChangeText={(text) => setDeclaration({ signature: text })}
        />
      </View>

      <View style={styles.dividerWithText}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.dividerLine} />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setDeclaration({ signature: "Signed electronically" })}
      >
        <Text style={styles.buttonText}>Use Auto Sign</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.checkboxCustom}
        onPress={() =>
          setDeclaration({
            declarationAccepted: !declaration.declarationAccepted,
          })
        }
      >
        <MaterialCommunityIcons
          name={
            declaration.declarationAccepted
              ? "checkbox-marked"
              : "checkbox-blank-outline"
          }
          size={24}
          color={declaration.declarationAccepted ? "#007AFF" : "#888"}
        />
        <Text style={styles.checkboxLabel}>
          I certify on my honor that this information is true and complete
        </Text>
      </TouchableOpacity>
    </View>
  );
};
