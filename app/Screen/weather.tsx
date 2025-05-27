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

import dayjs from "dayjs";
import MapView, { Polygon } from "react-native-maps";
import SearchBar from "../components/searchbar";
import ThemeToggle from "../components/themeToggle";
import WeatherDetailsSlider from "../components/weatherDataDisplay";
import TempUnitToggle from "../components/weatherToggle";
import { useTemperatureUnit } from "../hooks/useTemperatureUnit";
import ForecastList from "../Screen/forecastItem";
import { searchLocation } from "../Screen/searchLocation";
import { darkTheme, lightTheme } from "../Styles/theme";
import { createStyles } from "../Styles/weather";
import { background } from "./background";
// import Compass from "../components/compass";
import AirQualityInfo from "../components/airQuality";
import LocationInfo from "../components/locationItem";
import SunInfo from "../components/sunInfo";
import WindInfo from "../components/windInfo";

// Types for weather data structure

type Wind = {
  speed: number; // in m/s
  deg: number; // direction in degrees
};

type Weather = {
  name: string;
  main: MainWeather;
  weather: WeatherConditionType[];
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
};

// type Props = {
//   latitude: number;
//   longitude: number;
//   altitude?: number;
//   isDark: boolean;
// };

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

// ... all your imports
// import { background } from "./background"; // ✅ Import your background util

// ... MainWeather, WeatherConditionType, Weather types stay the same

