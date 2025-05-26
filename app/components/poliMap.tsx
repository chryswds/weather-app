// Required packages:
// - react-native-maps
// - expo-location (optional)
// - react-native

import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, ScrollView } from 'react-native';
import MapView, { Polygon, PROVIDER_GOOGLE } from 'react-native-maps';

// Type definition for LatLng
type LatLng = {
  latitude: number;
  longitude: number;
};

const PolygonTool = () => {
  // Default polygon coordinates
  const [polygonCoords, setPolygonCoords] = useState<LatLng[]>([
    { latitude: 33.5362475, longitude: -111.9267386 },
    { latitude: 33.5104882, longitude: -111.9627875 },
    { latitude: 33.5004686, longitude: -111.9027061 }
  ]);

  // Text area content
  const [coordText, setCoordText] = useState('');

  // Ref to the map (not required in this example but kept for future use)
  const mapRef = useRef(null);

  // Format coordinates to Google Maps LatLng format
  const formatCoordinates = (coords: LatLng[]) => {
    return coords
      .map(c => `new google.maps.LatLng(${c.latitude.toFixed(5)}, ${c.longitude.toFixed(5)})`)
      .join(',\n');
  };

  // Update text when polygon changes
  useEffect(() => {
    setCoordText(formatCoordinates(polygonCoords));
  }, [polygonCoords]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Drag polygon to update coordinates</Text>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 33.5190755,
          longitude: -111.9253654,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
      >
        <Polygon
          coordinates={polygonCoords}
          fillColor="rgba(255,0,0,0.3)"
          strokeColor="#FF0000"
          strokeWidth={2}
          // Optional: if you want user to edit the shape (drag points), this needs external logic
        />
      </MapView>

      <Text style={styles.label}>Polygon Coordinates (Google Maps format):</Text>
      <TextInput
        style={styles.textArea}
        value={coordText}
        editable={false}
        multiline
      />
    </ScrollView>
  );
};

export default PolygonTool;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#222',
  },
  title: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  map: {
    width: '100%',
    height: 400,
  },
  label: {
    color: '#fff',
    marginTop: 10,
    marginBottom: 4,
  },
  textArea: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    color: '#fff',
    backgroundColor: '#333',
    height: 120,
    borderRadius: 5,
  },
});
