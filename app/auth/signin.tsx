import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { LinearGradient } from "expo-linear-gradient";
import { router, useNavigation } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
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
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { persistUser } from "../../utils/authLoader";
import { AppDispatch, RootState } from "../store";
import {
  useLoginMutation,
  useSocialLoginFacebookMutation,
  useSocialLoginGoogleMutation,
} from "./usersApiSlice";

WebBrowser.maybeCompleteAuthSession();

// When you use expo-auth-session/providers/google, Expo generates a redirect URI like:
// On dev: exp://YOUR_LOCAL_IP:8081
// On Expo Go: https://auth.expo.io/@your-username/your-app-slug
// On production build: yourapp://redirect

const SignIn = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();


  // --- GOOGLE LOGIN ---
  const [requestGoogle, responseGoogle, promptGoogle] = Google.useAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_ID,
    responseType: "id_token",
    scopes: ["openid", "profile", "email"],
    redirectUri: AuthSession.makeRedirectUri({
      native: "prefai:/oauthredirect", // for standalone builds
    }),
  });

  const [socialLoginGoogle] = useSocialLoginGoogleMutation();

  // const [requestFb, responseFb, promptFb] = Facebook.useAuthRequest(
  //   {
  //     clientId: process.env.EXPO_PUBLIC_FACEBOOK_ID!,
  //     scopes: ["public_profile", "email"],
  //   },
  //   {
  //     useProxy: isExpoGo, // ✅ required for Expo Go
  //   }
  // );

  const [socialLoginFacebook] = useSocialLoginFacebookMutation();
  // useEffect(() => {
  //   const handleFbResponse = async () => {
  //     if (
  //       responseFb?.type === "success" &&
  //       responseFb.authentication?.accessToken
  //     ) {
  //       try {
  //         // Fetch Facebook user profile
  //         const res = await fetch(
  //           `https://graph.facebook.com/me?access_token=${responseFb.authentication.accessToken}&fields=id,name,email,picture.type(large)`
  //         );
  //         const fbUser = await res.json();

  //         // Call your backend mutation
  //         const user = await socialLoginFacebook(fbUser).unwrap();
  //         await dispatch(persistUser(user));

  //         Toast.show({ type: "success", text1: "Logged In with Facebook" });
  //         router.replace("/");
  //       } catch (err) {
  //         Toast.show({ type: "error", text1: "Facebook login failed" });
  //       }
  //     }
  //   };
  //   handleFbResponse();
  // }, [dispatch, responseFb, socialLoginFacebook]);



  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

    useEffect(() => {
    if (userInfo) {
      router.replace("/");
    }
  }, [userInfo]);

  useEffect(() => {
    const handleGoogleResponse = async () => {
      if (responseGoogle?.type === "success") {
        const idToken = responseGoogle.params.id_token;
        if (idToken) {
          try {
            const user = await socialLoginGoogle({ idToken }).unwrap();
            await dispatch(persistUser(user));
            Toast.show({ type: "success", text1: "Logged In with Google" });
            router.replace("/");
          } catch {
            Toast.show({ type: "error", text1: "Google login failed" });
          }
        }
      }
    };
    handleGoogleResponse();
  }, [dispatch, responseGoogle, socialLoginGoogle]);

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Please enter email and password.",
      });
      return;
    }
    try {
      const user = await login({ email, password }).unwrap();
      await dispatch(persistUser(user));
      Toast.show({
        type: "success",
        text1: "Logged In Successful",
      });
      router.replace("/");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Logged In Failed",
      });
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
            <Text style={styles.logo}>{t("prefai")}</Text>
            <Image
              source={require("../../assets/images/prefAI.png")}
              style={styles.icon}
              resizeMode="contain"
            />
            <Text style={styles.title}>{t("signin")}</Text>
            <Text style={styles.subtitle}>
              {t("enterYourPersonalDataToEnterThePlatform")}
            </Text>

            <View style={styles.socialButtonsContainer}>
              {/* Google */}
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => promptGoogle()}
                disabled={!requestGoogle}
              >
                <Image
                  source={require("../../assets/images/google.png")}
                  style={styles.socialIcon}
                />
                <Text style={styles.socialButtonText}>{t("google")}</Text>
              </TouchableOpacity>

              {/* Facebook */}
              <TouchableOpacity
                style={styles.socialButton}
                // onPress={() => promptFb()}
                // disabled={!requestFb}
              >
                <Image
                  source={require("../../assets/images/facebook.png")}
                  style={styles.socialIcon}
                />
                <Text style={styles.socialButtonText}>{t("facebook")}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.orText}>{t("or")}</Text>
              <View style={styles.line} />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{t("email")}</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="e.g. Johndoe@mail.com"
                placeholderTextColor="#ccc"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Text style={styles.inputLabel}>{t("password")}</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder={t("enterYourPassword")}
                placeholderTextColor="#ccc"
                secureTextEntry
                style={styles.input}
                autoCapitalize="none"
              />
            </View>
          </ScrollView>

          <View
            style={[
              styles.actionButtonsContainer,
              { paddingBottom: insets.bottom + 10 },
            ]}
          >
            <TouchableOpacity
              style={styles.bottomButtonSignUp}
              onPress={() => router.push("/auth/signup")}
            >
              <Text style={styles.bottomButtonTextSignUp}>{t("signup")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.bottomButtonLogIn}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.bottomButtonTextLogIn}>{t("login")}</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default SignIn;

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
    paddingHorizontal: 24,
    paddingTop: 16,
    backgroundColor: "transparent",
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
