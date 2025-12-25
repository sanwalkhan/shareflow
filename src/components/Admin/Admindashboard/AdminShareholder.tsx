// src/components/AdminDashboard.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LineChart, BarChart } from "react-native-chart-kit";
import Sidebar from "../AdminSidebar/ADsidebar";

export type RootStackParamList = {
  Dashboard: undefined;
  Adminreport: undefined;
  ShareholderFvrt: undefined;
  ShareholderHistory: undefined;
};

type AdminNavigationProp = NativeStackNavigationProp<RootStackParamList, "Dashboard">;

const COLORS = {
  primary: "#193288",
  accent: "#001867ff",
  button: "#FFC20E",
  textDark: "#111827",
  success: "#16a34a",
  danger: "#dc2626",
  secondary: "#001867",
};

const AdminShareholder: React.FC = () => {
  const navigation = useNavigation<AdminNavigationProp>();
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width);
  const slideAnim = useRef(new Animated.Value(-280)).current;

  const breakpoint = 768;
  const isSmallScreen = screenWidth < breakpoint;

  useEffect(() => {
    const updateWidth = () => setScreenWidth(Dimensions.get("window").width);
    Dimensions.addEventListener("change", updateWidth);
    return () => Dimensions.removeEventListener("change", updateWidth);
  }, []);

  const topStats = [
    { title: "Today's Sales", value: "₹15,00,000", percent: "+4.8%", color: COLORS.success },
    { title: "Customer Fulfillment", value: "92%", percent: "-3.5%", color: COLORS.danger },
    { title: "Visitor Insights", value: "17,058", percent: "+9.3%", color: COLORS.success },
  ];

  const activeProjects = [
    {
      projectId: "PRJ001",
      name: "Green Building",
      price: "₹50,00,000",
      quality: "High",
      stock: 5,
      image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
    },
    {
      projectId: "PRJ002",
      name: "Urban Apartments",
      price: "₹30,00,000",
      quality: "Medium",
      stock: 3,
      image: "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg",
    },
    {
      projectId: "PRJ003",
      name: "Luxury Villas",
      price: "₹75,00,000",
      quality: "Premium",
      stock: 2,
      image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
    },
  ];

  const toggleSidebar = () => {
    if (sidebarOpen) {
      Animated.timing(slideAnim, { toValue: -280, duration: 250, useNativeDriver: false }).start(() =>
        setSidebarOpen(false)
      );
    } else {
      setSidebarOpen(true);
      Animated.timing(slideAnim, { toValue: 0, duration: 250, useNativeDriver: false }).start();
    }
  };

  const closeNotifications = () => setShowNotifications(false);
  const openNotifications = () => setShowNotifications(true);

  return (
    <View style={styles.container}>
      {!isSmallScreen && <Sidebar />}

      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {isSmallScreen && (
              <TouchableOpacity onPress={toggleSidebar} style={{ marginRight: 12 }}>
                <Ionicons name="menu-outline" size={28} color="#fff" />
              </TouchableOpacity>
            )}

            <MaskedView
              maskElement={
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="speedometer-outline" size={24} color="#fff" style={{ marginRight: 6 }} />
                  <Text style={{ fontSize: 24, fontWeight: "600", color: "#fff" }}>Admin Dashboard</Text>
                </View>
              }
            >
              <LinearGradient colors={[COLORS.primary, COLORS.primary]}>
                <Text style={{ fontSize: 24, fontWeight: "600", opacity: 0 }}>Admin Dashboard</Text>
              </LinearGradient>
            </MaskedView>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={openNotifications}>
              <Ionicons name="notifications-outline" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Scrollable content */}
        <ScrollView contentContainerStyle={{ padding: 12 }}>
          {/* Stats */}
          <View
            style={{
              flexDirection: screenWidth < 981 ? "column" : isSmallScreen ? "column" : "row",
              justifyContent: "space-between",
              marginBottom: 16,
              gap: 12,
            }}
          >
            {topStats.map((card, idx) => (
              <View
                key={idx}
                style={{
                  backgroundColor: "#000",
                  padding: 16,
                  borderRadius: 12,
                  flex: screenWidth < 980 ? undefined : isSmallScreen ? 1 : undefined,
                  width: screenWidth < 980 ? "100%" : isSmallScreen ? "100%" : (screenWidth - 48) / 3.5,
                }}
              >
                <Text style={{ color: "#fff", fontSize: 12 }}>{card.title}</Text>
                <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold", marginTop: 4 }}>
                  {card.value}
                </Text>
                <Text style={{ color: card.color, marginTop: 2 }}>{card.percent} from yesterday</Text>
              </View>
            ))}
          </View>

          {/* Charts */}
          <View
            style={{
              flexDirection: isSmallScreen ? "column" : "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginBottom: 16,
              gap: 12,
            }}
          >
            {/* Line Chart */}
            <View
              style={{
                flex: isSmallScreen ? 1 : 0.48,
                backgroundColor: "#1c1c1c",
                borderRadius: 12,
                padding: 12,
                marginBottom: 16,
                overflow: "hidden",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "700", marginBottom: 8 }}>Weekly Sales</Text>
              <LineChart
                data={{
                  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                  datasets: [{ data: [120000, 150000, 110000, 170000, 160000, 140000, 180000] }],
                }}
                width={isSmallScreen ? screenWidth - 32 : (screenWidth * 0.48 - 12)}
                height={200}
                chartConfig={{
                  backgroundGradientFrom: "#1c1c1c",
                  backgroundGradientTo: "#1c1c1c",
                  color: () => "#28A745",
                  labelColor: () => "#fff",
                  propsForDots: { r: "4", strokeWidth: "2", stroke: "#28A745" },
                }}
                bezier
                style={{ borderRadius: 12 }}
              />
            </View>

            {/* Bar Chart */}
            <View
              style={{
                flex: isSmallScreen ? 1 : 0.48,
                backgroundColor: "#1c1c1c",
                borderRadius: 12,
                padding: 12,
                marginBottom: 16,
                overflow: "hidden",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "700", marginBottom: 8 }}>Customer Fulfillment</Text>
              <BarChart
                data={{
                  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
                  datasets: [{ data: [80, 85, 90, 92, 92] }],
                }}
                width={isSmallScreen ? screenWidth - 32 : (screenWidth * 0.48 - 12)}
                height={200}
                chartConfig={{
                  backgroundGradientFrom: "#1c1c1c",
                  backgroundGradientTo: "#1c1c1c",
                  color: () => "#FFC20E",
                  labelColor: () => "#fff",
                }}
                style={{ borderRadius: 12 }}
              />
            </View>
          </View>

          {/* Projects Table */}
          <Text style={{ color: "#111827", fontWeight: "700", fontSize: 20, marginBottom: 12 }}>
            Currently Active Projects
          </Text>

          <View style={{ flexDirection: "row", backgroundColor: "#193288", padding: 12, borderRadius: 12, marginBottom: 8 }}>
            <Text style={{ flex: 1, color: "#fff", fontWeight: "600" }}>Project Name</Text>
            <Text style={{ flex: 1, color: "#fff", fontWeight: "600" }}>Price</Text>
            <Text style={{ flex: 1, color: "#fff", fontWeight: "600" }}>Quality</Text>
            <Text style={{ flex: 1, color: "#fff", fontWeight: "600" }}>Stock</Text>
            <Text style={{ width: 80, color: "#fff", fontWeight: "600", textAlign: "center" }}>Image</Text>
          </View>

          {activeProjects.map((project) => (
            <View
              key={project.projectId}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#fff",
                padding: 12,
                borderRadius: 12,
                marginBottom: 8,
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <Text style={{ flex: 1, fontWeight: "600" }}>{project.name}</Text>
              <Text style={{ flex: 1 }}>{project.price}</Text>
              <Text style={{ flex: 1 }}>{project.quality}</Text>
              <Text style={{ flex: 1 }}>{project.stock}</Text>
              <Image source={{ uri: project.image }} style={{ width: 50, height: 50, borderRadius: 8 }} />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Notifications */}
      {showNotifications && (
        <Animated.View style={styles.notificationDrawer}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>Notifications</Text>
            <TouchableOpacity onPress={closeNotifications}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <ScrollView>
            {activeProjects.map((item, idx) => (
              <View key={idx} style={{ paddingVertical: 8, borderBottomWidth: 0.5, borderBottomColor: "#ccc" }}>
                <Text>{item.name} - Active</Text>
              </View>
            ))}
          </ScrollView>
        </Animated.View>
      )}

      {/* Mobile Sidebar */}
      {isSmallScreen && sidebarOpen && (
        <Animated.View style={[styles.mobileSidebar, { left: slideAnim }]}>
          <Sidebar />
          <TouchableOpacity
            onPress={toggleSidebar}
            style={{ position: "absolute", top: 10, right: 10, zIndex: 100 }}
          >
            <Ionicons name="close-outline" size={28} color="#fff" />
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row", backgroundColor: "#E6F0FF", minWidth: 360 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
  },
  mobileSidebar: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 280,
    backgroundColor: "#193288",
    zIndex: 1000,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    paddingTop: 40,
    paddingHorizontal: 12,
  },
  notificationDrawer: {
    position: "absolute",
    right: 0,
    top: 0,
    height: "100%",
    width: 300,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    padding: 16,
  },
});

export default AdminShareholder;
