// src/screens/ShareholderHistory.tsx
import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Animated, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

const { width: screenWidth } = Dimensions.get("window");
const sidebarWidth = 250;

const COLORS = {
  primary: "#14339b",
  button: "#FFC20E",
  textDark: "#111827",
  cardBackground: "#000",
  cardText: "#fff",
};

// ---------------------------
// Navigation Types
// ---------------------------
export type RootStackParamList = {
  Dashboard: undefined;
  ShareholderReport: undefined;
  ShareholderFvrt: undefined;
  ShareholderHistory: undefined;
};

type ShareholderNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// ---------------------------
// Sidebar Items
// ---------------------------
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
  const [showNotifications, setShowNotifications] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;

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
    <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#E6F0FF" }}>
      {/* Sidebar */}
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
            paddingVertical: 30,
          }}
        >
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
            <TouchableOpacity onPress={openNotifications}>
              <Ionicons name="notifications-outline" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Scrollable Main */}
        <ScrollView style={{ padding: 20 }} showsVerticalScrollIndicator={false}>
          {/* Top Row - 3 Cards */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
            {topCards.map((card, idx) => (
              <View
                key={idx}
                style={{
                  backgroundColor: COLORS.cardBackground,
                  padding: 16,
                  borderRadius: 12,
                  flex: 1,
                  marginRight: idx < topCards.length - 1 ? 8 : 0,
                }}
              >
                <Text style={{ color: COLORS.cardText, fontSize: 16, fontWeight: "600" }}>{card.title}</Text>
              </View>
            ))}
          </View>

          {/* Bottom Large Card */}
          <View
            style={{
              backgroundColor: COLORS.cardBackground,
              borderRadius: 12,
              padding: 16,
              marginTop: 16,
            }}
          >
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
            <Text style={{ color: "#111", marginBottom: 8 }}>No new notifications</Text>
          </Animated.View>
        )}
      </View>
    </View>
  );
};

export default ShareholderHistory;
