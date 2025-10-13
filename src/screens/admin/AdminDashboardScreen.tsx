// src/screens/admin/AdminDashboardScreen.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
  TextInput,
  Alert,
  Modal,
} from "react-native";
import { Feather } from "@expo/vector-icons";

// Admin Components
import Sidebar from "../../components/admin/Sidebar";
import Overview from "../../components/admin/Overview";
import ExpensesModule from "../../components/admin/ExpensesModule";
import PayrollModule from "../../components/admin/PayrollModule";
import ShareholdersModule from "../../components/admin/ShareholdersModule";
import ReportsModule from "../../components/admin/ReportsModule";
import SettingsModule from "../../components/admin/SettingsModule";

// UI Components
import Button from "../../UI/Button";
import Card from "../../UI/Card";
import Input from "../../UI/Input";
import MyModal from "../../UI/Modal";

const { width } = Dimensions.get("window");

interface DashboardScreenProps {
  navigation: any;
}

// Demo Data
const DEMO_DATA = {
  company: {
    name: "TechNova Solutions",
    industry: "Technology",
    employees: 47,
    founded: 2018,
    revenue: 2456780,
    growth: 12.5,
  },
  financials: {
    revenue: {
      current: 2456780,
      previous: 2183450,
      trend: "up",
    },
    expenses: {
      current: 452300,
      previous: 467800,
      trend: "down",
    },
    profit: {
      current: 845920,
      previous: 712340,
      trend: "up",
    },
    cashFlow: {
      current: 324560,
      previous: 287650,
      trend: "up",
    },
  },
  expenses: [
    { id: 1, category: "Salaries", amount: 245000, percentage: 54, trend: "up", color: "#86C232" },
    { id: 2, category: "Operations", amount: 87300, percentage: 19, trend: "stable", color: "#3A7CA5" },
    { id: 3, category: "Marketing", amount: 45600, percentage: 10, trend: "up", color: "#F9C80E" },
    { id: 4, category: "R&D", amount: 38900, percentage: 9, trend: "up", color: "#8B5CF6" },
    { id: 5, category: "Other", amount: 35500, percentage: 8, trend: "down", color: "#6B7280" },
  ],
  recentTransactions: [
    { id: 1, type: "revenue", description: "Q3 Product Sales", amount: 125000, date: "2024-03-15", status: "completed" },
    { id: 2, type: "expense", description: "Team Offsite", amount: -15000, date: "2024-03-14", status: "completed" },
    { id: 3, type: "revenue", description: "Enterprise Contract", amount: 75000, date: "2024-03-12", status: "pending" },
    { id: 4, type: "expense", description: "Software Licenses", amount: -12000, date: "2024-03-10", status: "completed" },
    { id: 5, type: "revenue", description: "Consulting Services", amount: 45000, date: "2024-03-08", status: "completed" },
  ],
};

