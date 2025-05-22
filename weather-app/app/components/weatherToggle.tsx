import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const TempUnitToggle = ({ isCelsius, onToggle }: { isCelsius: boolean; onToggle: () => void }) => {
  return (
    <View style={styles.toggleRow}>
      <FontAwesome5 name="temperature-high" size={18} color="#FFD43B" />
      <Text style={styles.label}>Show {isCelsius ? '°F' : '°C'}</Text>
      <Switch
        value={!isCelsius}
        onValueChange={onToggle}
        thumbColor="#fff"
        trackColor={{ true: 'green', false: '#888' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-end',
    marginBottom: 20,
    paddingRight: 16,
  },
  label: {
    fontSize: 16,
    marginHorizontal: 6,
  },
});

export default TempUnitToggle;
