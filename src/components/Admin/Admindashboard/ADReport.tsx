import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronUp, ChevronDown } from "lucide-react-native";

// Sidebar
import Sidebar from "../AdminSidebar/ADsidebar";

/* ================= COLORS ================= */
const COLORS = {
  primary: "#193288",
  accent: "#001867ff",
  success: "#16a34a",
  warning: "#f59e0b",
  danger: "#dc2626",
  textDark: "#111827",
};

/* ================= DATA ================= */
const projectData = [
  { id: "1", name: "Completed Projects", count: 42, color: COLORS.success },
  { id: "2", name: "Pending Projects", count: 18, color: COLORS.warning },
];

const topTeamsData = [
  { id: "1", name: "Team Alpha", projectsCompleted: 12, change: "up" },
  { id: "2", name: "Team Beta", projectsCompleted: 9, change: "down" },
  { id: "3", name: "Team Gamma", projectsCompleted: 7, change: "up" },
];

const topInvestorsData = [
  { id: "1", name: "Investor A", investedProjects: 15, change: "up" },
  { id: "2", name: "Investor B", investedProjects: 10, change: "down" },
  { id: "3", name: "Investor C", investedProjects: 8, change: "up" },
];

/* ================= COMPONENT ================= */
const ADReport: React.FC = () => {
  const [isSmall, setIsSmall] = useState(
    Dimensions.get("window").width < 690
  );

  /* ---------- SIDEBAR ---------- */
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarAnim = useRef(new Animated.Value(-300)).current;

  useEffect(() => {
    const sub = Dimensions.addEventListener("change", ({ window }) => {
      setIsSmall(window.width < 690);
    });
    return () => sub.remove();
  }, []);

  const openSidebar = () => {
    setSidebarOpen(true);
    Animated.timing(sidebarAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeSidebar = () => {
    Animated.timing(sidebarAnim, {
      toValue: -300,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setSidebarOpen(false));
  };

  return (
    <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#E6F0FF" }}>
      {/* ===== DESKTOP SIDEBAR ===== */}
      {!isSmall && <Sidebar />}

      {/* ===== MOBILE SIDEBAR ===== */}
      {isSmall && sidebarOpen && (
        <Animated.View
          style={{
            position: "absolute",
            left: sidebarAnim,
            top: 0,
            bottom: 0,
            width: 300,
            backgroundColor: "#fff",
            zIndex: 999,
            elevation: 10,
          }}
        >
          <TouchableOpacity
            onPress={closeSidebar}
            style={{ padding: 12, alignItems: "flex-end" }}
          >
            <Ionicons name="close" size={26} />
          </TouchableOpacity>
          <Sidebar />
        </Animated.View>
      )}

      {/* ================= MAIN ================= */}
      <View style={{ flex: 1 }}>
        {/* ================= HEADER ================= */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: COLORS.primary,
            paddingHorizontal: 16,
            paddingVertical: 20,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {isSmall && (
              <TouchableOpacity onPress={openSidebar} style={{ marginRight: 10 }}>
                <Ionicons name="menu" size={28} color="#fff" />
              </TouchableOpacity>
            )}

            <MaskedView
              maskElement={
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons
                    name="document-text-outline"
                    size={24}
                    color="#fff"
                    style={{ marginRight: 6 }}
                  />
                  <Text style={{ fontSize: 24, fontWeight: "600", color: "#fff" }}>
                    Report
                  </Text>
                </View>
              }
            >
              <LinearGradient colors={[COLORS.primary, COLORS.primary]}>
                <Text style={{ fontSize: 24, fontWeight: "600", opacity: 0 }}>
                  Report
                </Text>
              </LinearGradient>
            </MaskedView>
          </View>

          {!isSmall && (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#fff",
                paddingVertical: 6,
                paddingHorizontal: 10,
                borderRadius: 8,
                height: 50,
              }}
            >
              <Ionicons
                name="search-outline"
                size={18}
                color={COLORS.accent}
                style={{ marginRight: 6 }}
              />
              <Text style={{ color: COLORS.accent, fontWeight: "800" }}>
                Search for everything
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* ===== MOBILE SEARCH ===== */}
        {isSmall && (
          <View style={{ padding: 16 }}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#fff",
                padding: 12,
                borderRadius: 10,
              }}
            >
              <Ionicons
                name="search-outline"
                size={18}
                color={COLORS.accent}
                style={{ marginRight: 6 }}
              />
              <Text style={{ fontWeight: "700", color: COLORS.accent }}>
                Search for everything
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ================= CONTENT ================= */}
        <ScrollView style={{ paddingHorizontal: 20 }}>
          {/* ===== PROJECT STATS ===== */}
          <View
            style={{
              flexDirection: isSmall ? "column" : "row",
              gap: 16,
              marginBottom: 16,
            }}
          >
            {projectData.map((proj) => (
              <View
                key={proj.id}
                style={{
                  flex: 1,
                  backgroundColor: "#fff",
                  borderRadius: 16,
                  padding: 16,
                }}
              >
                <Text style={{ fontWeight: "700", fontSize: 18 }}>
                  {proj.name}
                </Text>
                <Text
                  style={{
                    marginTop: 8,
                    fontSize: 22,
                    fontWeight: "800",
                    color: proj.color,
                  }}
                >
                  {proj.count}
                </Text>
              </View>
            ))}
          </View>

          {/* ===== TOP TEAMS & INVESTORS ===== */}
          <View style={{ flexDirection: isSmall ? "column" : "row", gap: 16 }}>
            {/* Top Teams */}
            <View style={{ flex: 1, backgroundColor: "#fff", borderRadius: 16, padding: 16 }}>
              <Text style={{ fontWeight: "700", fontSize: 18, marginBottom: 12 }}>
                Top Teams
              </Text>

              {topTeamsData.map((team, index) => (
                <View
                  key={team.id}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 12,
                    backgroundColor: "#f3f4f6",
                    padding: 12,
                    borderRadius: 12,
                  }}
                >
                  <Image
                    source={{ uri: `https://i.pravatar.cc/50?img=${index + 10}` }}
                    style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12 }}
                  />

                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: "600", fontSize: 16 }}>
                      {team.name}
                    </Text>

                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
                      <Text style={{ fontWeight: "700", marginRight: 6 }}>
                        {team.projectsCompleted}
                      </Text>
                      {team.change === "up" ? (
                        <ChevronUp size={16} color={COLORS.success} />
                      ) : (
                        <ChevronDown size={16} color={COLORS.danger} />
                      )}
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* Top Investors */}
            <View style={{ flex: 1, backgroundColor: "#fff", borderRadius: 16, padding: 16 }}>
              <Text style={{ fontWeight: "700", fontSize: 18, marginBottom: 12 }}>
                Top Investors
              </Text>

              {topInvestorsData.map((inv, index) => (
                <View
                  key={inv.id}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 12,
                    backgroundColor: "#f3f4f6",
                    padding: 12,
                    borderRadius: 12,
                  }}
                >
                  <Image
                    source={{ uri: `https://i.pravatar.cc/50?img=${index + 20}` }}
                    style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12 }}
                  />

                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: "600", fontSize: 16 }}>
                      {inv.name}
                    </Text>

                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
                      <Text style={{ fontWeight: "700", marginRight: 6 }}>
                        {inv.investedProjects}
                      </Text>
                      {inv.change === "up" ? (
                        <ChevronUp size={16} color={COLORS.success} />
                      ) : (
                        <ChevronDown size={16} color={COLORS.danger} />
                      )}
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ADReport;
