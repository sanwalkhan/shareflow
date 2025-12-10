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

// -------------------------
// Navigation Types
// -------------------------
export type RootStackParamList = {
  Dashboard: undefined;
  ShareholderReport: undefined;
  ShareholderFvrt: undefined;
  ShareholderHistory: undefined;
};

type ShareholderNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Dashboard"
>;

// -------------------------
// Colors
// -------------------------
const COLORS = {
  primary: "#193288",     // Sidebar + Header background
  accent: "#001867ff",    // Active icon/text color
  button: "#FFC20E",      // Active tab/button
  textDark: "#111827",
  success: "#16a34a",
  danger: "#dc2626",
};

// -------------------------
const { width: screenWidth } = Dimensions.get("window");
const sidebarWidth = 250;

// -------------------------
const sidebarItems = [
  { label: "Dashboard", icon: "speedometer-outline" },
  { label: "Report", icon: "document-text-outline" },
  { label: "Favourite", icon: "heart-outline" },
  { label: "History", icon: "time-outline" },
];

// -------------------------
const ShareholderDashboard: React.FC = () => {
  const navigation = useNavigation<ShareholderNavigationProp>();
  const [activeTab, setActiveTab] = React.useState("Dashboard");
  const [showNotifications, setShowNotifications] = React.useState(false);
  const slideAnim = React.useRef(new Animated.Value(300)).current;

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

  const topStats = [
    { title: "Today's Revenue", value: "₹15,00,000", percent: "+4.8%", color: COLORS.success },
    { title: "Today's Orders", value: "7,506", percent: "-3.5%", color: COLORS.danger },
    { title: "Today's Visitors", value: "17,058", percent: "+9.3%", color: COLORS.success },
  ];

  const bestSelling = [
    { name: "Shah Zaib Kazmi", code: "SZB KAZMI", status: "Out of Stock" },
    { name: "Green Velvet Semi Sleeve", code: "#20257", status: "Available" },
    { name: "Nike Air Max 2569", code: "#P1020", status: "Restock" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#E6F0FF", flexDirection: "row" }}>

      {/* SIDEBAR — NO GRADIENT — SAME DARK BLUE AS HEADER */}
      <View
        style={{
          width: sidebarWidth,
          padding: 26,
          backgroundColor: COLORS.primary,
        }}
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
              onPress={() => {
                setActiveTab(item.label);

                if (item.label === "Report") navigation.navigate("ShareholderReport");
                else if (item.label === "Favourite") navigation.navigate("Shareholderfvrt");
                else if (item.label === "History") navigation.navigate("ShareholderHistory");
                else navigation.navigate("Dashboard");
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
      </View>

      {/* MAIN CONTENT */}
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
          <MaskedView
            maskElement={
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="speedometer-outline" size={24} color="#fff" style={{ marginRight: 6 }} />
                <Text style={{ fontSize: 24, fontWeight: "600", color: "#fff" }}>Dashboard</Text>
              </View>
            }
          >
            <LinearGradient colors={[COLORS.primary, COLORS.primary]}>
              <Text style={{ fontSize: 24, fontWeight: "600", opacity: 0 }}>Dashboard</Text>
            </LinearGradient>
          </MaskedView>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
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
              <Text style={{ color: COLORS.accent, fontWeight: "800", fontSize: 14 }}>
                Search for everything
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={openNotifications}>
              <Ionicons name="notifications-outline" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ADD NEW */}
        <View style={{ paddingHorizontal: 16, paddingVertical: 8, alignItems: "flex-end" }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.button,
              paddingHorizontal: 24,
              paddingVertical: 8,
              borderRadius: 12,
              minWidth: 140,
              height: 48,
              marginRight: 30,
            }}
          >
            <Text style={{ color: COLORS.accent, fontWeight: "bold", fontSize: 16 }}>+ Add new</Text>
          </TouchableOpacity>
        </View>

        {/* CONTENT */}
        <ScrollView style={{ padding: 10 }}>
          {/* TOP CARDS */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", marginBottom: 16 }}>
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
                <Text style={{ color: "#fff", fontSize: 12 }}>{card.title}</Text>
                <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold", marginTop: 4 }}>{card.value}</Text>
                <Text style={{ color: card.color, marginTop: 2 }}>{card.percent} from yesterday</Text>
              </View>
            ))}
          </View>

          {/* BEST SELLING */}
          <View style={{ backgroundColor: "#000", borderRadius: 12, padding: 16, marginTop: 32 }}>
            <Text style={{ color: "#fff", fontWeight: "bold", marginBottom: 8 }}>Best Selling Products</Text>

            {bestSelling.map((item, idx) => (
              <View
                key={idx}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#1c1c1c",
                  borderRadius: 8,
                  padding: 8,
                  marginTop: 18,
                }}
              >
                <Text style={{ color: "#fff" }}>{item.name}</Text>
                <Text style={{ color: "#ccc" }}>{item.code}</Text>

                <Text
                  style={{
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    borderRadius: 4,
                    fontSize: 12,
                    fontWeight: "600",
                    backgroundColor:
                      item.status === "Out of Stock"
                        ? "red"
                        : item.status === "Restock"
                        ? "yellow"
                        : "green",
                    color: item.status === "Restock" ? "black" : "white",
                  }}
                >
                  {item.status}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* NOTIFICATIONS */}
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

          <TouchableOpacity style={{ paddingVertical: 8, marginBottom: 12 }}>
            <Text style={{ color: COLORS.success, fontWeight: "600" }}>Mark All as Read</Text>
          </TouchableOpacity>

          <ScrollView>
            {bestSelling.map((item, idx) => (
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

export default ShareholderDashboard;
