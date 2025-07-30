import { getInitialFormData, isStepValid } from "@/components/APLForm/formData";
import { Step1 } from "@/components/APLForm/Steps/Step1";
import { Step2 } from "@/components/APLForm/Steps/Step2";
import { Step3 } from "@/components/APLForm/Steps/Step3";
import { Step4 } from "@/components/APLForm/Steps/Step4";
import { Step5 } from "@/components/APLForm/Steps/Step5";
import { Step6 } from "@/components/APLForm/Steps/Step6";
import { Step7 } from "@/components/APLForm/Steps/Step7";
import { Step8 } from "@/components/APLForm/Steps/Step8";
import BaseLayout from "@/components/BaseLayout";
import { saveToDownloads } from "@/components/PDF/DownloadPdf";
import { handleFormToPDF } from "@/components/PDF/ExportPdf";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import {
  Alert,
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

  const exportToPDF = async () => {
    try {
      await handleFormToPDF(formData);
      Alert.alert("Success", "PDF generated successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to generate PDF. Please try again.");
    }
  };
  const downloadPDF = async () => {
    console.log(formData, "formData");
    try {
      await saveToDownloads(formData);
      Alert.alert("Success", "PDF downloaded successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to download PDF. Please try again.");
    }
  };

  const renderStepForm = () => {
    if (activeStep === 1) {
      return (
        <Step1
          applicantCandidate={formData.applicantCandidate}
          setApplicantCandidate={(updatedDetails) =>
            setFormData((prev) => ({
              ...prev,
              applicantCandidate: {
                ...prev.applicantCandidate,
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
          instituteType={formData.instituteType}
          setInstituteType={(updatedDetails) =>
            setFormData((prev) => ({
              ...prev,
              instituteType: {
                ...prev.instituteType,
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
          projectCategories={formData.projectCategories}
          setProjectCategories={(updatedDetails) =>
            setFormData((prev) => ({
              ...prev,
              projectCategories: {
                ...prev.projectCategories,
                ...updatedDetails,
              },
            }))
          }
        />
      );
    }

    if (activeStep === 4) {
      return <Step4 />;
    }

    if (activeStep === 5) {
      return (
        <Step5
          budget={formData.budget}
          setBudget={(updatedDetails) =>
            setFormData((prev) => ({
              ...prev,
              budget: {
                ...prev.budget,
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
          contractAgreement={formData.contractAgreement}
          setContractAgreement={(updatedDetails) =>
            setFormData((prev) => ({
              ...prev,
              contractAgreement: {
                ...prev.contractAgreement,
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
      return <Step8 exportToPDF={exportToPDF} downloadPDF={downloadPDF} />;
    }

    return <Text>{`Step ${activeStep} form goes here.`}</Text>;
  };

  const getStepSubtitle = (step: number): string => {
    switch (step) {
      case 1:
        return "Applicant Candidate";
      case 2:
        return "Institution Types";
      case 3:
        return "Project Categories";
      case 4:
        return " Summary of Project";
      case 5:
        return "Budget";
      case 6:
        return "Contract Agreement";
      case 7:
        return "Review and Signature";
      case 8:
        return "Generate PDF and Download/Send";
      default:
        return "default form";
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
                  onPress={() => {
                    if (activeStep > 1) {
                      setActiveStep((prev) => prev - 1);
                    } else {
                      router.back();
                    }
                  }}
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
                  Demande d’Aide au Logement (APL)
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
                        activeStep !== 4 &&
                          !isCurrentStepValid &&
                          styles.continueButtonDisabled,
                      ]}
                      onPress={handleContinue}
                      disabled={activeStep !== 4 && !isCurrentStepValid}
                    >
                      <Text
                        style={[
                          styles.continueButtonText,
                          activeStep !== 4 &&
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
  container: { flex: 1, marginTop: 20 },
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
