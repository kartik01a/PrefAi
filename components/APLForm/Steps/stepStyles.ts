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
    heading: {
    color: "#2479CF",
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 6,
  },
  subHeading: {
  color: "#2479CF",
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
    fontSize: 14,
    fontFamily: "Poppins-regular",
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

  checkBoxText: {
    fontSize: 14,
    fontFamily: "Poppins-regular",
    color: "#8C8888",
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

  dividerWithText: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  dividerText: {
    marginHorizontal: 8,
    fontSize: 14,
    color: "#555",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginTop: 8,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },

  checkboxCustom: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },


  centeredContainer: {
  alignItems: "center",
  justifyContent: "center",
  padding: 20,
},

successImage: {
  width: 120,
  height: 120,
},

successTitle: {
  fontSize: 16,
  fontWeight: "bold",
  textAlign: "center",
  color: "#2479CF",
},

pdfButton: {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
  backgroundColor: "#2479CF",
  paddingVertical: 10,
  paddingHorizontal: 16,
  borderRadius: 8,
},

pdfButtonText: {
  fontSize: 14,
  color: "#fff",
},

bulletList: {
  alignSelf: "flex-start",
  marginVertical: 10,
},

bulletItem: {
  fontSize: 14,
  color: "#2479CF",
  marginVertical: 2,
},

actionButton: {
  backgroundColor: "#2479CF",
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 8,
  width: "100%",
  alignItems: "center",
},

actionButtonText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "bold",
},

actionButtonSecondary: {
  backgroundColor: "#2479CF",
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 8,
  width: "100%",
  alignItems: "center",
  marginTop: 10,
},

actionButtonSecondaryText: {
  color: "#fff",
  fontSize: 16,
},

});
