/**
 * Returns a background image URL based on weather condition and temperature.
 * @param {number} temp - Temperature in Celsius.
 * @param {string} [description] - Main weather condition from API (e.g., "Rain", "Snow", "Clouds", "Clear").
 * @returns {string} Background image URL.
 */
export function background(temp: number, description?: string): string {
  const normalized = description?.toLowerCase();

  // 🌧️ Rain
  if (normalized?.includes("rain")) {
    return "https://images.pexels.com/photos/1556805/pexels-photo-1556805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
  }

  // ☁️ Clouds / Overcast
  if (normalized?.includes("cloud")) {
    return "https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
  }

  // ❄️ Snow
  if (normalized?.includes("snow")) {
    return "https://images.pexels.com/photos/32136799/pexels-photo-32136799/free-photo-of-sunny-winter-day-on-baku-snowy-slopes.jpeg";
  }

  // ⛈️ Thunderstorm
  if (normalized?.includes("thunder")) {
    return "https://images.pexels.com/photos/53459/lightning-storm-night-weather-53459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
  }

  // 🌫️ Mist / Fog / Haze
  if (["mist", "fog", "haze", "smoke"].some((term) => normalized?.includes(term))) {
    return "https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
  }

  // 🌞 Clear weather
  if (normalized?.includes("clear")) {
    return "https://images.pexels.com/photos/20822535/pexels-photo-20822535/free-photo-of-amanecer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
  }

  // 🌡️ Default fallback by temperature
  if (temp <= 5) {
    return "https://images.pexels.com/photos/32136799/pexels-photo-32136799/free-photo-of-sunny-winter-day-on-baku-snowy-slopes.jpeg";
  } else if (temp <= 15) {
    return "https://images.pexels.com/photos/52531/way-clouds-seat-belts-direction-52531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
  } else if (temp <= 25) {
    return "https://images.pexels.com/photos/20822535/pexels-photo-20822535/free-photo-of-amanecer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
  } else {
    return "https://images.pexels.com/photos/296234/pexels-photo-296234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
  }
}

