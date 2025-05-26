# Weather App

## Overview

A weather app built with React Native and Expo that shows current weather conditions and forecasts for any location.

## Features

### Current Weather Information

- Real-time temperature and weather conditions
- Feels-like temperature
- Min/max temperature range
- Detailed weather properties (humidity, pressure, sea level, ground level)
- Dynamic background that changes based on current weather conditions

### Location Services

- Automatic detection of user's current location
- Search functionality for any location worldwide
- Autocomplete suggestions for city searches
- Search history for quick access to previously viewed locations

### Weather Forecast

- 5-day weather forecast
- Daily temperature and condition information

### Map Integration

- Interactive map view showing the selected location

### Customization Options

- Toggle between Celsius and Fahrenheit temperature units
- Light and dark theme options for comfortable viewing in any environment

## API Integrations

### OpenWeatherMap API

The app integrates with the OpenWeatherMap API to fetch various weather data:

1. **Current Weather Data API**

   - Provides real-time weather information including temperature, conditions, humidity, pressure, wind speed, etc.
   - Endpoint: `https://api.openweathermap.org/data/2.5/weather`

2. **5-Day Forecast API**

   - Delivers a 5-day weather forecast with 3-hour intervals
   - Endpoint: `https://api.openweathermap.org/data/2.5/forecast`

3. **Geocoding API**
   - Converts location names to geographic coordinates (latitude and longitude)
   - Used for the search functionality
   - Endpoint: `https://api.openweathermap.org/geo/1.0/direct`

## Technical Implementation

### State Management

- React hooks for local state management
- Custom hooks for shared functionality:
  - useTemperatureUnit: Manages temperature unit preference (Celsius/Fahrenheit)
  - useLocationHistory: Tracks recently searched locations
  - useWeatherAlerts: Handles weather alert subscriptions
  - useFavoriteLocations: Manages saved favorite locations
  - useThemePreference: Controls light/dark theme settings

### Data Persistence

- AsyncStorage for saving user preferences and search history

### UI Components

- Custom components for weather display, search functionality, and map integration
- Responsive design that works across different device sizes
- Animated transitions for a polished user experience

### Maps

- Integration with React Native Maps for location visualization

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npx expo start
   ```

## Requirements

- Node.js
- npm or yarn
- Expo CLI
- OpenWeatherMap API key
