// app/freeplan.tsx
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useFocusEffect, useNavigation } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import {
  useCreateSubscriptionMutation,
  useGetMySubscriptionQuery,
} from "./subscriptionApiSlice";
// eslint-disable-next-line @typescript-eslint/no-require-imports
import React = require("react");

const FreePlan = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const { data: subscriptionData, refetch } = useGetMySubscriptionQuery();

  const plans = [
    { title: t("freePlan3day"), price: "€0.00 / month", id: null },
    {
      title: t("monthlyPlanFullAccess"),
      price: "€4.99 / month",
      id: "price_1RvOlYCe7yxtOx2NygoTZ3Nb",
    },
    {
      title: t("yearlyPlanBestValue"),
      price: "€59.99 / year",
      id: "price_1RvOmxCe7yxtOx2N6z2yzpLp",
    },
  ];

  useEffect(() => {
    const planId = subscriptionData?.data?.planId;
    if (planId) {
      const foundIndex = plans.findIndex((plan) => plan.id === planId);
      if (foundIndex !== -1) {
        setSelectedPlan(foundIndex);
        setIsSubscribed(true);
      } else {
        setSelectedPlan(0);
        setIsSubscribed(false);
      }
    } else {
      setSelectedPlan(0);
      setIsSubscribed(false);
    }
  }, [subscriptionData]);

  const getIncludedItems = () => {
    if (selectedPlan === 0) {
      // Free Plan
      return [
        {
          icon: "check-circle",
          text: t("freePlan1"),
        },
        {
          icon: "check-circle",
          text: t("freePlan2"),
        },
        {
          icon: "x-circle",
          text: t("freePlan3"),
        },
        {
          icon: "x-circle",
          text: t("freePlan4"),
        },
        {
          icon: "x-circle",
          text: t("freePlan5"),
        },
      ];
    } else if (selectedPlan === 1) {
      return [
        {
          icon: "check-circle",
          text: t("paidPlan1"),
        },
        {
          icon: "check-circle",
          text: t("paidPlan2"),
        },
        {
          icon: "check-circle",
          text: t("paidPlan3"),
        },
        {
          icon: "check-circle",
          text: t("paidPlan4"),
        },
        {
          icon: "check-circle",
          text: t("paidPlan5"),
        },
        {
          icon: "check-circle",
          text: t("paidPlan6"),
        },
      ];
    } else {
      return [
        {
          icon: "check-circle",
          text: t("paidPlan1"),
        },
        {
          icon: "check-circle",
          text: t("paidPlan2"),
        },
        {
          icon: "check-circle",
          text: t("paidPlan3"),
        },
        {
          icon: "check-circle",
          text: t("paidPlan4"),
        },
        {
          icon: "check-circle",
          text: t("paidPlan5"),
        },
        {
          icon: "check-circle",
          text: t("paidPlan6"),
        },
        {
          icon: "check-circle",
          text: t("paidPlan7"),
        },
      ];
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (userInfo?._id) {
        refetch();
      }
    }, [userInfo?._id])
  );

  const [createSubscription, { isLoading }] = useCreateSubscriptionMutation();

  const handleSelectPlan = async () => {
    if (isSubscribed) {
      Toast.show({
        type: "info",
        text1: t("alreadySubscribed"),
        text2: t("youAlreadyHaveAnActiveSubscription"),
      });
      return;
    }

    const selectedPlanId = plans[selectedPlan].id;
    if (!selectedPlanId) {
      Toast.show({
        type: "info",
        text1: t("freePlanSelected"),
        text2: t("youAreAlreadyOnFreePlan"),
      });
      return;
    }
    try {
      const response = await createSubscription({
        planId: selectedPlanId,
      }).unwrap();
      const url = response?.data?.url;
      const result = await WebBrowser.openAuthSessionAsync(
        url,
        "prefai://success"
      );

      router.push("/success");
      refetch();
    } catch (error) {
      console.error("Subscription error:", error);
      Toast.show({
        type: "error",
        text1: t("failedToStartSubscription"),
      });
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <SafeAreaProvider>
      <LinearGradient colors={["#0072BB", "#003972"]} style={styles.container}>
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.logo}>PrefAI</Text>
            <Image
              source={require("../../assets/images/prefAI.png")}
              style={styles.icon}
              resizeMode="contain"
            />
            <Text style={styles.title}>{t("pricing")}</Text>
            <Text style={styles.subtitle}>
              {t("getUnlimitedAccessToAllFeatures")}
            </Text>

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
                    onPress={() => {
                      if (!isSubscribed) {
                        setSelectedPlan(index);
                      }
                    }}
                    style={[
                      styles.planBox,
                      isTop && styles.planTop,
                      isBottom && styles.planBottom,
                      isSelected && styles.selectedPlanBox,
                      isSubscribed && styles.disabledPlanBox,
                    ]}
                    disabled={isSubscribed} // disable selecting plan if subscribed
                  >
                    <View style={styles.planContent}>
                      <Checkbox
                        status={isSelected ? "checked" : "unchecked"}
                        onPress={() => {
                          if (!isSubscribed) {
                            setSelectedPlan(index);
                          }
                        }}
                        color="#00FFB3"
                        disabled={isSubscribed}
                      />
                      <View style={styles.planTextContainer}>
                        <Text style={styles.planTitle}>{plan.title}</Text>
                        <Text style={styles.planPrice}>{plan.price}</Text>
                      </View>
                    </View>

                    {isYearly && selectedPlan === 2 && (
                      <View style={styles.bestValueWrapper}>
                        <Text style={styles.bestValueText}>
                          {t("bestValue")}!
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.includedTitle}>{t("whatsIncluded")}</Text>

            {getIncludedItems().map((item, index) => {
              return (
                <View key={index} style={styles.includedItem}>
                  <View style={styles.includedIcon}>
                    <Feather name={item.icon as any} size={18} color="white" />
                  </View>
                  <Text
                    style={[
                      styles.includedText,
                      item.text === "Save 14% over monthly" &&
                        styles.semiBoldText,
                    ]}
                  >
                    {item.text}
                  </Text>
                </View>
              );
            })}

            <Text style={styles.footerText}>
              • {t("termsOfUse")}
              {"   "}• {t("privacyPolicy")}
            </Text>

            <TouchableOpacity
              style={[
                styles.selectButton,
                isSubscribed && styles.disabledButton,
              ]}
              onPress={handleSelectPlan}
              disabled={isLoading || isSubscribed}
            >
              <Text style={styles.selectButtonText}>
                {isLoading
                  ? t("processing")
                  : isSubscribed
                  ? t("Already Subscribed")
                  : t("selectPlan")}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
};

export default FreePlan;

const styles = StyleSheet.create({
  disabledButton: {
    opacity: 0.5,
  },

  disabledPlanBox: {
    opacity: 0.5,
  },

  safeArea: {
    flex: 1,
  },
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
    height: 35,
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
