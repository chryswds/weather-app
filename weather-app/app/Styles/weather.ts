import { StyleSheet } from "react-native";

// Theme interface for typed styling
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

// Dynamically generated styles based on theme
export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    // Screen layout
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.background,
    },

    // Top weather summary card
    topCard: {
      alignItems: "center",
      backgroundColor: theme.card,
      borderRadius: 20,
      padding: 20,
      marginBottom: 20,
    },

    // City name
    location: {
      fontSize: 22,
      fontWeight: "bold",
      color: theme.text,
      marginBottom: 20,
      textAlign: "center",
    },

    // Title/subheadings
    title: {
      fontSize: 20,
      fontWeight: "600",
      color: theme.accent,
      marginBottom: 8,
    },

    // Temperature text
    tempText: {
      fontSize: 72,
      fontWeight: "bold",
      color: theme.tempText,
    },

    // Feels like and other descriptions
    description: {
      fontSize: 16,
      color: theme.descriptionText,
      marginTop: 5,
    },

    // Max/Min temperature layout
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

    // Toggle row (°C/°F or theme)
    toggleRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      alignSelf: "flex-end",
      marginBottom: 20,
      paddingRight: 16,
    },

    toggleButton: {
      padding: 10,
      backgroundColor: theme.toggleBg,
      borderRadius: 10,
    },

    label: {
      fontSize: 16,
      marginHorizontal: 6,
      fontWeight: "bold",
      marginLeft: 8,
    },

    // Weather info items (humidity, pressure, etc)
    weatherProperties: {
      borderRadius: 16,
      padding: 16,
      backgroundColor: theme.weatherPropertyBg,
    },

    weatherTextcontainer: {
      backgroundColor: theme.overlay,
      borderRadius: 12,
      paddingVertical: 10,
      paddingHorizontal: 16,
      marginHorizontal: 6,
      marginVertical: 10,
      height: 60,
      flexDirection: "row",
      alignItems: "center",
    },

    // Forecast list item
    forecastItem: {
      backgroundColor: theme.forecastItemBg,
      borderRadius: 8,
      margin: 6,
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

    // Search bar
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

    // Autocomplete suggestions
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
