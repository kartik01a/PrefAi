import BaseLayout from "@/components/BaseLayout";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import React, { useMemo, useState } from "react";
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import Modal from "react-native-modal";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SafeAreaView } from "react-native-safe-area-context";

// Optionally configure calendar locale if needed
LocaleConfig.locales["en"] = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};
LocaleConfig.defaultLocale = "en";

type EventItem = {
  id: string;
  title: string;
  startDateISO: string;
  endDateISO: string;
  startTime?: string;
};

const { width } = Dimensions.get("window");

const CalendarScreen: React.FC = () => {
  const [eventsById, setEventsById] = useState<Record<string, EventItem>>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string>(
    moment().format("YYYY-MM-DD")
  );

  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<Date>(new Date());

  const [showPicker, setShowPicker] = useState<{
    mode: "date" | "time";
    field: "start" | "end" | null;
  }>({
    mode: "date",
    field: null,
  });

  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const markedDates = useMemo(() => {
    const marks: Record<string, any> = {};
    Object.values(eventsById).forEach((ev) => {
      const dayKey = moment(ev.startDateISO).format("YYYY-MM-DD");
      if (!marks[dayKey]) {
        marks[dayKey] = {
          marked: true,
          dots: [{ key: ev.id, color: "#5E81AC" }],
        };
      } else {
        if (!marks[dayKey].dots) marks[dayKey].dots = [];
        marks[dayKey].dots.push({ key: ev.id, color: "#5E81AC" });
      }
    });
    if (selectedDay) {
      marks[selectedDay] = {
        ...(marks[selectedDay] || {}),
        selected: true,
        selectedColor: "#88C0D0",
      };
    }
    return marks;
  }, [eventsById, selectedDay]);

  const openCreateModal = () => {
    setEditingEventId(null);
    setTitle("");
    const base = moment(selectedDay).startOf("day").toDate();
    setStartDate(base);
    setEndDate(base);
    setStartTime(base);
    setModalVisible(true);
  };

  const openEditModalForEvent = (id: string) => {
    const ev = eventsById[id];
    if (!ev) return;
    setEditingEventId(id);
    setTitle(ev.title);
    setStartDate(new Date(ev.startDateISO));
    setEndDate(new Date(ev.endDateISO));
    setStartTime(
      ev.startTime
        ? moment(ev.startTime, "hh:mm A").toDate()
        : new Date(ev.startDateISO)
    );
    setModalVisible(true);
  };

  const saveEvent = () => {
    if (!title.trim()) return alert("Please enter title");

    const startISO = moment(startDate)
      .hour(moment(startTime).hour())
      .minute(moment(startTime).minute())
      .second(0)
      .toISOString();
    const endISO = moment(endDate)
      .hour(moment(startTime).hour())
      .minute(moment(startTime).minute())
      .second(0)
      .toISOString();

    if (editingEventId) {
      setEventsById((prev) => ({
        ...prev,
        [editingEventId]: {
          ...prev[editingEventId],
          title: title.trim(),
          startDateISO: startISO,
          endDateISO: endISO,
          startTime: moment(startTime).format("hh:mm A"),
        },
      }));
    } else {
      const id = String(Date.now());
      setEventsById((prev) => ({
        ...prev,
        [id]: {
          id,
          title: title.trim(),
          startDateISO: startISO,
          endDateISO: endISO,
          startTime: moment(startTime).format("hh:mm A"),
        },
      }));
    }
    setModalVisible(false);
  };

  const deleteEvent = (id: string) => {
    setEventsById((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
    if (editingEventId === id) {
      setModalVisible(false);
      setEditingEventId(null);
    }
  };

  const eventsOnSelectedDay = useMemo(() => {
    const key = selectedDay;
    return Object.values(eventsById).filter(
      (ev) => moment(ev.startDateISO).format("YYYY-MM-DD") === key
    );
  }, [eventsById, selectedDay]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BaseLayout>
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <Text style={styles.headerTitle}>Appointments Guide</Text>
          <Text style={styles.headerSubtitle}>
            {moment().format("MMMM YYYY")}
          </Text>
        </Animated.View>

        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={(day) => {
              setSelectedDay(day.dateString);
              const key = day.dateString;
              const has = Object.values(eventsById).some(
                (ev) => moment(ev.startDateISO).format("YYYY-MM-DD") === key
              );
              if (has) {
                setModalVisible(true);
                setEditingEventId(null);
              } else {
                setSelectedDay(day.dateString);
                openCreateModal();
              }
            }}
            markedDates={markedDates}
            markingType={"multi-dot"}
            theme={{
              backgroundColor: "transparent",
              calendarBackground: "transparent",
              textSectionTitleColor: "black",
              selectedDayBackgroundColor: "#88C0D0",
              selectedDayTextColor: "#2E3440",
              todayTextColor: "#A3BE8C",
              dayTextColor: "black",
              arrowColor: "black",
              monthTextColor: "black",
              textDayFontFamily: "Poppins-Regular",
              textMonthFontFamily: "Poppins-Medium",
              textDayHeaderFontFamily: "Poppins-Medium",
              textDayFontSize: 14,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 12,
            }}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.createButton}
              onPress={openCreateModal}
              activeOpacity={0.8}
            >
              <Ionicons name="add" size={24} color="#2479CF" />
              <Text style={styles.createButtonText}>Create Appointment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BaseLayout>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.bottomSheet}
        backdropOpacity={0.5}
      >
        <View style={styles.sheetCard}>
          <View style={styles.sheetHandle} />

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.sheetContent}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>
                {editingEventId ? "Edit Appointment" : "Create Appointment"}
              </Text>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="pencil-outline"
                  size={20}
                  color="#5E81AC"
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="Appointment Title"
                  placeholderTextColor="#999"
                  value={title}
                  onChangeText={setTitle}
                  style={styles.input}
                />
              </View>

              <View style={styles.row}>
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Start Date</Text>
                  <TouchableOpacity
                    style={styles.fieldBtn}
                    onPress={() =>
                      setShowPicker({ mode: "date", field: "start" })
                    }
                  >
                    <Ionicons
                      name="calendar-outline"
                      size={18}
                      color="#5E81AC"
                    />
                    <Text style={styles.fieldValue}>
                      {moment(startDate).format("MMM DD, YYYY")}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>End Date</Text>
                  <TouchableOpacity
                    style={styles.fieldBtn}
                    onPress={() =>
                      setShowPicker({ mode: "date", field: "end" })
                    }
                  >
                    <Ionicons
                      name="calendar-outline"
                      size={18}
                      color="#5E81AC"
                    />
                    <Text style={styles.fieldValue}>
                      {moment(endDate).format("MMM DD, YYYY")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Start Time</Text>
                <TouchableOpacity
                  style={styles.fieldBtn}
                  onPress={() =>
                    setShowPicker({ mode: "time", field: "start" })
                  }
                >
                  <Ionicons name="time-outline" size={18} color="#5E81AC" />
                  <Text style={styles.fieldValue}>
                    {moment(startTime).format("hh:mm A")}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* <View style={styles.actionRow}>
                {editingEventId && (
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteEvent(editingEventId)}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.saveBtn} onPress={saveEvent}>
                  <Text style={styles.saveBtnText}>Save</Text>
                </TouchableOpacity>
              </View> */}

              <View style={styles.buttonContainer}>
                {editingEventId && (
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteEvent(editingEventId)}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                )}
                <View style={styles.buttonSpacer} />
                <TouchableOpacity style={styles.saveBtn} onPress={saveEvent}>
                  <Text style={styles.saveBtnText}>Save</Text>
                </TouchableOpacity>
                <View style={styles.buttonSpacer} />
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Modal>

      <DateTimePickerModal
        isVisible={showPicker.field !== null}
        mode={showPicker.mode}
        date={showPicker.field === "end" ? endDate : startDate}
        onConfirm={(dt: Date) => {
          if (showPicker.field === "start" && showPicker.mode === "date") {
            setStartDate(dt);
          } else if (showPicker.field === "end" && showPicker.mode === "date") {
            setEndDate(dt);
          } else if (
            showPicker.field === "start" &&
            showPicker.mode === "time"
          ) {
            setStartTime(dt);
          }
          setShowPicker({ mode: "date", field: null });
        }}
        onCancel={() => setShowPicker({ mode: "date", field: null })}
        accentColor="#5E81AC"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  gradientBg: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingBottom: 8,
    paddingHorizontal: 24,
  },
  headerTitle: {
    color: "#ECEFF4",
    fontSize: 28,
    fontFamily: "Poppins-Medium",
    textAlign: "center",
  },
  headerSubtitle: {
    color: "#D8DEE9",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    marginTop: 5,
  },
  calendarContainer: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 2,
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 24,
  },
  createButton: {
    backgroundColor: "#ECEFF4",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 1,
  },
  createButtonText: {
    color: "#2479CF",
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    marginLeft: 8,
  },
  bottomSheet: {
    justifyContent: "flex-end",
    margin: 0,
  },
  sheetCard: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "90%",
    paddingBottom: 20,
  },
  sheetHandle: {
    width: 40,
    height: 5,
    backgroundColor: "#D8DEE9",
    borderRadius: 3,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 8,
  },
  sheetContent: {
    paddingHorizontal: 24,
  },
  modalTitle: {
    fontFamily: "Poppins-Medium",
    fontSize: 22,
    marginBottom: 20,
    color: "#2E3440",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D8DEE9",
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    padding: 14,
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#2E3440",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 16,
  },
  fieldContainer: {
    flex: 1,
  },
  fieldLabel: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#4C566A",
    marginBottom: 6,
  },
  fieldBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderWidth: 1,
    borderColor: "#D8DEE9",
    borderRadius: 12,
    backgroundColor: "#F8F9FC",
  },
  fieldValue: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#2E3440",
    marginLeft: 8,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 8,
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: "auto",
    paddingTop: 16,
  },
  deleteButton: {
    backgroundColor: "#ff6b6b",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
    fontFamily: "Poppins-Medium",
    fontSize: 16,
  },
  saveBtn: {
    backgroundColor: "#0072BB",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveBtnText: {
    color: "white",
    fontFamily: "Poppins-Medium",
    fontSize: 16,
  },
  cancelBtn: {
    backgroundColor: "#e6e9ef",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelText: {
    color: "#0072BB",
    fontFamily: "Poppins-Medium",
    fontSize: 16,
  },
  buttonSpacer: {
    height: 12,
  },
  actionText: {
    color: "white",
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    marginLeft: 6,
  },
});

export default CalendarScreen;
