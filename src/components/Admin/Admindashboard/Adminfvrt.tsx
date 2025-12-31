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
import Sidebar from "./ADsidebar";

const COLORS = {
 primary: "#193288",
  accent: "#FFC20E",
  bg: "#E6F0FF",
  card: "#000",
};

const topCards = [
  { title: "Planned Projects", value: "12" },
  { title: "Scheduled Projects", value: "5" },
  { title: "Preparing", value: "4" },
  { title: "Favorites", value: "3" },
];

const projectData = [
  { name: "Project Alpha", status: "Preparing" },
  { name: "Project Beta", status: "Scheduled" },
  { name: "Project Gamma", status: "Published" },
  { name: "Project Delta", status: "Favorited" },
];

const notifications = [
  "Investor A requested Project Alpha",
  "Project Beta scheduled",
  "Project Gamma published",
  "Project Delta favorited",
];

const Header = ({
  isMobile,
  openSidebar,
  openNotifications,
}: {
  isMobile: boolean;
  openSidebar: () => void;
  openNotifications: () => void;
}) => (
  <View
    style={{
      backgroundColor: COLORS.primary,
      paddingHorizontal: 16,
      paddingVertical: 18,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {isMobile && (
        <TouchableOpacity onPress={openSidebar} style={{ marginRight: 10 }}>
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
      )}
      <Ionicons name="briefcase-outline" size={24} color="#fff" />
      <Text
        style={{
          color: "#fff",
          fontSize: 22,
          fontWeight: "800",
          marginLeft: 8,
        }}
      >
        Admin Projects
      </Text>
    </View>

    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {!isMobile && (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#fff",
            paddingHorizontal: 18,
            paddingVertical: 10,
            borderRadius: 14,
            marginRight: 12,
          }}
        >
          <Ionicons name="search-outline" size={18} color={COLORS.primary} />
          <Text style={{ marginLeft: 6, fontWeight: "800", color: COLORS.primary }}>
            Search Everything
          </Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={openNotifications}>
        <Ionicons name="notifications-outline" size={26} color="#fff" />
      </TouchableOpacity>
    </View>
  </View>
);

const Adminfvrt: React.FC = () => {
  const [activeTab, setActiveTab] = useState("favourite");
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [windowWidth, setWindowWidth] = useState(Dimensions.get("window").width);

  const sidebarAnim = useRef(new Animated.Value(-280)).current;
  const notifAnim = useRef(new Animated.Value(320)).current;

  useEffect(() => {
    const update = () => {
      const width = Dimensions.get("window").width;
      setWindowWidth(width);
      setIsMobile(width <= 780);
    };
    update();
    const sub = Dimensions.addEventListener("change", update);
    return () => sub.remove();
  }, []);

  const openSidebar = () => {
    setShowSidebar(true);
    Animated.timing(sidebarAnim, { toValue: 0, duration: 300, useNativeDriver: false }).start();
  };

  const closeSidebar = () => {
    Animated.timing(sidebarAnim, { toValue: -280, duration: 300, useNativeDriver: false }).start(() => setShowSidebar(false));
  };

  const openNotifications = () => {
    setShowNotifications(true);
    Animated.timing(notifAnim, { toValue: 0, duration: 300, useNativeDriver: false }).start();
  };

  const closeNotifications = () => {
    Animated.timing(notifAnim, { toValue: 320, duration: 300, useNativeDriver: false }).start(() => setShowNotifications(false));
  };

  // Determine card width based on window width
  const cardWidth = isMobile ? "48%" : "23%"; // 2 columns on mobile, 4 on desktop

  return (
    <View style={{ flex: 1, flexDirection: "row", backgroundColor: COLORS.bg }}>
      {!isMobile && <Sidebar activeTab={activeTab} onSelect={setActiveTab} />}

      <View style={{ flex: 1 }}>
        <Header isMobile={isMobile} openSidebar={openSidebar} openNotifications={openNotifications} />

        <ScrollView style={{ padding: 14 }}>
          {isMobile && (
            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                padding: 14,
                borderRadius: 14,
                marginBottom: 12,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons name="search-outline" size={18} color={COLORS.primary} />
              <Text style={{ marginLeft: 6, fontWeight: "800", color: COLORS.primary }}>
                Search Everything
              </Text>
            </TouchableOpacity>
          )}

          <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: 12 }}>
            {topCards.map((card, idx) => (
              <View
                key={idx}
                style={{
                  width: cardWidth,
                  backgroundColor: COLORS.card,
                  padding: 14,
                  borderRadius: 14,
                  marginBottom: 12,
                }}
              >
                <Text style={{ color: "#fff", fontSize: 12 }}>{card.title}</Text>
                <Text style={{ color: "#fff", fontSize: 18, fontWeight: "800", marginTop: 6 }}>
                  {card.value}
                </Text>
              </View>
            ))}
          </View>

          <View
            style={{
              backgroundColor: COLORS.card,
              borderRadius: 16,
              padding: 16,
              marginTop: 16,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "800", marginBottom: 12 }}>
              Project Overview
            </Text>
            {projectData.map((item, idx) => (
              <View
                key={idx}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 10,
                  borderBottomWidth: idx < projectData.length - 1 ? 0.5 : 0,
                  borderBottomColor: "#555",
                }}
              >
                <Text style={{ color: "#fff" }}>{item.name}</Text>
                <Text style={{ color: COLORS.accent, fontWeight: "700" }}>{item.status}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {isMobile && showSidebar && (
        <>
          <TouchableWithoutFeedback onPress={closeSidebar}>
            <View style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.35)" }} />
          </TouchableWithoutFeedback>
          <Animated.View
            style={{
              position: "absolute",
              left: sidebarAnim,
              top: 0,
              bottom: 0,
              width: 280,
              backgroundColor: "#fff",
              elevation: 10,
            }}
          >
            <Sidebar
              activeTab={activeTab}
              onSelect={(tab: string) => {
                setActiveTab(tab);
                closeSidebar();
              }}
            />
          </Animated.View>
        </>
      )}

      {showNotifications && (
        <Animated.View
          style={{
            position: "absolute",
            right: notifAnim,
            top: 0,
            height: "100%",
            width: isMobile ? "100%" : 300,
            backgroundColor: "#fff",
            padding: 16,
            elevation: 10,
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: "800" }}>Notifications</Text>
            <TouchableOpacity onPress={closeNotifications}>
              <Ionicons name="close" size={26} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            {notifications.map((note, idx) => (
              <Text key={idx} style={{ paddingVertical: 8 }}>
                • {note}
              </Text>
            ))}
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
};

export default Adminfvrt;
