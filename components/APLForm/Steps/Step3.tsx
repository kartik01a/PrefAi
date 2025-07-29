import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ProjectCategories } from "../formData";
import { styles } from "./stepStyles";

interface Step3Props {
  projectCategories: ProjectCategories;
  setProjectCategories: (data: Partial<ProjectCategories>) => void;
}

export const Step3 = ({ projectCategories, setProjectCategories }: Step3Props) => {
  const toggleCheckbox = (field: keyof ProjectCategories) => {
    setProjectCategories({
      [field]: projectCategories[field] ? "" : "yes",
    });
  };

  const categoryItems = [
    { key: "soloExhibit", label: "Solo Exhibit" },
    { key: "painting", label: "Painting" },
    { key: "photography", label: "Photography" },
    { key: "groupExhibit", label: "Group Exhibit" },
    { key: "artPublication", label: "Art Publication" },
    { key: "vidoNewMdia", label: "Video / New Media" },
    { key: "Residency", label: "Residency" },
    { key: "TravelingExhibit", label: "Traveling Exhibit" },
    { key: "installation", label: "Installation" },
    { key: "performance", label: "Performance" },
    { key: "other", label: "Other" },
  ] as const;

  return (
    <View style={{ gap: 16 }}>
      {categoryItems.map(({ key, label }) => (
        <TouchableOpacity
          key={key}
          onPress={() => toggleCheckbox(key)}
          style={[
            styles.inputContainerFull,
            {
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#D9D9D9",
              borderRadius: 10,
              backgroundColor: "#F2F2F2",
              paddingHorizontal: 12,
              height: 48,
            },
          ]}
        >
          <MaterialCommunityIcons
            name={projectCategories[key] ? "checkbox-marked" : "checkbox-blank-outline"}
            size={22}
            color="#2479CF"
              style={{ marginRight: 10 }}
          />
          <Text style={styles.checkBoxText}>
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