const WeatherScreen = () => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [forecast, setForecast] = useState<[]>();
  const [searchText, setSearchText] = useState("");
  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(dayjs());

  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;
  const styles = createStyles(theme);

  const [searchedLat, setSearchedLat] = useState<number | null>(null);
  const [searchedLon, setSearchedLon] = useState<number | null>(null);

  const { isCelsius, toggleUnit, convertTemperature } = useTemperatureUnit();

  const [mapRegion, setMapRegion] = useState({
    latitude: location?.coords.latitude ?? 0,
    longitude: location?.coords.longitude ?? 0,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const [polygonCoords, setPolygonCoords] = useState<
    { latitude: number; longitude: number }[]
  >([]);

  const generatePolygonAround = (
    lat: number,
    lon: number,
    offset: number = 0.01
  ) => [
    { latitude: lat + offset, longitude: lon + offset },
    { latitude: lat + offset, longitude: lon - offset },
    { latitude: lat - offset, longitude: lon - offset },
    { latitude: lat - offset, longitude: lon + offset },
  ];

  useEffect(() => {
    if (location) {
      const { latitude, longitude } = location.coords;
      setPolygonCoords(generatePolygonAround(latitude, longitude));
    }
  }, [location]);

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

  useEffect(() => {
    if (location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
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

  const fetchAirQuality = async (lat: number, lon: number) => {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${APIKey}`
    );
    const data = await response.json();
    return {
      aqi: data.list[0].main.aqi,
      co: data.list[0].components.co,
      no2: data.list[0].components.no2,
    };
  };

  const [airQuality, setAirQuality] = useState<{
    aqi: number;
    co: number;
    no2: number;
  } | null>(null);

  useEffect(() => {
    if (location) {
      fetchAirQuality(location.coords.latitude, location.coords.longitude).then(
        setAirQuality
      );
    }
  }, [location]);

  // const handleCitySelect = (lat: number, lon: number) => {
  //   setLocation({
  //     coords: {
  //       latitude: lat,
  //       longitude: lon,
  //       altitude: 0,
  //       accuracy: 0,
  //       altitudeAccuracy: 0,
  //       heading: 0,
  //       speed: 0,
  //     },
  //     timestamp: Date.now(),
  //   });
  // };

  if (!weather) return <ActivityIndicator />;

  const weatherDetails = [
    { id: "1", icon: "tint", label: `Humidity: ${weather.main.humidity}%` },
    {
      id: "2",
      icon: "tachometer-alt",
      label: `Pressure: ${weather.main.pressure} hPa`,
    },
    {
      id: "3",
      icon: "water",
      label: `Sea Level: ${weather.main.sea_level ?? "N/A"} hPa`,
    },
    {
      id: "4",
      icon: "globe",
      label: `Ground Level: ${weather.main.grnd_level ?? "N/A"} hPa`,
    },
  ];

  // Function to handle returning to current location
  const handleReturnToCurrentLocation = async () => {
    try {
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      // Clear the search text when returning to current location
      setSearchText("");
    } catch (error) {
      setErrorMsg("Error getting current location");
    }
  };

  const handleCitySelect = (lat: number, lon: number) => {
    setSearchedLat(lat);
    setSearchedLon(lon);
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

  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: theme.background }}
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
          <ImageBackground
            source={{
              uri:
                backgroundUrl ??
                background(weather.main.temp, weather.weather?.[0]?.main),
            }}
            style={{ flex: 1, width: "100%" }}
            resizeMode="cover"
          >
            <View style={styles.locationContainer}>
              <Text style={styles.location}>
                <FontAwesome5
                  name="map-marker-alt"
                  size={30}
                  color={theme.icon}
                />{" "}
                {weather.name}
              </Text>
              <FontAwesome5
                name="sync-alt"
                size={20}
                color={theme.accent}
                style={styles.currentLocationButton}
                onPress={handleReturnToCurrentLocation}
              />
            </View>
            <View style={styles.temperatureContainer}>
              <Text style={styles.tempText}>
                {convertTemperature(weather.main.temp).toFixed(1)}°
                {isCelsius ? "C" : "F"}
              </Text>
            </View>

            <View style={{ flexDirection: "row", width: "90%" }}>
              <View style={styles.dateTimeContainer}>
                <Text style={styles.dayName}>
                  <FontAwesome5
                    name="calendar-alt"
                    size={20}
                    color={theme.icon}
                  />{" "}
                  <Text style={styles.dayName}>
                    {currentTime.format("dddd, MMMM D")}
                  </Text>
                  {"\n\n"}
                  <FontAwesome5
                    name="clock"
                    size={20}
                    color={theme.icon}
                  />{" "}
                  <Text style={styles.dayName}>
                    {currentTime.format("h:mm:ss A")}
                  </Text>
                </Text>
                <Text>
                  <FontAwesome5
                    name="thermometer-half"
                    size={20}
                    color={theme.icon}
                  />{" "}
                  <Text style={styles.dayName}>
                    Feels Like:{" "}
                    {convertTemperature(weather.main.feels_like).toFixed(1)}°
                    {isCelsius ? "C" : "F"}
                  </Text>
                </Text>
              </View>

              <View style={styles.tempRangeContainer}>
                <View style={styles.tempRange}>
                  <Text style={styles.description}>
                    <FontAwesome5
                      name="arrow-up"
                      size={23}
                      color={theme.icon}
                    />{" "}
                    Max: {convertTemperature(weather.main.temp_max).toFixed(1)}°
                    {isCelsius ? "C" : "F"}
                  </Text>
                  <Text style={styles.description}>
                    <FontAwesome5
                      name="arrow-down"
                      size={23}
                      color={theme.icon}
                    />{" "}
                    Min: {convertTemperature(weather.main.temp_min).toFixed(1)}°
                    {isCelsius ? "C" : "F"}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.buttonsContainer}>
              <View style={styles.buttons}>
                <TempUnitToggle
                  isCelsius={isCelsius}
                  onToggle={toggleUnit}
                  theme={theme}
                />
                <ThemeToggle onThemeChange={setIsDark} />
              </View>
            </View>
          </ImageBackground>
        </View>

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 1, marginRight: 5 }}>
            {weather?.sys && (
              <SunInfo
                sunrise={weather.sys.sunrise}
                sunset={weather.sys.sunset}
                isDark={isDark}
              />
            )}
          </View>
          <View style={{ flex: 1, marginLeft: 5 }}>
            {weather?.wind && (
              <WindInfo
                speed={weather.wind.speed * 3.6} // convert m/s to km/h
                direction={weather.wind.deg}
                isDark={isDark}
              />
            )}
          </View>
        </View>

        {airQuality && (
          <AirQualityInfo
            aqi={airQuality.aqi}
            co={airQuality.co}
            no2={airQuality.no2}
            isDark={isDark}
          />
        )}

        {location && (
          <LocationInfo
            latitude={location.coords.latitude}
            longitude={location.coords.longitude}
            altitude={location.coords.altitude ?? undefined}
            isDark={isDark}
          />
        )}

        {/* <Compass /> */}

        <WeatherDetailsSlider weatherDetails={weatherDetails} isDark={isDark} />
        <View style={styles.mapContainer}>
          <View>
            <MapView
              style={styles.mapCard}
              region={mapRegion} // ✅ dynamically controlled
            >
              <Polygon
                coordinates={polygonCoords}
                fillColor={`${theme.polygon}50`}
                strokeColor={theme.polygon}
                strokeWidth={2}
              />
            </MapView>
          </View>
          <View style={styles.coordBox}>
            <Text style={styles.coordTitle}>Square Coordinates:</Text>
            {polygonCoords.map((point, index) => (
              <Text key={index} style={styles.coordItem}>
                {index + 1}: {point.latitude.toFixed(5)},{" "}
                {point.longitude.toFixed(5)}
              </Text>
            ))}
          </View>
        </View>

        <ForecastList forecast={forecast ?? []} isDark={isDark} />
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default WeatherScreen;
