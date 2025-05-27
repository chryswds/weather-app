import { StyleSheet } from "react-native";

// Theme interface for typed styling
export type Theme = {
  background: string;
  backgroundContainer: string;
  text: string;
  textOpposite: string;
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
  sidebarBg: string;
  divider: string;
  icon: string;
  polygon: string;
  borderColor: string;
};

// Dynamically generated styles based on theme
export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    // Screen layout
    scrollWrapper: {
      flex: 1,
    },
    container: {
      paddingHorizontal: 10,
      paddingTop: 20, // Increased top padding to avoid camera notch
      paddingBottom: 40,
    },

    container3: {
      paddingTop: 40, // Added padding to avoid camera notch
      paddingHorizontal: 10,
      // height: 280,
    },

    mapContainer: {
      flexDirection: "row",
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
      padding: 12,
      fontSize: 72,
      fontWeight: "bold",
      color: theme.tempText,
      textAlign: "center",
    },

    // Feels like and other descriptions
    description: {
      fontSize: 18,
      color: theme.tempText,
      padding: 25,
      fontWeight: "bold",
    },

    descriptionLoc: {
      fontSize: 12,
      color: theme.tempText,
      textAlign: "center",
      fontWeight: "bold",
    },

    forecastDescription: {
      fontSize: 14,
      color: theme.tempText,
      textAlign: "right",
      textTransform: "capitalize",
    },

    fellslike: {
      flexDirection: "column",
      fontSize: 20,
      textAlign: "left",
      color: theme.tempText,
      fontWeight: "400",
    },

    // Max/Min temperature layout
    tempRange: {
      justifyContent: "space-between",
      width: 160,
      // marginLeft: 12
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
      fontWeight: "bold",
      marginLeft: 8,
      textAlign: "left",
      margin: 5,
    },

    // Weather info items (humidity, pressure, etc)
    weatherProperties: {
      borderRadius: 16,
      padding: 16,
      backgroundColor: theme.weatherPropertyBg,
    },

    weatherTextcontainer: {
      // ✅ Border
      borderWidth: 2,
      borderColor: theme.borderColor, // ← make sure `theme.border` exists (e.g., "#ccc")

      backgroundColor: theme.overlay,
      borderRadius: 12,
      paddingVertical: 10,
      paddingHorizontal: 16,
      marginHorizontal: 6,
      marginVertical: 0,
      flexDirection: "row",
      alignItems: "center",
    },

    // Forecast list item
    // forecastItem: {
    //   backgroundColor: theme.forecastItemBg,
    //   borderRadius: 8,
    //   margin: 6,
    //   height: 60,
    //   padding: 8,
    //   // marginTop: "none"
    // },

    date: {
      color: theme.text,
      fontWeight: "bold",
      fontSize: 16,
    },

    temp: {
      color: theme.forecastTemp,
      fontSize: 16,
    },

    // Search bar container
    searchWrapper: {
      position: "relative",
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

    historyButton: {
      padding: 8,
      marginLeft: 8,
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

    locationContainer: {
      margin: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: theme.borderColor,
      borderRadius: 25,
      backgroundColor: theme.backgroundContainer,
      width: "95%",
      padding: 10,
      paddingTop: -5,
      paddingHorizontal: 30,
    },

    temperatureContainer: {
      margin: 10,
      left: 50,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: theme.borderColor,
      borderRadius: 25,
      backgroundColor: theme.backgroundContainer,
      width: "70%",
    },

    dateTimeContainer: {
      margin: 10,
      marginRight: -50,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: theme.borderColor,
      borderRadius: 25,
      backgroundColor: theme.backgroundContainer,
      width: "50%",
    },

    tempRangeContainer: {
      margin: 10,
      left: 50,
      alignItems: "center",
      borderWidth: 2,
      borderColor: theme.borderColor,
      borderRadius: 25,
      backgroundColor: theme.backgroundContainer,
    },

    buttonsContainer: {
      margin: 10,
      marginTop: 50,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: theme.borderColor,
      borderRadius: 25,
      backgroundColor: theme.backgroundContainer,
      width: "95%",
      padding: 5,
      paddingTop: 20,
    },

    currentLocationButton: {
      marginBottom: -11,
      marginLeft: 10,
      padding: 8,
      borderRadius: 20,
      elevation: 3,
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
    // Autocomplete suggestions

    suggestionItem: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
    },

    // History styles
    historyHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
    },

    historyTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.text,
    },

    clearHistory: {
      color: theme.accent,
      fontSize: 14,
    },

    historyIcon: {
      marginRight: 10,
    },

    //start new css
    //done
    // official top card
    topCard: {
      backgroundColor: theme.card,
      borderRadius: 25,
      height: 500,
      margin: 10,
      overflow: "hidden",

      // ✅ Border
      borderWidth: 2,
      borderColor: theme.borderColor, // ← make sure `theme.border` exists (e.g., "#ccc")

      // ✅ iOS Shadow
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,

      // ✅ Android Shadow
      elevation: 8,
    },

    locationCard: {
      flexDirection: "row",
      backgroundColor: theme.card,
      borderRadius: 25,
      borderWidth: 2,
      borderColor: theme.borderColor,
      padding: 10,
      justifyContent: "space-between",
    },

    // done
    mapCard: {
      borderRadius: 25,
      height: 150,
      width: 180,
      margin: 10,
      overflow: "hidden",
    },
    //done
    forecastItem: {
      flexDirection: "row",
      // ✅ Border
      borderWidth: 2,
      borderColor: theme.borderColor, // ← make sure `theme.border` exists (e.g., "#ccc")

      margin: 8,
      flex: 1,
      backgroundColor: theme.card,
      justifyContent: "space-between",
      padding: 10,
      borderRadius: 25,
    },

    forecastContainer: {
      marginVertical: 10,
    },

    windSpeedCard: {
      borderWidth: 2,
      borderColor: theme.borderColor, // ← make sure `theme.border` exists (e.g., "#ccc")
      height: 100,

      margin: 8,
      flex: 1,
      backgroundColor: theme.card,
      justifyContent: "space-between",
      padding: 5,
      borderRadius: 25,
      paddingLeft: 15,
      paddingBottom: 10,
    },

    //done
    dayName: {
      color: theme.tempText,
      fontSize: 15,
      fontWeight: "700",
      textAlign: "right",
      padding: 10,
    },
    dayDate: {
      color: theme.tempText,
      fontSize: 14,
    },
    location: {
      marginTop: 10,
      // padding: 5,
      // marginBottom: "auto",
      color: theme.tempText,
      fontSize: 30,
      fontWeight: "700",
      textAlign: "center", //  This centers the text horizontally
    },

    weatherInfo: {
      marginBottom: 10,
    },

    weatherDesc: {
      fontSize: 18,
      color: theme.tempText,
    },

    forecastIcon: {
      textAlign: "right",
      fontSize: 16,
      // right: 1000
    },
    tempDisplay: {
      textAlign: "center",
      padding: 12,
      fontSize: 72,
      fontWeight: "bold",
      color: theme.tempText,
    },

    buttons: {
      flexDirection: "row",

      justifyContent: "space-between", // ✅ THIS is what you want
      width: "100%",
    },

    buttonItem: {
      flex: 1,
      justifyContent: "space-between",
      padding: 5,
    },
    suggestionText: {
      color: theme.text,
    },

    coordBox: {
      padding: 10,
      backgroundColor: theme.card,
      borderWidth: 2,
      borderColor: theme.borderColor,
      borderRadius: 10,
      margin: 10,
      alignItems: "center",
    },

    coordTitle: {
      fontWeight: "bold",
      color: theme.tempText,
      marginBottom: 5,
    },

    coordItem: {
      color: theme.tempText,
      textAlign: "left",
      fontWeight: "bold",
      fontSize: 11,
      margin: 8,
    },
  });
