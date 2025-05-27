// Import required dependencies
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { darkTheme, lightTheme } from "../Styles/theme";
import { createStyles } from "../Styles/weather";

// Define structure for weather detail items
type WeatherDetailItem = {
  id: string; // Unique identifier
  icon: string; // FontAwesome icon name
  label: string; // Display text
};

// Define component props
type Props = {
  weatherDetails: WeatherDetailItem[]; // Array of weather details to display
  isDark: boolean; // Theme mode indicator
};

// Horizontal scrollable weather details component
const WeatherDetailsSlider: React.FC<Props> = ({ weatherDetails, isDark }) => {
  // Set theme based on dark mode
  const theme = isDark ? darkTheme : lightTheme;
  const styles = createStyles(theme);

  return (
    <View style={{ marginVertical: 10 }}>
      {/* Horizontal scrollable container */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 8 }}
      >
        {/* Map through and display each weather detail */}
        {weatherDetails.map((item) => (
          <View key={item.id} style={styles.weatherTextcontainer}>
            {/* Weather icon */}
            <FontAwesome5 size={20} color={theme.icon} name={item.icon} />
            {/* Weather detail text */}
            <Text style={[styles.label, { color: theme.text }]}>
              {item.label}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default WeatherDetailsSlider;
