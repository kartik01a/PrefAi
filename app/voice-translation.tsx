import ChatHeader from "@/components/Chat/ChatHeader";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import Voice, {
  SpeechErrorEvent,
  SpeechRecognizedEvent,
  SpeechResultsEvent,
} from "@react-native-voice/voice";
import { LinearGradient } from "expo-linear-gradient";
import * as Speech from "expo-speech";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Animated,
  Easing,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
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
  const [inputLanguage, setInputLanguage] = useState<string>("en");
  const [outputLanguage, setOutputLanguage] = useState<string>("fr");
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [micAnimation] = useState(new Animated.Value(1));
  const [listeningText, setListeningText] = useState<string>("");

  const [sendToTranslate] = useSentMessageToTranslateMutation();

  useEffect(() => {
    const setupVoice = async () => {
      try {
        // Check if voice recognition is available
        const isAvailable = await Voice.isAvailable();
        console.log("Voice recognition available:", isAvailable);

        // Set up voice recognition events
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechRecognized = onSpeechRecognized;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechError = onSpeechError;
        Voice.onSpeechResults = onSpeechResults;
        Voice.onSpeechPartialResults = onSpeechPartialResults;
      } catch (error) {
        console.error("Error setting up voice recognition:", error);
      }
    };

    setupVoice();

    return () => {
      // Clean up voice recognition
      Voice.destroy()
        .then(() => {
          Voice.removeAllListeners();
        })
        .catch((error) => {
          console.error("Error cleaning up voice recognition:", error);
        });
    };
  }, []);

  useEffect(() => {
    if (isListening) {
      startPulseAnimation();
    } else {
      stopPulseAnimation();
    }
  }, [isListening]);

  const onSpeechStart = (e: any) => {
    console.log("Speech recognition started");
    setListeningText("Listening...");
  };

  const onSpeechRecognized = (e: SpeechRecognizedEvent) => {
    console.log("Speech recognized", e);
  };

  const onSpeechEnd = (e: any) => {
    console.log("Speech recognition ended");
    setIsListening(false);
  };

  const onSpeechError = (e: SpeechErrorEvent) => {
    console.log("Speech recognition error:", e.error);
    setIsListening(false);
    setListeningText("");

    let errorMessage = "Speech recognition failed. Please try again.";

    if (e.error?.message) {
      if (e.error.message.includes("network")) {
        errorMessage = "Network error. Please check your connection.";
      } else if (e.error.message.includes("permission")) {
        errorMessage =
          "Microphone permission denied. Please enable it in settings.";
      } else if (e.error.message.includes("busy")) {
        errorMessage = "Speech recognition is busy. Please wait and try again.";
      }
    }

    Alert.alert("Speech Recognition Error", errorMessage);
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    console.log("Speech results:", e.value);

    if (e.value && e.value.length > 0) {
      const recognizedText = e.value[0];
      setInputText(recognizedText);
      setListeningText("");
      translateText(recognizedText);
    }

    setIsListening(false);
  };

  const onSpeechPartialResults = (e: SpeechResultsEvent) => {
    console.log("Partial results:", e.value);

    if (e.value && e.value.length > 0) {
      setListeningText(e.value[0]);
    }
  };

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(micAnimation, {
          toValue: 1.2,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(micAnimation, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopPulseAnimation = () => {
    micAnimation.stopAnimation();
    Animated.timing(micAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const requestMicrophonePermission = async (): Promise<boolean> => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: "Microphone Permission",
            message:
              "This app needs access to your microphone to record voice for translation.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const startListening = async () => {
    try {
      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) {
        Alert.alert(
          "Permission Required",
          "Microphone permission is required for voice translation."
        );
        return;
      }
      setListeningText("");
      setIsListening(true);

      const inputLang = languages.find((lang) => lang.code === inputLanguage);
      const locale = inputLang?.voiceCode || "en-US";

      await Voice.start(locale);
    } catch (error) {
      console.log("Error starting voice recognition:", error);
      setIsListening(false);
      Alert.alert(
        "Voice Recognition Error",
        "Unable to start voice recognition. Please make sure you have granted microphone permissions."
      );
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
      setListeningText("");
    } catch (error) {
      console.error("Error stopping voice recognition:", error);
      setIsListening(false);
      setListeningText("");
    }
  };

  const translateText = async (text: string) => {
    if (!text.trim()) return;

    setIsTranslating(true);
    try {
      const data = {
        text: text,
        from: inputLanguage,
        to: outputLanguage,
      };
      const result = await sendToTranslate(data);

      console.log(result.data, "result");

      if (result?.data?.reply?.success) {
        setOutputText(result?.data?.reply.translatedText);
        speakText(result?.data?.reply.translatedText, outputLanguage);
      } else {
        Alert.alert("Translation Error", "Failed to translate text");
      }
    } catch (error) {
      console.log("Translation error:", error);
      Alert.alert("Error", "Translation failed. Please check your connection.");
    } finally {
      setIsTranslating(false);
    }
  };

  const speakText = async (text: string, languageCode: string) => {
    try {
      await Speech.stop();

      const language = languages.find((lang) => lang.code === languageCode);

      Speech.speak(text, {
        language: language?.voiceCode || "en-US",
        pitch: 1,
        rate: 0.8,
      });
    } catch (error) {
      console.error("Speech error:", error);
    }
  };

  const swapLanguages = () => {
    const temp = inputLanguage;
    setInputLanguage(outputLanguage);
    setOutputLanguage(temp);

    // Also swap the texts
    const tempText = inputText;
    setInputText(outputText);
    setOutputText(tempText);
  };

  const clearText = () => {
    setInputText("");
    setOutputText("");
    setListeningText("");
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
            <Text style={styles.title}>Translate My Voice</Text>
            {isListening && (
              <Text style={styles.listeningIndicator}>🎤 Listening...</Text>
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
                            scaleX: isListening
                              ? Math.sin(Date.now() * 0.01 + index) * 0.5 + 1
                              : 1,
                          },
                        ],
                      },
                    ]}
                  />
                ))}
              </View>

              {listeningText && (
                <View style={styles.listeningTextContainer}>
                  <Text style={styles.listeningText}>{listeningText}</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        <View style={styles.bottomContainer}>
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
                      key={lang.code}
                      label={lang.name}
                      value={lang.code}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            {/* Swap Button */}
            <TouchableOpacity onPress={swapLanguages} style={styles.swapButton}>
              <Ionicons name="swap-horizontal" size={24} color="#3B82F6" />
            </TouchableOpacity>

            {/* Output Language */}
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
                      key={lang.code}
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
            showsVerticalScrollIndicator={true}
          >
            {/* Input Text */}
            <View style={styles.textAreaWrapper}>
              <Text
                style={[styles.textArea, !inputText && styles.placeholderText]}
              >
                {inputText || "Press microphone to speak"}
              </Text>
            </View>

            {/* Translation Status */}
            {isTranslating && (
              <View style={styles.translatingContainer}>
                <Text style={styles.translatingText}>Translating...</Text>
              </View>
            )}

            {/* Output Text */}
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
            {/* Clear Button */}
            <TouchableOpacity style={styles.controlButton} onPress={clearText}>
              <Ionicons name="trash-outline" size={24} color="#6B7280" />
            </TouchableOpacity>

            {/* Microphone Button */}
            <Animated.View style={{ transform: [{ scale: micAnimation }] }}>
              <TouchableOpacity
                onPress={isListening ? stopListening : startListening}
                style={[
                  styles.micButton,
                  { backgroundColor: isListening ? "#EF4444" : "#3B82F6" },
                ]}
                disabled={isTranslating}
              >
                <Ionicons
                  name={isListening ? "stop" : "mic"}
                  size={28}
                  color="white"
                />
              </TouchableOpacity>
            </Animated.View>

            {/* Play Button */}
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() =>
                outputText && speakText(outputText, outputLanguage)
              }
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
