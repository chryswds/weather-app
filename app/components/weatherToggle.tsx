import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { Theme } from "../Styles/weather"; // Importa o tipo do tema

type Props = {
  isCelsius: boolean;
  onToggle: () => void;
  theme: Theme; // 👈 recebe o tema como prop
};

const TempUnitToggle: React.FC<Props> = ({ isCelsius, onToggle, theme }) => {
  return (
    <View style={styles(theme).toggleRow}>
      <FontAwesome5 name="temperature-high" size={18} color={theme.tempText} />
      <Text style={[styles(theme).label, { color: theme.tempText }]}>
        Show {isCelsius ? "°F" : "°C"}
      </Text>
      <Switch
        value={!isCelsius}
        onValueChange={onToggle}
        // thumbColor="#fff"
        // trackColor={{ true: theme.accent, false: '#888' }}
      />
    </View>
  );
};

// 🔧 Dynamic styles based on theme
const styles = (theme: Theme) =>
  StyleSheet.create({
    toggleRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      alignSelf: "flex-end",
      marginBottom: 20,
      paddingRight: 16,
    },
    label: {
      fontSize: 16,
      marginHorizontal: 6,
    },
  });

export default TempUnitToggle;
