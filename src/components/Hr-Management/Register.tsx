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
} from "../../Constants/theme";

import Istock from "../../assets/istock.png";
import Login from "./Login";

const BORDER_COLOR = "#CBB4B4";

const Register = () => {
  const [newsletter, setNewsletter] = useState(false);
  const [terms, setTerms] = useState(false);
  const [goLogin, setGoLogin] = useState(false);

  if (goLogin) return <Login />;

  return (
    <View style={styles.container}>
      {/* ================= LEFT SIDE ================= */}
      {!isMobile && (
        <View style={styles.leftWrapper}>
          <ImageBackground
            source={Istock}
            resizeMode="cover"
            style={styles.leftImage}
          >
            {/* Blue overlay */}
            <View style={styles.overlay} />

            {/* Centered content */}
            <View style={styles.leftContent}>
              <Text style={styles.leftTitle}>HR Management Platform</Text>
              <View style={styles.underline} />

              <Text style={styles.leftSubtitle}>
                Manage all employees, payrolls, and other human resource
                operations.
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

      {/* ================= RIGHT SIDE ================= */}
      <ScrollView contentContainerStyle={styles.rightPanel}>
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

/* ======================
   INPUT
====================== */
const Input = ({ label, secure = false }: any) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>
    <TextInput secureTextEntry={secure} style={styles.input} />
  </View>
);

/* ======================
   CHECKBOX
====================== */
const CheckBox = ({ checked, label, onPress }: any) => (
  <Pressable style={styles.checkboxRow} onPress={onPress}>
    <View style={styles.checkbox}>
      {checked && <Text style={styles.tick}>✓</Text>}
    </View>
    <Text style={styles.checkboxText}>{label}</Text>
  </Pressable>
);

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
  leftWrapper: {
    flex: 1,
  },
  leftImage: {
  flex: 1,
  width: "100%",
  height: "100%",
},

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(25,50,136,0.88)",
  },
  leftContent: {
    flex: 1,
    padding: 60,
    justifyContent: "center", // ✅ CENTERED
  },
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
    fontFamily: HR_MANAGEMENT_THEME.fonts.body,
    color: COLORS.white,
    maxWidth: 420,
    marginBottom: 40,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 16,
  },
  learnMoreBtn: {
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
  learnMoreText: {
    fontFamily: HR_MANAGEMENT_THEME.fonts.body,
    fontSize: 16,
    color: COLORS.black,
  },
  featureBtn: {
    borderWidth: 2,
    borderColor: COLORS.white,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
  featureText: {
    fontFamily: HR_MANAGEMENT_THEME.fonts.body,
    fontSize: 16,
    color: COLORS.white,
  },

  /* RIGHT */
  rightPanel: {
  flexGrow: 1,
  padding: isMobile ? 24 : 60,
  justifyContent: "center",
  backgroundColor: COLORS.white, // ✅ THIS IS THE FIX
},

  heading: {
    fontSize: 34,
    fontFamily: "Poppins_600SemiBold",
    color: COLORS.primary,
    marginBottom: 8,
  },
  subHeading: {
    fontSize: 18,
    fontFamily: HR_MANAGEMENT_THEME.fonts.body,
    color: COLORS.textMuted,
    marginBottom: 40,
  },

  row: {
    flexDirection: isMobile ? "column" : "row",
    gap: 20,
  },
  inputGroup: {
    flex: 1,
    marginBottom: 22,
  },
  label: {
  fontSize: 16,
  marginBottom: 8,
  fontFamily: HR_MANAGEMENT_THEME.fonts.body,
  color: COLORS.primary, // ✅ SAME AS MAIN HEADING
},

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 16,
    fontFamily: HR_MANAGEMENT_THEME.fonts.body,
    backgroundColor: COLORS.white,
  },

  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
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
  tick: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.primary,
  },
  checkboxText: {
    fontFamily: HR_MANAGEMENT_THEME.fonts.body,
    fontSize: 14,
    color: COLORS.textMuted,
  },

  submitBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 34,
    height: 52,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 24,
  },
  submitText: {
    fontFamily: HR_MANAGEMENT_THEME.fonts.body,
    fontSize: 16,
    color: COLORS.white,
  },

  footerText: {
    marginTop: 28,
    fontSize: 14,
    fontFamily: HR_MANAGEMENT_THEME.fonts.body,
    color: COLORS.black,
  },
  loginLink: {
    color: COLORS.primary,
  },
});
