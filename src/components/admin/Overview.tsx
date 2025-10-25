import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";

const BASE_URL = "https://shareflow-backend-production.up.railway.app/api";

export default function Overview({ data }: any) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [overview, setOverview] = useState({
    totalShareholders: 0,
    pendingRequests: 0,
    approvedRequests: 0,
    totalInvestments: 0,
    totalExpenses: 0,
  });

  const [companyName, setCompanyName] = useState(data?.name || "Company");

  // 🔐 Load data
  const fetchOverviewData = async () => {
    try {
      setLoading(true);

      const userDataString = await AsyncStorage.getItem("userData");
      if (!userDataString) throw new Error("No user session found");

      const userData = JSON.parse(userDataString);
      const token = userData?.token;
      const companyId = userData?.company?._id;

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      // Run all requests in parallel
      const [shareholdersRes, requestsRes, expensesRes] = await Promise.all([
        fetch(`${BASE_URL}/shareholders?company=${companyId}`, { headers }),
        fetch(`${BASE_URL}/investment-requests/requests`, { headers }),
        fetch(`${BASE_URL}/expenses?company=${companyId}`, { headers }),
      ]);

      // Convert to JSON
      const shareholdersData = await shareholdersRes.json();
      const requestsData = await requestsRes.json();
      const expensesData = await expensesRes.json();

      const shareholders = shareholdersData?.data || [];
      const requests = requestsData?.data || [];
      const expenses = expensesData?.data || [];

      // Calculate metrics
      const pendingRequests = requests.filter((r: any) => r.status === "pending").length;
      const approvedRequests = requests.filter((r: any) => r.status === "approved").length;
      const totalInvestments = requests
        .filter((r: any) => r.status === "approved")
        .reduce((sum: number, r: any) => sum + (r.amount || 0), 0);
      const totalExpenses = expenses.reduce((sum: number, e: any) => sum + (e.amount || 0), 0);

      setOverview({
        totalShareholders: shareholders.length,
        pendingRequests,
        approvedRequests,
        totalInvestments,
        totalExpenses,
      });

      setCompanyName(userData?.company?.name || data?.name || "Company");
    } catch (error) {
      console.error("❌ Error fetching overview data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOverviewData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchOverviewData();
  };

  // Card component
  const MetricCard = ({ icon, label, value, color }: any) => (
    <View className="flex-1 bg-white rounded-2xl p-4 mr-4 mb-4 shadow-sm border border-gray-100">
      <View className="flex-row items-center mb-2">
        <View className={`w-10 h-10 rounded-xl justify-center items-center ${color}`}>
          <Feather name={icon} size={18} color="#fff" />
        </View>
        <Text className="text-gray-500 ml-3 font-medium">{label}</Text>
      </View>
      <Text className="text-2xl font-extrabold text-gray-900">{value}</Text>
    </View>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color={COLORS.accent} />
        <Text className="text-gray-500 mt-3">Loading company overview...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      contentContainerStyle={{ padding: 24 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* Header */}
      <View className="mb-6">
        <Text className="text-2xl font-extrabold text-gray-900 mb-1">
          Welcome back, 👋
        </Text>
        <Text className="text-gray-500 text-base font-medium">
          Here's what's happening with {companyName} today.
        </Text>
      </View>

      {/* Metrics Grid */}
      <View className="flex-wrap flex-row justify-between">
        <MetricCard
          icon="users"
          label="Shareholders"
          value={overview.totalShareholders}
          color="bg-green-500"
        />
        <MetricCard
          icon="file-plus"
          label="Pending Requests"
          value={overview.pendingRequests}
          color="bg-yellow-500"
        />
        <MetricCard
          icon="check-circle"
          label="Approved Requests"
          value={overview.approvedRequests}
          color="bg-blue-500"
        />
        <MetricCard
          icon="dollar-sign"
          label="Total Investments"
          value={`$${overview.totalInvestments.toLocaleString()}`}
          color="bg-emerald-500"
        />
        <MetricCard
          icon="credit-card"
          label="Total Expenses"
          value={`$${overview.totalExpenses.toLocaleString()}`}
          color="bg-red-500"
        />
      </View>

      <View className="mt-8">
        <Text className="text-gray-700 text-sm font-medium">
          (Detailed analytics & charts coming soon.)
        </Text>
      </View>
    </ScrollView>
  );
}
