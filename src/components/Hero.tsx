import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";
import Button from "../UI/Button"; // ✅ use reusable Button

export default function Hero() {
  const [isMobileView, setIsMobileView] = useState(
    Dimensions.get("window").width < 768
  );
  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get("window").height
  );

  // ✅ Listen to window resizing for web
  useEffect(() => {
    const handleResize = () => {
      const { width, height } = Dimensions.get("window");
      setIsMobileView(width < 768);
      setWindowHeight(height);
    };
    const subscription = Dimensions.addEventListener("change", handleResize);
    return () => {
      if (typeof subscription?.remove === "function") subscription.remove();
    };
  }, []);

  return (
    <View
      className="relative bg-transparent w-full"
      style={{
        minHeight: isMobileView ? windowHeight * 0.9 : windowHeight * 0.85,
      }}
    >
      {/* Background */}
      <View className="absolute inset-0" style={{ backgroundColor: COLORS.neutral }} />
      <View
        className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] rounded-[150px]"
        style={{ backgroundColor: COLORS.accent, opacity: 0.2 }}
      />

      {/* ✅ Scrollable container for mobile */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: isMobileView ? 90 : 110,
          paddingHorizontal: isMobileView ? 20 : 40,
          paddingBottom: isMobileView ? 40 : 60,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          className={`flex-1 ${isMobileView ? "flex-col" : "flex-row"} items-start max-w-[1500px] mx-auto w-full`}
        >
          {/* Left Section */}
          <View className="flex-1 max-w-[720px] z-10">
            {/* Tagline */}
            <View className="mb-4">
              <View
                className="px-4 py-2 rounded-[20px] self-start border relative overflow-hidden"
                style={{
                  backgroundColor: "rgba(134,194,50,0.08)",
                  borderColor: "rgba(134,194,50,0.15)",
                }}
              >
                <Text
                  className="font-bold text-[13px] tracking-[0.5px]"
                  style={{ color: COLORS.accent }}
                >
                  Enterprise Grade
                </Text>
              </View>
            </View>

            {/* Title */}
            <View className="mb-3 relative">
              <Text
                className="font-extrabold tracking-[-0.8px]"
                style={{
                  color: "#FFFFFF",
                  fontSize: isMobileView ? 32 : 48,
                  lineHeight: isMobileView ? 38 : 56,
                  textShadowColor: "rgba(255,255,255,0.1)",
                  textShadowOffset: { width: 0, height: 2 },
                  textShadowRadius: 4,
                }}
              >
                Financial Intelligence{"\n"}
                <Text
                  style={{
                    color: COLORS.accent,
                    textShadowColor: "rgba(134,194,50,0.3)",
                    textShadowOffset: { width: 0, height: 4 },
                    textShadowRadius: 8,
                  }}
                >
                  Reimagined
                </Text>
              </Text>
              <View
                className="absolute bottom-2 left-0 w-[120px] h-1 rounded-[2px]"
                style={{ backgroundColor: COLORS.accent, opacity: 0.3 }}
              />
            </View>

            {/* Subtitle */}
            <Text
              className="max-w-[520px] tracking-[-0.2px]"
              style={{
                color: "rgba(255,255,255,0.85)",
                marginVertical: 12,
                fontSize: isMobileView ? 14 : 18,
                lineHeight: 24,
              }}
            >
              Streamline expense tracking, automate payroll, and unlock
              powerful shareholder insights with a single platform.
            </Text>

            {/* CTA Buttons */}
            <View
              className={`${isMobileView ? "flex-col" : "flex-row"} items-center mt-4 gap-3`}
            >
              {/* ✅ Reusable Accent Button */}
              <Button
                onPress={() => {}}
                className="flex-row items-center justify-center"
                style={{
                  backgroundColor: COLORS.accent,
                  paddingHorizontal: 24,
                  paddingVertical: 14,
                  borderRadius: 14,
                  shadowColor: COLORS.accent,
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.3,
                  shadowRadius: 16,
                  elevation: 8,
                }}
              >
                <Text className="text-white font-extrabold text-base tracking-[-0.2px] mr-2">
                  Start Free Trial
                </Text>
                <Feather name="arrow-right" size={18} color="#fff" />
              </Button>

              {/* Watch Demo */}
              <TouchableOpacity className="flex-row items-center px-5 py-3.5 rounded-[14px] relative overflow-hidden mt-2 md:mt-0">
                <View
                  className="absolute inset-0 border"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.08)",
                    borderColor: "rgba(255,255,255,0.12)",
                  }}
                />
                <Feather name="play-circle" size={20} color={COLORS.accent} />
                <Text
                  className="ml-2 font-semibold text-[15px]"
                  style={{ color: "rgba(255,255,255,0.9)" }}
                >
                  Watch Demo
                </Text>
              </TouchableOpacity>
            </View>

            {/* Stats Section */}
            <View
              className={`${isMobileView ? "flex-col" : "flex-row"} mt-8 gap-4`}
            >
              {[
                { number: "500+", label: "Companies" },
                { number: "$2.1B+", label: "Managed" },
                { number: "99.7%", label: "Uptime" },
              ].map((stat, index) => (
                <View
                  key={index}
                  className="p-4 rounded-[12px] relative overflow-hidden min-w-[120px] mr-6"
                >
                  <View
                    className="absolute inset-0 border rounded-[12px]"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.03)",
                      borderColor: "rgba(255,255,255,0.06)",
                    }}
                  />
                  <Text
                    className="font-extrabold"
                    style={{
                      color: "#FFFFFF",
                      fontSize: isMobileView ? 24 : 28,
                      textShadowColor: "rgba(255,255,255,0.1)",
                      textShadowOffset: { width: 0, height: 1 },
                      textShadowRadius: 2,
                    }}
                  >
                    {stat.number}
                  </Text>
                  <Text
                    className="text-[13px] mt-1 font-medium tracking-[0.3px]"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {stat.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Right Graphic (hidden on mobile) */}
          {!isMobileView && (
            <View className="ml-6 w-[360px] z-10">
              <View className="relative">
                <View
                  className="absolute top-5 left-5 right-[-20px] bottom-[-20px] rounded-[24px]"
                  style={{ backgroundColor: COLORS.accent, opacity: 0.05 }}
                />
                <View
                  className="rounded-[20px] p-4 border overflow-hidden"
                  style={{
                    backgroundColor: "rgba(20,20,22,0.95)",
                    borderColor: "rgba(255,255,255,0.08)",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.3,
                    shadowRadius: 16,
                    elevation: 12,
                  }}
                >
                  <View className="mb-4">
                    <View className="flex-row">
                      <View
                        className="w-3 h-3 rounded-full border mr-2"
                        style={{
                          backgroundColor: "#ef4444",
                          borderColor: "rgba(255,255,255,0.2)",
                        }}
                      />
                      <View
                        className="w-3 h-3 rounded-full border mr-2"
                        style={{
                          backgroundColor: COLORS.accent,
                          borderColor: "rgba(255,255,255,0.2)",
                        }}
                      />
                      <View
                        className="w-3 h-3 rounded-full border"
                        style={{
                          backgroundColor: COLORS.neutral,
                          borderColor: "rgba(255,255,255,0.2)",
                        }}
                      />
                    </View>
                  </View>

                  {/* Simple animated chart mock */}
                  <View className="h-[200px] relative mb-4">
                    <View
                      className="absolute inset-0 bg-transparent border-t border-b"
                      style={{ borderColor: "rgba(255,255,255,0.06)" }}
                    />
                    <View className="flex-row items-end justify-between h-full py-5">
                      {[60, 120, 80, 150, 100].map((height, index) => (
                        <View key={index} className="flex-1 items-center mx-1">
                          <View
                            className="w-4 rounded-[8px] mb-2"
                            style={{
                              height,
                              backgroundColor: COLORS.accent,
                              shadowColor: COLORS.accent,
                              shadowOffset: { width: 0, height: 4 },
                              shadowOpacity: 0.3,
                              shadowRadius: 8,
                              elevation: 6,
                            }}
                          />
                          <View
                            className="w-5 h-1 rounded-[2px]"
                            style={{
                              backgroundColor: "rgba(255,255,255,0.2)",
                            }}
                          />
                        </View>
                      ))}
                    </View>
                  </View>

                  <View
                    className="pt-3 border-t gap-2"
                    style={{ borderTopColor: "rgba(255,255,255,0.06)" }}
                  >
                    <View
                      className="h-1.5 rounded-[3px] w-3/5"
                      style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                    />
                    <View
                      className="h-1.5 rounded-[3px] w-3/5"
                      style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                    />
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
