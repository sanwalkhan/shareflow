import React from "react";
import { View, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../../constants/theme";
import { Budget } from "./types";
import { useCurrency } from "../../feedback/CurrencyProvider";

interface BudgetOverviewProps {
  budget: Budget;
  onSetBudget?: () => void;
  isMobile?: boolean;
}

export default function BudgetOverview({ budget, onSetBudget }: BudgetOverviewProps) {
  const { format } = useCurrency();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isSmallMobile = width < 400;

  return (
    <View className={`bg-white rounded-2xl shadow-lg ${isMobile ? 'p-4 mb-4' : 'p-6 mb-6'}`}>
      {/* Header - RESPONSIVE */}
      <View className={`${isMobile ? 'flex-col space-y-3' : 'flex-row justify-between items-center'} mb-4`}>
        <Text className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-gray-800`}>
          Budget Overview
        </Text>
        
        <View className={`${isMobile ? 'flex-row justify-between items-center' : 'flex-row items-center'}`}>
          <View className={`flex-row items-center ${isMobile ? 'flex-1' : ''}`}>
            <Feather name="dollar-sign" size={isMobile ? 16 : 20} color={COLORS.accent} />
            <Text className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-accent ml-2`}>
              {format(budget.remaining)}
            </Text>
            <Text className={`text-gray-500 ${isMobile ? 'text-sm ml-1' : 'ml-2'}`}>
              / {format(budget.total)}
            </Text>
          </View>
          
          {onSetBudget ? (
            <TouchableOpacity 
              className={`${isMobile ? (isSmallMobile ? 'w-full mt-2 px-4 py-2.5' : 'px-3 py-1.5 ml-2') : 'ml-3 px-3 py-1.5'} rounded-lg`} 
              style={{ backgroundColor: COLORS.accent }}
              onPress={onSetBudget}
            >
              <Text className={`text-white font-semibold ${isMobile && isSmallMobile ? 'text-sm text-center' : 'text-xs'}`}>
                Set Budget
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Overall Progress */}
      <View className="mb-6">
        <View className="flex-row justify-between mb-2">
          <Text className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-gray-600`}>
            Overall Usage
          </Text>
          <Text className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-gray-600`}>
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
        <Text className={`${isMobile ? 'text-sm' : 'text-sm'} font-medium text-gray-600 mb-3`}>
          Category Breakdown
        </Text>
        {Object.entries(budget.categories).map(([category, data]) => (
          <View key={category} className="mb-3">
            <View className="flex-row justify-between mb-1">
              <Text className={`${isMobile ? 'text-xs' : 'text-xs'} text-gray-600 capitalize`}>
                {category}
              </Text>
              <Text className={`${isMobile ? 'text-xs' : 'text-xs'} text-gray-600`}>
                {format(data.used)} / {format(data.allocated)}
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