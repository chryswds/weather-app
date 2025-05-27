// Import required dependencies
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { Theme } from "../Styles/weather";

// Define component props
type Props = {
  isCelsius: boolean; // Current temperature unit state
  onToggle: () => void; // Handler for unit toggle
  theme: Theme; // Theme for styling
};

// Temperature unit toggle component (Celsius/Fahrenheit)
const TempUnitToggle: React.FC<Props> = ({ isCelsius, onToggle, theme }) => {
  return (
    <View style={styles(theme).toggleRow}>
      {/* Temperature icon */}
      <FontAwesome5 name="temperature-high" size={18} color={theme.tempText} />

      {/* Toggle label showing the unit to switch to */}
      <Text
        style={[
          styles(theme).label,
          { color: theme.tempText },
          { fontWeight: "bold" },
        ]}
      >
        Show {isCelsius ? "°F" : "°C"}
      </Text>

      {/* Toggle switch (inverted value since label shows the opposite unit) */}
      <Switch
        value={!isCelsius}
        onValueChange={onToggle}
        // Commented out custom styling options
        // thumbColor="#fff"
        // trackColor={{ true: theme.accent, false: '#888' }}
      />
    </View>
  );
};

// Theme-based styles
const styles = (theme: Theme) =>
  StyleSheet.create({
    toggleRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      alignSelf: "flex-end",
      marginBottom: 20,
      paddingLeft: 10,
    },
    label: {
      fontSize: 14,
      marginHorizontal: 6,
    },
  });

export default TempUnitToggle;
