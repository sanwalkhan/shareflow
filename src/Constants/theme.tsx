import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

/* ===== Responsive Helpers ===== */
export const isMobile = width < 768;
export const isSmallMobile = width < 375;

/* ===== Colors / Theme ===== */
export const COLORS = {
  /* ===== Brand ===== */
  button: "#FFC20E",
  white: "#FFFFFF",
  black: "#000000",

  /* ===== Header / Landing Page ===== */
  headerBackground: "#E6F0FF",   // Header bg
  headingText: "#FFC20E",        // ShareFlow text
  registerButton: "#FFC20E",     // Register button bg
  registerText: "#FFFFFF",       // Register button text

  /* ===== Hero Section ===== */
  heroBackground: "#001867ff",   // Hero screen bg
  heroHeading: "#FFFFFF",        // Hero heading text (white)

  /* ===== Cards ===== */
  cardBackground: "#FFFFFF",           // Inner Cards bg
  outerCardBackground: "#E6F0FF",      // Outer Card bg

  /* ===== TextInput / Placeholder ===== */
  inputBackground: "#E6F0FF",          // TextInput bg
  inputPlaceholder: "#6C717D",         // Placeholder text color
  grayButton: "#D1D5DB", // Previous button background
grayButtonText: "#4B5563", // Previous button text color
  /* ===== Theme Base ===== */
  accent: "#001867ff",                  // Highlight / accent
  primary: "#193288",                   // Primary dark
  secondary: "#263238",
  tertiary: "#717171",
  neutral: "#222629",
popupButtonBackground: "#E5E7EB", // Popup cancel button bg
popupButtonText: "#4B5563",       // Popup button text (optional)

  /* ===== Text ===== */
  textLight: "#f8f9fa",
  textDark: "#222629",
  gray: "#6C717DFF",

  /* ===== Surface / Layout ===== */
  surface: "#1B263B",

  /* ===== Status Colors ===== */
  success: "#28a745",
  warning: "#ffc107",
  danger: "#dc3545",
  error: "#dc3545",
};

/* ===== Window Size ===== */
export const WINDOW = {
  width,
  height,
};
