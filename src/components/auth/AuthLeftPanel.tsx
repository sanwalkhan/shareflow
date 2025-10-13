import React from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, isMobile } from "../../constants/theme";

export default function AuthLeftPanel() {
  return (
    <View
      className={`flex-1 ${isMobile ? "mb-5" : "mr-5"} rounded-3xl overflow-hidden`}
      style={{
        backgroundColor: COLORS.secondary,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.3,
        shadowRadius: 40,
        elevation: 20,
        borderWidth: 1.5,
        borderColor: "rgba(255, 255, 255, 0.1)",
      }}
    >
      <View className="flex-1 p-8 justify-center">
        <View className="flex-row items-center gap-2 bg-accent/12 px-4 py-2 rounded-full border border-accent/25 mb-8 self-start">
          <Feather name="award" size={20} color={COLORS.accent} />
          <Text className="text-accent text-xs font-bold tracking-wider">
            ENTERPRISE GRADE
          </Text>
        </View>

        <Text className="text-textLight text-4xl font-extrabold leading-[44px] tracking-tight mb-8">
          Join 500+ Companies{"\n"}
          <Text style={{ color: COLORS.accent }}>Managing Finances</Text>{"\n"}
          with Confidence
        </Text>

        <View className="mb-10">
          {[
            "Automated Expense Tracking",
            "Seamless Payroll Management",
            "Real-time Shareholder Insights",
            "Bank-Grade Security",
          ].map((text) => (
            <View key={text} className="flex-row items-center gap-3 mb-4">
              <Feather name="check-circle" size={18} color={COLORS.accent} />
              <Text className="text-textLight text-base font-semibold">{text}</Text>
            </View>
          ))}
        </View>

        <View className="flex-row justify-around">
          {[
            { label: "Uptime", value: "99.7%" },
            { label: "Encryption", value: "256-bit" },
            { label: "Support", value: "24/7" },
          ].map((stat) => (
            <View key={stat.label} className="items-center">
              <Text className="text-accent text-2xl font-extrabold mb-1">
                {stat.value}
              </Text>
              <Text className="text-textLight text-sm font-semibold uppercase tracking-wider">
                {stat.label}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
