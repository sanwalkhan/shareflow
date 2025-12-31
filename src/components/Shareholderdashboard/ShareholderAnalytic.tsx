// src/screens/ShareholderAnalytics.tsx
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Sidebar from "./sidebar";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";

const COLORS = {
  primary: "#193288",
 accent: "#001867ff",
  chartLine: "#00ffc2",
  pieColors: ["#16a34a", "#dc2626", "#f59e0b", "#3b82f6"],
};

export default function ShareholderAnalytics() {
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width);

  const sidebarAnim = useRef(new Animated.Value(-260)).current;
  const notifAnim = useRef(new Animated.Value(320)).current;

  useEffect(() => {
    const update = () => {
      const width = Dimensions.get("window").width;
      setIsMobile(width <= 1000);
      setScreenWidth(width);
    };
    update();
    Dimensions.addEventListener("change", update);
    return () => Dimensions.removeEventListener("change", update);
  }, []);

  const openSidebar = () => {
    setShowSidebar(true);
    Animated.timing(sidebarAnim, { toValue: 0, duration: 250, useNativeDriver: false }).start();
  };
  const closeSidebar = () => {
    Animated.timing(sidebarAnim, { toValue: -260, duration: 250, useNativeDriver: false }).start(() => setShowSidebar(false));
  };

  const openNotifications = () => {
    setShowNotifications(true);
    Animated.timing(notifAnim, { toValue: 0, duration: 250, useNativeDriver: false }).start();
  };
  const closeNotifications = () => {
    Animated.timing(notifAnim, { toValue: 320, duration: 250, useNativeDriver: false }).start(() => setShowNotifications(false));
  };

  // Chart data
  const revenueData = { labels: ["Jan","Feb","Mar","Apr","May","Jun"], datasets: [{ data: [50, 75, 60, 90, 85, 95] }] };
  const shareholderData = { labels: ["Ali","Ahmed","Sara","Hassan"], datasets: [{ data: [40,25,20,15] }] };
  const histogramData = { labels: ["Analyze","Schedule","Survey"], datasets: [{ data: [50,30,20] }] };
  const pieData = [
    { name: "Profit", population: 65, color: COLORS.pieColors[0], legendFontColor: "#fff", legendFontSize: 12 },
    { name: "Loss", population: 35, color: COLORS.pieColors[1], legendFontColor: "#fff", legendFontSize: 12 },
    { name: "Pending", population: 15, color: COLORS.pieColors[2], legendFontColor: "#fff", legendFontSize: 12 },
  ];

  // Compute widths and container height
  const leftContainerWidth = isMobile ? screenWidth - 32 : (screenWidth - 48) * 0.45;
  const rightContainerWidth = isMobile ? screenWidth - 32 : (screenWidth - 48) * 0.55;
  const containerHeight = 280; // increased height

  const chartConfig = {
    backgroundColor: "#000",
    backgroundGradientFrom: "#000",
    backgroundGradientTo: "#000",
    decimalPlaces: 0,
    color: () => COLORS.chartLine,
    labelColor: () => "#fff",
  };

  return (
    <View style={styles.container}>
      {!isMobile && <Sidebar />}

      <View style={{ flex: 1 }}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {isMobile && (
              <TouchableOpacity style={styles.hamburgerBtn} onPress={openSidebar}>
                <Ionicons name="menu" size={24} color={COLORS.accent} />
              </TouchableOpacity>
            )}
            <Text style={styles.headerTitle}>Shareholder Analytics</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {screenWidth > 800 && (
              <TouchableOpacity style={styles.searchBtn}>
                <Ionicons name="search-outline" size={18} color={COLORS.accent} />
               <Text style={[styles.searchText, { color: COLORS.accent }]}>
  Search everything
</Text>

              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={openNotifications} style={{ marginLeft: 10 }}>
              <Ionicons name="notifications-outline" size={26} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {screenWidth <= 800 && (
            <TouchableOpacity style={[styles.searchBtn, { marginBottom: 16 }]}>
              <Ionicons name="search-outline" size={18} color={COLORS.accent} />
              <Text style={styles.searchText}>Search everything</Text>
            </TouchableOpacity>
          )}

          {/* Row 1: Containers 1 & 2 */}
          <View style={{ flexDirection: isMobile ? "column" : "row", gap: 16, marginBottom: 16 }}>
            <View style={[styles.card, { width: leftContainerWidth, height: containerHeight }]}>
              <Text style={styles.cardTitle}>Revenue Growth</Text>
              <LineChart
                data={revenueData}
                width={leftContainerWidth - 16}
                height={containerHeight - 40}
                chartConfig={chartConfig}
                style={{ borderRadius: 12 }}
              />
            </View>

            <View style={[styles.card, { width: rightContainerWidth, height: containerHeight }]}>
              <Text style={styles.cardTitle}>Shareholder Distribution</Text>
              <BarChart
                data={shareholderData}
                width={rightContainerWidth - 16}
                height={containerHeight - 40}
                fromZero
                chartConfig={chartConfig}
                style={{ borderRadius: 12 }}
              />
            </View>
          </View>

          {/* Row 2: Containers 3 & 4 */}
          <View style={{ flexDirection: isMobile ? "column" : "row", gap: 16 }}>
            <View style={[styles.card, { width: leftContainerWidth, height: containerHeight }]}>
              <Text style={styles.cardTitle}>Profit vs Loss Ratio</Text>
              <PieChart
                data={pieData}
                width={leftContainerWidth - 16}
                height={containerHeight - 40}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                chartConfig={chartConfig}
                hasLegend={true}
              />
            </View>

            <View style={[styles.card, { width: rightContainerWidth, height: containerHeight }]}>
              <Text style={styles.cardTitle}>Analyze / Schedule / Survey</Text>
              <BarChart
                data={histogramData}
                width={rightContainerWidth - 16}
                height={containerHeight - 40}
                fromZero
                chartConfig={chartConfig}
                style={{ borderRadius: 12 }}
              />
            </View>
          </View>
        </ScrollView>

        {/* Notifications */}
        {showNotifications && (
          <Animated.View style={[styles.notifications, { right: notifAnim }]}>
            <View style={styles.notifHeader}>
              <Text style={{ fontSize: 18, fontWeight: "700" }}>Notifications</Text>
              <TouchableOpacity onPress={closeNotifications}>
                <Ionicons name="close" size={22} />
              </TouchableOpacity>
            </View>
            <Text>Revenue increased by 10%</Text>
            <Text>New project added</Text>
            <Text>Monthly target achieved</Text>
          </Animated.View>
        )}

        {/* Mobile Sidebar */}
        {showSidebar && isMobile && (
          <>
            <TouchableWithoutFeedback onPress={closeSidebar}>
              <View style={styles.backdrop} />
            </TouchableWithoutFeedback>

            <Animated.View style={[styles.mobileSidebar, { left: sidebarAnim }]}>
              <Sidebar mobile open={showSidebar} onClose={closeSidebar} />
            </Animated.View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row", backgroundColor: "#f5f5f5", minWidth: 360 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: COLORS.primary, paddingHorizontal: 16, paddingVertical: 16, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, elevation: 5 },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#fff", marginLeft: 8 },
  hamburgerBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#fff", justifyContent: "center", alignItems: "center", marginRight: 8 },
  searchBtn: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, marginRight: 12 },
  searchText: { color: COLORS.accent, marginLeft: 6, fontWeight: "600" },
  card: { backgroundColor: "#000", borderRadius: 12, padding: 12, marginBottom: 16 },
  cardTitle: { color: "#fff", fontWeight: "700", fontSize: 18, marginBottom: 12 },
  mobileSidebar: { position: "absolute", top: 0, bottom: 0, width: 260, backgroundColor: "#fff", zIndex: 1000, elevation: 10 },
  backdrop: { position: "absolute", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: "rgba(0,0,0,0.35)", zIndex: 999 },
  notifications: { position: "absolute", top: 0, height: "100%", width: 320, backgroundColor: "#fff", padding: 16, zIndex: 1000, elevation: 8 },
  notifHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16 },
});

