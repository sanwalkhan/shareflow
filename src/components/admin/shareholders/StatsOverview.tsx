import React from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatsOverviewProps } from "./types";
import { COLORS } from "../../../constants/theme";

export default function StatsOverview({
  totalInvestment, // This should be the sum of ALL investments
  totalProfit,
  totalReturns,
  totalOtherMoney,
  totalShareholders,
}: StatsOverviewProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const profitAfterExpenses = totalProfit - totalOtherMoney;

  // Total equity should always be 100% - it's the total pie that gets divided
  const totalEquity = 100;

  const stats = [
    {
      label: "Total Equity",
      value: `${totalEquity.toFixed(1)}%`, // Always 100%
      color: "#3b82f6",
      icon: "🏢",
    },
    {
      label: "Total Investment",
      value: `$${totalInvestment.toLocaleString()}`,
      color: "#10b981",
      icon: "💼",
    },
    {
      label: "Net Profit",
      value: `$${profitAfterExpenses.toLocaleString()}`,
      color: "#8b5cf6",
      icon: "📈",
    },
    {
      label: "Total Returns",
      value: `$${totalReturns.toLocaleString()}`,
      color: "#f59e0b",
      icon: "💰",
    },
    {
      label: "Shareholders",
      value: totalShareholders.toString(),
      color: "#ef4444",
      icon: "👥",
    },
  ];

  return (
    <View className={`rounded-3xl overflow-hidden ${isMobile ? 'p-4' : 'p-6'}`}>
      <LinearGradient
        colors={['#f8fafc', '#f1f5f9']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-3xl"
      >
        <View className={`${isMobile ? 'p-4' : 'p-6'}`}>
          <Text className="text-lg font-bold text-gray-900 mb-4">
            Financial Overview
          </Text>
          
          <View className={`flex-row flex-wrap justify-between ${isMobile ? '-mx-1' : '-mx-2'}`}>
            {stats.map((stat, index) => (
              <View
                key={stat.label}
                className={`bg-white rounded-2xl shadow-sm ${
                  isMobile 
                    ? 'p-3 mx-1 mb-2 flex-1 min-w-28' 
                    : 'p-4 mx-2 mb-4 flex-1 min-w-32'
                }`}
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.05,
                  shadowRadius: 8,
                }}
              >
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-2xl">{stat.icon}</Text>
                  <View
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: stat.color }}
                  />
                </View>
                <Text className="text-gray-900 font-bold text-lg mb-1">
                  {stat.value}
                </Text>
                <Text className="text-gray-500 text-xs">
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}