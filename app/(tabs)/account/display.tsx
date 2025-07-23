import BaseLayout from "@/components/BaseLayout";
import SettingCard from "@/components/SettingCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

const DisplayScreen = () => {
  const navigation = useNavigation();
  const [isLight, setIsLight] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isSystemSetting, setSystemSetting] = useState(false);


  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  return (
    <BaseLayout>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            accessibilityLabel="Go back"
            accessibilityRole="button"
          >
            <MaterialCommunityIcons
              name="arrow-left-top"
              size={20}
              color="white"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Account Management</Text>
          <Text style={styles.headerSubtitle}>Account {">"} Display</Text>
          <Text style={styles.sectionTitle}>Display Options</Text>
        </View>

        <View style={styles.content}>
          <SettingCard
            label="Light Mode"
            value={isLight}
            onChange={setIsLight}
          />
              <SettingCard
            label="Dark Mode"
            value={isDark}
            onChange={setIsDark}
          />
            <SettingCard
            label="Follow System Setting"
            value={isSystemSetting}
            onChange={setSystemSetting}
          />
           <Text style={styles.textStyle}>
                   You can choose how the app looks. Light mode is brighter, dark mode is easier on the eyes at night.
                  </Text>
        </View>
        
         
      </View>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 50 },
  header: {
    paddingBottom: 8,
    paddingHorizontal: 24,
  },
  backButton: { marginBottom: 12 },
  headerTitle: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "white",
  },
  headerSubtitle: {
    fontSize: 10,
    fontFamily: "Poppins-SemiBold",
    color: "white",
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "white",
    marginTop: 16,
  },
  content: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 24,
    paddingHorizontal: 24,
  },
    textStyle: {
    color: "#2479CF",
    fontFamily: "Poppins-regular",
    fontSize: 14,
  },
});

export default DisplayScreen;
