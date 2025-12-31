// src/screens/SettingsScreen.tsx
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Sidebar from "./sidebar";

const COLORS = {
 primary: "#193288",
  secondary: "#1a45c2",
  button: "#FFC20E",
  cardBackground: "#000",
  cardText: "#fff",
  accent: "#FFC20E",
};

const dummyData = [
  { id: "1", name: "MLBL", percent: "12%" },
  { id: "2", name: "SFCL", percent: "11%" },
  { id: "3", name: "NTC", percent: "76%" },
  { id: "4", name: "SHIVAM", percent: "12%" },
  { id: "5", name: "ABC Corp", percent: "22%" },
];

const dummyNotifications = [
  { id: "1", text: "New update available" },
  { id: "2", text: "Profile updated successfully" },
  { id: "3", text: "Password changed" },
];

export default function SettingsScreen() {
  const [isMobile, setIsMobile] = useState(Dimensions.get("window").width < 768);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notifAnim = useRef(new Animated.Value(300)).current;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(dummyData);

  useEffect(() => {
    const onChange = ({ window }: { window: { width: number; height: number } }) => {
      setIsMobile(window.width < 768);
      if (window.width >= 768) setMobileSidebar(false);
    };
    const subscription = Dimensions.addEventListener("change", onChange);
    return () => {
      if (subscription?.remove) subscription.remove();
      else Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const openNotifications = () => {
    setShowNotifications(true);
    Animated.timing(notifAnim, { toValue: 0, duration: 300, useNativeDriver: false }).start();
  };

  const closeNotifications = () => {
    Animated.timing(notifAnim, { toValue: 300, duration: 300, useNativeDriver: false }).start(() =>
      setShowNotifications(false)
    );
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) setFilteredData(dummyData);
    else
      setFilteredData(
        dummyData.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
  };

  return (
    <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#E6F0FF", minWidth: 360 }}>
      {/* Sidebar */}
      {!isMobile && <Sidebar mobile={false} />}
      {isMobile && mobileSidebar && <Sidebar mobile open onClose={() => setMobileSidebar(false)} />}

      {/* Main Content */}
      <View style={{ flex: 1 }}>
        {/* Header */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
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
              <TouchableOpacity onPress={() => setMobileSidebar(true)} style={{ marginRight: 12 }}>
                <Ionicons name="menu-outline" size={28} color="#fff" />
              </TouchableOpacity>
            )}
            <Ionicons name="settings-outline" size={24} color="#fff" style={{ marginRight: 6 }} />
            <Text style={{ fontSize: 24, fontWeight: "600", color: "#fff" }}>Settings</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {!isMobile && (
              <>
                <TextInput
                  style={{
                    backgroundColor: "#fff", // white background
                    borderRadius: 8,
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    width: 220,
                    marginRight: 12,
                    fontWeight: "600",
                    color: "#14339b", // dark blue text
                  }}
                  placeholder="Search for everything"
                  placeholderTextColor="#999"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  onSubmitEditing={handleSearch}
                />
                <TouchableOpacity onPress={openNotifications} style={{ marginLeft: 12 }}>
                  <Ionicons name="notifications-outline" size={28} color="#fff" />
                </TouchableOpacity>
              </>
            )}
            {isMobile && (
              <TouchableOpacity onPress={openNotifications}>
                <Ionicons name="notifications-outline" size={28} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        </LinearGradient>

        {/* Mobile Search Button */}
        {isMobile && (
          <View style={{ padding: 16 }}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#fff",
                paddingVertical: 10,
                paddingHorizontal: 16,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#14339b",
                width: "100%", // full width
              }}
            >
              <Ionicons
                name="search-outline"
                size={20}
                color="#14339b"
                style={{ marginRight: 8 }}
              />
              <Text style={{ color: "#14339b", fontWeight: "800", fontSize: 16 }}>
                Search for everything
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Scrollable Content */}
        <ScrollView style={{ paddingHorizontal: 20, paddingTop: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 12 }}>
            Welcome back, Sarah!
          </Text>

          {/* Cards in Table-style */}
          <View style={{ marginBottom: 40 }}>
            {filteredData.map((item) => (
              <View
                key={item.id}
                style={{
                  backgroundColor: COLORS.cardBackground,
                  padding: 16,
                  borderRadius: 12,
                  marginBottom: 12,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: COLORS.cardText, fontSize: 16, fontWeight: "600" }}>
                    {item.name}
                  </Text>
                  <Text style={{ color: "#ccc", fontSize: 14 }}>{item.percent}</Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: COLORS.accent,
                      paddingVertical: 6,
                      paddingHorizontal: 12,
                      borderRadius: 8,
                    }}
                  >
                    <Text style={{ fontWeight: "600" }}>Watch Market</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            {filteredData.length === 0 && (
              <Text style={{ color: "#999", textAlign: "center", marginTop: 12 }}>
                No records found
              </Text>
            )}
          </View>
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
          {/* Close Icon at Top-Right */}
          <TouchableOpacity
            onPress={closeNotifications}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              zIndex: 1000,
            }}
          >
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>

          <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 12 }}>
            Notifications
          </Text>

          {dummyNotifications.map((n) => (
            <Text key={n.id} style={{ marginVertical: 6 }}>
              {n.text}
            </Text>
          ))}
        </Animated.View>
      )}
    </View>
  );
}
