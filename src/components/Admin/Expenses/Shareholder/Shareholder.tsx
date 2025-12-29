import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

// ✅ Correct Sidebar import
import Sidebar from "../../../SidebarComponent/sidebar";

const COLORS = {
  primary: "#193288",
  bg: "#f3f4f6",
  white: "#ffffff",
};

const MIN_WIDTH = 360;
const BREAKPOINT = 700;

const Shareholder: React.FC = () => {
  const [screenWidth, setScreenWidth] = useState(
    Math.max(Dimensions.get("window").width, MIN_WIDTH)
  );
  const isMobile = screenWidth < BREAKPOINT;

  /* ---------------- SIDEBAR ---------------- */
  const sidebarAnim = useRef(new Animated.Value(-260)).current;
  const mainAnim = useRef(new Animated.Value(0)).current;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const sub = Dimensions.addEventListener("change", ({ window }) => {
      const w = Math.max(window.width, MIN_WIDTH);
      setScreenWidth(w);

      if (w >= BREAKPOINT) {
        sidebarAnim.setValue(0);
        mainAnim.setValue(0);
        setSidebarOpen(false);
      } else {
        sidebarAnim.setValue(-260);
        mainAnim.setValue(0);
      }
    });
    return () => sub.remove();
  }, []);

  const toggleSidebar = () => {
    const toValue = sidebarOpen ? -260 : 0;
    Animated.timing(sidebarAnim, { toValue, duration: 300, useNativeDriver: false }).start();
    Animated.timing(mainAnim, { toValue: sidebarOpen ? 0 : 260, duration: 300, useNativeDriver: false }).start();
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    Animated.timing(sidebarAnim, { toValue: -260, duration: 300, useNativeDriver: false }).start();
    Animated.timing(mainAnim, { toValue: 0, duration: 300, useNativeDriver: false }).start(() => setSidebarOpen(false));
  };

  /* ---------------- NOTIFICATIONS ---------------- */
  const [showNotifications, setShowNotifications] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;

  const openNotifications = () => {
    setShowNotifications(true);
    Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: false }).start();
  };

  const closeNotifications = () => {
    Animated.timing(slideAnim, { toValue: 300, duration: 300, useNativeDriver: false }).start(() => setShowNotifications(false));
  };

  return (
    <View style={{ flex: 1, flexDirection: "row", backgroundColor: COLORS.bg }}>
      {/* DESKTOP SIDEBAR */}
      {!isMobile && <Sidebar />}

      {/* MOBILE SIDEBAR */}
      {isMobile && (
        <>
          {sidebarOpen && (
            <TouchableWithoutFeedback onPress={closeSidebar}>
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: "rgba(0,0,0,0.3)",
                  zIndex: 998,
                }}
              />
            </TouchableWithoutFeedback>
          )}

          <Animated.View
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: 260,
              transform: [{ translateX: sidebarAnim }],
              backgroundColor: COLORS.primary,
              zIndex: 999,
              elevation: 10,
            }}
          >
            <Sidebar mobile onClose={closeSidebar} />
          </Animated.View>
        </>
      )}

      {/* MAIN CONTENT */}
      <Animated.View
        style={{
          flex: 1,
          transform: [{ translateX: isMobile ? mainAnim : 0 }],
        }}
      >
        {/* HEADER */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: COLORS.primary,
            paddingHorizontal: 16,
            paddingVertical: 18,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {isMobile && (
              <TouchableOpacity onPress={toggleSidebar} style={{ marginRight: 12 }}>
                <Ionicons name={sidebarOpen ? "close" : "menu"} size={26} color="#fff" />
              </TouchableOpacity>
            )}

            <MaskedView
              maskElement={
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="person-outline" size={24} color="#fff" />
                  <Text style={{ fontSize: 24, fontWeight: "600", color: "#fff", marginLeft: 6 }}>
                    Shareholder
                  </Text>
                </View>
              }
            >
              <LinearGradient colors={[COLORS.primary, COLORS.primary]}>
                <Text style={{ fontSize: 24, fontWeight: "600", opacity: 0 }}>Shareholder</Text>
              </LinearGradient>
            </MaskedView>
          </View>

          {/* HEADER ACTIONS */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {!isMobile && (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: COLORS.white,
                  paddingHorizontal: 12,
                  height: 44,
                  borderRadius: 10,
                  marginRight: 12,
                }}
              >
                <Ionicons name="search-outline" size={18} color={COLORS.primary} />
                <Text style={{ marginLeft: 6, fontWeight: "700", color: COLORS.primary }}>
                  Search for everything
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={openNotifications}>
              <Ionicons name="notifications-outline" size={26} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* CONTENT */}
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {/* MOBILE BUTTONS BELOW HEADER */}
          {isMobile && (
            <View style={{ flexDirection: "row", gap: 8, marginBottom: 16 }}>
              <LinearGradient colors={[COLORS.primary, "#2c4bd9"]} style={{ borderRadius: 24, flex: 1 }}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 12,
                  }}
                >
                  <Ionicons name="add-outline" size={20} color="#fff" />
                  <Text style={{ color: "#fff", fontWeight: "600", marginLeft: 6 }}>Add New</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          )}

          <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 12 }}>Welcome back, Sarah!</Text>

          <View style={{ backgroundColor: COLORS.white, borderRadius: 16, padding: 16, minHeight: 220 }}>
            <Text style={{ color: "#333" }}>Table or main content goes here...</Text>
          </View>
        </ScrollView>
      </Animated.View>

      {/* NOTIFICATION DRAWER */}
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
              <Ionicons name="close" size={24} />
            </TouchableOpacity>
          </View>

          <ScrollView>
            {["Your report has been generated.", "New shareholder added.", "Expense record updated."].map(
              (n, i) => (
                <View key={i} style={{ paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#eee" }}>
                  <Text>{n}</Text>
                </View>
              )
            )}
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
};

export default Shareholder;
