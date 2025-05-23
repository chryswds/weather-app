// Import React and necessary components from React Native
import dayjs from "dayjs"; // Library used to format dates
import localeData from "dayjs/plugin/localeData";

import weekday from "dayjs/plugin/weekday";
import React from "react";
import { FlatList, Text, View } from "react-native";
// import styles from '../Styles/weather';
import FontAwesome5 from "@expo/vector-icons/build/FontAwesome5";
import { createStyles } from '../Styles/weather';
import { lightTheme, darkTheme } from '../Styles/theme';


dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.locale("en");

// Define the structure of a single forecast item
type WeatherForecast = {
  main: {
    temp: number; // Temperature value
  };
  dt: number; // UNIX timestamp for the date/time of forecast
};

// Define the expected props that the ForecastList component will receive
type Props = {
  forecast: WeatherForecast[]; // An array of forecast items
  isDark: boolean;

};

// Functional component that receives forecast data and renders a list
const ForecastList: React.FC<Props> = ({ forecast, isDark}) => {
  const theme = isDark ? darkTheme : lightTheme;
const styles = createStyles(theme);
  return (
    <FlatList
      // Pass the forecast array as data to the FlatList
      data={forecast}
      // Provide a unique key for each item (required by FlatList)
      keyExtractor={(item) => item.dt.toString()}
      // For each item, render a small card with date and temperature
      renderItem={({ item }) => (
        <View style={styles.forecastItem}>
          <Text style={styles.date}>
            {/* Format the timestamp into a readable day and date */}
            {dayjs(item.dt * 1000).format('dddd, MMMM D • h:mm A')}
          </Text>
          <Text style={styles.temp}><FontAwesome5  name="thermometer-half"/>
            {/* Display the temperature */}{"  "} {/*this will give a space in the thermometer*/}
            {item.main.temp} °C
          </Text>
        </View>
      )}
    />
  );
};


// Export the component so it can be used in other files
export default ForecastList;
