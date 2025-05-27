import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import weekday from "dayjs/plugin/weekday";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

import { darkTheme, lightTheme } from "../Styles/theme";
import { createStyles } from "../Styles/weather";

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("en");

type WeatherForecast = {
  main: {
    temp: number;
  };
  weather: {
    main: string;
    description: string;
  }[];
  dt: number; // UNIX timestamp
};

type Props = {
  forecast: WeatherForecast[];
  isDark: boolean;
};

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

const ForecastList: React.FC<Props> = ({ forecast, isDark }) => {
  const theme = isDark ? darkTheme : lightTheme;
  const styles = createStyles(theme);
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <FlatList
      data={forecast}
      keyExtractor={(item) => item.dt.toString()}
      renderItem={({ item }) => {
        const iconName = getWeatherIcon(item.weather[0].main);
        return (
          <View style={styles.forecastItem}>
            <Text style={styles.date}>
              {dayjs.unix(item.dt).format("dddd, MMMM D")}
            </Text>
            <Text style={styles.forecastDescription}>
              {item.weather[0].description}
            </Text>
            <Text style={[styles.forecastIcon, { color: theme.tempText }]}>
              <FontAwesome5 size={16} color={theme.icon} name={iconName} />{" "}
              <Text style={{ color: theme.tempText }}>{item.main.temp} °C</Text>
            </Text>
          </View>
        );
      }}
    />
  );
};

export default ForecastList;
