import Loading from "@/components/Loading";
import NotFoundComp from "@/components/NotFoundComp";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DocumentPdf from "../assets/images/document-pdf.svg";
import BaseLayout from "../components/BaseLayout";
import { IDocument, useGetDocumentsQuery } from "./auth/usersApiSlice";
import useFileStore from "./hooks/useDocumentStore";

const DocumentFilesScreen = () => {
  const { currentFolder, setCurrentFolder, setViewUrl } = useFileStore();
  const { data: files, isLoading } = useGetDocumentsQuery(
    currentFolder.id || ""
  );

  const renderDocumentItem = (document: IDocument) => (
    <TouchableOpacity
      key={document._id}
      style={styles.documentItem}
      onPress={() => {
        setViewUrl(document.uri);
        router.push("/file-viewer");
      }}
    >
      <View style={styles.documentIcon}>
        <DocumentPdf />
      </View>
      <Text style={styles.documentName}>{document.name}</Text>
    </TouchableOpacity>
  );

  return (
    <BaseLayout>
      <Loading visible={isLoading} />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              setCurrentFolder({ name: "", id: "" });
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
              Document {"<"} {currentFolder.name}
            </Text>
            <Text style={styles.sectionBarItem}>
              {files?.data?.length} items
            </Text>
          </View>
          <View style={styles.documentsContainer}>
            {files?.data?.length === 0 && (
              <NotFoundComp text="No Files Found" />
            )}
            {files?.data?.map((document: IDocument) =>
              renderDocumentItem(document)
            )}
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
