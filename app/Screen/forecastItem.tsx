import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import { darkTheme, lightTheme } from "../Styles/theme";
import { createStyles } from "../Styles/weather";

// ⬇️ Extend dayjs with the necessary plugins
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("en");

// Define the structure of a single forecast item
type WeatherForecast = {
  main: {
    temp: number;
  };
  dt: number; // UNIX timestamp
};

// Props passed to the ForecastList
type Props = {
  forecast: WeatherForecast[];
  isDark: boolean;
};

const ForecastList: React.FC<Props> = ({ forecast, isDark }) => {
  const theme = isDark ? darkTheme : lightTheme;
  const styles = createStyles(theme);
   const [currentTime, setCurrentTime] = useState(dayjs());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000); // update every second
  
    return () => clearInterval(interval);
  }, []);

  return (
     <><Text style={{ fontSize: 20, color: 'red', textAlign: 'center', marginTop: 20 }}>
     
    </Text><FlatList
        data={forecast}
        keyExtractor={(item) => item.dt.toString()}
        renderItem={({ item }) => (
          <View style={styles.forecastItem}>
            <Text style={styles.date}>
 {currentTime.format("dddd, MMMM D • h:mm:ss A")}
              
            </Text>
            <Text style={styles.suggestionText}>
              <FontAwesome5 name="thermometer-half" />{"  "}
              {item.main.temp} °C
            </Text>
          </View>

        )} /></>
  );
};

export default ForecastList;
