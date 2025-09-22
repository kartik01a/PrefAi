import BaseLayout from "@/components/BaseLayout";
import { Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
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
import { useSelector } from "react-redux";
import {
  useCreateEventMutation,
  useDeleteEventMutation,
  useGetEventsQuery,
  useUpdateEventMutation,
} from "../../slices/calendarApiSlice";
import { RootState } from "../store";

// Configure calendar locale
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

// Setup notifications handler (foreground)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

type EventItem = {
  id: string;
  title: string;
  startDateISO: string;
  endDateISO: string;
  startTime?: string;
  endTime?: string;
};

const { width } = Dimensions.get("window");

const CalendarScreen: React.FC = () => {
  const userId = useSelector((state: RootState) => state.auth.userInfo?._id)!;

  // RTK Query hooks
  const {
    data: eventsData,
    refetch,
    isLoading,
  } = useGetEventsQuery(userId, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });
  const [createEvent, { isLoading: isCreating }] = useCreateEventMutation();
  const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation();
  const [deleteEventApi, { isLoading: isDeleting }] = useDeleteEventMutation();

  const [modalVisible, setModalVisible] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState(moment().format("YYYY-MM-DD"));

  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<Date>(new Date());

  const [showPicker, setShowPicker] = useState<{
    mode: "date" | "time";
    field: "start" | "end" | "startTime" | null;
  }>({ mode: "date", field: null });

  const [fadeAnim] = useState(new Animated.Value(0));

  // Animate fade-in
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  // Request notification permissions
  useEffect(() => {
    const setupNotifications = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Enable notifications in settings to get reminders!");
      }
    };
    setupNotifications();
  }, []);

  const eventsById: Record<string, EventItem> = useMemo(() => {
    const map: Record<string, EventItem> = {};
    const events = Array.isArray(eventsData)
      ? eventsData
      : eventsData?.data || [];

    events.forEach((ev: any) => {
      map[ev._id] = {
        id: ev._id,
        title: ev.title,
        startDateISO: ev.startDate,
        endDateISO: ev.endDate,
        startTime: ev.startTime,
        endTime: ev.endTime,
      };
    });

    return map;
  }, [eventsData]);

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

  const resetModalState = (dateString?: string) => {
    setEditingEventId(null);
    setTitle("");
    const base = moment(dateString || selectedDay)
      .startOf("day")
      .toDate();
    setStartDate(base);
    setEndDate(base);
    setStartTime(new Date());
  };

  const openCreateModal = (dateString?: string) => {
    const base = moment(dateString || selectedDay)
      .startOf("day")
      .toDate();
    setEditingEventId(null);
    setTitle("");
    setStartDate(base);
    setEndDate(base);
    setStartTime(new Date());
    setModalVisible(true);
  };

  const openEditModalForEvent = (id: string) => {
    resetModalState();
    const ev = eventsById[id];
    if (!ev) return;

    setEditingEventId(id);
    setTitle(ev.title);
    setStartDate(new Date(ev.startDateISO));
    setEndDate(new Date(ev.endDateISO));

    if (ev.startTime) {
      const [hours, minutes] = ev.startTime.split(":");
      const timeDate = new Date();
      timeDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
      setStartTime(timeDate);
    } else {
      setStartTime(new Date());
    }

    setModalVisible(true);
  };

  const saveEvent = async () => {
    if (!title.trim()) {
      alert("Please enter title");
      return;
    }

    const startTimeString = moment(startTime).format("HH:mm");
    const endTime = "23:59"; // 11:59 PM
    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();

    const difference =
      new Date(startTime.getTime() + 1000).getTime() -
      new Date(Date.now() + 2000).getTime() -
      30 * 60 * 1000;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "⏰ Event Reminder",
        body: `Your appointment "${title.trim()}" starts in 30 minutes!`,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: new Date(Date.now() + difference),
      },
    });

    try {
      if (editingEventId) {
        await updateEvent({
          id: editingEventId,
          title: title.trim(),
          startDate: startTimestamp,
          endDate: endTimestamp,
          startTime: startTimeString,
          endTime: endTime,
        }).unwrap();
      } else {
        await createEvent({
          title: title.trim(),
          startDate: startTimestamp,
          endDate: endTimestamp,
          startTime: startTimeString,
          endTime: endTime,
          userId,
        }).unwrap();
      }

      await refetch();

      setModalVisible(false);
      setTitle("");
      setEditingEventId(null);
    } catch (err: any) {
      console.error("Save failed", err);
      const errorMessage =
        err?.data?.message || err?.message || "Failed to save event";
      alert(errorMessage);
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      await deleteEventApi(id).unwrap();
      await refetch();
      if (editingEventId === id) {
        setModalVisible(false);
        setEditingEventId(null);
      }
    } catch (err: any) {
      console.error("Delete failed", err);
      const errorMessage =
        err?.data?.message || err?.message || "Failed to delete event";
      alert(errorMessage);
    }
  };

  const showEventsModal = (dateString?: string) => {
    const day = dateString || selectedDay;
    const events = Object.values(eventsById).filter(
      (ev) => moment(ev.startDateISO).format("YYYY-MM-DD") === day
    );

    if (events.length === 0) {
      openCreateModal(day);
      return;
    }
    openEditModalForEvent(events[0].id);
  };

  async function TestNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "📢 Reminder!",
        body: "This is a scheduled notification.",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: new Date(Date.now() + 10), // Triggers after 10 seconds
      },
    });
  }

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
              showEventsModal(day.dateString);
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
              onPress={() => openCreateModal("")}
            >
              <Ionicons name="add" size={24} color="#2479CF" />
              <Text style={styles.createButtonText}>Create Appointment</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.createButton}
              onPress={() => TestNotification()}
            >
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#2479CF"
              />
              <Text style={styles.createButtonText}>Test Notification</Text>
            </TouchableOpacity>
          </View>
        </View>

        {(isLoading || isCreating || isUpdating || isDeleting) && (
          <View style={styles.loadingOverlay}>
            <Text style={styles.loadingText}>
              {isLoading
                ? "Loading events..."
                : isCreating
                ? "Creating event..."
                : isUpdating
                ? "Updating event..."
                : isDeleting
                ? "Deleting event..."
                : "Processing..."}
            </Text>
          </View>
        )}
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

              {/* Time info display (read-only) */}
              <View style={styles.row}>
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Start Time</Text>
                  <TouchableOpacity
                    style={styles.fieldBtn}
                    onPress={() =>
                      setShowPicker({ mode: "time", field: "startTime" })
                    }
                  >
                    <Ionicons name="time-outline" size={18} color="#5E81AC" />
                    <Text style={styles.fieldValue}>
                      {moment(startTime).format("HH:mm")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.buttonContainer}>
                {editingEventId && (
                  <TouchableOpacity
                    style={[
                      styles.deleteButton,
                      isDeleting && styles.buttonDisabled,
                    ]}
                    onPress={() => deleteEvent(editingEventId)}
                    disabled={isDeleting}
                  >
                    <Text style={styles.deleteButtonText}>
                      {isDeleting ? "Deleting..." : "Delete"}
                    </Text>
                  </TouchableOpacity>
                )}
                <View style={styles.buttonSpacer} />
                <TouchableOpacity
                  style={[
                    styles.saveBtn,
                    (isCreating || isUpdating) && styles.buttonDisabled,
                  ]}
                  onPress={saveEvent}
                  disabled={isCreating || isUpdating}
                >
                  <Text style={styles.saveBtnText}>
                    {isCreating
                      ? "Creating..."
                      : isUpdating
                      ? "Updating..."
                      : "Save"}
                  </Text>
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
        date={
          showPicker.field === "end"
            ? endDate
            : showPicker.field === "startTime"
            ? startTime
            : startDate
        }
        onConfirm={(dt: Date) => {
          if (showPicker.field === "start" && showPicker.mode === "date") {
            setStartDate(dt);
          } else if (showPicker.field === "end" && showPicker.mode === "date") {
            setEndDate(dt);
          } else if (
            showPicker.field === "startTime" &&
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
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
  timeInfoContainer: {
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
  },
  timeInfoText: {
    color: "#666",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
  buttonDisabled: {
    opacity: 0.5,
  },

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
