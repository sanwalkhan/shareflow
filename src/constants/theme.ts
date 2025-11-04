import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const isMobile = width < 768;
export const isSmallMobile = width < 375;

export const COLORS = {
  accent: "#86c232",      // Highlight color (for buttons, important text)
  primary: "#61892f",     // Dark version of main color
  secondary: "#474b4f",   // Slightly darker secondary color
  tertiary: "#6b6e70",    // Text color for smaller text
  neutral: "#222629",     // Overlay / background color
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

export const WINDOW = { width, height };
