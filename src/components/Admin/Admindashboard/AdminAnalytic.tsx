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
import Sidebar from "./ADsidebar";
import { LineChart } from "react-native-chart-kit";

const COLORS = {
  primary: "#193288",
   accent: "#16a34a",
  chartLine: "#16a34a",
  background: "#000",
};

const screenWidth = Dimensions.get("window").width;

const Header: React.FC<{
  title: string;
  toggleSidebar: () => void;
  isMobile: boolean;
  showHamburger: boolean;
  toggleNotifications: () => void;
}> = ({ title, isMobile, showHamburger, toggleNotifications, toggleSidebar }) => (
  <View style={styles.header}>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {showHamburger && (
        <TouchableOpacity
          onPress={toggleSidebar}
          style={{
            marginRight: 8,
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: COLORS.accent,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1001,
          }}
        >
          <Ionicons name="menu" size={24} color="#fff" />
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>{title}</Text>
    </View>

    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      {/* Desktop button inside header */}
      {!isMobile && (
        <TouchableOpacity
          style={{
            backgroundColor: "#fff",
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#0A1F44", fontWeight: "600" }}>
  Search for everything
</Text>

        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={toggleNotifications} style={{ marginLeft: 10 }}>
        <Ionicons name="notifications-outline" size={26} color="#fff" />
      </TouchableOpacity>
    </View>
  </View>
);

export default function AdminAnalytics() {
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [screenWidthState, setScreenWidthState] = useState(Dimensions.get("window").width);
  const [showNotifications, setShowNotifications] = useState(false);

  const sidebarAnim = useRef(new Animated.Value(-280)).current;
  const notifAnim = useRef(new Animated.Value(0)).current;

  const topStats = [
    { title: "Total Projects", value: "42", percent: "+8%", color: COLORS.accent },
    { title: "Ongoing Projects", value: "15", percent: "+2%", color: COLORS.accent },
    { title: "Total Revenue", value: "$1.2M", percent: "+5%", color: COLORS.accent },
  ];

  const bestSellingProjects = [
    { name: "Green Energy Project", code: "#GEP101", status: "Active" },
    { name: "AI Startup Initiative", code: "#AI203", status: "Pending" },
    { name: "Community Center Build", code: "#CCB45", status: "Completed" },
  ];

  const projectAnalytics = [
    { name: "Green Energy Project", data: [120, 150, 130, 170, 160, 180] },
    { name: "AI Startup Initiative", data: [80, 100, 90, 120, 110, 130] },
    { name: "Community Center Build", data: [60, 70, 65, 80, 75, 90] },
  ];

  const pollData = [
    { project: "Green Energy Project", votes: 35 },
    { project: "AI Startup Initiative", votes: 25 },
    { project: "Community Center Build", votes: 40 },
  ];

  const notifications = [
    { title: "Project GEP101 updated", time: "2h ago" },
    { title: "AI Initiative pending approval", time: "4h ago" },
    { title: "Community project completed", time: "1d ago" },
  ];

  // ---------- Responsive logic ----------
  useEffect(() => {
    const update = () => {
      const width = Dimensions.get("window").width;
      setIsMobile(width <= 700);
      setScreenWidthState(width);
    };
    update();
    Dimensions.addEventListener("change", update);
    return () => Dimensions.removeEventListener("change", update);
  }, []);

  const toggleSidebar = () => {
    if (!showSidebar) {
      setShowSidebar(true);
      Animated.timing(sidebarAnim, { toValue: 0, duration: 250, useNativeDriver: false }).start();
    } else {
      Animated.timing(sidebarAnim, { toValue: -280, duration: 250, useNativeDriver: false }).start(() =>
        setShowSidebar(false)
      );
    }
  };

  const closeSidebar = () => {
    Animated.timing(sidebarAnim, { toValue: -280, duration: 250, useNativeDriver: false }).start(() =>
      setShowSidebar(false)
    );
  };

  const toggleNotifications = () => {
    if (!showNotifications) {
      setShowNotifications(true);
      Animated.timing(notifAnim, { toValue: 1, duration: 250, useNativeDriver: true }).start();
    } else {
      Animated.timing(notifAnim, { toValue: 0, duration: 250, useNativeDriver: true }).start(() =>
        setShowNotifications(false)
      );
    }
  };

  const isDesktop = !isMobile;

  return (
    <View style={styles.container}>
      {/* Desktop Sidebar */}
      {isDesktop && <Sidebar />}

      <View style={{ flex: 1 }}>
        {/* Header */}
        <Header
          title="Analytics"
          toggleSidebar={toggleSidebar}
          isMobile={isMobile}
          showHamburger={isMobile}
          toggleNotifications={toggleNotifications}
        />

        {/* Mobile buttons below header */}
        {isMobile && (
          <View style={{ flexDirection: "column", margin: 16 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 8,
                marginBottom: 10,
              }}
            >
              <Text style={{ color: COLORS.accent, fontWeight: "600" }}>Search for everything</Text>
            </TouchableOpacity>
          </View>
        )}

        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {/* Top Stats */}
          <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 16 }}>
            {topStats.map((card, idx) => (
              <View
                key={idx}
                style={{
                  backgroundColor: COLORS.background,
                  padding: 16,
                  borderRadius: 12,
                  flex: 1,
                  minWidth: 120,
                  marginRight: 8,
                  marginBottom: 16,
                }}
              >
                <Text style={{ color: "#fff" }}>{card.title}</Text>
                <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>{card.value}</Text>
                <Text style={{ color: card.color }}>{card.percent} change</Text>
              </View>
            ))}
          </View>

          {/* Projects + Green Energy Graph */}
          <View style={{ flexDirection: isDesktop ? "row" : "column", marginBottom: 16 }}>
            {/* Left: Projects */}
            <View
              style={{
                flex: 1,
                marginRight: isDesktop ? 16 : 0,
                marginBottom: !isDesktop ? 16 : 0,
              }}
            >
              <View
                style={{
                  backgroundColor: COLORS.background,
                  borderRadius: 12,
                  padding: 16,
                  height: 260,
                }}
              >
                <Text style={{ color: COLORS.accent, fontWeight: "bold", fontSize: 16, marginBottom: 12 }}>
                  Projects
                </Text>
                {bestSellingProjects.map((item, idx) => (
                  <View key={idx} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
                    <Text style={{ color: "#fff" }}>{item.name}</Text>
                    <Text style={{ color: "#ccc" }}>{item.code}</Text>
                    <Text style={{ color: "#fff" }}>{item.status}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Right: Green Energy Graph */}
            <View style={{ flex: 1 }}>
              <View style={{ backgroundColor: COLORS.background, borderRadius: 12, padding: 16, height: 260 }}>
                <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 12, color: COLORS.accent }}>
                  {projectAnalytics[0].name}
                </Text>
                <LineChart
                  data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                    datasets: [{ data: projectAnalytics[0].data }],
                  }}
                  width={isDesktop ? screenWidthState * 0.38 : screenWidthState - 32}
                  height={180}
                  chartConfig={{
                    backgroundColor: COLORS.background,
                    backgroundGradientFrom: COLORS.background,
                    backgroundGradientTo: COLORS.background,
                    decimalPlaces: 0,
                    color: () => COLORS.chartLine,
                    labelColor: () => "#fff",
                    propsForDots: { r: "4", strokeWidth: "2", stroke: COLORS.chartLine },
                  }}
                  style={{ borderRadius: 12 }}
                />
              </View>
            </View>
          </View>

          {/* Second & Third Graphs */}
          <View
            style={{
              flexDirection: isDesktop ? "row" : "column",
              marginBottom: 16,
              gap: 16,
            }}
          >
            {projectAnalytics.slice(1).map((project, idx) => (
              <View key={idx} style={{ flex: 1 }}>
                <View style={{ backgroundColor: COLORS.background, borderRadius: 12, padding: 16 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 12, color: COLORS.accent }}>
                    {project.name}
                  </Text>
                  <LineChart
                    data={{
                      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                      datasets: [{ data: project.data }],
                    }}
                    width={isDesktop ? screenWidthState * 0.38 : screenWidthState - 32}
                    height={180}
                    chartConfig={{
                      backgroundColor: COLORS.background,
                      backgroundGradientFrom: COLORS.background,
                      backgroundGradientTo: COLORS.background,
                      decimalPlaces: 0,
                      color: () => COLORS.chartLine,
                      labelColor: () => "#fff",
                      propsForDots: { r: "4", strokeWidth: "2", stroke: COLORS.chartLine },
                    }}
                    style={{ borderRadius: 12 }}
                  />
                </View>
              </View>
            ))}
          </View>

          {/* Poll + Project Percentage */}
          <View
            style={{
              flexDirection: isDesktop ? "row" : "column",
              gap: 16,
              marginBottom: 16,
            }}
          >
            {/* Poll */}
            <View style={{ flex: 1, backgroundColor: COLORS.background, borderRadius: 16, padding: 16 }}>
              <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 12, color: COLORS.accent }}>Project Poll</Text>
              <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "flex-end", height: 140 }}>
                {pollData.map((poll, idx) => {
                  const maxVotes = Math.max(...pollData.map((p) => p.votes));
                  const barHeight = (poll.votes / maxVotes) * 100;
                  return (
                    <View key={idx} style={{ alignItems: "center", width: 60 }}>
                      <Text style={{ marginBottom: 6, fontWeight: "600", color: COLORS.accent }}>{poll.votes}</Text>
                      <View
                        style={{
                          height: barHeight,
                          width: 40,
                          backgroundColor: COLORS.accent,
                          borderTopLeftRadius: 6,
                          borderTopRightRadius: 6,
                        }}
                      />
                      <Text style={{ marginTop: 6, textAlign: "center", color: COLORS.accent, fontWeight: "600" }}>
                        {poll.project}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* Project Percentage */}
            <View style={{ flex: 1, backgroundColor: COLORS.background, borderRadius: 16, padding: 16 }}>
              <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 12, color: COLORS.accent }}>Project Percentage</Text>
              {topStats.map((stat, idx) => (
                <View
                  key={idx}
                  style={{
                    backgroundColor: "#111",
                    padding: 10,
                    borderRadius: 8,
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "600" }}>
                    {stat.title}: {stat.percent}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

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

        {/* Notifications Panel */}
        {showNotifications && (
          <>
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
            <Animated.View
              style={{
                position: "absolute",
                top: 70,
                right: 16,
                width: 280,
                backgroundColor: "#111",
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
                  <Text style={{ color: COLORS.accent, fontSize: 12 }}>{n.time}</Text>
                </View>
              ))}
            </Animated.View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row", backgroundColor: "#f5f5f5", minWidth: 360 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
  },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#fff", marginLeft: 8 },
  mobileSidebar: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 280,
    backgroundColor: "#fff",
    zIndex: 1000,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 999,
  },
});
