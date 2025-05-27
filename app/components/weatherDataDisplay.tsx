import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { darkTheme, lightTheme } from "../Styles/theme";
import { createStyles } from "../Styles/weather";

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
          <FontAwesome5 size={16} color={theme.icon} name={item.icon} />
          <Text style={[styles.label, { color: theme.text }]}>
            {item.label}
          </Text>
        </View>
      )}
    />
  );
};

export default WeatherDetailsSlider;
