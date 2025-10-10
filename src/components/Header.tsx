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
import { COLORS, isMobile } from "../constants/theme";

export default function Header() {
  const navigation = useNavigation();

  const handleRegisterPress = () => {
    navigation.navigate("Auth" as never);
  };

  return (
    <View className="h-22 relative bg-transparent w-full overflow-hidden pb-4">
      {/* Header Background */}
      <View 
        className="absolute top-0 left-0 right-0 bottom-0 border-b shadow-lg"
        style={{ 
          backgroundColor: COLORS.secondary,
          borderColor: 'rgba(255,255,255,0.08)',
          shadowColor: COLORS.black,
        }}
      />

      <View className="flex-1 flex-row items-center justify-between px-6 pt-5 max-w-[1500px] self-center w-full">
        {/* Left Section */}
        <View className="flex-row items-center">
          <View 
            className="flex-row items-center py-2 px-3 rounded-xl border"
            style={{
              backgroundColor: 'rgba(255,255,255,0.02)',
              borderColor: 'rgba(255,255,255,0.05)',
            }}
          >
            <Feather name="trending-up" size={24} color={COLORS.accent} />
            <Text 
              className="text-white text-xl font-extrabold ml-2.5 tracking-tight"
              style={{
                textShadowColor: 'rgba(255,255,255,0.1)',
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 2,
              }}
            >
              Share<Text style={{ color: COLORS.accent }}>Flow</Text>
            </Text>
          </View>
        </View>

        {/* Right Section */}
        <View className="flex-row items-center">
          {!isMobile && (
            <>
              <TouchableOpacity className="mx-3 py-2 relative">
                <Text 
                  className="text-base font-semibold tracking-tight"
                  style={{ color: 'rgba(255,255,255,0.85)' }}
                >
                  Features
                </Text>
                <View 
                  className="absolute bottom-1 left-0 right-0 h-0.5 opacity-0 scale-x-80"
                  style={{ backgroundColor: COLORS.accent }}
                />
              </TouchableOpacity>
              <TouchableOpacity className="mx-3 py-2 relative">
                <Text 
                  className="text-base font-semibold tracking-tight"
                  style={{ color: 'rgba(255,255,255,0.85)' }}
                >
                  Pricing
                </Text>
                <View 
                  className="absolute bottom-1 left-0 right-0 h-0.5 opacity-0 scale-x-80"
                  style={{ backgroundColor: COLORS.accent }}
                />
              </TouchableOpacity>
              <TouchableOpacity className="mx-3 py-2 relative">
                <Text 
                  className="text-base font-semibold tracking-tight"
                  style={{ color: 'rgba(255,255,255,0.85)' }}
                >
                  About
                </Text>
                <View 
                  className="absolute bottom-1 left-0 right-0 h-0.5 opacity-0 scale-x-80"
                  style={{ backgroundColor: COLORS.accent }}
                />
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity 
            className="flex-row items-center px-5 py-3 rounded-2xl ml-3 relative overflow-hidden shadow-lg"
            onPress={handleRegisterPress}
            style={{
              shadowColor: COLORS.accent,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            {/* CTA Background */}
            <View 
              className="absolute top-0 left-0 right-0 bottom-0 opacity-95"
              style={{ backgroundColor: COLORS.accent }}
            />
            
            <Text className="text-black font-bold text-base tracking-tight mr-1.5">
              Register as Company
            </Text>
            <Feather
              name="arrow-right"
              size={16}
              color="#000"
              style={{ opacity: 0.9 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}