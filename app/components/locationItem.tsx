// Import required dependencies
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { Theme, darkTheme, lightTheme } from "../Styles/theme";
import { createStyles } from "../Styles/weather";

// Define component props
type Props = {
  latitude: number;
  longitude: number;
  altitude?: number; // Optional altitude prop
  isDark: boolean;
};

// Component to display location coordinates with icons
const LocationInfo: React.FC<Props> = ({
  latitude,
  longitude,
  altitude,
  isDark,
}) => {
  // Set theme based on dark mode
  const theme: Theme = isDark ? darkTheme : lightTheme;
  const styles = createStyles(theme);

  return (
    <View style={[styles.locationCard, { margin: 10 }]}>
      {/* Latitude display with globe icon */}
      <Text>
        <FontAwesome5 name="globe" size={16} color={theme.icon} />{" "}
      </Text>
      <Text style={styles.descriptionLoc}> Lat: {latitude.toFixed(5)}</Text>

      {/* Longitude display with globe icon */}
      <Text>
        <FontAwesome5 name="globe" size={16} color={theme.icon} />{" "}
      </Text>
      <Text style={styles.descriptionLoc}>Long: {longitude.toFixed(5)}</Text>

      {/* Altitude display with mountain icon (if altitude is provided) */}
      <Text>
        <FontAwesome5 name="mountain" size={16} color={theme.icon} />
      </Text>
      {altitude !== undefined && (
        <Text style={styles.descriptionLoc}> Alt: {altitude.toFixed(1)} m</Text>
      )}
    </View>
  );
};

export default LocationInfo;
