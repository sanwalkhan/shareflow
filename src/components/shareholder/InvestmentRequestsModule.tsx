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
  id: string;
  amount: number;
  description: string;
  status: "Approved" | "Pending" | "Rejected";
}

interface InvestmentRequestsModuleProps {
  onSubmitRequest?: (amount: number, description: string) => void;
}

export default function InvestmentRequestsModule({
  onSubmitRequest,
}: InvestmentRequestsModuleProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 900;

  // animations (same as admin modules)
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  // states
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState<InvestmentRequest[]>([
    {
      id: "1",
      amount: 50000,
      description: "Expansion fund for AI project",
      status: "Approved",
    },
    {
      id: "2",
      amount: 30000,
      description: "Investment in marketing platform",
      status: "Pending",
    },
  ]);

  const handleSubmit = () => {
    if (!amount.trim() || !description.trim()) {
      Alert.alert("Missing Fields", "Please fill in all fields before submitting.");
      return;
    }
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid positive amount.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const newRequest: InvestmentRequest = {
        id: Date.now().toString(),
        amount: numericAmount,
        description,
        status: "Pending",
      };
      setRequests((prev) => [newRequest, ...prev]);
      setAmount("");
      setDescription("");
      setLoading(false);
      if (onSubmitRequest) onSubmitRequest(numericAmount, description);
      Alert.alert("Request Sent", "Your investment request has been submitted for admin approval.");
    }, 800);
  };

  const renderItem = ({ item }: { item: InvestmentRequest }) => (
    <View className="bg-white p-4 rounded-2xl mb-3 border border-gray-100 shadow-sm">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-gray-900 font-semibold">${item.amount.toLocaleString()}</Text>
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
      <Text className="text-gray-600 text-sm mb-2">{item.description}</Text>
      <View className="flex-row justify-between items-center">
        <Text className="text-gray-400 text-xs">Request ID: {item.id}</Text>
        <TouchableOpacity className="px-3 py-1 rounded-xl border border-gray-200">
          <Text className="text-gray-700 text-xs font-medium">View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
                    placeholder="Description"
                    placeholderTextColor="#9CA3AF"
                    className="border border-gray-300 rounded-xl px-4 py-2 mb-4 text-gray-900"
                    value={description}
                    onChangeText={setDescription}
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
              {requests.length === 0 ? (
                <View className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm items-center">
                  <Feather name="inbox" size={28} color="#9CA3AF" />
                  <Text className="text-gray-500 mt-2">
                    No previous requests found.
                  </Text>
                </View>
              ) : (
                <FlatList
                  data={requests}
                  keyExtractor={(item) => item.id}
                  renderItem={renderItem}
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

  // ──────────────────────────────
  // 📱 NATIVE VERSION
  // ──────────────────────────────
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={{
            minHeight: WINDOW.height,
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <Text className="text-2xl font-bold text-gray-900 mb-4">
            Investment Requests
          </Text>

          <View className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6 p-4">
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
              placeholder="Description"
              placeholderTextColor="#9CA3AF"
              className="border border-gray-300 rounded-xl px-4 py-2 mb-4 text-gray-900"
              value={description}
              onChangeText={setDescription}
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

          <Text className="text-gray-800 font-semibold mb-3">
            Previous Requests
          </Text>
          {requests.length === 0 ? (
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
