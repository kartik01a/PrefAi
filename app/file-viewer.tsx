import React from "react";
import { View } from "react-native";
import UniversalFileViewer from "../components/UniversalFileViewer";
import useFileStore from "./hooks/useDocumentStore";

const FileViewerScreen = () => {
  const { viewUrl } = useFileStore();
  console.log(viewUrl);

  return (
    <View style={{ flex: 1 }}>
      <UniversalFileViewer
        url={viewUrl ? viewUrl : ""}
        useInAppBrowser={true}
      />
    </View>
  );
};
export default FileViewerScreen;
