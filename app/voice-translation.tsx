import ChatHeader from "@/components/Chat/ChatHeader";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
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
  View
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
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [pulseAnimation] = useState(new Animated.Value(1));
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  const [sendToTranslate] = useSentMessageToTranslateMutation();

  useEffect(() => {
    setupAudio();
  }, []);

  useEffect(() => {
    const delayedTranslate = setTimeout(() => {
      if (inputText.trim() && !isRecording) {
        translateText(inputText);
      }
    }, 1000);

    return () => clearTimeout(delayedTranslate);
  }, [inputText, inputLanguage, outputLanguage]);

  const setupAudio = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
    } catch (error) {
      console.error('Error setting up audio:', error);
    }
  };

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.2,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 800,
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

  const startRecording = async () => {
    try {
      if (permissionResponse?.status !== 'granted') {
        console.log('Requesting permission..');
        await requestPermission();
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
      startPulseAnimation();
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
      Alert.alert('Error', 'Failed to start recording. Please check microphone permissions.');
    }
  };

  const stopRecording = async () => {
    console.log('Stopping recording..');
    setIsRecording(false);
    stopPulseAnimation();
    
    if (!recording) {
      setIsTranslating(false);
      return;
    }

    try {
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
      
      const uri = recording.getURI();
      console.log('Recording stopped and stored at', uri);
      
      setRecording(null);
      
      if (uri) {
        // Process the audio
        await processAudioToText(uri);
      } else {
        setIsTranslating(false);
        Alert.alert('Error', 'No audio recorded.');
      }
    } catch (error) {
      console.error('Error stopping recording:', error);
      setIsTranslating(false);
      Alert.alert('Error', 'Failed to stop recording.');
    }
  };

  const processAudioToText = async (audioUri: string) => {
    try {
      setIsTranslating(true);
      const fileInfo = await FileSystem.getInfoAsync(audioUri);
      if (!fileInfo.exists) {
        throw new Error('Audio file not found');
      }
      // for now prompt and in production speech-to-text service integration 
      Alert.prompt(
        'Voice Input',
        'Please type what you said (Speech recognition integration coming soon):',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => {
              setIsTranslating(false);
            },
          },
          {
            text: 'Translate',
            onPress: (text) => {
              if (text && text.trim()) {
                setInputText(text.trim());
                translateText(text.trim());
              } else {
                setIsTranslating(false);
              }
            },
          },
        ],
        'plain-text',
        ''
      );
      
    } catch (error) {
      console.error('Error processing audio:', error);
      Alert.alert('Error', 'Failed to process audio recording.');
      setIsTranslating(false);
    }
  };

  const translateText = async (text?: string) => {
    const textToTranslate = text || inputText;
    if (!textToTranslate.trim()) {
      setOutputText("");
      return;
    }
    if (inputLanguage === outputLanguage) {
      setOutputText(textToTranslate);
      return;
    }

    setIsTranslating(true);
    try {
      const data = {
        text: textToTranslate,
        from: inputLanguage,
        to: outputLanguage,
      };
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timeout")), 15000)
      );
      const result: any = await Promise.race([
        sendToTranslate(data).unwrap(),
        timeoutPromise,
      ]);
      if (result?.reply?.success) {
        const translated = result.reply.translatedText;
        setOutputText(translated);
        if (text && isRecording) {
          speakText(translated, outputLanguage);
        }
      } else {
        console.error("Translation failed:", result);
        Alert.alert("Translation Error", "Failed to translate text. Please try again.");
        setOutputText("");
      }
    } catch (error: any) {
      console.error("Translation error:", error);

      let errorMessage = "Translation failed. Please try again.";
      if (error.message === "Request timeout") {
        errorMessage = "Translation timed out. Please check your connection.";
      } else if (error.message?.includes("network")) {
        errorMessage = "Network error. Please check your internet connection.";
      } else if (error.status === 429) {
        errorMessage = "Too many requests. Please wait a moment and try again.";
      }

      Alert.alert("Error", errorMessage);
      setOutputText("");
    } finally {
      setIsTranslating(false);
    }
  };

  const speakText = async (text: string, languageCode: string) => {
    try {
      if (!text.trim()) return;
      
      Speech.stop();
      const language = languages.find((l) => l.code === languageCode);
      
      await Speech.speak(text, {
        language: language?.voiceCode || "en-US",
        pitch: 1,
        rate: 0.9,
        // quality: Speech.VoiceQuality.Enhanced,
      });
    } catch (error) {
      console.error("Speech error:", error);
      Alert.alert("Speech Error", "Failed to play audio. Please try again.");
    }
  };

  const swapLanguages = () => {
    const tempInput = inputLanguage;
    const tempInputText = inputText;
    
    setInputLanguage(outputLanguage);
    setOutputLanguage(tempInput);
    setInputText(outputText);
    setOutputText(tempInputText);
    
    // If there's text to translate after swapping, translate it
    if (outputText.trim()) {
      setTimeout(() => translateText(outputText), 100);
    }
  };

  const clearText = () => {
    setInputText("");
    setOutputText("");
    Speech.stop(); // Stop any ongoing speech
  };

  const handleVoicePress = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      // Check permissions first
      if (permissionResponse?.status !== 'granted') {
        const permission = await requestPermission();
        if (permission.status !== 'granted') {
          Alert.alert(
            'Microphone Permission Required',
            'Please enable microphone access in your device settings to use voice recording.',
            [
              { text: 'Settings', onPress: () => {
                // In a real app, you might open settings here
                console.log('Open settings');
              }},
              { text: 'Cancel', style: 'cancel' }
            ]
          );
          return;
        }
      }
      await startRecording();
    }
  };

  const handleManualTranslate = () => {
    if (!inputText.trim()) {
      Alert.alert("No Text", "Please enter some text to translate.");
      return;
    }
    translateText();
  };

  const getMicButtonStyle = () => {
    if (isRecording) {
      return [styles.micButton, styles.micButtonRecording];
    }
    return [styles.micButton, styles.micButtonNormal];
  };

  const getMicIcon = () => {
    if (isRecording) {
      return "stop";
    }
    return "mic";
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
            {(isRecording || isTranslating) && (
              <Text style={styles.subtitle}>
                {isRecording ? "Listening..." : "Processing..."}
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
                            scaleX: (isTranslating || isRecording)
                              ? Math.sin(Date.now() * 0.01 + index) * 0.5 + 1
                              : 1,
                          },
                        ],
                      },
                    ]}
                  />
                ))}
              </View>
              {(isTranslating || isRecording) && (
                <View style={styles.listeningTextContainer}>
                  <Text style={styles.listeningText}>
                    {isRecording ? "Listening..." : "Translating..."}
                  </Text>
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
                  onValueChange={(value) => {
                    setInputLanguage(value);
                    // Re-translate if there's existing text
                    if (inputText.trim()) {
                      setTimeout(() => translateText(), 100);
                    }
                  }}
                  style={styles.picker}
                  enabled={!isRecording && !isTranslating}
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

            <TouchableOpacity 
              onPress={swapLanguages} 
              style={styles.swapButton}
              disabled={isRecording || isTranslating}
            >
              <Ionicons name="swap-horizontal" size={24} color="#3B82F6" />
            </TouchableOpacity>

            <View style={styles.languageColumn}>
              <Text style={styles.languageLabel}>To</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={outputLanguage}
                  onValueChange={(value) => {
                    setOutputLanguage(value);
                    // Re-translate if there's existing text
                    if (inputText.trim()) {
                      setTimeout(() => translateText(), 100);
                    }
                  }}
                  style={styles.picker}
                  enabled={!isRecording && !isTranslating}
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

          <ScrollView
            style={styles.textAreasContainer}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <View style={styles.textAreaWrapper}>
              <TextInput
                style={[styles.textArea, styles.textInput]}
                value={inputText}
                onChangeText={(text) => {
                  setInputText(text);
                  if (!text.trim()) {
                    setOutputText("");
                  }
                }}
                placeholder="Type your text here or press microphone"
                placeholderTextColor="#9CA3AF"
                multiline
                textAlignVertical="top"
                editable={!isRecording}
                onSubmitEditing={() => {
                  if (inputText.trim()) {
                    translateText();
                  }
                }}
                returnKeyType="done"
                blurOnSubmit={true}
              />
            </View>

            {isTranslating && !isRecording && (
              <View style={styles.translatingContainer}>
                <Text style={styles.translatingText}>Translating...</Text>
              </View>
            )}

            <View style={styles.textAreaWrapper}>
              <TouchableOpacity 
                onPress={() => outputText && speakText(outputText, outputLanguage)}
                disabled={!outputText}
                style={styles.outputTextContainer}
              >
                <Text
                  style={[
                    styles.textArea, 
                    !outputText && styles.placeholderText,
                    outputText && styles.clickableOutput
                  ]}
                >
                  {outputText || "Translation will appear here"}
                </Text>
                {outputText && (
                  <View style={styles.speakIcon}>
                    <Ionicons name="volume-high" size={16} color="#3B82F6" />
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Bottom Controls */}
          <View style={styles.bottomControls}>
            <TouchableOpacity 
              style={styles.controlButton} 
              onPress={clearText}
              disabled={isRecording}
            >
              <Ionicons name="trash-outline" size={24} color="#6B7280" />
            </TouchableOpacity>

            <Animated.View style={{ transform: [{ scale: pulseAnimation }] }}>
              <TouchableOpacity
                onPress={handleVoicePress}
                style={getMicButtonStyle()}
                disabled={isTranslating && !isRecording}
              >
                <Ionicons
                  name={getMicIcon()}
                  size={28}
                  color="white"
                />
              </TouchableOpacity>
            </Animated.View>

            <TouchableOpacity
              style={[
                styles.controlButton,
                {
                  backgroundColor: inputText.trim() ? "#3B82F6" : "transparent",
                  borderRadius: 8,
                  paddingHorizontal: 16,
                },
              ]}
              onPress={handleManualTranslate}
              disabled={!inputText.trim() || isTranslating || isRecording}
            >
              <Ionicons
                name="language"
                size={24}
                color={inputText.trim() ? "white" : "#6B7280"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => outputText && speakText(outputText, outputLanguage)}
              disabled={!outputText || isRecording}
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
    justifyContent: "center",
    alignItems: "center",
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
  outputTextContainer: {
    position: "relative",
  },
  clickableOutput: {
    backgroundColor: "#F0F9FF",
    borderWidth: 1,
    borderColor: "#3B82F6",
  },
  speakIcon: {
    position: "absolute",
    top: 12,
    right: 12,
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
  micButtonNormal: {
    backgroundColor: "#3B82F6",
  },
  micButtonRecording: {
    backgroundColor: "#EF4444",
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