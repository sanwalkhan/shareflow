import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { COLORS, HR_MANAGEMENT_THEME, isMobile } from "../../Constants/theme";
import login from "../../assets/login.png";

const Login = () => {
  return (
    <View style={styles.container}>
      {/* LEFT FORM */}
      <ScrollView contentContainerStyle={styles.leftPanel}>
        <Text style={styles.heading}>Login</Text>
        <Text style={styles.subHeading}>Login to your account.</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>E-mail Address</Text>
          <TextInput style={styles.input} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput secureTextEntry style={styles.input} />
        </View>

        {/* OPTIONS */}
        <View style={styles.optionRow}>
          <View style={styles.rememberRow}>
            <View style={styles.checkbox} />
            <Text style={styles.optionText}>Remember me</Text>
          </View>

          <Text style={styles.link}>Reset Password?</Text>
        </View>

        {/* BUTTON */}
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Sign In</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Don’t have an account yet?{" "}
          <Text style={styles.link}>Join KRIS today.</Text>
        </Text>
      </ScrollView>

      {/* RIGHT IMAGE */}
      {!isMobile && (
        <ImageBackground source={login} style={styles.rightPanel}>
          <View style={styles.overlay} />

          <View style={styles.imageContent}>
            <Text style={styles.imageTitle}>
              Manage all <Text style={styles.highlight}>HR Operations</Text>{" "}
              from the comfort of your home.
            </Text>

            {/* SLIDER DOTS */}
            <View style={styles.dots}>
              <View style={[styles.dot, styles.dotActive]} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </View>
        </ImageBackground>
      )}
    </View>
  );
};

export default Login;

/* ======================
   STYLES
====================== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: isMobile ? "column" : "row",
    backgroundColor: COLORS.white,
  },

  /* LEFT */
  leftPanel: {
    flexGrow: 1,
    padding: 60,
    justifyContent: "center",
  },
  heading: {
    fontSize: 32,
    fontFamily: HR_MANAGEMENT_THEME.fonts.heading,
    color: COLORS.primary,
    marginBottom: 6,
  },
  subHeading: {
    fontSize: 16,
    color: COLORS.textMuted,
    marginBottom: 40,
  },

  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: COLORS.primary,
    fontWeight: "600",
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#d4a6a6",
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 16,
    backgroundColor: COLORS.white,
  },

  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#d4a6a6",
    borderRadius: 4,
  },
  optionText: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  link: {
    color: COLORS.primary,
    fontWeight: "600",
    fontSize: 14,
  },

  loginBtn: {
    backgroundColor: COLORS.primary,
    height: 52,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  loginText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },

  footerText: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: "center",
  },

  /* RIGHT */
  rightPanel: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(25,50,136,0.9)",
  },
  imageContent: {
    padding: 60,
    zIndex: 2,
  },
  imageTitle: {
    fontSize: 36,
    lineHeight: 48,
    color: COLORS.white,
    fontFamily: HR_MANAGEMENT_THEME.fonts.heading,
    marginBottom: 40,
  },
  highlight: {
    color: COLORS.accent,
  },

  dots: {
    flexDirection: "row",
    gap: 12,
  },
  dot: {
    width: 48,
    height: 8,
    backgroundColor: COLORS.white,
    borderRadius: 6,
    opacity: 0.6,
  },
  dotActive: {
    backgroundColor: COLORS.accent,
    opacity: 1,
  },
});
