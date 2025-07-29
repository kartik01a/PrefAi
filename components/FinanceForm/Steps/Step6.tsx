import React from "react";
import { Text, TextInput, View } from "react-native";
import { ContractAgreement } from "../formData";
import { styles } from "./stepStyles";

interface Step6Props {
  contractAgreement: ContractAgreement;
  setContractAgreement: (data: Partial<ContractAgreement>) => void;
}

export const Step6 = ({
  contractAgreement,
  setContractAgreement,
}: Step6Props) => {
  return (
    <View style={{ gap: 16 }}>
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>
          Name and Title of the Person Qualified to Sign a Grant Agreement with FACE
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name and title"
          value={
            contractAgreement.nameAndTittleOfThePersonQualifiedToSignAGrantAgreementWithFace
          }
          onChangeText={(text) =>
            setContractAgreement({
              nameAndTittleOfThePersonQualifiedToSignAGrantAgreementWithFace: text,
            })
          }
        />
      </View>

      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>Grants Payable To</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter payee name"
          value={contractAgreement.grantsPayableTo}
          onChangeText={(text) =>
            setContractAgreement({ grantsPayableTo: text })
          }
        />
      </View>
    </View>
  );
};
