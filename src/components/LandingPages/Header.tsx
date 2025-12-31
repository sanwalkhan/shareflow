import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
 import { COLORS } from "../../Constants/theme";
const Header: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
 
  return (
   <View
  style={{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 18,
    backgroundColor: COLORS.headerBackground, // theme bg
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
  <Text style={{ fontSize: 22, fontWeight: "bold", color: COLORS.headingText }}>
    ShareFlow
  </Text>

      </View>
 
      {/* Right Buttons */}
      <View style={{ flexDirection: "row", gap: 12 }}>
        {/* HR Dashboard */}
        <TouchableOpacity
      style={{
        backgroundColor: COLORS.primary, // theme primary
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 12,
        alignItems: "center",
      }}
      onPress={() => navigation.navigate("HrRegister")}
    >
      <Text style={{ color: COLORS.white, fontWeight: "600", fontSize: 15 }}>
        HR Register
      </Text>
    </TouchableOpacity>
 
        {/* ✅ Settings Button */}
       <TouchableOpacity
      style={{
        backgroundColor: COLORS.success, // theme success (green)
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 12,
        alignItems: "center",
      }}
      onPress={() => navigation.navigate("HrLayout")}
    >
      <Text style={{ color: COLORS.white, fontWeight: "600", fontSize: 15 }}>
        Hr Dashboard
      </Text>
    </TouchableOpacity>
 
        {/* Register */}
        <TouchableOpacity
      style={{
        backgroundColor: COLORS.button, // theme button color (#FFC20E)
        paddingHorizontal: 22,
        paddingVertical: 10,
        borderRadius: 12,
        minWidth: 120,
        alignItems: "center",
      }}
      onPress={() => navigation.navigate("Login")}
    >
      <Text style={{ color: COLORS.white, fontWeight: "bold", fontSize: 16 }}>
        Register
      </Text>
    </TouchableOpacity>
      </View>
    </View>
  );
};
 
export default Header;