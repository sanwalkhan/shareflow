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
import MaskedView from "@react-native-masked-view/masked-view";
import Sidebar from "../../SidebarComponent/sidebar";

const COLORS = {
  primary: "#193288",
  secondary: "#1a45c2",
  buttonDesktopBg: "#fff",
  buttonDesktopText: "#193288",
  buttonMobileBg: "#193288",
  buttonMobileText: "#fff",
  cardBackground: "#fff",
  cardText: "#000",
};

const BREAKPOINT = 700;

const tableData = [
  { date: "2025-12-01", category: "Office Supplies", amount: "$120", method: "Credit Card", status: "Paid" },
  { date: "2025-12-05", category: "Travel", amount: "$450", method: "Bank Transfer", status: "Pending" },
  { date: "2025-12-10", category: "Software", amount: "$300", method: "Credit Card", status: "Paid" },
];

const topButtons = [
  { title: "Add Expense" },
  { title: "Generate Report" },
];

const Expenses: React.FC = () => {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width);
  const [isMobile, setIsMobile] = useState(screenWidth < BREAKPOINT);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarAnim = useRef(new Animated.Value(-260)).current;

  const [showNotifications, setShowNotifications] = useState(false);
  const notifAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setScreenWidth(window.width);
      setIsMobile(window.width < BREAKPOINT);

      if (window.width >= BREAKPOINT) {
        setSidebarOpen(false);
        sidebarAnim.setValue(0);
      } else {
        sidebarAnim.setValue(-260);
      }
    });
    return () => subscription?.remove?.();
  }, []);

  const toggleSidebar = () => {
    const toValue = sidebarOpen ? -260 : 0;
    setSidebarOpen(!sidebarOpen);
    Animated.timing(sidebarAnim, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const openNotifications = () => {
    setShowNotifications(true);
    Animated.timing(notifAnim, { toValue: 0, duration: 300, useNativeDriver: false }).start();
  };

  const closeNotifications = () => {
    Animated.timing(notifAnim, { toValue: 300, duration: 300, useNativeDriver: false }).start(() =>
      setShowNotifications(false)
    );
  };

  return (
    <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#f3f4f6" }}>
      {/* SIDEBAR */}
      {!isMobile && <Sidebar />}
      {isMobile && (
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: sidebarAnim,
            bottom: 0,
            width: 260,
            backgroundColor: "#fff",
            zIndex: 999,
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 8,
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "flex-end", padding: 12 }}>
            <TouchableOpacity onPress={toggleSidebar}>
              <Ionicons name="close" size={28} color="#333" />
            </TouchableOpacity>
          </View>
          <Sidebar mobile open onClose={toggleSidebar} />
        </Animated.View>
      )}

      {/* MAIN */}
      <View style={{ flex: 1 }}>
        {/* HEADER */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 16,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {isMobile && (
              <TouchableOpacity onPress={toggleSidebar} style={{ marginRight: 12 }}>
                <Ionicons name="menu-outline" size={28} color="#fff" />
              </TouchableOpacity>
            )}
            <MaskedView
              maskElement={
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="wallet-outline" size={24} color="#fff" />
                  <Text style={{ fontSize: 24, fontWeight: "600", color: "#fff", marginLeft: 6 }}>
                    Expenses
                  </Text>
                </View>
              }
            >
              <LinearGradient colors={[COLORS.primary, COLORS.secondary]}>
                <Text style={{ fontSize: 24, fontWeight: "600", opacity: 0 }}>Expenses</Text>
              </LinearGradient>
            </MaskedView>
          </View>

          {/* Bell icon always */}
          <TouchableOpacity onPress={openNotifications}>
            <Ionicons name="notifications-outline" size={28} color="#fff" />
          </TouchableOpacity>
        </LinearGradient>

        {/* TOP BUTTONS */}
        {isMobile ? (
          <View style={{ flexDirection: "row", padding: 16, gap: 12 }}>
            {topButtons.map((btn, idx) => (
              <TouchableOpacity
                key={idx}
                style={{
                  flex: 1,
                  backgroundColor: COLORS.primary,
                  paddingVertical: 12,
                  borderRadius: 12,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "700" }}>{btn.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={{ flexDirection: "row", padding: 16, gap: 12, maxWidth: 400 }}>
            {topButtons.map((btn, idx) => (
              <TouchableOpacity
                key={idx}
                style={{
                  flex: 1,
                  backgroundColor: COLORS.buttonDesktopBg,
                  paddingVertical: 10,
                  borderRadius: 8,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: COLORS.buttonDesktopText, fontWeight: "700" }}>{btn.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* CONTENT */}
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View
              style={{
                minWidth: isMobile ? 700 : "100%",
                backgroundColor: COLORS.cardBackground,
                borderRadius: 12,
                padding: 16,
              }}
            >
              {/* TABLE HEADER */}
              <View style={{ flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "#ccc", paddingBottom: 12, marginBottom: 12 }}>
                {["Date", "Category", "Amount", "Payment Method", "Status"].map((h, i) => (
                  <Text key={i} style={{ minWidth: 140, fontWeight: "700", marginRight: 24 }}>
                    {h}
                  </Text>
                ))}
              </View>

              {/* TABLE ROWS */}
              {tableData.map((row, i) => (
                <View key={i} style={{ flexDirection: "row", paddingVertical: 12, borderBottomWidth: i === tableData.length - 1 ? 0 : 1, borderBottomColor: "#eee" }}>
                  <Text style={{ minWidth: 140, marginRight: 24 }}>{row.date}</Text>
                  <Text style={{ minWidth: 140, marginRight: 24 }}>{row.category}</Text>
                  <Text style={{ minWidth: 140, marginRight: 24 }}>{row.amount}</Text>
                  <Text style={{ minWidth: 140, marginRight: 24 }}>{row.method}</Text>
                  <Text style={{ minWidth: 140, marginRight: 24, fontWeight: "600", color: row.status === "Paid" ? "green" : "orange" }}>
                    {row.status}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </ScrollView>
      </View>

      {/* NOTIFICATIONS */}
      {showNotifications && (
        <Animated.View
          style={{
            position: "absolute",
            right: notifAnim,
            top: 0,
            height: "100%",
            width: 300,
            backgroundColor: "#fff",
            zIndex: 1000,
            padding: 16,
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
            <Text style={{ fontWeight: "700", fontSize: 20 }}>Notifications</Text>
            <TouchableOpacity onPress={closeNotifications}>
              <Ionicons name="close" size={24} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default Expenses;
