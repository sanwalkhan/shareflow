// src/screens/ShareholderFvrt.tsx
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Sidebar from "./sidebar";

const COLORS = {
  primary: "#193288",
  accent: "#FFC20E",
};

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

const Header = ({
  title,
  isMobile,
  toggleSidebar,
  openNotifications,
}: {
  title: string;
  isMobile: boolean;
  toggleSidebar?: () => void;
  openNotifications: () => void;
}) => (
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
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {isMobile && toggleSidebar && (
        <TouchableOpacity onPress={toggleSidebar} style={{ marginRight: 12 }}>
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
      )}
      <Ionicons name="heart-outline" size={24} color="#fff" />
      <Text style={{ fontSize: 22, fontWeight: "700", color: "#fff", marginLeft: 8 }}>
        {title}
      </Text>
    </View>

    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TouchableOpacity onPress={openNotifications}>
        <Ionicons name="notifications-outline" size={26} color="#fff" />
      </TouchableOpacity>
    </View>
  </View>
);

const ShareholderFvrt: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const sidebarAnim = useRef(new Animated.Value(-260)).current;
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    const update = () => {
      const width = Dimensions.get("window").width;
      setIsMobile(width < 820);
      if (width >= 820) {
        setSidebarOpen(false);
        sidebarAnim.setValue(0);
      }
    };
    update();
    Dimensions.addEventListener("change", update);
    return () => Dimensions.removeEventListener("change", update);
  }, []);

  const toggleSidebar = () => {
    if (sidebarOpen) {
      Animated.timing(sidebarAnim, { toValue: -260, duration: 300, useNativeDriver: false }).start(() =>
        setSidebarOpen(false)
      );
    } else {
      setSidebarOpen(true);
      Animated.timing(sidebarAnim, { toValue: 0, duration: 300, useNativeDriver: false }).start();
    }
  };

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
      {/* Sidebar desktop */}
      {!isMobile && <Sidebar activeTab="Favourites" onSelect={() => {}} />}

      {/* Mobile Sidebar */}
      {isMobile && sidebarOpen && (
        <TouchableWithoutFeedback onPress={toggleSidebar}>
          <View
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.3)",
              zIndex: 998,
            }}
          />
        </TouchableWithoutFeedback>
      )}
      {isMobile && (
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: sidebarAnim,
            width: 260,
            backgroundColor: "#fff",
            zIndex: 999,
            elevation: 10,
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowOffset: { width: 2, height: 0 },
            shadowRadius: 4,
          }}
        >
          <Sidebar activeTab="Favourites" onSelect={toggleSidebar} mobile onClose={toggleSidebar} />
        </Animated.View>
      )}

      <View style={{ flex: 1 }}>
        <Header title="Shareholder Favorites" isMobile={isMobile} toggleSidebar={toggleSidebar} openNotifications={openNotifications} />

        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {/* Top Cards */}
          <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 16 }}>
            {topCards.map((card, idx) => (
              <View
                key={idx}
                style={{
                  width: isMobile ? "48%" : "23%",
                  backgroundColor: "#000",
                  padding: 12,
                  borderRadius: 12,
                  marginBottom: 12,
                }}
              >
                <Text style={{ color: "#fff", fontSize: 12 }}>{card.title}</Text>
                <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700", marginTop: 4 }}>{card.value}</Text>
              </View>
            ))}
          </View>

          {/* Stock Overview */}
          <View style={{ backgroundColor: "#000", borderRadius: 12, padding: 16 }}>
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "700", marginBottom: 12 }}>Stock Overview</Text>
            {stockData.map((item, idx) => (
              <View
                key={idx}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 8,
                  borderBottomWidth: idx < stockData.length - 1 ? 0.5 : 0,
                  borderBottomColor: "#ccc",
                }}
              >
                <Text style={{ color: "#fff" }}>{item.label}</Text>
                <Text style={{ color: "#fff", fontWeight: "700" }}>{item.qty}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Notifications panel */}
        {showNotifications && (
          <Animated.View
            style={{
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
            }}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
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
      </View>
    </View>
  );
};

export default ShareholderFvrt;
