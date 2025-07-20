import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import EditPen from "../../assets/images/edit-pen.svg";

interface ActivityItemProps {
  title: string;
  onPress?: () => void;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ title, onPress }) => {
  const colorScheme = useColorScheme();

  return (
    <TouchableOpacity
      style={[
        styles.activityItem,
        {
          backgroundColor:
            colorScheme === "dark" ? "#1C1C1E" : "rgba(255, 255, 255, 0.2)",
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.activityText,
          { color: colorScheme === "dark" ? "#FFFFFF" : "#FFFFFF" },
        ]}
      >
        {title}
      </Text>
      <EditPen />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  activityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    height: 60,
    borderRadius: 12,
  },
  activityText: {
    fontSize: 12,
    fontWeight: "500",
    flex: 1,
    marginRight: 12,
    fontFamily: "Poppins-Medium",
  },
});

export default ActivityItem;
