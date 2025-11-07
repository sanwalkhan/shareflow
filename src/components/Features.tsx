import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";

export default function Features() {
  const [isMobileView, setIsMobileView] = useState(
    Dimensions.get("window").width < 768
  );

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

  const features = [
    {
      icon: "bar-chart-2",
      title: "Advanced Analytics",
      desc: "Real-time insights and custom reports with predictive modeling and AI-driven recommendations.",
    },
    {
      icon: "shield",
      title: "Enterprise Security",
      desc: "Bank-grade encryption, multi-factor authentication, and comprehensive audit trails.",
    },
    {
      icon: "zap",
      title: "Smart Automation",
      desc: "Intelligent workflow automation for approvals, payroll, and compliance processes.",
    },
    {
      icon: "send",
      title: "Cross-Platform Sharing",
      desc: "Seamlessly share financial data and reports across different devices and team members.",
    },
  ];

  return (
    <View
      className="relative overflow-hidden w-full"
      // ✅ Using COLORS.surface for the main background color
      style={{ backgroundColor: COLORS.neutral}} 
    >
      {/* Subtle pattern layer (using neutral color for opacity effect) */}
      <View
        className="absolute inset-0 bg-transparent"
        style={{ opacity: 0.01 }} 
      />

      {/* ✅ Scrollable Content Container */}
      <ScrollView
        className="w-full"
        contentContainerStyle={{
          paddingVertical: isMobileView ? 60 : 100,
          paddingHorizontal: isMobileView ? 20 : 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="max-w-7xl mx-auto w-full">
          {/* Section Heading */}
          <View className="items-center mb-16">
            <View className="items-center mb-4 relative">
              <Text
                className="text-white text-center font-extrabold mb-3 tracking-[-0.8px]"
                // ✅ Using COLORS.textLight for white text
                style={{
                  color: COLORS.textLight, 
                  fontSize: isMobileView ? 34 : 48,
                  lineHeight: isMobileView ? 40 : 54,
                  textShadowColor: "rgba(255,255,255,0.1)",
                  textShadowOffset: { width: 0, height: 2 },
                  textShadowRadius: 4,
                }}
              >
                Everything your business needs
              </Text>
              <View
                className="w-20 h-1 rounded-[2px]"
                style={{ backgroundColor: COLORS.accent, opacity: 0.8 }}
              />
            </View>
            <Text
              className="text-white/85 text-center max-w-[700px] tracking-[-0.2px]"
              // ✅ Using COLORS.textLight for descriptive text
              style={{
                color: "rgba(248, 249, 250, 0.85)", // textLight with opacity
                fontSize: isMobileView ? 16 : 18,
                lineHeight: isMobileView ? 24 : 28,
              }}
            >
              Advanced tools designed to simplify complex financial operations and
              drive sustainable growth.
            </Text>
          </View>

          {/* Feature Cards */}
          <View
            className={`flex-row flex-wrap justify-center items-stretch gap-8`}
          >
            {features.map((f, index) => (
              <View
                key={f.title}
                className="w-full md:w-[48%] xl:w-[31%] 2xl:w-[23%] flex-grow"
              >
                <View 
                  // ✅ Using COLORS.white for card background
                  className="rounded-[24px] p-8 relative overflow-hidden h-full border shadow-xl"
                  style={{ backgroundColor: COLORS.white, borderColor: "rgba(0,0,0,0.05)" }}
                >
                  {/* Card Border/Shadow Styling */}
                  <View
                    className="absolute inset-0 rounded-[24px] border border-transparent"
                    style={{
                      shadowColor: COLORS.black,
                      shadowOffset: { width: 0, height: 8 },
                      shadowOpacity: 0.08,
                      shadowRadius: 16,
                      elevation: 8,
                    }}
                  />
                  {/* Accent Top Bar */}
                  <View
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-[24px]"
                    style={{ backgroundColor: COLORS.accent, opacity: 0.8 }}
                  />

                  {/* Icon Section */}
                  <View className="w-[70px] h-[70px] rounded-[20px] justify-center items-center mb-6 relative overflow-hidden">
                    <View
                      className="absolute inset-0 rounded-[20px] border"
                      style={{
                        // Accent color for background with opacity
                        backgroundColor: "rgba(134, 194, 50, 0.1)", 
                        borderColor: "rgba(134, 194, 50, 0.2)",
                      }}
                    />
                    <Feather name={f.icon as any} size={28} color={COLORS.accent} />
                    
                    {/* Number Badge */}
                    <View
                      className="absolute top-[-8px] right-[-8px] w-7 h-7 rounded-full justify-center items-center border"
                      style={{
                        backgroundColor: COLORS.accent,
                        borderColor: COLORS.white,
                        shadowColor: COLORS.black,
                        shadowOffset: { width: 0, height: 3 },
                        shadowOpacity: 0.2,
                        shadowRadius: 6,
                        elevation: 4,
                      }}
                    >
                      <Text className="text-white text-xs font-extrabold">
                        {index + 1}
                      </Text>
                    </View>
                  </View>

                  {/* Text Content */}
                  <Text 
                    className="text-[24px] font-extrabold mb-3 tracking-[-0.5px]"
                    // ✅ Using COLORS.textDark for main text
                    style={{ color: COLORS.textDark }} 
                  >
                    {f.title}
                  </Text>
                  <Text 
                    className="text-[16px] leading-[24px] tracking-[-0.2px] mb-6"
                    // ✅ Using COLORS.textDark with opacity for description
                    style={{ color: "rgba(34, 38, 41, 0.75)" }} 
                  >
                    {f.desc}
                  </Text>

                  {/* Footer lines (Minimalist Divider) */}
                  <View
                    className="mt-auto pt-5 border-t gap-2"
                    style={{ borderTopColor: "rgba(34, 38, 41, 0.08)" }} // textDark opacity for divider
                  >
                    <View 
                      className="h-1 rounded-[2px] w-3/5"
                      style={{ backgroundColor: "rgba(34, 38, 41, 0.10)" }} // textDark opacity for line
                    />
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Divider */}
      <View
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{ backgroundColor: "rgba(255,255,255,0.06)" }} // White opacity for divider on dark surface
      />
    </View>
  );
}