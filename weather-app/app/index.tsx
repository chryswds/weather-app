import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
{/* 
      <Image
  source={{ uri: 'https://github.com/chryswds/weather-app/raw/master/weather-app/assets/images/icon.png' }}
  style={styles.logo}
  resizeMode="contain"
/> */}
      <Image
       source ={{uri:'https://github.com/chryswds/weather-app/blob/UI-app/weather-app/assets/images/image.png?raw=true'}} // i am getting this link from our github
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Weather</Text>
      <Text style={styles.subtitle}>ForeCasts</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/Screen/weather')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5E2EFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 40,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 28,
    color: '#FFD43B',
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#FFD43B',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 40,
    elevation: 5,
  },
  buttonText: {
    color: '#1a1a1a',
    fontSize: 18,
    fontWeight: '600',
  },
});
