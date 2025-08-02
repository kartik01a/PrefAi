import { setUserIdOnly } from "@/features/auth/authSlice";
import { LinearGradient } from "expo-linear-gradient";
import { router, useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useRegisterMutation } from "./usersApiSlice";

const SignUp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [password, setPassword] = useState("");

  const [register, { isLoading }] = useRegisterMutation();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleSignUp = async () => {
    try {
      const response = await register({
        firstName,
        lastName,
        email,
        password,
        confirmPassword: password,
        passportNumber,
        role: "USER",
        provider: "manual",
      }).unwrap();
      console.log("register", response )
      const userId = response?.data?._id;
      await dispatch(setUserIdOnly(userId));
      router.push("/auth/welcomepage");
    } catch (error: any) {
      console.error("❌ Register failed:", JSON.stringify(error, null, 2));
      Alert.alert(
        "Registration Error",
        error?.data?.message || "Something went wrong."
      );
    }
  };

  return (
    <LinearGradient colors={["#0072BB", "#003972"]} style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View style={[styles.innerContainer, { paddingTop: insets.top }]}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.logo}>PrefAI</Text>
            <Image
              source={require("../../assets/images/prefAI.png")}
              style={styles.icon}
              resizeMode="contain"
            />
            <Text style={styles.title}>Sign Up Account</Text>
            <Text style={styles.subtitle}>
              Enter your personal data to create your account.
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

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.orText}>or</Text>
              <View style={styles.line} />
            </View>

            {/* Input Fields */}
            <View style={styles.inputContainer}>
              <View style={styles.row}>
                <View style={styles.halfInputWrapper}>
                  <Text style={styles.inputLabel}>First Name</Text>
                  <TextInput
                    placeholder="e.g. John"
                    placeholderTextColor="#ccc"
                    style={styles.input}
                    autoCapitalize="words"
                    value={firstName}
                    onChangeText={setFirstName}
                  />
                </View>
                <View style={styles.halfInputWrapper}>
                  <Text style={styles.inputLabel}>Last Name</Text>
                  <TextInput
                    placeholder="e.g. Doe"
                    placeholderTextColor="#ccc"
                    style={styles.input}
                    autoCapitalize="words"
                    value={lastName}
                    onChangeText={setLastName}
                  />
                </View>
              </View>

              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                placeholder="e.g. Johndoe@mail.com"
                placeholderTextColor="#ccc"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />

              <Text style={styles.inputLabel}>Passport Number</Text>
              <TextInput
                placeholder="e.g. XAU000"
                placeholderTextColor="#ccc"
                style={styles.input}
                autoCapitalize="characters"
                value={passportNumber}
                onChangeText={setPassportNumber}
              />

              <Text style={styles.inputLabel}>Create Password</Text>
              <TextInput
                placeholder="create your password"
                placeholderTextColor="#ccc"
                secureTextEntry
                style={styles.input}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View
            style={[
              styles.actionButtonsContainer,
              { paddingBottom: insets.bottom + 10 },
            ]}
          >
            <TouchableOpacity
              style={styles.bottomButtonSignUp}
              onPress={handleSignUp}
              disabled={isLoading}
            >
              <Text style={styles.bottomButtonTextSignUp}>
                {isLoading ? "Signing Up..." : "Sign Up"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.bottomButtonLogIn}
              onPress={() => router.push("/auth/signin")}
            >
              <Text style={styles.bottomButtonTextLogIn}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  scrollContainer: {
    padding: 24,
    paddingBottom: 20,
    alignItems: "center",
    flexGrow: 1,
    minHeight: "100%",
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
  socialIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
    resizeMode: "contain",
  },
  socialButtonText: {
    color: "#fff",
    fontFamily: "Poppins-Medium",
    fontSize: 16,
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
    marginBottom: 100,
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
    color: "#333",
    borderColor: "white",
    backgroundColor: "white",
    fontFamily: "Poppins-semiBold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  halfInputWrapper: {
    flex: 1,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 24,
    paddingTop: 16,
    backgroundColor: "transparent",
  },
  bottomButtonLogIn: {
    flex: 1,
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  bottomButtonTextLogIn: {
    color: "#2479CF",
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },
  bottomButtonSignUp: {
    flex: 1,
    backgroundColor: "#2479CF",
    borderColor: "#2479CF",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  bottomButtonTextSignUp: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },
});
