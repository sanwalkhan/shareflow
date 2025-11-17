import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";

export default function Footer() {
  const [isMobileView, setIsMobileView] = useState(
    Dimensions.get("window").width < 768
  );
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setIsMobileView(window.width < 768);
    });

    return () => subscription?.remove();
  }, []);

  const links = [
    { title: "Product", items: ["Features", "Pricing", "API"] },
    { title: "Company", items: ["About", "Blog", "Careers"] },
    { title: "Support", items: ["Help", "Contact", "Security"] },
  ];

  return (
    <View className="w-full bg-neutral border-t border-white/10">
      
      {/* Main Content - Ultra Compact */}
      <View className="w-full max-w-5xl mx-auto">
        <View 
          className="relative z-10"
          style={{
            paddingVertical: isMobileView ? 24 : 32,
            paddingHorizontal: isMobileView ? 16 : 32,
          }}
        >
          
          {/* Single Row Layout for Mobile */}
          {isMobileView ? (
            <View className="flex-col">
              {/* Brand & Social in one row */}
              <View className="flex-row justify-between items-center mb-4">
                <View className="flex-row items-center">
                  <View className="w-8 h-8 rounded-lg justify-center items-center border border-accent/20 bg-accent/10">
                    <Feather name="trending-up" size={18} color={COLORS.accent} />
                  </View>
                  <Text className="text-lg font-black text-white ml-2">
                    Share<Text className="text-accent">Flow</Text>
                  </Text>
                </View>
                
                {/* Social Links */}
                <View className="flex-row gap-2">
                  {["twitter", "linkedin", "github"].map((icon) => (
                    <TouchableOpacity
                      key={icon}
                      className="w-7 h-7 rounded-lg justify-center items-center border border-white/10 bg-white/5"
                    >
                      <Feather name={icon as any} size={14} color="rgba(255,255,255,0.8)" />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Links in compact grid */}
              <View className="flex-row justify-between mb-4">
                {links.map((section) => (
                  <View key={section.title} className="flex-1 items-start">
                    <Text className="text-white font-bold text-xs mb-2">
                      {section.title}
                    </Text>
                    <View className="gap-1">
                      {section.items.map((link) => (
                        <TouchableOpacity key={link}>
                          <Text className="text-white/60 text-[10px]">
                            {link}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                ))}
              </View>

              {/* Legal & Copyright in one row */}
              <View className="flex-row justify-between items-center pt-3 border-t border-white/10">
                <View className="flex-row gap-3">
                  {["Privacy", "Terms", "Cookies"].map((item) => (
                    <TouchableOpacity key={item}>
                      <Text className="text-white/50 text-[9px]">
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text className="text-white/40 text-[9px]">
                  © {currentYear}
                </Text>
              </View>
            </View>
          ) : (
            /* Desktop Layout */
            <View className="flex-row justify-between items-start">
              
              {/* Brand Section */}
              <View className="max-w-[200px]">
                <View className="flex-row items-center mb-2">
                  <View className="w-8 h-8 rounded-lg justify-center items-center border border-accent/20 bg-accent/10">
                    <Feather name="trending-up" size={18} color={COLORS.accent} />
                  </View>
                  <Text className="text-lg font-black text-white ml-2">
                    Share<Text className="text-accent">Flow</Text>
                  </Text>
                </View>
                <Text className="text-white/60 text-xs leading-4 mb-3">
                  Enterprise financial platform.
                </Text>
                <View className="flex-row gap-2">
                  {["twitter", "linkedin", "github"].map((icon) => (
                    <TouchableOpacity
                      key={icon}
                      className="w-7 h-7 rounded-lg justify-center items-center border border-white/10 bg-white/5"
                    >
                      <Feather name={icon as any} size={14} color="rgba(255,255,255,0.8)" />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Links */}
              <View className="flex-row gap-8">
                {links.map((section) => (
                  <View key={section.title}>
                    <Text className="text-white font-bold text-xs mb-2">
                      {section.title}
                    </Text>
                    <View className="gap-1">
                      {section.items.map((link) => (
                        <TouchableOpacity key={link}>
                          <Text className="text-white/60 text-xs">
                            {link}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                ))}
              </View>

              {/* Legal & Copyright */}
              <View className="items-end">
                <View className="flex-row gap-4 mb-2">
                  {["Privacy", "Terms", "Cookies"].map((item) => (
                    <TouchableOpacity key={item}>
                      <Text className="text-white/50 text-[10px]">
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text className="text-white/40 text-[10px]">
                  © {currentYear} ShareFlow
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}