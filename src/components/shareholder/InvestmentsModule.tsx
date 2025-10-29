import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Animated,
  Platform,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, WINDOW } from "../../constants/theme";
import { API_BASE } from "@env"; // ✅ using .env for backend base URL

export interface Investment {
  id: string;
  amount: number;
  reason: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export default function InvestmentsModule() {
  const { width } = useWindowDimensions();
  const isTablet = width < 1200 && width >= 768;
  const isMobile = width < 768;

  // animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  // states
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [stats, setStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    approvedRequests: 0,
    rejectedRequests: 0,
  });
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | Investment["status"]>("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ fetch from backend securely
  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        setLoading(true);
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

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const json = await res.json();

        const requests = json?.data?.requests || [];
        const statsData = json?.data?.stats || {};

        const mapped = requests.map((r: any) => ({
          id: r._id,
          amount: r.amount,
          reason: r.reason,
          status: r.status,
          createdAt: new Date(r.createdAt).toLocaleDateString(),
        }));

        setInvestments(mapped);
        setStats(statsData);
      } catch (err: any) {
        setError(err.message || "Failed to fetch investments.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, []);

  // filtering
  const visible = investments.filter((inv) => {
    const matchesQuery =
      query.trim() === "" || inv.reason.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === "All" || inv.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const renderInvestmentCard = ({ item }: { item: Investment }) => (
    <View className="bg-white p-4 rounded-2xl mb-3 border border-gray-100 shadow-sm">
      <View className="flex-row justify-between items-start mb-2 flex-wrap">
        <View style={{ flex: 1, paddingRight: 8 }}>
          <Text className="text-gray-900 font-semibold text-lg">
            ${item.amount.toLocaleString()}
          </Text>
          <Text className="text-gray-500 text-sm mt-1">Date: {item.createdAt}</Text>
        </View>

        <View
          className={`px-3 py-1 rounded-full ${
            item.status === "approved"
              ? "bg-green-100"
              : item.status === "rejected"
              ? "bg-red-100"
              : "bg-yellow-100"
          }`}
        >
          <Text
            className={`text-xs font-semibold ${
              item.status === "approved"
                ? "text-green-700"
                : item.status === "rejected"
                ? "text-red-700"
                : "text-yellow-700"
            }`}
          >
            {item.status.toUpperCase()}
          </Text>
        </View>
      </View>

      <Text className="text-gray-600 text-sm mt-1">{item.reason}</Text>
    </View>
  );

  // 🧩 handle loading & error
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text className="text-gray-500 mt-3">Loading investments...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 px-6">
        <Feather name="alert-circle" size={40} color="#ef4444" />
        <Text className="text-red-600 font-semibold mt-2">Failed to load data</Text>
        <Text className="text-gray-500 text-center mt-1">{error}</Text>
      </View>
    );
  }

  // 🖥 WEB + 📱 NATIVE versions
  if (Platform.OS === "web") {
    return (
      <View className="flex flex-col h-screen bg-gray-50 overflow-hidden">
        <ScrollView
          className="flex-1 overflow-y-auto overflow-x-hidden web-scroll"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <style>{`
            .web-scroll { scrollbar-width: none; -ms-overflow-style: none; }
            .web-scroll::-webkit-scrollbar { display: none; }
          `}</style>

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
              className="px-4 sm:px-6 pt-6 pb-4 border-b border-gray-200 shadow-sm"
            >
              <View
                className={`flex-row flex-wrap ${
                  isMobile ? "flex-col" : "justify-between"
                } items-start mb-4`}
              >
                <View className="flex-1 mb-3">
                  <Text
                    className={`font-bold ${isMobile ? "text-2xl" : "text-3xl"}`}
                    style={{ color: COLORS.textDark }}
                  >
                    My Investment Requests
                  </Text>
                  <Text className="text-base mt-1" style={{ color: COLORS.tertiary }}>
                    Overview of your requests and their statuses
                  </Text>
                </View>

                {/* Responsive Search Bar */}
                <View
                  className={`bg-white rounded-xl px-3 py-2 border border-gray-200 flex-row items-center ${
                    isMobile ? "w-full" : ""
                  }`}
                >
                  <Feather name="search" size={16} color="#9CA3AF" />
                  <TextInput
                    placeholder="Search reason..."
                    placeholderTextColor="#9CA3AF"
                    className="ml-2 flex-1 text-gray-900"
                    value={query}
                    onChangeText={setQuery}
                    style={{ width: isMobile ? "100%" : 220 }}
                  />
                </View>
              </View>

              {/* Stats Summary */}
              <View className="flex-row flex-wrap justify-start gap-3">
                {[ 
                  { label: "Total Requests", value: stats.totalRequests },
                  { label: "Pending", value: stats.pendingRequests },
                  { label: "Approved", value: stats.approvedRequests },
                  { label: "Rejected", value: stats.rejectedRequests },
                ].map((s, i) => (
                  <View
                    key={i}
                    className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100"
                    style={{
                      flexBasis: isMobile ? "48%" : isTablet ? "23%" : "22%",
                    }}
                  >
                    <Text className="text-gray-500 text-sm">{s.label}</Text>
                    <Text className="text-green-700 text-xl font-bold mt-1">
                      {s.value ?? 0}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Content list */}
            <View className="px-4 sm:px-6 pt-4 pb-10">
              <Text style={{ color: COLORS.textDark }} className="font-medium mb-3">
                Requests ({visible.length})
              </Text>

              {visible.length === 0 ? (
                <View className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm items-center">
                  <Feather name="inbox" size={32} color="#9CA3AF" />
                  <Text className="text-gray-500 mt-2">No requests found.</Text>
                </View>
              ) : (
                <FlatList
                  data={visible}
                  keyExtractor={(i) => i.id}
                  renderItem={renderInvestmentCard}
                  contentContainerStyle={{ paddingBottom: 100 }}
                  showsVerticalScrollIndicator={false}
                />
              )}
            </View>
          </Animated.View>
        </ScrollView>
      </View>
    );
  }

  // --- NATIVE ---
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 80,
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
          <Text className="text-2xl font-bold text-gray-900 mb-2">My Investment Requests</Text>
          <Text className="text-gray-500 text-sm mb-4">
            Overview of your requests and their statuses
          </Text>

          {visible.map((item) => (
            <View key={item.id}>{renderInvestmentCard({ item })}</View>
          ))}
        </Animated.View>
      </ScrollView>
    </View>
  );
}
