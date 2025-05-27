// Import required dependencies
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

// Theme toggle component with dark/light mode switch
const ThemeToggle = ({
  onThemeChange,
}: {
  onThemeChange: (isDark: boolean) => void; // Callback when theme changes
}) => {
  // Track dark mode state
  const [isDark, setIsDark] = useState(false);

  // Notify parent component when theme changes
  useEffect(() => {
    onThemeChange(isDark);
  }, [isDark, onThemeChange]);

  // Handle switch toggle
  const toggleSwitch = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <View style={styles.toggleContainer}>
      {/* Theme icon (sun/moon) */}
      <FontAwesome5
        name={isDark ? "moon" : "sun"}
        size={16}
        color={isDark ? "#fff" : "#000"}
        style={{ marginRight: 8 }}
      />
      {/* Theme label */}
      <Text
        style={[
          styles.label,
          { color: isDark ? "#fff" : "#000" },
          { fontWeight: "bold" },
        ]}
      >
        {isDark ? "Dark Mode" : "Light Mode"}
      </Text>
      {/* Theme toggle switch */}
      <Switch value={isDark} onValueChange={toggleSwitch} />
    </View>
  );
};

// Component styles
const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    marginBottom: 20,
    paddingRight: 16,
  },
  label: {
    fontSize: 14,
    marginRight: 6,
  },
});

export default ThemeToggle;
