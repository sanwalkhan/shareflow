import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const isMobile = width < 768;
export const isSmallMobile = width < 375;

/* =========================
   COLORS (SAFE MERGE)
   ❗ No existing value changed
   ❗ Only missing keys added
========================= */
export const COLORS = {
  /* ---------- ORIGINAL (YOUR PROJECT) ---------- */
  primary: "#193288",
  primaryDark: "#253d90",
  accent: "#001867ff",
  white: "#ffffff",
  black: "#000000",
  transparent: "#00000000",
  lightBg: "#e3edf9",
  softGrayBg: "#e0e3ec",
  textPrimary: "#1d1d1d",
  textSecondary: "#545559",
  textMuted: "#616060",
  button:"#FFC20E",
  success: "#3f861e",
  danger: "#ff0000",

  hrBg: "#e3edf9",
  hrCardBg: "#ffffff",
  settings:"#a7c513",
  /* ---------- ADDED (DEV THEME – NON-CONFLICTING) ---------- */
  secondary: "#474b4f",
  tertiary: "#6b6e70",
  neutral: "#222629",

  textLight: "#f8f9fa",
  textDark: "#222629",

  gray: "#6C717DFF",
  surface: "#1B263B",

  warning: "#ffc107",
  error: "#dc3545",
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
popupButtonBackground: "#E5E7EB", // Popup cancel button bg
popupButtonText: "#4B5563",       // Popup button text (optional)

};

/* =========================
   FONTS
========================= */
export const FONTS = {
  productSans: {
    regular: "Inter_400Regular",
    medium: "Inter_500Medium",
    bold: "Inter_700Bold",
  },
};

/* =========================
   HR THEME
========================= */
export const HR_THEME = {
  fonts: {
    heading: "Poppins_600SemiBold",
    body: "Inter_400Regular",
  },

  sidebar: {
    width: 300,
    itemHeight: 78,
    radius: 15,
    inactiveBg: COLORS.hrBg,
    activeBg: COLORS.button,
    textColor: COLORS.black,
  },

  text: {
    primary: COLORS.textPrimary,
    muted: COLORS.textMuted,
  },

  input: {
    bg: COLORS.softGrayBg,
    textColor: COLORS.black,
    radius: 12,
    padding: 14,
  },

  card: {
    radius: 16,
    bg: COLORS.white,
  },
};

/* =========================
   SETTINGS THEME
========================= */
export const SETTINGS_THEME = {
  fonts: {
    heading: "HankenGrotesk_700Bold",
    subHeading: "HankenGrotesk_500Medium",
    body: "HankenGrotesk_400Regular",
  },

  card: {
    bg: COLORS.white,
    radius: 16,
    border: COLORS.softGrayBg,
    padding: 24,
  },

  input: {
    bg: COLORS.white,
    border: COLORS.softGrayBg,
    radius: 12,
    height: 44,
    paddingX: 14,
    textColor: COLORS.black,
    placeholder: COLORS.textMuted,
  },

  toggle: {
    active: COLORS.settings,
    inactive: COLORS.softGrayBg,
  },

  button: {
    primaryBg: COLORS.settings,
    text: COLORS.white,
    radius: 10,
    height: 40,
  },
};

/* =========================
   HR MANAGEMENT THEME
========================= */
export const HR_MANAGEMENT_THEME = {
  fonts: {
    heading: FONTS.productSans.bold,
    subHeading: FONTS.productSans.medium,
    body: FONTS.productSans.regular,
  },

  layout: {
    pageBg: COLORS.lightBg,
    cardBg: COLORS.hrCardBg,
    cardRadius: 18,
    cardPadding: 20,
  },

  text: {
    title: COLORS.primary,
    subtitle: COLORS.textSecondary,
    body: COLORS.textPrimary,
    muted: COLORS.textMuted,
  },

  button: {
    primaryBg: COLORS.button,
    primaryText: COLORS.black,

    secondaryBg: COLORS.primary,
    secondaryText: COLORS.white,

    dangerBg: COLORS.danger,
    dangerText: COLORS.white,

    radius: 12,
    height: 48,
  },

  input: {
    bg: COLORS.white,
    border: COLORS.softGrayBg,
    focusBorder: COLORS.primary,
    textColor: COLORS.black,
    placeholder: COLORS.textMuted,
    radius: 12,
    height: 46,
    paddingX: 14,
  },

  badge: {
    successBg: "#eaf4ea",
    successText: COLORS.success,

    dangerBg: "#ffeaea",
    dangerText: COLORS.danger,
  },
};

/* =========================
   WINDOW
========================= */
export const WINDOW = {
  width,
  height,
};
