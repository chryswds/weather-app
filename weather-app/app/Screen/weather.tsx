import React, { View, Text, ActivityIndicator } from 'react-native'
import { useEffect, useState } from 'react'
import * as Location from 'expo-location';


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


type Weather = {
  name: string;
  main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
      sea_level: number;
      grnd_level: number;
   },
}  

 const weatherScreen = () => {
// tne user State should be outside from the main code or it wont work.
const [weather, setWeather] = useState<Weather>();
const [location, setLocation] = useState<Location.LocationObject>();//create a object to use it after
const [errorMsg, setErrorMsg] = useState('');//we will trigger any error with it



  useEffect(() => {
    getWeatherData();
  }, []);

  //code copied from https://docs.expo.dev/
  useEffect(() => {// this function is the standard function from the docs.expo.dev/ website
  // I did not modify yet  
    async function getCurrentLocation() {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log("location ", location)
      setLocation(location);
    }

    getCurrentLocation();
  }, []);


  //this function we are going to get the data from the user
  const getWeatherData = async () =>{

  // const weatherUrl ='https://api.openweathermap.org/data/2.5/weather'
  const APIUrl = `https://api.openweathermap.org/data/2.5/weather`;
  const lat= -23.5505; // Olha o link no top da pagina, esse link eu abreviei ele, e agora eu consigo manipular.
  const lon= -46.6333;// see the link in the top of the page? that is an example link where everything start.
  //i took that link and now i am breaking it so that i can manage.
  const APIKey = `127ec3a0b8768a330c3b0f8c3ef48420`;
  //its not a good practice to leave the key here, there is a better method, which is adding it to env file, ignore from gitignore and use it.
  //the reason why i did not do it, is because it is not a coffidencial key, for something extremily important

  

  

    try{
      const resuslts = await fetch(
        `${APIUrl}?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`
      ); // fetch is a command from react that i can use to get a API.

      const data = await resuslts.json();
      console.log(JSON.stringify(data, null, 2));
      setWeather(data);

      }catch(error){
        console.error(error);
      }
      // console.log(weather);
  }

  

  //test
  if(!weather){
      return <ActivityIndicator />
  }

  
  return (
    <View>
      <Text>{weather.name}</Text>
      <Text>{weather.main.temp}</Text>
    </View>
  )
}

export default weatherScreen