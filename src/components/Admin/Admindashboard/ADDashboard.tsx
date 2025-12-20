// src/components/Shareholder.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Sidebar from "../AdminSidebar/ADsidebar";
import { LineChart } from "react-native-chart-kit";

export type RootStackParamList = {
  Dashboard: undefined;
  ShareholderReport: undefined;
  ShareholderFvrt: undefined;
  ShareholderHistory: undefined;
  AdminDashboard: undefined;
  Adminreport: undefined;
};

type ShareholderNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Dashboard"
>;

const COLORS = {
  primary: "#193288",
  accent: "#001867ff",
  button: "#FFC20E",
  success: "#16a34a",
  danger: "#dc2626",
};

const ADDashboard: React.FC = () => {
  const navigation = useNavigation<ShareholderNavigationProp>();
  const [activeTab, setActiveTab] = React.useState("Dashboard");

  const [windowWidth, setWindowWidth] = React.useState(Dimensions.get("window").width);
  const [mobileSidebar, setMobileSidebar] = React.useState(false);
  const sidebarAnim = React.useRef(new Animated.Value(-250)).current;

  const isMobile = windowWidth < 800; // Mobile/tablet threshold

  React.useEffect(() => {
    const update = () => setWindowWidth(Dimensions.get("window").width);
    const sub = Dimensions.addEventListener("change", update);
    return () => sub.remove();
  }, []);

  React.useEffect(() => {
    if (!isMobile) {
      setMobileSidebar(false);
      Animated.timing(sidebarAnim, { toValue: 0, duration: 0, useNativeDriver: false }).start();
    } else {
      Animated.timing(sidebarAnim, { toValue: -250, duration: 0, useNativeDriver: false }).start();
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    const toValue = mobileSidebar ? -250 : 0;
    setMobileSidebar(!mobileSidebar);
    Animated.timing(sidebarAnim, { toValue, duration: 300, useNativeDriver: false }).start();
  };

  const [showNotifications, setShowNotifications] = React.useState(false);
  const slideAnim = React.useRef(new Animated.Value(300)).current;

  const openNotifications = () => {
    setShowNotifications(true);
    Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: false }).start();
  };

  const closeNotifications = () => {
    Animated.timing(slideAnim, { toValue: 300, duration: 300, useNativeDriver: false }).start(
      () => setShowNotifications(false)
    );
  };

  const handleNavigation = (tab: string) => {
    setActiveTab(tab);
    if (tab === "Dashboard") navigation.navigate("Dashboard");
    else if (tab === "Report") navigation.navigate("ShareholderReport");
    else if (tab === "Favourite") navigation.navigate("ShareholderFvrt");
    else if (tab === "History") navigation.navigate("ShareholderHistory");
    if (isMobile) toggleSidebar();
  };

  // ------------------ DATA ------------------
  const topStats = [
    { title: "Total Projects", value: "56", percent: "+10%", color: COLORS.success },
    { title: "Recent Projects", value: "7", percent: "-2%", color: COLORS.danger },
    { title: "Total Investors", value: "120", percent: "+5%", color: COLORS.success },
  ];

  const bestSellingProjects = [
    { name: "Green Energy Project", code: "#GEP101", status: "Active" },
    { name: "AI Startup Initiative", code: "#AI203", status: "Pending" },
    { name: "Community Center Build", code: "#CCB45", status: "Completed" },
  ];

  const pollData = [
    { project: "Green Energy Project", votes: 35 },
    { project: "AI Startup Initiative", votes: 25 },
    { project: "Community Center Build", votes: 40 },
  ];

  const recentShareholders = [
    { name: "Ali Khan", date: "2025-12-10" },
    { name: "Sara Ahmed", date: "2025-12-12" },
    { name: "Usman Qureshi", date: "2025-12-15" },
  ];

  return (
    <View style={{ flex: 1, position: "relative", flexDirection: "row", backgroundColor: "#E6F0FF" }}>
      {/* Desktop Sidebar */}
      {!isMobile && <Sidebar activeTab={activeTab} onSelect={handleNavigation} />}

      {/* Mobile Overlay */}
      {isMobile && mobileSidebar && (
        <TouchableOpacity
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 900,
          }}
          onPress={toggleSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      {isMobile && (
        <Animated.View
          style={{
            position: "absolute",
            left: sidebarAnim,
            top: 0,
            width: 250,
            height: "100%",
            backgroundColor: "#fff",
            zIndex: 1000,
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 10,
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "flex-end", padding: 12 }}>
            <TouchableOpacity onPress={toggleSidebar}>
              <Ionicons name="close" size={28} color="#333" />
            </TouchableOpacity>
          </View>
          <Sidebar mobile activeTab={activeTab} onSelect={handleNavigation} />
        </Animated.View>
      )}

      {/* MAIN CONTENT */}
      <View style={{ flex: 1 }}>
        {/* HEADER */}
        <View
          style={{
            backgroundColor: COLORS.primary,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 12,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {isMobile && (
              <TouchableOpacity onPress={toggleSidebar} style={{ marginRight: 12 }}>
                <Ionicons name="menu" size={28} color="#fff" />
              </TouchableOpacity>
            )}
            <MaskedView
              maskElement={
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="speedometer-outline" size={24} color="#fff" style={{ marginRight: 6 }} />
                  <Text style={{ fontSize: 24, color: "#fff", fontWeight: "600" }}>Dashboard</Text>
                </View>
              }
            >
              <LinearGradient colors={[COLORS.primary, COLORS.primary]}>
                <Text style={{ opacity: 0, fontSize: 24 }}>Dashboard</Text>
              </LinearGradient>
            </MaskedView>
          </View>

          {/* Desktop Buttons */}
          {!isMobile && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("AdminDashboard")}
                style={{ backgroundColor: "#fff", padding: 10, borderRadius: 8, marginRight: 10 }}
              >
                <Text style={{ fontWeight: "bold", color: COLORS.accent }}>Search for everything</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("Adminreport")}
                style={{ backgroundColor: "#fff", padding: 10, borderRadius: 8, marginRight: 10 }}
              >
                <Text style={{ fontWeight: "bold", color: COLORS.accent }}>+ Add new</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={openNotifications}>
                <Ionicons name="notifications-outline" size={28} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Mobile Buttons under Header */}
        {isMobile && (
          <View style={{ flexDirection: "row", padding: 10, marginBottom: 16 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("AdminDashboard")}
              style={{ flex: 1, backgroundColor: "#fff", padding: 12, borderRadius: 8, marginRight: 8 }}
            >
              <Text style={{ fontWeight: "bold", color: COLORS.accent, textAlign: "center" }}>Search for everything</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Adminreport")}
              style={{ flex: 1, backgroundColor: "#fff", padding: 12, borderRadius: 8 }}
            >
              <Text style={{ fontWeight: "bold", color: COLORS.accent, textAlign: "center" }}>+ Add new</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* MAIN SCROLLVIEW CONTENT */}
        <ScrollView style={{ padding: 10 }}>
          {/* TOP STATS */}
          <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 16 }}>
            {topStats.map((card, idx) => (
              <View
                key={idx}
                style={{
                  backgroundColor: "#000",
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

          {/* BEST SELLING PROJECTS */}
          <View style={{ backgroundColor: "#000", borderRadius: 12, padding: 16, marginBottom: 16 }}>
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Best Selling Projects</Text>
            {bestSellingProjects.map((item, idx) => (
              <View
                key={idx}
                style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16 }}
              >
                <Text style={{ color: "#fff" }}>{item.name}</Text>
                <Text style={{ color: "#ccc" }}>{item.code}</Text>
                <Text style={{ color: "#fff" }}>{item.status}</Text>
              </View>
            ))}
          </View>

          {/* PROJECTS ANALYTICS GRAPH */}
          <View style={{ backgroundColor: "#000", borderRadius: 12, padding: 16, marginBottom: 16 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 8, color: "#16a34a" }}>Projects Analytics</Text>
            <LineChart
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                datasets: [{ data: [12, 19, 14, 23, 18, 27] }],
              }}
              width={Dimensions.get("window").width - (isMobile ? 40 : 300 + 40)}
              height={220}
              chartConfig={{
                backgroundColor: "#000",
                backgroundGradientFrom: "#000",
                backgroundGradientTo: "#000",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(22, 163, 74, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
              }}
              style={{ borderRadius: 12 }}
            />
          </View>

          {/* PROJECT POLL */}
          <View style={{ backgroundColor: "#000", borderRadius: 16, padding: 16, marginBottom: 16 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 12, color: "#16a34a" }}>Project Poll</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "flex-end", height: 180 }}>
              {pollData.map((poll, idx) => {
                const maxVotes = Math.max(...pollData.map(p => p.votes));
                const barHeight = (poll.votes / maxVotes) * 140;
                return (
                  <View key={idx} style={{ alignItems: "center", width: isMobile ? 40 : 60 }}>
                    <Text style={{ marginBottom: 6, fontWeight: "600", color: "#16a34a", fontSize: isMobile ? 12 : 14 }}>
                      {poll.votes}
                    </Text>
                    <LinearGradient
                      colors={["#16a34a", "#000"]}
                      start={{ x: 0.5, y: 1 }}
                      end={{ x: 0.5, y: 0 }}
                      style={{
                        height: barHeight,
                        width: isMobile ? 30 : 40,
                        borderTopLeftRadius: 6,
                        borderTopRightRadius: 6,
                      }}
                    />
                    <Text style={{ marginTop: 6, textAlign: "center", color: "#16a34a", fontWeight: "600", fontSize: isMobile ? 10 : 12 }}>
                      {poll.project}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* RECENT SHAREHOLDERS */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 12, color: "#16a34a" }}>Recently Added Shareholders</Text>
            {recentShareholders.map((sh, idx) => (
              <View
                key={idx}
                style={{
                  backgroundColor: "#000",
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOpacity: 0.3,
                  shadowRadius: 6,
                  elevation: 4,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "600" }}>{sh.name}</Text>
                <Text style={{ color: "#16a34a" }}>{sh.date}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Notifications */}
      {showNotifications && (
        <Animated.View
          style={{
            position: "absolute",
            right: slideAnim,
            top: 0,
            width: 300,
            height: "100%",
            backgroundColor: "#fff",
            padding: 16,
            elevation: 6,
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Notifications</Text>
            <TouchableOpacity onPress={closeNotifications}>
              <Ionicons name="close" size={24} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default ADDashboard;
