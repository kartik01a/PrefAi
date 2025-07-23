// app/freeplan.tsx
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRouter } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Checkbox } from "react-native-paper";

const FreePlan = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState(0);

  const getIncludedItems = () => {
    if (selectedPlan === 0) {
      // Free Plan
      return [
        {
          icon: "check-circle",
          text: "Maximum of 3 chats allowed per day",
        },
        {
          icon: "check-circle",
          text: "Maximum 1 form generation total",
        },
        {
          icon: "x-circle",
          text: "Document storage is not available (vault feature is disabled)",
        },
        {
          icon: "x-circle",
          text: "PDF downloads are not permitted",
        },
        {
          icon: "x-circle",
          text: "Push and email notifications are disabled",
        },
      ];
    } else if (selectedPlan === 1) {
      // Basic or Premium Plan
      return [
        {
          icon: "check-circle",
          text: "Unlimited chats",
        },
        {
          icon: "check-circle",
          text: "Unlimited form generations",
        },
        {
          icon: "check-circle",
          text: "Save documents to vault",
        },
        {
          icon: "check-circle",
          text: "PDF download & email",
        },
        {
          icon: "check-circle",
          text: "Notifications enabled",
        },
        {
          icon: "check-circle",
          text: "Cancel anytime",
        },
      ];
    } else {
      return [
        {
          icon: "check-circle",
          text: "Unlimited chats",
        },
        {
          icon: "check-circle",
          text: "Unlimited form generations",
        },
        {
          icon: "check-circle",
          text: "Save documents to vault",
        },
        {
          icon: "check-circle",
          text: "PDF download & email",
        },
        {
          icon: "check-circle",
          text: "Notifications enabled",
        },
        {
          icon: "check-circle",
          text: "Cancel anytime",
        },
        {
          icon: "check-circle",
          text: "Save 14% over monthly",
        },
      ];
    }
  };

  const plans = [
    { title: "Free Plan - 3 days", price: "€0.00 / month" },
    { title: "Monthly Plan - Full Access", price: "€4.99 / month" },
    { title: "Yearly Plan - Best Value", price: "€59.99 / year" },
  ];
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  return (
    <LinearGradient colors={["#0072BB", "#003972"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.logo}>PrefAI</Text>
        <Image
          source={require("../../assets/images/freePlan.png")}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.title}>Pricing</Text>
        <Text style={styles.subtitle}>
          Get unlimited access to all features
        </Text>

        {/* Plan Options */}
        <View style={styles.planList}>
          {plans.map((plan, index) => {
            const isSelected = selectedPlan === index;
            const isTop = index === 0;
            const isBottom = index === plans.length - 1;
            const isYearly = index === 2;

            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                onPress={() => setSelectedPlan(index)}
                style={[
                  styles.planBox,
                  isTop && styles.planTop,
                  isBottom && styles.planBottom,
                  isSelected && styles.selectedPlanBox,
                ]}
              >
                <View style={styles.planContent}>
                  <Checkbox
                    status={isSelected ? "checked" : "unchecked"}
                    onPress={() => setSelectedPlan(index)}
                    color="#00FFB3"
                  />
                  <View style={styles.planTextContainer}>
                    <Text style={styles.planTitle}>{plan.title}</Text>
                    <Text style={styles.planPrice}>{plan.price}</Text>
                  </View>
                </View>

                {isYearly && selectedPlan === 2 && (
                  <View style={styles.bestValueWrapper}>
                    <Text style={styles.bestValueText}>Best Value!</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.includedTitle}>What’s included</Text>

        {getIncludedItems().map((item, index) => (
          <View key={index} style={styles.includedItem}>
            <View style={styles.includedIcon}>
              <Feather name={item.icon as any} size={18} color="white" />
            </View>
            <Text
              style={[
                styles.includedText,
                item.text === "Save 14% over monthly" && styles.semiBoldText,
              ]}
            >
              {item.text}
            </Text>
          </View>
        ))}

        {/* Terms & Privacy */}
        <Text style={styles.footerText}>
          • Terms of Use{"   "}• Privacy Policy
        </Text>

        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => console.log("Plan Selected:", plans[selectedPlan])}
        >
          <Text style={styles.selectButtonText}>Select Plan</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

export default FreePlan;

const styles = StyleSheet.create({
  semiBoldText: {
    fontFamily: "Poppins-SemiBold",
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    alignItems: "center",
    padding: 24,
    paddingBottom: 40,
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
  planList: {
    width: "100%",
    marginBottom: 24,
  },
  planBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#FFFFFF15",
    paddingHorizontal: 16,
    paddingVertical: 12,
    position: "relative",
  },
  planTop: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  planBottom: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginBottom: 0,
  },
  selectedPlanBox: {
    borderColor: "#00FFB3",
    backgroundColor: "#00FFB310",
  },
  planContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  planTextContainer: {
    justifyContent: "center",
  },
  planTitle: {
    color: "#fff",
    fontFamily: "Poppins-Medium",
    fontSize: 14,
  },
  planPrice: {
    color: "#E0F4FF",
    fontSize: 12,
    fontFamily: "Poppins-Regular",
  },
  bestValueWrapper: {
    position: "absolute",
    bottom: 8,
    right: 12,
    backgroundColor: "#9046F1",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  bestValueText: {
    color: "#fff",
    fontSize: 13,
    fontFamily: "Poppins-SemiBold",
  },
  includedTitle: {
    alignSelf: "flex-start",
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 12,
  },
  includedItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  includedIcon: {
    width: 24,
    marginTop: 2,
    alignItems: "center",
  },
  includedText: {
    color: "#E0F4FF",
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    flex: 1,
  },
  footerText: {
    color: "#B0C8E8",
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    marginTop: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  selectButton: {
    backgroundColor: "#2479CF",
    borderRadius: 10,
    marginBottom: 20,
    paddingVertical: 14,
    alignItems: "center",
    width: "100%",
  },
  selectButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
});
