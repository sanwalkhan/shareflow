import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Platform,
  Animated,
  useWindowDimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Toast } from "toastify-react-native";
import { COLORS, WINDOW } from "../../constants/theme";

interface InvestmentRequest {
  _id: string;
  amount: number;
  reason: string;
  status: string;
}

export default function InvestmentRequestsModule() {
  const { width } = useWindowDimensions();
  const isMobile = width < 900;
  const BASE_URL = "https://shareflow-backend-production.up.railway.app/api";

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // 🔑 Hardcoded token (from your example)
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZjliM2QzMTgzMWM5NTkxOTQ2ZGI5ZCIsImVtYWlsIjoic2FtNThtYWxpa0BnbWFpbC5jb20iLCJyb2xlIjoic2hhcmVob2xkZXIiLCJpYXQiOjE3NjEyODcxMjAsImV4cCI6MTc2Mzg3OTEyMH0._9aQbMF6aAsB4Px-1Ftpjz3qAqorzkWd3P1dMbWi_hE";

  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [requests, setRequests] = useState<InvestmentRequest[]>([]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
    fetchRequests();
  }, []);

  // 📡 Fetch all requests (shareholder)
  const fetchRequests = async () => {
    try {
      setFetching(true);
      const res = await fetch(`${BASE_URL}/investment-requests/my-requests`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch requests");

      setRequests(data.data || []);
    } catch (error: any) {
      Toast.error(error.message || "Unable to fetch requests.");
    } finally {
      setFetching(false);
    }
  };

  // 📝 Submit new investment request
  const handleSubmit = async () => {
    if (!amount.trim() || !reason.trim()) {
      Toast.error("Please fill in all fields before submitting.");
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Toast.error("Invalid amount. Please enter a positive number.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/investment-requests/request`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: numericAmount, reason }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Request submission failed");

      Toast.success("Investment request submitted successfully!");
      setAmount("");
      setReason("");
      fetchRequests();
    } catch (error: any) {
      Toast.error(error.message || "Unable to submit request.");
    } finally {
      setLoading(false);
    }
  };

  // 💳 Render individual request card
  const renderItem = ({ item }: { item: InvestmentRequest }) => (
    <View className="bg-white p-4 rounded-2xl mb-3 border border-gray-100 shadow-sm">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-gray-900 font-semibold">
          ${item.amount?.toLocaleString() || 0}
        </Text>
        <View
          className={`px-3 py-1 rounded-full ${
            item.status === "approved"
              ? "bg-green-100"
              : item.status === "pending"
              ? "bg-yellow-100"
              : "bg-red-100"
          }`}
        >
          <Text
            className={`text-xs font-semibold ${
              item.status === "approved"
                ? "text-green-700"
                : item.status === "pending"
                ? "text-yellow-700"
                : "text-red-700"
            }`}
          >
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>
      <Text className="text-gray-600 text-sm mb-2">{item.reason}</Text>
      <Text className="text-gray-400 text-xs">Request ID: {item._id}</Text>
    </View>
  );

  const Content = (
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
          Submit and track your investment requests.
        </Text>
      </View>

      {/* New Request Form */}
      <View className="px-6 pt-5">
        <View className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6">
          <View className="p-5">
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
              className={`py-3 rounded-xl justify-center items-center ${
                loading ? "bg-green-400" : "bg-green-600"
              }`}
              onPress={handleSubmit}
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
            <Text className="text-gray-500 mt-2">
              No previous requests found.
            </Text>
          </View>
        ) : (
          <FlatList
            data={requests}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 80 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </Animated.View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView showsVerticalScrollIndicator={false}>{Content}</ScrollView>
      {/* Toast is used programmatically via Toast.success / Toast.error; no JSX container required */}
    </View>
  );
}
