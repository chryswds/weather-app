import React from "react";
import { View, Text } from "react-native";
import { createStyles } from "../Styles/weather";
import { Theme, darkTheme, lightTheme } from "../Styles/theme";

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
    <View style={styles.weatherTextcontainer}>
      <Text style={styles.description}>AQI: {aqi} ({aqiLabel(aqi)})</Text>
      <Text style={styles.description}>CO: {co} µg/m³</Text>
      <Text style={styles.description}>NO₂: {no2} µg/m³</Text>
    </View>
  );
};

export default AirQualityInfo;
