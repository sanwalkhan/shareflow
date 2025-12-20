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
import Sidebar from "../SidebarComponent/sidebar";
import { LineChart, BarChart } from "react-native-chart-kit";

const COLORS = {
  primary: "#001867",
  accent: "#001867",
  chartLine: "#00ffc2",
};

const Header = ({
  title,
  openNotifications,
  toggleSidebar,
  isMobile,
  showButtonInHeader,
}: {
  title: string;
  openNotifications: () => void;
  toggleSidebar: () => void;
  isMobile: boolean;
  showButtonInHeader: boolean;
}) => (
  <View style={styles.header}>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {isMobile && (
        <TouchableOpacity style={styles.hamburgerBtn} onPress={toggleSidebar}>
          <Ionicons name="menu" size={24} color={COLORS.accent} />
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>{title}</Text>
    </View>

    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {showButtonInHeader && (
        <TouchableOpacity style={styles.searchBtn}>
          <Ionicons name="search-outline" size={18} color={COLORS.accent} />
          <Text style={styles.searchText}>Search everything</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={openNotifications}>
        <Ionicons name="notifications-outline" size={26} color="#fff" />
      </TouchableOpacity>
    </View>
  </View>
);

export default function ShareholderAnalytics() {
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showButtonInHeader, setShowButtonInHeader] = useState(true);

  const sidebarAnim = useRef(new Animated.Value(-260)).current;
  const notifAnim = useRef(new Animated.Value(320)).current;

  const screenWidth = Dimensions.get("window").width;

  /* ---------------- Responsive logic ---------------- */
  useEffect(() => {
    const update = () => {
      const width = Dimensions.get("window").width;
      setIsMobile(width <= 700);
      setShowButtonInHeader(width > 400); // button header mein ya main content mein
    };
    update();
    Dimensions.addEventListener("change", update);
    return () => Dimensions.removeEventListener("change", update);
  }, []);

  /* ---------------- Sidebar logic ---------------- */
  const openSidebar = () => {
    setShowSidebar(true);
    Animated.timing(sidebarAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const closeSidebar = () => {
    Animated.timing(sidebarAnim, {
      toValue: -260,
      duration: 250,
      useNativeDriver: false,
    }).start(() => setShowSidebar(false));
  };

  /* ---------------- Notifications ---------------- */
  const openNotifications = () => {
    setShowNotifications(true);
    Animated.timing(notifAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const closeNotifications = () => {
    Animated.timing(notifAnim, {
      toValue: 320,
      duration: 250,
      useNativeDriver: false,
    }).start(() => setShowNotifications(false));
  };

  /* ---------------- Charts data ---------------- */
  const salesData = {
    labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    datasets: [{ data: [50,75,60,90,85,95,70,110,120,100,130,150] }],
  };

  const projectData = {
    labels: ["Jan","Feb","Mar","Apr","May","Jun"],
    datasets: [{ data: [35,30,32,43,28,50] }],
  };

  return (
    <View style={styles.container}>
      {/* Desktop Sidebar */}
      {!isMobile && <Sidebar />}

      <View style={{ flex: 1 }}>
        <Header
          title="Analytics"
          openNotifications={openNotifications}
          toggleSidebar={openSidebar}
          isMobile={isMobile}
          showButtonInHeader={showButtonInHeader}
        />

        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {/* Button for small screens */}
          {!showButtonInHeader && (
            <TouchableOpacity style={[styles.searchBtn, { marginBottom: 16 }]}>
              <Ionicons name="search-outline" size={18} color={COLORS.accent} />
              <Text style={styles.searchText}>Search everything</Text>
            </TouchableOpacity>
          )}

          <Text style={styles.welcomeText}>Welcome back!</Text>

          <Text style={styles.sectionTitle}>Sales Analytics</Text>
          <LineChart
            data={salesData}
            width={isMobile ? screenWidth - 32 : screenWidth * 0.75}
            height={220}
            chartConfig={{
              backgroundColor: "#000",
              backgroundGradientFrom: "#000",
              backgroundGradientTo: "#000",
              decimalPlaces: 0,
              color: () => "#00ffc2",
              labelColor: () => "#fff",
            }}
            style={styles.chart}
          />

          <Text style={styles.sectionTitle}>Projects</Text>
          <BarChart
            data={projectData}
            width={isMobile ? screenWidth - 32 : screenWidth * 0.75}
            height={220}
            fromZero
            chartConfig={{
              backgroundColor: "#000",
              backgroundGradientFrom: "#000",
              backgroundGradientTo: "#000",
              decimalPlaces: 0,
              color: () => "#00ffc2",
              labelColor: () => "#fff",
            }}
            style={styles.chart}
          />
        </ScrollView>

        {/* Notifications Panel */}
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
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    minWidth: 360,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 8,
  },
  hamburgerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  searchBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 12,
  },
  searchText: {
    color: COLORS.accent,
    marginLeft: 6,
    fontWeight: "600",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  chart: {
    borderRadius: 12,
    marginBottom: 24,
  },
  mobileSidebar: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 260,
    backgroundColor: "#fff",
    zIndex: 1000,
    elevation: 10,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.35)",
    zIndex: 999,
  },
  notifications: {
    position: "absolute",
    top: 0,
    height: "100%",
    width: 320,
    backgroundColor: "#fff",
    padding: 16,
    zIndex: 1000,
    elevation: 8,
  },
  notifHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
});
