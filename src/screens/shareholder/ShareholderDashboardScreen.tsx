import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Alert,
  useWindowDimensions,
  Modal,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ShareholderSidebar from "../../components/shareholder/ShareholderSidebar";
import ShareholderOverview from "../../components/shareholder/ShareholderOverview";
import InvestmentsModule from "../../components/shareholder/InvestmentsModule";
import InvestmentRequestsModule from "../../components/shareholder/InvestmentRequestsModule";
import DividendsModule from "../../components/shareholder/DividendsModule";
import ReportsModule from "../../components/admin/ReportsModule";
import SettingsModule from "../../components/admin/SettingsModule";
import NotificationBell from "../../components/notifications/NotificationBell";
import NotificationModal from "../../components/notifications/NotificationModal";
import { useNotifications } from "../../components/notifications/useNotifications";

interface DashboardScreenProps {
  navigation: any;
}

export default function ShareholderDashboardScreen({ navigation }: DashboardScreenProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(isMobile);
  const [activeModule, setActiveModule] = useState("overview");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [companyData, setCompanyData] = useState<any>(null);

  // 🔔 Notifications
  const { notifications, addNotification, markAsRead, clearAll } = useNotifications();

  // 🧩 Sidebar animation
  const getSidebarWidth = () => {
    if (isMobile) return width * 0.85;
    if (isTablet) return 280;
    return 300;
  };

  const sidebarWidth = useRef(new Animated.Value(isMobile ? 0 : getSidebarWidth())).current;
  const sidebarOpacity = useRef(new Animated.Value(isMobile ? 0 : 1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // 🌟 Load user data from AsyncStorage
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const data = await AsyncStorage.getItem("userData");
      if (data) {
        const parsed = JSON.parse(data);
        setUserData(parsed);
        setCompanyData(parsed.company);
        console.log("👤 Shareholder loaded:", parsed);
      }
    } catch (err) {
      console.error("Error loading user data:", err);
    }
  };

  // 🌟 Animations on mount
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  // Demo notification
  useEffect(() => {
    addNotification({
      id: "1",
      title: "Investment Request Approved",
      message: "Your recent investment request of $1,000 has been approved.",
      type: "approval",
      date: "Oct 23, 2025, 09:00 AM",
      isRead: false,
    });
  }, []);

  const toggleSidebar = () => {
    const next = !isSidebarCollapsed;
    const toValue = next ? 0 : getSidebarWidth();
    const opacityValue = next ? 0 : 1;

    Animated.parallel([
      Animated.spring(sidebarWidth, { toValue, friction: 8, tension: 40, useNativeDriver: false }),
      Animated.timing(sidebarOpacity, { toValue: opacityValue, duration: 300, useNativeDriver: false }),
    ]).start();

    setIsSidebarCollapsed(next);
  };

  // 🚪 Logout logic
  const handleLogoutClick = () => {
    setIsProfileDropdownOpen(false);
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = async () => {
    try {
      await AsyncStorage.clear();
      if (Platform.OS === "web") {
        localStorage.clear();
        window.location.reload();
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: "Signin" }],
        });
      }
    } catch (err) {
      console.error("Logout error:", err);
      Alert.alert("Error", "Failed to logout. Please try again.");
    }
  };

  const sidebarItems = [
    { id: "overview", icon: "home", label: "Overview" },
    { id: "investments", icon: "trending-up", label: "My Investments" },
    { id: "requests", icon: "file-plus", label: "Investment Requests" },
    { id: "dividends", icon: "dollar-sign", label: "Dividends" },
    { id: "reports", icon: "bar-chart-2", label: "Reports" },
    { id: "settings", icon: "settings", label: "Settings" },
  ];

  const renderModuleContent = () => {
    switch (activeModule) {
      case "overview":
        return <ShareholderOverview />;
      case "investments":
        return <InvestmentsModule />;
      case "requests":
        return <InvestmentRequestsModule />;
      case "dividends":
        return <DividendsModule />;
      case "reports":
        return <ReportsModule />;
      case "settings":
        return <SettingsModule />;
      default:
        return <ShareholderOverview />;
    }
  };

  // ────────────────────────────────
  // Header Bar with Profile Dropdown
  // ────────────────────────────────
  const HeaderBar = () => (
    <View className="bg-white border-b border-gray-200 shadow-sm px-4 py-4 flex-row items-center justify-between">
      <View className="flex-1 mr-3">
        <Text className="text-gray-900 mb-1 font-extrabold text-xl">
          {sidebarItems.find((i) => i.id === activeModule)?.label}
        </Text>
        <Text className="text-gray-500 text-sm font-medium">
          {companyData?.name || "My Company"} •{" "}
          {new Date().toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </Text>
      </View>

      <View className="flex-row items-center">
        <NotificationBell
          count={notifications.filter((n) => !n.isRead).length}
          onPress={() => setIsNotificationModalOpen(true)}
        />

        {/* Theme toggle */}
        <TouchableOpacity
          className="rounded-xl overflow-hidden shadow-sm ml-4"
          onPress={() => setIsDarkMode(!isDarkMode)}
          style={{
            width: isMobile ? 36 : 40,
            height: isMobile ? 36 : 40,
          }}
        >
          <View
            className={`w-full h-full justify-center items-center ${
              isDarkMode ? "bg-gray-600" : "bg-yellow-400"
            }`}
          >
            <Feather name={isDarkMode ? "moon" : "sun"} size={isMobile ? 14 : 16} color="#FFFFFF" />
          </View>
        </TouchableOpacity>

        {/* Profile Avatar */}
        <TouchableOpacity
          onPress={() => setIsProfileDropdownOpen(true)}
          className="ml-4 w-9 h-9 rounded-xl bg-green-500 justify-center items-center"
        >
          <Text className="text-white font-bold">
            {userData?.firstName?.charAt(0)?.toUpperCase() || "U"}
          </Text>
        </TouchableOpacity>

        {/* Sidebar toggle on mobile */}
        {isMobile && (
          <TouchableOpacity
            onPress={toggleSidebar}
            className="bg-gray-100 rounded-full justify-center items-center ml-3 w-8 h-8"
          >
            <Feather name={isSidebarCollapsed ? "menu" : "x"} size={18} color="#374151" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View className="flex-1 flex-row bg-gray-50">
      {/* Sidebar */}
      <Animated.View
        className="bg-gray-800 shadow-xl z-40"
        style={[
          { width: sidebarWidth, opacity: sidebarOpacity },
          isMobile && { position: "absolute", left: 0, top: 0, bottom: 0, zIndex: 50 },
        ]}
      >
        <ShareholderSidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={toggleSidebar}
          activeModule={activeModule}
          setActiveModule={setActiveModule}
          isMobile={isMobile}
        />
      </Animated.View>

      {/* Main content */}
      <View className="flex-1">
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }], flex: 1 }}>
          <HeaderBar />

          <KeyboardAvoidingView
            className="flex-1"
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                padding: isMobile ? 16 : 24,
              }}
              showsVerticalScrollIndicator={false}
            >
              {renderModuleContent()}
            </ScrollView>
          </KeyboardAvoidingView>
        </Animated.View>
      </View>

      {/* 🔔 Notification Modal */}
      <NotificationModal
        visible={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        notifications={notifications}
        onMarkAsRead={markAsRead}
        onClearAll={clearAll}
      />

      {/* 👤 Profile Dropdown */}
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
                  {userData?.firstName?.charAt(0)?.toUpperCase() || "U"}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-white text-lg font-bold mb-0.5">
                  {`${userData?.firstName || ""} ${userData?.lastName || ""}`.trim() || "User"}
                </Text>
                <Text className="text-white/90 text-sm font-semibold mb-0.5">
                  {userData?.role || "Shareholder"}
                </Text>
                <Text className="text-white/70 text-xs font-medium">
                  {companyData?.name || "Company"}
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

      {/* 🔐 Logout Confirmation */}
      <Modal
        visible={isLogoutModalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsLogoutModalOpen(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center p-6">
          <View className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
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
