import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const isMobile = width < 768;
export const isSmallMobile = width < 375;

export const COLORS = {
  button: ["#28a745", "#2a2f50"],

  accent: "#28a745",        // Highlight color (for buttons, important text)
  primary: "#003c1f",       // Dark version of main color
  secondary: "#263238",     // Slightly darker secondary color
  tertiary: "#717171",      // Text color for smaller text
  neutral: "#222629",       // Overlay / background color

  white: "#ffffff",
  black: "#000000",

  textLight: "#f8f9fa",
  textDark: "#222629",
  gray: "#6C717DFF",
  surface: "#1B263B",

  success: "#28a745",
  warning: "#ffc107",
  danger: "#dc3545",
  error: "#dc3545",
};

export const WINDOW = {
  width,
  height,
};
