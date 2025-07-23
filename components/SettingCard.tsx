import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

interface SettingCardProps {
  label: string;
  value: boolean;
  onChange: (val: boolean) => void;
}

const SettingCard = ({ label, value, onChange }: SettingCardProps) => (
  <View style={styles.card}>
    <View style={styles.optionRow}>
      <Text style={styles.optionLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: "#DEDEDE", true: "#319F43" }}
        thumbColor="#FFFFFF"
      />
    </View>
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
    paddingVertical: 5,
    paddingHorizontal: 16,
  },
  optionLabel: {
    fontSize: 16,
    color: "#2479CF",
    fontFamily: "Poppins-SemiBold",
  },
});

export default SettingCard;
