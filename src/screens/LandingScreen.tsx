// src/screens/LandingScreen.tsx
import React from "react";
import { View, ScrollView, Platform } from "react-native";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import CTA from "../components/CTA";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import { COLORS } from "../constants/theme";

export default function LandingScreen() {
  if (Platform.OS === "web") {
    // ✅ Web version using div for scroll
    return (
      <View className="flex flex-col h-screen bg-black overflow-hidden">
        {/* Header - Fixed at top */}
        <View className="w-full flex-shrink-0">
          <Header />
        </View>
        
        {/* Main Content - Scrollable */}
        <View className="flex-1 overflow-y-auto overflow-x-hidden web-scroll">
          <View className="w-full">
            <Hero />
            <Features />
            <CTA />
            <Testimonials />
            <Footer />
          </View>
        </View>
      </View>
    );
  }

  // ✅ Native version (Android / iOS)
  return (
    <View className="flex-1 bg-black">
      {/* Header - Fixed at top */}
      <View className="w-full">
        <Header />
      </View>

      {/* Main Content - Scrollable */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        alwaysBounceVertical={true}
        bounces={true}
      >
        <View className="w-full">
          <Hero />
          <Features />
          <CTA />
          <Testimonials />
          <Footer />
        </View>
      </ScrollView>
    </View>
  );
}