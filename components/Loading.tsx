import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

interface LoadingProps {
  visible?: boolean;
  color?: string;
  size?: "small" | "large";
}

const Loading: React.FC<LoadingProps> = ({
  visible = true,
  color = "#ffffff",
  size = "large",
}) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <ActivityIndicator size={size} color={color} style={styles.spinner} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    transform: [{ scale: 1.5 }],
  },
});

export default Loading;
