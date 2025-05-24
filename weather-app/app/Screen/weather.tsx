import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Location from "expo-location";

import ForecastList from "../Screen/forecastItem";
import { searchLocation } from "../Screen/searchLocation";
import SearchBar from "../components/searchbar";
import WeatherDetailsSlider from "../components/weatherDataDisplay";
import { getWeatherData } from "../utils/fetcheWeatherData";
import { useTemperatureUnit } from "../hooks/useTemperatureUnit";
import ThemeToggle from "../components/themeToggle";
import TempUnitToggle from "../components/weatherToggle";
import { createStyles } from "../Styles/weather";
import { darkTheme, lightTheme } from "../Styles/theme";

// Types for weather data structure

type MainWeather = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
};

type Weather = {
  name: string;
  main: MainWeather;
};

const WeatherScreen = () => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [forecast, setForecast] = useState<[]>();
  const [searchText, setSearchText] = useState("");
  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);

  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;
  const styles = createStyles(theme);

  const { isCelsius, toggleUnit, convertTemperature } = useTemperatureUnit();

  // Get current device location and fetch weather/forecast
  useEffect(() => {
    if (location) {
      getWeatherData(
        location.coords.latitude,
        location.coords.longitude,
        setWeather,
        setBackgroundUrl
      );
      fetchForecast();
    }
  }, [location]);

  // Request location permission and get current location
  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }
    getCurrentLocation();
  }, []);

  const APIUrl = `https://api.openweathermap.org/data/2.5`;
  const lat = location?.coords.latitude;
  const lon = location?.coords.longitude;
  const APIKey = process.env.OPENWEATHER_API_KEY;

  // Fetch 5-day forecast, 12 PM entries only
  const fetchForecast = async () => {
    if (!location) return;
    const results = await fetch(
      `${APIUrl}/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`
    );
    const data = await results.json();
    const dailyForecast = data.list.filter((item: any) =>
      item.dt_txt.includes("12:00:00")
    );
    setForecast(dailyForecast || []);
  };

  // Handle city search and update location
  const handleSearch = async () => {
    if (!searchText) return;
    try {
      const result = await searchLocation(searchText);
      if (result?.lat && result?.lon) {
        setLocation({
          coords: {
            latitude: result.lat,
            longitude: result.lon,
            altitude: 0,
            accuracy: 0,
            altitudeAccuracy: 0,
            heading: 0,
            speed: 0,
          },
          timestamp: Date.now(),
        });
        setErrorMsg("");
      } else {
        setErrorMsg("Location not found");
      }
    } catch (error) {
      setErrorMsg("Error searching for location");
    }
  };

  const handleCitySelect = (lat: number, lon: number) => {
    setLocation({
      coords: {
        latitude: lat,
        longitude: lon,
        altitude: 0,
        accuracy: 0,
        altitudeAccuracy: 0,
        heading: 0,
        speed: 0,
      },
      timestamp: Date.now(),
    });
  };

  // Loading fallback
  if (!weather) {
    return <ActivityIndicator />;
  }

  // Weather details rendered in slider
  const weatherDetails = [
    { id: "1", icon: "tint", label: `Humidity: ${weather.main.humidity}%` },
    { id: "2", icon: "tachometer-alt", label: `Pressure: ${weather.main.pressure} hPa` },
    { id: "3", icon: "water", label: `Sea Level: ${weather.main.sea_level ?? "N/A"} hPa` },
    { id: "4", icon: "globe", label: `Ground Level: ${weather.main.grnd_level ?? "N/A"} hPa` },
  ];
  
console.log("isDark mode:", isDark);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>


      <ScrollView style={[styles.scrollWrapper,{
      backgroundColor: isDark ? theme.background : 'rgba(0,0,0,0)', // FULL transparency
    },] } contentContainerStyle={styles.container}>

            <ImageBackground
  
>

     <View
  style={
    styles.container
   }
>


          <SearchBar
            searchText={searchText}
            setSearchText={setSearchText}
            handleSearch={handleSearch}
            onCitySelect={handleCitySelect}
            isDark={isDark}
          />

          <View style={styles.topCard}>
            <Text style={styles.location}>
              <FontAwesome5 name="map-marker-alt" size={20} color={theme.accent} /> {weather.name}
            </Text>

            <TempUnitToggle isCelsius={isCelsius} onToggle={toggleUnit} theme={theme} />
            <ThemeToggle onThemeChange={setIsDark} />

            <Text style={styles.tempText}>
              {convertTemperature(weather.main.temp).toFixed(1)}°{isCelsius ? 'C' : 'F'}
            </Text>

            <Text style={styles.description}>
              Feels Like: {convertTemperature(weather.main.feels_like).toFixed(1)}°{isCelsius ? 'C' : 'F'}
            </Text>

            <View style={styles.tempRange}>
              <Text style={styles.description}>
                <FontAwesome5 name="arrow-up" size={14} /> Max: {convertTemperature(weather.main.temp_max).toFixed(1)}°{isCelsius ? 'C' : 'F'}
              </Text>
              <Text style={styles.description}>
                <FontAwesome5 name="arrow-down" size={14} /> Min: {convertTemperature(weather.main.temp_min).toFixed(1)}°{isCelsius ? 'C' : 'F'}
              </Text>
            </View>
          </View>

          <WeatherDetailsSlider weatherDetails={weatherDetails} isDark={isDark} />
          <ForecastList forecast={forecast ?? []} isDark={isDark} />
        </View>
            </ImageBackground>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default WeatherScreen;