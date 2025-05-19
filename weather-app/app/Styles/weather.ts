import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5E2EFF",
    padding: 20,
  },
  location: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
    textAlign: "center",
  },
  topCard: {
    alignItems: "center",
    backgroundColor: "#7E5CFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFD43B",
    marginBottom: 8,
  },
  tempText: {
    fontSize: 72,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  description: {
    fontSize: 16,
    color: "#FFFFFF",
    marginTop: 5,
  },
  tempRange: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 30,
  },
  rangeText: {
    fontSize: 16,
    color: "#FFD43B",
  },
  forecastContainer: {
    backgroundColor: "#6A4BE8",
    borderRadius: 16,
    padding: 16,
  },
  forecastTemperature: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    backgroundColor: "#7E5CFF",
    borderRadius: 8,
    margin: 4,
    padding: 4,
  },
  forecastText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 6,
  },
});

export default styles;
