import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import searchBarStyles from '../Styles/searchLoca';

type City = {
  name: string;
  lat: number;
  lon: number;
  country: string;
}

type Props = {
  searchText: string;
  setSearchText: (text: string) => void;
  handleSearch: () => void;
};

const SearchBar: React.FC<Props> = ({ searchText, setSearchText, handleSearch }) => {
  return (
    <View style={searchBarStyles.searchContainer}>
  <FontAwesome5 name="search" size={20} color="#aaa" style={searchBarStyles.icon} />
  <TextInput
    style={searchBarStyles.searchInput}
    placeholder="Search city..."
    value={searchText}
    onChangeText={setSearchText}
    returnKeyType="search"
    onSubmitEditing={handleSearch}
    placeholderTextColor="#aaa"
  />
</View>
  );
};

export default SearchBar;
