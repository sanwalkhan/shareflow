import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";

export default function Footer() {
  const [isMobileView, setIsMobileView] = useState(
    Dimensions.get("window").width < 768
  );
  const currentYear = new Date().getFullYear();

  // ✅ Responsive resize listener (for web + native)
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

  const productLinks = ["Features", "Solutions", "Pricing", "API", "Documentation"];
  const companyLinks = ["About", "Careers", "Blog", "Press", "Partners"];
  const supportLinks = ["Help Center", "Contact", "Status", "Security", "Compliance"];

  return (
    <View className="relative bg-transparent overflow-hidden w-full">
      {/* Background */}
      <View className="absolute inset-0" style={{ backgroundColor: "#0A0A0A" }} />
      <View className="absolute inset-0 bg-transparent" style={{ opacity: 0.02 }} />
      <View
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ backgroundColor: COLORS.accent, opacity: 0.1 }}
      />

      {/* Content Wrapper */}
      <View className="max-w-[1500px] mx-auto w-full">
        <View
          className="relative z-10"
          style={{
            paddingVertical: isMobileView ? 48 : 64,
            paddingHorizontal: isMobileView ? 20 : 40,
          }}
        >
          {/* Top Section */}
          <View
            className={`${
              isMobileView ? "flex-col" : "flex-row"
            } justify-between items-start mb-8`}
          >
            {/* Brand Section */}
            <View
              className="flex-1"
              style={{
                marginBottom: isMobileView ? 32 : 0,
                maxWidth: isMobileView ? "100%" : 320,
              }}
            >
              <View className="flex-row items-center mb-4">
                <View
                  className="w-11 h-11 rounded-[12px] justify-center items-center border"
                  style={{
                    backgroundColor: "rgba(134,194,50,0.1)",
                    borderColor: "rgba(134,194,50,0.2)",
                  }}
                >
                  <Feather name="trending-up" size={24} color={COLORS.accent} />
                </View>
                <Text className="text-white text-2xl font-extrabold tracking-[-0.5px] ml-3">
                  Share<Text style={{ color: COLORS.accent }}>Flow</Text>
                </Text>
              </View>
              <Text className="text-white/70 text-[15px] leading-[22px] tracking-[-0.2px] mb-6">
                Enterprise financial intelligence platform powering the world's most
                innovative companies.
              </Text>

              {/* Social Icons */}
              <View className="flex-row gap-3">
                {["twitter", "linkedin", "github"].map((icon) => (
                  <TouchableOpacity
                    key={icon}
                    className="w-10 h-10 rounded-[12px] justify-center items-center border"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      borderColor: "rgba(255,255,255,0.08)",
                    }}
                  >
                    <Feather name={icon as any} size={18} color="rgba(255,255,255,0.8)" />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Links Grid */}
            <View
              className={`${
                isMobileView ? "flex-col" : "flex-row"
              } gap-12 flex-wrap`}
            >
              {[
                { title: "Product", links: productLinks },
                { title: "Company", links: companyLinks },
                { title: "Support", links: supportLinks },
              ].map((section) => (
                <View
                  key={section.title}
                  style={{ minWidth: isMobileView ? "100%" : 160 }}
                >
                  <Text className="text-white font-bold text-base mb-4 tracking-[-0.3px]">
                    {section.title}
                  </Text>
                  {section.links.map((link) => (
                    <TouchableOpacity key={link} className="mb-3 relative">
                      <Text className="text-white/70 text-sm tracking-[-0.2px]">
                        {link}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </View>
          </View>

          {/* Divider */}
          <View className="h-[1px] bg-white/8 mb-6" />

          {/* Bottom Section */}
          <View
            className={`${
              isMobileView ? "flex-col" : "flex-row"
            } justify-between ${isMobileView ? "items-start" : "items-center"}`}
          >
            {/* Legal Links */}
            <View
              className={`${
                isMobileView ? "flex-col" : "flex-row"
              } gap-6 ${isMobileView ? "mb-4" : "mb-0"}`}
            >
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item) => (
                  <TouchableOpacity key={item} className="py-1">
                    <Text className="text-white/60 text-[13px] tracking-[0.2px]">
                      {item}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>

            {/* Copyright */}
            <Text
              className="text-white/50 text-[13px] tracking-[0.2px]"
              style={{ textAlign: isMobileView ? "left" : "center" }}
            >
              © {currentYear} ShareFlow Technologies. All rights reserved.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
