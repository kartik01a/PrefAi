import React from "react";
import { Text, TextInput, View } from "react-native";
import { ContactDetails } from "../formData";
import { styles } from "./stepStyles";
import { useTranslation } from "react-i18next";

interface Step2Props {
  contactDetails: ContactDetails;
  setContactDetails: (data: Partial<ContactDetails>) => void;
}

export const Step2 = ({ contactDetails, setContactDetails }: Step2Props) => {
  const { t } = useTranslation();
  return (
    <View style={{ gap: 16 }}>
      <View style={styles.row}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>{t('streetNumber')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t("inputDetails")}
            keyboardType="number-pad"
            value={contactDetails.streetNumber}
            onChangeText={(text) => setContactDetails({ streetNumber: text })}
          />
        </View>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>{t('streetName')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t("inputDetails")}
            value={contactDetails.streetName}
            onChangeText={(text) => setContactDetails({ streetName: text })}
          />
        </View>
      </View>
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>{t('fullAddress')}</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: "top" }]}
          placeholder={t("inputDetails")}
          placeholderTextColor="#A0A0A0"
          multiline
          numberOfLines={4}
          value={contactDetails.fullAddress}
          onChangeText={(text) => setContactDetails({ fullAddress: text })}
        />
      </View>
      <View style={styles.row}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>{t('postalCode')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t("inputDetails")}
            keyboardType="number-pad"
            value={contactDetails.postalCode}
            onChangeText={(text) => setContactDetails({ postalCode: text })}
          />
        </View>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>{t('city')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t("inputDetails")}
            value={contactDetails.city}
            onChangeText={(text) => setContactDetails({ city: text })}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>{t('phoneNumber')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t("inputDetails")}
            keyboardType="number-pad"
            value={contactDetails.phoneNumber}
            onChangeText={(text) => setContactDetails({ phoneNumber: text })}
          />
        </View>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>{t('email')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t("inputDetails")}
            value={contactDetails.email}
            onChangeText={(text) => setContactDetails({ email: text })}
          />
        </View>
      </View>
    </View>
  );
};
