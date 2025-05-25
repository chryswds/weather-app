import { background } from "../Screen/background";

const APIUrl = `https://api.openweathermap.org/data/2.5`;
const APIKey = `127ec3a0b8768a330c3b0f8c3ef48420`;

export const getWeatherData = async (
  lat: number,
  lon: number,
  setWeather: (data: any) => void,
  setBackgroundUrl: (url: string) => void
) => {
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
};
