// src/components/Header.tsx
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

const Header: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 18,   // taller header
        backgroundColor: "#E6F0FF", // accent color
        height: 80,
      }}
    >
      {/* Logo */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={require('../../assets/image.png')}
          style={{ width: 32, height: 32, marginRight: 10 }}
          resizeMode="contain"
        />
        <Text style={{ fontSize: 22, fontWeight: "bold", color: "#FFC20E" }}>
          ShareFlow
        </Text>
      </View>

      {/* Register Button */}
      <TouchableOpacity
        style={{
          backgroundColor: "#FFC20E",  // button bg
          paddingHorizontal: 24,
          paddingVertical: 10,
          borderRadius: 12,
          minWidth: 120,
          alignItems: "center",
        }}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
          Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
