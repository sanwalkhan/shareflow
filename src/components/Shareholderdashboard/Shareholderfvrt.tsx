// src/screens/ShareholderFvrt.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

const COLORS = {
  primary: "#14339b",
  success: "#16a34a",
  warning: "#f59e0b",
  danger: "#dc2626",
  button: "#FFC20E",
  textDark: "#111827",
};

const sidebarWidth = 250;
const sidebarItems = [
  { label: "Dashboard", icon: "speedometer-outline", route: "ShareholderDashboard" },
  { label: "Report", icon: "document-text-outline", route: "ShareholderReport" },
  { label: "Favourite", icon: "heart-outline", route: "Shareholderfvrt" },
  { label: "History", icon: "time-outline", route: "ShareholderHistory" },
];

export type RootStackParamList = {
  Dashboard: undefined;
  ShareholderReport: undefined;
  ShareholderFvrt: undefined;
  ShareholderHistory: undefined;
};

type ShareholderNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  navigation: ShareholderNavigationProp;
  isMobile: boolean;
  closeSidebar?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  navigation,
  isMobile,
  closeSidebar,
}) => (
  <View
    style={{
      width: sidebarWidth,
      padding: 26,
      backgroundColor: COLORS.primary,
      position: isMobile ? "absolute" : "relative",
      height: "100%",
      zIndex: 999,
      elevation: 10,
    }}
  >
    {isMobile && (
      <TouchableOpacity onPress={closeSidebar} style={{ marginBottom: 20 }}>
        <Ionicons name="close" size={28} color="#fff" />
      </TouchableOpacity>
    )}
    <Text style={{ color: "#fff", fontSize: 22, fontWeight: "bold", marginBottom: 32 }}>ShareFlow</Text>
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
            navigation.navigate(item.route as any);
            if (closeSidebar) closeSidebar();
          }}
        >
          <Ionicons name={item.icon as any} size={22} color={isActive ? "#000" : "#fff"} style={{ marginRight: 12 }} />
          <Text style={{ color: isActive ? "#000" : "#fff", fontSize: 16, fontWeight: "600" }}>
            {item.label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

interface HeaderProps {
  title: string;
  openNotifications: () => void;
  isMobile: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, openNotifications, isMobile }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: COLORS.primary,
      paddingHorizontal: 16,
      paddingVertical: 16,
    }}
  >
    {/* Title + Heart icon aligned center */}
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Ionicons name="heart-outline" size={24} color="#fff" style={{ marginLeft: 32, marginTop:6, }} />
      <Text style={{ fontSize: 24, fontWeight: "600", color: "#fff", marginLeft:1, }}>{title}</Text>
    </View>

    {/* Desktop buttons */}
    {!isMobile && (
      <View style={{ flexDirection: "row", alignItems: "center", marginLeft: "auto" }}>
        <TouchableOpacity style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: COLORS.button,
          paddingVertical: 6,
          paddingHorizontal: 12,
          borderRadius: 8,
          marginRight: 12,
          height: 50,
          justifyContent: "center",
        }}>
          <Ionicons name="search-outline" size={18} color={COLORS.primary} style={{ marginRight: 6 }} />
          <Text style={{ color: COLORS.primary, fontWeight: "800", fontSize: 14 }}>Search for everything</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: COLORS.button,
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 12,
          height: 50,
          justifyContent: "center",
          marginRight: 12,
        }}>
          <Ionicons name="add-outline" size={18} color={COLORS.primary} style={{ marginRight: 6 }} />
          <Text style={{ color: COLORS.primary, fontWeight: "bold", fontSize: 16 }}>Add new</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={openNotifications}>
          <Ionicons name="notifications-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    )}

    {/* Mobile notification icon */}
    {isMobile && (
      <TouchableOpacity onPress={openNotifications} style={{ marginLeft: 1 }}>
        <Ionicons name="notifications-outline" size={28} color="#fff" />
      </TouchableOpacity>
    )}
  </View>
);

const topCards = [
  { title: "Revenue", value: "₹15,00,000" },
  { title: "Orders", value: "7,506" },
  { title: "Visitors", value: "17,058" },
  { title: "Products", value: "1,234" },
];

