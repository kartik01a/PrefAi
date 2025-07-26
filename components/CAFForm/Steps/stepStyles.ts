import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
  },
  inputHalf: {
    flex: 1,
  },
  inputContainerFull: {
    width: "100%",
  },
  label: {
    color: "#2479CF",
    fontSize: 12,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "#2479CF",
    backgroundColor: "#F2F2F2",
  },
  pickerInput: {
    fontSize: 14,
    color: "#2479CF",
    fontFamily: "Poppins-SemiBold",
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 10,
    backgroundColor: "#F2F2F2",
  },
  inputWithIcon: {
    position: "relative",
    justifyContent: "center",
  },
  icon: {
    position: "absolute",
    right: 10,
    top: 14,
  },

radioOption: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#F2F2F2",
    borderColor: "#D9D9D9",
    borderWidth: 1,
    alignItems: "center",
  },
  radioOptionSelected: {
    borderColor: "#2479CF",
    borderWidth: 1.5,
  },
  radioOptionText: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "#2479CF",
  },

  datePickerTouchable: {
    flex: 1,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: "#F2F2F2",
  },
  datePickerText: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "#2479CF",
  },

});
