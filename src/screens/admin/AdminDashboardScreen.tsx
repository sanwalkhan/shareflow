import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Animated,
  Dimensions,
  Modal,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Alert,
  useWindowDimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Sidebar from "../../components/admin/Sidebar";
import Overview from "../../components/admin/Overview";
import ExpensesModule from "../../components/admin/ExpensesModule";
import PayrollModule from "../../components/admin/PayrollModule";
import ShareholdersModule from "../../components/admin/ShareholdersModule";
import InvestmentRequestsModule from "../../components/admin/InvestmentRequestsModule";
import ReportsModule from "../../components/admin/ReportsModule";
import SettingsModule from "../../components/admin/SettingsModule";
import { COLORS, WINDOW } from "../../constants/theme";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface DashboardScreenProps {
  navigation: any;
}

const DEMO_DATA = {
  company: {
    name: "TechNova Solutions",
    industry: "Technology",
    employees: 47,
    founded: 2018,
    revenue: 2456780,
    growth: 12.5,
  },
};

export default function AdminDashboardScreen({ navigation }: DashboardScreenProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 900;

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(isMobile);
  const [activeModule, setActiveModule] = useState("overview");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState<any>(null);
  const [companyData, setCompanyData] = useState<any>(null);

  const sidebarWidth = useRef(new Animated.Value(isMobile ? 0 : 280)).current;
  const sidebarOpacity = useRef(new Animated.Value(isMobile ? 0 : 1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const user = JSON.parse(userDataString);
        setUserData(user);
        setCompanyData(user.company);
        console.log('👤 User loaded:', user);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const toggleSidebar = () => {
    const next = !isSidebarCollapsed;
    const toValue = next ? 0 : 280;
    const opacityValue = next ? 0 : 1;
    Animated.parallel([
      Animated.spring(sidebarWidth, { toValue, friction: 8, tension: 40, useNativeDriver: false }),
      Animated.timing(sidebarOpacity, { toValue: opacityValue, duration: 300, useNativeDriver: false }),
    ]).start();
    setIsSidebarCollapsed(next);
  };

  const handleLogoutClick = () => {
    setIsProfileDropdownOpen(false);
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = async () => {
    try {
      // Clear AsyncStorage
      await AsyncStorage.clear();
      console.log('✅ AsyncStorage cleared');

      // For web: clear localStorage
      if (Platform.OS === 'web') {
        localStorage.clear();
        console.log('✅ localStorage cleared');
        
        // Reload the page
        window.location.reload();
      } else {
        // For mobile: navigate to landing
        navigation.reset({
          index: 0,
          routes: [{ name: 'Landing' }],
        });
      }
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  const sidebarItems = [
    { id: "overview", icon: "home", label: "Dashboard" },
    { id: "expenses", icon: "credit-card", label: "Expenses" },
    { id: "payroll", icon: "users", label: "Payroll" },
    { id: "shareholders", icon: "pie-chart", label: "Shareholders" },
    { id: "investment-requests", icon: "dollar-sign", label: "Investment Requests" },
    { id: "reports", icon: "bar-chart-2", label: "Analytics" },
    { id: "settings", icon: "settings", label: "Settings" },
  ];

  const renderModuleContent = () => {
    switch (activeModule) {
      case "overview":
        return <Overview data={companyData} />;
      case "expenses":
        return <ExpensesModule />;
      case "payroll":
        return <PayrollModule />;
      case "shareholders":
        return <ShareholdersModule />;
      case "investment-requests":
        return <InvestmentRequestsModule />;
      case "reports":
        return <ReportsModule />;
      case "settings":
        return <SettingsModule />;
      default:
        return <Overview data={companyData} />;
    }
  };

  // ──────────────────────────────
  // 🌐 WEB & 📱 MOBILE Responsive UI
  // ──────────────────────────────
  const HeaderBar = () => (
    <View className="bg-white border-b border-gray-200 shadow-sm px-6 py-5 flex-row items-center justify-between">
      <View className="flex-1">
        <Text className="text-2xl font-extrabold text-gray-900 mb-1">
          {sidebarItems.find((i) => i.id === activeModule)?.label}
        </Text>
        <Text className="text-gray-500 text-sm font-medium">
          {companyData?.name} •{" "}
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
      </View>

      {/* Right Actions */}
      <View className="flex-row items-center">
        {/* Search */}
        {!isMobile && (
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
        )}

        {/* Theme toggle */}
        <TouchableOpacity
          className="w-10 h-10 rounded-xl overflow-hidden shadow-sm mr-4"
          onPress={() => setIsDarkMode(!isDarkMode)}
        >
          <View
            className={`w-full h-full justify-center items-center ${
              isDarkMode ? "bg-gray-600" : "bg-yellow-400"
            }`}
          >
            <Feather name={isDarkMode ? "moon" : "sun"} size={16} color="#FFFFFF" />
          </View>
        </TouchableOpacity>

        {/* Profile */}
        <TouchableOpacity onPress={() => setIsProfileDropdownOpen(true)}>
          <View className="w-10 h-10 rounded-xl bg-green-500 justify-center items-center">
            <Text className="text-white font-bold text-sm">
              {userData?.name?.charAt(0)?.toUpperCase() || 'U'}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Sidebar toggle on mobile */}
        {isMobile && (
          <TouchableOpacity
            onPress={toggleSidebar}
            className="ml-3 bg-gray-100 rounded-full w-9 h-9 justify-center items-center"
          >
            <Feather
              name={isSidebarCollapsed ? "menu" : "x"}
              size={20}
              color="#374151"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View className="flex-1 flex-row bg-gray-50">
      {/* Sidebar (hidden/collapsible for mobile) */}
      {!isMobile && (
        <Animated.View
          className="bg-gray-800 shadow-xl z-40"
          style={{ width: sidebarWidth, opacity: sidebarOpacity }}
        >
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            onToggle={toggleSidebar}
            activeModule={activeModule}
            setActiveModule={setActiveModule}
          />
        </Animated.View>
      )}

      {/* Main content */}
      <View className="flex-1">
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            flex: 1,
          }}
        >
          <HeaderBar />

          {/* Scrollable area */}
          <KeyboardAvoidingView
            className="flex-1"
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <ScrollView
              className="flex-1"
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            >
              {renderModuleContent()}
            </ScrollView>
          </KeyboardAvoidingView>
        </Animated.View>
      </View>

      {/* Profile Dropdown */}
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
              <View className="w-14 h-14 rounded-2xl bg-white/20 justify-center items-center mr-4">
                <Text className="text-white font-bold text-lg">
                  {userData?.name?.charAt(0)?.toUpperCase() || 'U'}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-white text-lg font-bold mb-0.5">
                  {userData?.name || 'User'}
                </Text>
                <Text className="text-white/90 text-sm font-semibold mb-0.5">
                  {userData?.role || 'Administrator'}
                </Text>
                <Text className="text-white/70 text-xs font-medium">
                  {companyData?.name || 'Company'}
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

              <TouchableOpacity
                className="flex-row items-center py-3.5 px-3 rounded-lg mt-1"
                onPress={handleLogoutClick}
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

      {/* Logout Confirmation Modal */}
      <Modal
        visible={isLogoutModalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsLogoutModalOpen(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center p-6">
          <View className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
            {/* Icon Header */}
            <View className="items-center pt-8 pb-6 px-6">
              <View className="w-16 h-16 rounded-full bg-red-100 justify-center items-center mb-4">
                <Feather name="log-out" size={28} color="#ef4444" />
              </View>
              <Text className="text-2xl font-bold text-gray-900 mb-2">
                Logout Confirmation
              </Text>
              <Text className="text-gray-600 text-center text-base">
                Are you sure you want to logout? All your session data will be cleared.
              </Text>
            </View>

            {/* Action Buttons */}
            <View className="flex-row border-t border-gray-200">
              <TouchableOpacity
                className="flex-1 py-4 items-center border-r border-gray-200"
                onPress={() => setIsLogoutModalOpen(false)}
              >
                <Text className="text-gray-700 font-semibold text-base">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 py-4 items-center bg-red-50"
                onPress={handleLogoutConfirm}
              >
                <Text className="text-red-600 font-bold text-base">
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}