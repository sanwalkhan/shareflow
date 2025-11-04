import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Dimensions, Platform } from "react-native";
import { COLORS } from "../constants/theme";
import { Feather } from "@expo/vector-icons";

export default function Testimonials() {
  const [isMobileView, setIsMobileView] = useState(
    Dimensions.get("window").width < 768
  );

  // ✅ Responsive resize listener
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

  const cards = [
    {
      name: "Sarah Chen",
      role: "CFO, TechCorp",
      text: "ShareFlow transformed our financial operations completely. We've saved 40+ hours monthly and gained insights we never thought possible.",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "CEO, InnovateCo",
      text: "The analytics dashboard revealed opportunities we'd been missing for years. Our revenue increased by 23% in the first quarter.",
      rating: 5,
    },
    {
      name: "Elena Rodriguez",
      role: "Finance Director, GlobalBank",
      text: "Implementation was seamless and the support team is exceptional. We've reduced operational costs by 35% while improving accuracy.",
      rating: 5,
    },
    {
      name: "David Kim",
      role: "COO, ScaleFast",
      text: "The automation features alone paid for the platform in the first month. Our team can now focus on strategic initiatives.",
      rating: 5,
    },
  ];

  const renderStars = (rating: number) => (
    <View className="flex-row gap-0.5">
      {[...Array(rating)].map((_, index) => (
        // ✅ Using COLORS.warning for star color
        <Feather key={index} name="star" size={16} color={COLORS.warning} />
      ))}
    </View>
  );

  return (
    <View className="relative bg-transparent overflow-hidden w-full">
      {/* Background Layers */}
      {/* ✅ Using a soft light gray, combining COLORS.white and COLORS.textLight */}
      <View className="absolute inset-0" style={{ backgroundColor: COLORS.white }} /> 
      
      <View
        className="absolute inset-0 bg-transparent"
        style={{ backgroundColor: COLORS.textDark, opacity: 0.02 }} // Dark pattern for subtle texture
      />
      <View
        className="absolute top-[-50px] left-[-50px] w-[200px] h-[200px] rounded-[100px]"
        style={{ backgroundColor: COLORS.accent, opacity: 0.03 }}
      />

      {/* Content Wrapper */}
      <View className="max-w-[1500px] mx-auto w-full">
        <View
          className="relative z-10"
          style={{
            paddingVertical: isMobileView ? 60 : 100, // Increased padding
            paddingHorizontal: isMobileView ? 20 : 40,
          }}
        >
          {/* Header */}
          <View className="items-center mb-16">
            <View className="items-center mb-4 relative">
              <Text
                className="text-center font-extrabold mb-3 tracking-[-0.8px]"
                style={{
                  color: COLORS.primary, // ✅ Using COLORS.primary for a bold dark color
                  fontSize: isMobileView ? 34 : 48, // Increased size
                  lineHeight: isMobileView ? 40 : 54,
                }}
              >
                Trusted by Industry Leaders
              </Text>
              <View
                className="w-20 h-1 rounded-[2px]"
                style={{ backgroundColor: COLORS.accent, opacity: 0.8 }}
              />
            </View>
            <Text
              className="text-center max-w-[600px] tracking-[-0.2px]"
              style={{
                color: "rgba(34, 38, 41, 0.75)", // ✅ COLORS.textDark (neutral) with opacity
                fontSize: isMobileView ? 17 : 19,
                lineHeight: isMobileView ? 24 : 28,
              }}
            >
              Join thousands of companies transforming their financial operations with ShareFlow
            </Text>
          </View>

          {/* ✅ Scrollable Testimonials */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: isMobileView ? 10 : 20,
              paddingVertical: 20,
              gap: 24,
            }}
            decelerationRate="fast"
            snapToInterval={isMobileView ? 320 : 380}
            snapToAlignment="center"
            scrollEventThrottle={16}
          >
            {cards.map((card, index) => (
              <View
                key={card.name}
                className="bg-transparent rounded-[24px] p-8 mx-2 relative overflow-hidden"
                style={{
                  width: isMobileView ? 300 : 360,
                  shadowColor: COLORS.black, // ✅ Using COLORS.black
                  shadowOffset: { width: 0, height: 12 },
                  shadowOpacity: 0.1,
                  shadowRadius: 24,
                  elevation: 16,
                }}
              >
                {/* Card Background */}
                <View
                  className="absolute inset-0 rounded-[24px] border border-gray-100"
                  style={{
                    backgroundColor: COLORS.white, // ✅ Using COLORS.white
                    borderColor: "rgba(0,0,0,0.05)",
                  }}
                />
                <View
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-[24px]"
                  style={{ backgroundColor: COLORS.accent, opacity: 0.8 }}
                />
                {/* Left Accent Bar - Removed left bar for cleaner look, kept only top */}

                {/* Content */}
                <View className="flex-row justify-between items-center mb-5">
                  <View
                    className="w-12 h-12 rounded-full justify-center items-center"
                    style={{ backgroundColor: "rgba(134,194,50,0.12)" }} // ✅ Accent with opacity
                  >
                    <Feather name="message-square" size={24} color={COLORS.accent} />
                  </View>
                  {renderStars(card.rating)}
                </View>

                <Text
                  className="italic mb-6 leading-6 tracking-[-0.2px]"
                  style={{ 
                    color: "rgba(34, 38, 41, 0.85)", // ✅ COLORS.textDark with opacity
                    fontSize: isMobileView ? 16 : 17 
                  }}
                >
                  "{card.text}"
                </Text>

                <View
                  className="flex-row justify-between items-center pt-5 border-t"
                  style={{ borderTopColor: "rgba(34, 38, 41, 0.08)" }} // ✅ COLORS.textDark with opacity for divider
                >
                  <View className="flex-1">
                    <Text 
                      className="font-bold text-base mb-0.5 tracking-[-0.3px]"
                      style={{ color: COLORS.primary }} // ✅ Using COLORS.primary
                    >
                      {card.name}
                    </Text>
                    <Text 
                      className="text-[13px] font-medium tracking-[0.2px]"
                      style={{ color: "rgba(34, 38, 41, 0.6)" }} // ✅ COLORS.textDark with opacity
                    >
                      {card.role}
                    </Text>
                  </View>
                  <View
                    className="w-11 h-11 rounded-full justify-center items-center border"
                    style={{
                      backgroundColor: "rgba(134,194,50,0.1)", // ✅ Accent with opacity
                      borderColor: "rgba(134,194,50,0.2)", // ✅ Accent with opacity
                    }}
                  >
                    <Text
                      className="font-bold text-sm"
                      style={{ color: COLORS.accent }}
                    >
                      {card.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Dots Indicator */}
          <View className="flex-row justify-center items-center mt-10 gap-2">
            {cards.map((_, index) => (
              <View
                key={index}
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: "rgba(34, 38, 41, 0.2)", // ✅ COLORS.textDark with opacity
                }}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}