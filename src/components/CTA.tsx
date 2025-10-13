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
    const handleResize = () => {
      const width = Dimensions.get("window").width;
      setIsMobileView(width < 768);
    };
    const subscription = Dimensions.addEventListener("change", handleResize);
    return () => {
      if (typeof subscription?.remove === "function") subscription.remove();
    };
  }, []);

  const handleGetStarted = () => {
    // You can link this to Auth or Onboarding screen later
    console.log("Get Started Pressed!");
  };

  return (
    <View className="relative bg-transparent overflow-hidden w-full">
      {/* Background Layers */}
      <View
        className="absolute inset-0"
        style={{ backgroundColor: "#0A0A0A" }}
      />
      <View
        className="absolute top-0 left-0 right-0 h-3/5"
        style={{ backgroundColor: COLORS.primary, opacity: 0.95 }}
      />
      <View
        className="absolute inset-0 bg-transparent"
        style={{ opacity: 0.03 }}
      />
      <View
        className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] rounded-[150px]"
        style={{ backgroundColor: COLORS.accent, opacity: 0.05 }}
      />

      {/* Content Container */}
      <View className="max-w-[1500px] mx-auto w-full">
        <View
          className="items-center relative z-10"
          style={{
            paddingVertical: isMobileView ? 60 : 80,
            paddingHorizontal: isMobileView ? 20 : 40,
          }}
        >
          {/* Title and Description */}
          <View className="items-center mb-10 max-w-[800px]">
            <View className="items-center mb-4 relative">
              <Text
                className="text-white text-center font-extrabold mb-3 tracking-[-0.8px]"
                style={{
                  fontSize: isMobileView ? 28 : 42,
                  lineHeight: isMobileView ? 36 : 52,
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
              className="text-white/85 text-center mb-4 tracking-[-0.2px] leading-6 max-w-[600px]"
              style={{
                fontSize: isMobileView ? 16 : 18,
              }}
            >
              Join thousands of companies already using ShareFlow to save time,
              reduce risk, and drive sustainable growth.
            </Text>
          </View>

          {/* ✅ Reusable Button */}
          <Button
            onPress={handleGetStarted}
            className="flex-row items-center justify-center mb-10 min-w-[240px]"
            style={{
              backgroundColor: COLORS.accent,
              shadowColor: COLORS.accent,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.4,
              shadowRadius: 20,
              elevation: 16,
            }}
          >
            <Text className="text-white font-extrabold text-[17px] tracking-[-0.2px] mr-3">
              Get Started Today
            </Text>
            <View
              className="w-7 h-7 rounded-[14px] justify-center items-center"
              style={{
                backgroundColor: "rgba(255,255,255,0.9)",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <Feather name="arrow-up-right" size={20} color="#000" />
            </View>
          </Button>

          {/* ✅ Trust Indicators */}
          <View
            className={`${isMobileView ? "flex-col" : "flex-row"} items-center gap-8`}
          >
            {[
              { icon: "shield", label: "Enterprise Security" },
              { icon: "clock", label: "30-Day Trial" },
              { icon: "users", label: "24/7 Support" },
            ].map((item, index) => (
              <View
                key={index}
                className="flex-row items-center p-3 rounded-[12px] border"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderColor: "rgba(255,255,255,0.08)",
                }}
              >
                <View
                  className="w-7 h-7 rounded-[14px] justify-center items-center mr-2"
                  style={{ backgroundColor: "rgba(134,194,50,0.15)" }}
                >
                  <Feather name={item.icon as any} size={16} color={COLORS.accent} />
                </View>
                <Text className="text-white/80 text-sm font-semibold tracking-[0.2px]">
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
