import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";

export default function Features() {
  const [isMobileView, setIsMobileView] = useState(
    Dimensions.get("window").width < 768
  );

  // ✅ Live responsiveness (web resize)
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
  ];

  return (
    <View className="relative bg-transparent overflow-hidden w-full">
      {/* Background Layers */}
      <View
        className="absolute inset-0"
        style={{ backgroundColor: COLORS.primary }}
      />
      <View
        className="absolute top-0 left-0 right-0 h-[160px]"
        style={{ backgroundColor: "#0A0A0A" }}
      />
      <View
        className="absolute inset-0 bg-transparent"
        style={{ opacity: 0.02 }}
      />

      {/* ✅ Scrollable for mobile */}
      <ScrollView
        className="w-full"
        contentContainerStyle={{
          paddingVertical: isMobileView ? 60 : 80,
          paddingHorizontal: isMobileView ? 20 : 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Section Heading */}
        <View className="items-center mb-16">
          <View className="items-center mb-4 relative">
            <Text
              className="text-white text-center font-extrabold mb-3 tracking-[-0.8px]"
              style={{
                fontSize: isMobileView ? 30 : 42,
                lineHeight: isMobileView ? 36 : 48,
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
            className="text-white/85 text-center max-w-[600px] tracking-[-0.2px]"
            style={{
              fontSize: isMobileView ? 16 : 18,
              lineHeight: isMobileView ? 22 : 26,
            }}
          >
            Advanced tools designed to simplify complex financial operations and
            drive sustainable growth.
          </Text>
        </View>

        {/* Feature Cards */}
        <View
          className={`flex-wrap justify-center items-stretch ${
            isMobileView ? "flex-col" : "flex-row"
          } gap-8`}
        >
          {features.map((f, index) => (
            <View
              key={f.title}
              className="flex-1"
              style={{
                maxWidth: isMobileView ? "100%" : 380,
                minWidth: isMobileView ? "100%" : 300,
              }}
            >
              <View className="bg-transparent rounded-[24px] p-8 relative overflow-hidden h-full">
                {/* Card Background */}
                <View
                  className="absolute inset-0 rounded-[24px] border"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "rgba(255,255,255,0.8)",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.05,
                    shadowRadius: 12,
                  }}
                />
                <View
                  className="absolute top-[-1px] left-[-1px] right-[-1px] h-1 rounded-t-[24px]"
                  style={{ backgroundColor: COLORS.accent, opacity: 0.1 }}
                />
                <View
                  className="absolute top-0 left-0 w-1.5 h-full rounded-l-[24px]"
                  style={{ backgroundColor: COLORS.accent, opacity: 0.1 }}
                />

                {/* Icon Section */}
                <View className="w-[70px] h-[70px] rounded-[20px] justify-center items-center mb-6 relative overflow-hidden">
                  <View
                    className="absolute inset-0 rounded-[20px] border"
                    style={{
                      backgroundColor: "rgba(134,194,50,0.08)",
                      borderColor: "rgba(134,194,50,0.12)",
                    }}
                  />
                  <Feather name={f.icon as any} size={26} color={COLORS.accent} />
                  <View
                    className="absolute top-[-6px] right-[-6px] w-6 h-6 rounded-full justify-center items-center"
                    style={{
                      backgroundColor: COLORS.accent,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      elevation: 3,
                    }}
                  >
                    <Text className="text-black text-xs font-extrabold">
                      {index + 1}
                    </Text>
                  </View>
                </View>

                {/* Text Content */}
                <Text className="text-[#0A0A0A] text-[22px] font-extrabold mb-3 tracking-[-0.5px]">
                  {f.title}
                </Text>
                <Text className="text-[#0A0A0A]/75 text-[15px] leading-[22px] tracking-[-0.2px] mb-5">
                  {f.desc}
                </Text>

                {/* Footer lines */}
                <View
                  className="mt-auto pt-5 border-t gap-2"
                  style={{ borderTopColor: "rgba(10,10,10,0.08)" }}
                >
                  <View className="h-1 bg-[#0A0A0A]/6 rounded-[2px] w-2/5" />
                  <View className="h-1 bg-[#0A0A0A]/6 rounded-[2px] w-2/5" />
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Divider */}
      <View
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{ backgroundColor: "rgba(10,10,10,0.04)" }}
      />
    </View>
  );
}
