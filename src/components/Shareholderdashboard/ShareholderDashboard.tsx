// src/screens/ShareholderDashboard.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Sidebar from "./sidebar";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";

const COLORS = {
  primary: "#193288",
  button: "#FFC20E",
  success: "#16a34a",
  danger: "#dc2626",
  dark: "#000",
};

const MIN_WIDTH = 360;
const BREAKPOINT = 1000;

const ShareholderDashboard: React.FC = () => {
  const [screenWidth, setScreenWidth] = useState(Math.max(Dimensions.get("window").width, MIN_WIDTH));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarAnim = useRef(new Animated.Value(screenWidth < BREAKPOINT ? -260 : 0)).current;

  const isMobile = screenWidth < BREAKPOINT;

  const [showNotifications, setShowNotifications] = useState(false);
  const notifAnim = useRef(new Animated.Value(0)).current;

  // Chart widths dynamically
  const [revenueChartWidth, setRevenueChartWidth] = useState<number>();
  const [profitChartWidth, setProfitChartWidth] = useState<number>();
  const [histogramChartWidth, setHistogramChartWidth] = useState<number>();

  const notifications = [
    { title: "New Order Received", time: "2 min ago" },
    { title: "Revenue target achieved", time: "30 min ago" },
    { title: "Survey completed", time: "1 hr ago" },
  ];

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

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    Animated.timing(notifAnim, {
      toValue: showNotifications ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const stats = [
    { title: "Today's Revenue", value: "₹15,00,000", percent: "+4.8%", color: COLORS.success },
    { title: "Today's Orders", value: "7,506", percent: "-3.5%", color: COLORS.danger },
    { title: "Today's Visitors", value: "17,058", percent: "+9.3%", color: COLORS.success },
  ];

  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{ data: [200000, 450000, 300000, 800000, 950000, 1200000] }],
  };

  const histogramData = {
    labels: ["Analyze", "Schedule", "Survey"],
    datasets: [{ data: [50, 30, 20] }],
  };

  const pieData = [
    { name: "Profit", population: 65, color: "#16a34a", legendFontColor: "#fff", legendFontSize: 12 },
    { name: "Loss", population: 35, color: "#dc2626", legendFontColor: "#fff", legendFontSize: 12 },
  ];

  // Frequency data for Shareholder Distribution
  const shareholderFrequency = [
    { name: "Ali", value: 40 },
    { name: "Ahmed", value: 25 },
    { name: "Sara", value: 20 },
    { name: "Hassan", value: 15 },
  ];

  return (
    <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#E6F0FF", minWidth: MIN_WIDTH }}>
      {/* Desktop Sidebar */}
      {!isMobile && <Sidebar activeTab="Dashboard" />}

      {/* Mobile Sidebar */}
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

      {/* Main Content */}
      <View style={{ flex: 1 }}>
        {/* Header */}
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

          {/* Right Buttons */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            {!isMobile && (
              <>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#fff",
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    borderRadius: 8,
                  }}
                >
<Text style={{ color: COLORS.accent, fontWeight: "600" }}>
  Search for everything
</Text>

                </TouchableOpacity>
                
              </>
            )}

            {/* Bell icon always visible */}
            <TouchableOpacity onPress={toggleNotifications} style={{ marginLeft: 10 }}>
              <Ionicons name="notifications-outline" size={26} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Mobile Search Button */}
        {isMobile && (
          <View style={{ flexDirection: "column", margin: 16 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 8,
                marginBottom: 12,
              }}
            >
              <Text style={{ color: COLORS.button, fontWeight: "600" }}>Search for everything</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Notifications Panel */}
        {showNotifications && (
          <>
            <TouchableWithoutFeedback onPress={toggleNotifications}>
              <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 20 }} />
            </TouchableWithoutFeedback>
            <Animated.View
              style={{
                position: "absolute",
                top: 70,
                right: 16,
                width: 280,
                backgroundColor: "#000",
                borderRadius: 12,
                padding: 12,
                zIndex: 30,
                opacity: notifAnim,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", marginBottom: 10 }}>Notifications</Text>
              {notifications.map((n, i) => (
                <View
                  key={i}
                  style={{
                    borderBottomWidth: i !== notifications.length - 1 ? 1 : 0,
                    borderBottomColor: "#222",
                    paddingVertical: 10,
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 14 }}>{n.title}</Text>
                  <Text style={{ color: COLORS.success, fontSize: 12 }}>{n.time}</Text>
                </View>
              ))}
            </Animated.View>
          </>
        )}

        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
          {/* Stats */}
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

          {/* ROW 1: Revenue & Shareholder */}
          <View
            style={{
              flexDirection: isMobile ? "column" : "row",
              marginTop: 20,
              gap: 16,
            }}
          >
            {/* Revenue Growth */}
            <View
              style={{ flex: 1, backgroundColor: "#000", borderRadius: 12, padding: 12 }}
              onLayout={(event) => setRevenueChartWidth(event.nativeEvent.layout.width - 24)}
            >
              <Text style={{ color: "#fff", fontWeight: "700", marginBottom: 12 }}>Revenue Growth</Text>
              <LineChart
                data={revenueData}
                width={revenueChartWidth || "100%"}
                height={220}
                chartConfig={chartConfig}
                bezier
              />
            </View>

            {/* Shareholder Distribution - Mini Bars */}
            <View style={{ flex: 1, backgroundColor: "#000", borderRadius: 12, padding: 12 }}>
              <Text style={{ color: "#fff", fontWeight: "700", marginBottom: 12 }}>Shareholder Distribution</Text>
              {shareholderFrequency.map((s, i) => (
                <View key={i} style={{ marginBottom: 12 }}>
                  <Text style={{ color: "#fff", marginBottom: 4 }}>{s.name}</Text>
                  <View
                    style={{
                      backgroundColor: "#222",
                      height: 12,
                      borderRadius: 6,
                      overflow: "hidden",
                    }}
                  >
                    <View
                      style={{
                        width: `${s.value}%`,
                        height: "100%",
                        backgroundColor: COLORS.button,
                      }}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* ROW 2: Profit vs Loss & Histogram */}
          <View
            style={{
              flexDirection: isMobile ? "column" : "row",
              marginTop: 20,
              gap: 16,
            }}
          >
            {/* Profit vs Loss */}
            <View
              style={{ flex: 1, backgroundColor: "#000", borderRadius: 12, padding: 12 }}
              onLayout={(event) => setProfitChartWidth(event.nativeEvent.layout.width - 24)}
            >
              <Text style={{ color: "#fff", fontWeight: "700", marginBottom: 12 }}>Profit vs Loss</Text>
              <PieChart
                data={pieData.map((p) => ({ ...p, population: Number(p.population) }))}
                width={profitChartWidth || "100%"}
                height={220}
                accessor="population"
                backgroundColor="transparent"
                chartConfig={chartConfig}
              />
            </View>

            {/* Analyze / Schedule / Survey */}
            <View
              style={{ flex: 1, backgroundColor: "#000", borderRadius: 12, padding: 12 }}
              onLayout={(event) => setHistogramChartWidth(event.nativeEvent.layout.width - 24)}
            >
              <Text style={{ color: "#fff", fontWeight: "700", marginBottom: 12 }}>Analyze / Schedule / Survey</Text>
              <BarChart
                data={histogramData}
                width={histogramChartWidth || "100%"}
                height={220}
                chartConfig={chartConfig}
                fromZero
                showValuesOnTopOfBars
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const chartConfig = {
  backgroundGradientFrom: "#000",
  backgroundGradientTo: "#000",
  color: () => "#FFC20E",
  labelColor: () => "#fff",
};

export default ShareholderDashboard;
