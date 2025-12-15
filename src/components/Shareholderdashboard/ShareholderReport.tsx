// src/screens/ShareholderReport.tsx
import React, { useRef, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Animated, Dimensions, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronUp, ChevronDown } from "lucide-react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

// -------------------------
// Navigation Types
// -------------------------
export type RootStackParamList = {
  Dashboard: undefined;
  ShareholderReport: undefined;
  ShareholderFvrt: undefined;
  ShareholderHistory: undefined;
};

type ShareholderNavigationProp = NativeStackNavigationProp<RootStackParamList, "ShareholderReport">;

// -------------------------
// Colors
// -------------------------
const COLORS = {
  primary: "#193288",
  accent: "#001867ff",
  button: "#FFC20E",
  success: "#16a34a",
  warning: "#f59e0b",
  danger: "#dc2626",
  textDark: "#111827",
};

// -------------------------
// Constants
// -------------------------
const sidebarWidth = 250;

// Sidebar Items
const sidebarItems = [
  { label: "Dashboard", icon: "speedometer-outline" },
  { label: "Report", icon: "document-text-outline" },
  { label: "Favourite", icon: "heart-outline" },
  { label: "History", icon: "time-outline" },
];

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

// -------------------------
// Component
// -------------------------
const ShareholderReport: React.FC = () => {
  const navigation = useNavigation<ShareholderNavigationProp>();
  const [activeTab, setActiveTab] = useState("Report");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;

  // Responsive State
  const [isMobile, setIsMobile] = useState(Dimensions.get("window").width < 768);

  useEffect(() => {
    const onChange = ({ window }: { window: { width: number; height: number } }) => {
      setIsMobile(window.width < 768);
      if (window.width >= 768) setShowSidebar(true); // Desktop always show sidebar
    };
    Dimensions.addEventListener("change", onChange);
    // Initial sidebar state
    setShowSidebar(Dimensions.get("window").width >= 768);
    return () => Dimensions.removeEventListener("change", onChange);
  }, []);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

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
      {/* Sidebar */}
      {showSidebar && (
        <View
          style={{
            width: sidebarWidth,
            padding: 26,
            backgroundColor: COLORS.primary,
            position: isMobile ? "absolute" : "relative",
            zIndex: 1000,
            height: "100%",
          }}
        >
          {isMobile && (
            <TouchableOpacity onPress={toggleSidebar} style={{ marginBottom: 20 }}>
              <Ionicons name="close-outline" size={28} color="#fff" />
            </TouchableOpacity>
          )}
          <Text style={{ color: "#fff", fontSize: 22, fontWeight: "bold", marginBottom: 32 }}>ShareFlow</Text>
          {sidebarItems.map((item) => {
            const isActive = activeTab === item.label;
            return (
              <TouchableOpacity
                key={item.label}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 14,
                  paddingHorizontal: 16,
                  marginBottom: 20,
                  borderRadius: 16,
                  backgroundColor: isActive ? COLORS.button : "transparent",
                }}
                onPress={() => {
                  setActiveTab(item.label);
                  if (item.label === "Dashboard") navigation.navigate("ShareholderDashboard");
                  else if (item.label === "Report") navigation.navigate("ShareholderReport");
                  else if (item.label === "Favourite") navigation.navigate("Shareholderfvrt");
                  else if (item.label === "History") navigation.navigate("ShareholderHistory");
                  if (isMobile) setShowSidebar(false);
                }}
              >
                <Ionicons
                  name={item.icon as any}
                  size={22}
                  color={isActive ? COLORS.accent : "#fff"}
                  style={{ marginRight: 12 }}
                />
                <Text style={{ color: isActive ? COLORS.accent : "#fff", fontSize: 16, fontWeight: "600" }}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

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
            <MaskedView
              maskElement={
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="document-text-outline" size={24} color="#fff" style={{ marginRight: 6 }} />
                  <Text style={{ fontSize: 24, fontWeight: "600", color: "#fff" }}>Report</Text>
                </View>
              }
            >
              <LinearGradient colors={[COLORS.primary, COLORS.primary]}>
                <Text style={{ fontSize: 24, fontWeight: "600", opacity: 0 }}>Report</Text>
              </LinearGradient>
            </MaskedView>
          </View>

          {!isMobile && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: COLORS.button,
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  borderRadius: 8,
                  marginRight: 12,
                  minWidth: 140,
                  height: 50,
                  justifyContent: "center",
                }}
              >
                <Ionicons name="search-outline" size={18} color="#14339bff" style={{ marginRight: 6 }} />
                <Text style={{ color: "#14339bff", fontWeight: "800", fontSize: 14 }}>
                  Search for everything
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={openNotifications}>
                <Ionicons name="notifications-outline" size={28} color="#fff" />
              </TouchableOpacity>
            </View>
          )}

          {isMobile && (
            <TouchableOpacity onPress={openNotifications}>
              <Ionicons name="notifications-outline" size={28} color="#fff" />
            </TouchableOpacity>
          )}
        </View>

        {/* Mobile Search */}
        {isMobile && (
          <View style={{ padding: 20 }}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: COLORS.button,
                paddingVertical: 10,
                paddingHorizontal: 16,
                borderRadius: 12,
              }}
            >
              <Ionicons name="search-outline" size={20} color="#14339bff" style={{ marginRight: 8 }} />
              <Text style={{ color: "#14339bff", fontWeight: "800", fontSize: 16 }}>
                Search for everything
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Scrollable Content */}
        <ScrollView style={{ paddingHorizontal: 20 }} showsVerticalScrollIndicator={false}>
          {/* Topics */}
          <View style={{ flexDirection: isMobile ? "column" : "row", gap: 16, marginBottom: 16 }}>
            <View style={{ flex: 1, backgroundColor: "#fff", borderRadius: 16, padding: 16 }}>
              <Text style={{ fontWeight: "700", fontSize: 18, color: COLORS.textDark, marginBottom: 12 }}>Workout Topics</Text>
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

            <View style={{ flex: 1, backgroundColor: "#fff", borderRadius: 16, padding: 16 }}>
              <Text style={{ fontWeight: "700", fontSize: 18, color: COLORS.textDark, marginBottom: 12 }}>Management Topics</Text>
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
          </View>

          {/* Top Users */}
          <View style={{ flexDirection: isMobile ? "column" : "row", gap: 16 }}>
            <View style={{ flex: 1, backgroundColor: "#fff", borderRadius: 16, padding: 16 }}>
              <Text style={{ fontWeight: "700", fontSize: 18, color: COLORS.textDark, marginBottom: 12 }}>Top Users (Workout)</Text>
              {leaderboardData.map((user, index) => (
                <View key={user.id} style={{ flexDirection: "row", alignItems: "center", marginBottom: 12, backgroundColor: "#f3f4f6", padding: 12, borderRadius: 12 }}>
                  <Image source={{ uri: `https://i.pravatar.cc/50?img=${index + 1}` }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12 }} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: "600", fontSize: 16, color: COLORS.textDark }}>{user.name}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
                      <Text style={{ fontWeight: "700", marginRight: 6 }}>{user.score}</Text>
                      {user.change === "up" ? <ChevronUp size={16} color={COLORS.success} /> : <ChevronDown size={16} color={COLORS.danger} />}
                    </View>
                  </View>
                </View>
              ))}
            </View>

            <View style={{ flex: 1, backgroundColor: "#fff", borderRadius: 16, padding: 16 }}>
              <Text style={{ fontWeight: "700", fontSize: 18, color: COLORS.textDark, marginBottom: 12 }}>Top Users (Management)</Text>
              {leaderboardData.map((user, index) => (
                <View key={user.id} style={{ flexDirection: "row", alignItems: "center", marginBottom: 12, backgroundColor: "#f3f4f6", padding: 12, borderRadius: 12 }}>
                  <Image source={{ uri: `https://i.pravatar.cc/50?img=${index + 5}` }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12 }} />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: "600", fontSize: 16, color: COLORS.textDark }}>{user.name}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
                      <Text style={{ fontWeight: "700", marginRight: 6 }}>{user.score}</Text>
                      {user.change === "up" ? <ChevronUp size={16} color={COLORS.success} /> : <ChevronDown size={16} color={COLORS.danger} />}
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

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
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <Text style={{ fontSize: 20, fontWeight: "700" }}>Notifications</Text>
              <TouchableOpacity onPress={closeNotifications}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={{ paddingVertical: 8, marginBottom: 12 }}>
              <Text style={{ color: COLORS.success, fontWeight: "600" }}>Mark All as Read</Text>
            </TouchableOpacity>

            <ScrollView>
              {leaderboardData.map((user, idx) => (
                <View key={idx} style={{ paddingVertical: 8, borderBottomWidth: 0.5, borderBottomColor: "#ccc" }}>
                  <Text>{user.name} scored {user.score}</Text>
                </View>
              ))}
            </ScrollView>
          </Animated.View>
        )}
      </View>
    </View>
  );
};

export default ShareholderReport;
