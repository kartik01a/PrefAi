import CustomModal from "@/components/CustomModal";
import NotFoundComp from "@/components/NotFoundComp";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Menu } from "react-native-paper";
import DocumentFolder from "../../assets/images/document-folder.svg";
import DocumentPdf from "../../assets/images/document-pdf.svg";
import UploadAdd from "../../assets/images/upload-add.svg";
import BaseLayout from "../../components/BaseLayout";
import useFileStore, {
  StoredFile,
  StoredFolder,
} from "../hooks/useDocumentStore";

// interface DocumentManagementScreenProps {
//   navigation: any;
// }

const DocumentTab = () => {
  const { setSelectedFile, setCurrentFolder, files, folders, addFolder } =
    useFileStore();
  const [isAddFolder, setIsAddFolder] = useState(false);
  const [visible, setVisible] = useState(false);
  const [folderName, setFolderName] = useState("");

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleAddFolder = () => {
    if (folderName) {
      addFolder({ name: folderName });
      setIsAddFolder(false)
      setCurrentFolder("")
    }
  };

  const handleFolderPress = (folder: StoredFolder) => {
    console.log("Folder pressed:", folder.name);
    setCurrentFolder(folder.name);
    router.push("/document-files");
  };

  const handleDocumentPress = (document: StoredFile) => {
    console.log("Document pressed:", document.name);
    // Open document viewer
  };

  const validateFileSize = (file: any) => {
    const maxSizeImage = 1 * 1024 * 1024; // 1MB for images
    const maxSizePdf = 10 * 1024 * 1024; // 10MB for PDFs

    if (file.type && file.type.includes("image")) {
      return file.size <= maxSizeImage;
    } else if (file.type && file.type.includes("pdf")) {
      return file.size <= maxSizePdf;
    }
    return false;
  };

  const handleUploadPress = () => {
    Alert.alert(
      "Upload Document",
      "Choose an option",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Choose File",
          onPress: selectDocument,
        },
        {
          text: "Select from Gallery",
          onPress: selectFromGallery,
        },
      ],
      { cancelable: true }
    );
  };

  const selectFromGallery = async () => {
    try {
      // Request permission
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please grant gallery access to select images"
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

        // Validate file size
        // if (!validateFileSize(file)) {
        //   Alert.alert("File Too Large", "Images must be less than 1MB");
        //   return;
        // }

        // Navigate to upload screen
        setSelectedFile({
          file: file,
          uri: file.uri,
          name: file.fileName || `image_${Date.now()}.jpg`,
          type: file.type || "image/jpeg",
          size: file.fileSize || 0,
        });
        router.push({
          pathname: "/upload-document",
        });
      }
    } catch (error) {
      console.error("Error selecting image:", error);
      Alert.alert("Error", "Failed to select image");
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

        // Validate file size
        // if (!validateFileSize(file)) {
        //   const maxSize = file.mimeType?.includes("image") ? "1MB" : "10MB";
        //   Alert.alert("File Too Large", `File must be less than ${maxSize}`);
        //   return;
        // }

        // Navigate to upload screen

        setSelectedFile({
          file: file,
          uri: file.uri,
          name: file.name || `image_${Date.now()}.jpg`,
          type: file.mimeType || "image/jpeg",
          size: file.size || 0,
        });

        router.push({
          pathname: "/upload-document",
        });
      }
    } catch (error) {
      console.error("Error selecting document:", error);
      Alert.alert("Error", "Failed to select document");
    }
  };

  const renderFolderItem = (folder: StoredFolder, files: StoredFile[]) => {
    const count = files.filter((item) => item.folderName === folder.name).length;
    console.log(count,"count")
    return (
      <TouchableOpacity
        key={folder.id}
        style={styles.folderItem}
        onPress={() => handleFolderPress(folder)}
      >
        <View style={styles.folderIcon}>
          <DocumentFolder color="#2479CF" />
        </View>
        <Text style={styles.folderName}>{folder.name}</Text>
        <Text style={styles.folderCount}>{count || 0} items</Text>
      </TouchableOpacity>
    );
  };

  const renderDocumentItem = (document: StoredFile) => (
    <TouchableOpacity
      key={document.id}
      style={styles.documentItem}
      onPress={() => handleDocumentPress(document)}
    >
      <View style={styles.documentIcon}>
        <DocumentPdf />
      </View>
      <Text style={styles.documentName}>{document.name}</Text>
    </TouchableOpacity>
  );

  return (
    <BaseLayout>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.push("/")}
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

        {/* Upload Section */}
        <TouchableOpacity
          style={styles.uploadSection}
          onPress={handleUploadPress}
        >
          <View style={styles.uploadIcon}>
            <UploadAdd />
          </View>
          <Text style={styles.uploadTitle}>Upload Documents</Text>
          <Text style={styles.uploadSubtitle}>
            You can upload document by importing{"\n"}or scanning with your
            camera
          </Text>
        </TouchableOpacity>

        {/* My Folder Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Folder</Text>
            <TouchableOpacity onPress={openMenu}>
              <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                  <Ionicons name="ellipsis-vertical" size={16} color="white" />
                }
              >
                <Menu.Item
                  onPress={() => {
                    closeMenu();
                    setIsAddFolder(true);
                  }}
                  style={{ height: 30 }}
                  title="Add Folder"
                />
              </Menu>
            </TouchableOpacity>
          </View>

          {folders.length === 0 && <NotFoundComp text="No Folder Found" />}
          {folders.length !== 0 && (
            <View style={styles.folderGrid}>
              {folders.map((folder) => renderFolderItem(folder, files))}
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Document</Text>
          <View style={styles.documentsContainer}>
            {files.length === 0 && <NotFoundComp text="No Files Found" />}
            {files.map((document) => renderDocumentItem(document))}
          </View>
        </View>
      </View>
      <CustomModal visible={isAddFolder} onClose={() => setIsAddFolder(false)}>
        <View>
          <Text style={{ color: "#2479CF" }}>Enter folder name</Text>
          <TextInput
            style={styles.textInput}
            value={folderName}
            onChangeText={setFolderName}
            placeholder="Enter file name"
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.button} onPress={handleAddFolder}>
            <Text style={{ color: "white" }}>
              Add Folder
            </Text>
          </TouchableOpacity>
        </View>
      </CustomModal>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 50,
  },
  header: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    color: "white",
  },
  textInput: {
    height: 50,
    color: "black",
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#2479CF",
    borderRadius: 12,
    marginTop: 10
  },
  uploadSection: {
    backgroundColor: "white",
    height: 180,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  uploadIcon: {
    marginBottom: 8,
  },
  uploadTitle: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    color: "#2479CF",
    marginBottom: 8,
  },
  uploadSubtitle: {
    fontSize: 10,
    color: "#2479CF",
    fontFamily: "Poppins-Medium",
    textAlign: "center",
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    color: "white",
  },
  folderGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
  },
  folderItem: {
    backgroundColor: "white",
    borderRadius: 12,
    borderTopStartRadius: 0,
    height: 135,
    width: 140,
    gap: 2,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingHorizontal: 6,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  folderIcon: {
    position: "absolute",
    top: 10,
    left: 6,
  },
  folderName: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: "#2479CF",
    marginBottom: 4,
    textAlign: "center",
  },
  folderCount: {
    fontSize: 8,
    fontFamily: "Poppins-Medium",
    color: "#2479CF",
  },
  documentsContainer: {
    marginTop: 16,
    gap: 12,
  },
  documentItem: {
    backgroundColor: "white",
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  documentIcon: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  documentName: {
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
    color: "#2479CF",
    flex: 1,
  },
  button: {
    backgroundColor: "#2479CF",
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DocumentTab;
