// src/screens/ShareholderDashboard.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Sidebar from "../SidebarComponent/sidebar";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";

/* ---------------- CONSTANTS ---------------- */
const COLORS = {
  primary: "#193288",
  button: "#FFC20E",
  success: "#16a34a",
  danger: "#dc2626",
  dark: "#000",
};

const MIN_WIDTH = 360;
const BREAKPOINT = 700;

/* ---------------- COMPONENT ---------------- */
const ShareholderDashboard: React.FC = () => {
  const [screenWidth, setScreenWidth] = useState(
    Math.max(Dimensions.get("window").width, MIN_WIDTH)
  );
  const isMobile = screenWidth < BREAKPOINT;

  /* -------- SIDEBAR -------- */
  const sidebarAnim = useRef(new Animated.Value(isMobile ? -260 : 0)).current;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const onChange = ({ window }: { window: { width: number; height: number } }) => {
      const w = Math.max(window.width, MIN_WIDTH);
      setScreenWidth(w);
      if (w >= BREAKPOINT) {
        sidebarAnim.setValue(0);
        setSidebarOpen(false);
      } else {
        sidebarAnim.setValue(-260);
      }
    };
    const subscription = Dimensions.addEventListener("change", onChange);
    return () => {
      if (subscription?.remove) subscription.remove();
      else Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const toggleSidebar = () => {
    Animated.timing(sidebarAnim, {
      toValue: sidebarOpen ? -260 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    Animated.timing(sidebarAnim, {
      toValue: -260,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setSidebarOpen(false));
  };

  /* ---------------- DATA ---------------- */
  const stats = [
    { title: "Today's Revenue", value: "₹15,00,000", percent: "+4.8%", color: COLORS.success },
    { title: "Today's Orders", value: "7,506", percent: "-3.5%", color: COLORS.danger },
    { title: "Today's Visitors", value: "17,058", percent: "+9.3%", color: COLORS.success },
  ];

  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{ data: [200000, 450000, 300000, 800000, 950000, 1200000] }],
  };

  const barData = {
    labels: ["Ali", "Ahmed", "Sara", "Hassan"],
    datasets: [{ data: [40, 25, 20, 15] }],
  };

  const pieData = [
    { name: "Profit", population: 65, color: "#16a34a", legendFontColor: "#fff", legendFontSize: 12 },
    { name: "Loss", population: 35, color: "#dc2626", legendFontColor: "#fff", legendFontSize: 12 },
  ];

  const chartWidth = screenWidth - (isMobile ? 32 : 64);

  /* ---------------- RENDER ---------------- */
  return (
    <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#E6F0FF", minWidth: 360 }}>
      {/* DESKTOP SIDEBAR */}
      {!isMobile && <Sidebar activeTab="Dashboard" />}

      {/* MOBILE SIDEBAR */}
      {isMobile && (
        <>
          {sidebarOpen && (
            <TouchableOpacity
              activeOpacity={1}
              onPress={closeSidebar}
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "rgba(0,0,0,0.3)",
                zIndex: 998,
              }}
            />
          )}
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
            <Sidebar activeTab="Dashboard" onClose={closeSidebar} mobile />
          </Animated.View>
        </>
      )}

      {/* MAIN CONTENT */}
      <View style={{ flex: 1 }}>
        {/* HEADER */}
        <View
          style={{
            backgroundColor: COLORS.primary,
            padding: 14,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {isMobile && (
              <TouchableOpacity onPress={toggleSidebar} style={{ marginRight: 12 }}>
                <Ionicons name={sidebarOpen ? "close" : "menu"} size={26} color="#fff" />
              </TouchableOpacity>
            )}
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>Dashboard</Text>
          </View>
        </View>

        {/* CONTENT */}
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {/* STATS */}
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
            {stats.map((s, i) => (
              <View
                key={i}
                style={{
                  width: isMobile ? "100%" : "32%",
                  backgroundColor: COLORS.dark,
                  padding: 16,
                  borderRadius: 12,
                }}
              >
                <Text style={{ color: "#fff" }}>{s.title}</Text>
                <Text style={{ color: "#fff", fontSize: 18, fontWeight: "700" }}>{s.value}</Text>
                <Text style={{ color: s.color }}>{s.percent}</Text>
              </View>
            ))}
          </View>

          {/* LINE CHART */}
          <Card title="Revenue Growth">
            <LineChart data={revenueData} width={chartWidth} height={220} chartConfig={chartConfig} bezier />
          </Card>

          {/* BAR CHART */}
          <Card title="Shareholder Distribution">
            <BarChart data={barData} width={chartWidth} height={220} chartConfig={chartConfig} />
          </Card>

          {/* PIE CHART */}
          <Card title="Profit vs Loss">
            <PieChart
              data={pieData.map((p) => ({ ...p, population: Number(p.population) }))}
              width={chartWidth}
              height={220}
              accessor="population"
              backgroundColor="transparent"
              chartConfig={chartConfig}
            />
          </Card>
        </ScrollView>
      </View>
    </View>
  );
};

/* ---------------- SMALL COMPONENTS ---------------- */
const Card = ({ title, children }: any) => (
  <View style={{ backgroundColor: "#000", padding: 16, borderRadius: 12, marginTop: 20 }}>
    <Text style={{ color: "#fff", fontWeight: "700", marginBottom: 10 }}>{title}</Text>
    {children}
  </View>
);

const chartConfig = {
  backgroundGradientFrom: "#000",
  backgroundGradientTo: "#000",
  color: () => "#FFC20E",
  labelColor: () => "#fff",
};

export default ShareholderDashboard;
