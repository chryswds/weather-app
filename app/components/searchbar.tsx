// Import required dependencies
import { FontAwesome5 } from "@expo/vector-icons";
import debounce from "lodash/debounce";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { darkTheme, lightTheme } from "../Styles/theme";
import { createStyles } from "../Styles/weather";
import {
  SearchHistoryItem,
  addToSearchHistory,
  clearSearchHistory,
  getSearchHistory,
} from "../utils/searchHistory";
import HistorySidebar from "./historySidebar";

// Define city data structure
type City = {
  name: string;
  lat: number;
  lon: number;
  country: string;
};

// Define component props
type Props = {
  searchText: string;
  setSearchText: (text: string) => void;
  handleSearch: () => void;
  onCitySelect: (lat: number, lon: number) => void;
  isDark: boolean;
};

// Search bar component with city suggestions and history
const SearchBar: React.FC<Props> = ({
  searchText,
  setSearchText,
  handleSearch,
  onCitySelect,
  isDark,
}) => {
  // Set theme based on dark mode
  const theme = isDark ? darkTheme : lightTheme;
  const styles = createStyles(theme);

  // State management
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suppressSuggestions, setSuppressSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  // Load search history on component mount
  useEffect(() => {
    loadSearchHistory();
  }, []);

  // Load search history from storage
  const loadSearchHistory = async () => {
    const history = await getSearchHistory();
    setSearchHistory(history);
  };

  // Fetch city suggestions from OpenWeatherMap API
  const fetchCitySuggestions = async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const apiKey = `127ec3a0b8768a330c3b0f8c3ef48420`;
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
      );
      const data = await response.json();
      setSuggestions(data);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  // Debounce API calls to prevent too many requests
  const debouncedFetch = debounce(fetchCitySuggestions, 300);

  // Fetch suggestions when search text changes
  useEffect(() => {
    if (!suppressSuggestions) {
      debouncedFetch(searchText);
    }
    return () => {
      debouncedFetch.cancel();
    };
  }, [searchText, suppressSuggestions]);

  // Handle city selection from suggestions
  const handleCitySelect = async (city: City) => {
    setSearchText(`${city.name}, ${city.country}`);
    setShowSuggestions(false);
    setSuggestions([]);
    setSuppressSuggestions(true);
    setIsSidebarVisible(false);
    onCitySelect(city.lat, city.lon);

    // Save to search history
    await addToSearchHistory({
      name: `${city.name}, ${city.country}`,
      lat: city.lat,
      lon: city.lon,
    });
    loadSearchHistory();
  };

  // Handle selection from search history
  const handleHistorySelect = (item: SearchHistoryItem) => {
    setSearchText(item.name);
    setShowSuggestions(false);
    setSuggestions([]);
    setSuppressSuggestions(true);
    setIsSidebarVisible(false);
    onCitySelect(item.lat, item.lon);
  };

  // Clear search history
  const handleClearHistory = async () => {
    await clearSearchHistory();
    setSearchHistory([]);
    setIsSidebarVisible(false);
  };

  return (
    <>
      <View style={styles.searchWrapper}>
        {/* Search input with history button */}
        <View style={styles.searchContainer}>
          <FontAwesome5 name="search" size={20} style={styles.icon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search city..."
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text);
              setSuppressSuggestions(false);
            }}
            returnKeyType="search"
            onSubmitEditing={() => {
              handleSearch();
              setShowSuggestions(false);
              setSuggestions([]);
              setSuppressSuggestions(true);
            }}
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity
            onPress={() => setIsSidebarVisible(true)}
            style={styles.historyButton}
          >
            <FontAwesome5 name="history" size={20} color={theme.text} />
          </TouchableOpacity>
        </View>

        {/* City suggestions dropdown */}
        {showSuggestions &&
          suggestions.length > 0 &&
          searchText.length >= 3 &&
          !suppressSuggestions && (
            <View style={styles.suggestionsContainer}>
              <FlatList
                data={suggestions}
                keyExtractor={(item) => `${item.lat}-${item.lon}`}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.suggestionItem}
                    onPress={() => handleCitySelect(item)}
                  >
                    <Text style={styles.suggestionText}>
                      {item.name}, {item.country}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
      </View>

      {/* History sidebar component */}
      <HistorySidebar
        isVisible={isSidebarVisible}
        onClose={() => setIsSidebarVisible(false)}
        history={searchHistory}
        onSelectHistory={handleHistorySelect}
        onClearHistory={handleClearHistory}
        theme={theme}
        isDark={isDark}
      />
    </>
  );
};

export default SearchBar;
