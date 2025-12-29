  import { Dimensions } from "react-native";

  const { width, height } = Dimensions.get("window");

  export const isMobile = width < 768;
  export const isSmallMobile = width < 375;

  /* =========================
    GLOBAL COLORS
  ========================= */
  export const COLORS = {
    /* Core Brand Colors */
    primary: "#193288",
    primaryDark: "#253d90",
    accent: "#ffc20e",

    white: "#ffffff",
    black: "#000000",
    transparent: "#00000000",

    /* Backgrounds */
    lightBg: "#e3edf9",
    softGrayBg: "#e0e3ec",

    /* Text */
    textPrimary: "#1d1d1d",
    textSecondary: "#545559",
    textMuted: "#616060",

    /* Status */
    success: "#3f861e",
    danger: "#ff0000",

    /* HR Specific */
    hrBg: "#e3edf9",
    hrCardBg: "#ffffff",
  };

  /* =========================
    TYPOGRAPHY
  ========================= */
  
export const FONTS = {
   productSans: {
    regular: "Inter_400Regular",
    medium: "Inter_500Medium",
    bold: "Inter_700Bold",
  },

};

  /* =========================
    HR / DASHBOARD THEME
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
      activeBg: COLORS.accent,
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
      active: COLORS.primary,
      inactive: COLORS.softGrayBg,
    },

    button: {
      primaryBg: COLORS.primary,
      text: COLORS.white,
      radius: 10,
      height: 40,
    },
  };

  /* =========================
    HR MANAGEMENT THEME (NEW)
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
      primaryBg: COLORS.accent,
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
