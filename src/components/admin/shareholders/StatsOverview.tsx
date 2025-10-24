// src/components/admin/shareholders/StatsOverview.tsx
import React from "react";
import { View, Text } from "react-native";
import { StatsOverviewProps } from "./types";
import { COLORS } from "../../../constants/theme";
import { useCurrency } from "../../feedback/CurrencyProvider";

export default function StatsOverview({
  totalEquity,
  totalInvestment,
  totalProfit,
  totalReturns,
  totalOtherMoney,
  totalShareholders,
}: StatsOverviewProps) {
  const profitAfterExpenses = totalProfit - totalOtherMoney;
  const { format } = useCurrency()

  return (
    <View
      className="rounded-2xl p-4 mb-4"
      style={{ backgroundColor: COLORS.primary }}
    >
      <View className="flex-row justify-between flex-wrap">
        {/* Total Equity */}
        <View className="items-center flex-1 mb-3">
          <Text className="text-white text-sm opacity-90">Total Equity</Text>
          <Text className="text-white text-xl font-bold">
            {totalEquity.toFixed(1)}%
          </Text>
        </View>

        {/* Total Investment */}
        <View className="items-center flex-1 mb-3">
          <Text className="text-white text-sm opacity-90">Total Investment</Text>
          <Text className="text-white text-xl font-bold">
            {format(totalInvestment)}
          </Text>
        </View>

        {/* Total Profit */}
        <View className="items-center flex-1 mb-3">
          <Text className="text-white text-sm opacity-90">Total Profit</Text>
          <Text className="text-white text-xl font-bold">
            {format(totalProfit)}
          </Text>
        </View>

        {/* Total Expenses */}
        <View className="items-center flex-1 mb-3">
          <Text className="text-white text-sm opacity-90">Total Expenses</Text>
          <Text className="text-white text-xl font-bold">
            {format(totalOtherMoney)}
          </Text>
        </View>

        {/* Profit After Expenses */}
        <View className="items-center flex-1 mb-3">
          <Text className="text-white text-sm opacity-90">Profit After Expenses</Text>
          <Text className="text-white text-xl font-bold">
            {format(profitAfterExpenses)}
          </Text>
        </View>

        {/* Shareholders */}
        <View className="items-center flex-1 mb-3">
          <Text className="text-white text-sm opacity-90">Shareholders</Text>
          <Text className="text-white text-xl font-bold">
            {totalShareholders}
          </Text>
        </View>
      </View>

      {/* Profit Distribution Example */}
      <View className="mt-4">
        <Text className="text-white font-semibold mb-1">
          Profit Distribution:
        </Text>
        {totalEquity > 0 ? (
          <Text className="text-white text-sm">
            Each shareholder receives profit proportional to equity.{"\n"}
            Example: If total profit after expenses is {format(profitAfterExpenses)}, 
            shareholder with 25% equity gets {format(profitAfterExpenses * 0.25)}.
          </Text>
        ) : (
          <Text className="text-white text-sm">No shareholders to distribute profit.</Text>
        )}
      </View>
    </View>
  );
}
