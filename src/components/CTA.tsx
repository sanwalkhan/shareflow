import React, { useState, useEffect } from "react";
import { View, Text, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";
import Button from "../UI/Button"; // ✅ Use reusable button

export default function CTA() {
  const [isMobileView, setIsMobileView] = useState(
    Dimensions.get("window").width < 768
  );

  // ✅ Listen to window resizing for web responsiveness
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const width = Dimensions.get("window").width;
        setIsMobileView(width < 768);
      }, 100);
    };
    const subscription = Dimensions.addEventListener("change", handleResize);
    return () => {
      clearTimeout(resizeTimeout);
      if (typeof subscription?.remove === "function") subscription.remove();
    };
  }, []);

  const handleGetStarted = () => {
    // You can link this to Auth or Onboarding screen later
    console.log("Get Started Pressed!");
  };

  return (
    <View className="relative overflow-hidden w-full">
      {/* Background Layers */}
      
      {/* 🚀 KEY CHANGE: Simplified Base Background to primary color */}
      <View
        className="absolute inset-0"
        style={{ backgroundColor: COLORS.primary }}
      />
      
      {/* Background Texture/Pattern Layer (using neutral for dark texture) */}
      <View
        className="absolute inset-0 bg-transparent"
        style={{ backgroundColor: COLORS.neutral, opacity: 0.08 }} // Subtle dark pattern
      />
      
      {/* Background shape for visual interest */}
      <View
        className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] rounded-[150px]"
        style={{ backgroundColor: COLORS.accent, opacity: 0.05 }}
      />

      {/* Content Container */}
      <View className="max-w-[1500px] mx-auto w-full">
        <View
          className="items-center relative z-10"
          style={{
            paddingVertical: isMobileView ? 60 : 100, // Increased vertical padding
            paddingHorizontal: isMobileView ? 20 : 40,
          }}
        >
          {/* Title and Description */}
          <View className="items-center mb-12 max-w-[800px]">
            <View className="items-center mb-4 relative">
              <Text
                className="text-white text-center font-extrabold mb-3 tracking-[-0.8px]"
                style={{
                  color: COLORS.white, // ✅ Used COLORS.white
                  fontSize: isMobileView ? 34 : 48, // Increased size for impact
                  lineHeight: isMobileView ? 40 : 58,
                  textShadowColor: "rgba(255,255,255,0.1)",
                  textShadowOffset: { width: 0, height: 2 },
                  textShadowRadius: 4,
                }}
              >
                Ready to transform your financial operations?
              </Text>
              <View
                className="w-[100px] h-1 rounded-[2px]"
                style={{ backgroundColor: COLORS.accent, opacity: 0.8 }}
              />
            </View>

            <Text
              className="text-white/85 text-center mb-4 tracking-[-0.2px] leading-7 max-w-[600px]"
              style={{
                color: "rgba(255,255,255,0.85)", // ✅ White with opacity
                fontSize: isMobileView ? 17 : 19, // Slightly increased size
              }}
            >
              Join thousands of companies already using ShareFlow to save time,
              reduce risk, and drive sustainable growth.
            </Text>
          </View>

          {/* ✅ Reusable Button */}
          <Button
            onPress={handleGetStarted}
            className="flex-row items-center justify-center mb-12 min-w-[260px]"
            style={{
              backgroundColor: COLORS.accent,
              shadowColor: COLORS.accent,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.4,
              shadowRadius: 20,
              elevation: 16,
              paddingVertical: 18, // Slightly more padding
              borderRadius: 16,
            }}
          >
            <Text className="text-white font-extrabold text-[18px] tracking-[-0.2px] mr-3">
              Get Started Today
            </Text>
            <View
              className="w-7 h-7 rounded-[14px] justify-center items-center"
              style={{
                backgroundColor: COLORS.white, // ✅ Used COLORS.white
                shadowColor: COLORS.black, // ✅ Used COLORS.black
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <Feather name="arrow-up-right" size={20} color={COLORS.black} /> {/* ✅ Used COLORS.black */}
            </View>
          </Button>

          {/* ✅ Trust Indicators */}
          <View
            className={`${isMobileView ? "flex-col" : "flex-row"} items-center gap-8`}
          >
            {[
              { icon: "shield", label: "Enterprise Security" },
              { icon: "clock", label: "30-Day Free Trial" }, // Clarified trial duration
              { icon: "users", label: "24/7 Priority Support" }, // Clarified support
            ].map((item, index) => (
              <View
                key={index}
                className="flex-row items-center p-3 rounded-[12px] border"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)", // ✅ White with opacity
                  borderColor: "rgba(255,255,255,0.08)", // ✅ White with opacity
                }}
              >
                <View
                  className="w-8 h-8 rounded-[16px] justify-center items-center mr-2"
                  style={{ backgroundColor: "rgba(134,194,50,0.15)" }} // ✅ Accent with opacity
                >
                  <Feather name={item.icon as any} size={18} color={COLORS.accent} />
                </View>
                <Text 
                  className="text-white/80 text-base font-semibold tracking-[0.2px]" 
                  style={{ color: "rgba(255,255,255,0.8)" }} // ✅ White with opacity
                >
                  {item.label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}