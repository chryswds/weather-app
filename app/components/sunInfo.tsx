import React from "react";
import { View, Text, StyleSheet } from "react-native";
import dayjs from "dayjs";

type Props = {
  sunrise: number; // UNIX timestamp
  sunset: number;  // UNIX timestamp
  isDark: boolean;
};

const SunInfo: React.FC<Props> = ({ sunrise, sunset, isDark }) => {
  const formatTime = (timestamp: number) => dayjs.unix(timestamp).format("h:mm A");

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#666666" : "#F5F5F5" }]}>
      <Text style={styles.label}>☀️ Sunrise: {formatTime(sunrise)}</Text>
      <Text style={styles.label}>🌙 Sunset: {formatTime(sunset)}</Text>
    </View>
  );
};

export default SunInfo;

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    padding: 16,
    margin: 10,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
});
