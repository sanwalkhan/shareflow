import React from "react";
import { TouchableOpacity, Text, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { QuickActionButtonProps } from "./types";
import { COLORS } from "../../../constants/theme";

export default function QuickActionButton({
  icon,
  label,
  onPress,
}: QuickActionButtonProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
      }}
    >
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className={`rounded-2xl ${isMobile ? 'p-4' : 'p-5'} items-center justify-center`}
      >
        <Ionicons name={icon as any} size={isMobile ? 20 : 24} color={COLORS.white} />
        <Text className="text-white text-sm font-semibold mt-2 text-center">
          {label}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}