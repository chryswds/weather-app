import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { Theme, darkTheme, lightTheme } from "../Styles/theme";
import { createStyles } from "../Styles/weather";

type Props = {
  latitude: number;
  longitude: number;
  altitude?: number;
  isDark: boolean;
};

const LocationInfo: React.FC<Props> = ({
  latitude,
  longitude,
  altitude,
  isDark,
}) => {
  const theme: Theme = isDark ? darkTheme : lightTheme;
  const styles = createStyles(theme);

  return (
    <View style={[styles.locationCard, { margin: 10 }]}>
      <Text>
        <FontAwesome5 name="globe" size={16} color={theme.icon} />{" "}
      </Text>
      <Text style={styles.descriptionLoc}> Lat: {latitude.toFixed(5)}</Text>
      <Text>
        <FontAwesome5 name="globe" size={16} color={theme.icon} />{" "}
      </Text>
      <Text style={styles.descriptionLoc}>Long: {longitude.toFixed(5)}</Text>

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
