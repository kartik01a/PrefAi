import ActivityItem from "@/components/Home/ActivityItem";
import ServiceCard from "@/components/Home/ServiceCard";
import { router } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import EllipseD from "../../assets/images/ellipse-d.svg";
import Ellipse from "../../assets/images/ellipse.svg";
import HomeBell from "../../assets/images/Home-bell.svg";
import HomeRocket from "../../assets/images/home-rocket.svg";
import HomeStar from "../../assets/images/home-start.svg";
import BaseLayout from "../../components/BaseLayout";

const HomeTab: React.FC = () => {
  const colorScheme = useColorScheme();

  const services = [
    {
      icon: "home-mic",
      title: "Chat assistant translations support",
    },
    {
      icon: "home-document",
      title: "Form checking assistant for CAF / Social Sercuirty",
    },
    {
      icon: "home-person",
      title: "Appointments Guide",
    },
    {
      icon: "home-vault",
      title: "Document Vault",
    },
  ];

  const activities = [
    "Completed CAF Housing Aid Form",
    "Appointment Guide - Préfecture (Paris 13)",
  ];

  function cardPress(key: number): void {
    if (key === 0) {
      router.push("/aiform/chatassist");
    }
  }

  return (
    <BaseLayout>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={[styles.greeting]}>Hi, John</Text>
          <Text style={[styles.subtitle]}>
            What can I do to help you today?
          </Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <HomeBell />
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.premiumCard,
          { backgroundColor: "#FFFFFF" },
        ]}
      >
        <View style={styles.star}>
          <HomeStar />
        </View>
        <View style={styles.rocket}>
          <HomeRocket />
        </View>
        <View style={styles.ellipse}>
          <Ellipse />
        </View>
        <View style={styles.ellipseD}>
          <EllipseD />
        </View>
        <TouchableOpacity
          style={styles.premiumContent}
          onPress={() => router.push("/subscription/freeplan")}
          activeOpacity={0.7}
        >
          <View style={styles.premiumHeader}>
            <Text style={styles.premiumTitle}>Premium Plan</Text>
          </View>
          <Text style={styles.premiumDescription}>
            Unlock all the features & get all premium access on the platform
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            { color: "#FFFFFF" },
          ]}
        >
          Our Services
        </Text>
        <View style={styles.servicesGrid}>
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              onPress={() => cardPress(index)}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            { color: colorScheme === "dark" ? "#FFFFFF" : "#FFFFFF" },
          ]}
        >
          Recent Activity
        </Text>
        <View style={styles.activityList}>
          {activities.map((activity, index) => (
            <ActivityItem
              key={index}
              title={activity}
              onPress={() => console.log(`Pressed ${activity}`)}
            />
          ))}
        </View>
      </View>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 24,
  },
  star: {
    position: "absolute",
    top: 5,
    left: 5,
  },
  rocket: {
    position: "absolute",
    top: 12,
    left: 8,
  },
  ellipse: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  ellipseD: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  headerContent: {
    flex: 1,
  },
  greeting: {
    fontSize: 12,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 2,
    color: "#ffffff",
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#ffffff",
  },
  notificationButton: {
    padding: 8,
  },
  premiumCard: {
    height: 140,
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 16,
    padding: 20,
    paddingHorizontal: 8,
    position: "relative",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  premiumContent: {
    zIndex: 1,
    marginTop: "auto",
  },
  premiumHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  premiumTitle: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    color: "#2479CF",
  },
  premiumDescription: {
    width: "70%",
    fontSize: 12,
    fontFamily: "Poppins-SemiBold",
    color: "#2479CF",
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 8,
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  activityList: {
    gap: 8,
  },
});

export default HomeTab;
