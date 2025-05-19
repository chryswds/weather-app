import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import styles from '../Styles/weather';

type WeatherDetailItem = {
  id: string;
  icon: string;
  label: string;
};

type Props = {
  weatherDetails: WeatherDetailItem[];
};

const WeatherDetailsSlider: React.FC<Props> = ({ weatherDetails }) => {
  return (
  <FlatList
    data={weatherDetails}// here I am getting the humidity, pressure, sea level
    horizontal// here i make it be in horizontal
    showsHorizontalScrollIndicator={false} // i can show or not the indicator
    keyExtractor={(item) => item.id} 
    contentContainerStyle={{ paddingHorizontal: 8 }}
    renderItem={({ item }) => (

      // here i apply the styles to the text and boxs
      <View style={styles.weatherTextcontainer}>
        <FontAwesome5 name={item.icon} size={16} color="#FFD43B" />
        <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 8 }}>{item.label}</Text>
      </View>
    )}
  />
  );
};

export default WeatherDetailsSlider;
