import React from "react";
import { Text, View } from "react-native";
import { Theme, darkTheme, lightTheme } from "../Styles/theme";
import { createStyles } from "../Styles/weather";

type Props = {
  aqi: number;
  co: number;
  no2: number;
  isDark: boolean;
};

const AirQualityInfo: React.FC<Props> = ({ aqi, co, no2, isDark }) => {
  const theme: Theme = isDark ? darkTheme : lightTheme;
  const styles = createStyles(theme);

  const aqiLabel = (aqi: number) => {
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Moderate";
    if (aqi <= 150) return "Unhealthy for Sensitive Groups";
    if (aqi <= 200) return "Unhealthy";
    return "Very Unhealthy";
  };

  return (
    <View style={styles.locationCard}>
      <Text style={styles.descriptionLoc}>
        AQI: {aqi} ({aqiLabel(aqi)})
      </Text>
      <Text style={styles.descriptionLoc}>CO: {co} µg/m³</Text>
      <Text style={styles.descriptionLoc}>NO₂: {no2} µg/m³</Text>
    </View>
  );
};

export default AirQualityInfo;
