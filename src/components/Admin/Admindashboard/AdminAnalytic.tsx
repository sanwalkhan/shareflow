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
import Sidebar from "../AdminSidebar/ADsidebar";
import { LineChart } from "react-native-chart-kit";

const COLORS = {
  primary: "#001867",
  accent: "#16a34a",
  chartLine: "#16a34a",
  background: "#000",
};

const screenWidth = Dimensions.get("window").width;

const Header: React.FC<{
  title: string;
  openNotifications: () => void;
  toggleSidebar: () => void;
  isMobile: boolean;
  showHamburger: boolean;
}> = ({ title, openNotifications, toggleSidebar, isMobile, showHamburger }) => (
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

    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {!isMobile && (
        <TouchableOpacity style={styles.searchBtn}>
          <Ionicons name="search-outline" size={18} color={COLORS.accent} />
          <Text style={styles.searchText}>Search everything</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={openNotifications}>
        <Ionicons name="notifications-outline" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  </View>
);

export default function AdminAnalytics() {
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [screenWidthState, setScreenWidthState] = useState(Dimensions.get("window").width);

  const sidebarAnim = useRef(new Animated.Value(-280)).current;

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

  return (
    <View style={styles.container}>
      {/* Desktop Sidebar */}
      {!isMobile && <Sidebar />}

      <View style={{ flex: 1 }}>
        <Header
          title="Analytics"
          openNotifications={() => {}}
          toggleSidebar={toggleSidebar}
          isMobile={isMobile}
          showHamburger={isMobile}
        />

        {/* Mobile: Search everything button below header */}
        {isMobile && (
          <TouchableOpacity style={[styles.searchBtn, { margin: 16 }]}>
            <Ionicons name="search-outline" size={18} color={COLORS.accent} />
            <Text style={styles.searchText}>Search everything</Text>
          </TouchableOpacity>
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

          {/* Best Selling Projects */}
          <View style={{ backgroundColor: COLORS.background, borderRadius: 12, padding: 16, marginBottom: 16 }}>
            <Text style={{ color: COLORS.accent, fontWeight: "bold", fontSize: 16 }}>Projects</Text>
            {bestSellingProjects.map((item, idx) => (
              <View key={idx} style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16 }}>
                <Text style={{ color: "#fff" }}>{item.name}</Text>
                <Text style={{ color: "#ccc" }}>{item.code}</Text>
                <Text style={{ color: "#fff" }}>{item.status}</Text>
              </View>
            ))}
          </View>

          {/* Project Analytics */}
          {projectAnalytics.map((project, idx) => (
            <View key={idx} style={{ backgroundColor: COLORS.background, borderRadius: 12, padding: 16, marginBottom: 16 }}>
              <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 12, color: COLORS.accent }}>{project.name}</Text>
              <LineChart
                data={{ labels: ["Jan","Feb","Mar","Apr","May","Jun"], datasets: [{ data: project.data }] }}
                width={isMobile ? screenWidthState - 32 : screenWidthState * 0.75}
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
          ))}

          {/* Project Poll */}
          <View style={{ backgroundColor: COLORS.background, borderRadius: 16, padding: 16, marginBottom: 16 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 12, color: COLORS.accent }}>Project Poll</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "flex-end", height: 180 }}>
              {pollData.map((poll, idx) => {
                const maxVotes = Math.max(...pollData.map(p => p.votes));
                const barHeight = (poll.votes / maxVotes) * 140;
                return (
                  <View key={idx} style={{ alignItems: "center", width: isMobile ? 40 : 60 }}>
                    <Text style={{ marginBottom: 6, fontWeight: "600", color: COLORS.accent, fontSize: isMobile ? 12 : 14 }}>
                      {poll.votes}
                    </Text>
                    <View style={{ height: barHeight, width: isMobile ? 30 : 40, backgroundColor: COLORS.accent, borderTopLeftRadius: 6, borderTopRightRadius: 6 }} />
                    <Text style={{ marginTop: 6, textAlign: "center", color: COLORS.accent, fontWeight: "600", fontSize: isMobile ? 10 : 12 }}>
                      {poll.project}
                    </Text>
                  </View>
                );
              })}
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
  searchBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  searchText: { color: COLORS.accent, marginLeft: 6, fontWeight: "600" },
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
