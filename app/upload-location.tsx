import React, { useState } from "react";
import CustomModal from "@/components/CustomModal";
import Loading from "@/components/Loading";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import DocumentAddFolder from "../assets/images/document-add-folder.svg";
import DocumentFolder from "../assets/images/document-folder.svg";
import BaseLayout from "../components/BaseLayout";
import {
  IFolder,
  useCreateFolderMutation,
  useGetFoldersQuery,
} from "./auth/usersApiSlice";
import useFileStore from "./hooks/useDocumentStore";
import { RootState } from "./store";

const SelectLocationScreen = () => {
  let userData = useSelector((state: RootState) => state.auth.userInfo);
  const { setCurrentFolder, currentFolder: selectedFolder } = useFileStore();
  const [addFolder, { isLoading: createFolderLoading }] =
    useCreateFolderMutation();
  const { data: folders, isLoading: getFolderLoading } = useGetFoldersQuery(
    userData?._id || ""
  );
  const [isAddFolder, setIsAddFolder] = useState(false);
  const [folderName, setFolderName] = useState("");
  const { t } = useTranslation();

  const handleAddFolder = () => {
    if (folderName) {
      addFolder({ folderName, userId: userData?._id || "" });
      setIsAddFolder(false);
      setCurrentFolder({ name: "", id: "" });
    }
  };

  const handleFolderSelect = ({ name, id }: { name: string; id: string }) => {
    setCurrentFolder({ name, id });
    router.back();
  };

  const renderFolderItem = (item: IFolder) => {
    return (
      <TouchableOpacity
        key={item._id}
        style={
          selectedFolder.id === item._id
            ? styles.selectedFolderItem
            : styles.folderItem
        }
        onPress={() =>
          handleFolderSelect({ name: item.folderName, id: item._id })
        }
      >
        <View style={styles.folderIcon}>
          <DocumentFolder
            color={selectedFolder.id === item._id ? "white" : "#2479CF"}
          />
        </View>
        <Text
          style={
            selectedFolder.id === item._id
              ? styles.selectFolderName
              : styles.folderName
          }
        >
          {item.folderName}
        </Text>
        <Text
          style={[
            styles.folderCount,
            selectedFolder.id === item._id
              ? { color: "white" }
              : { color: "#2479CF" },
          ]}
        >
          {item.fileCount} items
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <BaseLayout>
      <Loading visible={createFolderLoading || getFolderLoading} />
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
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t("selectDestination")}</Text>
            <TouchableOpacity onPress={() => setIsAddFolder(true)}>
              <DocumentAddFolder />
            </TouchableOpacity>
          </View>

          <View style={styles.folderGrid}>
            {folders?.data?.map((folder) => renderFolderItem(folder))}
          </View>
        </View>
      </View>
      <CustomModal visible={isAddFolder} onClose={() => setIsAddFolder(false)}>
        <View>
          <Text style={{ color: "#2479CF" }}>{t("enterFolderName")}</Text>
          <TextInput
            style={styles.textInput}
            value={folderName}
            onChangeText={setFolderName}
            placeholder="Enter file name"
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
  content: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 20,
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
    borderColor: "white",
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
  selectedFolderItem: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "white",
    borderTopStartRadius: 0,
    height: 135,
    width: 140,
    gap: 2,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingHorizontal: 6,
    paddingVertical: 10,
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
  selectFolderName: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: "white",
    marginBottom: 4,
    textAlign: "center",
  },
  folderCount: {
    fontSize: 8,
    fontFamily: "Poppins-Medium",
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
  button: {
    backgroundColor: "#2479CF",
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SelectLocationScreen;
