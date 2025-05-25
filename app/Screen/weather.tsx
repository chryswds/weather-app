import { FontAwesome5 } from "@expo/vector-icons";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import SearchBar from "../components/searchbar";
import ThemeToggle from "../components/themeToggle";
import WeatherDetailsSlider from "../components/weatherDataDisplay";
import TempUnitToggle from "../components/weatherToggle";
import { useTemperatureUnit } from "../hooks/useTemperatureUnit";
import ForecastList from "../Screen/forecastItem";
import { searchLocation } from "../Screen/searchLocation";
import { darkTheme, lightTheme } from "../Styles/theme";
import { createStyles } from "../Styles/weather";
import { getWeatherData } from "../utils/fetcheWeatherData";
import { background } from "./background";
import dayjs from "dayjs";

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

type WeatherConditionType = {
  main: string;
  description: string;
};

type Weather = {
  name: string;
  main: MainWeather;
  weather: WeatherConditionType[];
};
// ... all your imports
// import { background } from "./background"; // ✅ Import your background util

// ... MainWeather, WeatherConditionType, Weather types stay the same

const WeatherScreen = () => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [forecast, setForecast] = useState<[]>();
  const [searchText, setSearchText] = useState("");
  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(dayjs());

  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;
  const styles = createStyles(theme);

  const { isCelsius, toggleUnit, convertTemperature } = useTemperatureUnit();

  const APIKey = `127ec3a0b8768a330c3b0f8c3ef48420`;
  const APIUrl = `https://api.openweathermap.org/data/2.5`;
  const lat = location?.coords.latitude;
  const lon = location?.coords.longitude;

  // ✅ NEW: Fetch weather and update background URL
  const fetchCurrentWeather = async () => {
    if (!location) return;

    const res = await fetch(
      `${APIUrl}/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`
    );
    const data = await res.json();
    setWeather(data);

    const temp = data.main.temp;
    const desc = data.weather?.[0]?.main ?? "";
    setBackgroundUrl(background(temp, desc));
  };

  // ✅ Live clock
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Weather refresh + forecast
  useEffect(() => {
    if (!location) return;
    fetchCurrentWeather();
    fetchForecast();
    const interval = setInterval(fetchCurrentWeather, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [location]);

  // ✅ Get device location
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

  // ✅ Forecast
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

  // ✅ Manual search
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

  if (!weather) return <ActivityIndicator />;

  const weatherDetails = [
    { id: "1", icon: "tint", label: `Humidity: ${weather.main.humidity}%` },
    { id: "2", icon: "tachometer-alt", label: `Pressure: ${weather.main.pressure} hPa` },
    { id: "3", icon: "water", label: `Sea Level: ${weather.main.sea_level ?? "N/A"} hPa` },
    { id: "4", icon: "globe", label: `Ground Level: ${weather.main.grnd_level ?? "N/A"} hPa` },
  ];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ImageBackground
        source={{
          uri: backgroundUrl ?? background(weather.main.temp, weather.weather?.[0]?.main),
        }}
        style={{ flex: 1, width: "100%" }}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.container3}>
          <SearchBar
            searchText={searchText}
            setSearchText={setSearchText}
            handleSearch={handleSearch}
            onCitySelect={handleCitySelect}
            isDark={isDark}
          />

          <View style={styles.topCard}>
            <Text style={styles.location}>
              <FontAwesome5 name="map-marker-alt" size={20} color={theme.icon} /> {weather.name}
            </Text>

            <Text style={styles.description}>
              <FontAwesome5 name="clock" size={14} color={theme.icon} />{" "}
              {currentTime.format("dddd, MMMM D • h:mm:ss A")}
            </Text>

            <Text style={styles.tempText}>
              {convertTemperature(weather.main.temp).toFixed(1)}°{isCelsius ? "C" : "F"}
            </Text>

            <Text style={styles.fellslike}>
              Feels Like: {convertTemperature(weather.main.feels_like).toFixed(1)}°{isCelsius ? "C" : "F"}
            </Text>

            <View style={styles.tempRange}>
              <Text style={styles.description}>
                <FontAwesome5 name="arrow-up" size={14} color={theme.icon} /> Max:{" "}
                {convertTemperature(weather.main.temp_max).toFixed(1)}°{isCelsius ? "C" : "F"}
              </Text>
              <Text style={styles.description}>
                <FontAwesome5 name="arrow-down" size={14} color={theme.icon} /> Min:{" "}
                {convertTemperature(weather.main.temp_min).toFixed(1)}°{isCelsius ? "C" : "F"}
              </Text>
            </View>

            <View style={{ flexDirection: "row", gap: 10, alignItems: "center", left: 10 }}>
              <TempUnitToggle isCelsius={isCelsius} onToggle={toggleUnit} theme={theme} />
              <ThemeToggle onThemeChange={setIsDark} />
            </View>
          </View>

          <WeatherDetailsSlider weatherDetails={weatherDetails} isDark={isDark} />
          <ForecastList forecast={forecast ?? []} isDark={isDark} />
        </ScrollView>
      </ImageBackground>
    </GestureHandlerRootView>
  );
};

export default WeatherScreen;
