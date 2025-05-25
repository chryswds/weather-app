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

type City = {
  name: string;
  lat: number;
  lon: number;
  country: string;
};

type Props = {
  searchText: string;
  setSearchText: (text: string) => void;
  handleSearch: () => void;
  onCitySelect: (lat: number, lon: number) => void;
  isDark: boolean;
};

const SearchBar: React.FC<Props> = ({
  searchText,
  setSearchText,
  handleSearch,
  onCitySelect,
  isDark,
}) => {
  const theme = isDark ? darkTheme : lightTheme;
  const styles = createStyles(theme);
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
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

  const debouncedFetch = debounce(fetchCitySuggestions, 300);

  useEffect(() => {
    debouncedFetch(searchText);
    return () => {
      debouncedFetch.cancel();
    };
  }, [searchText]);

  const handleCitySelect = (city: City) => {
    setSearchText(`${city.name}, ${city.country}`);
    setShowSuggestions(false);
    onCitySelect(city.lat, city.lon);
  };

  return (
    <View>
      <View style={styles.searchContainer}>
        <FontAwesome5
          name="search"
          size={20}
          // color="#aaa"
          style={styles.icon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search city..."
          value={searchText}
          onChangeText={setSearchText}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
          placeholderTextColor="#aaa"
        />
      </View>

      {showSuggestions && suggestions.length > 0 && (
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
  );
};

export default SearchBar;
