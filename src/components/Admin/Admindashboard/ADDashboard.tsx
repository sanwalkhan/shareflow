// src/components/Shareholder.tsx
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
import { LinearGradient } from "expo-linear-gradient";
import { LineChart } from "react-native-chart-kit";
import Sidebar from "./ADsidebar";
//////////////////Theme.tsx colors
const COLORS = {
  primary: "#193288",
  accent: "#001867",
  success: "#16a34a",
  danger: "#dc2626",
};

const ADDashboard: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(Dimensions.get("window").width);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarAnim = useRef(new Animated.Value(-260)).current;

  const [showNotifications, setShowNotifications] = useState(false);
  const notifAnim = useRef(new Animated.Value(0)).current;

  const isDesktop = windowWidth >= 1000;
  const isMobile = windowWidth < 1000;
  const isSmallMobile = windowWidth <= 360;

  useEffect(() => {
    const sub = Dimensions.addEventListener("change", ({ window }) =>
      setWindowWidth(window.width)
    );
    return () => sub.remove();
  }, []);

  useEffect(() => {
    if (isDesktop) {
      Animated.timing(sidebarAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }).start();
      setSidebarOpen(false);
    }
  }, [isDesktop]);

  const toggleSidebar = () => {
    const toValue = sidebarOpen ? -260 : 0;
    setSidebarOpen(!sidebarOpen);
    Animated.timing(sidebarAnim, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const toggleNotifications = () => {
    if (showNotifications) {
      Animated.timing(notifAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setShowNotifications(false));
    } else {
      setShowNotifications(true);
      Animated.timing(notifAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  };

  // ---------------- DATA ----------------
  const topStats = [
    { title: "Total Projects", value: "56", percent: "+10%", color: COLORS.success },
    { title: "Recent Projects", value: "7", percent: "-2%", color: COLORS.danger },
    { title: "Total Investors", value: "120", percent: "+5%", color: COLORS.success },
  ];

  const bestSellingProjects = [
    { name: "Green Energy Project", status: "Active" },
    { name: "AI Startup Initiative", status: "Pending" },
    { name: "Community Center Build", status: "Completed" },
  ];

  const pollData = [
    { project: "Green Energy", votes: 35 },
    { project: "AI Startup", votes: 25 },
    { project: "Community", votes: 40 },
  ];

  const recentShareholders = [
    { name: "Ali Khan", date: "2025-12-10" },
    { name: "Sara Ahmed", date: "2025-12-12" },
    { name: "Usman Qureshi", date: "2025-12-15" },
  ];

  const notifications = [
    { title: "New Investor Joined", time: "2 min ago" },
    { title: "Project Approved", time: "10 min ago" },
    { title: "Payment Received", time: "1 hour ago" },
  ];

  return (
    <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#E6F0FF" }}>
      {/* DESKTOP SIDEBAR */}
      {isDesktop && <Sidebar />}

      {/* MOBILE SIDEBAR */}
      {!isDesktop && sidebarOpen && (
        <>
          <TouchableOpacity
            onPress={toggleSidebar}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.3)",
              zIndex: 9,
            }}
          />
          <Animated.View
            style={{
              position: "absolute",
              left: sidebarAnim,
              top: 0,
              width: 260,
              height: "100%",
              backgroundColor: "#fff",
              zIndex: 10,
            }}
          >
            <Sidebar mobile />
          </Animated.View>
        </>
      )}

      {/* MAIN */}
      <View style={{ flex: 1 }}>
        {/* HEADER */}
        <View
          style={{
            backgroundColor: COLORS.primary,
            paddingHorizontal: 16,
            paddingVertical: 12,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* LEFT */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {!isDesktop && (
              <TouchableOpacity onPress={toggleSidebar} style={{ marginRight: 12 }}>
                <Ionicons name="menu" size={28} color="#fff" />
              </TouchableOpacity>
            )}
            <Text style={{ fontSize: 22, fontWeight: "600", color: "#fff" }}>
              Dashboard
            </Text>
          </View>

          {/* RIGHT */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {isDesktop && (
              <>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#fff",
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    borderRadius: 8,
                    marginRight: 10,
                  }}
                >
                  <Text style={{ color: COLORS.accent, fontWeight: "600" }}>
                    Search for everything
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: "#fff",
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    borderRadius: 8,
                    marginRight: 10,
                  }}
                >
                  <Text style={{ color: COLORS.accent, fontWeight: "600" }}>
                    + Add new
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {/* Bell Icon */}
            <TouchableOpacity onPress={toggleNotifications}>
              <Ionicons name="notifications-outline" size={26} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Notification Panel */}
        {showNotifications && (
          <>
            {/* Overlay */}
            <TouchableOpacity
              activeOpacity={1}
              onPress={toggleNotifications}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 20,
              }}
            />

            {/* Notification Box */}
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
                transform: [
                  {
                    translateY: notifAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-20, 0],
                    }),
                  },
                ],
                opacity: notifAnim,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  marginBottom: 10,
                }}
              >
                Notifications
              </Text>

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

        {/* CONTENT */}
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {/* MOBILE BUTTONS */}
          {!isDesktop && (
            <View style={{ flexDirection: "row", gap: 10, marginBottom: 16 }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "#fff",
                  padding: 12,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: COLORS.accent,
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  Search for everything
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "#fff",
                  padding: 12,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: COLORS.accent,
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  + Add new
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* TOP STATS */}
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
            {topStats.map((item, idx) => (
              <View
                key={idx}
                style={{
                  backgroundColor: "#000",
                  padding: 16,
                  borderRadius: 12,
                  minWidth: isMobile ? "100%" : 220,
                  flex: 1,
                }}
              >
                <Text style={{ color: "#fff" }}>{item.title}</Text>
                <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
                  {item.value}
                </Text>
                <Text style={{ color: item.color }}>{item.percent}</Text>
              </View>
            ))}
          </View>

          {/* BEST SELLING + ANALYTICS */}
          <View
            style={{
              flexDirection: isDesktop ? "row" : "column",
              gap: 20,
              marginTop: 46,
              flexWrap: "wrap",
            }}
          >
            {/* Uniform height */}
            <View style={{ flex: 1, backgroundColor: "#000", padding: 16, borderRadius: 12, minHeight: 240 }}>
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Best Selling Projects</Text>
              {bestSellingProjects.map((p, i) => (
                <View
                  key={i}
                  style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}
                >
                  <Text style={{ color: "#fff" }}>{p.name}</Text>
                  <Text style={{ color: COLORS.success }}>{p.status}</Text>
                </View>
              ))}
            </View>

            <View style={{ flex: 1, backgroundColor: "#000", padding: 16, borderRadius: 12, minHeight: 240 }}>
              <Text style={{ color: COLORS.success, fontWeight: "bold", marginBottom: 8 }}>Projects Analytics</Text>
              <LineChart
                data={{
                  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                  datasets: [{ data: [12, 19, 14, 23, 18, 27] }],
                }}
                width={isDesktop ? windowWidth / 2 - 80 : windowWidth - 60}
                height={200}
                chartConfig={{
                  backgroundColor: "#000",
                  backgroundGradientFrom: "#000",
                  backgroundGradientTo: "#000",
                  decimalPlaces: 0,
                  color: () => COLORS.success,
                  labelColor: () => "#fff",
                }}
                style={{ borderRadius: 12 }}
              />
            </View>
          </View>

          {/* POLL + RECENT */}
          <View
            style={{
              flexDirection: isDesktop ? "row" : "column",
              gap: 20,
              marginTop: 46,
              flexWrap: "wrap",
            }}
          >
            <View style={{ flex: 1, backgroundColor: "#000", padding: 16, borderRadius: 12, minHeight: 240 }}>
              <Text style={{ color: COLORS.success, fontWeight: "bold", marginBottom: 12 }}>Project Poll</Text>
              <View style={{ flexDirection: "row", justifyContent: "space-around", height: 160 }}>
                {pollData.map((p, i) => {
                  const max = Math.max(...pollData.map(x => x.votes));
                  return (
                    <View key={i} style={{ alignItems: "center" }}>
                      <Text style={{ color: COLORS.success }}>{p.votes}</Text>
                      <LinearGradient
                        colors={[COLORS.success, "#000"]}
                        style={{
                          height: (p.votes / max) * 120,
                          width: isSmallMobile ? 20 : 28,
                          borderRadius: 6,
                        }}
                      />
                      <Text style={{ color: COLORS.success, fontSize: 10 }}>{p.project}</Text>
                    </View>
                  );
                })}
              </View>
            </View>

            <View style={{ flex: 1, backgroundColor: "#000", padding: 16, borderRadius: 12, minHeight: 240 }}>
              <Text style={{ color: COLORS.success, fontWeight: "bold", marginBottom: 12 }}>Recently Added Shareholders</Text>
              {recentShareholders.map((r, i) => (
                <View
                  key={i}
                  style={{
                    backgroundColor: "#111",
                    padding: 16,
                    borderRadius: 12,
                    marginBottom: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#fff" }}>{r.name}</Text>
                  <Text style={{ color: COLORS.success }}>{r.date}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ADDashboard;
