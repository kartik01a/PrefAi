// app/SuccessScreen.tsx
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const SuccessScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleBackHome = () => {
    router.push("/"); 
  };

  return (
    <SafeAreaProvider>
      <LinearGradient colors={["#0072BB", "#003972"]} style={styles.container}>
        <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
          <View style={styles.content}>
            <View style={styles.iconWrapper}>
              <Feather name="check-circle" size={80} color="#00FFB3" />
            </View>
            <Text style={styles.title}>Payment Successful!</Text>
            <Text style={styles.subtitle}>
              Your subscription has been activated successfully.
            </Text>

            <Image
              source={require("../assets/images/success.png")}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          <TouchableOpacity style={styles.backButton} onPress={handleBackHome}>
            <Text style={styles.backButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 24,
    marginTop: 60,
  },
  iconWrapper: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#E0F4FF",
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  image: {
    width: 160,
    height: 160,
    marginTop: 10,
  },
  backButton: {
    backgroundColor: "#2479CF",
    borderRadius: 10,
    marginHorizontal: 24,
    marginBottom: 30,
    paddingVertical: 14,
    alignItems: "center",
  },
  backButtonText: {
    color: "white",
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },
});
