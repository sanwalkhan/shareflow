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
  useWindowDimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, WINDOW } from "../../constants/theme";
import { API_BASE } from "@env"; // ✅ environment variable

export default function ShareholderOverview() {
  const { width } = useWindowDimensions();
  const isMobile = width < 900;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const token = await AsyncStorage.getItem("authToken");
        if (!token) throw new Error("No auth token found. Please sign in again.");

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

        const res = await fetch(`${API_BASE}/investment-requests/dashboard`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        });
        clearTimeout(timeout);

        if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch data`);

        const json = await res.json();
        setData(json.data);
      } catch (err: any) {
        console.error("❌ Error fetching shareholder data:", err);
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // 🎞️ Animation start
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  // 🌀 Loading State
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color={COLORS.accent} />
        <Text className="text-gray-500 mt-3">Loading dashboard...</Text>
      </View>
    );
  }

  // ❌ Error State
  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50 px-6">
        <Feather name="alert-circle" size={40} color="#ef4444" />
        <Text className="text-red-600 font-semibold mt-2">Failed to load data</Text>
        <Text className="text-gray-500 text-center mt-1">{error}</Text>
      </View>
    );
  }

  if (!data)
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <Text className="text-gray-500">No data found.</Text>
      </View>
    );

  // ✅ Destructure values safely
  const s = data.shareholder || {};
  const company = data.company || {};
  const totalInvestment = s.investment ?? 0;
  const equity = s.sharePercentage ?? 0;
  const dividends = s.profit ?? 0;
  const roi = s.returns ?? 0;

  // 🌐 WEB VERSION
  if (Platform.OS === "web") {
    return (
      <View className="flex flex-col h-screen bg-gray-50 overflow-hidden">
        <ScrollView
          className="flex-1 overflow-y-auto overflow-x-hidden web-scroll"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
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
            <View className="px-6 pt-6 pb-20">
              {/* Summary Cards */}
              <View className="flex-row flex-wrap justify-between mb-6">
                {[
                  {
                    label: "Total Investment",
                    value: `$${totalInvestment.toLocaleString()}`,
                    color: "text-green-700",
                    desc: "Across all active holdings",
                  },
                  {
                    label: "Equity",
                    value: `${equity}%`,
                    color: "text-yellow-700",
                    desc: "Ownership percentage",
                  },
                  {
                    label: "Profit Earned",
                    value: `$${dividends.toLocaleString()}`,
                    color: "text-green-700",
                    desc: "Total profit to date",
                  },
                  {
                    label: "Returns",
                    value: `${roi}%`,
                    color: "text-yellow-700",
                    desc: "ROI from all investments",
                  },
                ].map((item, i) => (
                  <View
                    key={i}
                    className="bg-white rounded-2xl p-4 mb-3 w-[48%] shadow-sm border border-gray-100"
                  >
                    <Text className="text-gray-500 text-sm">{item.label}</Text>
                    <Text className={`${item.color} text-2xl font-bold mt-2`}>
                      {item.value}
                    </Text>
                    <Text className="text-gray-400 text-xs mt-1">{item.desc}</Text>
                  </View>
                ))}
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
              <View className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-10">
                <Text className="text-gray-800 font-semibold mb-2">
                  Account Summary
                </Text>
                <Text className="text-gray-600 text-sm leading-5">
                  Hello {s.firstName || "Shareholder"}, you currently hold{" "}
                  {equity}% equity in {company.name || "your company"}. Your total
                  investment amounts to ${totalInvestment.toLocaleString()}, and
                  your total profit so far is ${dividends.toLocaleString()}. Your
                  ROI is {roi}%.
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

          <View className="flex-row flex-wrap justify-between mb-6">
            {[
              { label: "Total Investment", value: `$${totalInvestment.toLocaleString()}`, color: "text-green-700" },
              { label: "Equity", value: `${equity}%`, color: "text-yellow-700" },
              { label: "Profit", value: `$${dividends.toLocaleString()}`, color: "text-green-700" },
              { label: "Returns", value: `${roi}%`, color: "text-yellow-700" },
            ].map((item, i) => (
              <View
                key={i}
                className="bg-white rounded-2xl p-4 mb-3 w-[48%] shadow-sm border border-gray-100"
              >
                <Text className="text-gray-500 text-sm">{item.label}</Text>
                <Text className={`${item.color} text-2xl font-bold mt-2`}>
                  {item.value}
                </Text>
              </View>
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
