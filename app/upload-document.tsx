import Loading from "@/components/Loading";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import DocumentPdf from "../assets/images/document-pdf.svg";
import BaseLayout from "../components/BaseLayout";
import { useCreateDocumentMutation } from "./auth/usersApiSlice";
import useFileStore from "./hooks/useDocumentStore";
import { RootState } from "./store";

// interface UploadDocumentScreenProps {
//   route: {
//     params: {
//       selectedFile: {
//         uri: string;
//         name: string;
//         type: string;
//         size: number;
//       };
//     };
//   };
//   navigation: any;
// }

const UploadDocumentScreen = () => {
  let userData = useSelector((state: RootState) => state.auth.userInfo);
  const {
    selectedFile,
    currentFolder: selectedFolder,
    setCurrentFolder,
  } = useFileStore();
  const { t } = useTranslation();
  const [fileName, setFileName] = useState(
    selectedFile?.name.split(".")[0] || ""
  );

  const [addDocument, { isLoading }] = useCreateDocumentMutation();

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) {
      return "document";
    } else if (type.includes("image")) {
      return "image";
    }
    return "document-outline";
  };

  const handleLocationPress = () => {
    router.push({
      pathname: "/upload-location",
    });
  };

  const handleRemoveFolder = () => {
    setCurrentFolder("");
  };

  const handleUpload = async () => {
    if (!fileName.trim()) {
      Alert.alert("Error", "Please enter a file name");
      return;
    }

    if (!selectedFolder) {
      Alert.alert("Error", "Please select a location");
      return;
    }

    const uploadData = {
      userId: userData?.id || "",
      uri: selectedFile?.uri || "",
      name: fileName.trim() || selectedFile?.name || "",
      size: selectedFile?.size || 0,
      type: selectedFile?.type || "",
      folderId: selectedFolder || "",
    };
    console.log(uploadData, "uploadData");
    await addDocument(uploadData);
    Alert.alert("Success", "Document uploaded successfully!", [
      {
        text: "OK",
        onPress: () => router.push("/document"),
      },
    ]);
  };

  return (
    <BaseLayout>
      <Loading visible={isLoading} />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <MaterialCommunityIcons
              name="arrow-left-top"
              size={20}
              color="white"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t("documentManagement")}</Text>
        </View>

        <Text style={styles.subTitle}>{t("uploadDocument")}</Text>

        {/* Selected File Display */}
        <View style={styles.fileDisplay}>
          <View style={styles.fileIcon}>
            <DocumentPdf />
          </View>
          <View style={styles.fileInfo}>
            <Text style={styles.fileName}>{selectedFile!.name}</Text>
            <Text style={styles.fileSize}>
              {formatFileSize(selectedFile!.size)}
            </Text>
          </View>
        </View>

        {/* File Name Input */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>{t("fileName")}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={fileName}
              onChangeText={setFileName}
              placeholder={t("enterFileName")}
              placeholderTextColor="#999"
            />
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setFileName("")}
            >
              <Ionicons name="close" size={20} color="#D9D9D9" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Location Selection */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>{t("location")}</Text>
          <TouchableOpacity
            style={styles.locationContainer}
            onPress={handleLocationPress}
          >
            <Text
              style={[
                styles.locationText,
                !selectedFolder && styles.placeholderText,
              ]}
            >
              {selectedFolder || t("selectLocation")}
            </Text>
            {selectedFolder ? (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={handleRemoveFolder}
              >
                <Ionicons name="close" size={20} color="#D9D9D9" />
              </TouchableOpacity>
            ) : null}
          </TouchableOpacity>
        </View>

        {/* Upload Button */}
        <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
          <Text style={styles.uploadButtonText}>{t("upload")}</Text>
        </TouchableOpacity>
      </View>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingBottom: 12,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "white",
  },
  subTitle: {
    fontSize: 14,
    color: "white",
    fontFamily: "Poppins-SemiBold",
    marginBottom: 16,
  },
  fileDisplay: {
    backgroundColor: "white",
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 6,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fileIcon: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: "#2479CF",
    marginBottom: 4,
  },
  fileSize: {
    fontSize: 10,
    fontFamily: "Poppins-Medium",
    color: "#2479CF",
  },
  inputSection: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 12,
    color: "white",
    fontFamily: "Poppins-Medium",
    marginBottom: 8,
  },
  inputContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  textInput: {
    flex: 1,
    height: 50,
    color: "white",
    fontSize: 16,
  },
  locationContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    height: 48,
  },
  locationText: {
    flex: 1,
    color: "white",
    fontSize: 16,
  },
  placeholderText: {
    color: "#D9D9D9",
  },
  clearButton: {
    padding: 4,
  },
  uploadButton: {
    backgroundColor: "white",
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  uploadButtonText: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "#2479CF",
  },
});

export default UploadDocumentScreen;
