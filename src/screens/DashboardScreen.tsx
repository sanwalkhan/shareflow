// src/screens/DashboardScreen.tsx
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  ScrollView,
  TextInput,
  Modal,
  Alert
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS, isMobile } from "../constants/theme";

const { width, height } = Dimensions.get("window");

export default function DashboardScreen() {
  const navigation = useNavigation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeModule, setActiveModule] = useState("overview");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [dateRange, setDateRange] = useState("this_month");

  const sidebarWidth = useRef(new Animated.Value(240)).current;
  const sidebarOpacity = useRef(new Animated.Value(1)).current;

  const toggleSidebar = () => {
    const toValue = isSidebarCollapsed ? 240 : 70;
    const opacityValue = isSidebarCollapsed ? 1 : 0.8;
    
    Animated.parallel([
      Animated.timing(sidebarWidth, {
        toValue,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(sidebarOpacity, {
        toValue: opacityValue,
        duration: 300,
        useNativeDriver: false,
      })
    ]).start();
    
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Logout", 
          style: "destructive",
          onPress: () => navigation.navigate("Landing" as never)
        }
      ]
    );
  };

  const sidebarItems = [
    { id: "overview", icon: "home", label: "Dashboard", color: COLORS.accent },
    { id: "expenses", icon: "dollar-sign", label: "Expenses", color: COLORS.tertiary },
    { id: "payroll", icon: "users", label: "Payroll", color: COLORS.neutral },
    { id: "shareholders", icon: "pie-chart", label: "Shareholders", color: COLORS.primary },
    { id: "reports", icon: "bar-chart-2", label: "Reports", color: COLORS.secondary },
    { id: "settings", icon: "settings", label: "Settings", color: COLORS.tertiary },
  ];

  const renderModuleContent = () => {
    switch (activeModule) {
      case "overview":
        return <OverviewModule />;
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
        return <OverviewModule />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Sidebar Navigation */}
      <Animated.View 
        style={[
          styles.sidebar,
          { 
            width: sidebarWidth,
            opacity: sidebarOpacity
          }
        ]}
      >
        {/* Sidebar Header */}
        <View style={styles.sidebarHeader}>
          <View style={styles.logoContainer}>
            <Feather name="trending-up" size={24} color={COLORS.accent} />
            {!isSidebarCollapsed && (
              <Text style={styles.logoText}>
                Share<Text style={styles.logoAccent}>Flow</Text>
              </Text>
            )}
          </View>
          
          <TouchableOpacity 
            style={styles.collapseButton}
            onPress={toggleSidebar}
          >
            <Feather 
              name={isSidebarCollapsed ? "chevron-right" : "chevron-left"} 
              size={16} 
              color={COLORS.textLight} 
            />
          </TouchableOpacity>
        </View>

        {/* Navigation Items */}
        <ScrollView style={styles.sidebarContent} showsVerticalScrollIndicator={false}>
          {sidebarItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.navItem,
                activeModule === item.id && styles.navItemActive
              ]}
              onPress={() => setActiveModule(item.id)}
            >
              <View style={[
                styles.navIcon,
                { backgroundColor: item.color + "20" }
              ]}>
                <Feather 
                  name={item.icon as any} 
                  size={20} 
                  color={activeModule === item.id ? COLORS.accent : item.color} 
                />
              </View>
              
              {!isSidebarCollapsed && (
                <Text style={[
                  styles.navLabel,
                  activeModule === item.id && styles.navLabelActive
                ]}>
                  {item.label}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <View style={[styles.navIcon, { backgroundColor: "#ef444420" }]}>
            <Feather name="log-out" size={20} color="#ef4444" />
          </View>
          {!isSidebarCollapsed && (
            <Text style={styles.logoutText}>Logout</Text>
          )}
        </TouchableOpacity>
      </Animated.View>

      {/* Main Content Area */}
      <View style={styles.mainContent}>
        {/* Top Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>
              {sidebarItems.find(item => item.id === activeModule)?.label}
            </Text>
            <Text style={styles.headerSubtitle}>
              Welcome back, Admin
            </Text>
          </View>

          <View style={styles.headerRight}>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <Feather name="search" size={18} color={COLORS.tertiary} />
              <TextInput
                placeholder="Search expenses, reports..."
                placeholderTextColor={COLORS.tertiary + "80"}
                style={styles.searchInput}
              />
            </View>

            {/* Date Range Selector */}
            <TouchableOpacity style={styles.dateSelector}>
              <Feather name="calendar" size={18} color={COLORS.tertiary} />
              <Text style={styles.dateText}>This Month</Text>
              <Feather name="chevron-down" size={16} color={COLORS.tertiary} />
            </TouchableOpacity>

            {/* Dark Mode Toggle */}
            <TouchableOpacity 
              style={styles.themeToggle}
              onPress={() => setIsDarkMode(!isDarkMode)}
            >
              <Feather 
                name={isDarkMode ? "sun" : "moon"} 
                size={18} 
                color={COLORS.tertiary} 
              />
            </TouchableOpacity>

            {/* Profile Dropdown */}
            <TouchableOpacity 
              style={styles.profileButton}
              onPress={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>A</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Dropdown Modal */}
        <Modal
          visible={isProfileDropdownOpen}
          transparent
          animationType="fade"
          onRequestClose={() => setIsProfileDropdownOpen(false)}
        >
          <TouchableOpacity 
            style={styles.dropdownOverlay}
            onPress={() => setIsProfileDropdownOpen(false)}
          >
            <View style={styles.profileDropdown}>
              <View style={styles.dropdownHeader}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>A</Text>
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>Admin User</Text>
                  <Text style={styles.profileRole}>Company Administrator</Text>
                </View>
              </View>
              
              <View style={styles.dropdownDivider} />
              
              <TouchableOpacity style={styles.dropdownItem}>
                <Feather name="user" size={18} color={COLORS.tertiary} />
                <Text style={styles.dropdownText}>My Profile</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.dropdownItem}>
                <Feather name="settings" size={18} color={COLORS.tertiary} />
                <Text style={styles.dropdownText}>Company Settings</Text>
              </TouchableOpacity>
              
              <View style={styles.dropdownDivider} />
              
              <TouchableOpacity 
                style={[styles.dropdownItem, styles.logoutDropdownItem]}
                onPress={handleLogout}
              >
                <Feather name="log-out" size={18} color="#ef4444" />
                <Text style={styles.logoutDropdownText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Main Module Content */}
        <ScrollView 
          style={styles.moduleContainer}
          showsVerticalScrollIndicator={false}
        >
          {renderModuleContent()}
        </ScrollView>
      </View>
    </View>
  );
}

