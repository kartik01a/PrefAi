import React from "react";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import BaseLayout from "../../components/BaseLayout";

const ActivityTab = () => {
  const colorScheme = useColorScheme();
  return (
    <BaseLayout edges={["left", "right"]}>
      <Text
        style={[
          styles.title,
          { color: colorScheme === "dark" ? "#fff" : "#000" },
        ]}
      >
        Explore
      </Text>

      <View
        style={[
          styles.searchContainer,
          {
            backgroundColor: colorScheme === "dark" ? "#1C1C1E" : "#F2F2F7",
            borderColor: colorScheme === "dark" ? "#333" : "#E5E5EA",
          },
        ]}
      ></View>

      <View style={styles.categoryContainer}>
        <Text
          style={[
            styles.sectionTitle,
            { color: colorScheme === "dark" ? "#fff" : "#000" },
          ]}
        >
          Categories
        </Text>

        <View style={styles.categoryGrid}>
          {["Travel", "Food", "Tech", "Sports", "Music", "Art"].map(
            (category) => (
              <View
                key={category}
                style={[
                  styles.categoryCard,
                  {
                    backgroundColor:
                      colorScheme === "dark" ? "#1C1C1E" : "#F2F2F7",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    { color: colorScheme === "dark" ? "#fff" : "#000" },
                  ]}
                >
                  {category}
                </Text>
              </View>
            )
          )}
        </View>
      </View>

      <View style={styles.trendsContainer}>
        <Text
          style={[
            styles.sectionTitle,
            { color: colorScheme === "dark" ? "#fff" : "#000" },
          ]}
        >
          Trending
        </Text>

        {[1, 2, 3].map((item) => (
          <View
            key={item}
            style={[
              styles.trendCard,
              {
                backgroundColor: colorScheme === "dark" ? "#1C1C1E" : "#F2F2F7",
              },
            ]}
          >
            <Text
              style={[
                styles.trendTitle,
                { color: colorScheme === "dark" ? "#fff" : "#000" },
              ]}
            >
              Trending Item {item}
            </Text>
            <Text
              style={[
                styles.trendDescription,
                { color: colorScheme === "dark" ? "#8E8E93" : "#8E8E93" },
              ]}
            >
              This is a trending item that you might be interested in exploring.
            </Text>
          </View>
        ))}
      </View>
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
