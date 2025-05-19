import { FontAwesome5 } from "@expo/vector-icons";
import "dayjs/locale/en";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import React, { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ForecastList from "../Screen/forecastItem";
import styles from "../Styles/weather"

//here i have got a API from this website below, and im a going to use in the weather aplication.

//API website link. https://home.openweathermap.org/api_keys
//IP key 44d5404359ef466582d9af9646eaad70
//API link to use in the application.
//https://api.openweathermap.org/data/2.5/weather?lat=53.3441204&lon=6.2673368&appid=44d5404359ef466582d9af9646eaad70&units=metric//dublin irland
// I am making the URL a string so i will be able to manage easier

//Brasil coordenates
//const weatherUrl ='https://api.openweathermap.org/data/2.5/weather?lat=-23.5505&lon=-46.6333&appid=44d5404359ef466582d9af9646eaad70&units=metric'

//Dublin coordenates.
// const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=53.3441204&lon=6.2673368&appid=44d5404359ef466582d9af9646eaad70&units=metric`

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

// type WeatherForecast = {
//   main: MainWeather;
//   dt: number;
// };

const weatherScreen = () => {
  // tne user State should be outside from the main code or it wont work.
  const [weather, setWeather] = useState<Weather | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  // const [location, setLocation] = useState<Location.LocationObject>();//create a object to use it after
  const [errorMsg, setErrorMsg] = useState(""); //we will trigger any error with it
  const [forecast, setForecast] = useState<[]>(); // create a state to store the forecast data

  // this function will load all the others function
  useEffect(() => {
    if (location) {
      getWeatherData();
      fetchForecast();
    }
  }, [location]);

  //code copied from https://docs.expo.dev/
  useEffect(() => {
    // this function is the standard function from the docs.expo.dev/ website
    // I did not modify yet
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log("location ", location);
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  // const weatherUrl ='https://api.openweathermap.org/data/2.5/weather'

  //here i have replace the manual coordenates to this location?.coords.latitude;
  const APIUrl = `https://api.openweathermap.org/data/2.5`;

  const lat = location?.coords.latitude; // Olha o link no top da pagina, esse link eu abreviei ele, e agora eu consigo manipular.


  //here i have replace the manual coordenates to this location?.coords.longitude;
  const lon = location?.coords.longitude; // see the link in the top of the page? that is an example link where everything start.
  //i took that link and now i am breaking it so that i can manage.
  const APIKey = `127ec3a0b8768a330c3b0f8c3ef48420`;
  //its not a good practice to leave the key here, there is a better method, which is adding it to env file, ignore from gitignore and use it.
  //the reason why i did not do it, is because it is not a coffidencial key, for something extremily important

  // working with forecast data.
  // i got this link from the website //https://openweathermap.org/forecast16
  //const  forecastData = `api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}`


  const forecastData = `api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}`;

  //this function we are going to get the data from the user
  const getWeatherData = async () => {
    try {
      const results = await fetch(
        `${APIUrl}/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`
      ); // fetch is a command from react that i can use to get a API.

      const data = await results.json();
      console.log(JSON.stringify(data, null, 2));
      setWeather(data);
    } catch (error) {
      console.error(error);
    }
    // console.log(weather);
  };

  const fetchForecast = async () => {
    if (!location) return;

    const results = await fetch(
      `${APIUrl}/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`
    );
    const data = await results.json();

    // Keep only one forecast per day (e.g., 12:00 PM)
    const dailyForecast = data.list.filter((item: any) =>
      item.dt_txt.includes("12:00:00")
    );

    setForecast(dailyForecast || []);
  };

  //test
  if (!weather) {
    return <ActivityIndicator />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.location}>
          <FontAwesome5 name="map-marker-alt" size={20} color="#FFD43B" />{" "}
          {weather.name}
        </Text>

        <View style={styles.topCard}>
          <View style={styles.title}>
            <FontAwesome5 name="temperature-high" size={24} color="#FFD43B" />
            <Text style={styles.title}> Temperature</Text>
          </View>
          <Text style={styles.tempText}>{weather.main.temp}°C</Text>
          <Text style={styles.description}>
            Feels Like: {weather.main.feels_like}°C
          </Text>

          <View style={styles.tempRange}>
            <Text style={styles.rangeText}>
              <FontAwesome5 name="arrow-up" size={14} /> Max:{" "}
              {weather.main.temp_max}°C
            </Text>
            <Text style={styles.rangeText}>
              <FontAwesome5 name="arrow-down" size={14} /> Min:{" "}
              {weather.main.temp_min}°C
            </Text>
          </View>
        </View>

        <View style={styles.forecastContainer}>
          <Text style={styles.forecastText}>
            <FontAwesome5 name="tint" size={16} /> Humidity:{" "}
            {weather.main.humidity}%
          </Text>
          <Text style={styles.forecastText}>
            <FontAwesome5 name="tachometer-alt" size={16} /> Pressure:{" "}
            {weather.main.pressure} hPa
          </Text>
          <Text style={styles.forecastText}>
            <FontAwesome5 name="water" size={16} /> Sea Level:{" "}
            {weather.main.sea_level ?? "N/A"} hPa
          </Text>
          <Text style={styles.forecastText}>
            <FontAwesome5 name="globe" size={16} /> Ground Level:{" "}
            {weather.main.grnd_level ?? "N/A"} hPa
          </Text>

          <ForecastList forecast={forecast ?? []} />
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default weatherScreen;
