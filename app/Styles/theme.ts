import { Theme } from "./weather";

export const lightTheme: Theme = {
  // background: "#FFFFFF",
  text: "#000000",
  card: "#F0F0F0",
  overlay: "#F0F0F0",
  accent: "#000000",
  tempText: "#000000",
  descriptionText: "#000000",
  toggleBg: "rgba(0, 0, 0)",
  weatherPropertyBg: "#D3D3D3",
  forecastItemBg: "#F0F0F0",
  forecastDate: "#000000",
  forecastTemp: "#000000",
  inputBg: "#F5F5F5",
  suggestionBg: "#ffffff",
  suggestionText: "black",
  background: "black",
};

export const darkTheme: Theme = {
  // solid black
  text: "#FFFFFF", // white text for contrast
  card: "#1E1E1E", // dark gray, readable
  overlay: "#2A2A2A", // slightly lighter overlay
  accent: "#FFD43B", // yellow accent
  tempText: "#FFFFFF", // readable
  descriptionText: "#CCCCCC", // light gray for descriptions
  toggleBg: "#333333", // darker toggle background
  weatherPropertyBg: "#1E1E1E", // unify with card
  forecastItemBg: "#1E1E1E", // match card for uniformity
  forecastDate: "#FFD43B", // yellow for title
  forecastTemp: "#FFFFFF", // readable white
  inputBg: "#222222", // dark input
  suggestionBg: "#2C2C2C", // dark suggestion dropdown
  suggestionText: "#FFFFFF",
  background: "white",
};
