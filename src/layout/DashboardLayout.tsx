import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
  Animated,
  Easing,
  Alert,
} from "react-native";
import { MaterialIcons, Feather, Ionicons } from "@expo/vector-icons";
import ExpensesScreen from "../screens/ExpensesScreen";
import ShareholdersScreen from "../screens/ShareholdersScreen";
import PayrollScreen from "../screens/PayrollScreen";

const { width, height } = Dimensions.get("window");

type Section = "Dashboard" | "Expenses" | "Shareholders" | "Payroll";

export default function DashboardLayout() {
  const [active, setActive] = useState<Section>("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const sidebarAnim = useRef(new Animated.Value(240)).current;

  const toggleSidebar = () => {
    Animated.timing(sidebarAnim, {
      toValue: sidebarOpen ? 70 : 240,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start(() => setSidebarOpen(!sidebarOpen));
  };

  const renderSection = () => {
    switch (active) {
      case "Expenses":
        return <ExpensesScreen />;
      case "Shareholders":
        return <ShareholdersScreen />;
      case "Payroll":
        return <PayrollScreen />;
      default:
        return <MainDashboard />;
    }
  };

  const handleLogout = () => Alert.alert("Logout", "You have been logged out (demo).");

  return (
    <View
      style={[
        styles.root,
        { backgroundColor: darkMode ? "#0d1117" : "#f5f6fa" },
      ]}
    >
      {/* Sidebar */}
      <Animated.View
        style={[
          styles.sidebar,
          {
            width: sidebarAnim,
            backgroundColor: darkMode ? "#161b22" : "#0b132b",
          },
        ]}
      >
        {/* Logo */}
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>💼</Text>
          {sidebarOpen && <Text style={styles.logoTitle}>ShareFlow</Text>}
        </View>

        {/* Menu Buttons */}
        <SidebarButton
          icon="dashboard"
          label="Dashboard"
          active={active === "Dashboard"}
          expanded={sidebarOpen}
          onPress={() => setActive("Dashboard")}
        />
        <SidebarButton
          icon="attach-money"
          label="Expenses"
          active={active === "Expenses"}
          expanded={sidebarOpen}
          onPress={() => setActive("Expenses")}
        />
        <SidebarButton
          icon="groups"
          label="Shareholders"
          active={active === "Shareholders"}
          expanded={sidebarOpen}
          onPress={() => setActive("Shareholders")}
        />
        <SidebarButton
          icon="payments"
          label="Payroll"
          active={active === "Payroll"}
          expanded={sidebarOpen}
          onPress={() => setActive("Payroll")}
        />

        <View style={{ flex: 1 }} />

        {sidebarOpen && (
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Feather name="log-out" size={18} color="#fff" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        )}

        {sidebarOpen && <Text style={styles.version}>v1.0</Text>}
      </Animated.View>

      {/* Main Content */}
      <View style={styles.main}>
        {/* Header */}
        <View
          style={[
            styles.header,
            { backgroundColor: darkMode ? "#161b22" : "#fff" },
          ]}
        >
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={toggleSidebar} style={styles.headerBtn}>
              <Feather name="menu" size={22} color={darkMode ? "#fff" : "#333"} />
            </TouchableOpacity>
            <Text style={[styles.pageTitle, darkMode && { color: "#fff" }]}>
              {active}
            </Text>
          </View>

          {/* Search bar */}
          <View
            style={[
              styles.searchBar,
              {
                backgroundColor: darkMode ? "#21262d" : "#f1f1f1",
              },
            ]}
          >
            <Feather name="search" size={18} color="#888" />
            <TextInput
              placeholder="Search..."
              placeholderTextColor="#888"
              style={[styles.searchInput, { color: darkMode ? "#fff" : "#000" }]}
            />
          </View>

          {/* Header right controls */}
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerBtn}>
              <Feather
                name="bell"
                size={22}
                color={darkMode ? "#fff" : "#333"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setDarkMode(!darkMode)}
              style={styles.headerBtn}
            >
              <Ionicons
                name={darkMode ? "sunny-outline" : "moon-outline"}
                size={22}
                color={darkMode ? "#ffd700" : "#333"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profileBox}
              onPress={() => Alert.alert("Profile", "User profile clicked")}
            >
              <Feather name="user" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Content Area */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ minHeight: height - 60 }}
        >
          {renderSection()}
        </ScrollView>
      </View>
    </View>
  );
}

