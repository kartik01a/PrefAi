import React from "react";
import { StyleSheet, Text } from "react-native";
import BaseLayout from "../../components/BaseLayout";

const ActivityTab = () => {
  return (
    <BaseLayout edges={["left", "right", "top"]}>
      <Text
        style={[
          styles.title,
          { color: "#fff" },
        ]}
      >
        Activity
      </Text>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 24,
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 4,
  },
  categoryContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  categoryCard: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 80,
    alignItems: "center",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
  },
  trendsContainer: {
    marginBottom: 24,
  },
  trendCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  trendTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  trendDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});
export default ActivityTab;
