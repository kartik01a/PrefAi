import { LinearGradient } from "expo-linear-gradient";
import { router, useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
const SignIn = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  return (
    <LinearGradient colors={["#0072BB", "#003972"]} style={styles.container}>
      <View style={styles.innerContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.logo}>PrefAI</Text>
          <Image
            source={require("../../assets/images/prefAI.png")}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subtitle}>
            Enter your personal data to enter the platform
          </Text>

          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require("../../assets/images/google.png")}
                style={styles.socialIcon}
              />
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require("../../assets/images/facebook.png")}
                style={styles.socialIcon}
              />
              <Text style={styles.socialButtonText}>Facebook</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              placeholder="e.g. Johndoe@mail.com"
              placeholderTextColor="#ccc"
              style={styles.input}
            />

            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              placeholder="enter your password"
              placeholderTextColor="#ccc"
              secureTextEntry
              style={styles.input}
            />
          </View>
        </ScrollView>

        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={styles.bottomButtonSignUp}
            onPress={() => router.push("/auth/signup")}
          >
            <Text style={styles.bottomButtonTextSignUp}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomButtonLogIn}
            onPress={() => router.push("/")}
          >
            <Text style={styles.bottomButtonTextLogIn}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  socialIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
    resizeMode: "contain",
  },
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  scrollContainer: {
    padding: 24,
    paddingBottom: 40,
    alignItems: "center",
    flexGrow: 1,
  },
  logo: {
    fontSize: 24,
    fontFamily: "Poppins-SemiBold",
    color: "#fff",
    marginBottom: 8,
    marginTop: 12,
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "white",
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    marginBottom: 20,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
    width: "100%",
  },

  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#868282",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  socialButtonText: {
    color: "#fff",
    fontFamily: "Poppins-Medium",
    fontSize: 16,
  },
  iconMargin: {
    marginRight: 8,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
    width: "100%",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#868282",
  },
  orText: {
    marginHorizontal: 8,
    color: "#868282",
    fontFamily: "Poppins-semiBold",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 24,
  },
  inputLabel: {
    color: "white",
    marginBottom: 6,
    fontSize: 14,
    fontFamily: "Poppins-semiBold",
  },
  input: {
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    color: "#868282",
    borderColor: "white",
    backgroundColor: "white",
    fontFamily: "Poppins-semiBold",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    gap: 12,
    padding: 24,
    marginBottom: 30,
  },
  bottomButtonLogIn: {
    flex: 1,
    backgroundColor: "#2479CF",
    borderColor: "#2479CF",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  bottomButtonTextLogIn: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },
  bottomButtonSignUp: {
    flex: 1,
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  bottomButtonTextSignUp: {
    color: "#2479CF",
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },
});
