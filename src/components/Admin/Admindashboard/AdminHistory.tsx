import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import Sidebar from "./ADsidebar";

const COLORS = {
   primary: "#193288",
  button: "#FFC20E",
  cardBackground: "#000",
  cardText: "#fff",
  lightBg: "#E6F0FF",
  profit: "#16A34A",
};

export type RootStackParamList = {
  ShareholderDashboard: undefined;
  ShareholderReport: undefined;
  ShareholderFvrt: undefined;
  ShareholderHistory: undefined;
};

type ShareholderNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const adminProjects = [
  { id: "PRJ-001", name: "E-Commerce Platform", value: 1200000, profit: 180000 },
  { id: "PRJ-002", name: "Fintech Mobile App", value: 800000, profit: 120000 },
  { id: "PRJ-003", name: "Real Estate CRM", value: 600000, profit: 90000 },
  { id: "PRJ-004", name: "Logistics Dashboard", value: 450000, profit: 60000 },
];

const AdminHistory: React.FC = () => {
  const navigation = useNavigation<ShareholderNavigationProp>();
  const [activeTab, setActiveTab] = useState("history");
  const [isMobile, setIsMobile] = useState(Dimensions.get("window").width < 768);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const sidebarAnim = useRef(new Animated.Value(-280)).current;
  const notifAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    const sub = Dimensions.addEventListener("change", ({ window }) => {
      setIsMobile(window.width < 768);
      if (window.width >= 768) setMobileSidebar(false);
    });
    return () => sub.remove();
  }, []);

  const totalProjects = adminProjects.length;
  const totalValue = adminProjects.reduce((sum, p) => sum + p.value, 0);
  const totalProfit = adminProjects.reduce((sum, p) => sum + p.profit, 0);

  const openNotifications = () => {
    setShowNotifications(true);
    Animated.timing(notifAnim, { toValue: 0, duration: 300, useNativeDriver: false }).start();
  };
  const closeNotifications = () => {
    Animated.timing(notifAnim, { toValue: 300, duration: 300, useNativeDriver: false }).start(() => setShowNotifications(false));
  };

  const openSidebar = () => {
    setMobileSidebar(true);
    Animated.timing(sidebarAnim, { toValue: 0, duration: 300, useNativeDriver: false }).start();
  };
  const closeSidebar = () => {
    Animated.timing(sidebarAnim, { toValue: -280, duration: 300, useNativeDriver: false }).start(() => setMobileSidebar(false));
  };

  return (
    <View style={{ flex: 1, flexDirection: "row", backgroundColor: COLORS.lightBg, minWidth: 360 }}>
      {/* Desktop Sidebar */}
      {!isMobile && <Sidebar activeTab={activeTab} onSelect={setActiveTab} />}

      {/* Main Content */}
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: COLORS.primary, paddingHorizontal: 16, paddingVertical: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {isMobile && (
              <TouchableOpacity onPress={openSidebar} style={{ marginRight: 12 }}>
                <Ionicons name="menu-outline" size={28} color="#fff" />
              </TouchableOpacity>
            )}
            <MaskedView
              maskElement={
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="briefcase-outline" size={24} color="#fff" style={{ marginRight: 6 }} />
                  <Text style={{ fontSize: 24, fontWeight: "600", color: "#fff" }}>Admin History</Text>
                </View>
              }
            >
              <LinearGradient colors={[COLORS.primary, COLORS.primary]}>
                <Text style={{ fontSize: 24, fontWeight: "600", opacity: 0 }}>Admin History</Text>
              </LinearGradient>
            </MaskedView>
          </View>

          <TouchableOpacity onPress={openNotifications}>
            <Ionicons name="notifications-outline" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView style={{ padding: 20 }}>
          {/* Summary */}
          <View style={{ backgroundColor: COLORS.cardBackground, borderRadius: 14, padding: 20, marginBottom: 20 }}>
            <Text style={{ color: COLORS.cardText, fontSize: 18, fontWeight: "700", marginBottom: 12 }}>Project Summary</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
              <Text style={{ color: COLORS.cardText }}>Total Projects</Text>
              <Text style={{ color: COLORS.cardText, fontWeight: "700" }}>{totalProjects}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
              <Text style={{ color: COLORS.cardText }}>Total Project Value</Text>
              <Text style={{ color: COLORS.cardText, fontWeight: "700" }}>₹{totalValue.toLocaleString()}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ color: COLORS.cardText }}>Total Company Profit</Text>
              <Text style={{ color: COLORS.cardText, fontWeight: "700" }}>₹{totalProfit.toLocaleString()}</Text>
            </View>
          </View>

          {/* Project List */}
          <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 12 }}>Project Details</Text>
          {adminProjects.map((project) => {
            const profitPercent = ((project.profit / project.value) * 100).toFixed(1);
            return (
              <View key={project.id} style={{ backgroundColor: "#fff", borderRadius: 14, padding: 16, marginBottom: 14, elevation: 3 }}>
                <Text style={{ fontSize: 16, fontWeight: "700", marginBottom: 4 }}>{project.name}</Text>
                <Text style={{ fontSize: 12, color: "#6B7280", marginBottom: 10 }}>Project ID: {project.id}</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                  <Text>Total Value</Text>
                  <Text style={{ fontWeight: "600" }}>₹{project.value.toLocaleString()}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                  <Text>Profit</Text>
                  <Text style={{ fontWeight: "700", color: COLORS.profit }}>₹{project.profit.toLocaleString()}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text>Profit Percentage</Text>
                  <Text style={{ fontWeight: "700" }}>{profitPercent}%</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>

      {/* MOBILE SIDEBAR OVERLAY */}
      {isMobile && mobileSidebar && (
        <>
          <TouchableWithoutFeedback onPress={closeSidebar}>
            <View style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.35)" }} />
          </TouchableWithoutFeedback>
          <Animated.View style={{ position: "absolute", left: sidebarAnim, top: 0, bottom: 0, width: 280, backgroundColor: "#fff", elevation: 10 }}>
            <Sidebar activeTab={activeTab} onSelect={closeSidebar} />
          </Animated.View>
        </>
      )}

      {/* Notifications */}
      {showNotifications && (
        <Animated.View style={{ position: "absolute", right: notifAnim, top: 0, width: 300, height: "100%", backgroundColor: "#fff", padding: 16, zIndex: 999 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>Notifications</Text>
            <TouchableOpacity onPress={closeNotifications}>
              <Ionicons name="close" size={24} />
            </TouchableOpacity>
          </View>
          <Text>No new notifications</Text>
        </Animated.View>
      )}
    </View>
  );
};

export default AdminHistory;
