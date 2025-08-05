import React from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  return (
    <View style={{ gap: 16 }}>
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>{t("alpFormStep5Heading")}</Text>
        <TextInput
          style={styles.input}
          placeholder={t("inputDetails")}
          value={
            contractAgreement.nameAndTittleOfThePersonQualifiedToSignAGrantAgreementWithFace
          }
          onChangeText={(text) =>
            setContractAgreement({
              nameAndTittleOfThePersonQualifiedToSignAGrantAgreementWithFace:
                text,
            })
          }
        />
      </View>

      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>{t("grantsPaylableTo")}</Text>
        <TextInput
          style={styles.input}
          placeholder={t("inputDetails")}
          value={contractAgreement.grantsPayableTo}
          onChangeText={(text) =>
            setContractAgreement({ grantsPayableTo: text })
          }
        />
      </View>
    </View>
  );
};
