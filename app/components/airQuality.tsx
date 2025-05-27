// Import necessary modules from React and React Native
import React from "react";
import { Text, View } from "react-native";
// Import theme types and theme objects
import { Theme, darkTheme, lightTheme } from "../Styles/theme";
// Import function to create styles
import { createStyles } from "../Styles/weather";

// Define the props for the AirQualityInfo component
// aqi: Air Quality Index value
// co: Carbon Monoxide concentration
// no2: Nitrogen Dioxide concentration
// isDark: Boolean to determine if dark theme is used
type Props = {
  aqi: number;
  co: number;
  no2: number;
  isDark: boolean;
};

// AirQualityInfo component displays air quality information
const AirQualityInfo: React.FC<Props> = ({ aqi, co, no2, isDark }) => {
  // Select theme based on isDark prop
  const theme: Theme = isDark ? darkTheme : lightTheme;
  // Generate styles using the selected theme
  const styles = createStyles(theme);

  // Helper function to get AQI label based on value
  const aqiLabel = (aqi: number) => {
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Moderate";
    if (aqi <= 150) return "Unhealthy for Sensitive Groups";
    if (aqi <= 200) return "Unhealthy";
    return "Very Unhealthy";
  };

  // Render the air quality information
  return (
    <View style={styles.locationCard}>
      {/* Display AQI value and its label */}
      <Text style={styles.descriptionLoc}>
        AQI: {aqi} ({aqiLabel(aqi)})
      </Text>
      {/* Display CO concentration */}
      <Text style={styles.descriptionLoc}>CO: {co} µg/m³</Text>
      {/* Display NO2 concentration */}
      <Text style={styles.descriptionLoc}>NO₂: {no2} µg/m³</Text>
    </View>
  );
};

// Export the component as default
export default AirQualityInfo;
