import NotFoundComp from "@/components/NotFoundComp";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DocumentPdf from "../assets/images/document-pdf.svg";
import BaseLayout from "../components/BaseLayout";
import useFileStore, { StoredFile } from "./hooks/useDocumentStore";

const renderDocumentItem = (document: StoredFile) => (
  <TouchableOpacity
    key={document.id}
    style={styles.documentItem}
    // onPress={() => handleDocumentPress(document)}
  >
    <View style={styles.documentIcon}>
      <DocumentPdf />
    </View>
    <Text style={styles.documentName}>{document.name}</Text>
  </TouchableOpacity>
);

const DocumentFilesScreen = () => {
  const { files, currentFolder, setCurrentFolder } = useFileStore();
  const selectedFiles = files.filter(
    (item) => item.folderName === currentFolder
  );

  return (
    <BaseLayout>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              setCurrentFolder("");
              router.back();
            }}
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
        <View style={styles.section}>
          <View style={styles.sectionBar}>
            <Text style={styles.sectionBarItem}>
              Document {"<"} {currentFolder}
            </Text>
            <Text style={styles.sectionBarItem}>
              {selectedFiles.length} items
            </Text>
          </View>
          <View style={styles.documentsContainer}>
            {selectedFiles.length === 0 && (
              <NotFoundComp text="No Files Found" />
            )}
            {selectedFiles.map((document) => renderDocumentItem(document))}
          </View>
        </View>
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
  section: {
    marginBottom: 16,
  },
  sectionBar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionBarItem: {
    fontFamily: "Poppins-SemiBold",
    fontWeight: 600,
    fontSize: 10,
    color: "white",
  },
});

export default DocumentFilesScreen;
