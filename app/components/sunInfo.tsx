import dayjs from "dayjs";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
type Props = {
  sunrise: number; // UNIX timestamp
  sunset: number; // UNIX timestamp
  isDark: boolean;
};

const SunInfo: React.FC<Props> = ({ sunrise, sunset, isDark }) => {
  const formatTime = (timestamp: number) =>
    dayjs.unix(timestamp).format("h:mm A");

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark
            ? "rgba(28, 28, 30, 0.7)"
            : "rgba(240, 240, 240, 0.8)",
        },
        {
          borderColor: isDark
            ? "#ccc"
            : "linear-gradient(90deg,rgba(42, 123, 155, 1) 0%, rgba(96, 87, 199, 1) 91%, rgb(255, 255, 255) 100%)",
        },
      ]}
    >
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
