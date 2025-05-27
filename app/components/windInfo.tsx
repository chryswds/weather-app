import React from "react";
import { View, Text, StyleSheet, Animated, Image } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Theme, lightTheme, darkTheme } from "../Styles/theme";
import { createStyles } from "../Styles/weather";

type Props = {
  speed: number; // wind speed
  direction: number; // wind direction in degrees
  isDark: boolean;
};

const WindInfo: React.FC<Props> = ({ speed, direction, isDark }) => {
  const theme: Theme = isDark ? darkTheme : lightTheme;
  const styles = createStyles(theme);

  const rotation = direction + "deg";

  return (
    <View style={styles.weatherTextcontainer}>
      <FontAwesome5 name="wind" size={24} color={theme.icon} style={{ marginRight: 12 }} />
      <View>
        <Text style={{ color: theme.tempText, fontSize: 18, fontWeight: "bold" }}>
          Wind Speed: {speed.toFixed(1)} km/h
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
          <Animated.View style={{ transform: [{ rotate: rotation }] }}>
            <FontAwesome5 name="location-arrow" size={18} color={theme.icon} />
          </Animated.View>
          <Text style={{ color: theme.text, marginLeft: 6 }}>
            Direction: {direction.toFixed(0)}°
          </Text>
        </View>
      </View>
    </View>
  );
};

export default WindInfo;
