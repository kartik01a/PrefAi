import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotFoundScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* <Image
          source={require("../assets/404.png")}
          style={styles.image}
          resizeMode="contain"
        /> */}

        <Text style={styles.title}>404</Text>
        <Text style={styles.subtitle}>Page Not Found</Text>
        <Text style={styles.description}>
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")} // Change this route as needed
        >
          <Text style={styles.buttonText}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 32,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#0052A5",
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 8,
    color: "#333",
  },
  description: {
    textAlign: "center",
    fontSize: 16,
    color: "#7e8292",
    marginTop: 12,
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#0052A5",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