// Module Components
const OverviewModule = () => (
  <View style={styles.module}>
    <Text style={styles.moduleTitle}>Company Overview</Text>
    {/* Add overview content */}
  </View>
);

const ExpensesModule = () => (
  <View style={styles.module}>
    <Text style={styles.moduleTitle}>Expense Management</Text>
    {/* Add expenses content */}
  </View>
);

const PayrollModule = () => (
  <View style={styles.module}>
    <Text style={styles.moduleTitle}>Payroll Management</Text>
    {/* Add payroll content */}
  </View>
);

const ShareholdersModule = () => (
  <View style={styles.module}>
    <Text style={styles.moduleTitle}>Shareholder Management</Text>
    {/* Add shareholders content */}
  </View>
);

const ReportsModule = () => (
  <View style={styles.module}>
    <Text style={styles.moduleTitle}>Reports & Analytics</Text>
    {/* Add reports content */}
  </View>
);

const SettingsModule = () => (
  <View style={styles.module}>
    <Text style={styles.moduleTitle}>Settings</Text>
    {/* Add settings content */}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: COLORS.white,
  },
  sidebar: {
    backgroundColor: COLORS.neutral,
    borderRightWidth: 1,
    borderRightColor: "rgba(255,255,255,0.1)",
  },
  sidebarHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logoText: {
    color: COLORS.textLight,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  logoAccent: {
    color: COLORS.accent,
  },
  collapseButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  sidebarContent: {
    flex: 1,
    paddingVertical: 20,
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 12,
  },
  navItemActive: {
    backgroundColor: "rgba(134, 194, 50, 0.15)",
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
  },
  navIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  navLabel: {
    color: COLORS.textLight,
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 12,
    opacity: 0.9,
  },
  navLabelActive: {
    color: COLORS.accent,
    fontWeight: "700",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginHorizontal: 8,
    marginBottom: 20,
    borderRadius: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  logoutText: {
    color: "#ef4444",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 12,
  },
  mainContent: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.textDark,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.tertiary,
    fontWeight: "500",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    minWidth: 200,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.textDark,
  },
  dateSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    gap: 8,
  },
  dateText: {
    fontSize: 14,
    color: COLORS.textDark,
    fontWeight: "500",
  },
  themeToggle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#f8fafc",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  profileButton: {
    marginLeft: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.accent,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 16,
  },
  dropdownOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 80,
    paddingRight: 24,
  },
  profileDropdown: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    width: 280,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  dropdownHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 12,
  },
  profileInfo: {
    marginLeft: 12,
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textDark,
    marginBottom: 2,
  },
  profileRole: {
    fontSize: 12,
    color: COLORS.tertiary,
    fontWeight: "500",
  },
  dropdownDivider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginVertical: 8,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    gap: 12,
  },
  dropdownText: {
    fontSize: 14,
    color: COLORS.textDark,
    fontWeight: "500",
  },
  logoutDropdownItem: {
    marginTop: 4,
  },
  logoutDropdownText: {
    fontSize: 14,
    color: "#ef4444",
    fontWeight: "500",
  },
  moduleContainer: {
    flex: 1,
    padding: 24,
  },
  module: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.textDark,
    marginBottom: 24,
  },
});