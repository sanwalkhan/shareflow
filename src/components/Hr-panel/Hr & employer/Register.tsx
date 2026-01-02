import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";

import {
  COLORS,
  HR_MANAGEMENT_THEME,
  isMobile,
} from "../../../Constants/theme";

import Istock from "../../../assets/istock.png";
import Login from "./Login";

const BORDER_COLOR = "#CBB4B4";

const Register = () => {
  const [newsletter, setNewsletter] = useState(false);
  const [terms, setTerms] = useState(false);
  const [goLogin, setGoLogin] = useState(false);

  if (goLogin) return <Login />;

  return (
    <View style={styles.container}>
      {/* ================= LEFT / HERO ================= */}
      {!isMobile && (
        <View style={styles.leftWrapper}>
          <ImageBackground source={Istock} resizeMode="cover" style={styles.leftImage}>
            <View style={styles.overlay} />
            <View style={styles.leftContent}>
              <Text style={styles.leftTitle}>HR Management Platform</Text>
              <View style={styles.underline} />
              <Text style={styles.leftSubtitle}>
                Manage all employees, payrolls, and other human resource operations.
              </Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.learnMoreBtn}>
                  <Text style={styles.learnMoreText}>Learn More</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.featureBtn}>
                  <Text style={styles.featureText}>Our Features</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      )}

      {/* ================= RIGHT ================= */}
      <ScrollView
        contentContainerStyle={styles.rightPanel}
        showsVerticalScrollIndicator={false}
      >
        {/* ===== Mobile Hero ===== */}
        {isMobile && (
          <View style={styles.mobileHero}>
            <Text style={styles.mobileHeroTitle}>HR Management Platform</Text>
            <Text style={styles.mobileHeroText}>
              Manage employees, payroll & HR operations easily.
            </Text>
          </View>
        )}

        <Text style={styles.heading}>Welcome to Shareflow</Text>
        <Text style={styles.subHeading}>Register your account</Text>

        <View style={styles.row}>
          <Input label="First Name" />
          <Input label="Last Name" />
        </View>

        <View style={styles.row}>
          <Input label="E-mail Address" />
          <Input label="Phone Number" />
        </View>

        <View style={styles.row}>
          <Input label="Password" secure />
          <Input label="Confirm Password" secure />
        </View>

        <CheckBox
          checked={newsletter}
          label="Yes, I want to receive KRIS newsletters"
          onPress={() => setNewsletter(!newsletter)}
        />

        <CheckBox
          checked={terms}
          label="I agree to all the Terms & Privacy Policy"
          onPress={() => setTerms(!terms)}
        />

        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitText}>Create Account</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Text style={styles.loginLink} onPress={() => setGoLogin(true)}>
            Log In
          </Text>
        </Text>
      </ScrollView>
    </View>
  );
};

export default Register;

/* ================= INPUT ================= */
const Input = ({ label, secure = false }: any) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>
    <TextInput secureTextEntry={secure} style={styles.input} />
  </View>
);

/* ================= CHECKBOX ================= */
const CheckBox = ({ checked, label, onPress }: any) => (
  <Pressable style={styles.checkboxRow} onPress={onPress}>
    <View style={styles.checkbox}>{checked && <Text style={styles.tick}>✓</Text>}</View>
    <Text style={styles.checkboxText}>{label}</Text>
  </Pressable>
);

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: isMobile ? "column" : "row",
    backgroundColor: COLORS.white,
  },

  /* LEFT (DESKTOP ONLY – UNCHANGED) */
  leftWrapper: { flex: 1.3 },
  leftImage: { flex: 1, width: "100%", height: "100%" },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(25,50,136,0.88)" },
  leftContent: { flex: 1, padding: 60, justifyContent: "center" },
  leftTitle: {
    fontSize: 36,
    fontFamily: HR_MANAGEMENT_THEME.fonts.heading,
    color: COLORS.white,
    marginBottom: 12,
  },
  underline: {
    width: 120,
    height: 6,
    backgroundColor: COLORS.white,
    borderRadius: 6,
    marginBottom: 24,
  },
  leftSubtitle: {
    fontSize: 18,
    lineHeight: 28,
    color: COLORS.white,
    maxWidth: 420,
    marginBottom: 40,
  },
  buttonRow: { flexDirection: "row", gap: 16 },
  learnMoreBtn: {
    backgroundColor: COLORS.button,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
  learnMoreText: { fontSize: 16, color: COLORS.black },
  featureBtn: {
    borderWidth: 2,
    borderColor: COLORS.white,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
  featureText: { fontSize: 16, color: COLORS.white },

  /* MOBILE HERO */
  mobileHero: {
    backgroundColor: COLORS.primary,
    padding: 24,
    borderRadius: 14,
    marginBottom: 28,
  },
  mobileHeroTitle: {
    fontSize: 22,
    color: COLORS.white,
    fontFamily: HR_MANAGEMENT_THEME.fonts.heading,
    marginBottom: 6,
  },
  mobileHeroText: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
  },

  /* RIGHT */
  rightPanel: {
    flexGrow: 1,
    padding: isMobile ? 20 : 60,
    justifyContent: "center",
  },

  heading: {
    fontSize: isMobile ? 26 : 34,
    color: COLORS.primary,
    marginBottom: 8,
    textAlign: isMobile ? "center" : "left",
  },
  subHeading: {
    fontSize: 16,
    color: COLORS.textMuted,
    marginBottom: isMobile ? 24 : 40,
    textAlign: isMobile ? "center" : "left",
  },

  row: {
    flexDirection: isMobile ? "column" : "row",
    gap: 20,
  },

  inputGroup: { flex: 1, marginBottom: 18 },
  label: {
    fontSize: 15,
    marginBottom: 6,
    color: COLORS.primary,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 15,
  },

  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  tick: { fontSize: 14, fontWeight: "700", color: COLORS.primary },
  checkboxText: { fontSize: 13, color: COLORS.textMuted },

  submitBtn: {
    backgroundColor: COLORS.primary,
    height: 52,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  submitText: { fontSize: 16, color: COLORS.white },

  footerText: {
    marginTop: 26,
    fontSize: 14,
    textAlign: "center",
  },
  loginLink: { color: COLORS.primary },
});
