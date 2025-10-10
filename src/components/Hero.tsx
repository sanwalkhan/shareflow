// src/components/Hero.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, isMobile, WINDOW } from "../constants/theme";

export default function Hero() {
  return (
    <View className="relative bg-transparent w-full" style={{ minHeight: isMobile ? WINDOW.height * 0.8 : WINDOW.height * 0.15 }}>
      {/* Background Elements */}
      <View className="absolute inset-0" style={{ backgroundColor: COLORS.neutral }} />
      <View className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] rounded-[150px]" style={{ backgroundColor: COLORS.accent }} />
      <View className="absolute inset-0 bg-transparent" />
      
      {/* Content Container with max width */}
      <View className="max-w-[1500px] mx-auto w-full">
        <View className={`flex-1 ${isMobile ? "flex-col" : "flex-row"} items-start`} style={{
          paddingTop: isMobile ? 90 : 110,
          paddingHorizontal: isMobile ? 20 : 40,
          paddingBottom: isMobile ? 40 : 60
        }}>
          <View className="flex-1 max-w-[720px] z-10">
            <View className="mb-4">
              <View className="px-4 py-2 rounded-[20px] self-start border relative overflow-hidden" style={{
                backgroundColor: "rgba(134,194,50,0.08)",
                borderColor: "rgba(134,194,50,0.15)"
              }}>
                <Text className="font-bold text-[13px] tracking-[0.5px]" style={{ color: COLORS.accent }}>Enterprise Grade</Text>
                <View className="absolute top-0 left-0 right-0 h-[1px]" style={{ backgroundColor: "rgba(134,194,50,0.3)" }} />
              </View>
            </View>

            <View className="mb-3 relative">
              <Text className="font-extrabold tracking-[-0.8px]" style={{
                color: '#FFFFFF',
                fontSize: isMobile ? 32 : 48,
                lineHeight: isMobile ? 38 : 56,
                textShadowColor: 'rgba(255,255,255,0.1)',
                textShadowOffset: { width: 0, height: 2 },
                textShadowRadius: 4,
              }}>
                Financial Intelligence{"\n"}
                <Text style={{
                  color: COLORS.accent,
                  textShadowColor: 'rgba(134,194,50,0.3)',
                  textShadowOffset: { width: 0, height: 4 },
                  textShadowRadius: 8,
                }}>
                  Reimagined
                </Text>
              </Text>
              <View className="absolute bottom-2 left-0 w-[120px] h-1 rounded-[2px]" style={{ backgroundColor: COLORS.accent, opacity: 0.3 }} />
            </View>

            <Text className="max-w-[520px] tracking-[-0.2px]" style={{
              color: 'rgba(255,255,255,0.85)',
              marginVertical: 12,
              fontSize: isMobile ? 14 : 18,
              lineHeight: 24,
            }}>
              Streamline expense tracking, automate payroll, and unlock powerful shareholder insights with a single platform.
            </Text>

            <View className={`${isMobile ? "flex-col" : "flex-row"} items-center mt-4 gap-3`}>
              <TouchableOpacity className="flex-row items-center px-6 py-3.5 rounded-[14px] relative overflow-hidden" style={{
                shadowColor: COLORS.accent,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.3,
                shadowRadius: 16,
                elevation: 12,
              }}>
                <View className="absolute inset-0" style={{ backgroundColor: COLORS.accent, opacity: 0.95 }} />
                <Text className="font-extrabold text-base tracking-[-0.2px] mr-2" style={{ color: '#000' }}>Start Free Trial</Text>
                <Feather name="arrow-right" size={18} color="#000" style={{ opacity: 0.9 }} />
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center px-5 py-3.5 rounded-[14px] relative overflow-hidden">
                <View className="absolute inset-0 border" style={{ 
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  borderColor: 'rgba(255,255,255,0.12)'
                }} />
                <Feather name="play-circle" size={20} color={COLORS.accent} />
                <Text className="ml-2 font-semibold text-[15px]" style={{ color: 'rgba(255,255,255,0.9)' }}>Watch Demo</Text>
              </TouchableOpacity>
            </View>

            <View className={`${isMobile ? "flex-col" : "flex-row"} mt-8 gap-4`}>
              {[
                { number: "500+", label: "Companies" },
                { number: "$2.1B+", label: "Managed" },
                { number: "99.7%", label: "Uptime" }
              ].map((stat, index) => (
                <View key={index} className="p-4 rounded-[12px] relative overflow-hidden min-w-[120px] mr-6">
                  <View className="absolute inset-0 border rounded-[12px]" style={{
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    borderColor: 'rgba(255,255,255,0.06)'
                  }} />
                  <Text className="font-extrabold" style={{
                    color: '#FFFFFF',
                    fontSize: isMobile ? 24 : 28,
                    textShadowColor: 'rgba(255,255,255,0.1)',
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: 2,
                  }}>
                    {stat.number}
                  </Text>
                  <Text className="text-[13px] mt-1 font-medium tracking-[0.3px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {stat.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {!isMobile && (
            <View className="ml-6 w-[360px] z-10">
              <View className="relative">
                <View className="absolute top-5 left-5 right-[-20px] bottom-[-20px] rounded-[24px]" style={{ backgroundColor: COLORS.accent, opacity: 0.05 }} />
                <View className="rounded-[20px] p-4 border overflow-hidden" style={{
                  backgroundColor: "rgba(20,20,22,0.95)",
                  borderColor: "rgba(255,255,255,0.08)",
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.3,
                  shadowRadius: 16,
                  elevation: 12,
                }}>
                  <View className="mb-4">
                    <View className="flex-row">
                      <View className="w-3 h-3 rounded-full border mr-2" style={{ backgroundColor: "#ef4444", borderColor: 'rgba(255,255,255,0.2)' }} />
                      <View className="w-3 h-3 rounded-full border mr-2" style={{ backgroundColor: COLORS.accent, borderColor: 'rgba(255,255,255,0.2)' }} />
                      <View className="w-3 h-3 rounded-full border" style={{ backgroundColor: COLORS.neutral, borderColor: 'rgba(255,255,255,0.2)' }} />
                    </View>
                  </View>

                  <View className="h-[200px] relative mb-4">
                    <View className="absolute inset-0 bg-transparent border-t border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }} />
                    <View className="flex-row items-end justify-between h-full py-5">
                      {[60, 120, 80, 150, 100].map((height, index) => (
                        <View key={index} className="flex-1 items-center mx-1">
                          <View className="w-4 rounded-[8px] mb-2" style={{
                            height,
                            backgroundColor: COLORS.accent,
                            shadowColor: COLORS.accent,
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.3,
                            shadowRadius: 8,
                            elevation: 6,
                          }} />
                          <View className="w-5 h-1 rounded-[2px]" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
                        </View>
                      ))}
                    </View>
                  </View>
                  
                  <View className="pt-3 border-t gap-2" style={{ borderTopColor: 'rgba(255,255,255,0.06)' }}>
                    <View className="h-1.5 rounded-[3px] w-3/5" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
                    <View className="h-1.5 rounded-[3px] w-3/5" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}