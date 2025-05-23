import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { createStyles } from '../Styles/weather';
import { lightTheme, darkTheme } from '../Styles/theme';

type WeatherDetailItem = {
  id: string;
  icon: string;
  label: string;
};

type Props = {
  weatherDetails: WeatherDetailItem[];
  isDark: boolean;
};

const WeatherDetailsSlider: React.FC<Props> = ({ weatherDetails, isDark }) => {
  const theme = isDark ? darkTheme : lightTheme;
  const styles = createStyles(theme);

  return (
    <FlatList
      data={weatherDetails}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingHorizontal: 8 }}
      renderItem={({ item }) => (
        <View style={styles.weatherTextcontainer}>
          <FontAwesome5 name={item.icon} size={16} color={theme.text} />
          <Text style={[styles.label, { color: theme.text }]}>{item.label}</Text>
        </View>
      )}
    />
  );
};

export default WeatherDetailsSlider;
