import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import BaseLayout from "@/components/BaseLayout";
import ServiceCard from "@/components/Home/ServiceCard";

const ChatAssist: React.FC = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const services = [
    { icon: "home-document", title: "CAF Declaration of Situation – Housing & Family Benefits" },
    {
      icon: "home-document",
      title: "Demande d’Aide au Logement (APL)",
    },
    { icon: "home-document", title: "Formulaire de demande d’aide financière" },
    { icon: "home-document", title: "Prêt équipement" },
  ];

  const services1 = [
    {
      icon: "home-document",
      title:
        "Demande d’ouverture des droits à l’assurance maladie (Cerfa S1106)",
    },
    {
      icon: "home-document",
      title: "Demande de rattachement enfant–parents (Cerfa S3705)",
    },
  ];

  function serviceMethod(index: number): void {
    if(index === 0) {
      router.push('/aiform/caf-declaration-form')
    }
  }

  return (
    <BaseLayout>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.backButton}
              >
                <MaterialCommunityIcons
                  name="arrow-left-top"
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Hi, John</Text>
              <Text style={styles.sectionTitle}>
                What documents would you like me to help you with?
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>CAF Forms</Text>
              <View style={styles.servicesGrid}>
                {services.map((service, index) => (
                  <ServiceCard
                    key={index}
                    icon={service.icon}
                    title={service.title}
                    onPress={() => serviceMethod(index)}
                  />
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Other Forms</Text>
              <View style={styles.servicesGrid}>
                {services1.map((service, index) => (
                  <ServiceCard
                    key={index}
                    icon={service.icon}
                    title={service.title}
                    onPress={() => console.log(`Pressed ${service.title}`)}
                  />
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.chatInputContainer}>
            <View style={styles.chatInputWrapper}>
              <TouchableOpacity style={styles.iconButton}>
                <MaterialCommunityIcons name="plus" size={22} color="#2479CF" />
              </TouchableOpacity>

              <TextInput
                style={styles.textInput}
                placeholder="Ask me all about immigration topic"
                placeholderTextColor="#888"
                multiline
              />

              <TouchableOpacity style={styles.iconButton}>
                <MaterialCommunityIcons
                  name="microphone"
                  size={22}
                  color="#2479CF"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <MaterialCommunityIcons name="send" size={22} color="#2479CF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#000",
    paddingVertical: 4,
  },

  safeArea: {
    flex: 1,
    backgroundColor: "#2479CF",
  },
  container: {
    flex: 1,
    backgroundColor: "#2479CF",
    paddingTop: 30,
  },
  scrollContent: {
    paddingBottom: 10,
  },
  chatInputContainer: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  chatInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  textInputContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  placeholderText: {
    color: "#888",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  iconButton: {
    paddingHorizontal: 4,
  },
  backButton: {
    marginBottom: 16,
  },
  header: {
    paddingTop: 12,
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    color: "white",
    marginBottom: 8,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 8,
    color: "#fff",
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
});

export default ChatAssist;
