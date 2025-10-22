import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Animated,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Alert,
  useWindowDimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";

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
import { COLORS } from "../../constants/theme";

interface DashboardScreenProps {
  navigation: any;
}

const DEMO_DATA = {
  shareholder: {
    name: "Sarah Chen",
    company: "TechNova Solutions",
    equity: 12.5,
    totalInvestment: 250000,
    dividendsReceived: 12000,
    roi: 18.4,
  },
};

export default function ShareholderDashboardScreen({ navigation }: DashboardScreenProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(isMobile);
  const [activeModule, setActiveModule] = useState("overview");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

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

  // 🧾 Preload demo notifications (as if sent by admin)
  useEffect(() => {
    addNotification({
      id: "1",
      title: "Investment Request Approved",
      message: "Your recent investment request of $50,000 has been approved by the admin.",
      type: "approval",
      date: "Oct 15, 2025, 09:42 AM",
      isRead: false,
    });

    addNotification({
      id: "2",
      title: "Dividend Payment Processed",
      message: "Your Q3 dividend payment of $3,200 has been processed successfully.",
      type: "general",
      date: "Oct 12, 2025, 02:17 PM",
      isRead: false,
    });

    addNotification({
      id: "3",
      title: "Investment Request Rejected",
      message:
        "Your investment request of $25,000 for 'Marketing Expansion' was rejected by the admin.",
      type: "approval",
      date: "Oct 09, 2025, 11:08 AM",
      isRead: true,
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
      { text: "Logout", style: "destructive", onPress: () => navigation.navigate("Landing") },
    ]);
  };

  // 💼 Shareholder submits investment request (no notification to self)
  const handleInvestmentRequest = (amount: number, description: string) => {
    Alert.alert(
      "Request Sent",
      "Your investment request has been submitted for admin approval."
    );
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
        return <ShareholderOverview data={DEMO_DATA} />;
      case "investments":
        return <InvestmentsModule />;
      case "requests":
        return (
          <InvestmentRequestsModule
            onSubmitRequest={(amount: number, description: string) =>
              handleInvestmentRequest(amount, description)
            }
          />
        );
      case "dividends":
        return <DividendsModule />;
      case "reports":
        return <ReportsModule />;
      case "settings":
        return <SettingsModule />;
      default:
        return <ShareholderOverview data={DEMO_DATA} />;
    }
  };

  const HeaderBar = () => (
    <View className="bg-white border-b border-gray-200 shadow-sm px-4 py-4 flex-row items-center justify-between">
      <View className="flex-1 mr-3">
        <Text className="text-gray-900 mb-1 font-extrabold text-xl">
          {sidebarItems.find((i) => i.id === activeModule)?.label}
        </Text>
        <Text className="text-gray-500 text-sm font-medium">
          {DEMO_DATA.shareholder.company} •{" "}
          {new Date().toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </Text>
      </View>

      <View className="flex-row items-center">
        {/* 🔔 Notification Bell */}
        <NotificationBell
          count={notifications.filter((n) => !n.isRead).length}
          onPress={() => setIsNotificationModalOpen(true)}
        />

        {/* Theme Toggle */}
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
            <Feather
              name={isDarkMode ? "moon" : "sun"}
              size={isMobile ? 14 : 16}
              color="#FFFFFF"
            />
          </View>
        </TouchableOpacity>

        {/* Avatar */}
        <TouchableOpacity
          className="ml-4 w-9 h-9 rounded-xl bg-green-500 justify-center items-center"
        >
          <Text className="text-white font-bold">SC</Text>
        </TouchableOpacity>

        {/* Sidebar toggle (mobile) */}
        {isMobile && (
          <TouchableOpacity
            onPress={toggleSidebar}
            className="bg-gray-100 rounded-full justify-center items-center ml-3 w-8 h-8"
          >
            <Feather
              name={isSidebarCollapsed ? "menu" : "x"}
              size={18}
              color="#374151"
            />
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

      {/* Main */}
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
