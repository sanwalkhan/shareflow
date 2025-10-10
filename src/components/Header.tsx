// src/components/Header.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Header() {
  const navigation = useNavigation();

  const handleRegisterPress = () => {
    navigation.navigate("Auth" as never);
  };

  return (
    <View className="h-22 relative bg-transparent w-full max-w-[1500px] self-center overflow-hidden">
      {/* Header Background */}
      <View className="absolute top-0 left-0 right-0 bottom-0 bg-gray-900 border-b border-white/8 shadow-lg shadow-black/25" />

      <View className="flex-1 flex-row items-center justify-between px-6 pt-5">
        {/* Left Section */}
        <View className="flex-row items-center">
          <View className="flex-row items-center py-2 px-3 rounded-xl bg-white/2 border border-white/5">
            <Feather name="trending-up" size={24} color="#86C232" />
            <Text className="text-white text-xl font-extrabold ml-2.5 tracking-tight text-shadow shadow-white/10">
              Share<Text className="text-green-500 text-shadow shadow-green-500/30">Flow</Text>
            </Text>
          </View>
        </View>

        {/* Right Section */}
        <View className="flex-row items-center">
          {Dimensions.get("window").width >= 768 && (
            <>
              <TouchableOpacity className="mx-3 py-2 relative">
                <Text className="text-white/85 text-base font-semibold tracking-tight">Features</Text>
                <View className="absolute bottom-1 left-0 right-0 h-0.5 bg-green-500 opacity-0 scale-x-80" />
              </TouchableOpacity>
              <TouchableOpacity className="mx-3 py-2 relative">
                <Text className="text-white/85 text-base font-semibold tracking-tight">Pricing</Text>
                <View className="absolute bottom-1 left-0 right-0 h-0.5 bg-green-500 opacity-0 scale-x-80" />
              </TouchableOpacity>
              <TouchableOpacity className="mx-3 py-2 relative">
                <Text className="text-white/85 text-base font-semibold tracking-tight">About</Text>
                <View className="absolute bottom-1 left-0 right-0 h-0.5 bg-green-500 opacity-0 scale-x-80" />
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity 
            className="flex-row items-center px-5 py-3 rounded-2xl ml-3 relative overflow-hidden shadow-lg shadow-green-500/30"
            onPress={handleRegisterPress}
          >
            {/* CTA Background */}
            <View className="absolute top-0 left-0 right-0 bottom-0 bg-green-500 opacity-95" />
            
            <Text className="text-black font-bold text-base tracking-tight mr-1.5">
              Register as Company
            </Text>
            <Feather
              name="arrow-right"
              size={16}
              color="#000"
              className="opacity-90"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}