/* ---------------- Sidebar Button ---------------- */
function SidebarButton({
  icon,
  label,
  active,
  expanded,
  onPress,
}: {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  active: boolean;
  expanded: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.menuItem,
        active && { backgroundColor: "#1c2541" },
      ]}
      onPress={onPress}
    >
      <MaterialIcons
        name={icon}
        size={22}
        color={active ? "#fff" : "#ccc"}
        style={{ width: 30 }}
      />
      {expanded && (
        <Text style={[styles.menuText, active && { color: "#fff" }]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

/* ---------------- Dashboard ---------------- */
function MainDashboard() {
  return (
    <View style={{ padding: 24 }}>
      <Text style={styles.sectionTitle}>Welcome to ShareFlow Dashboard</Text>
      <Text style={styles.sectionText}>
        Monitor your company’s key performance metrics at a glance.
      </Text>

      <View style={styles.cardsRow}>
        <DashboardCard
          title="Total Expenses"
          value="$18,450"
          color="#ff6b6b"
          icon="trending-down"
        />
        <DashboardCard
          title="Total Payroll"
          value="$76,500"
          color="#4ecdc4"
          icon="payments"
        />
        <DashboardCard
          title="Shareholders"
          value="12"
          color="#1a73e8"
          icon="groups"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <Text style={styles.sectionText}>
          • 6 pending expense approvals{"\n"}• 3 new shareholders this month{"\n"}
          • Payroll completed for 42 employees{"\n"}• Next board meeting: Oct 20, 2025
        </Text>
      </View>
    </View>
  );
}

function DashboardCard({
  title,
  value,
  color,
  icon,
}: {
  title: string;
  value: string;
  color: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}) {
  return (
    <View style={[styles.card, { backgroundColor: color }]}>
      <MaterialIcons name={icon} size={26} color="#fff" />
      <Text style={styles.cardValue}>{value}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
  );
}

/* ---------------- Styles ---------------- */
const styles = StyleSheet.create({
  root: { flex: 1, flexDirection: "row", height: "100%" },
  sidebar: {
    paddingTop: 30,
    paddingHorizontal: 10,
    height: "100%",
    borderRightWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  logoBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 6,
  },
  logoText: { color: "#fff", fontSize: 22 },
  logoTitle: { color: "#fff", fontWeight: "700", fontSize: 18, marginLeft: 6 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 6,
  },
  menuText: { color: "#ccc", fontSize: 15 },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1c2541",
    paddingVertical: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  logoutText: { color: "#fff", fontSize: 13 },
  version: { color: "#999", fontSize: 12, textAlign: "center", marginBottom: 10 },

  main: { flex: 1, height: "100%" },
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  pageTitle: { fontSize: 20, fontWeight: "700" },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    height: 36,
    flex: 1,
    marginHorizontal: 16,
    paddingHorizontal: 10,
  },
  searchInput: { flex: 1, fontSize: 14, marginLeft: 6 },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 14 },
  headerBtn: { padding: 6 },
  profileBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#0b132b",
    justifyContent: "center",
    alignItems: "center",
  },
  cardsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  card: {
    width: "31%",
    padding: 18,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  cardValue: { color: "#fff", fontSize: 22, fontWeight: "700", marginTop: 8 },
  cardTitle: { color: "#fff", fontSize: 14, marginTop: 4 },
  section: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10 },
  sectionText: { fontSize: 14, color: "#444", lineHeight: 22 },
});
