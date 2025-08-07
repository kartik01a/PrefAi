import CustomModal from "@/components/CustomModal";
import Loading from "@/components/Loading";
import NotFoundComp from "@/components/NotFoundComp";
import cloudinaryService from "@/services/cloudinaryService";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
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
import { Menu } from "react-native-paper";
import { useSelector } from "react-redux";
import DocumentFolder from "../../assets/images/document-folder.svg";
import DocumentPdf from "../../assets/images/document-pdf.svg";
import UploadAdd from "../../assets/images/upload-add.svg";
import BaseLayout from "../../components/BaseLayout";
import {
  IFolder,
  useCreateFolderMutation,
  useGetFoldersQuery,
} from "../auth/usersApiSlice";
import useFileStore, { StoredFile } from "../hooks/useDocumentStore";
import { RootState } from "../store";

const DocumentTab = () => {
  const { setSelectedFile, setCurrentFolder, files } = useFileStore();
  let userData = useSelector((state: RootState) => state.auth.userInfo);
  const [addFolder, { isLoading: createFolderLoading }] =
    useCreateFolderMutation();
  const { data: folders, isLoading: getFolderLoading } = useGetFoldersQuery(
    userData?.id || ""
  );
  const { t } = useTranslation();
  const [isAddFolder, setIsAddFolder] = useState(false);
  const [visible, setVisible] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleAddFolder = () => {
    if (folderName) {
      addFolder({ folderName, userId: userData?.id || "" });
      setIsAddFolder(false);
      setCurrentFolder("");
    }
  };

  const handleFolderPress = (folder: string) => {
    setCurrentFolder(folder);
    router.push("/document-files");
  };

  const handleDocumentPress = (document: StoredFile) => {
    console.log("Document pressed:", document.name);
    // Open document viewer
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

        // Navigate to upload screen
        setSelectedFile({
          resource_type: uploadResult.resource_type,
          uri: uploadResult.secure_url,
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

        router.push({
          pathname: "/upload-document",
        });
      }
    } catch (error) {
      console.error("Error selecting document:", error);
      Alert.alert("Error", t("failedToSelectDocument"));
    }
  };

  const renderFolderItem = (folder: IFolder, files: StoredFile[]) => {
    return (
      <TouchableOpacity
        key={folder._id}
        style={styles.folderItem}
        onPress={() => handleFolderPress(folder._id)}
      >
        <View style={styles.folderIcon}>
          <DocumentFolder color="#2479CF" />
        </View>
        <Text style={styles.folderName}>{folder.folderName}</Text>
        <Text style={styles.folderCount}>
          {folder.fileCount || 0} {t("items")}
        </Text>
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
      <Loading visible={createFolderLoading || isLoading} />
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
          <Text style={styles.headerTitle}>{t("documentManagement")}</Text>
        </View>

        {/* Upload Section */}
        <TouchableOpacity
          style={styles.uploadSection}
          onPress={handleUploadPress}
        >
          <View style={styles.uploadIcon}>
            <UploadAdd />
          </View>
          <Text style={styles.uploadTitle}>{t("uploadDocuments")}</Text>
          <Text style={styles.uploadSubtitle}>
            {t("uploadDocumentsDescription")}
          </Text>
        </TouchableOpacity>

        {/* My Folder Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t("myFolder")}</Text>
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
                  title={t("addFolder")}
                />
              </Menu>
            </TouchableOpacity>
          </View>

          {folders?.data?.length === 0 && (
            <NotFoundComp text={t("noFolderFound")} />
          )}
          {folders?.data?.length !== 0 && (
            <View style={styles.folderGrid}>
              {folders?.data?.map((folder) => renderFolderItem(folder, files))}
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Document</Text>
          {/* <View style={styles.documentsContainer}>
            {files.length === 0 && <NotFoundComp text={t("noFilesFound")} />}
            {files.map((document) => renderDocumentItem(document))}
          </View> */}
        </View>
      </View>
      <CustomModal visible={isAddFolder} onClose={() => setIsAddFolder(false)}>
        <View>
          <Text style={{ color: "#2479CF" }}>{t("enterFolderName")}</Text>
          <TextInput
            style={styles.textInput}
            value={folderName}
            onChangeText={setFolderName}
            placeholder={t("enterFileName")}
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.button} onPress={handleAddFolder}>
            <Text style={{ color: "white" }}>{t("addFolder")}</Text>
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
    marginTop: 20,
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
    marginTop: 10,
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
