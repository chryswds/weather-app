import { StyleSheet } from "react-native";

const searchBarStyles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginVertical: 16,
  },
  icon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    color: "#fff",
    fontSize: 16,
  },
  suggestionsContainer: {
    position: "absolute",
    top: 50, // Adjust based on your search input height
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 8,
    maxHeight: 200,
    zIndex: 1000,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  suggestionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  suggestionText: {
    fontSize: 16,
    color: "#333",
  },
});

export default searchBarStyles;
