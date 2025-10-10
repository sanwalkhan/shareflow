// src/components/Footer.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, isMobile } from "../constants/theme";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const productLinks = ["Features", "Solutions", "Pricing", "API", "Documentation"];
  const companyLinks = ["About", "Careers", "Blog", "Press", "Partners"];
  const supportLinks = ["Help Center", "Contact", "Status", "Security", "Compliance"];

  return (
    <View className="relative bg-transparent overflow-hidden w-full max-w-[1500px] mx-auto">
      {/* Background Elements */}
      <View className="absolute inset-0" style={{ backgroundColor: '#0A0A0A' }} />
      <View className="absolute inset-0 bg-transparent" style={{ opacity: 0.02 }} />
      <View className="absolute top-0 left-0 right-0 h-[1px]" style={{ backgroundColor: COLORS.accent, opacity: 0.1 }} />
      
      <View 
        className="relative z-10"
        style={{
          paddingVertical: isMobile ? 48 : 64,
          paddingHorizontal: isMobile ? 20 : 40
        }}
      >
        {/* Main Footer Content */}
        <View className={`${isMobile ? "flex-col" : "flex-row"} justify-between items-start mb-8`}>
          {/* Brand Section */}
          <View 
            className="flex-1"
            style={{
              marginBottom: isMobile ? 32 : 0,
              maxWidth: isMobile ? '100%' : 320
            }}
          >
            <View className="flex-row items-center mb-4">
              <View 
                className="w-11 h-11 rounded-[12px] justify-center items-center border"
                style={{
                  backgroundColor: 'rgba(134,194,50,0.1)',
                  borderColor: 'rgba(134,194,50,0.2)',
                }}
              >
                <Feather name="trending-up" size={24} color={COLORS.accent} />
              </View>
              <Text className="text-white text-2xl font-extrabold tracking-[-0.5px] ml-3">
                Share<Text style={{ color: COLORS.accent }}>Flow</Text>
              </Text>
            </View>
            <Text className="text-white/70 text-[15px] leading-[22px] tracking-[-0.2px] mb-6">
              Enterprise financial intelligence platform powering the world's most innovative companies.
            </Text>
            
            {/* Social Links */}
            <View className="flex-row gap-3">
              <TouchableOpacity 
                className="w-10 h-10 rounded-[12px] justify-center items-center border"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderColor: 'rgba(255,255,255,0.08)',
                }}
              >
                <Feather name="twitter" size={18} color="rgba(255,255,255,0.8)" />
              </TouchableOpacity>
              <TouchableOpacity 
                className="w-10 h-10 rounded-[12px] justify-center items-center border"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderColor: 'rgba(255,255,255,0.08)',
                }}
              >
                <Feather name="linkedin" size={18} color="rgba(255,255,255,0.8)" />
              </TouchableOpacity>
              <TouchableOpacity 
                className="w-10 h-10 rounded-[12px] justify-center items-center border"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderColor: 'rgba(255,255,255,0.08)',
                }}
              >
                <Feather name="github" size={18} color="rgba(255,255,255,0.8)" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Links Grid */}
          <View className={`${isMobile ? "flex-col" : "flex-row"} gap-12`}>
            <View style={{ minWidth: isMobile ? '100%' : 160 }}>
              <Text className="text-white font-bold text-base mb-4 tracking-[-0.3px]">Product</Text>
              {productLinks.map((link) => (
                <TouchableOpacity key={link} className="mb-3 relative">
                  <Text className="text-white/70 text-sm tracking-[-0.2px]">{link}</Text>
                  <View className="absolute bottom-[-2px] left-0 w-0 h-[1px]" style={{ backgroundColor: COLORS.accent, opacity: 0 }} />
                </TouchableOpacity>
              ))}
            </View>

            <View style={{ minWidth: isMobile ? '100%' : 160 }}>
              <Text className="text-white font-bold text-base mb-4 tracking-[-0.3px]">Company</Text>
              {companyLinks.map((link) => (
                <TouchableOpacity key={link} className="mb-3 relative">
                  <Text className="text-white/70 text-sm tracking-[-0.2px]">{link}</Text>
                  <View className="absolute bottom-[-2px] left-0 w-0 h-[1px]" style={{ backgroundColor: COLORS.accent, opacity: 0 }} />
                </TouchableOpacity>
              ))}
            </View>

            <View style={{ minWidth: isMobile ? '100%' : 160 }}>
              <Text className="text-white font-bold text-base mb-4 tracking-[-0.3px]">Support</Text>
              {supportLinks.map((link) => (
                <TouchableOpacity key={link} className="mb-3 relative">
                  <Text className="text-white/70 text-sm tracking-[-0.2px]">{link}</Text>
                  <View className="absolute bottom-[-2px] left-0 w-0 h-[1px]" style={{ backgroundColor: COLORS.accent, opacity: 0 }} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Divider */}
        <View className="h-[1px] bg-white/8 mb-6" />

        {/* Bottom Section */}
        <View className={`${isMobile ? "flex-col" : "flex-row"} justify-between ${isMobile ? "items-start" : "items-center"}`}>
          <View className={`${isMobile ? "flex-col" : "flex-row"} gap-6 ${isMobile ? "mb-4" : "mb-0"}`}>
            <TouchableOpacity className="py-1">
              <Text className="text-white/60 text-[13px] tracking-[0.2px]">Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity className="py-1">
              <Text className="text-white/60 text-[13px] tracking-[0.2px]">Terms of Service</Text>
            </TouchableOpacity>
            <TouchableOpacity className="py-1">
              <Text className="text-white/60 text-[13px] tracking-[0.2px]">Cookie Policy</Text>
            </TouchableOpacity>
          </View>

          <Text 
            className="text-white/50 text-[13px] tracking-[0.2px]"
            style={{ textAlign: isMobile ? "left" : "center" }}
          >
            © {currentYear} ShareFlow Technologies. All rights reserved.
          </Text>
        </View>
      </View>
    </View>
  );
}