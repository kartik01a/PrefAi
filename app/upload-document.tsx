import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DocumentPdf from "../assets/images/document-pdf.svg";
import BaseLayout from "../components/BaseLayout";
import useFileStore from "./hooks/useDocumentStore";

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
  const {
    selectedFile,
    currentFolder: selectedFolder,
    setCurrentFolder,
    addFile
  } = useFileStore();
  const [fileName, setFileName] = useState(
    selectedFile?.name.split(".")[0] || ""
  );

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

  const handleUpload = () => {
    if (!fileName.trim()) {
      Alert.alert("Error", "Please enter a file name");
      return;
    }

    if (!selectedFolder) {
      Alert.alert("Error", "Please select a location");
      return;
    }

    const uploadData = {
      file: selectedFile,
      fileName: fileName.trim(),
      folder: selectedFolder,
      originalName: selectedFile!.name,
      size: selectedFile!.size,
      type: selectedFile!.type,
    };
    addFile({
      file: selectedFile,
      uri: selectedFile!.uri,
      name: fileName.trim(),
      size: selectedFile!.size,
      type: selectedFile!.type,
    });

    // TODO: Call your API here
    console.log("Upload data:", uploadData);

    Alert.alert("Success", "Document uploaded successfully!", [
      {
        text: "OK",
        onPress: () => router.push("/document"),
      },
    ]);
  };

  return (
    <BaseLayout>
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
          <Text style={styles.headerTitle}>Document Management</Text>
        </View>

        <Text style={styles.subTitle}>Upload Document</Text>

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
          <Text style={styles.inputLabel}>File Name</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={fileName}
              onChangeText={setFileName}
              placeholder="Enter file name"
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
          <Text style={styles.inputLabel}>Location</Text>
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
              {selectedFolder || "Select location"}
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
          <Text style={styles.uploadButtonText}>Upload</Text>
        </TouchableOpacity>
      </View>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
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
