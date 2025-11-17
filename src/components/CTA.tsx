import React, { useState, useEffect } from "react";
import { View, Text, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";
import Button from "../UI/Button";
import { useNavigation } from "@react-navigation/native";

export default function CTA() {
  const navigation = useNavigation();
  const [isMobileView, setIsMobileView] = useState(
    Dimensions.get("window").width < 768
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setIsMobileView(window.width < 768);
    });

    return () => subscription?.remove();
  }, []);

  const handleGetStarted = () => {
    navigation.navigate("Auth" as never);
  };

  return (
    <View className="relative w-full bg-gradient-to-b from-primary to-neutral/90">
      
      {/* Simple Background Pattern */}
      <View className="absolute inset-0 opacity-5">
        <View className="absolute top-10 right-10 w-20 h-20 rounded-full bg-accent" />
        <View className="absolute bottom-10 left-10 w-16 h-16 rounded-full bg-white" />
      </View>

      {/* Main Content - Ultra Compact */}
      <View className="w-full max-w-4xl mx-auto">
        <View 
          className="items-center relative z-10"
          style={{
            paddingVertical: isMobileView ? 50 : 70,
            paddingHorizontal: isMobileView ? 16 : 32,
          }}
        >
          
          {/* Single Focused Message */}
          <View className="items-center mb-8 max-w-md">
            <Text className="text-white text-center font-black text-2xl md:text-3xl leading-tight mb-4">
              Start your free trial today
            </Text>
            <Text className="text-white/80 text-center text-base leading-6">
              No credit card required • Setup in 5 minutes • Cancel anytime
            </Text>
          </View>

          {/* Primary CTA Button */}
          <Button
            onPress={handleGetStarted}
            className="flex-row items-center justify-center bg-accent px-8 py-4 rounded-xl shadow-2xl mb-6"
            style={{
              shadowColor: COLORS.accent,
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.4,
              shadowRadius: 16,
              elevation: 12,
            }}
          >
            <Text className="text-white text-lg font-semibold mr-3">
              Get Started Free
            </Text>
            <Feather name="arrow-right" size={20} color={COLORS.white} />
          </Button>

          {/* Simple Trust Badges in Single Row */}
          <View className="flex-row flex-wrap justify-center gap-4">
            <View className="flex-row items-center">
              <Feather name="shield" size={14} color={COLORS.accent} />
              <Text className="text-white/70 text-xs ml-1">Enterprise Security</Text>
            </View>
            <View className="flex-row items-center">
              <Feather name="clock" size={14} color={COLORS.accent} />
              <Text className="text-white/70 text-xs ml-1">30-Day Trial</Text>
            </View>
            <View className="flex-row items-center">
              <Feather name="users" size={14} color={COLORS.accent} />
              <Text className="text-white/70 text-xs ml-1">24/7 Support</Text>
            </View>
          </View>

          {/* Minimal Social Proof */}
          <View className="mt-6 flex-row items-center">
            <View className="flex-row mr-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Feather key={star} name="star" size={12} color={COLORS.warning} />
              ))}
            </View>
            <Text className="text-white/60 text-xs">
              4.9/5 from 500+ companies
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}