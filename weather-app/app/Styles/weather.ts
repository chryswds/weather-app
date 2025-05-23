import { StyleSheet } from "react-native";

// Types for themes
export type Theme = {
  background: string;
  text: string;
  card: string;
  overlay: string;
  accent: string;
  tempText: string;
  descriptionText: string;
  toggleBg: string;
  weatherPropertyBg: string;
  forecastItemBg: string;
  forecastDate: string;
  forecastTemp: string;
  inputBg: string;
  suggestionBg: string;
  suggestionText: string;
};

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      opacity: 0.8,
      backgroundColor: theme.background,
    },
    weatherProperties: {
      borderRadius: 16,
      padding: 16,
      backgroundColor: theme.weatherPropertyBg,
    },
    location: {
      fontSize: 22,
      fontWeight: "bold",
      color: theme.text,
      marginBottom: 20,
      textAlign: "center",
    },
    topCard: {
      alignItems: "center",
      backgroundColor: theme.card,
      borderRadius: 20,
      padding: 20,
      marginBottom: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: "600",
      color: theme.accent,
      marginBottom: 8,
    },
    tempText: {
      fontSize: 72,
      fontWeight: "bold",
      color: theme.tempText,
    },
    description: {
      fontSize: 16,
      color: theme.descriptionText,
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
      color: theme.accent,
    },
    weatherTextcontainer: {
      backgroundColor: theme.overlay,
      borderRadius: 12,
      paddingVertical: 10,
      paddingHorizontal: 16,
      marginHorizontal: 6,
      marginVertical: 8,
      flexDirection: "row",
      alignItems: "center",
    },
    toggleButton: {
      padding: 10,
      backgroundColor: theme.toggleBg,
      borderRadius: 10,
    },
    forecastItem: {
      backgroundColor: theme.forecastItemBg,
      borderRadius: 8,
      margin: 4,
      padding: 8,
    },
    date: {
      color: theme.forecastDate,
      fontWeight: "bold",
      fontSize: 14,
    },
    temp: {
      color: theme.forecastTemp,
      fontSize: 16,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.overlay,
      borderRadius: 12,
      paddingHorizontal: 12,
      marginVertical: 16,
    },
    icon: {
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      height: 44,
      color: theme.text,
      fontSize: 16,
    },
    suggestionsContainer: {
      position: "absolute",
      top: 50,
      left: 0,
      right: 0,
      backgroundColor: theme.suggestionBg,
      borderRadius: 8,
      maxHeight: 200,
      zIndex: 1000,
      elevation: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    suggestionItem: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
    },
    suggestionText: {
      fontSize: 16,
      color: theme.suggestionText,
    },
  });
