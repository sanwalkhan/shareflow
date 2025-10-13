<<<<<<< Updated upstream
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
=======
// src/screens/DashboardScreen.tsx
import React, { useState, useRef, useEffect } from "react";
import { View, Animated, Alert } from "react-native";
import Sidebar from "../components/Admin/Sidebar";
import Header from "../components/Admin/Header";
import OverviewModule from "../components/Admin/OverviewModule";
import ExpensesModule from "../components/Admin/ExpensesModule";
import PayrollModule from "../components/Admin/PayrollModule";
import ShareholdersModule from "../components/Admin/ShareholdersModule";
import ReportsModule from "../components/Admin/ReportsModule";
import SettingsModule from "../components/Admin/SettingsModule";
import { DEMO_DATA } from "../utils/demoData";
import { isMobile } from "../utils/responsive";

interface DashboardScreenProps {
  navigation: any;
}

export default function DashboardScreen({ navigation }: DashboardScreenProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(isMobile);
  const [activeModule, setActiveModule] = useState("overview");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const sidebarWidth = useRef(new Animated.Value(isMobile ? 0 : 280)).current;
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
    const toValue = isSidebarCollapsed ? (isMobile ? 0 : 280) : (isMobile ? 0 : 80);
    const opacityValue = isSidebarCollapsed ? 1 : 0.7;
    
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
      })
    ]).start();
    
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout Confirmation",
      "Are you sure you want to logout from your dashboard?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Logout", 
          style: "destructive",
          onPress: () => navigation.navigate("Landing")
        }
      ]
    );
  };

  const renderModuleContent = () => {
    switch (activeModule) {
      case "overview":
        return <OverviewModule data={DEMO_DATA} />;
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
        return <OverviewModule data={DEMO_DATA} />;
    }
  };
>>>>>>> Stashed changes

export default function DashboardScreen() {
  return (
<<<<<<< Updated upstream
    <View style={styles.container}>
      <Text style={styles.title}>📊 Dashboard</Text>
      <Text style={styles.subtitle}>Welcome to ShareFlow Dashboard!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '700' },
  subtitle: { fontSize: 16, color: '#555' },
});
=======
    <View className="flex-1 flex-row bg-white">
      {!isMobile && (
        <Sidebar
          isSidebarCollapsed={isSidebarCollapsed}
          activeModule={activeModule}
          setActiveModule={setActiveModule}
          toggleSidebar={toggleSidebar}
          handleLogout={handleLogout}
          sidebarWidth={sidebarWidth}
          sidebarOpacity={sidebarOpacity}
        />
      )}

      <View className="flex-1 bg-gray-50">
        <Header
          activeModule={activeModule}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          isProfileDropdownOpen={isProfileDropdownOpen}
          setIsProfileDropdownOpen={setIsProfileDropdownOpen}
          handleLogout={handleLogout}
          companyName={DEMO_DATA.company.name}
        />

        <View className="flex-1">
          {renderModuleContent()}
        </View>
      </View>
    </View>
  );
}
>>>>>>> Stashed changes
