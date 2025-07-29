import React from "react";
import { Text, View } from "react-native";
import { styles } from "./stepStyles";

export const Step4 = () => {
  const bulletPoints = [
    "A detailed type written description of the project, not more than two pages in length.",
    "Visual materials (photographs, catalogues, video, slides or CDRom PC and Mac compatible).",
    "Biographies and/or resumes of the artists.",
    "Description of the institution and related press.",
    "Please indicate the importance of French-American collaboration in your project.",
  ];

  return (
    <View style={{ paddingVertical: 16, gap: 12 }}>
      <Text style={[styles.label, { marginBottom: 8 }]}>We require:</Text>
      {bulletPoints.map((item, index) => (
        <View key={index} style={{ flexDirection: "row", alignItems: "flex-start" }}>
          <Text style={{ fontSize: 16, marginRight: 8 }}>•</Text>
          <Text style={[styles.label, { flex: 1 }]}>{item}</Text>
        </View>
      ))}
    </View>
  );
};
