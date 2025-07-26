import BaseLayout from "@/components/BaseLayout";
import { getInitialFormData, isStepValid } from "@/components/CAFForm/formData";
import { Step1 } from "@/components/CAFForm/Steps/Step1";
import { Step2 } from "@/components/CAFForm/Steps/Step2";
import { Step3 } from "@/components/CAFForm/Steps/Step3";
import { Step4 } from "@/components/CAFForm/Steps/Step4";
import { Step5 } from "@/components/CAFForm/Steps/Step5";
import { Step6 } from "@/components/CAFForm/Steps/Step6";
import { Step7 } from "@/components/CAFForm/Steps/Step7";
import { Step8 } from "@/components/CAFForm/Steps/Step8";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CEFDeclarationForm = () => {
  const navigation = useNavigation();
  const [activeStep, setActiveStep] = useState(1);
  const steps = Array.from({ length: 8 }, (_, i) => i + 1);

  const [formData, setFormData] = useState(() => getInitialFormData());
  const isCurrentStepValid = isStepValid(activeStep, formData);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const handleContinue = () => {
    if (activeStep < steps.length) {
      setActiveStep(activeStep + 1);
    } else {
      console.log("Submitting form data:", formData);
    }
  };

  const renderStepForm = () => {
    if (activeStep === 1) {
      return (
        <Step1
          personalDetails={formData.personalDetails}
          setPersonalDetails={(updatedDetails) =>
            setFormData((prev) => ({
              ...prev,
              personalDetails: {
                ...prev.personalDetails,
                ...updatedDetails,
              },
            }))
          }
        />
      );
    }

    if (activeStep === 2) {
      return (
        <Step2
          partnerSpouse={formData.partnerSpouse}
          setPartnerSpouse={(updatedDetails) =>
            setFormData((prev) => ({
              ...prev,
              partnerSpouse: {
                ...prev.partnerSpouse,
                ...updatedDetails,
              },
            }))
          }
        />
      );
    }

    if (activeStep === 3) {
      return (
        <Step3
          msaRegistration={formData.msaRegistration}
          setMsaRegistration={(updatedDetails) =>
            setFormData((prev) => ({
              ...prev,
              msaRegistration: {
                ...prev.msaRegistration,
                ...updatedDetails,
              },
            }))
          }
        />
      );
    }

    if (activeStep === 4) {
      return (
        <Step4
          contactInfo={formData.contactInformation}
          setContactInfo={(updatedDetails) =>
            setFormData((prev) => ({
              ...prev,
              contactInformation: {
                ...prev.contactInformation,
                ...updatedDetails,
              },
            }))
          }
        />
      );
    }

    if (activeStep === 5) {
      return (
        <Step5
          parentsInfo={formData.parentsInformation}
          setParentsInfo={(updatedDetails) =>
            setFormData((prev) => ({
              ...prev,
              parentsInformation: {
                ...prev.parentsInformation,
                ...updatedDetails,
              },
            }))
          }
        />
      );
    }
    if (activeStep === 6) {
      return (
        <Step6
          employment={formData.employmentSituation}
          setEmployment={(updatedDetails) =>
            setFormData((prev) => ({
              ...prev,
              employmentSituation: {
                ...prev.employmentSituation,
                ...updatedDetails,
              },
            }))
          }
        />
      );
    }
    if (activeStep === 7) {
      return (
        <Step7
          declaration={formData.declaration}
          setDeclaration={(updatedDetails) =>
            setFormData((prev) => ({
              ...prev,
              declaration: {
                ...prev.declaration,
                ...updatedDetails,
              },
            }))
          }
        />
      );
    }
    if (activeStep === 8) {
      return <Step8 />;
    }

    return <Text>{`Step ${activeStep} form goes here.`}</Text>;
  };

  const getStepSubtitle = (step: number): string => {
    switch (step) {
      case 1:
        return "Personal Information – Applicant";
      case 2:
        return "Personal Information – Partner / Spouse";
      case 3:
        return "Previous CAF / MSA Registration";
      case 4:
        return "Contact Information & Family Status";
      case 5:
        return "Parents’ Information (if applicant <25 years old)";
      case 6:
        return "Employment Situation";
      case 7:
        return "Review and Signature";
      case 8:
        return "Generate PDF and Download/Send";
      default:
        return "Generate PDF and Download/Send";
    }
  };

  return (
    <BaseLayout>
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <View style={styles.container}>
              <View style={styles.header}>
                <TouchableOpacity
                  onPress={() => router.back()}
                  accessibilityLabel="Go back"
                  accessibilityRole="button"
                >
                  <MaterialCommunityIcons
                    name="arrow-left-top"
                    size={20}
                    color="white"
                  />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>
                  CAF Declaration of Situation – Housing & Family Benefits
                </Text>
              </View>

              <View style={styles.stepperContainer}>
                <View style={styles.stepsRow}>
                  {steps.map((number, index) => (
                    <React.Fragment key={`step-${number}`}>
                      <View
                        style={[
                          styles.stepCircle,
                          number === activeStep
                            ? styles.activeStep
                            : styles.inactiveStep,
                        ]}
                      >
                        <Text
                          style={[
                            styles.stepNumber,
                            number === activeStep
                              ? styles.activeStepText
                              : styles.inactiveStepText,
                          ]}
                        >
                          {`${number}`}
                        </Text>
                      </View>
                      {index !== steps.length - 1 && (
                        <View style={styles.stepLine} />
                      )}
                    </React.Fragment>
                  ))}
                </View>

                <View style={styles.stepTextContainer}>
                  <Text
                    style={styles.stepTextTitle}
                  >{`Step ${activeStep}`}</Text>
                  <Text style={styles.stepTextSubtitle}>
                    {getStepSubtitle(activeStep)}
                  </Text>
                </View>
              </View>

              <View style={styles.contentWrapper}>
                <View style={styles.contentInner}>
                  {renderStepForm()}

                  {activeStep !== 8 && (
                    <TouchableOpacity
                      style={[
                        styles.continueButton,
                        !isCurrentStepValid && styles.continueButtonDisabled,
                      ]}
                      onPress={handleContinue}
                      disabled={!isCurrentStepValid}
                    >
                      <Text
                        style={[
                          styles.continueButtonText,
                          !isCurrentStepValid &&
                            styles.continueButtonTextDisabled,
                        ]}
                      >
                        Continue
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 50 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 4,
    gap: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "white",
  },
  stepperContainer: {
    marginTop: 12,
    paddingHorizontal: 24,
    width: "100%",
  },
  stepsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  stepLine: {
    height: 2,
    width: 16,
    backgroundColor: "#B0BEC5",
  },
  activeStep: { backgroundColor: "white" },
  inactiveStep: { backgroundColor: "#B0BEC5" },
  stepNumber: {
    fontSize: 12,
    fontFamily: "Poppins-SemiBold",
  },
  activeStepText: { color: "#2479CF" },
  inactiveStepText: { color: "white" },
  stepTextContainer: {
    marginTop: 8,
    alignItems: "flex-start",
    marginBottom: 10,
  },
  stepTextTitle: {
    fontSize: 12,
    color: "white",
    fontFamily: "Poppins-Medium",
  },
  stepTextSubtitle: {
    fontSize: 12,
    color: "white",
    fontFamily: "Poppins-Regular",
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  contentInner: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  continueButton: {
    backgroundColor: "#2479CF",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  continueButtonDisabled: {
    backgroundColor: "#fff",
    borderColor: "#8C8888",
    borderWidth: 1,
  },
  continueButtonText: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#fff",
  },
  continueButtonTextDisabled: {
    color: "#8C8888",
  },
});

export default CEFDeclarationForm;
