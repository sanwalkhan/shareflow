// src/components/Hero.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";
import Button from "../UI/Button";
import { useNavigation } from "@react-navigation/native";

// Assuming you have the hero background image in assets/images/hero-bg.png
const HERO_BG_IMAGE = Platform.OS === 'web' 
  ? require("../assets/images/hero-bg.png") 
  : require("../assets/images/hero-bg.png");

const HEADER_HEIGHT_ESTIMATE = 90; 


export default function Hero() {
  const navigation = useNavigation();
  const [isMobileView, setIsMobileView] = useState(
    Dimensions.get("window").width < 768
  );
  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get("window").height
  );

  // ✅ Listen to window resizing for web/native
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = ({ window }: { window: { width: number, height: number } }) => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setIsMobileView(window.width < 768);
        setWindowHeight(window.height);
      }, 100);
    };

    const subscription = Dimensions.addEventListener("change", handleResize);
    return () => {
      clearTimeout(resizeTimeout);
      if (typeof subscription?.remove === "function") subscription.remove();
    };
  }, []);
  return (
    <View
      className="relative w-full"
      style={{
        minHeight: isMobileView ? windowHeight * 0.9 : 680,
        backgroundColor: COLORS.neutral,
        // ⚠️ IMPORTANT: If your Hero component is placed immediately after a fixed/absolute header,
        // you might need to use a negative top margin here if the header is *not* covering it.
        // However, based on the previous code, the ScrollView padding is the correct place to adjust.
      }}
    >
      {/* 🚀 Background Image Container */}
      <View className="absolute inset-0">
        <Image
          source={HERO_BG_IMAGE}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
            opacity: 0.15,
          }}
        />
      </View>
      
      {/* Background shapes */}
      <View
        className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] rounded-[150px] opacity-20"
        style={{ backgroundColor: COLORS.accent }}
      />
      <View
        className="absolute bottom-[-100px] left-[-100px] w-[200px] h-[200px] rounded-[100px] opacity-10"
        style={{ backgroundColor: COLORS.primary }}
      />
      {/* --- END Background --- */}


      {/* ✅ Main Scrollable Content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: isMobileView ? 'flex-start' : 'center', 
          
          // ⬇️ THE KEY CHANGE: Reduced top padding
          // The old values were (90 or 110) which pushed the content too far down.
          // We are using a lower value to pull the content up, closer to the header's base.
          paddingTop: isMobileView ? 60 : 70, // Reduced from 90/110 to 60/70
          
          paddingHorizontal: isMobileView ? 20 : 40,
          paddingBottom: isMobileView ? 40 : 60,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          className={`flex-1 ${isMobileView ? "flex-col" : "flex-row"} items-center md:h-full max-w-7xl mx-auto w-full`}
        >
          {/* Left Section: Text and CTAs */}
          <View className={`z-10 ${isMobileView ? "w-full" : "md:w-1/2 lg:w-3/5"}`}>
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
                  fontSize: isMobileView ? 38 : 64,
                  lineHeight: isMobileView ? 44 : 72,
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
              className="max-w-[640px] tracking-[-0.2px]"
              style={{
                color: "rgba(255,255,255,0.85)",
                marginVertical: 20,
                fontSize: isMobileView ? 16 : 20,
                lineHeight: isMobileView ? 26 : 32,
              }}
            >
              Streamline expense tracking, automate payroll, and unlock
              powerful shareholder insights with a single platform.
            </Text>

            {/* CTA Buttons */}
            <View
              className={`${isMobileView ? "flex-col w-full" : "flex-row"} items-start mt-6 gap-4`}
            >
              <Button
                onPress={() => navigation.navigate("Auth" as never)}
                className={`flex-row items-center justify-center ${isMobileView ? "w-full" : ""}`}
                style={{
                  backgroundColor: COLORS.accent,
                  paddingHorizontal: 30,
                  paddingVertical: 16,
                  borderRadius: 16,
                  shadowColor: COLORS.accent,
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.4,
                  shadowRadius: 20,
                  elevation: 10,
                }}
              >
                <Text className="text-lg tracking-[-0.2px] mr-2"
                style={{color: COLORS.white}}
                >
                  Start Free Trial
                </Text>
                <Feather name="arrow-right" size={20} color={COLORS.white} />
              </Button>

              <TouchableOpacity 
                className={`flex-row items-center px-6 py-4 rounded-[16px] relative overflow-hidden ${isMobileView ? "w-full" : ""}`}
                style={{ marginLeft: isMobileView ? 0 : 12, marginTop: isMobileView ? 12 : 0 }}
              >
                <View
                  className="absolute inset-0 border"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.08)",
                    borderColor: "rgba(255,255,255,0.12)",
                  }}
                />
                <Feather name="play-circle" size={20} color={COLORS.accent} />
                <Text
                  className="ml-3 font-semibold text-[16px]"
                  style={{ color: "rgba(255,255,255,0.9)" }}
                >
                  Watch Demo
                </Text>
              </TouchableOpacity>
            </View>

            {/* Stats Section */}
            <View
              className={`flex-wrap mt-10 gap-x-8 gap-y-4 ${isMobileView ? "flex-row justify-between" : "flex-row"}`}
            >
              {[
                { number: "500+", label: "Companies" },
                { number: "$2.1B+", label: "Managed" },
                { number: "99.7%", label: "Uptime" },
              ].map((stat, index) => (
                <View
                  key={index}
                  className={`p-4 rounded-[12px] relative overflow-hidden min-w-[120px] ${isMobileView ? "w-[48%]" : ""}`}
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
                      fontSize: isMobileView ? 28 : 32,
                      textShadowColor: "rgba(255,255,255,0.1)",
                      textShadowOffset: { width: 0, height: 1 },
                      textShadowRadius: 2,
                    }}
                  >
                    {stat.number}
                  </Text>
                  <Text
                    className="text-[14px] mt-1 font-medium tracking-[0.3px]"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {stat.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Right Graphic (Image/Mockup) */}
          {!isMobileView && (
            <View className="flex-1 ml-10 w-full md:w-1/2 lg:w-2/5 flex-row justify-end z-10">
              <View className="relative max-w-[450px]">
                {/* Mockup shadow/border effect */}
                <View
                  className="absolute top-5 left-5 right-[-20px] bottom-[-20px] rounded-[24px]"
                  style={{ backgroundColor: COLORS.accent, opacity: 0.08 }}
                />
                <View
                  className="rounded-[24px] p-6 border overflow-hidden"
                  style={{
                    backgroundColor: "rgba(20,20,22,0.95)",
                    borderColor: "rgba(255,255,255,0.08)",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 12 },
                    shadowOpacity: 0.5,
                    shadowRadius: 24,
                    elevation: 18,
                  }}
                >
                  <View className="mb-6">
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
                  <View className="h-[250px] relative mb-6">
                    <View
                      className="absolute inset-0 bg-transparent border-t border-b"
                      style={{ borderColor: "rgba(255,255,255,0.06)" }}
                    />
                    <View className="flex-row items-end justify-between h-full py-6">
                      {[60, 120, 80, 150, 100].map((height, index) => (
                        <View key={index} className="flex-1 items-center mx-2">
                          <View
                            className="w-5 rounded-[10px] mb-3"
                            style={{
                              height,
                              backgroundColor: COLORS.accent,
                              shadowColor: COLORS.accent,
                              shadowOffset: { width: 0, height: 4 },
                              shadowOpacity: 0.4,
                              shadowRadius: 10,
                              elevation: 8,
                            }}
                          />
                          <View
                            className="w-6 h-1 rounded-[3px]"
                            style={{
                              backgroundColor: "rgba(255,255,255,0.2)",
                            }}
                          />
                        </View>
                      ))}
                    </View>
                  </View>

                  {/* Mock content below chart */}
                  <View
                    className="pt-4 border-t gap-3"
                    style={{ borderTopColor: "rgba(255,255,255,0.06)" }}
                  >
                    <View
                      className="h-2 rounded-[4px] w-4/5"
                      style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                    />
                    <View
                      className="h-2 rounded-[4px] w-3/5"
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