// src/components/AdminDashboard.tsx
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
import { LineChart, BarChart } from "react-native-chart-kit";

export type RootStackParamList = {
  Dashboard: undefined;
  Adminreport: undefined;
  ShareholderFvrt: undefined;
  ShareholderHistory: undefined;
};

type AdminNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Dashboard"
>;

const COLORS = {
  primary: "#193288",
  accent: "#001867ff",
  button: "#FFC20E",
  textDark: "#111827",
  success: "#16a34a",
  danger: "#dc2626",
};

const { width: screenWidth } = Dimensions.get("window");
const sidebarWidth = 250;
const breakpoint = 980; // Responsive threshold

const sidebarItems = [
  { label: "Dashboard", icon: "speedometer-outline" },
  { label: "Report", icon: "document-text-outline" },
  { label: "Favourite", icon: "heart-outline" },
  { label: "History", icon: "time-outline" },
];

const topStats = [
  { title: "Today's Sales", value: "₹15,00,000", percent: "+4.8%", color: COLORS.success },
  { title: "Customer Fulfillment", value: "92%", percent: "-3.5%", color: COLORS.danger },
  { title: "Visitor Insights", value: "17,058", percent: "+9.3%", color: COLORS.success },
  { title: "Earnings", value: "₹3,50,000", percent: "+2.1%", color: COLORS.success },
];

const topProducts = [
  { name: "Shah Zaib Kazmi", code: "SZB KAZMI", level: 3, status: "Out of Stock" },
  { name: "Green Velvet Semi Sleeve", code: "#20257", level: 5, status: "Available" },
  { name: "Nike Air Max 2569", code: "#P1020", level: 2, status: "Restock" },
  { name: "Adidas Runner", code: "#A1002", level: 4, status: "Available" },
];

