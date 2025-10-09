// src/components/Header.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, isMobile } from "../constants/theme";

export default function Header({ onLoginPress }: { onLoginPress: () => void }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerBackground} />

      <View style={styles.headerContent}>
        <View style={styles.left}>
          <View style={styles.logoContainer}>
            <Feather name="trending-up" size={24} color={COLORS.accent} />
            <Text style={styles.logo}>
              Share<Text style={styles.logoAccent}>Flow</Text>
            </Text>
          </View>
        </View>

        <View style={styles.right}>
          {!isMobile && (
            <>
              <TouchableOpacity style={styles.navLink}>
                <Text style={styles.navLinkText}>Features</Text>
                <View style={styles.navLinkUnderline} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.navLink}>
                <Text style={styles.navLinkText}>Pricing</Text>
                <View style={styles.navLinkUnderline} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.navLink}>
                <Text style={styles.navLinkText}>About</Text>
                <View style={styles.navLinkUnderline} />
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity style={styles.ctaButton} onPress={onLoginPress}>
            <View style={styles.ctaBackground} />
            <Text style={styles.ctaText}>Register as Company</Text>
            <Feather
              name="arrow-right"
              size={16}
              color="#000"
              style={styles.ctaIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  header: {
    height: 88,
    position: "relative",
    backgroundColor: "transparent",
    width: "100%",
    maxWidth: 1500,
    alignSelf: "center", // ✅ Centers it horizontally
    overflow: "hidden",
  },
  headerBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#0A0A0A",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  headerContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.02)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  logo: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
    marginLeft: 10,
    letterSpacing: -0.5,
    textShadowColor: "rgba(255,255,255,0.1)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  logoAccent: {
    color: COLORS.accent,
    textShadowColor: "rgba(74, 144, 226, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  navLink: {
    marginHorizontal: 12,
    paddingVertical: 8,
    position: "relative",
  },
  navLinkText: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: -0.2,
  },
  navLinkUnderline: {
    position: "absolute",
    bottom: 4,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: COLORS.accent,
    opacity: 0,
    transform: [{ scaleX: 0.8 }],
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
    marginLeft: 12,
    position: "relative",
    overflow: "hidden",
    shadowColor: COLORS.accent,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  ctaBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.accent,
    opacity: 0.95,
  },
  ctaText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: -0.2,
    marginRight: 6,
  },
  ctaIcon: {
    opacity: 0.9,
  },
});
