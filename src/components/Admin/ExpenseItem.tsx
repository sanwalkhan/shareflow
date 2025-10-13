// src/components/Admin/ExpenseItem.tsx
import React from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { formatCurrency } from "../../utils/helper";

interface ExpenseItemProps {
  expense: {
    id: number;
    category: string;
    amount: number;
    percentage: number;
    trend: string;
    color: string;
  };
}

export default function ExpenseItem({ expense }: ExpenseItemProps) {
  return (
    <View className="flex-row items-center justify-between py-2.5 md:py-3 border-b border-gray-50">
      <View className="flex-row items-center flex-1">
        <View 
          className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full mr-2 md:mr-3"
          style={{ backgroundColor: expense.color }}
        />
        <View className="flex-1">
          <Text className="text-xs md:text-sm font-semibold mb-0.5 text-gray-900">
            {expense.category}
          </Text>
          <Text className="text-xs font-medium text-gray-500">
            {expense.percentage}% of total
          </Text>
        </View>
      </View>
      <View className="flex-row items-center">
        <Text className="text-xs md:text-sm font-semibold mr-1.5 md:mr-2 text-gray-900">
          {formatCurrency(expense.amount)}
        </Text>
        <Feather 
          name={expense.trend === 'up' ? 'trending-up' : expense.trend === 'down' ? 'trending-down' : 'minus'}
          size={12} 
          color={expense.trend === 'up' ? '#10B981' : expense.trend === 'down' ? '#EF4444' : '#6B7280'} 
        />
      </View>
    </View>
  );
}