// src/screens/ShareholderReport.tsx
import React, { useRef, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Animated, Dimensions, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Sidebar from "./sidebar";
import { ChevronUp, ChevronDown } from "lucide-react-native";

const COLORS = {
  primary: "#193288",
  accent: "#001867ff",
  success: "#16a34a",
  danger: "#dc2626",
  warning: "#f59e0b",
  textDark: "#111827",
};

// Sample Data
const topicsData = [
  { id: "1", name: "Project Delivery", progress: 75, color: COLORS.success },
  { id: "2", name: "Compliance Basics", progress: 50, color: COLORS.warning },
  { id: "3", name: "Company Networking", progress: 30, color: COLORS.danger },
];

const leaderboardData = [
  { id: "1", name: "Jessica Thomas", score: 95, change: "up" },
  { id: "2", name: "Tristan Huntley", score: 88, change: "down" },
  { id: "3", name: "Mark Chang", score: 82, change: "up" },
  { id: "4", name: "Luis Silverman", score: 80, change: "down" },
];

const ShareholderReport: React.FC = () => {
  // Responsive
  const [windowWidth, setWindowWidth] = useState(Dimensions.get("window").width);
  const isMobile = windowWidth < 700;

  // Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarAnim = useRef(new Animated.Value(-260)).current;

  // Notifications
  const [showNotifications, setShowNotifications] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    const onChange = ({ window }: { window: { width: number; height: number } }) => setWindowWidth(window.width);
    Dimensions.addEventListener("change", onChange);
    return () => subscription?.remove()
  }, []);

  const toggleSidebar = () => {
    if (sidebarOpen) {
      Animated.timing(sidebarAnim, { toValue: -260, duration: 300, useNativeDriver: false }).start(() =>
        setSidebarOpen(false)
      );
    } else {
      setSidebarOpen(true);
      Animated.timing(sidebarAnim, { toValue: 0, duration: 300, useNativeDriver: false }).start();
    }
  };

  const openNotifications = () => {
    setShowNotifications(true);
    Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: false }).start();
  };

  const closeNotifications = () => {
    Animated.timing(slideAnim, { toValue: 300, duration: 300, useNativeDriver: false }).start(() =>
      setShowNotifications(false)
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#E6F0FF", flexDirection: "row" }}>
      {/* Desktop Sidebar */}
      {!isMobile && <Sidebar />}

      {/* Main Content */}
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: COLORS.primary,
            paddingHorizontal: 16,
            paddingVertical: 20,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {isMobile && (
              <TouchableOpacity onPress={toggleSidebar} style={{ marginRight: 12 }}>
                <Ionicons name="menu-outline" size={28} color="#fff" />
              </TouchableOpacity>
            )}
            {!isMobile && <Text style={{ color: "#fff", fontSize: 24, fontWeight: "600" }}>Report</Text>}
          </View>

          {!isMobile && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  borderRadius: 8,
                  marginRight: 12,
                  minWidth: 140,
                  height: 50,
                  justifyContent: "center",
                }}
              >
                <Ionicons name="search-outline" size={18} color={COLORS.accent} style={{ marginRight: 6 }} />
                <Text style={{ color: COLORS.accent, fontWeight: "800", fontSize: 14 }}>Search for everything</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={openNotifications}>
                <Ionicons name="notifications-outline" size={28} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Scrollable Content */}
        <ScrollView style={{ paddingHorizontal: 20 }} showsVerticalScrollIndicator={false}>
          {/* Topics */}
          <View style={{ flexDirection: isMobile ? "column" : "row", gap: 16, marginBottom: 16 }}>
            {[{ title: "Workout Topics" }, { title: "Management Topics" }].map((section, i) => (
              <View key={i} style={{ flex: 1, backgroundColor: "#fff", borderRadius: 16, padding: 16 }}>
                <Text style={{ fontWeight: "700", fontSize: 18, color: COLORS.textDark, marginBottom: 12 }}>
                  {section.title}
                </Text>
                {topicsData.map((topic) => (
                  <View key={topic.id} style={{ marginBottom: 12 }}>
                    <Text style={{ fontSize: 14, fontWeight: "600", marginBottom: 4 }}>{topic.name}</Text>
                    <View style={{ height: 6, backgroundColor: "#e5e7eb", borderRadius: 3 }}>
                      <View
                        style={{ width: `${topic.progress}%`, height: "100%", backgroundColor: topic.color, borderRadius: 3 }}
                      />
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>

          {/* Top Users */}
          <View style={{ flexDirection: isMobile ? "column" : "row", gap: 16 }}>
            {["Top Users (Workout)", "Top Users (Management)"].map((section, idx) => (
              <View key={idx} style={{ flex: 1, backgroundColor: "#fff", borderRadius: 16, padding: 16 }}>
                <Text style={{ fontWeight: "700", fontSize: 18, color: COLORS.textDark, marginBottom: 12 }}>{section}</Text>
                {leaderboardData.map((user, index) => (
                  <View
                    key={user.id}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 12,
                      backgroundColor: "#f3f4f6",
                      padding: 12,
                      borderRadius: 12,
                    }}
                  >
                    <Image
                      source={{ uri: `https://i.pravatar.cc/50?img=${idx * 4 + index + 1}` }}
                      style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12 }}
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontWeight: "600", fontSize: 16, color: COLORS.textDark }}>{user.name}</Text>
                      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
                        <Text style={{ fontWeight: "700", marginRight: 6 }}>{user.score}</Text>
                        {user.change === "up" ? (
                          <ChevronUp size={16} color={COLORS.success} />
                        ) : (
                          <ChevronDown size={16} color={COLORS.danger} />
                        )}
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Mobile Sidebar Overlay */}
        {isMobile && sidebarOpen && (
          <>
            <TouchableOpacity
              style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.3)", zIndex: 998 }}
              onPress={toggleSidebar}
            />
            <Animated.View
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: sidebarAnim,
                width: 260,
                backgroundColor: "#fff",
                zIndex: 999,
                elevation: 10,
                shadowColor: "#000",
                shadowOpacity: 0.2,
                shadowOffset: { width: 2, height: 0 },
                shadowRadius: 4,
              }}
            >
              <Sidebar mobile onClose={toggleSidebar} />
            </Animated.View>
          </>
        )}

        {/* Notification Drawer */}
        {showNotifications && (
          <Animated.View
            style={{
              position: "absolute",
              right: slideAnim,
              top: 0,
              height: "100%",
              width: 300,
              backgroundColor: "#fff",
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 6,
              padding: 16,
              zIndex: 1000,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}
            >
              <Text style={{ fontSize: 20, fontWeight: "700" }}>Notifications</Text>
              <TouchableOpacity onPress={closeNotifications}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      </View>
    </View>
  );
};

export default ShareholderReport;
