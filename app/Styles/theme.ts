import { Theme } from "./weather";

export const lightTheme: Theme = {
  background: "rgb(219, 236, 243)",
  backgroundContainer: "rgba(255, 255, 255, 0.5)",
  text: "#000000",
  textOpposite: "#FFFFFF",
  card: "rgba(240, 240, 240, 0.8)",
  overlay: "rgba(240, 240, 240, 0.9)",
  accent: "#007AFF",
  tempText: "#000000",
  descriptionText: "#666666",
  toggleBg: "rgba(0, 0, 0, 0.9)",
  weatherPropertyBg: "#F5F5F5",
  forecastItemBg: "rgba(141, 141, 255, 0.7) ",
  forecastDate: "#000000",
  forecastTemp: "#000000",
  inputBg: "#F5F5F5",
  suggestionBg: "#FFFFFF",
  suggestionText: "#000000",
  sidebarBg: "#FFFFFF",
  divider: "#E0E0E0",
  icon: "rgb(91, 91, 197)",
  polygon: "rgba(91,91, 197,0.5)",
  borderColor: "rgba(0, 0, 0, 0.6)",
};

export const darkTheme: Theme = {
  background: "rgb(44, 51, 66)",
  backgroundContainer: "rgba(0, 0, 0, 0.5)",
  text: "#FFFFFF",
  textOpposite: "#000000",
  card: "rgba(28, 28, 30, 0.7)",
  overlay: "rgba(28, 28, 30, 0.7)",
  accent: "#0A84FF",
  tempText: "#FFFFFF",
  descriptionText: "#CCCCCC",
  toggleBg: "rgba(255, 255, 255, 0.1)",
  weatherPropertyBg: "#2C2C2E",
  forecastItemBg: "rgba(91, 91, 197, 0.7)",
  forecastDate: "#FFFFFF",
  forecastTemp: "#FFFFFF",
  inputBg: "#1C1C1E",
  suggestionBg: "#2C2C2E",
  suggestionText: "#FFFFFF",
  sidebarBg: "#1C1C1E",
  divider: "#38383A",
  icon: "#FFD700",
  polygon: "#FFD700",
  borderColor: "#ccc",
};
export { Theme };
