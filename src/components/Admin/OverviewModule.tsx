// src/components/Admin/OverviewModule.tsx
import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import FinancialCard from "./FinancialCard";
import ExpenseItem from "./ExpenseItem";
import TransactionItem from "./TransactionItem";
import { COLORS, WINDOW, isMobile } from "../../utils/responsive";

interface OverviewModuleProps {
  data: any;
}

export default function OverviewModule({ data }: OverviewModuleProps) {
  return (
    <ScrollView 
      className="flex-1"
      contentContainerStyle={{ 
        padding: isMobile ? 12 : 24, 
        paddingBottom: isMobile ? 60 : 80 
      }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View>
        {/* Welcome & Quick Stats */}
        <View className={`${isMobile ? 'flex-col' : 'flex-row'} items-start justify-between mb-6 md:mb-8`}>
          <View className="flex-1 mb-4 md:mb-0">
            <Text className="text-xl md:text-2xl font-extrabold mb-1 md:mb-2" style={{ color: COLORS.textDark }}>
              Welcome back, Sarah! 👋
            </Text>
            <Text className="text-sm md:text-base font-medium" style={{ color: COLORS.tertiary }}>
              Here's what's happening with {data.company.name} today.
            </Text>
          </View>
          <View className={`${isMobile ? 'flex-col w-full' : 'flex-row'}`} style={{ gap: isMobile ? 8 : 12 }}>
            <TouchableOpacity 
              className="flex-row items-center justify-center px-4 md:px-5 py-2.5 md:py-3 rounded-xl shadow-lg"
              style={{ backgroundColor: COLORS.accent, shadowColor: COLORS.accent, shadowOpacity: 0.3 }}
            >
              <Feather name="plus" size={16} color={COLORS.white} />
              <Text className="text-sm font-semibold ml-2" style={{ color: COLORS.white }}>Add Expense</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="flex-row items-center justify-center px-4 md:px-5 py-2.5 md:py-3 rounded-xl border"
              style={{ backgroundColor: COLORS.white, borderColor: "#e5e7eb" }}
            >
              <Feather name="bar-chart" size={16} color={COLORS.accent} />
              <Text className="text-sm font-semibold ml-2" style={{ color: COLORS.accent }}>Generate Report</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Financial Overview Cards */}
        <View 
          className={`${isMobile ? 'flex-col' : 'flex-row flex-wrap'} mb-6 md:mb-8`}
          style={{ gap: isMobile ? 0 : 16 }}
        >
          <FinancialCard
            title="Total Revenue"
            amount={data.financials.revenue.current}
            change={data.financials.revenue.trend}
            changeAmount={data.financials.revenue.current - data.financials.revenue.previous}
            icon="trending-up"
            color="#10B981"
          />
          <FinancialCard
            title="Operating Expenses"
            amount={data.financials.expenses.current}
            change={data.financials.expenses.trend}
            changeAmount={data.financials.expenses.current - data.financials.expenses.previous}
            icon="trending-down"
            color="#EF4444"
          />
          <FinancialCard
            title="Net Profit"
            amount={data.financials.profit.current}
            change={data.financials.profit.trend}
            changeAmount={data.financials.profit.current - data.financials.profit.previous}
            icon="dollar-sign"
            color="#8B5CF6"
          />
          <FinancialCard
            title="Cash Flow"
            amount={data.financials.cashFlow.current}
            change={data.financials.cashFlow.trend}
            changeAmount={data.financials.cashFlow.current - data.financials.cashFlow.previous}
            icon="refresh-cw"
            color="#06B6D4"
          />
        </View>

        {/* Charts & Analytics Row */}
        <View className={`${isMobile ? 'flex-col' : 'flex-row'} mb-6 md:mb-8`} style={{ gap: isMobile ? 16 : 24 }}>
          <View 
            className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border mb-4 md:mb-0"
            style={{ 
              borderColor: "#f3f4f6",
              flex: isMobile ? 1 : 2
            }}
          >
            <View className="flex-row items-center justify-between mb-4 md:mb-5">
              <Text className="text-base md:text-lg font-bold" style={{ color: COLORS.textDark }}>Revenue Trend</Text>
              <TouchableOpacity>
                <Text className="text-xs md:text-sm font-semibold" style={{ color: COLORS.accent }}>View Report →</Text>
              </TouchableOpacity>
            </View>
            <View style={{ height: isMobile ? 150 : 200, justifyContent: 'space-between' }}>
              {/* Simulated chart with bars */}
              <View className="flex-1 flex-row items-end justify-between px-2 md:px-5">
                {[60, 80, 45, 90, 75, 95, 70].map((height, index) => (
                  <View 
                    key={index} 
                    className="w-6 md:w-7 rounded-lg mx-0.5 md:mx-1"
                    style={{ height: `${height}%`, backgroundColor: COLORS.accent }}
                  />
                ))}
              </View>
              <View className="flex-row justify-between px-2 md:px-5 mt-2 md:mt-3">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((label, index) => (
                  <Text key={index} className="text-xs font-medium" style={{ color: COLORS.tertiary }}>{label}</Text>
                ))}
              </View>
            </View>
          </View>

          <View 
            className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border flex-1"
            style={{ borderColor: "#f3f4f6" }}
          >
            <View className="flex-row items-center justify-between mb-4 md:mb-5">
              <Text className="text-base md:text-lg font-bold" style={{ color: COLORS.textDark }}>Expense Breakdown</Text>
              <Text className="text-sm md:text-base font-bold" style={{ color: COLORS.accent }}>
                ${(data.financials.expenses.current / 1000).toFixed(0)}K
              </Text>
            </View>
            {data.expenses.map((expense: any) => (
              <ExpenseItem key={expense.id} expense={expense} />
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View 
          className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border"
          style={{ borderColor: "#f3f4f6" }}
        >
          <View className="flex-row items-center justify-between mb-4 md:mb-5">
            <Text className="text-base md:text-lg font-bold" style={{ color: COLORS.textDark }}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text className="text-xs md:text-sm font-semibold" style={{ color: COLORS.accent }}>View All →</Text>
            </TouchableOpacity>
          </View>
          {data.recentTransactions.map((transaction: any) => (
            <TransactionItem key={transaction.id}  {...transaction} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}