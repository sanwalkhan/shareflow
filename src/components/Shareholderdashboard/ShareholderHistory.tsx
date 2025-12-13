// src/screens/ShareholderHistory.tsx
import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Animated, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

const { width: screenWidth } = Dimensions.get("window");
const isMobile = screenWidth < 768;
const sidebarWidth = 250;

const COLORS = {
  primary: "#14339b",
  button: "#FFC20E",
  textDark: "#111827",
  cardBackground: "#000",
  cardText: "#fff",
};

// Navigation types
export type RootStackParamList = {
  Dashboard: undefined;
  ShareholderReport: undefined;
  ShareholderFvrt: undefined;
  ShareholderHistory: undefined;
};
type ShareholderNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Sidebar items
const sidebarItems = [
  { label: "Dashboard", icon: "speedometer-outline", route: "ShareholderDashboard" },
  { label: "Report", icon: "document-text-outline", route: "ShareholderReport" },
  { label: "Favourite", icon: "heart-outline", route: "Shareholderfvrt" },
  { label: "History", icon: "time-outline", route: "ShareholderHistory" },
];

const topCards = [
  { title: "Equality Validation" },
  { title: "Dividend Action" },
  { title: "Reports" },
];

const ShareholderHistory: React.FC = () => {
  const navigation = useNavigation<ShareholderNavigationProp>();
  const [activeTab, setActiveTab] = useState("History");
  const [showSidebar, setShowSidebar] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const slideAnim = useRef(new Animated.Value(-sidebarWidth)).current;

  const toggleSidebar = () => {
    if (!showSidebar) {
      setShowSidebar(true);
      Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: false }).start();
    } else {
      Animated.timing(slideAnim, { toValue: -sidebarWidth, duration: 300, useNativeDriver: false }).start(() =>
        setShowSidebar(false)
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#E6F0FF", flexDirection: "row" }}>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <View style={{ width: sidebarWidth, padding: 26, backgroundColor: COLORS.primary }}>
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
                  navigation.navigate(item.route as any);
                }}
              >
                <Ionicons
                  name={item.icon as any}
                  size={22}
                  color={isActive ? "#000" : "#fff"}
                  style={{ marginRight: 12 }}
                />
                <Text style={{ color: isActive ? "#000" : "#fff", fontSize: 16, fontWeight: "600" }}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* Mobile Sidebar */}
      {isMobile && showSidebar && (
        <Animated.View
          style={{
            position: "absolute",
            left: slideAnim,
            top: 0,
            width: sidebarWidth,
            height: "100%",
            backgroundColor: COLORS.primary,
            zIndex: 1000,
            padding: 26,
          }}
        >
          <TouchableOpacity onPress={toggleSidebar} style={{ marginBottom: 20 }}>
            <Ionicons name="close-outline" size={28} color="#fff" />
          </TouchableOpacity>
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
                  navigation.navigate(item.route as any);
                  toggleSidebar();
                }}
              >
                <Ionicons
                  name={item.icon as any}
                  size={22}
                  color={isActive ? "#000" : "#fff"}
                  style={{ marginRight: 12 }}
                />
                <Text style={{ color: isActive ? "#000" : "#fff", fontSize: 16, fontWeight: "600" }}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </Animated.View>
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
                  <Ionicons name="time-outline" size={24} color="#fff" style={{ marginRight: 6 }} />
                  <Text style={{ fontSize: 24, fontWeight: "600", color: "#fff" }}>History</Text>
                </View>
              }
            >
              <LinearGradient colors={[COLORS.primary, COLORS.primary]}>
                <Text style={{ fontSize: 24, fontWeight: "600", opacity: 0 }}>History</Text>
              </LinearGradient>
            </MaskedView>
          </View>

          {/* Desktop: Search + Bell */}
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
                <Text style={{ color: "#14339bff", fontWeight: "800", fontSize: 14 }}>Search for everything</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="notifications-outline" size={28} color="#fff" />
              </TouchableOpacity>
            </View>
          )}

          {/* Mobile: Only Bell */}
          {isMobile && (
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={28} color="#fff" />
            </TouchableOpacity>
          )}
        </View>

        {/* Mobile: Search Button Above Main Content */}
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
              <Text style={{ color: "#14339bff", fontWeight: "800", fontSize: 16 }}>Search for everything</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Scrollable Main Content */}
        <ScrollView style={{ paddingHorizontal: 20 }} showsVerticalScrollIndicator={false}>
          {/* Top Cards */}
          <View style={{ flexDirection: isMobile ? "column" : "row", gap: 16, marginBottom: 16 }}>
            {topCards.map((card, idx) => (
              <View
                key={idx}
                style={{
                  backgroundColor: COLORS.cardBackground,
                  padding: 16,
                  borderRadius: 12,
                  flex: 1,
                  marginBottom: isMobile ? 12 : 0,
                }}
              >
                <Text style={{ color: COLORS.cardText, fontSize: 16, fontWeight: "600" }}>{card.title}</Text>
              </View>
            ))}
          </View>

          {/* Bottom Large Card */}
          <View style={{ backgroundColor: COLORS.cardBackground, borderRadius: 12, padding: 16, marginTop: 16 }}>
            <Text style={{ color: COLORS.cardText, fontSize: 18, fontWeight: "700", marginBottom: 12 }}>
              Shareholder Summary
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
              <Text style={{ color: COLORS.cardText }}>Total Equity</Text>
              <Text style={{ color: COLORS.cardText }}>10%</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
              <Text style={{ color: COLORS.cardText }}>Total Investment</Text>
              <Text style={{ color: COLORS.cardText }}>₹5,00,000</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
              <Text style={{ color: COLORS.cardText }}>Total Profit</Text>
              <Text style={{ color: COLORS.cardText }}>₹1,50,000</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
              <Text style={{ color: COLORS.cardText }}>Total Expenses</Text>
              <Text style={{ color: COLORS.cardText }}>₹50,000</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
              <Text style={{ color: COLORS.cardText }}>Profit After Expenses</Text>
              <Text style={{ color: COLORS.cardText }}>₹1,00,000</Text>
            </View>

            <Text style={{ color: COLORS.cardText, fontSize: 16, fontWeight: "600", marginTop: 16 }}>
              Shareholder Profit Distribution
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ShareholderHistory;
