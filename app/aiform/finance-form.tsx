import BaseLayout from "@/components/BaseLayout";
import {
  getInitialFormData,
  isStepValid,
} from "@/components/FinanceForm/formData";
import { Step1 } from "@/components/FinanceForm/Steps/Step1";
import { Step2 } from "@/components/FinanceForm/Steps/Step2";
import { Step3 } from "@/components/FinanceForm/Steps/Step3";
import { Step4 } from "@/components/FinanceForm/Steps/Step4";
import { Step5 } from "@/components/FinanceForm/Steps/Step5";
import { Step7 } from "@/components/FinanceForm/Steps/Step7";
import { Step8 } from "@/components/FinanceForm/Steps/Step8";
import { saveToDownloads } from "@/components/PDF/DownloadPdf";
import { handleFormToPDF } from "@/components/PDF/ExportPdf";
import cloudinaryService from "@/services/cloudinaryService";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { router, useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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
import Loading from "@/components/Loading";
import useFileStore from "../hooks/useDocumentStore";

const FinanceForm = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { setSelectedFile } = useFileStore();
  const [activeStep, setActiveStep] = useState(1);
  const steps = Array.from({ length: 8 }, (_, i) => i + 1);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState(() => getInitialFormData());
  const isCurrentStepValid = isStepValid(activeStep, formData);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const exportToPDF = async () => {
    try {
      await handleFormToPDF(formData);
      Alert.alert("Success", "PDF generated successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to generate PDF. Please try again.");
    }
  };
  const downloadPDF = async () => {
    try {
      await saveToDownloads(formData);
      Alert.alert("Success", "PDF downloaded successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to download PDF. Please try again.");
    }
  };

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
          housingDetails={formData.housingDetails}
          setHousingDetails={(updatedDetails) =>
            setFormData((prev) => ({
              ...prev,
              housingDetails: {
                ...prev.housingDetails,
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
          applicantSituation={formData.applicantSituation}
          setApplicantSituation={(updatedDetails) =>
            setFormData((prev) => ({
              ...prev,
              applicantSituation: {
                ...prev.applicantSituation,
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
          rentalContext={formData.rentalContext}
          setRentalContext={(updatedDetails) =>
            setFormData((prev) => ({
              ...prev,
              rentalContext: {
                ...prev.rentalContext,
                ...updatedDetails,
              },
            }))
          }
        />
      );
    }

    if (activeStep === 5) {
      return <Step5 handleUploadPress={handleUploadPress} />;
    }

    if (activeStep === 6) {
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
    if (activeStep === 7) {
      return <Step8 exportToPDF={exportToPDF} downloadPDF={downloadPDF} />;
    }

    return <Text>{`Step ${activeStep} form goes here.`}</Text>;
  };

  const handleUploadPress = () => {
    Alert.alert(
      t("uploadDocument"),
      t("chooseAnOption"),
      [
        {
          text: t("cancel"),
          style: "cancel",
        },
        {
          text: t("chooseFile"),
          onPress: selectDocument,
        },
        {
          text: t("selectFromGallery"),
          onPress: selectFromGallery,
        },
      ],
      { cancelable: true }
    );
  };

  const validateFileSize = (file: any) => {
    const maxSizeImage = 25 * 1024 * 1024; // 25MB for images
    const maxSizePdf = 10 * 1024 * 1024; // 10MB for PDFs

    if (file.type && file.type.includes("image")) {
      return file.fileSize <= maxSizeImage;
    } else if (file.type && file.type.includes("pdf")) {
      return file.size <= maxSizePdf;
    }
    return false;
  };
  const validateDocumentSize = (file: any) => {
    const maxSizeImage = 25 * 1024 * 1024; // 25MB for images
    const maxSizePdf = 10 * 1024 * 1024; // 10MB for PDFs

    if (file.mimeType && file.mimeType.includes("image")) {
      return file.size <= maxSizeImage;
    } else if (file.mimeType && file.mimeType.includes("pdf")) {
      return file.size <= maxSizePdf;
    }
    return false;
  };

  const selectFromGallery = async () => {
    try {
      // Request permission
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          t("permissionRequired"),
          t("pleaseGrantGalleryAccessToSelectImages")
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });
      if (!result.canceled && result.assets[0]) {
        const file = result.assets[0];
        setIsLoading(true);
        if (!validateFileSize(file)) {
          Alert.alert("File Too Large", "Images must be less than 25MB");
          return;
        }

        const uploadResult = await cloudinaryService.uploadFile(
          result.assets[0].uri,
          {
            folder: "app-uploads/images",
            resourceType: "image",
          }
        );
        setIsLoading(false);
        setSelectedFile({
          resource_type: uploadResult.resource_type,
          uri: uploadResult.secure_url,
          name: file.fileName || `image_${Date.now()}.jpg`,
          type: file.type || "image/jpeg",
          size: file.fileSize || 0,
        });

        setFormData((prev) => ({
          ...prev,
          document: { uri: uploadResult.secure_url },
        }));
      }
    } catch (error) {
      console.error("Error selecting image:", error);
      Alert.alert("Error", t("failedToSelectImage"));
    }
  };

  const selectDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/*"],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        const file = result.assets[0];
        setIsLoading(true);

        if (!validateDocumentSize(file)) {
          const maxSize = file.mimeType?.includes("image") ? "25MB" : "10MB";
          Alert.alert("File Too Large", `File must be less than ${maxSize}`);
          return;
        }
        const uploadResult = await cloudinaryService.uploadFile(file.uri, {
          folder: "app-uploads/documents",
          resourceType: file.mimeType?.startsWith("image/") ? "image" : "raw",
        });
        setIsLoading(false);

        setSelectedFile({
          resource_type: uploadResult.resource_type,
          uri: uploadResult.secure_url,
          name: file.name || `image_${Date.now()}.jpg`,
          type: file.mimeType || "image/jpeg",
          size: file.size || 0,
        });

        setFormData((prev) => ({
          ...prev,
          document: { uri: uploadResult.secure_url },
        }));
      }
    } catch (error) {
      console.error("Error selecting document:", error);
      Alert.alert("Error", t("failedToSelectDocument"));
    }
  };

  const getStepSubtitle = (step: number): string => {
    switch (step) {
      case 1:
        return t("housingForm1");
      case 2:
        return t("financialForm2");
      case 3:
        return t("financialForm3");
      case 4:
        return t("financialForm4");
      case 5:
        return t("equipmentForm5");
      case 6:
        return t("housingForm7");
      case 7:
        return t("housingForm8");
      default:
        return "default form";
    }
  };

  return (
    <BaseLayout>
    <Loading visible={isLoading} />
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
                <Text style={styles.headerTitle}>{t("formName3")}</Text>
              </View>

              <View style={styles.stepperContainer}>
                <View style={styles.stepsRow}>
                  {steps.map((number, index) => (
                    <React.Fragment key={`${t("step")}-${number}`}>
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

                  {activeStep !== 7 && (
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
                        {t("continue")}
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

export default FinanceForm;
