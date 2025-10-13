// src/components/Admin/FinancialCard.tsx
import React from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { formatCurrency } from "../../utils/helper";
import { WINDOW, isMobile } from "../../utils/responsive";

interface FinancialCardProps {
  title: string;
  amount: number;
  change: string;
  changeAmount: number;
  icon: string;
  color: string;
}

export default function FinancialCard({ 
  title, 
  amount, 
  change, 
  changeAmount, 
  icon, 
  color 
}: FinancialCardProps) {
  return (
    <View 
      className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden mb-3 md:mb-4"
      style={{ 
        width: isMobile ? '100%' : WINDOW.width < 1024 ? '48%' : '23%',
        minWidth: isMobile ? '100%' : 240,
      }}
    >
      <View className="p-4 md:p-6">
        <View className="flex-row items-center justify-between mb-3 md:mb-4">
          <View 
            className="w-10 h-10 md:w-12 md:h-12 rounded-xl justify-center items-center"
            style={{ backgroundColor: `${color}20` }}
          >
            <Feather name={icon as any} size={isMobile ? 18 : 20} color={color} />
          </View>
          <View className="flex-row items-center">
            <Feather 
              name={change === 'up' ? 'trending-up' : 'trending-down'} 
              size={12} 
              color={change === 'up' ? '#10B981' : '#EF4444'} 
            />
            <Text 
              className={`text-xs font-semibold ml-1.5 ${
                change === 'up' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {change === 'up' ? '+' : ''}{formatCurrency(Math.abs(changeAmount))}
            </Text>
          </View>
        </View>
        
        <Text className="text-xl md:text-2xl font-extrabold text-gray-900 mb-1">
          {formatCurrency(amount)}
        </Text>
        <Text className="text-sm md:text-base font-semibold mb-2" style={{ color: "#6B7280" }}>
          {title}
        </Text>
        
        <View className="flex-row items-center justify-between">
          <Text className="text-xs font-medium" style={{ color: "#9CA3AF" }}>Last 30 days</Text>
        </View>
      </View>
    </View>
  );
}