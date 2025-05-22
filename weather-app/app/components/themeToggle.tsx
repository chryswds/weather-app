import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const ThemeToggle = ({ onThemeChange }: { onThemeChange: (isDark: boolean) => void }) => {
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
      <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>
        {isDark ? '🌙 Dark' : '☀️ Light'}
      </Text>
      <Switch value={isDark} onValueChange={toggleSwitch} />
    </View>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 20,
    paddingRight: 16,
  },
  label: {
    fontSize: 16,
    marginRight: 6,
  },
});

export default ThemeToggle;
