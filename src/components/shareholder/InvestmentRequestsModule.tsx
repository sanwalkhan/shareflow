import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Animated,
  Platform,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "toastify-react-native";
import { COLORS, WINDOW } from "../../constants/theme";
import { API_BASE } from "@env";

interface InvestmentRequest {
  id: string;
  amount: number;
  reason: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export default function InvestmentRequestsModule() {
  const { width } = useWindowDimensions();
  const isMobile = width < 900;

  // animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  const [requests, setRequests] = useState<InvestmentRequest[]>([]);
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all requests
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setFetching(true);
      const token = await AsyncStorage.getItem("authToken");
      if (!token) throw new Error("Please login again.");

      const res = await fetch(`${API_BASE}/investment-requests/my-requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Failed to fetch requests");

      const mapped = (json?.data || []).map((r: any) => ({
        id: r._id,
        amount: r.amount,
        reason: r.reason,
        status: r.status,
        createdAt: new Date(r.createdAt).toLocaleDateString(),
      }));

      setRequests(mapped);
    } catch (err: any) {
      setError(err.message);
      Toast.error(err.message || "Unable to fetch requests");
    } finally {
      setFetching(false);
    }
  };

  // Submit a new investment request
  const handleSubmit = async () => {
    if (!amount.trim() || !reason.trim()) {
      Toast.error("Please fill in all fields before submitting.");
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Toast.error("Please enter a valid amount.");
      return;
    }

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("authToken");
      if (!token) throw new Error("Please login again.");

      const res = await fetch(`${API_BASE}/investment-requests/request`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: numericAmount, reason }),
      });
      const json = await res.json();

      if (!res.ok) throw new Error(json.message || "Request failed");

      Toast.success("Investment request submitted!");
      setAmount("");
      setReason("");
      fetchRequests();
    } catch (err: any) {
      Toast.error(err.message || "Error submitting request");
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: InvestmentRequest }) => (
    <View className="bg-white p-4 rounded-2xl mb-3 border border-gray-100 shadow-sm">
      <View className="flex-row justify-between items-start mb-2">
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

  // 🖥 WEB
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
              className="px-6 pt-6 pb-4 border-b border-gray-200 shadow-sm"
            >
              <Text className="text-3xl font-bold text-gray-900 mb-1">
                Investment Requests
              </Text>
              <Text className="text-gray-500 text-base">
                Submit and track your investment requests
              </Text>
            </View>

            {/* New Request Form */}
            <View className="px-6 pt-6 pb-10">
              <View className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6 p-5">
                <Text className="text-gray-800 font-semibold mb-3">
                  New Investment Request
                </Text>

                <TextInput
                  placeholder="Amount (USD)"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  className="border border-gray-300 rounded-xl px-4 py-2 mb-3 text-gray-900"
                  value={amount}
                  onChangeText={setAmount}
                />
                <TextInput
                  placeholder="Reason for Investment"
                  placeholderTextColor="#9CA3AF"
                  className="border border-gray-300 rounded-xl px-4 py-2 mb-4 text-gray-900"
                  value={reason}
                  onChangeText={setReason}
                  multiline
                  style={{ minHeight: 60, textAlignVertical: "top" }}
                />

                <TouchableOpacity
                  disabled={loading}
                  onPress={handleSubmit}
                  className={`py-3 rounded-xl justify-center items-center ${
                    loading ? "bg-green-400" : "bg-green-600"
                  }`}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text className="text-white font-semibold text-base">
                      Submit Request
                    </Text>
                  )}
                </TouchableOpacity>
              </View>

              <Text className="text-gray-800 font-semibold mb-3">
                Previous Requests
              </Text>

              {fetching ? (
                <ActivityIndicator size="large" color="#22c55e" />
              ) : requests.length === 0 ? (
                <View className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm items-center">
                  <Feather name="inbox" size={28} color="#9CA3AF" />
                  <Text className="text-gray-500 mt-2">No requests yet.</Text>
                </View>
              ) : (
                <FlatList
                  data={requests}
                  keyExtractor={(item) => item.id}
                  renderItem={renderItem}
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

  // 📱 NATIVE
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 100,
          paddingHorizontal: 16,
          paddingTop: 16,
        }}
      >
        <Animated.View
          style={{
            minHeight: WINDOW.height,
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            Investment Requests
          </Text>
          <Text className="text-gray-500 text-sm mb-4">
            Submit and track your investment requests.
          </Text>

          {/* Request Form */}
          <View className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6 p-5">
            <Text className="text-gray-800 font-semibold mb-3">
              New Investment Request
            </Text>

            <TextInput
              placeholder="Amount (USD)"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              className="border border-gray-300 rounded-xl px-4 py-2 mb-3 text-gray-900"
              value={amount}
              onChangeText={setAmount}
            />
            <TextInput
              placeholder="Reason for Investment"
              placeholderTextColor="#9CA3AF"
              className="border border-gray-300 rounded-xl px-4 py-2 mb-4 text-gray-900"
              value={reason}
              onChangeText={setReason}
              multiline
              style={{ minHeight: 60, textAlignVertical: "top" }}
            />

            <TouchableOpacity
              disabled={loading}
              onPress={handleSubmit}
              className={`py-3 rounded-xl justify-center items-center ${
                loading ? "bg-green-400" : "bg-green-600"
              }`}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white font-semibold text-base">
                  Submit Request
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Requests List */}
          <Text className="text-gray-800 font-semibold mb-3">
            Previous Requests
          </Text>

          {fetching ? (
            <ActivityIndicator size="large" color="#22c55e" />
          ) : requests.length === 0 ? (
            <View className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm items-center">
              <Feather name="inbox" size={28} color="#9CA3AF" />
              <Text className="text-gray-500 mt-2">No previous requests found.</Text>
            </View>
          ) : (
            requests.map((item) => <View key={item.id}>{renderItem({ item })}</View>)
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
}
