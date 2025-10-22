// src/components/shareholder/InvestmentsModule.tsx
import React, { useMemo, useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Animated,
  Platform,
  useWindowDimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, WINDOW } from "../../constants/theme";

export interface Investment {
  id: string;
  project: string;
  amount: number;
  roi: number; // percent
  status: "Active" | "Closed" | "Paused";
  startedAt?: string;
}

interface InvestmentsModuleProps {
  data?: {
    investments?: Investment[];
  };
}

const MOCK_INVESTMENTS: Investment[] = [
  { id: "1", project: "AI Research", amount: 120000, roi: 12.5, status: "Active", startedAt: "2023-05-14" },
  { id: "2", project: "Cloud Platform", amount: 80000, roi: 15.3, status: "Active", startedAt: "2022-11-02" },
  { id: "3", project: "Green Energy", amount: 50000, roi: 10.1, status: "Closed", startedAt: "2021-07-18" },
];

export default function InvestmentsModule({ data }: InvestmentsModuleProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 900;

  // entrance animations (same pattern as your ShareholdersModule)
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  // state
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | Investment["status"]>("All");

  const investments = data?.investments ?? MOCK_INVESTMENTS;

  const totalInvested = useMemo(() => investments.reduce((s, i) => s + i.amount, 0), [investments]);

  const visible = investments.filter((inv) => {
    const matchesQuery = query.trim() === "" || inv.project.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === "All" || inv.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const renderInvestmentCard = ({ item }: { item: Investment }) => (
    <View className="bg-white p-4 rounded-2xl mb-3 border border-gray-100 shadow-sm">
      <View className="flex-row justify-between items-start mb-2">
        <View style={{ flex: 1, paddingRight: 8 }}>
          <Text className="text-gray-900 font-semibold text-lg">{item.project}</Text>
          <Text className="text-gray-500 text-sm mt-1">Started: {item.startedAt ?? "—"}</Text>
        </View>

        <View className="items-end">
          <Text className="text-gray-900 font-bold">${item.amount.toLocaleString()}</Text>
          <Text className="text-gray-500 text-sm">{item.roi}% ROI</Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between">
        <View
          className={`px-3 py-1 rounded-full ${
            item.status === "Active" ? "bg-green-100" : item.status === "Closed" ? "bg-gray-100" : "bg-yellow-100"
          }`}
        >
          <Text
            className={`text-xs font-semibold ${
              item.status === "Active" ? "text-green-700" : item.status === "Closed" ? "text-gray-700" : "text-yellow-700"
            }`}
          >
            {item.status}
          </Text>
        </View>

        <TouchableOpacity className="px-3 py-1 rounded-xl bg-white border border-gray-200">
          <Text className="text-gray-700 text-sm">View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // --- WEB VERSION: same structure as ShareholdersModule (Animated inner view + scroll container) ---
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
            <View style={{ backgroundColor: COLORS.white }} className="px-6 pt-6 pb-4 border-b border-gray-200 shadow-sm">
              <View className="flex-row justify-between items-start mb-4">
                <View className="flex-1 mr-4">
                  <Text className="text-3xl font-bold" style={{ color: COLORS.textDark }}>
                    My Investments
                  </Text>
                  <Text className="text-base mt-1" style={{ color: COLORS.tertiary }}>
                    Overview of your active and past investments
                  </Text>
                </View>

                <View className="flex-row items-center">
                  <View className="bg-white rounded-xl px-3 py-2 border border-gray-200 flex-row items-center mr-3">
                    <Feather name="search" size={16} color="#9CA3AF" />
                    <TextInput
                      placeholder="Search project..."
                      placeholderTextColor="#9CA3AF"
                      className="ml-2 flex-1 text-gray-900"
                      value={query}
                      onChangeText={setQuery}
                      style={{ width: 220 }}
                    />
                  </View>

                 
                </View>
              </View>

              {/* Summary + filters */}
              <View className="flex-row items-center mb-4">
                <View className="bg-white p-3 rounded-2xl mr-3 shadow-sm border border-gray-100" style={{ minWidth: 220 }}>
                  <Text className="text-gray-500 text-sm">Total Invested</Text>
                  <Text className="text-green-700 text-xl font-bold mt-1">${totalInvested.toLocaleString()}</Text>
                </View>

                <View className="flex-1">
                  <View className="flex-row flex-wrap">
                    {(["All", "Active", "Closed", "Paused"] as const).map((s) => (
                      <TouchableOpacity
                        key={s}
                        onPress={() => setStatusFilter(s as any)}
                        className={`px-3 py-1 rounded-full mr-2 mb-2 ${statusFilter === s ? "bg-green-600" : "bg-white"} border border-gray-200`}
                      >
                        <Text className={`${statusFilter === s ? "text-white" : "text-gray-700"} text-sm`}>
                          {s}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            </View>

            {/* Content list */}
            <View className="px-6 pt-4 pb-10">
              <Text style={{ color: COLORS.textDark }} className="font-medium mb-3">
                Investments ({visible.length})
              </Text>

              {visible.length === 0 ? (
                <View className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm items-center">
                  <Feather name="inbox" size={32} color="#9CA3AF" />
                  <Text className="text-gray-500 mt-2">No investments found.</Text>
                </View>
              ) : (
                <FlatList
                  data={visible}
                  keyExtractor={(i) => i.id}
                  renderItem={renderInvestmentCard}
                  contentContainerStyle={{ paddingBottom: 80 }}
                  showsVerticalScrollIndicator={false}
                />
              )}
            </View>
          </Animated.View>
        </ScrollView>
      </View>
    );
  }

  // --- NATIVE (iOS/Android) version ---
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View
          style={{
            minHeight: WINDOW.height,
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          {/* Header */}
          <View className="mb-4">
            <Text className="text-2xl font-bold text-gray-900 mb-2">My Investments</Text>
            <Text className="text-gray-500 text-sm">Overview of your active and past investments</Text>
          </View>

          {/* Summary + search + filters */}
          <View className="bg-white p-3 rounded-2xl mb-4 border border-gray-100 shadow-sm">
            <View className="flex-row items-center justify-between mb-3">
              <View>
                <Text className="text-gray-500 text-sm">Total Invested</Text>
                <Text className="text-green-700 text-lg font-bold mt-1">${totalInvested.toLocaleString()}</Text>
              </View>

              <View style={{ flex: 1, marginLeft: 12 }}>
                <View className="flex-row items-center bg-gray-50 rounded-xl px-3 py-2 border border-gray-200">
                  <Feather name="search" size={16} color="#9CA3AF" />
                  <TextInput
                    placeholder="Search project..."
                    placeholderTextColor="#9CA3AF"
                    className="ml-2 flex-1 text-gray-900"
                    value={query}
                    onChangeText={setQuery}
                    style={{ width: 120 }}
                  />
                </View>
              </View>
            </View>

            <View className="flex-row flex-wrap">
              {(["All", "Active", "Closed", "Paused"] as const).map((s) => (
                <TouchableOpacity
                  key={s}
                  onPress={() => setStatusFilter(s as any)}
                  className={`px-3 py-1.5 rounded-full mr-2 mb-2 ${statusFilter === s ? "bg-green-600" : "bg-gray-100"}`}
                >
                  <Text className={`text-sm ${statusFilter === s ? "text-white" : "text-gray-700"}`}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Investments list */}
          {visible.length === 0 ? (
            <View className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm items-center">
              <Feather name="inbox" size={28} color="#9CA3AF" />
              <Text className="text-gray-500 mt-2">No investments match your filters.</Text>
            </View>
          ) : (
            visible.map((item) => <View key={item.id}>{renderInvestmentCard({ item })}</View>)
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
}
