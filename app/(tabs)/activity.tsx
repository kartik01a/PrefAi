import React from "react";
import { StyleSheet, Text } from "react-native";
import BaseLayout from "../../components/BaseLayout";

const ActivityTab = () => {
  return (
    <BaseLayout edges={["left", "right"]}>
      <Text style={[styles.title, { color: "#fff" }]}>Activity</Text>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "bold",
    paddingTop: 30,
    paddingHorizontal: 20,
  },
});
export default ActivityTab;
