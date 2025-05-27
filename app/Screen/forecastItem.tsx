// Import required dependencies
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import weekday from "dayjs/plugin/weekday";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { darkTheme, lightTheme } from "../Styles/theme";
import { createStyles } from "../Styles/weather";

// Configure dayjs plugins and locale
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("en");

// Type definition for weather forecast data
type WeatherForecast = {
  main: {
    temp: number; // Temperature in Celsius
  };
  weather: {
    main: string; // Main weather condition
    description: string; // Detailed weather description
  }[];
  dt: number; // UNIX timestamp for the forecast
};

// Props definition for the forecast list component
type Props = {
  forecast: WeatherForecast[]; // Array of weather forecasts
  isDark: boolean; // Theme mode indicator
};

// Helper function to map weather conditions to FontAwesome5 icon names
const getWeatherIcon = (condition: string): string => {
  switch (condition.toLowerCase()) {
    case "clear":
      return "sun";
    case "clouds":
      return "cloud";
    case "rain":
      return "cloud-rain";
    case "thunderstorm":
      return "bolt";
    case "snow":
      return "snowflake";
    case "mist":
    case "fog":
      return "smog";
    default:
      return "cloud"; // fallback icon
  }
};

// Component to display a list of weather forecasts
const ForecastList: React.FC<Props> = ({ forecast, isDark }) => {
  // Select theme based on isDark flag
  const theme = isDark ? darkTheme : lightTheme;
  const styles = createStyles(theme);
  
  // State to track current time for updating display
  const [currentTime, setCurrentTime] = useState(dayjs());

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.forecastContainer}>
      {/* Map through forecast items and render each one */}
      {forecast.map((item) => {
        // Get appropriate weather icon for the condition
        const iconName = getWeatherIcon(item.weather[0].main);
        return (
          <View key={item.dt.toString()} style={styles.forecastItem}>
            {/* Display forecast date */}
            <Text style={styles.date}>
              {dayjs.unix(item.dt).format("dddd, MMMM D")}
            </Text>
            {/* Display weather description */}
            <Text style={styles.forecastDescription}>
              {item.weather[0].description}
            </Text>
            {/* Display weather icon and temperature */}
            <Text style={[styles.forecastIcon, { color: theme.tempText }]}>
              <FontAwesome5 size={16} color={theme.icon} name={iconName} />{" "}
              <Text style={{ color: theme.tempText }}>{item.main.temp} °C</Text>
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default ForecastList;
