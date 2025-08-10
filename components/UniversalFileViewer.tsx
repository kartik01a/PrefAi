import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { WebView } from "react-native-webview";

interface UniversalFileViewerProps {
  url: string;
  style?: object;
  showFullScreen?: boolean; // For images
  fallbackText?: string;
  useInAppBrowser?: boolean; // Whether to use in-app browser or WebView for PDFs
}

type FileType = "image" | "pdf" | "unknown";

const UniversalFileViewer: React.FC<UniversalFileViewerProps> = ({
  url,
  style,
  showFullScreen = true,
  fallbackText = "Unable to display file",
  useInAppBrowser = false,
}) => {
  const [fileType, setFileType] = useState<FileType>("unknown");
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageError, setImageError] = useState(false);

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  // Function to detect file type from URL
  const detectFileType = (fileUrl: string): FileType => {
    try {
      const cleanUrl = fileUrl.split("?")[0].toLowerCase();

      if (cleanUrl.match(/\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i)) {
        return "image";
      }

      if (cleanUrl.match(/\.pdf$/i)) {
        return "pdf";
      }

      if (fileUrl.includes("cloudinary.com")) {
        if (fileUrl.includes("/image/upload/")) {
          return "image";
        }
        if (fileUrl.includes("/raw/upload/")) {
          return "pdf";
        }
        if (fileUrl.includes("/upload/") && !fileUrl.includes("/raw/")) {
          return "image";
        }
      }

      return "unknown";
    } catch (error) {
      console.error("Error detecting file type:", error);
      return "unknown";
    }
  };

  // Function to verify if image loads successfully
  const verifyImageLoad = (imageUrl: string): Promise<boolean> => {
    return new Promise((resolve) => {
      Image.prefetch(imageUrl)
        .then(() => resolve(true))
        .catch(() => resolve(false));
    });
  };

  // Function to verify if PDF loads successfully
  const verifyPdfLoad = (pdfUrl: string): Promise<boolean> => {
    return new Promise((resolve) => {
      // Simple HEAD request to check if PDF exists
      fetch(pdfUrl, { method: "HEAD" })
        .then((response) => {
          const contentType = response.headers.get("content-type");
          const isPdf = contentType
            ? contentType.includes("application/pdf") ||
              contentType.includes("application/octet-stream")
            : false;
          resolve(response.ok && isPdf);
        })
        .catch(() => resolve(false));
    });
  };

  useEffect(() => {
    const determineFileType = async () => {
      setLoading(true);
      setImageError(false);

      let detectedType = detectFileType(url);

      // If detection is uncertain, try to verify by attempting to load
      if (detectedType === "unknown" || detectedType === "image") {
        const imageLoads = await verifyImageLoad(url);
        if (imageLoads) {
          detectedType = "image";
        } else if (detectedType === "unknown") {
          // If image doesn't load and type is unknown, try PDF
          const pdfLoads = await verifyPdfLoad(url);
          if (pdfLoads) {
            detectedType = "pdf";
          }
        }
      }

      setFileType(detectedType);
      setLoading(false);
    };

    if (url) {
      determineFileType();
    }
  }, [url]);

  const handleImageError = () => {
    setImageError(true);
    // Try to load as PDF if image fails
    verifyPdfLoad(url).then((pdfLoads) => {
      if (pdfLoads) {
        setFileType("pdf");
      }
    });
  };

  const openPDFInBrowser = async () => {
    try {
      await WebBrowser.openBrowserAsync(url);
    } catch (error) {
      Alert.alert("Error", "Unable to open PDF");
    }
  };

  const renderImage = () => (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        onPress={() => showFullScreen && setModalVisible(true)}
        disabled={!showFullScreen}
      >
        <Image
          source={{ uri: url }}
          style={[styles.image, style]}
          resizeMode="contain"
          onError={handleImageError}
        />
      </TouchableOpacity>

      {showFullScreen && (
        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.modalOverlay}
              onPress={() => setModalVisible(false)}
            >
              <Image
                source={{ uri: url }}
                style={styles.fullScreenImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );

  const renderPDF = () => {
    if (useInAppBrowser) {
      // Option 1: Button to open in system browser
      return (
        <View style={[styles.pdfButtonContainer, style]}>
          <TouchableOpacity style={styles.pdfButton} onPress={openPDFInBrowser}>
            <Text style={styles.pdfButtonText}>📄 Open PDF</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      // Option 2: Embed PDF using WebView with Google Docs Viewer
      const googleDocsUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
        url
      )}`;

      return (
        <View style={[styles.pdfContainer, style]}>
          <WebView
            source={{ uri: googleDocsUrl }}
            style={[styles.webview, style]}
            startInLoadingState
            renderLoading={() => (
              <View style={styles.webviewLoading}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text>Loading PDF...</Text>
              </View>
            )}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.error("WebView error: ", nativeEvent);
              Alert.alert("Error", "Failed to load PDF in WebView");
            }}
          />
        </View>
      );
    }
  };

  const renderFallback = () => (
    <View style={[styles.fallbackContainer, style]}>
      <Text style={styles.fallbackText}>{fallbackText}</Text>
      <TouchableOpacity
        style={styles.fallbackButton}
        onPress={() => WebBrowser.openBrowserAsync(url)}
      >
        <Text style={styles.fallbackButtonText}>Open in Browser</Text>
      </TouchableOpacity>
    </View>
  );

  const renderLoading = () => (
    <View style={[styles.loadingContainer, style]}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );

  if (loading) {
    return renderLoading();
  }

  if (fileType === "image" && !imageError) {
    return renderImage();
  }

  if (fileType === "pdf") {
    return renderPDF();
  }

  return renderFallback();
};

const styles = StyleSheet.create({
  container: {
    marginTop: Dimensions.get("window").height / 4,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: Dimensions.get("window").width - 40,
    height: 400,
  },
  pdfContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  pdfButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  pdfButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  pdfButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  webview: {
    flex: 1,
    width: Dimensions.get("window").width - 20,
    height: Dimensions.get("window").height - 100,
  },
  webviewLoading: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  fallbackText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 15,
  },
  fallbackButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  fallbackButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default UniversalFileViewer;
