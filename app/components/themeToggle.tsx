import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

const ThemeToggle = ({
  onThemeChange,
}: {
  onThemeChange: (isDark: boolean) => void;
}) => {
  const [isDark, setIsDark] = useState(false);

  const toggleSwitch = () => {
    setIsDark((prev) => {
      const newValue = !prev;
      onThemeChange(newValue);
      return newValue;
    });
  };

  return (
    <View style={styles.toggleContainer}>
      <FontAwesome5
        name={isDark ? "moon" : "sun"}
        size={16}
        color={isDark ? "#fff" : "#000"}
        style={{ marginRight: 8 }}
      />
      <Text
        style={[
          styles.label,
          { color: isDark ? "#fff" : "#000" },
          { fontWeight: "bold" },
        ]}
      >
        {isDark ? "Dark Mode" : "Light Mode"}
      </Text>
      <Switch value={isDark} onValueChange={toggleSwitch} />
    </View>
  );
};

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
