import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ChatGlobe from "../../assets/images/chat-globe.svg";
import ChatQuestion from "../../assets/images/chat-question.svg";

interface IProps {
  showDate?: boolean;
  onLanguageChange?: (language: string)=> void
}

type DateFormatType = "short" | "long";

interface DateFormatterOptions {
  weekday: "short" | "long";
  day: "numeric";
  month: "short" | "long";
  year: "2-digit" | "numeric";
}

const DateSeparator = ({
  date = new Date(),
  backgroundColor = "transparent",
  textColor = "#D1D1D1",
  lineColor = "#D1D1D1",
}) => {
  const formatDate = (
    date: Date,
    dateFormat: DateFormatType = "short"
  ): string => {
    const options: DateFormatterOptions = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "2-digit",
    };

    if (dateFormat === "long") {
      options.weekday = "long";
      options.month = "long";
      options.year = "numeric";
    }

    return date.toLocaleDateString("en-US", options);
  };

  const formattedDate = formatDate(date);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={[styles.line, { backgroundColor: lineColor }]} />
      <Text style={[styles.dateText, { color: textColor }]}>
        {formattedDate}
      </Text>
      <View style={[styles.line, { backgroundColor: lineColor }]} />
    </View>
  );
};

const ChatHeader = ({ showDate = true, onLanguageChange }: IProps) => {
  const { t } = useTranslation();
  const [language, setLanguage] = useState("english");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const languageItems = [
    { label: "English", value: "english" },
    { label: "Russian", value: "russian" },
    { label: "Portuguese", value: "portuguese" },
    { label: "Chinese", value: "chinese" },
    { label: "Georgian", value: "georgian" },
  ];

  const getLanguageLabel = () => {
    const selectedItem = languageItems.find((item) => item.value === language);
    return selectedItem ? selectedItem.label : "Select language";
  };

  const handleLanguageSelect = (value: string) => {
    setLanguage(value);
    if(onLanguageChange){
      onLanguageChange(value)
    }
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <MaterialCommunityIcons name="arrow-left-top" size={20} color="white" />
      </TouchableOpacity>

      <View style={styles.lane}>
        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            style={styles.pickerWrapper}
            onPress={toggleDropdown}
            activeOpacity={0.7}
          >
            <ChatGlobe style={styles.globeIcon} />
            <Text style={styles.languageText}>{getLanguageLabel()}</Text>
            <Ionicons
              name={isDropdownOpen ? "chevron-up" : "chevron-down"}
              size={16}
              color="#fff"
              style={styles.dropdownIcon}
            />
          </TouchableOpacity>

          {isDropdownOpen && (
            <View style={styles.dropdownList}>
              <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={true}
              >
                {languageItems.map((item) => (
                  <TouchableOpacity
                    key={item.value}
                    style={[
                      styles.dropdownItem,
                      language === item.value && styles.selectedItem,
                    ]}
                    onPress={() => handleLanguageSelect(item.value)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        language === item.value && styles.selectedItemText,
                      ]}
                    >
                      {item.label}
                    </Text>
                    {language === item.value && (
                      <Ionicons name="checkmark" size={16} color="#007AFF" />
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
        <View style={styles.helpContainer}>
          <ChatQuestion />
          <Text style={styles.help}>{t("help")}</Text>
        </View>
      </View>
      {showDate && <DateSeparator />}

      {/* Overlay to close dropdown when tapping outside */}
      {isDropdownOpen && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setIsDropdownOpen(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginRight: 16,
  },
  header: {
    flexDirection: "column",
    paddingBottom: 20,
    position: "relative",
  },
  lane: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
  },
  dropdownContainer: {
    position: "relative",
    zIndex: 1000,
  },
  pickerWrapper: {
    borderRadius: 6,
    borderColor: "white",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 30,
    minWidth: 150,
  },
  globeIcon: {
    marginRight: 8,
  },
  languageText: {
    flex: 1,
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
    color: "white",
  },
  dropdownIcon: {
    marginLeft: 8,
  },
  dropdownList: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginTop: 4,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  scrollView: {
    height: 220,
    overflowY: "auto",
  },
  dropdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  selectedItem: {
    backgroundColor: "#f8f9ff",
  },
  dropdownItemText: {
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
    color: "#333",
    flex: 1,
  },
  selectedItemText: {
    color: "#007AFF",
    fontWeight: "500",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  helpContainer: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  help: {
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
    color: "white",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    marginVertical: 4,
  },
  line: {
    height: 1,
    flex: 1,
  },
  dateText: {
    fontSize: 10,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
    marginHorizontal: 15,
    textAlign: "center",
  },
});

export default ChatHeader;
