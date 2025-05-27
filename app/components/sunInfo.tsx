// Import required dependencies
import dayjs from "dayjs";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

// Define component props
type Props = {
  sunrise: number; // UNIX timestamp for sunrise time
  sunset: number; // UNIX timestamp for sunset time
  isDark: boolean; // Theme mode indicator
};

// Component to display sunrise and sunset times
const SunInfo: React.FC<Props> = ({ sunrise, sunset, isDark }) => {
  // Convert UNIX timestamp to readable time format (e.g., "7:30 AM")
  const formatTime = (timestamp: number) =>
    dayjs.unix(timestamp).format("h:mm A");

  return (
    <View
      style={[
        styles.container,
        {
          // Set background color based on theme
          backgroundColor: isDark
            ? "rgba(28, 28, 30, 0.7)"
            : "rgba(240, 240, 240, 0.8)",
        },
        {
          // Set border color based on theme
          borderColor: isDark ? "#ccc" : "rgba(0, 0, 0, 0.9)",
        },
      ]}
    >
      {/* Sunrise section */}
      <Text
        style={[
          styles.label,
          { color: isDark ? "#fff" : "#000" },
          { textAlign: "center" },
          { fontSize: 25 },
        ]}
      >
        ☀️
      </Text>
      <Text style={{ textAlign: "center", color: isDark ? "#fff" : "#000" }}>
        Sunrise: {formatTime(sunrise)}
      </Text>

      {/* Sunset section */}
      <Text
        style={[
          styles.label,
          { color: isDark ? "#fff" : "#000" },
          { textAlign: "center" },
          { fontSize: 25 },
        ]}
      >
        🌙
      </Text>
      <Text style={{ textAlign: "center", color: isDark ? "#fff" : "#000" }}>
        Sunset: {formatTime(sunset)}
      </Text>
    </View>
  );
};

export default SunInfo;

// Component styles
const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    padding: 16,
    margin: 10,
    borderWidth: 2,
    borderColor: "white",
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
});
