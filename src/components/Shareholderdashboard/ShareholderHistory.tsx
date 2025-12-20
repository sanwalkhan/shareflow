// src/screens/ShareholderHistory.tsx
import React, { useRef, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Animated, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

// ✅ Import Sidebar
import Sidebar from "../SidebarComponent/sidebar";

const COLORS = {
  primary: "#14339b",
  button: "#FFC20E",
  cardBackground: "#000",
  cardText: "#fff",
};

// Navigation types
export type RootStackParamList = {
  ShareholderDashboard: undefined;
  ShareholderReport: undefined;
  ShareholderFvrt: undefined;
  ShareholderHistory: undefined;
};
type ShareholderNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const topCards = [
  { title: "Equality Validation" },
  { title: "Dividend Action" },
  { title: "Reports" },
];

const ShareholderHistory: React.FC = () => {
  const navigation = useNavigation<ShareholderNavigationProp>();
  const [activeTab, setActiveTab] = useState("history");
  const [isMobile, setIsMobile] = useState(Dimensions.get("window").width < 768);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notifAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    const onChange = ({ window }: { window: { width: number; height: number } }) => {
      setIsMobile(window.width < 768);
      if (window.width >= 768) setMobileSidebar(false);
    };

    const subscription = Dimensions.addEventListener("change", onChange);
    return () => {
      if (subscription?.remove) subscription.remove();
      else Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const openNotifications = () => {
    setShowNotifications(true);
    Animated.timing(notifAnim, { toValue: 0, duration: 300, useNativeDriver: false }).start();
  };

  const closeNotifications = () => {
    Animated.timing(notifAnim, { toValue: 300, duration: 300, useNativeDriver: false }).start(() =>
      setShowNotifications(false)
    );
  };

  return (
    <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#E6F0FF" }}>
      {/* Sidebar */}
      {!isMobile && (
        <Sidebar activeTab={activeTab} onSelect={setActiveTab} mobile={false} />
      )}
      {isMobile && mobileSidebar && (
        <Sidebar
          activeTab={activeTab}
          onSelect={setActiveTab}
          mobile
          onClose={() => setMobileSidebar(false)}
        />
      )}

      {/* Main Content */}
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: COLORS.primary, paddingHorizontal: 16, paddingVertical: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {isMobile && (
              <TouchableOpacity onPress={() => setMobileSidebar(true)} style={{ marginRight: 12 }}>
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

          {/* Header Buttons */}
          {!isMobile && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
  style={{
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#fff', // white background
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 12,
    height: 50,
  }}
>
  <Ionicons name="search-outline" size={18} color={COLORS.accent} style={{ marginRight: 6 }} />
  <Text style={{ color: COLORS.accent, fontWeight: "800", fontSize: 14 }}>
    Search for everything
  </Text>
</TouchableOpacity>

<TouchableOpacity onPress={openNotifications} style={{ marginLeft: 12 }}>
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

        {/* Mobile Search Button */}
        {isMobile && (
          <View style={{ padding: 20 }}>
            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", backgroundColor: COLORS.button, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 12 }}>
              <Ionicons name="search-outline" size={20} color="#14339bff" style={{ marginRight: 8 }} />
              <Text style={{ color: "#14339bff", fontWeight: "800", fontSize: 16 }}>Search for everything</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Scrollable Content */}
        <ScrollView style={{ paddingHorizontal: 20 }}>
          {/* Top Cards */}
          <View style={{ flexDirection: isMobile ? "column" : "row", gap: 16, marginTop: isMobile ? 0 : 20, marginBottom: 16 }}>
            {topCards.map((card, idx) => (
              <View key={idx} style={{ backgroundColor: COLORS.cardBackground, padding: 16, borderRadius: 12, flex: 1 }}>
                <Text style={{ color: COLORS.cardText, fontSize: 16, fontWeight: "600" }}>{card.title}</Text>
              </View>
            ))}
          </View>

          {/* Shareholder Summary */}
          <View style={{ backgroundColor: COLORS.cardBackground, borderRadius: 12, padding: 16, marginTop: 16 }}>
            <Text style={{ color: COLORS.cardText, fontSize: 18, fontWeight: "700", marginBottom: 12 }}>Shareholder Summary</Text>
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
          </View>
        </ScrollView>
      </View>

      {/* Notifications Panel */}
      {showNotifications && (
        <Animated.View style={{ position: "absolute", right: notifAnim, top: 0, width: 300, height: "100%", backgroundColor: "#fff", padding: 16, zIndex: 999 }}>
          <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 12 }}>Notifications</Text>
          <TouchableOpacity onPress={closeNotifications}>
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

export default ShareholderHistory;
