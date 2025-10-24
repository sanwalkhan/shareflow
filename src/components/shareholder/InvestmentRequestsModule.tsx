// src/modules/InvestmentRequestsModule.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  ScrollView,
  Platform,
  Animated,
  useWindowDimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, WINDOW } from "../../constants/theme";

interface InvestmentRequest {
  _id: string;
  amount: number;
  reason: string;
  status: "Approved" | "Pending" | "Rejected";
}

export default function InvestmentRequestsModule() {
  const { width } = useWindowDimensions();
  const isMobile = width < 900;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [requests, setRequests] = useState<InvestmentRequest[]>([]);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZjliM2QzMTgzMWM5NTkxOTQ2ZGI5ZCIsImVtYWlsIjoic2FtNThtYWxpa0BnbWFpbC5jb20iLCJyb2xlIjoic2hhcmVob2xkZXIiLCJpYXQiOjE3NjEyODcxMjAsImV4cCI6MTc2Mzg3OTEyMH0._9aQbMF6aAsB4Px-1Ftpjz3qAqorzkWd3P1dMbWi_hE";

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setFetching(true);
      const res = await fetch(
        "https://shareflow-backend-production.up.railway.app/api/investment-requests/dashboard",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load requests");
      setRequests(data.requests || []);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Unable to fetch requests");
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async () => {
    if (!amount.trim() || !reason.trim()) {
      Alert.alert("Missing Fields", "Please fill in all fields before submitting.");
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid positive amount.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        "https://shareflow-backend-production.up.railway.app/api/investment-requests/request",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: numericAmount, reason }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit request");

      Alert.alert("Success", "Investment request submitted successfully!");
      setAmount("");
      setReason("");
      fetchRequests(); // refresh list
    } catch (error: any) {
      Alert.alert("Error", error.message || "Unable to submit request");
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: InvestmentRequest }) => (
    <View className="bg-white p-4 rounded-2xl mb-3 border border-gray-100 shadow-sm">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-gray-900 font-semibold">
          ${item.amount.toLocaleString()}
        </Text>
        <View
          className={`px-3 py-1 rounded-full ${
            item.status === "Approved"
              ? "bg-green-100"
              : item.status === "Pending"
              ? "bg-yellow-100"
              : "bg-red-100"
          }`}
        >
          <Text
            className={`text-xs font-semibold ${
              item.status === "Approved"
                ? "text-green-700"
                : item.status === "Pending"
                ? "text-yellow-700"
                : "text-red-700"
            }`}
          >
            {item.status}
          </Text>
        </View>
      </View>
      <Text className="text-gray-600 text-sm mb-2">{item.reason}</Text>
      <View className="flex-row justify-between items-center">
        <Text className="text-gray-400 text-xs">Request ID: {item._id}</Text>
      </View>
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
          Generate and track your investment requests for approval.
        </Text>
      </View>

      {/* Form */}
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
          {Content}
        </ScrollView>
      </View>
    );
  }

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
        {Content}
      </ScrollView>
    </View>
  );
}
