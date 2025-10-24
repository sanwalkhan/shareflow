// src/screens/ShareholderOverview.tsx
import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  Animated,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, WINDOW } from "../../constants/theme";

export default function ShareholderOverview() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  // 🧠 Replace with real JWT later (from login/AsyncStorage)
  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZjliM2QzMTgzMWM5NTkxOTQ2ZGI5ZCIsImVtYWlsIjoic2FtNThtYWxpa0BnbWFpbC5jb20iLCJyb2xlIjoic2hhcmVob2xkZXIiLCJpYXQiOjE3NjEyODcxMjAsImV4cCI6MTc2Mzg3OTEyMH0._9aQbMF6aAsB4Px-1Ftpjz3qAqorzkWd3P1dMbWi_hE";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://shareflow-backend-production.up.railway.app/api/investment-requests/dashboard",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        const json = await res.json();
        setData(json.data);
      } catch (err) {
        console.error("❌ Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // 🎞️ Animations
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  if (loading)
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color={COLORS.accent} />
        <Text className="text-gray-500 mt-3">Loading dashboard...</Text>
      </View>
    );

  if (!data)
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <Text className="text-gray-500">No data found.</Text>
      </View>
    );

  const s = data.shareholder;
  const totalInvestment = s?.investment ?? 0;
  const equity = s?.sharePercentage ?? 0;
  const dividends = s?.profit ?? 0;
  const roi = s?.returns ?? 0;

  // 🌐 WEB VERSION
  if (Platform.OS === "web") {
    return (
      <View className="flex flex-col h-screen bg-gray-50 overflow-hidden web-scroll">
        <ScrollView className="flex-1 overflow-y-auto overflow-x-hidden web-scroll">
          <style>
            {`
              .web-scroll {
                scrollbar-width: none;
                -ms-overflow-style: none;
              }
              .web-scroll::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>

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
                  <Text className="text-gray-500 text-sm">Profit Earned</Text>
                  <Text className="text-green-700 text-2xl font-bold mt-2">
                    ${dividends.toLocaleString()}
                  </Text>
                  <Text className="text-gray-400 text-xs mt-1">
                    Total profit to date
                  </Text>
                </View>

                <View className="bg-white rounded-2xl p-4 mb-3 w-[48%] shadow-sm border border-gray-100">
                  <Text className="text-gray-500 text-sm">Returns</Text>
                  <Text className="text-yellow-700 text-2xl font-bold mt-2">
                    {roi}%
                  </Text>
                  <Text className="text-gray-400 text-xs mt-1">
                    ROI from all investments
                  </Text>
                </View>
              </View>

              {/* Quick Actions */}
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

              {/* Summary Box */}
              <View className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <Text className="text-gray-800 font-semibold mb-2">
                  Account Summary
                </Text>
                <Text className="text-gray-600 text-sm leading-5">
                  Hello {s.firstName}, you currently hold {equity}% equity in{" "}
                  {data.company.name}. Your total investment amounts to $
                  {totalInvestment.toLocaleString()}, and your total profit so
                  far is ${dividends.toLocaleString()}. Your ROI is {roi}%.
                </Text>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </View>
    );
  }

  // 📱 NATIVE VERSION
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
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
            </View>

            <View className="bg-white rounded-2xl p-4 mb-3 w-[48%] shadow-sm border border-gray-100">
              <Text className="text-gray-500 text-sm">Equity</Text>
              <Text className="text-yellow-700 text-2xl font-bold mt-2">
                {equity}%
              </Text>
            </View>

            <View className="bg-white rounded-2xl p-4 mb-3 w-[48%] shadow-sm border border-gray-100">
              <Text className="text-gray-500 text-sm">Profit</Text>
              <Text className="text-green-700 text-2xl font-bold mt-2">
                ${dividends.toLocaleString()}
              </Text>
            </View>

            <View className="bg-white rounded-2xl p-4 mb-3 w-[48%] shadow-sm border border-gray-100">
              <Text className="text-gray-500 text-sm">Returns</Text>
              <Text className="text-yellow-700 text-2xl font-bold mt-2">
                {roi}%
              </Text>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
