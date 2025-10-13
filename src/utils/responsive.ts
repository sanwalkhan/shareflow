// src/utils/responsive.ts
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const isMobile = width < 768;
export const isTablet = width >= 768 && width < 1024;
export const isDesktop = width >= 1024;
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
};

export const WINDOW = { width, height };

// Responsive spacing utilities
export const spacing = {
  xs: isMobile ? 4 : 6,
  sm: isMobile ? 8 : 12,
  md: isMobile ? 12 : 16,
  lg: isMobile ? 16 : 24,
  xl: isMobile ? 24 : 32,
  xxl: isMobile ? 32 : 48,
};

// Responsive font sizes
export const fontSize = {
  xs: isMobile ? 10 : 12,
  sm: isMobile ? 12 : 14,
  base: isMobile ? 14 : 16,
  lg: isMobile ? 16 : 18,
  xl: isMobile ? 18 : 20,
  xxl: isMobile ? 24 : 28,
  xxxl: isMobile ? 28 : 36,
};