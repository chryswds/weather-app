// components/Compass.tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated, Image } from "react-native";
import { Magnetometer } from "expo-sensors";

const Compass = () => {
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
    <View style={styles.container}>
      <View style={styles.labelOverlay}>
        <Text style={[styles.direction, styles.north]}>N</Text>
        <Text style={[styles.direction, styles.east]}>E</Text>
        <Text style={[styles.direction, styles.south]}>S</Text>
        <Text style={[styles.direction, styles.west]}>W</Text>
      </View>

      <View style={styles.compassWrapper}>
        <Animated.Image
          source={{
            uri: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fclipart-library.com%2Fnew_gallery%2F95-953086_clipart-pencil-and-transparent-background-compass-png.png&f=1&nofb=1&ipt=221a38549ea2d42b5f68b4c9285d35ff84899a4a70b395f57017ea76eb35c596",
          }}
          style={[styles.compassImage, { transform: [{ rotate: spin }] }]}
        />
      </View>

      <Text style={styles.headingLabel}>Compass</Text>
    </View>
  );
};

export default Compass;

const styles = StyleSheet.create({
  container: {
//     backgroundColor: "white",
    // alignItems: "center",

//     // marginVertical: 20,
//     borderRadius: 25,
    padding: 12,
//     height: 250,
//     margin: 10,
//     overflow: "hidden",
  },
  compassWrapper: {
    width: 180,
    height: 180,
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  compassImage: {
    width: 150,
    height: 150,
  },
  headingLabel: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  labelOverlay: {
    position: "absolute",
    width: 180,
    height: 180,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  direction: {
    position: "absolute",
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  north: { top: 0 },
  south: { bottom: 0 },
  east: { right: 0 },
  west: { left: 0 },
});

