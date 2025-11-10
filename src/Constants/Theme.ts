// src/Constants/Theme.ts

export const colors = {
  primary: '#61892f',              // dark green (main color)
  accent: '#86c232',               // bright green (buttons, highlights)
  secondary: '#474b4f',            // dark gray
  tertiary: '#6b6e70',             // text gray
  neutral: '#f1f5f9',              // default light background
  white: '#ffffff',
  black: '#000000',
  inputBg: '#e0e0e0',              // input field background

  // Gradient for buttons
  buttonGradientStart: '#2A2F50',  // Sign In button gradient start
  buttonGradientEnd: '#28A745',    // Sign In button gradient end

  // Background colors
  backgroundPrimary: '#E3EDF9',    // main app/screen background
  backgroundCard: '#ffffff',       // card/container background
  backgroundInput: '#e0e0e0',      // input fields background
};

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 };
export const borderRadius = { sm: 6, md: 12, lg: 20 };
export const fontSize = { sm: 12, base: 14, lg: 16, xl: 20, xxl: 24 };

// Button styles (reusable)
export const buttonStyles = {
  primary: {
    backgroundColor: colors.accent,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  secondary: {
    backgroundColor: colors.inputBg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  text: { color: colors.white, fontWeight: '600', fontSize: fontSize.base },
  textSecondary: { color: colors.black, fontWeight: '600', fontSize: fontSize.base },
};
