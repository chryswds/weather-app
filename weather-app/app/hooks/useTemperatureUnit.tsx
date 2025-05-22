import { useState } from 'react';

export function useTemperatureUnit() {
  const [isCelsius, setIsCelsius] = useState(true);
  

  const toggleUnit = () => {
    setIsCelsius((prev) => !prev);
    
  };

  const convertTemperature = (temp: number) => {
    return isCelsius ? temp : (temp * 9) / 5 + 32;
  };

  return { isCelsius, toggleUnit, convertTemperature };
}
