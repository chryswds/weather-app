// Import React and necessary components from React Native
import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import dayjs from 'dayjs'; // Library used to format dates
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

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
};

// Functional component that receives forecast data and renders a list
const ForecastList: React.FC<Props> = ({ forecast }) => {
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
            {dayjs(item.dt * 1000).format('dddd, DD/MM')}
          </Text>
          <Text style={styles.temp}>
            {/* Display the temperature */}
            {item.main.temp}°C
          </Text>
        </View>
      )}
    />
  );
};

// Define custom styles for the forecast item UI
const styles = StyleSheet.create({
  forecastItem: {
    backgroundColor: '#7E5CFF', 
    borderRadius: 8,           
    margin: 4,                  
    padding: 8,                 
  },
  date: {
    color: '#FFD43B',           
    fontWeight: 'bold',         
    fontSize: 14,               
  },
  temp: {
    color: '#FFFFFF',           
    fontSize: 16,               
  },
});

// Export the component so it can be used in other files
export default ForecastList;
