import { FontAwesome5 } from "@expo/vector-icons";
import "dayjs/locale/en";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {background} from '../Screen/background'
import React, {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ForecastList from "../Screen/forecastItem";
import { searchLocation } from "../Screen/searchLocation";
import styles from "../Styles/weather";

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
  const [searchText, setSearchText] = useState(""); // state to search location


  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);


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

      const bgUrl = background(data.main.temp);
      setBackgroundUrl(bgUrl);
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

  //test
  if (!weather) {
    return <ActivityIndicator />;
  }

  const weatherDetails = [
  {
    id: '1',
    icon: 'tint',
    label: `Humidity: ${weather.main.humidity}%`
  },
  {
    id: '2',
    icon: 'tachometer-alt',
    label: `Pressure: ${weather.main.pressure} hPa`
  },
  {
    id: '3',
    icon: 'water',
    label: `Sea Level: ${weather.main.sea_level ?? 'N/A'} hPa`
  },
  {
    id: '4',
    icon: 'globe',
    label: `Ground Level: ${weather.main.grnd_level ?? 'N/A'} hPa`
  }
];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
            <ImageBackground
    source={{ uri: backgroundUrl || '' }}
    resizeMode="cover"
    style={{ flex: 1 }}
      >
      <View style={{ flexDirection: "row", marginBottom: 16 }}>
        <TextInput
          style={{
            flex: 1,
            borderRadius: 8,
            padding: 10,
            marginRight: 8,
          }}
          placeholder="Search city..."
          value={searchText}
          onChangeText={setSearchText}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity
          style={{
            borderRadius: 8,
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handleSearch}
        >
          <FontAwesome5 name="search" size={20} color="#5E2EFF" />
        </TouchableOpacity>
      </View>
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

  <FlatList
    data={weatherDetails}// here I am getting the humidity, pressure, sea level
    horizontal// here i make it be in horizontal
    showsHorizontalScrollIndicator={false} // i can show or not the indicator
    keyExtractor={(item) => item.id} 
    contentContainerStyle={{ paddingHorizontal: 8 }}
    renderItem={({ item }) => (

      // here i apply the styles to the text and boxs
      <View style={styles.weatherTextcontainer}>
        <FontAwesome5 name={item.icon} size={16} color="white" />
        <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 8 }}>{item.label}</Text>
      </View>
    )}
  />

  <ForecastList forecast={forecast ?? []} />
      </View>

     
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  <FontAwesome5 name="thermometer-half" size={20} color="yellow" />
  <Text style={styles.title}></Text>
</View>
 </ImageBackground>


      
    </GestureHandlerRootView>

    
  );


};

export default weatherScreen;
