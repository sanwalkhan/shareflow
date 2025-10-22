import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  Animated,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, WINDOW } from "../../constants/theme";

interface OverviewProps {
  data?: {
    shareholder: {
      name: string;
      company: string;
      equity: number; // percent
      totalInvestment: number;
      dividendsReceived: number;
      roi: number; // percent
    };
  };
}

export default function ShareholderOverview({ data }: OverviewProps) {
  const s = data?.shareholder;
  const totalInvestment = s?.totalInvestment ?? 0;
  const equity = s?.equity ?? 0;
  const dividends = s?.dividendsReceived ?? 0;
  const roi = s?.roi ?? 0;

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  // ──────────────────────────────
  // 🌐 WEB VERSION
  // ──────────────────────────────
  if (Platform.OS === "web") {
    return (
      <View className="flex flex-col h-screen bg-gray-50 overflow-hidden">
        <ScrollView className="flex-1 overflow-y-auto overflow-x-hidden web-scroll">
          <Animated.View
            style={{
              minHeight: WINDOW.height,
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            {/* Header */}
            <View
              style={{ backgroundColor: COLORS.white }}
              className="px-6 pt-6 pb-4 border-b border-gray-200 shadow-sm"
            >
              <Text className="text-3xl font-bold text-gray-900 mb-1">
                Shareholder Overview
              </Text>
              <Text className="text-gray-500 text-base">
                Track your investments, equity, and performance summary
              </Text>
            </View>

            {/* Content */}
            <View className="px-6 pt-6 pb-10">
              {/* Summary Cards */}
              <View className="flex-row flex-wrap justify-between mb-6">
                <View className="bg-white rounded-2xl p-4 mb-3 w-[48%] shadow-sm border border-gray-100">
                  <Text className="text-gray-500 text-sm">Total Investment</Text>
                  <Text className="text-green-700 text-2xl font-bold mt-2">
                    ${totalInvestment.toLocaleString()}
                  </Text>
                  <Text className="text-gray-400 text-xs mt-1">
                    Across all active holdings
                  </Text>
                </View>

                <View className="bg-white rounded-2xl p-4 mb-3 w-[48%] shadow-sm border border-gray-100">
                  <Text className="text-gray-500 text-sm">Equity</Text>
                  <Text className="text-yellow-700 text-2xl font-bold mt-2">
                    {equity}%
                  </Text>
                  <Text className="text-gray-400 text-xs mt-1">
                    Ownership percentage
                  </Text>
                </View>

                <View className="bg-white rounded-2xl p-4 mb-3 w-[48%] shadow-sm border border-gray-100">
                  <Text className="text-gray-500 text-sm">Dividends Received</Text>
                  <Text className="text-green-700 text-2xl font-bold mt-2">
                    ${dividends.toLocaleString()}
                  </Text>
                  <Text className="text-gray-400 text-xs mt-1">
                    Total payouts to date
                  </Text>
                </View>

                <View className="bg-white rounded-2xl p-4 mb-3 w-[48%] shadow-sm border border-gray-100">
                  <Text className="text-gray-500 text-sm">Average ROI</Text>
                  <Text className="text-yellow-700 text-2xl font-bold mt-2">
                    {roi}%
                  </Text>
                  <Text className="text-gray-400 text-xs mt-1">
                    Weighted across investments
                  </Text>
                </View>
              </View>

              {/* Quick Actions */}
              <View className="flex-row items-center justify-between mb-6">
                <TouchableOpacity
                  className="flex-row items-center bg-green-600 px-4 py-2 rounded-xl"
                >
                  <Feather name="plus-circle" size={18} color="#fff" />
                  <Text className="text-white font-semibold ml-2">
                    Request Investment
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-row items-center bg-white px-4 py-2 rounded-xl border border-gray-200"
                >
                  <Feather name="download" size={18} color="#374151" />
                  <Text className="text-gray-700 ml-2 font-medium">
                    Download Report
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Summary Box */}
              <View className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <Text className="text-gray-800 font-semibold mb-2">
                  Account Summary
                </Text>
                <Text className="text-gray-600 text-sm leading-5">
                  {s
                    ? `Hello ${s.name}, you currently hold ${equity}% equity in ${s.company}. Your total investment amounts to $${totalInvestment.toLocaleString()}, and you’ve received $${dividends.toLocaleString()} in dividends. Your current average ROI stands at ${roi}%.`
                    : "No shareholder data available."}
                </Text>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </View>
    );
  }

  // ──────────────────────────────
  // 📱 NATIVE VERSION
  // ──────────────────────────────
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={{
            minHeight: WINDOW.height,
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <Text className="text-2xl font-bold text-gray-900 mb-4">Overview</Text>

          {/* Summary Cards */}
          <View className="flex-row flex-wrap justify-between mb-6">
            <View className="bg-white rounded-2xl p-4 mb-3 w-[48%] shadow-sm border border-gray-100">
              <Text className="text-gray-500 text-sm">Total Investment</Text>
              <Text className="text-green-700 text-2xl font-bold mt-2">
                ${totalInvestment.toLocaleString()}
              </Text>
              <Text className="text-gray-400 text-xs mt-1">
                Across all active holdings
              </Text>
            </View>

            <View className="bg-white rounded-2xl p-4 mb-3 w-[48%] shadow-sm border border-gray-100">
              <Text className="text-gray-500 text-sm">Equity</Text>
              <Text className="text-yellow-700 text-2xl font-bold mt-2">
                {equity}%
              </Text>
              <Text className="text-gray-400 text-xs mt-1">
                Ownership percentage
              </Text>
            </View>

            <View className="bg-white rounded-2xl p-4 mb-3 w-[48%] shadow-sm border border-gray-100">
              <Text className="text-gray-500 text-sm">Dividends Received</Text>
              <Text className="text-green-700 text-2xl font-bold mt-2">
                ${dividends.toLocaleString()}
              </Text>
              <Text className="text-gray-400 text-xs mt-1">
                Total payouts to date
              </Text>
            </View>

            <View className="bg-white rounded-2xl p-4 mb-3 w-[48%] shadow-sm border border-gray-100">
              <Text className="text-gray-500 text-sm">Average ROI</Text>
              <Text className="text-yellow-700 text-2xl font-bold mt-2">
                {roi}%
              </Text>
              <Text className="text-gray-400 text-xs mt-1">
                Weighted across investments
              </Text>
            </View>
          </View>

          {/* Actions */}
          <View className="flex-row items-center justify-between mb-6">
            <TouchableOpacity className="flex-row items-center bg-green-600 px-4 py-2 rounded-xl">
              <Feather name="plus-circle" size={18} color="#fff" />
              <Text className="text-white font-semibold ml-2">
                Request Investment
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center bg-white px-4 py-2 rounded-xl border border-gray-200">
              <Feather name="download" size={18} color="#374151" />
              <Text className="text-gray-700 ml-2 font-medium">
                Download Report
              </Text>
            </TouchableOpacity>
          </View>

          {/* Summary */}
          <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <Text className="text-gray-800 font-semibold mb-2">
              Account Summary
            </Text>
            <Text className="text-gray-600 text-sm leading-5">
              {s
                ? `Hello ${s.name}, you currently hold ${equity}% equity in ${s.company}. Your total investment amounts to $${totalInvestment.toLocaleString()}, and you’ve received $${dividends.toLocaleString()} in dividends. Your current average ROI stands at ${roi}%.`
                : "No shareholder data available."}
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
