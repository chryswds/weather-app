import React, { useEffect, useState } from "react";
import { View, Text, Animated } from "react-native";
import { Magnetometer } from "expo-sensors";
import { createStyles } from "../Styles/weather";
import { Theme, darkTheme, lightTheme } from "../Styles/theme";


type Props = {
  userLocation: { latitude: number; longitude: number };
  targetLocation: { latitude: number; longitude: number };
  isDark: boolean;
};


const Compass: React.FC<Props> = ({ isDark }) => {
  const theme: Theme = isDark ? darkTheme : lightTheme;
  const styles = createStyles(theme);

  const [angle] = useState(new Animated.Value(0));

  useEffect(() => {
    const subscription = Magnetometer.addListener(({ x, y }) => {
      let heading = Math.atan2(y, x) * (180 / Math.PI);
      heading = heading >= 0 ? heading : heading + 360;

      Animated.timing(angle, {
        toValue: heading,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });

    return () => subscription.remove();
  }, []);

  const spin = angle.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.containerCompass}>
       
      <View style={styles.labelOverlay}>
        <Text style={[styles.direction, styles.north]}>N</Text>
        <Text style={[styles.direction, styles.east]}>E</Text>
        <Text style={[styles.direction, styles.south]}>S</Text>
        <Text style={[styles.direction, styles.west]}>W</Text>
      </View>

      <View style={styles.compassWrapper}>
        <Animated.Image
          source={{
            uri: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fclipart-library.com%2Fnew_gallery%2F95-953086_clipart-pencil-and-transparent-background-compass-png.png&f=1&nofb=1",
          }}
          style={[styles.compassImage, { transform: [{ rotate: spin }] }]}
        />
      </View>

      {"\n\n"}{"\n\n"}
 <Text style={styles.headingLabel}>Compass</Text>   
      
    </View>
  );
};

export default Compass;
