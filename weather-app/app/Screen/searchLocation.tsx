const APIUrl = `http://api.openweathermap.org/geo/1.0/direct?`;
const limit = 1;
const APIKey = process.env.OPENWEATHER_API_KEY;

// Function that returns latitude and longigude based on a given position
export const searchLocation = async (location: string) => {
  const results = await fetch(
    `${APIUrl}q=${location}&limit=${limit}&appid=${APIKey}`
  );
  const data = await results.json();

  if (data && data.length > 0) {
    return {
      lat: data[0].lat,
      lon: data[0].lon,
    };
  } else {
    return null;
  }
};


