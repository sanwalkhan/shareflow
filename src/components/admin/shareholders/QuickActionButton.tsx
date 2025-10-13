// src/components/admin/shareholders/QuickActionButton.tsx
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { QuickActionButtonProps } from "./types";

export default function QuickActionButton({
  icon,
  label,
  color,
  onPress,
}: QuickActionButtonProps) {
  return (
    <TouchableOpacity
      className={`flex-1 mx-1 p-4 rounded-2xl ${color} items-center justify-center`}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Ionicons name={icon as any} size={20} color="white" />
      <Text className="text-white text-xs font-medium mt-1 text-center">
        {label}
      </Text>
    </TouchableOpacity>
  );
}