const AdminDashboard: React.FC = () => {
  const navigation = useNavigation<AdminNavigationProp>();
  const [activeTab, setActiveTab] = React.useState("Dashboard");
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(Dimensions.get("window").width);

  const isMobile = windowWidth <= breakpoint;

  const slideAnim = React.useRef(new Animated.Value(300)).current;
  const sidebarAnim = React.useRef(new Animated.Value(-sidebarWidth)).current;
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);

  React.useEffect(() => {
    const update = () => setWindowWidth(Dimensions.get("window").width);
    const sub = Dimensions.addEventListener("change", update);
    return () => sub.remove();
  }, []);

  // Notifications
  const openNotifications = () => {
    setShowNotifications(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const closeNotifications = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setShowNotifications(false));
  };

  // Mobile sidebar
  const openMobileSidebar = () => {
    setMobileSidebarOpen(true);
    Animated.timing(sidebarAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const closeMobileSidebar = () => {
    Animated.timing(sidebarAnim, {
      toValue: -sidebarWidth,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setMobileSidebarOpen(false));
  };

  return (
    <View style={{ flex: 1, flexDirection: isMobile ? "column" : "row", backgroundColor: "#E6F0FF" }}>
      {/* DESKTOP SIDEBAR */}
      {!isMobile && (
        <LinearGradient
          colors={["#193288", "#FFC20E"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ width: sidebarWidth, padding: 26 }}
        >
          <Text style={{ color: "#fff", fontSize: 22, fontWeight: "bold", marginBottom: 32 }}>
            ShareFlow
          </Text>
          {sidebarItems.map((item) => {
            const isActive = activeTab === item.label;
            return (
              <TouchableOpacity
                key={item.label}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 14,
                  paddingHorizontal: 16,
                  marginBottom: 20,
                  borderRadius: 16,
                  backgroundColor: isActive ? COLORS.button : "transparent",
                }}
                onPress={() => setActiveTab(item.label)}
              >
                <Ionicons
                  name={item.icon as any}
                  size={22}
                  color={isActive ? COLORS.accent : "#fff"}
                  style={{ marginRight: 12 }}
                />
                <Text style={{ color: isActive ? COLORS.accent : "#fff", fontSize: 16, fontWeight: "600" }}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </LinearGradient>
      )}

      {/* MAIN SECTION */}
      <View style={{ flex: 1 }}>
        {/* HEADER */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: COLORS.primary,
            paddingHorizontal: 16,
            paddingVertical: 12,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {isMobile && (
              <TouchableOpacity onPress={openMobileSidebar} style={{ marginRight: 12 }}>
                <Ionicons name="menu" size={28} color="#fff" />
              </TouchableOpacity>
            )}
            <MaskedView
              maskElement={
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="speedometer-outline" size={24} color="#fff" style={{ marginRight: 6 }} />
                  <Text style={{ fontSize: 24, fontWeight: "600", color: "#fff" }}>Admin Dashboard</Text>
                </View>
              }
            >
              <LinearGradient colors={[COLORS.primary, COLORS.primary]}>
                <Text style={{ fontSize: 24, fontWeight: "600", opacity: 0 }}>Admin Dashboard</Text>
              </LinearGradient>
            </MaskedView>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {!isMobile && (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: COLORS.button,
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  borderRadius: 8,
                  marginRight: 12,
                  minWidth: 140,
                  height: 50,
                  justifyContent: "center",
                }}
              >
                <Ionicons name="search-outline" size={18} color={COLORS.accent} style={{ marginRight: 6 }} />
                <Text style={{ color: COLORS.accent, fontWeight: "800", fontSize: 14 }}>Search for everything</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={openNotifications}>
              <Ionicons name="notifications-outline" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* MOBILE BUTTONS BELOW HEADER */}
        {isMobile && (
          <View style={{ flexDirection: "row", padding: 10, marginBottom: 16 }}>
            <TouchableOpacity
              style={{ flex: 1, backgroundColor: COLORS.button, padding: 12, borderRadius: 8, marginRight: 8 }}
              onPress={() => {}}
            >
              <Text style={{ fontWeight: "bold", color: COLORS.accent, textAlign: "center" }}>Search for everything</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 1, backgroundColor: COLORS.button, padding: 12, borderRadius: 8 }}
              onPress={() => {}}
            >
              <Text style={{ fontWeight: "bold", color: COLORS.accent, textAlign: "center" }}>+ Add new</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* SCROLLABLE CONTENT */}
        <ScrollView contentContainerStyle={{ padding: 12 }}>
          {/* TOP STATS */}
          <View
            style={{
              flexDirection: isMobile ? "column" : "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            {topStats.map((card, idx) => (
              <View
                key={idx}
                style={{
                  backgroundColor: "#000",
                  padding: 16,
                  borderRadius: 12,
                  width: isMobile ? "100%" : "48%",
                  marginBottom: 16,
                }}
              >
                <Text style={{ color: "#fff", fontSize: 12 }}>{card.title}</Text>
                <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold", marginTop: 4 }}>{card.value}</Text>
                <Text style={{ color: card.color, marginTop: 2 }}>{card.percent} from yesterday</Text>
              </View>
            ))}
          </View>

          {/* CHARTS */}
          <View
            style={{
              flexDirection: isMobile ? "column" : "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <View style={{ flex: isMobile ? 1 : 0.48, backgroundColor: "#1c1c1c", borderRadius: 12, padding: 12, marginBottom: 16 }}>
              <Text style={{ color: "#fff", fontWeight: "700", marginBottom: 8 }}>Weekly Sales</Text>
              <LineChart
                data={{
                  labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
                  datasets: [{ data: [120000, 150000, 110000, 170000, 160000, 140000, 180000] }]
                }}
                width={isMobile ? screenWidth-32 : screenWidth*0.48}
                height={150}
                chartConfig={{
                  backgroundGradientFrom: "#1c1c1c",
                  backgroundGradientTo: "#1c1c1c",
                  color: () => "#28A745",
                  labelColor: () => "#fff",
                  propsForDots: { r: "4", strokeWidth: "2", stroke: "#28A745" },
                }}
                bezier
                style={{ borderRadius: 12 }}
              />
            </View>

            <View style={{ flex: isMobile ? 1 : 0.48, backgroundColor: "#1c1c1c", borderRadius: 12, padding: 12, marginBottom: 16 }}>
              <Text style={{ color: "#fff", fontWeight: "700", marginBottom: 8 }}>Customer Fulfillment</Text>
              <BarChart
                data={{
                  labels: ["Jan","Feb","Mar","Apr","May"],
                  datasets: [{ data: [80, 85, 90, 92, 92] }]
                }}
                width={isMobile ? screenWidth-32 : screenWidth*0.48}
                height={150}
                chartConfig={{
                  backgroundGradientFrom: "#1c1c1c",
                  backgroundGradientTo: "#1c1c1c",
                  color: () => "#FFC20E",
                  labelColor: () => "#fff",
                }}
                style={{ borderRadius: 12 }}
              />
            </View>
          </View>

          {/* Top Products */}
          <View style={{ backgroundColor: "#193288", borderRadius: 20, padding: 20, marginBottom: 32 }}>
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 20, marginBottom: 12 }}>Top Products</Text>
            {topProducts.map((item, idx) => (
              <View key={idx} style={{ marginBottom: 16 }}>
                <Text style={{ color: "#fff", fontSize: 16 }}>{item.name}</Text>
                <Text style={{ color: "#ccc", fontSize: 12, marginBottom: 4 }}>{item.code}</Text>
                <View style={{ flexDirection: "row", marginBottom: 4 }}>
                  {[1,2,3,4,5].map(level => (
                    <View
                      key={level}
                      style={{
                        flex: 1,
                        height: 10,
                        marginRight: level < 5 ? 4 : 0,
                        borderRadius: 5,
                        backgroundColor: level <= (item.level || 3) ? "#FFC20E" : "#ccc",
                      }}
                    />
                  ))}
                </View>
                <Text
                  style={{
                    color: item.status === "Out of Stock" ? "#FF6B6B" : item.status === "Restock" ? "#FFC20E" : "#28A745",
                    fontWeight: "600",
                  }}
                >
                  {item.status}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* MOBILE SIDEBAR OVERLAY */}
      {isMobile && mobileSidebarOpen && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: 50,
          }}
        >
          <Animated.View
            style={{
              width: sidebarWidth,
              height: "100%",
              backgroundColor: "#193288",
              padding: 26,
              transform: [{ translateX: sidebarAnim }],
            }}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
              <Text style={{ color: "#fff", fontSize: 22, fontWeight: "bold" }}>ShareFlow</Text>
              <TouchableOpacity onPress={closeMobileSidebar}>
                <Ionicons name="close" size={28} color="#fff" />
              </TouchableOpacity>
            </View>

            {sidebarItems.map((item) => {
              const isActive = activeTab === item.label;
              return (
                <TouchableOpacity
                  key={item.label}
                  onPress={() => {
                    setActiveTab(item.label);
                    closeMobileSidebar();
                  }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 14,
                    paddingHorizontal: 16,
                    marginBottom: 16,
                    borderRadius: 16,
                    backgroundColor: isActive ? COLORS.button : "transparent",
                  }}
                >
                  <Ionicons
                    name={item.icon as any}
                    size={22}
                    color={isActive ? COLORS.accent : "#fff"}
                    style={{ marginRight: 12 }}
                  />
                  <Text style={{ color: isActive ? COLORS.accent : "#fff", fontSize: 16, fontWeight: "600" }}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </Animated.View>
        </View>
      )}

      {/* NOTIFICATION DRAWER */}
      {showNotifications && (
        <Animated.View
          style={{
            position: "absolute",
            right: slideAnim,
            top: 0,
            height: "100%",
            width: 300,
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 6,
            padding: 16,
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>Notifications</Text>
            <TouchableOpacity onPress={closeNotifications}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <ScrollView>
            {topProducts.map((item, idx) => (
              <View key={idx} style={{ paddingVertical: 8, borderBottomWidth: 0.5, borderBottomColor: "#ccc" }}>
                <Text>{item.name} - {item.status}</Text>
              </View>
            ))}
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
};

export default AdminDashboard;
