import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TextInput, View } from "react-native";
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
  const { t } = useTranslation();
  return (
    <View style={{ gap: 12 }}>
      <View style={styles.inputContainerFull}>
        <Text style={styles.label}>{t("nameOfNonProfitInstitution")}</Text>
        <RNPickerSelect
          onValueChange={(value) =>
            setApplicantCandidate({ nameOfTheNonProfitInstitution: value })
          }
          value={applicantCandidate.nameOfTheNonProfitInstitution}
          placeholder={{ label: t('inputDetails'), value: "" }}
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
        <Text style={styles.label}>{t('nameAndTtitleOfThePersonInCharge')}</Text>
        <TextInput
          style={styles.input}
          placeholder={t('inputDetails')}
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
        <Text style={styles.label}>{t('fullAddress')}</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: "top" }]}
          placeholder={t('inputDetails')}
          placeholderTextColor="#A0A0A0"
          multiline
          numberOfLines={4}
          value={applicantCandidate.fullAddress}
          onChangeText={(text) => setApplicantCandidate({ fullAddress: text })}
        />
      </View>

      <View style={styles.row}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>{t('telephone')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t('inputDetails')}
            placeholderTextColor="#A0A0A0"
            keyboardType="phone-pad"
            value={applicantCandidate.telephone}
            onChangeText={(text) => setApplicantCandidate({ telephone: text })}
          />
        </View>

        <View style={styles.inputHalf}>
          <Text style={styles.label}>{t('fax')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t('inputDetails')}
            placeholderTextColor="#A0A0A0"
            value={applicantCandidate.fax}
            onChangeText={(text) => setApplicantCandidate({ fax: text })}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>{t('email')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t('inputDetails')}
            placeholderTextColor="#A0A0A0"
            keyboardType="email-address"
            autoCapitalize="none"
            value={applicantCandidate.Email}
            onChangeText={(text) => setApplicantCandidate({ Email: text })}
          />
        </View>

        <View style={styles.inputHalf}>
          <Text style={styles.label}>{t('website')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t('inputDetails')}
            placeholderTextColor="#A0A0A0"
            autoCapitalize="none"
            value={applicantCandidate.website}
            onChangeText={(text) => setApplicantCandidate({ website: text })}
          />
        </View>
      </View>
    </View>
  );
};
