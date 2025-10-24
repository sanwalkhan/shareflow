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
} from "react-native";
import { Feather } from "@expo/vector-icons";

import ShareholderSidebar from "../../components/shareholder/ShareholderSidebar";
import ShareholderOverview from "../../components/shareholder/ShareholderOverview"; // ✅ correct import
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

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  // 🧾 Preload demo notifications
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

    setIsSidebarCollapsed(next);
  };

  const handleLogout = () => {
    Alert.alert("Logout Confirmation", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => navigation.navigate("Signin"),
      },
    ]);
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
        return <ShareholderOverview />; // ✅ no props now
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

  const HeaderBar = () => (
    <View className="bg-white border-b border-gray-200 shadow-sm px-4 py-4 flex-row items-center justify-between">
      <View className="flex-1 mr-3">
        <Text className="text-gray-900 mb-1 font-extrabold text-xl">
          {sidebarItems.find((i) => i.id === activeModule)?.label}
        </Text>
        <Text className="text-gray-500 text-sm font-medium">
          24Loops •{" "}
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

        {/* Avatar / Logout */}
        <TouchableOpacity
          className="ml-4 w-9 h-9 rounded-xl bg-green-500 justify-center items-center"
          onPress={handleLogout}
        >
          <Text className="text-white font-bold">SC</Text>
        </TouchableOpacity>

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

      {/* Main Content */}
      <View className="flex-1">
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            flex: 1,
          }}
        >
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
              showsHorizontalScrollIndicator={false}
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
    </View>
  );
}
