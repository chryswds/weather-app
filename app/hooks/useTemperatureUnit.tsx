// Import required dependencies
import { useState } from "react";

// Custom hook for managing temperature unit conversion and toggle
export function useTemperatureUnit() {
  // State to track if temperature is displayed in Celsius (true) or Fahrenheit (false)
  const [isCelsius, setIsCelsius] = useState(true);

  // Function to toggle between Celsius and Fahrenheit
  const toggleUnit = () => {
    setIsCelsius((prev) => !prev);
  };

  // Function to convert temperature based on selected unit
  // @param temp - Temperature value in Celsius
  // @returns Converted temperature in Celsius or Fahrenheit based on isCelsius state
  const convertTemperature = (temp: number) => {
    return isCelsius ? temp : (temp * 9) / 5 + 32;
  };

  // Return hook values and functions
  return { isCelsius, toggleUnit, convertTemperature };
}
