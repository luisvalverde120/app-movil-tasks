import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: "80%",
    justifyContent: "center",
  },
  boxText: {
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
  },
  inputGroup: {
    marginTop: 20,
    borderBottomWidth: 1,
    paddingStart: 2,
    height: 40,
    borderColor: "#cccccc",
    justifyContent: "center",
  },
  input: {
    fontSize: 18,
  },
  boxButtom: {
    marginTop: 20,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  textForm: {
    color: "#4a8fe7",
    marginLeft: 4,
  },
  datePickerStyle: {
    width: 230,
  },
});

export default styles;
