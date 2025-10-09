// src/screens/LandingScreen.tsx
import React from "react";
import { View, ScrollView, StyleSheet, Dimensions } from "react-native";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import CTA from "../components/CTA";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import { COLORS } from "../constants/theme";

const { width } = Dimensions.get("window");

export default function LandingScreen({ onLoginPress }: { onLoginPress: () => void }) {
  return (
    <View style={styles.container}>
      {/* ✅ Centered Header */}
      <View style={styles.headerWrapper}>
        <Header onLoginPress={onLoginPress} />
      </View>

      {/* Scrollable main content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.contentWrapper}>
          <Hero onLoginPress={onLoginPress} />
          <Features />
          <CTA onLoginPress={onLoginPress} />
          <Testimonials />
          <Footer />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  headerWrapper: {
    width: "100%",
    alignItems: "center",   // ✅ Centers header horizontally
  },
  scrollContent: {
    paddingBottom: 0,
    alignItems: "center",   // ✅ Keeps content centered
  },
  contentWrapper: {
    width: "100%",
    maxWidth: 1500,
    backgroundColor: COLORS.black,
  },
});
