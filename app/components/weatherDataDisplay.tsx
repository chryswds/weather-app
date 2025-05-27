import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, View } from "react-native";
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
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 8 }}
    >
      {weatherDetails.map((item) => (
        <View key={item.id} style={styles.weatherTextcontainer}>
          <FontAwesome5 size={20} color={theme.icon} name={item.icon} />
          <Text style={[styles.label, { color: theme.text }]}>
            {item.label}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default WeatherDetailsSlider;
