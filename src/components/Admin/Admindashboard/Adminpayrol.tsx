// src/screens/PayrollScreen.tsx
import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, ScrollView, Dimensions, Animated, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import Sidebar from "../AdminSidebar/ADsidebar";

const COLORS = {
  primary: "#14339b",
  secondary: "#1a45c2",
  button: "#FFC20E",
  cardBackground: "#000",
  cardText: "#fff",
  accent: "#FFC20E",
};

const adminCards = [
  { title: "Total Employees", value: "120", percent: "+5%" },
  { title: "Pending Approvals", value: "8", percent: "+2%" },
  { title: "Monthly Payroll Expense", value: "$580,000", percent: "+3%" },
];

const payrollData = [
  { id: "1", name: "John Doe", position: "Manager", amount: "$5000", date: "2025-12-01" },
  { id: "2", name: "Jane Smith", position: "Developer", amount: "$4500", date: "2025-12-01" },
  { id: "3", name: "Robert Johnson", position: "Designer", amount: "$4800", date: "2025-12-01" },
  { id: "4", name: "Emily Davis", position: "QA Engineer", amount: "$4700", date: "2025-12-01" },
];

const AdminPayroll: React.FC = () => {
  const [isMobile, setIsMobile] = useState(Dimensions.get("window").width < 768);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notifAnim = useRef(new Animated.Value(300)).current;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(payrollData);

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
    if (!searchQuery.trim()) setFilteredData(payrollData);
    else
      setFilteredData(
        payrollData.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.position.toLowerCase().includes(searchQuery.toLowerCase())
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
              <TouchableOpacity
                onPress={() => setMobileSidebar(true)}
                style={{ marginRight: 12 }}
              >
                <Ionicons name="menu-outline" size={28} color="#fff" />
              </TouchableOpacity>
            )}
            <MaskedView
              maskElement={
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons
                    name="cash-outline"
                    size={24}
                    color="#fff"
                    style={{ marginRight: 6 }}
                  />
                  <Text style={{ fontSize: 24, fontWeight: "600", color: "#fff" }}>
                    Payroll
                  </Text>
                </View>
              }
            >
              <LinearGradient colors={[COLORS.primary, COLORS.secondary]}>
                <Text style={{ fontSize: 24, fontWeight: "600", opacity: 0 }}>Payroll</Text>
              </LinearGradient>
            </MaskedView>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {!isMobile && (
              <>
                <TextInput
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 8,
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    width: 220,
                    marginRight: 12,
                    fontWeight: "600",
                  }}
                  placeholder="Search by name or position"
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

        {/* Mobile Search */}
        {isMobile && (
          <View style={{ padding: 16 }}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: COLORS.button,
                paddingVertical: 10,
                paddingHorizontal: 16,
                borderRadius: 12,
              }}
            >
              <Ionicons
                name="search-outline"
                size={20}
                color="#14339bff"
                style={{ marginRight: 8 }}
              />
              <Text style={{ color: "#14339bff", fontWeight: "800", fontSize: 16 }}>
                Search by name or position
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Scrollable Content */}
        <ScrollView style={{ paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 12, marginTop: 16 }}>
            Welcome Admin
          </Text>

          {/* Top Cards */}
          <View
            style={{
              flexDirection: isMobile ? "column" : "row",
              gap: 16,
              marginBottom: 16,
            }}
          >
            {adminCards.map((card, idx) => (
              <View
                key={idx}
                style={{
                  backgroundColor: COLORS.cardBackground,
                  padding: 16,
                  borderRadius: 12,
                  flex: 1,
                  marginBottom: isMobile ? 12 : 0,
                }}
              >
                <Text
                  style={{ color: COLORS.cardText, fontSize: 16, fontWeight: "600" }}
                >
                  {card.title}
                </Text>
                <Text style={{ color: COLORS.accent, fontSize: 18, fontWeight: "bold", marginTop: 4 }}>
                  {card.value} {card.percent && `(${card.percent})`}
                </Text>
              </View>
            ))}
          </View>

          {/* Payroll Table */}
          <View
            style={{
              backgroundColor: COLORS.cardBackground,
              borderRadius: 12,
              padding: 16,
              marginBottom: 40,
            }}
          >
            {filteredData.map((item) => (
              <View
                key={item.id}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 8,
                  borderBottomColor: "#333",
                  borderBottomWidth: 1,
                }}
              >
                <Text style={{ color: COLORS.cardText }}>{item.name}</Text>
                <Text style={{ color: COLORS.cardText }}>{item.position}</Text>
                <Text style={{ color: COLORS.cardText }}>{item.amount}</Text>
                <Text style={{ color: COLORS.cardText }}>{item.date}</Text>
              </View>
            ))}
            {filteredData.length === 0 && (
              <Text style={{ color: "#ccc", textAlign: "center", marginTop: 12 }}>
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
          <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 12 }}>
            Notifications
          </Text>
          <TouchableOpacity onPress={closeNotifications}>
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

export default AdminPayroll;
