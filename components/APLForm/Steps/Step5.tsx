import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TextInput, View } from "react-native";
import { Budget } from "../formData";
import { styles } from "./stepStyles";

interface Step5Props {
  budget: Budget;
  setBudget: (data: Partial<Budget>) => void;
}

export const Step5 = ({ budget, setBudget }: Step5Props) => {
  const { t } = useTranslation();
  return (
    <View style={{ gap: 16 }}>
      <Text style={styles.heading}>{t("alpFormStep5Heading")}</Text>
      <Text style={styles.subHeading}>{t("budgetDetails")}</Text>
      <View style={styles.row}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>{t("shippingOfTheWorks")}</Text>
          <TextInput
            style={styles.input}
            placeholder={t("inputDetails")}
            value={budget.shippingOfTheWorks}
            onChangeText={(text) => setBudget({ shippingOfTheWorks: text })}
          />
        </View>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>{t("insurance")}</Text>
          <TextInput
            style={styles.input}
            placeholder={t("inputDetails")}
            value={budget.insurance}
            onChangeText={(text) => setBudget({ insurance: text })}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>{t("perDiemOdTheArtists")}</Text>
          <TextInput
            style={styles.input}
            placeholder={t("inputDetails")}
            value={budget.perDiemOfTheArtists}
            onChangeText={(text) => setBudget({ perDiemOfTheArtists: text })}
          />
        </View>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>{t("travel")}</Text>
          <TextInput
            style={styles.input}
            placeholder={t("inputDetails")}
            value={budget.travel}
            onChangeText={(text) => setBudget({ travel: text })}
          />
        </View>
      </View>

      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>{t("costsOfInstallingTheExhibitions")}</Text>
        <TextInput
          style={styles.input}
          placeholder={t("inputDetails")}
          value={budget.costsOfInstallingTheExchibition}
          onChangeText={(text) =>
            setBudget({ costsOfInstallingTheExchibition: text })
          }
        />
      </View>

      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>{t("other")}</Text>
        <TextInput
          style={styles.input}
          placeholder={t("inputDetails")}
          value={budget.other}
          onChangeText={(text) => setBudget({ other: text })}
        />
      </View>

      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>{t("total")}</Text>
        <TextInput
          style={styles.input}
          placeholder={t("inputDetails")}
          keyboardType="number-pad"
          value={budget.total}
          onChangeText={(text) => setBudget({ total: text })}
        />
      </View>
    </View>
  );
};
