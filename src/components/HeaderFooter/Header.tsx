// src/components/Header.tsx
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

const Header: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View className="flex-row justify-between items-center px-5 py-4 bg-gray-300">
      {/* Logo */}
      <View className="flex-row items-center">
        <Image
          source={require('../../assets/image.png')}
          className="w-7 h-7 mr-2"
        />
        <Text className="text-2xl font-bold text-black">
          <Text className="text-black">Share</Text>
          <Text className="text-green-700">Flow</Text>
        </Text>
      </View>

      {/* Navigation */}
      <View className="flex-row justify-around flex-1 mx-8">
        <Text className="text-lg font-bold text-green-800">Home</Text>
        <Text className="text-lg font-bold text-green-800">About Us</Text>
        <Text className="text-lg font-bold text-green-800">Pricing</Text>
      </View>

      {/* Register Button */}
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <LinearGradient
          colors={["#2A2F50", "#28A745"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="px-5 py-2 rounded-lg"
        >
          <Text className="text-white font-semibold text-base">Register</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
