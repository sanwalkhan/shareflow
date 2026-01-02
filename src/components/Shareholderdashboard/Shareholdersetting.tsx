import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

// Sidebar
import Sidebar from "./sidebar";

// Settings layout
import Settings from "./Settings-pages/Settings-layout";

const COLORS = {
  primary: "#193288",
};

const SettingsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("settings");
  const [isMobile, setIsMobile] = useState(Dimensions.get("window").width < 768);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notifAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    const onChange = ({ window }: { window: { width: number; height: number } }) => {
      setIsMobile(window.width < 768);
      if (window.width >= 768) setMobileSidebar(false);
    };

    const subscription = Dimensions.addEventListener("change", onChange);
    return () => {
      if (subscription?.remove) subscription.remove();
      else subscription?.remove()
    };
  }, []);

  const openNotifications = () => {
    setShowNotifications(true);
    Animated.timing(notifAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeNotifications = () => {
    Animated.timing(notifAnim, {
      toValue: 300,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setShowNotifications(false));
  };

  return (
    <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#E6F0FF" }}>
      {/* Sidebar */}
      {!isMobile && (
        <Sidebar activeTab={activeTab} onSelect={setActiveTab} mobile={false} />
      )}
      {isMobile && mobileSidebar && (
        <Sidebar
          activeTab={activeTab}
          onSelect={setActiveTab}
          mobile
          onClose={() => setMobileSidebar(false)}
        />
      )}

      {/* Main Content */}
      <View style={{ flex: 1 }}>
        {/* Header */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 20,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {isMobile && (
              <TouchableOpacity
                onPress={() => setMobileSidebar(true)}
                style={{ marginRight: 12 }}
              >
                <Ionicons name="menu-outline" size={28} color="#fff" />
              </TouchableOpacity>
            )}
            <Ionicons
              name="settings-outline"
              size={24}
              color="#fff"
              style={{ marginRight: 6 }}
            />
            <Text style={{ fontSize: 24, fontWeight: "600", color: "#fff" }}>
              Settings
            </Text>
          </View>

          <TouchableOpacity onPress={openNotifications}>
            <Ionicons name="notifications-outline" size={28} color="#fff" />
          </TouchableOpacity>
        </LinearGradient>

        {/* Page Content */}
        <ScrollView style={{ flex: 1 }}>
          {/* 🔑 Render full Settings layout INSIDE Shareholder shell */}
          <Settings />
        </ScrollView>
      </View>

      {/* Notifications Panel */}
      {showNotifications && (
        <Animated.View
          style={{
            position: "absolute",
            right: notifAnim,
            top: 0,
            width: 300,
            height: "100%",
            backgroundColor: "#fff",
            padding: 16,
            zIndex: 999,
          }}
        >
          <TouchableOpacity
            onPress={closeNotifications}
            style={{ position: "absolute", top: 16, right: 16 }}
          >
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>

          <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 12 }}>
            Notifications
          </Text>
        </Animated.View>
      )}
    </View>
  );
};

export default SettingsScreen;
