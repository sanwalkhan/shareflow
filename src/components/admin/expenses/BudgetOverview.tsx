import React from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../../constants/theme";
import { Budget } from "./types";

interface BudgetOverviewProps {
  budget: Budget;
}

export default function BudgetOverview({ budget }: BudgetOverviewProps) {
  return (
    <View className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold text-gray-800">Budget Overview</Text>
        <View className="flex-row items-center">
          <Feather name="dollar-sign" size={20} color={COLORS.accent} />
          <Text className="text-lg font-semibold text-accent ml-2">
            ${budget.remaining.toLocaleString()}
          </Text>
          <Text className="text-gray-500 ml-2">/ ${budget.total.toLocaleString()}</Text>
        </View>
      </View>

      {/* Overall Progress */}
      <View className="mb-6">
        <View className="flex-row justify-between mb-2">
          <Text className="text-sm font-medium text-gray-600">Overall Usage</Text>
          <Text className="text-sm font-medium text-gray-600">
            {((budget.used / budget.total) * 100).toFixed(1)}%
          </Text>
        </View>
        <View className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <View
            className="h-full rounded-full"
            style={{
              width: `${(budget.used / budget.total) * 100}%`,
              backgroundColor:
                budget.used / budget.total > 0.8 ? COLORS.error : COLORS.accent,
            }}
          />
        </View>
      </View>

      {/* Category Breakdown */}
      <View>
        <Text className="text-sm font-medium text-gray-600 mb-3">
          Category Breakdown
        </Text>
        {Object.entries(budget.categories).map(([category, data]) => (
          <View key={category} className="mb-3">
            <View className="flex-row justify-between mb-1">
              <Text className="text-xs text-gray-600">{category}</Text>
              <Text className="text-xs text-gray-600">
                ${data.used.toLocaleString()} / ${data.allocated.toLocaleString()}
              </Text>
            </View>
            <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <View
                className="h-full rounded-full"
                style={{
                  width: `${(data.used / data.allocated) * 100}%`,
                  backgroundColor:
                    data.used / data.allocated > 0.9
                      ? COLORS.error
                      : data.used / data.allocated > 0.7
                      ? COLORS.warning
                      : COLORS.success,
                }}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
