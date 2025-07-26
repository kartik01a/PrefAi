import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { SvgProps } from "react-native-svg";
import Ellipse from "../../assets/images/ellipse.svg";
import HomeDocument from "../../assets/images/home-document.svg";
import HomeMic from "../../assets/images/home-mic.svg";
import HomePerson from "../../assets/images/home-person.svg";
import HomeVault from "../../assets/images/home-vault.svg";

interface ServiceCardProps {
  icon: string;
  title: string;
  onPress?: () => void;
}

const IconMapping: Record<string, React.FC<SvgProps>> = {
  "home-document": HomeDocument,
  "home-mic": HomeMic,
  "home-vault": HomeVault,
  "home-person": HomePerson,
};

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, onPress }) => {
  const colorScheme = useColorScheme();
  const IconImage = IconMapping[icon];

  return (
    <TouchableOpacity
      style={[
        styles.serviceCard,
        { backgroundColor: colorScheme === "light" ? "#1C1C1E" : "#FFFFFF" },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.ellipse]}>
        <Ellipse />
      </View>
      <View style={styles.serviceCardIcon}>
          <IconImage />
        </View>
      <View style={styles.serviceCardContent}>
        <Text style={[styles.serviceTitle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ellipse: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  serviceCard: {
    width: "48%",
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 12,
    position: "relative",
    overflow: "hidden",
    height: 140,
  },
  serviceCardContent: {
    zIndex: 1,
    marginTop: "auto",
  },
  serviceCardIcon: {
    position: "absolute",
    top: 16,
    left: 8
  },
  serviceIcon: {
    marginBottom: 8,
  },
  serviceTitle: {
    color: "#2479CF",
    fontSize: 12,
    marginBottom: 4,
    fontFamily: "Poppins-Medium",
  }
});

export default ServiceCard;
