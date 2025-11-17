// src/screens/LandingScreen.tsx
import React from "react";
import { View, ScrollView } from "react-native";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import CTA from "../components/CTA";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

export default function LandingScreen() {
  return (
    <View className="flex-1 bg-black">
      {/* Fixed Header */}
      <View className="w-full">
        <Header />
      </View>

      {/* Scrollable Content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        bounces={true}
        overScrollMode="always"
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