const stockData = [
  { label: "Product A", qty: 120 },
  { label: "Product B", qty: 80 },
  { label: "Product C", qty: 200 },
  { label: "Product D", qty: 50 },
];

const ShareholderFvrt: React.FC = () => {
  const navigation = useNavigation<ShareholderNavigationProp>();
  const [activeTab, setActiveTab] = useState("Favourite");
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    const update = () => setIsMobile(Dimensions.get("window").width < 820);
    update();
    Dimensions.addEventListener("change", update);
    return () => Dimensions.removeEventListener("change", update);
  }, []);

  const openNotifications = () => {
    setShowNotifications(true);
    Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: false }).start();
  };
  const closeNotifications = () => {
    Animated.timing(slideAnim, { toValue: 300, duration: 300, useNativeDriver: false }).start(() =>
      setShowNotifications(false)
    );
  };

  return (
    <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#E6F0FF" }}>
      {!isMobile && <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} navigation={navigation} isMobile={false} />}
      {isMobile && mobileSidebar && (
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          navigation={navigation}
          isMobile
          closeSidebar={() => setMobileSidebar(false)}
        />
      )}

      <View style={{ flex: 1 }}>
        <Header title="Shareholder Favorites" openNotifications={openNotifications} isMobile={isMobile} />

        {/* Mobile Buttons above content */}
        {isMobile && (
          <View style={{ paddingHorizontal: 16, paddingVertical: 8, flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: COLORS.button,
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 8,
              marginRight: 8,
            }}>
              <Ionicons name="search-outline" size={16} color={COLORS.primary} style={{ marginRight: 4 }} />
              <Text style={{ color: COLORS.primary, fontWeight: "800", fontSize: 12 }}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: COLORS.button,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 8,
            }}>
              <Ionicons name="add-outline" size={16} color={COLORS.primary} style={{ marginRight: 4 }} />
              <Text style={{ color: COLORS.primary, fontWeight: "bold", fontSize: 14 }}>Add new</Text>
            </TouchableOpacity>
          </View>
        )}

        <ScrollView style={{ padding: 16 }} showsVerticalScrollIndicator={false}>
          {/* Top Cards */}
          <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 16 }}>
            {topCards.map((card, idx) => (
              <View key={idx} style={{
                flex: 1,
                minWidth: isMobile ? 140 : 150,
                backgroundColor: "#000",
                padding: 12,
                borderRadius: 12,
                marginRight: idx < topCards.length - 1 ? 8 : 0,
                marginBottom: 12,
              }}>
                <Text style={{ color: "#fff", fontSize: 12 }}>{card.title}</Text>
                <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold", marginTop: 4 }}>{card.value}</Text>
              </View>
            ))}
          </View>

          {/* Stock Card */}
          <View style={{ backgroundColor: "#000", borderRadius: 12, padding: 16 }}>
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold", marginBottom: 12 }}>Stock Overview</Text>
            {stockData.map((item, idx) => (
              <View key={idx} style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 8,
                borderBottomWidth: idx < stockData.length - 1 ? 0.5 : 0,
                borderBottomColor: "#ccc",
              }}>
                <Text style={{ color: "#fff" }}>{item.label}</Text>
                <Text style={{ color: "#fff", fontWeight: "700" }}>{item.qty}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Notifications */}
        {showNotifications && (
          <Animated.View style={{
            position: "absolute",
            right: slideAnim,
            top: 0,
            height: "100%",
            width: 300,
            backgroundColor: "#fff",
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 6,
            padding: 16,
            zIndex: 1000,
          }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <Text style={{ fontSize: 20, fontWeight: "700" }}>Notifications</Text>
              <TouchableOpacity onPress={closeNotifications}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {stockData.map((item, idx) => (
                <Text key={idx} style={{ paddingVertical: 8 }}>
                  {item.label} has {item.qty} in stock
                </Text>
              ))}
            </ScrollView>
          </Animated.View>
        )}

        {/* Mobile Sidebar toggle */}
        {isMobile && !mobileSidebar && (
          <TouchableOpacity
            onPress={() => setMobileSidebar(true)}
            style={{
              position: "absolute",
              top: 20,
              left: 16,
              zIndex: 1001,
            }}
          >
            <Ionicons name="menu" size={28} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ShareholderFvrt;
