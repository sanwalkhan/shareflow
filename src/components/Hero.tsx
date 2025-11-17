import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";
import Button from "../UI/Button";
import { useNavigation } from "@react-navigation/native";

const HERO_BG_IMAGE = require("../assets/images/hero-bg.png");

export default function Hero() {
  const navigation = useNavigation();
  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setWindowHeight(window.height);
    });

    return () => subscription?.remove();
  }, []);

  const handleFreeTrial = () => {
    navigation.navigate("Auth" as never);
  };

  const handleWatchDemo = () => {
    console.log("Watch Demo pressed");
  };

  const trustedCompanies = [
    "TechCorp", "GlobalBank", "InnovateCo", "ScaleFast", "FinancePlus"
  ];

  const features = [
    { icon: "clock", text: "30-Day Free Trial" },
    { icon: "shield", text: "Enterprise Security" },
    { icon: "zap", text: "Setup in 5 mins" }
  ];

  return (
    <View className="relative w-full bg-neutral" style={{ minHeight: windowHeight * 0.85 }}>
      
      {/* Background Image */}
      <View className="absolute inset-0">
        <Image
          source={HERO_BG_IMAGE}
          className="w-full h-full"
          resizeMode="cover"
          style={{ opacity: 0.15 }}
        />
      </View>
      
      {/* Background Shapes */}
      <View 
        className="absolute -top-12 -right-12 w-60 h-60 rounded-full opacity-20"
        style={{ backgroundColor: COLORS.accent }}
      />
      <View 
        className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full opacity-10"
        style={{ backgroundColor: COLORS.primary }}
      />

      {/* Main Content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          paddingTop: 50,
          paddingHorizontal: 16,
          paddingBottom: 30,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 flex-col items-center w-full">
          
          {/* Main Content Section */}
          <View className="w-full z-10">
            
            {/* Tagline Badge */}
            <View className="mb-4">
              <View className="px-3 py-1.5 rounded-xl self-start border border-accent/15 bg-accent/8">
                <Text className="font-bold text-xs tracking-wide text-accent">
                  Enterprise Grade
                </Text>
              </View>
            </View>

            {/* Main Title */}
            <View className="mb-4">
              <Text className="font-black tracking-tight text-white text-3xl leading-[38px]">
                Financial Intelligence{"\n"}
                <Text className="text-accent">Reimagined</Text>
              </Text>
              <View className="w-20 h-1 rounded-sm bg-accent/30 mt-2" />
            </View>

            {/* Subtitle */}
            <Text className="text-white/80 text-sm leading-6 tracking-tight mb-6">
              Streamline expense tracking, automate payroll, and unlock
              powerful shareholder insights with a single platform.
            </Text>

            {/* CTA Buttons */}
            <View className="flex-col w-full gap-3 mb-8">
              
              {/* Free Trial Button */}
              <Button
                onPress={handleFreeTrial}
                className="flex-row items-center justify-center w-full bg-accent px-6 py-3.5 rounded-xl shadow-xl"
                style={{
                  shadowColor: COLORS.accent,
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.4,
                  shadowRadius: 16,
                  elevation: 8,
                }}
              >
                <Text className="text-base text-white font-semibold tracking-tight mr-2">
                  Start Free Trial
                </Text>
                <Feather name="arrow-right" size={18} color={COLORS.white} />
              </Button>

              {/* Watch Demo Button */}
              <TouchableOpacity 
                onPress={handleWatchDemo}
                className="flex-row items-center justify-center w-full px-6 py-3.5 rounded-xl border border-white/10 bg-white/5"
              >
                <Feather name="play-circle" size={18} color={COLORS.accent} />
                <Text className="ml-2 font-semibold text-sm text-white/90">
                  Watch Demo
                </Text>
              </TouchableOpacity>
            </View>

            {/* Quick Features */}
            <View className="flex-row justify-between mb-8">
              {features.map((feature, index) => (
                <View key={index} className="flex-1 items-center mx-1">
                  <View className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 justify-center items-center mb-2">
                    <Feather name={feature.icon as any} size={14} color={COLORS.accent} />
                  </View>
                  <Text className="text-white/70 text-[10px] text-center font-medium leading-tight">
                    {feature.text}
                  </Text>
                </View>
              ))}
            </View>

            {/* Stats Section */}
            <View className="flex-row justify-between mb-8">
              {[
                { number: "500+", label: "Companies" },
                { number: "$2.1B+", label: "Managed" },
                { number: "99.7%", label: "Uptime" },
              ].map((stat, index) => (
                <View
                  key={index}
                  className="flex-1 items-center p-3 mx-1 rounded-lg border border-white/5 bg-white/2"
                >
                  <Text className="font-black text-white text-lg mb-1">
                    {stat.number}
                  </Text>
                  <Text className="text-xs font-medium text-white/60 tracking-wide">
                    {stat.label}
                  </Text>
                </View>
              ))}
            </View>

            {/* Trusted By Section */}
            <View className="mb-6">
              <Text className="text-white/60 text-xs font-medium text-center mb-3 tracking-wide">
                TRUSTED BY INDUSTRY LEADERS
              </Text>
              <View className="flex-row flex-wrap justify-center gap-3">
                {trustedCompanies.map((company, index) => (
                  <View
                    key={index}
                    className="px-3 py-2 rounded-lg border border-white/5 bg-white/2"
                  >
                    <Text className="text-white/70 text-xs font-medium">
                      {company}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Security Badges */}
            <View className="flex-row justify-center gap-4">
              <View className="flex-row items-center">
                <Feather name="shield" size={12} color={COLORS.accent} />
                <Text className="text-white/50 text-[10px] ml-1">SOC 2 Compliant</Text>
              </View>
              <View className="flex-row items-center">
                <Feather name="lock" size={12} color={COLORS.accent} />
                <Text className="text-white/50 text-[10px] ml-1">GDPR Ready</Text>
              </View>
              <View className="flex-row items-center">
                <Feather name="award" size={12} color={COLORS.accent} />
                <Text className="text-white/50 text-[10px] ml-1">ISO 27001</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}