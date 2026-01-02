import React from "react";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { COLORS } from "../../Constants/theme";


const Header: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Get screen width
  const screenWidth = Dimensions.get("window").width;

  // Consider mobile if width <= 768 (you can adjust breakpoint as needed)
  const isMobile = screenWidth <= 1024;

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 18,
        backgroundColor: COLORS.headerBackground,
        height: 80,
      }}
    >
      {/* Logo */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={require("../../assets/image.png")}
          style={{ width: 32, height: 32, marginRight: 10 }}
          resizeMode="contain"
        />
        {/* Title */}
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: COLORS.headingText,
          }}
        >
          ShareFlow
        </Text>
      </View>

      {/* Right Buttons */}
      <View style={{ flexDirection: "row", gap: 12 }}>
        {/* HR Dashboard - hide on mobile */}
        {!isMobile && (
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              paddingHorizontal: 18,
              paddingVertical: 10,
              borderRadius: 12,
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("HrManagement")}
          >
            <Text
              style={{ color: COLORS.white, fontWeight: "600", fontSize: 15 }}
            >
              HR & Employer
            </Text>
          </TouchableOpacity>
        )}

        {/* Hr & Employer - hide on mobile */}
        {!isMobile && (
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.success,
              paddingHorizontal: 18,
              paddingVertical: 10,
              borderRadius: 12,
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("HrDashboardLayout")}
          >
            <Text
              style={{ color: COLORS.white, fontWeight: "600", fontSize: 15 }}
            >
              Hr Side
            </Text>
          </TouchableOpacity>
        )}

        {/* Register - always visible */}
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.button,
            paddingHorizontal: 22,
            paddingVertical: 10,
            borderRadius: 12,
            minWidth: 120,
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("LeaveRecall")}
        >
          <Text
            style={{ color: COLORS.white, fontWeight: "bold", fontSize: 16 }}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
