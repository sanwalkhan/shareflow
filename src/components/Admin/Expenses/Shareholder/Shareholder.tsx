// src/components/Shareholder.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// -------------------------
// Navigation Types
// -------------------------
export type RootStackParamList = {
  Shareholder: undefined;
  Expenses: undefined;
  // Add more screens here if needed
};

type ShareholderNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Shareholder"
>;

// -------------------------
// Component
// -------------------------
const { width: screenWidth } = Dimensions.get("window");
const sidebarItems = ["Shareholder", "Expenses"];

const Shareholder: React.FC = () => {
  const navigation = useNavigation<ShareholderNavigationProp>();
  const isSmallScreen = screenWidth < 768; // breakpoint for mobile

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        {/* Sidebar */}
        <LinearGradient
          colors={["#2A2F50", "#28A745"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ width: 250, padding: 16 }}
        >
          {/* Sidebar content */}
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 32 }}>
            <Image
              source={require("../../../../assets/image.png")}
              style={{ width: 40, height: 40, borderRadius: 8 }}
            />
            <Text
              style={{
                color: "white",
                fontSize: 24,
                fontWeight: "bold",
                marginLeft: 8,
              }}
            >
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
                backgroundColor: item === "Shareholder" ? "#28A745" : "transparent",
              }}
              onPress={() => {
                if (item === "Expenses") navigation.navigate("Expenses");
                // You can also navigate to Shareholder if needed
              }}
            >
              {item === "Shareholder" && (
                <Ionicons
                  name="person-outline"
                  size={20}
                  color="white"
                  style={{ marginRight: 8 }}
                />
              )}
              {item === "Expenses" && (
                <Ionicons
                  name="wallet-outline"
                  size={20}
                  color="white"
                  style={{ marginRight: 8 }}
                />
              )}
              <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
                {item}
              </Text>
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
            {/* Gradient Text + Icon */}
            <MaskedView
              maskElement={
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons
                    name="person-outline"
                    size={24}
                    style={{ marginRight: 6 }}
                    color="black"
                  />
                  <Text style={{ fontSize: 24, fontWeight: "600" }}>Shareholder</Text>
                </View>
              }
            >
              <LinearGradient
                colors={["#2A2F50", "#28A745"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={{ fontSize: 24, fontWeight: "600", opacity: 0 }}>
                  Shareholder
                </Text>
              </LinearGradient>
            </MaskedView>

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
                <Ionicons
                  name="search-outline"
                  size={18}
                  color="gray"
                  style={{ marginRight: 6 }}
                />
                <Text style={{ color: "#333", fontWeight: "600", fontSize: 14 }}>
                  Search for everything
                </Text>
              </TouchableOpacity>

              <Ionicons name="notifications-outline" size={28} color="gray" />
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
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "500",
                  marginBottom: isSmallScreen ? 12 : 0,
                }}
              >
                Welcome back, Sarah!
              </Text>

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
                  <Ionicons
                    name="add-outline"
                    size={20}
                    color="white"
                    style={{ marginRight: 6 }}
                  />
                  <Text style={{ color: "white", fontWeight: "600" }}>Add New</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>

            {/* Table placeholder */}
            <ScrollView>
              <Text>Table or main content goes here...</Text>
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Shareholder;
