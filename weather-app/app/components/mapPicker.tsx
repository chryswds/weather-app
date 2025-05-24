// // components/MapPicker.tsx
// import React, { useState } from 'react';
// import { View, StyleSheet, Dimensions } from 'react-native';
// import MapView, { Marker, MapPressEvent } from 'react-native-maps';

// type Props = {
//   onLocationSelected: (lat: number, lon: number) => void;
// };

// export const MapPicker: React.FC<Props> = ({ onLocationSelected }) => {
//   const [marker, setMarker] = useState<{ latitude: number; longitude: number } | null>(null);

//   const handlePress = (e: MapPressEvent) => {
//     const { latitude, longitude } = e.nativeEvent.coordinate;
//     setMarker({ latitude, longitude });
//     onLocationSelected(latitude, longitude);
//   };

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={StyleSheet.absoluteFillObject}
//         initialRegion={{
//           latitude: 0,
//           longitude: 0,
//           latitudeDelta: 40,
//           longitudeDelta: 40,
//         }}
//         onPress={handlePress}
//       >
//         {marker && <Marker coordinate={marker} />}
//       </MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     height: Dimensions.get('window').height * 0.5,
//     borderRadius: 16,
//     overflow: 'hidden',
//     marginVertical: 20,
//   },
// });

// export default MapPicker;
