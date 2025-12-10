// src/components/Expenses.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const { width: screenWidth } = Dimensions.get("window");
const sidebarItems = ["Shareholder", "Expenses"];

const Expenses: React.FC = () => {
  const navigation = useNavigation();
  const isSmallScreen = screenWidth < 768; // breakpoint for mobile

  // -------------------------
  // Notification Drawer States
  // -------------------------
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

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        {/* Sidebar with Gradient */}
        <LinearGradient
          colors={["#2A2F50", "#28A745"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ width: 250, padding: 16 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 32 }}>
            <Image
              source={require("../../../assets/image.png")}
              style={{ width: 40, height: 40, borderRadius: 8 }}
            />
            <Text style={{ color: "white", fontSize: 24, fontWeight: "bold", marginLeft: 8 }}>
              ShareFlow
            </Text>
          </View>

          {sidebarItems.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 10,
                paddingHorizontal: 12,
                marginBottom: 8,
                borderRadius: 8,
                backgroundColor: item === "Expenses" ? "#28A745" : "transparent",
              }}
              onPress={() => {
                if (item === "Shareholder") navigation.navigate("Shareholder");
              }}
            >
              {item === "Shareholder" && (
                <Ionicons name="person-outline" size={20} color="white" style={{ marginRight: 8 }} />
              )}
              {item === "Expenses" && (
                <Ionicons name="wallet-outline" size={20} color="white" style={{ marginRight: 8 }} />
              )}
              <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>{item}</Text>
            </TouchableOpacity>
          ))}
        </LinearGradient>

        {/* Main Section */}
        <View style={{ flex: 1, backgroundColor: "#f3f3f3" }}>
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#f3f3f3",
              paddingHorizontal: 16,
              paddingVertical: 12,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            {/* Header Title */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="wallet-outline" size={24} color="#28A745" style={{ marginRight: 6 }} />
              <Text style={{ fontSize: 24, fontWeight: "600", color: "#2A2F50" }}>Expenses</Text>
            </View>

            {/* Search + Notification */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#e5e5e5",
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  borderRadius: 8,
                  marginRight: 12,
                  width: 190,
                  height: 50,
                  justifyContent: "center",
                }}
              >
                <Ionicons name="search-outline" size={18} color="gray" style={{ marginRight: 6 }} />
                <Text style={{ color: "#333", fontWeight: "600", fontSize: 14 }}>Search for everything</Text>
              </TouchableOpacity>

              {/* Bell Icon */}
              <TouchableOpacity onPress={openNotifications}>
                <Ionicons name="notifications-outline" size={28} color="gray" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Main Content */}
          <View style={{ padding: 16 }}>
            <View
              style={{
                flexDirection: isSmallScreen ? "column" : "row",
                justifyContent: "space-between",
                alignItems: isSmallScreen ? "flex-start" : "center",
                marginBottom: 16,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "500", marginBottom: isSmallScreen ? 12 : 0 }}>
                Welcome back, Sarah!
              </Text>

              {/* Add Expense Button */}
              <LinearGradient
                colors={["#2A2F50", "#28A745"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  borderRadius: 24.23,
                  width: 180,
                  alignSelf: isSmallScreen ? "flex-start" : "auto",
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 12,
                  }}
                >
                  <Ionicons name="add-outline" size={20} color="white" style={{ marginRight: 6 }} />
                  <Text style={{ color: "white", fontWeight: "600" }}>Add Expense</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>

            {/* Table */}
            <ScrollView horizontal style={{ marginTop: 16 }}>
              <View style={{ borderWidth: 1, borderColor: "#ccc" }}>
                {Array.from({ length: 5 }).map((_, rowIdx) => (
                  <View key={rowIdx} style={{ flexDirection: "row", borderBottomWidth: 1, borderColor: "#ccc" }}>
                    {Array.from({ length: 11 }).map((_, colIdx) => (
                      <View
                        key={colIdx}
                        style={{
                          width: 96,
                          height: 92,
                          borderRightWidth: 1,
                          borderColor: "#ccc",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ color: "#555" }}>&nbsp;</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>

      {/* -------------------------------------- */}
      {/* Notification Drawer */}
      {/* -------------------------------------- */}
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
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "700" }}>Notifications</Text>

            <TouchableOpacity onPress={closeNotifications}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {/* Mark all read */}
          <TouchableOpacity style={{ paddingVertical: 8, marginBottom: 12 }}>
            <Text style={{ color: "#28A745", fontWeight: "600" }}>Mark All as Read</Text>
          </TouchableOpacity>

          {/* Dummy notifications */}
          <ScrollView>
            {[
              "Your report has been generated.",
              "New expense added.",
              "Payment approved.",
              "Reminder: Submit your receipts.",
            ].map((n, i) => (
              <View
                key={i}
                style={{
                  paddingVertical: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: "#eee",
                }}
              >
                <Text style={{ fontSize: 15, color: "#333" }}>{n}</Text>
              </View>
            ))}
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
};

export default Expenses;
