import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface OptionCardProps {
  label: string;
  onPress: () => void;
}

const OptionCard = ({ label, onPress }: OptionCardProps) => (
  <View style={styles.card}>
    <TouchableOpacity style={styles.optionRow} onPress={onPress}>
      <Text style={styles.optionLabel}>{label}</Text>
      <Ionicons name="chevron-forward" size={20} color="#888" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 16,
    overflow: "hidden",
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  optionLabel: {
    fontSize: 16,
    color: "#2479CF",
    fontFamily: "Poppins-SemiBold",
  },
});

export default OptionCard;
