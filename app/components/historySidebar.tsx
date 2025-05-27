// Import required dependencies
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Theme } from "../Styles/weather";
import { SearchHistoryItem } from "../utils/searchHistory";

// Props definition for the sidebar component
interface HistorySidebarProps {
  isVisible: boolean;
  onClose: () => void;
  history: SearchHistoryItem[];
  onSelectHistory: (item: SearchHistoryItem) => void;
  onClearHistory: () => void;
  theme: Theme;
  isDark: boolean;
}

// Set sidebar width to 80% of screen width
const SIDEBAR_WIDTH = Dimensions.get("window").width * 0.8;

// History sidebar component that slides in from the right
const HistorySidebar: React.FC<HistorySidebarProps> = ({
  isVisible,
  onClose,
  history,
  onSelectHistory,
  onClearHistory,
  theme,
  isDark,
}) => {
  // Animation value for sliding effect
  const translateX = React.useRef(new Animated.Value(SIDEBAR_WIDTH)).current;

  // Animate sidebar when visibility changes
  React.useEffect(() => {
    Animated.timing(translateX, {
      toValue: isVisible ? 0 : SIDEBAR_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.overlay}
        onPress={onClose}
        activeOpacity={1}
      />
      <Animated.View
        style={[
          styles.sidebar,
          {
            backgroundColor: theme.sidebarBg,
            transform: [{ translateX }],
          },
        ]}
      >
        <View style={[styles.header, { borderBottomColor: theme.divider }]}>
          <Text style={[styles.title, { color: theme.text }]}>
            Search History
          </Text>
          <TouchableOpacity onPress={onClearHistory}>
            <Text style={[styles.clearButton, { color: theme.accent }]}>
              Clear All
            </Text>
          </TouchableOpacity>
        </View>

        {/* Show history list or empty state message */}
        {history.length > 0 ? (
          <FlatList
            data={history}
            keyExtractor={(_, index) => `history-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.historyItem,
                  { borderBottomColor: theme.divider },
                ]}
                onPress={() => {
                  onSelectHistory(item);
                  onClose();
                }}
              >
                <FontAwesome5
                  name="history"
                  size={16}
                  color={theme.text}
                  style={styles.historyIcon}
                />
                <Text style={[styles.historyText, { color: theme.text }]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: theme.descriptionText }]}>
              No search history
            </Text>
          </View>
        )}
      </Animated.View>
    </View>
  );
};

// Styles for the sidebar components
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 56,
    left: 0,
    right: 0,
    bottom: -500,
    zIndex: 9999,
    elevation: 9999,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  sidebar: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: SIDEBAR_WIDTH,
    elevation: 9999,
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  clearButton: {
    fontSize: 16,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
  },
  historyIcon: {
    marginRight: 10,
  },
  historyText: {
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    top: -250,
    fontSize: 16,
    opacity: 0.7,
  },
});

export default HistorySidebar;
