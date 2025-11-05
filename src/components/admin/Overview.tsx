// src/components/admin/Overview.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  useWindowDimensions,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../../constants/theme";
import { API_BASE } from "@env";

// Use environment variable for API base URL
const BASE_URL = API_BASE || "https://shareflow-backend-ruddy.vercel.app/api";

export default function Overview({ data }: any) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(30));

  const [overview, setOverview] = useState({
    totalShareholders: 0,
    pendingRequests: 0,
    approvedRequests: 0,
    totalInvestments: 0,
    totalExpenses: 0,
    activeProjects: 0,
    totalProfit: 0,
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
      
      // Calculate net profit (investments - expenses)
      const totalProfit = totalInvestments - totalExpenses;

      setOverview({
        totalShareholders: shareholders.length,
        pendingRequests,
        approvedRequests,
        totalInvestments,
        totalExpenses,
        activeProjects: Math.floor(Math.random() * 12) + 1, // Mock data for now
        totalProfit,
      });

      setCompanyName(userData?.company?.name || data?.name || "Company");

      // Animate in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start();

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

  // Stats data for metrics grid
  const stats = [
    {
      icon: "users",
      label: "Total Shareholders",
      value: overview.totalShareholders,
      gradient: ['#10b981', '#059669'],
      trend: 8.2,
    },
    {
      icon: "file-plus",
      label: "Pending Requests",
      value: overview.pendingRequests,
      gradient: ['#f59e0b', '#d97706'],
      trend: -2.1,
    },
    {
      icon: "check-circle",
      label: "Approved Requests",
      value: overview.approvedRequests,
      gradient: ['#3b82f6', '#1d4ed8'],
      trend: 12.5,
    },
    {
      icon: "dollar-sign",
      label: "Total Investments",
      value: overview.totalInvestments.toLocaleString(),
      gradient: ['#8b5cf6', '#7c3aed'],
      prefix: "$",
      trend: 15.3,
    },
    {
      icon: "credit-card",
      label: "Total Expenses",
      value: overview.totalExpenses.toLocaleString(),
      gradient: ['#ef4444', '#dc2626'],
      prefix: "$",
      trend: -5.7,
    },
    {
      icon: "bar-chart",
      label: "Active Projects",
      value: overview.activeProjects,
      gradient: ['#ec4899', '#db2777'],
      trend: 3.4,
    },
  ];

  // Premium Metric Card Component
  const MetricCard = ({ 
    icon, 
    label, 
    value, 
    gradient = ['#667eea', '#764ba2'],
    trend,
    suffix = "",
    prefix = ""
  }: any) => (
    <Animated.View 
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
      className="bg-white rounded-3xl shadow-xl mb-4 mx-2 flex-1 min-w-0"
    >
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-3xl p-6"
      >
        <View className="flex-row justify-between items-start">
          <View className="flex-1 min-w-0">
            <Text className="text-white/80 text-sm font-medium mb-1" numberOfLines={1}>
              {label}
            </Text>
            <Text className="text-white text-2xl font-bold mb-2" numberOfLines={1}>
              {prefix}{value}{suffix}
            </Text>
            {trend && (
              <View className="flex-row items-center">
                <Ionicons 
                  name={trend > 0 ? "trending-up" : "trending-down"} 
                  size={16} 
                  color={trend > 0 ? "#10b981" : "#ef4444"} 
                />
                <Text 
                  className={`ml-1 text-sm font-medium ${
                    trend > 0 ? "text-green-300" : "text-red-300"
                  }`}
                >
                  {trend > 0 ? "+" : ""}{trend}%
                </Text>
              </View>
            )}
          </View>
          <View className="w-12 h-12 bg-white/20 rounded-2xl items-center justify-center ml-3 flex-shrink-0">
            <Feather name={icon} size={24} color="white" />
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );

  // Quick Stats Card
  const QuickStatsCard = () => (
    <Animated.View 
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
      className="bg-white rounded-3xl shadow-xl p-6 mb-6 mx-4"
    >
      <Text className="text-xl font-bold text-gray-900 mb-4">Quick Stats</Text>
      <View className={`flex-row flex-wrap justify-between ${isMobile ? '-mx-2' : ''}`}>
        <View className={`flex-row items-center ${isMobile ? 'w-1/2 px-2 mb-4' : 'mb-4 flex-1'}`}>
          <View className="w-10 h-10 bg-green-100 rounded-2xl items-center justify-center mr-3">
            <Ionicons name="checkmark-done" size={20} color="#10b981" />
          </View>
          <View className="flex-1 min-w-0">
            <Text className="text-gray-500 text-sm">Approval Rate</Text>
            <Text className="text-gray-900 font-bold text-lg">
              {overview.totalInvestments > 0 
                ? Math.round((overview.approvedRequests / (overview.approvedRequests + overview.pendingRequests)) * 100) 
                : 0
              }%
            </Text>
          </View>
        </View>

        <View className={`flex-row items-center ${isMobile ? 'w-1/2 px-2 mb-4' : 'mb-4 flex-1'}`}>
          <View className="w-10 h-10 bg-blue-100 rounded-2xl items-center justify-center mr-3">
            <Ionicons name="business" size={20} color="#3b82f6" />
          </View>
          <View className="flex-1 min-w-0">
            <Text className="text-gray-500 text-sm">Active Projects</Text>
            <Text className="text-gray-900 font-bold text-lg">
              {overview.activeProjects}
            </Text>
          </View>
        </View>

        <View className={`flex-row items-center ${isMobile ? 'w-1/2 px-2 mb-4' : 'mb-4 flex-1'}`}>
          <View className="w-10 h-10 bg-purple-100 rounded-2xl items-center justify-center mr-3">
            <Ionicons name="trending-up" size={20} color="#8b5cf6" />
          </View>
          <View className="flex-1 min-w-0">
            <Text className="text-gray-500 text-sm">Net Profit</Text>
            <Text className={`font-bold text-lg ${
              overview.totalProfit >= 0 ? "text-green-600" : "text-red-600"
            }`}>
              ${Math.abs(overview.totalProfit).toLocaleString()}
            </Text>
          </View>
        </View>

        <View className={`flex-row items-center ${isMobile ? 'w-1/2 px-2 mb-4' : 'mb-4 flex-1'}`}>
          <View className="w-10 h-10 bg-orange-100 rounded-2xl items-center justify-center mr-3">
            <Ionicons name="time" size={20} color="#f59e0b" />
          </View>
          <View className="flex-1 min-w-0">
            <Text className="text-gray-500 text-sm">Pending Actions</Text>
            <Text className="text-gray-900 font-bold text-lg">
              {overview.pendingRequests}
            </Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );

  // Main Content
  const renderContent = () => (
    <Animated.View 
      style={{ 
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
        flex: 1 
      }}
    >
      {/* Premium Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className={`rounded-3xl mx-4 ${isMobile ? 'p-6 mb-6' : 'p-8 mb-8'}`}
      >
        <Animated.View 
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <Text className={`text-white ${isMobile ? 'text-2xl' : 'text-3xl'} font-bold mb-2`}>
            Welcome back! 👋
          </Text>
          <Text className="text-white/80 text-lg mb-6">
            Here's what's happening with {companyName} today.
          </Text>
          
          {/* Quick Stats in Header */}
          <View className={`flex-row ${isMobile ? 'flex-wrap -mx-1' : 'space-x-4'}`}>
            <View className={`bg-white/20 rounded-2xl ${isMobile ? 'p-3 mx-1 mb-2 flex-1 min-w-20' : 'px-4 py-3'}`}>
              <Text className="text-white/70 text-xs">Active Projects</Text>
              <Text className="text-white text-lg font-bold">{overview.activeProjects}</Text>
            </View>
            <View className={`bg-white/20 rounded-2xl ${isMobile ? 'p-3 mx-1 mb-2 flex-1 min-w-20' : 'px-4 py-3'}`}>
              <Text className="text-white/70 text-xs">Net Profit</Text>
              <Text className="text-white text-lg font-bold">
                ${Math.abs(overview.totalProfit).toLocaleString()}
              </Text>
            </View>
            <View className={`bg-white/20 rounded-2xl ${isMobile ? 'p-3 mx-1 mb-2 flex-1 min-w-20' : 'px-4 py-3'}`}>
              <Text className="text-white/70 text-xs">Team Members</Text>
              <Text className="text-white text-lg font-bold">{overview.totalShareholders}</Text>
            </View>
          </View>
        </Animated.View>
      </LinearGradient>

      {/* Fixed Metrics Grid */}
      <View className="mx-4 mb-6">
        <Text className="text-xl font-bold text-gray-900 mb-4 ml-2">Key Metrics</Text>
        <View className={`flex-row flex-wrap -mx-2`}>
          {stats.map((stat, index) => (
            <View 
              key={stat.label}
              className={`
                ${isMobile ? 'w-full' : isTablet ? 'w-1/2' : 'w-1/3'} 
                px-2 mb-4
              `}
            >
              <MetricCard {...stat} />
            </View>
          ))}
        </View>
      </View>

      {/* Quick Stats Section - Fixed Alignment */}
      <View className="mx-4 mb-6">
        <QuickStatsCard />
      </View>

      {/* Coming Soon Section - Fixed Alignment */}
      <View className="mx-4">
        <Animated.View 
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
          className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-6 border border-gray-200"
        >
          <View className="flex-row items-center mb-3">
            <View className="w-10 h-10 bg-blue-500 rounded-2xl items-center justify-center mr-3">
              <Ionicons name="rocket" size={20} color="white" />
            </View>
            <View className="flex-1 min-w-0">
              <Text className="text-lg font-bold text-gray-900">
                Advanced Analytics
              </Text>
              <Text className="text-gray-600">
                Detailed charts and insights coming soon
              </Text>
            </View>
          </View>
          
          <View className="flex-row flex-wrap -mx-2">
            <View className={`${isMobile ? 'w-1/2' : 'w-1/4'} px-2 mb-2`}>
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                <Text className="text-gray-600 text-sm">Revenue Charts</Text>
              </View>
            </View>
            <View className={`${isMobile ? 'w-1/2' : 'w-1/4'} px-2 mb-2`}>
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                <Text className="text-gray-600 text-sm">Growth Metrics</Text>
              </View>
            </View>
            <View className={`${isMobile ? 'w-1/2' : 'w-1/4'} px-2 mb-2`}>
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
                <Text className="text-gray-600 text-sm">Team Performance</Text>
              </View>
            </View>
            <View className={`${isMobile ? 'w-1/2' : 'w-1/4'} px-2 mb-2`}>
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-orange-500 rounded-full mr-2" />
                <Text className="text-gray-600 text-sm">Investment Trends</Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </View>

      {/* Bottom spacing */}
      <View className="h-8" />
    </Animated.View>
  );

  // Loading State
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <View className="items-center">
          <ActivityIndicator size="large" color={COLORS.accent} />
          <Text className="text-gray-500 mt-4 text-lg font-medium">
            Loading company overview...
          </Text>
          <Text className="text-gray-400 mt-2">
            Preparing your dashboard
          </Text>
        </View>
      </View>
    );
  }

  // Web Version
  if (Platform.OS === "web") {
    return (
      <View className="flex flex-col h-screen bg-gray-50">
        <ScrollView 
          className="flex-1"
          contentContainerStyle={{ 
            paddingBottom: 40 
          }}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh}
              colors={[COLORS.accent]}
              tintColor={COLORS.accent}
            />
          }
          showsVerticalScrollIndicator={false}
        >
          {renderContent()}
        </ScrollView>
      </View>
    );
  }

  // Mobile Version
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ 
            paddingBottom: 40 
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh}
              colors={[COLORS.accent]}
              tintColor={COLORS.accent}
            />
          }
        >
          {renderContent()}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}