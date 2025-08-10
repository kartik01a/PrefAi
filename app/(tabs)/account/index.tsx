import { useLogoutMutation } from "@/app/auth/usersApiSlice";
import { AppDispatch, RootState } from "@/app/store";
import BaseLayout from "@/components/BaseLayout";
import { clearUser } from "@/utils/authLoader";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Menu } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import AccountDisplay from "../../../assets/images/account-display.svg";
import AccountInfo from "../../../assets/images/account-info.svg";
import AccountManage from "../../../assets/images/account-manage.svg";
import AccountPerson from "../../../assets/images/account-person.svg";
import AccountSubscription from "../../../assets/images/account-subscription.svg";
import AccountSupport from "../../../assets/images/account-support.svg";

interface MenuItemProps {
  icon: any;
  title: string;
  subtitle: string;
  onPress?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
}) => (
  <TouchableOpacity
    style={styles.menuItem}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.menuItemLeft}>
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.textContainer}>
        <Text style={styles.menuTitle}>{title}</Text>
        <Text style={styles.menuSubtitle}>{subtitle}</Text>
      </View>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
  </TouchableOpacity>
);

const AccountTab: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [triggerLogout] = useLogoutMutation();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  // const {name, country} = userInfo?.firstName + userInfo?.lastName;

  const handleLogout = async () => {
    try {
      await triggerLogout();
    } catch (error) {
      console.warn("Logout API call failed:", error);
    } finally {
      await dispatch(clearUser());
      router.replace("/auth/signin");
    }
  };
  const { t } = useTranslation();
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <BaseLayout>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t("accountManagement")}</Text>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileCard}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
              }}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>
                {userInfo?.firstName ? userInfo?.firstName : "" + userInfo?.lastName ? userInfo?.lastName : ""}
              </Text>
              <Text style={styles.profileLocation}>
                {userInfo?.country} Citizen
              </Text>
            </View>
            <TouchableOpacity onPress={openMenu}>
              <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                  <Ionicons
                    name="ellipsis-vertical"
                    size={16}
                    color="#2479CF"
                  />
                }
              >
                <Menu.Item
                  onPress={() => {
                    closeMenu();
                    router.push("/account/editProfile");
                  }}
                  style={{ height: 30 }}
                  title={t("editProfile")}
                />
                <Menu.Item
                  onPress={() => {
                    closeMenu();
                    handleLogout();
                  }}
                  style={{ height: 30 }}
                  title={t("logout")}
                />
              </Menu>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <MenuItem
            icon={<AccountPerson />}
            title={t("general")}
            subtitle={t("profileNotificationLanguage")}
            onPress={() => router.push("/account/general")}
          />

          <MenuItem
            icon={<AccountInfo />}
            title={t("termsAndCondition")}
            subtitle={t("learnToKnowMoreAboutThePlatform")}
            onPress={() => router.push("/account/privacy")}
          />

          <MenuItem
            icon={<AccountDisplay />}
            title={t("display")}
            subtitle={t("lightMode")}
            onPress={() => router.push("/account/display")}
          />

          <MenuItem
            icon={<AccountSubscription />}
            title={t("subscription")}
            subtitle={t("manageYourPlan")}
            onPress={() => router.push("/subscription/freeplan")}
          />

          <MenuItem
            icon={<AccountManage />}
            title={t("accountManagement")}
            subtitle={t("hibernateOrCloseYourAccount")}
            onPress={() => router.push("/account/management")}
          />

          <MenuItem
            icon={<AccountSupport />}
            title={t("contactSupport")}
            subtitle={t("contactOurSupportTeam")}
            onPress={() => router.push("/account/general")}
          />

          <Text style={styles.versionText}>Version 1.11.2.2 (20250702)</Text>
        </View>
      </View>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
  },
  header: {
    paddingTop: 80,
    paddingBottom: 7,
    paddingHorizontal: 24,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    color: "white",
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: "Poppins-SemiBold",
    fontWeight: 600,
    fontSize: 14,
    marginBottom: 2,
    color: "#2479CF",
  },
  profileLocation: {
    fontFamily: "Poppins-SemiBold",
    color: "#2479CF",
    fontWeight: 600,
    fontSize: 12,
  },
  moreButton: {
    padding: 4,
  },
  menuSection: {
    backgroundColor: "#FFFFFF",
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    paddingVertical: 12,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 6,
    marginHorizontal: 24,
    paddingVertical: 16,
    paddingHorizontal: 12,
    height: 54,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D9D9D9",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#F0F8FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  menuTitle: {
    fontFamily: "Poppins-SemiBold",
    color: "#2479CF",
    fontSize: 12,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontFamily: "Poppins-Medium",
    color: "#2479CF",
    fontSize: 10,
  },
  versionText: {
    textAlign: "center",
    marginVertical: 12,
    fontSize: 12,
    color: "#8E8E93",
  },
});

export default AccountTab;
