import ChatHeader from "@/components/Chat/ChatHeader";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import * as Speech from "expo-speech";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSentMessageToTranslateMutation } from "./aiform/chatApiSlice";

interface Language {
  code: string;
  name: string;
  voiceCode: string;
}

const languages: Language[] = [
  { code: "en", name: "English", voiceCode: "en-US" },
  { code: "fr", name: "Français", voiceCode: "fr-FR" },
  { code: "es", name: "Español", voiceCode: "es-ES" },
  { code: "de", name: "Deutsch", voiceCode: "de-DE" },
  { code: "it", name: "Italiano", voiceCode: "it-IT" },
  { code: "pt", name: "Português", voiceCode: "pt-BR" },
  { code: "ru", name: "Русский", voiceCode: "ru-RU" },
  { code: "ja", name: "日本語", voiceCode: "ja-JP" },
  { code: "ko", name: "한국어", voiceCode: "ko-KR" },
  { code: "zh", name: "中文", voiceCode: "zh-CN" },
  { code: "ar", name: "العربية", voiceCode: "ar-SA" },
  { code: "hi", name: "हिन्दी", voiceCode: "hi-IN" },
];

const VoiceTranslationScreen: React.FC = () => {
  const [inputLanguage, setInputLanguage] = useState("en");
  const [outputLanguage, setOutputLanguage] = useState("fr");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [pulseAnimation] = useState(new Animated.Value(1));
  const [showVoiceUnavailable, setShowVoiceUnavailable] = useState(false);

  const [sendToTranslate] = useSentMessageToTranslateMutation();

  useEffect(() => {
    if (__DEV__) {
      setShowVoiceUnavailable(true);
    }
  }, []);

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopPulseAnimation = () => {
    pulseAnimation.stopAnimation();
    Animated.timing(pulseAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const translateText = async (text?: string) => {
    const textToTranslate = text || inputText;
    if (!textToTranslate.trim()) return;

    setIsTranslating(true);
    try {
      const data = {
        text: textToTranslate,
        from: inputLanguage,
        to: outputLanguage,
      };

      // Timeout wrapper
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timeout")), 10000)
      );

      const result: any = await Promise.race([
        sendToTranslate(data).unwrap(),
        timeoutPromise,
      ]);

      if (result?.reply?.success) {
        const translated = result.reply.translatedText;
        setOutputText(translated);
        speakText(translated, outputLanguage);
      } else {
        Alert.alert("Translation Error", "Failed to translate text");
      }
    } catch (error: any) {
      console.log("Translation error:", error);

      let errorMessage = "Translation failed. Please try again.";
      if (error.message === "Request timeout") {
        errorMessage = "Translation timed out. Please check your connection.";
      } else if (error.message?.includes("network")) {
        errorMessage = "Network error. Please check your internet connection.";
      }

      Alert.alert("Error", errorMessage);
    } finally {
      setIsTranslating(false);
    }
  };

  const speakText = async (text: string, languageCode: string) => {
    try {
      Speech.stop();
      const language = languages.find((l) => l.code === languageCode);
      Speech.speak(text, {
        language: language?.voiceCode || "en-US",
        pitch: 1,
        rate: 0.9,
      });
    } catch (error) {
      console.error("Speech error:", error);
    }
  };

  const swapLanguages = () => {
    setInputLanguage(outputLanguage);
    setOutputLanguage(inputLanguage);
    setInputText(outputText);
    setOutputText(inputText);
  };

  const clearText = () => {
    setInputText("");
    setOutputText("");
  };

  const handleVoicePress = () => {
    Alert.alert(
      "Voice Recognition Unavailable",
      "Voice input is not available in Expo Go. Please type your text or build a standalone app for full voice features."
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
      <StatusBar />
      <LinearGradient
        colors={["#0072BB", "#4fa4f3ff"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.container}>
          {/* Header */}
          <ChatHeader showDate={false} />

          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {showVoiceUnavailable ? "Text Translator" : "Translate My Voice"}
            </Text>
            {showVoiceUnavailable && (
              <Text style={styles.subtitle}>
                Voice features available in standalone app
              </Text>
            )}
          </View>

          {/* Wave Animation */}
          <View style={styles.waveContainer}>
            <View style={styles.waveInner}>
              <View style={styles.waveAnimationContainer}>
                {[...Array(5)].map((_, index) => (
                  <Animated.View
                    key={index}
                    style={[
                      styles.waveLine,
                      {
                        width: 200 + index * 40,
                        transform: [
                          {
                            scaleX: isTranslating
                              ? Math.sin(Date.now() * 0.01 + index) * 0.5 + 1
                              : 1,
                          },
                        ],
                      },
                    ]}
                  />
                ))}
              </View>
              {isTranslating && (
                <View style={styles.listeningTextContainer}>
                  <Text style={styles.listeningText}>Translating...</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          {/* Language Pickers */}
          <View style={styles.languageRow}>
            <View style={styles.languageColumn}>
              <Text style={styles.languageLabel}>From</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={inputLanguage}
                  onValueChange={setInputLanguage}
                  style={styles.picker}
                >
                  {languages.map((lang) => (
                    <Picker.Item
                      label={lang.name}
                      value={lang.code}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <TouchableOpacity onPress={swapLanguages} style={styles.swapButton}>
              <Ionicons name="swap-horizontal" size={24} color="#3B82F6" />
            </TouchableOpacity>

            <View style={styles.languageColumn}>
              <Text style={styles.languageLabel}>To</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={outputLanguage}
                  onValueChange={setOutputLanguage}
                  style={styles.picker}
                >
                  {languages.map((lang) => (
                    <Picker.Item
                      label={lang.name}
                      value={lang.code}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </View>

          {/* Text Areas */}
          <ScrollView
            style={styles.textAreasContainer}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <View style={styles.textAreaWrapper}>
              <TextInput
                style={[styles.textArea, styles.textInput]}
                value={inputText}
                onChangeText={setInputText}
                placeholder="Type your text here or press microphone"
                placeholderTextColor="#9CA3AF"
                multiline
                textAlignVertical="top"
                onSubmitEditing={() => translateText()}
                returnKeyType="done"
              />
            </View>

            {isTranslating && (
              <View style={styles.translatingContainer}>
                <Text style={styles.translatingText}>Translating...</Text>
              </View>
            )}

            <View style={styles.textAreaWrapper}>
              <Text
                style={[styles.textArea, !outputText && styles.placeholderText]}
              >
                {outputText || "Translation will appear here"}
              </Text>
            </View>
          </ScrollView>

          {/* Bottom Controls */}
          <View style={styles.bottomControls}>
            <TouchableOpacity style={styles.controlButton} onPress={clearText}>
              <Ionicons name="trash-outline" size={24} color="#6B7280" />
            </TouchableOpacity>

            <Animated.View style={{ transform: [{ scale: pulseAnimation }] }}>
              <TouchableOpacity
                onPress={handleVoicePress}
                style={[
                  styles.micButton,
                  {
                    backgroundColor: showVoiceUnavailable
                      ? "#9CA3AF"
                      : "#3B82F6",
                    opacity: showVoiceUnavailable ? 0.6 : 1,
                  },
                ]}
                disabled={isTranslating}
              >
                <Ionicons
                  name={showVoiceUnavailable ? "mic-off" : "mic"}
                  size={28}
                  color="white"
                />
              </TouchableOpacity>
            </Animated.View>

            <TouchableOpacity
              style={[
                styles.controlButton,
                {
                  backgroundColor: inputText ? "#3B82F6" : "transparent",
                  borderRadius: 8,
                  paddingHorizontal: 16,
                },
              ]}
              onPress={() => translateText()}
              disabled={!inputText || isTranslating}
            >
              <Ionicons
                name="language"
                size={24}
                color={inputText ? "white" : "#6B7280"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => outputText && speakText(outputText, outputLanguage)}
              disabled={!outputText}
            >
              <Ionicons
                name="play"
                size={24}
                color={outputText ? "#3B82F6" : "#6B7280"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  safeArea: { flex: 1 },
  gradient: { flex: 1, paddingTop: 30 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  languageSelector: {
    flexDirection: "row",
    alignItems: "center",
  },
  languageText: {
    color: "white",
    fontSize: 14,
    marginLeft: 4,
  },
  titleContainer: {
    alignItems: "center",
    marginTop: 4,
  },
  title: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 12,
    marginTop: 4,
  },
  listeningIndicator: {
    color: "white",
    fontSize: 14,
    marginTop: 8,
    opacity: 0.8,
  },
  waveContainer: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  waveInner: {
    height: 64,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  waveAnimationContainer: {
    position: "absolute",
  },
  waveLine: {
    position: "absolute",
    height: 2,
    backgroundColor: "white",
    opacity: 0.3,
  },
  listeningTextContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginTop: 20,
    maxWidth: "80%",
  },
  listeningText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  bottomContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  languageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  languageColumn: {
    flex: 1,
  },
  languageLabel: {
    color: "#6B7280",
    fontSize: 14,
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
  },
  picker: {
    height: 50,
  },
  swapButton: {
    marginHorizontal: 2,
    padding: 8,
    height: 50,
  },
  textAreasContainer: {
    flex: 1,
    height: 400,
  },
  textAreaWrapper: {
    marginBottom: 16,
  },
  textArea: {
    color: "#1F2937",
    fontSize: 16,
    lineHeight: 24,
    minHeight: 80,
    padding: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  placeholderText: {
    color: "#9CA3AF",
    fontStyle: "italic",
  },
  translatingContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  translatingText: {
    color: "#3B82F6",
    fontSize: 14,
  },
  bottomControls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  controlButton: {
    padding: 12,
  },
  micButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 24,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  languageIndicator: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
  flagContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  flagIcon: {
    width: 16,
    height: 12,
    backgroundColor: "#3B82F6",
    borderRadius: 2,
  },
});

export default VoiceTranslationScreen;