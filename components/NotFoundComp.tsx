import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface NotFoundCompProps {
  text?: string;
}

const NotFoundComp = ({ text = "No Files Found" }: NotFoundCompProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: "Poppins-SemiBold",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    minHeight: 100,
  },
  text: {
    color: "#2479CF",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default NotFoundComp;
