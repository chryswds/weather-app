import { FontAwesome5 } from "@expo/vector-icons";
import "dayjs/locale/en";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import React, {ActivityIndicator, ImageBackground, Text, TouchableOpacity, View,} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ForecastList from "../Screen/forecastItem";
import { searchLocation } from "../Screen/searchLocation";
import styles from "../Styles/weather";
import SearchBar from "../components/searchbar";
import WeatherDetailsSlider from "../components/weatherDataDisplay";
import { getWeatherData } from "../utils/fetcheWeatherData";
import { useTemperatureUnit } from '../hooks/useTemperatureUnit';

//here i have got a API from this website below, and im a going to use in the weather aplication. //API website link. https://home.openweathermap.org/api_keys
//API link to use in the application. //https://api.openweathermap.org/data/2.5/weather?lat=53.3441204&lon=6.2673368&appid=44d5404359ef466582d9af9646eaad70&units=metric//dublin irland
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

const weatherScreen = () => {
  // tne user State should be outside from the main code or it wont work.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [weather, setWeather] = useState<Weather | null>(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  ); //create a object to use it after
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [errorMsg, setErrorMsg] = useState(""); //we will trigger any error with it
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [forecast, setForecast] = useState<[]>(); // create a state to store the forecast data
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [searchText, setSearchText] = useState(""); // state to search location
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isCelsius, toggleUnit, convertTemperature } = useTemperatureUnit();

  // this function will load all the others function
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (location) {
      getWeatherData(
        // i am getting from utils
        location.coords.latitude,
        location.coords.longitude,
        setWeather,
        setBackgroundUrl
      );


      fetchForecast();
    }
  }, [location]);
  //code copied from https://docs.expo.dev/
  // eslint-disable-next-line react-hooks/rules-of-hooks
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
  const lon = location?.coords.longitude; // see the link in the top of the page? that is an example link where everything start.//i took that link and now i am breaking it so that i can manage.
  const APIKey = process.env.OPENWEATHER_API_KEY;

  // working with forecast data.
  // i got this link from the website //https://openweathermap.org/forecast16
  //const  forecastData = `api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}`

  const forecastData = `api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}`;

  // const getWeatherData = async () => {//this function we are going to get the data from the user
  //   try {
  //     const results = await fetch(
  //       `${APIUrl}/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`
  //     ); // fetch is a command from react that i can use to get a API.

  //     const data = await results.json();
  //     console.log(JSON.stringify(data, null, 2));
  //     setWeather(data);

  //     const bgUrl = background(data.main.temp);
  //     setBackgroundUrl(bgUrl);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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

  //function to handle location search
  const handleSearch = async () => {
    if (!searchText) return;
    try {
      const result = await searchLocation(searchText);
      if (result && result.lat && result.lon) {
        //Parameters
        // -> altitute, accuracy, altitudeAccuracy, heading, speed are required, thats why they were set to 0
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
          // To set the time stamp
          timestamp: Date.now(),
        });
        setErrorMsg("");
      } else {
        setErrorMsg("Location not found");
      }
    } catch (error) {
      setErrorMsg("error searching for location");
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

  //test
  if (!weather) {
    return <ActivityIndicator />;
  }

  const weatherDetails = [
    {
      id: "1",
      icon: "tint",
      label: `Humidity: ${weather.main.humidity}%`,
    },
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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ImageBackground
        source={{ uri: backgroundUrl || "" }}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          {/* start search bar container */}
          <SearchBar
            searchText={searchText}
            setSearchText={setSearchText}
            handleSearch={handleSearch}
            onCitySelect={handleCitySelect}
          />
          {/* finish the search bar. */}

          {/* start top card */}
          <View style={styles.topCard}>
            <Text style={styles.location}>
              <FontAwesome5 name="map-marker-alt" size={20} color="#FFD43B" />{" "}
              {weather.name}
            </Text>
            <View style={styles.title}>
          <TouchableOpacity style={styles.toggleButton} onPress={toggleUnit}>
     <Text style={styles.title}>
                {" "}
                <FontAwesome5 name="temperature-high" size={24} color="#FFD43B"/>{" "}
                {isCelsius ? 'Show °F' : 'Show °C'}
              </Text>
  </TouchableOpacity>
</View>


              {/* <Text style={styles.tempText}>{weather.main.temp}°C</Text>
               */}

                             <Text style={styles.tempText}>
  {convertTemperature(weather.main.temp).toFixed(1)}°{isCelsius ? 'C' : 'F'}
</Text>

<Text style={styles.description}>
  Feels Like: {convertTemperature(weather.main.feels_like).toFixed(1)}°{isCelsius ? 'C' : 'F'}
</Text>
<View style={styles.tempRange}>
<Text style={styles.description}>
   <FontAwesome5 name="arrow-up" size={14} />
  Max: {convertTemperature(weather.main.temp_max).toFixed(1)}°{isCelsius ? 'C' : 'F'}
</Text>
<Text style={styles.description}>
  <FontAwesome5 name="arrow-down" size={14} />
  Min: {convertTemperature(weather.main.temp_min).toFixed(1)}°{isCelsius ? 'C' : 'F'}
</Text>
   </View>
              
              
               
           
            
          </View>
          {/* finsih top card */}

          {/* START THE HORIZONTAL SCROLL */}

          <WeatherDetailsSlider weatherDetails={weatherDetails} />

          {/* FINSIH THE HORIZONTAL SCROLL */}

          <ForecastList forecast={forecast ?? []} />
        </View>
      </ImageBackground>
    </GestureHandlerRootView>
  );
};
export default weatherScreen;
