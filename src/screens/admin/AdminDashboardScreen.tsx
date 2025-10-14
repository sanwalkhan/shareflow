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
import ReportsModule from "../../components/admin/ReportsModule";
import SettingsModule from "../../components/admin/SettingsModule";
import { COLORS, WINDOW } from "../../constants/theme";

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
  const { width, height } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(isMobile);
  const [activeModule, setActiveModule] = useState("overview");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  // Responsive sidebar widths
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

  useEffect(() => {
    // Update sidebar width when screen size changes
    if (!isMobile && !isSidebarCollapsed) {
      Animated.parallel([
        Animated.spring(sidebarWidth, { 
          toValue: getSidebarWidth(), 
          friction: 8, 
          tension: 40, 
          useNativeDriver: false 
        }),
        Animated.timing(sidebarOpacity, { 
          toValue: 1, 
          duration: 300, 
          useNativeDriver: false 
        }),
      ]).start();
    }
  }, [width, isMobile]);

  const toggleSidebar = () => {
    if (isMobile) {
      // Mobile: toggle between hidden and full overlay
      const next = !isSidebarCollapsed;
      const toValue = next ? 0 : getSidebarWidth();
      const opacityValue = next ? 0 : 1;
      
      Animated.parallel([
        Animated.spring(sidebarWidth, { 
          toValue, 
          friction: 8, 
          tension: 40, 
          useNativeDriver: false 
        }),
        Animated.timing(sidebarOpacity, { 
          toValue: opacityValue, 
          duration: 300, 
          useNativeDriver: false 
        }),
      ]).start();
      setIsSidebarCollapsed(next);
    } else {
      // Desktop/Tablet: regular collapse/expand
      const next = !isSidebarCollapsed;
      const toValue = next ? 0 : getSidebarWidth();
      const opacityValue = next ? 0 : 1;
      
      Animated.parallel([
        Animated.spring(sidebarWidth, { 
          toValue, 
          friction: 8, 
          tension: 40, 
          useNativeDriver: false 
        }),
        Animated.timing(sidebarOpacity, { 
          toValue: opacityValue, 
          duration: 300, 
          useNativeDriver: false 
        }),
      ]).start();
      setIsSidebarCollapsed(next);
    }
  };

  const handleLogout = () => {
    Alert.alert("Logout Confirmation", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: () => navigation.navigate("Landing") },
    ]);
  };

  const sidebarItems = [
    { id: "overview", icon: "home", label: "Dashboard" },
    { id: "expenses", icon: "credit-card", label: "Expenses" },
    { id: "payroll", icon: "users", label: "Payroll" },
    { id: "shareholders", icon: "pie-chart", label: "Shareholders" },
    { id: "reports", icon: "bar-chart-2", label: "Analytics" },
    { id: "settings", icon: "settings", label: "Settings" },
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

  // Enhanced Responsive Header
  const HeaderBar = () => (
    <View 
      className="bg-white border-b border-gray-200 shadow-sm px-4 py-4 flex-row items-center justify-between"
      style={{
        paddingHorizontal: isMobile ? 16 : 24,
        paddingVertical: isMobile ? 12 : 20,
      }}
    >
      {/* Left Section - Title and Breadcrumb */}
      <View 
        className="flex-1"
        style={{
          marginRight: isMobile ? 12 : 24,
          maxWidth: isMobile ? "60%" : "auto",
        }}
      >
        <Text 
          className="text-gray-900 mb-1 font-extrabold"
          style={{
            fontSize: isMobile ? 20 : isTablet ? 22 : 24,
            lineHeight: isMobile ? 24 : 28,
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {sidebarItems.find((i) => i.id === activeModule)?.label}
        </Text>
        <Text 
          className="text-gray-500 font-medium"
          style={{
            fontSize: isMobile ? 12 : 14,
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {DEMO_DATA.company.name} •{" "}
          {new Date().toLocaleDateString("en-US", {
            weekday: isMobile ? "short" : "long",
            year: "numeric",
            month: isMobile ? "short" : "long",
            day: "numeric",
          })}
        </Text>
      </View>

      {/* Right Actions */}
      <View className="flex-row items-center flex-shrink-0">
        {/* Search Bar - Responsive Behavior */}
        {!isMobile ? (
          // Desktop/Tablet Search
          <View 
            className="flex-row items-center bg-white px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm mr-4"
            style={{
              minWidth: isTablet ? 200 : 280,
              marginRight: isTablet ? 16 : 24,
            }}
          >
            <Feather name="search" size={18} color="#6B7280" />
            <TextInput
              placeholder="Search transactions, reports..."
              placeholderTextColor="#9CA3AF"
              className="flex-1 ml-3 mr-2 text-gray-900"
              style={{
                fontSize: isTablet ? 14 : 16,
              }}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Feather name="x" size={16} color="#6B7280" />
              </TouchableOpacity>
            )}
          </View>
        ) : (
          // Mobile Search - Expandable
          <View className="flex-row items-center mr-3">
            {isSearchExpanded ? (
              <View className="flex-row items-center bg-white px-3 py-2 rounded-xl border border-gray-200 shadow-sm">
                <Feather name="search" size={16} color="#6B7280" />
                <TextInput
                  placeholder="Search..."
                  placeholderTextColor="#9CA3AF"
                  className="flex-1 ml-2 mr-2 text-gray-900"
                  style={{ fontSize: 14, width: 120 }}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  autoFocus
                />
                <TouchableOpacity 
                  onPress={() => {
                    setSearchQuery("");
                    setIsSearchExpanded(false);
                  }}
                >
                  <Feather name="x" size={14} color="#6B7280" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity 
                onPress={() => setIsSearchExpanded(true)}
                className="bg-gray-100 rounded-full w-8 h-8 justify-center items-center"
              >
                <Feather name="search" size={16} color="#374151" />
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Theme Toggle */}
        <TouchableOpacity
          className="rounded-xl overflow-hidden shadow-sm mr-4"
          onPress={() => setIsDarkMode(!isDarkMode)}
          style={{
            width: isMobile ? 36 : 40,
            height: isMobile ? 36 : 40,
            marginRight: isMobile ? 12 : 16,
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

        {/* Profile Avatar */}
        <TouchableOpacity 
          onPress={() => setIsProfileDropdownOpen(true)}
          style={{
            width: isMobile ? 36 : 40,
            height: isMobile ? 36 : 40,
          }}
        >
          <View className="w-full h-full rounded-xl bg-green-500 justify-center items-center">
            <Text 
              className="text-white font-bold"
              style={{ fontSize: isMobile ? 12 : 14 }}
            >
              SC
            </Text>
          </View>
        </TouchableOpacity>

        {/* Sidebar toggle on mobile/tablet */}
        {(isMobile || isTablet) && (
          <TouchableOpacity
            onPress={toggleSidebar}
            className="bg-gray-100 rounded-full justify-center items-center ml-3"
            style={{
              width: isMobile ? 32 : 36,
              height: isMobile ? 32 : 36,
              marginLeft: isMobile ? 8 : 12,
            }}
          >
            <Feather
              name={isSidebarCollapsed ? "menu" : "x"}
              size={isMobile ? 18 : 20}
              color="#374151"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View className="flex-1 flex-row bg-gray-50">
      {/* Sidebar - Enhanced Responsive Behavior */}
      <Animated.View
        className="bg-gray-800 shadow-xl z-40"
        style={[
          { 
            width: sidebarWidth, 
            opacity: sidebarOpacity,
          },
          isMobile && {
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: 50,
          }
        ]}
      >
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={toggleSidebar}
          activeModule={activeModule}
          setActiveModule={setActiveModule}
          isMobile={isMobile}
        />
      </Animated.View>

      {/* Mobile Sidebar Backdrop */}
      {isMobile && !isSidebarCollapsed && (
        <TouchableOpacity
          className="absolute inset-0 bg-black/50 z-30"
          onPress={toggleSidebar}
          activeOpacity={1}
        />
      )}

      {/* Main Content Area */}
      <View 
        className="flex-1"
        style={{
          marginLeft: 0,
          width: isMobile
            ? '100%'
            : isSidebarCollapsed
              ? '100%'
              : width - getSidebarWidth(),
        }}
      >
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            flex: 1,
          }}
        >
          <HeaderBar />

          {/* Scrollable Content Area */}
          <KeyboardAvoidingView
            className="flex-1"
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
          >
            <ScrollView
              className="flex-1"
              contentContainerStyle={{ 
                flexGrow: 1,
                paddingBottom: isMobile ? 20 : 40,
              }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View 
                style={{
                  paddingHorizontal: isMobile ? 16 : 24,
                  paddingVertical: isMobile ? 16 : 24,
                }}
              >
                {renderModuleContent()}
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </Animated.View>
      </View>

      {/* Enhanced Responsive Profile Dropdown */}
      <Modal
        visible={isProfileDropdownOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsProfileDropdownOpen(false)}
        statusBarTranslucent
      >
        <TouchableOpacity
          className="flex-1 bg-black/40 justify-start items-end"
          style={[
            { paddingTop: Platform.OS === 'web' ? 0 : (isMobile ? 60 : 100) },
            isMobile ? { justifyContent: 'flex-start', alignItems: 'center', padding: 16 } : { justifyContent: 'flex-start', alignItems: 'flex-end', paddingRight: 24 }
          ]}
          activeOpacity={1}
          onPress={() => setIsProfileDropdownOpen(false)}
        >
          <View 
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
            style={[
              { width: isMobile ? '100%' : 320 },
              isMobile && { maxWidth: 400 }
            ]}
            onStartShouldSetResponder={() => true}
          >
            <View className="p-6 bg-green-500 flex-row items-center">
              <View 
                className="rounded-2xl bg-white/20 justify-center items-center mr-4"
                style={{
                  width: isMobile ? 50 : 56,
                  height: isMobile ? 50 : 56,
                }}
              >
                <Text 
                  className="text-white font-bold"
                  style={{ fontSize: isMobile ? 16 : 18 }}
                >
                  SC
                </Text>
              </View>
              <View className="flex-1">
                <Text 
                  className="text-white font-bold mb-0.5"
                  style={{ fontSize: isMobile ? 16 : 18 }}
                  numberOfLines={1}
                >
                  Sarah Chen
                </Text>
                <Text 
                  className="text-white/90 font-semibold mb-0.5"
                  style={{ fontSize: isMobile ? 12 : 14 }}
                  numberOfLines={1}
                >
                  Chief Technology Officer
                </Text>
                <Text 
                  className="text-white/70 font-medium"
                  style={{ fontSize: isMobile ? 11 : 12 }}
                  numberOfLines={1}
                >
                  {DEMO_DATA.company.name}
                </Text>
              </View>
            </View>

            <View className="p-4">
              <TouchableOpacity 
                className="flex-row items-center py-3.5 px-3 rounded-lg"
                onPress={() => {
                  setIsProfileDropdownOpen(false);
                  // Navigate to profile
                }}
              >
                <Feather name="user" size={isMobile ? 16 : 18} color="#6B7280" />
                <Text 
                  className="flex-1 text-gray-900 font-medium ml-3"
                  style={{ fontSize: isMobile ? 14 : 16 }}
                >
                  My Profile
                </Text>
                <Feather name="chevron-right" size={isMobile ? 14 : 16} color="#6B7280" />
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row items-center py-3.5 px-3 rounded-lg mt-1"
                onPress={handleLogout}
              >
                <Feather name="log-out" size={isMobile ? 16 : 18} color="#ef4444" />
                <Text 
                  className="flex-1 text-red-500 font-semibold ml-3"
                  style={{ fontSize: isMobile ? 14 : 16 }}
                >
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Mobile Search Backdrop */}
      {isMobile && isSearchExpanded && (
        <TouchableOpacity
          className="absolute inset-0 bg-black/0 z-40"
          onPress={() => setIsSearchExpanded(false)}
          activeOpacity={1}
        />
      )}
    </View>
  );
}