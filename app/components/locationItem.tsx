import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Theme, darkTheme, lightTheme } from "../Styles/theme";
import { createStyles } from "../Styles/weather";

type Props = {
  latitude: number;
  longitude: number;
  altitude?: number;
  isDark: boolean;
};

const LocationInfo: React.FC<Props> = ({ latitude, longitude, altitude, isDark }) => {
  const theme: Theme = isDark ? darkTheme : lightTheme;
  const styles = createStyles(theme);

  return (
   <View style={[styles.weatherProperties, { margin: 10 }]}>

      <Text style={styles.label}>
        <FontAwesome5 name="globe" size={16} color={theme.icon} /> <Text style={styles.description}> Latitude: {latitude.toFixed(5)}</Text>
      </Text>
      <Text style={styles.label}>
        <FontAwesome5 name="globe" size={16} color={theme.icon} /> <Text style={styles.description}>Longitude: {longitude.toFixed(5)}
            </Text> 
      </Text>
      {altitude !== undefined && (
        <Text style={styles.label}>
          <FontAwesome5 name="mountain" size={16} color={theme.icon} /><Text style={styles.description}>  Altitude: {altitude.toFixed(1)} m
        </Text> 
        </Text>
      )}
    </View>
  );
};

export default LocationInfo;