export default function AdminDashboardScreen({ navigation }: DashboardScreenProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeModule, setActiveModule] = useState("overview");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const sidebarWidth = useRef(new Animated.Value(280)).current;
  const sidebarOpacity = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      const toValue = next ? 80 : 280;
      const opacityValue = next ? 0.7 : 1;

      Animated.parallel([
        Animated.spring(sidebarWidth, {
          toValue,
          friction: 8,
          tension: 40,
          useNativeDriver: false,
        }),
        Animated.timing(sidebarOpacity, {
          toValue: opacityValue,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();

      return next;
    });
  };

  const handleLogout = () => {
    Alert.alert("Logout Confirmation", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => navigation.navigate("Landing"),
      },
    ]);
  };

  const sidebarItems = [
    { id: "overview", icon: "home", label: "Dashboard", color: "#86C232" },
    { id: "expenses", icon: "credit-card", label: "Expenses", color: "#8B5CF6" },
    { id: "payroll", icon: "users", label: "Payroll", color: "#06B6D4" },
    { id: "shareholders", icon: "pie-chart", label: "Shareholders", color: "#10B981" },
    { id: "reports", icon: "bar-chart-2", label: "Analytics", color: "#F59E0B" },
    { id: "settings", icon: "settings", label: "Settings", color: "#6B7280" },
  ];

  const renderModuleContent = () => {
    switch (activeModule) {
      case "overview":
        return <Overview data={DEMO_DATA} />;
      case "expenses":
        return <ExpensesModule />;
      case "payroll":
        return <PayrollModule />;
      case "shareholders":
        return <ShareholdersModule />;
      case "reports":
        return <ReportsModule />;
      case "settings":
        return <SettingsModule />;
      default:
        return <Overview data={DEMO_DATA} />;
    }
  };

  return (
    <View className="flex-1 flex-row bg-white">
      {/* Sidebar */}
     {/* Sidebar */}
<View className="relative">
  <Animated.View
    className="bg-gray-800 shadow-xl z-40"
    style={{
      width: sidebarWidth,
      opacity: sidebarOpacity,
    }}
  >
    <Sidebar
      isCollapsed={isSidebarCollapsed}
      onToggle={toggleSidebar}
      activeModule={activeModule}
      setActiveModule={setActiveModule}
    />
  </Animated.View>

  {/* Floating Toggle Button */}
  <TouchableOpacity
    onPress={toggleSidebar}
    activeOpacity={0.8}
    className="absolute -right-3 top-0 w-8 h-8 bg-gray-800 rounded-full border border-gray-600 justify-center items-center z-50"
  >
    <Feather
      name={isSidebarCollapsed ? "chevron-right" : "chevron-left"}
      size={18}
      color="#FFFFFF"
    />
  </TouchableOpacity>
</View>


      {/* Main Content */}
      <View className="flex-1 bg-gray-50">
        {/* Header */}
        <View className="bg-white border-b border-gray-200 shadow-sm">
          <View className="px-6 py-5 flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-2xl font-extrabold text-gray-900 mb-1">
                {sidebarItems.find((item) => item.id === activeModule)?.label}
              </Text>
              <Text className="text-gray-500 text-sm font-medium">
                {DEMO_DATA.company.name} •{" "}
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </View>

            {/* Header Actions */}
            <View className="flex-row items-center">
              {/* Search */}
              <View className="flex-row items-center bg-white px-4 py-2.5 rounded-xl border border-gray-200 min-w-72 shadow-sm mr-4">
                <Feather name="search" size={18} color="#6B7280" />
                <TextInput
                  placeholder="Search transactions, reports..."
                  placeholderTextColor="#9CA3AF"
                  className="flex-1 ml-3 mr-2 text-sm text-gray-900"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                {searchQuery && (
                  <TouchableOpacity onPress={() => setSearchQuery("")}>
                    <Feather name="x" size={16} color="#6B7280" />
                  </TouchableOpacity>
                )}
              </View>

              {/* Date Range */}
              <TouchableOpacity className="flex-row items-center bg-white px-3.5 py-2.5 rounded-lg border border-gray-200 shadow-sm mr-4">
                <Feather name="calendar" size={16} color="#6B7280" />
                <Text className="text-gray-900 text-sm font-semibold mx-2">Q1 2024</Text>
                <Feather name="chevron-down" size={14} color="#6B7280" />
              </TouchableOpacity>

              {/* Notifications */}
              <TouchableOpacity className="relative w-11 h-11 rounded-xl bg-white justify-center items-center border border-gray-200 shadow-sm mr-4">
                <Feather name="bell" size={18} color="#6B7280" />
                <View className="absolute top-2 right-2 w-4.5 h-4.5 rounded-full bg-red-500 justify-center items-center">
                  <Text className="text-white text-xs font-bold">3</Text>
                </View>
              </TouchableOpacity>

              {/* Theme Toggle */}
              <TouchableOpacity
                className="w-11 h-11 rounded-xl overflow-hidden shadow-sm mr-4"
                onPress={() => setIsDarkMode(!isDarkMode)}
              >
                <View
                  className={`w-full h-full justify-center items-center rounded-xl ${
                    isDarkMode ? "bg-gray-600" : "bg-yellow-400"
                  }`}
                >
                  <Feather name={isDarkMode ? "moon" : "sun"} size={16} color="#FFFFFF" />
                </View>
              </TouchableOpacity>

              {/* Profile */}
              <TouchableOpacity
                className="ml-2 shadow-sm"
                onPress={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              >
                <View className="w-11 h-11 rounded-xl bg-green-500 justify-center items-center">
                  <Text className="text-white font-bold text-base">SC</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Profile Modal */}
        <Modal
          visible={isProfileDropdownOpen}
          transparent
          animationType="fade"
          onRequestClose={() => setIsProfileDropdownOpen(false)}
        >
          <TouchableOpacity
            className="flex-1 bg-black/40 justify-start items-end pt-24 pr-6"
            activeOpacity={1}
            onPress={() => setIsProfileDropdownOpen(false)}
          >
            <View className="bg-white rounded-2xl w-80 shadow-xl overflow-hidden">
              <View className="p-6 bg-green-500 flex-row items-center">
                <View className="w-15 h-15 rounded-2xl bg-white/20 justify-center items-center mr-4">
                  <Text className="text-white font-bold text-lg">SC</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-white text-lg font-bold mb-0.5">Sarah Chen</Text>
                  <Text className="text-white/90 text-sm font-semibold mb-0.5">
                    Chief Technology Officer
                  </Text>
                  <Text className="text-white/70 text-xs font-medium">
                    {DEMO_DATA.company.name}
                  </Text>
                </View>
              </View>

              <View className="p-4">
                <TouchableOpacity className="flex-row items-center py-3.5 px-3 rounded-lg">
                  <Feather name="user" size={18} color="#6B7280" />
                  <Text className="flex-1 text-gray-900 text-base font-medium ml-3">
                    My Profile
                  </Text>
                  <Feather name="chevron-right" size={16} color="#6B7280" />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row items-center py-3.5 px-3 rounded-lg">
                  <Feather name="settings" size={18} color="#6B7280" />
                  <Text className="flex-1 text-gray-900 text-base font-medium ml-3">
                    Company Settings
                  </Text>
                  <Feather name="chevron-right" size={16} color="#6B7280" />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row items-center py-3.5 px-3 rounded-lg">
                  <Feather name="credit-card" size={18} color="#6B7280" />
                  <Text className="flex-1 text-gray-900 text-base font-medium ml-3">
                    Billing & Plans
                  </Text>
                  <Feather name="chevron-right" size={16} color="#6B7280" />
                </TouchableOpacity>

                <View className="h-px bg-gray-100 my-2" />

                <TouchableOpacity
                  className="flex-row items-center py-3.5 px-3 rounded-lg mt-1"
                  onPress={handleLogout}
                >
                  <Feather name="log-out" size={18} color="#ef4444" />
                  <Text className="flex-1 text-red-500 text-base font-semibold ml-3">
                    Logout
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Main Module */}
        <View className="flex-1 overflow-scroll">{renderModuleContent()}</View>
      </View>
    </View>
  );
}
