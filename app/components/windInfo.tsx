// Import required dependencies
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Animated, Text, View } from "react-native";
import { Theme, darkTheme, lightTheme } from "../Styles/theme";
import { createStyles } from "../Styles/weather";

// Props definition for the wind information component
type Props = {
  speed: number; // wind speed in km/h
  direction: number; // wind direction in degrees
  isDark: boolean; // theme mode indicator
};

// Component to display wind speed and direction with animated arrow
const WindInfo: React.FC<Props> = ({ speed, direction, isDark }) => {
  // Select theme based on isDark flag
  const theme: Theme = isDark ? darkTheme : lightTheme;
  // Create styles using the selected theme
  const styles = createStyles(theme);

  // Convert wind direction to rotation degree string for animation
  const rotation = direction + "deg";

  return (
    <View style={styles.windSpeedCard}>
      <FontAwesome5
        name="wind"
        size={14}
        color={theme.icon}
        style={{ textAlign: "center", padding: 13, fontSize: 20 }}
      />
      <View>
        <Text
          style={{
            color: theme.tempText,
            fontSize: 13,
            fontWeight: "bold",
            textAlign: "center",
            paddingRight: 10,
            marginBottom: 5,
          }}
        >
          Wind Speed: {speed.toFixed(1)} km/h
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 13,
            marginBottom: 10,
          }}
        >
          <Animated.View style={{ transform: [{ rotate: rotation }] }}>
            <FontAwesome5 name="location-arrow" size={14} color={theme.icon} />
          </Animated.View>
          <Text style={{ color: theme.text, marginLeft: 8 }}>
            Direction: {direction.toFixed(0)}°
          </Text>
        </View>
      </View>
    </View>
  );
};

export default WindInfo;
