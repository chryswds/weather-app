import AsyncStorage from "@react-native-async-storage/async-storage";

const HISTORY_KEY = "search_history";
const MAX_HISTORY_ITEMS = 10;

export interface SearchHistoryItem {
  name: string;
  lat: number;
  lon: number;
}

export const addToSearchHistory = async (item: SearchHistoryItem) => {
  try {
    const history = await getSearchHistory();
    // Remove duplicate if exists
    const filteredHistory = history.filter(
      (historyItem) => historyItem.name !== item.name
    );
    // Add new item to the beginning
    const newHistory = [item, ...filteredHistory].slice(0, MAX_HISTORY_ITEMS);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  } catch (error) {
    console.error("Error adding to search history:", error);
  }
};

export const getSearchHistory = async (): Promise<SearchHistoryItem[]> => {
  try {
    const history = await AsyncStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error("Error getting search history:", error);
    return [];
  }
};

export const clearSearchHistory = async () => {
  try {
    await AsyncStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error("Error clearing search history:", error);
  }
};
