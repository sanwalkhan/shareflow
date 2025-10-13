import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { COLORS } from "../constants/theme";

export default function Button({ children, onPress, className }: any) {
  return (
    <TouchableOpacity
      style={{
                    backgroundColor: COLORS.accent,
                    paddingHorizontal: 18,
                    paddingVertical: 10,
                    borderRadius: 12,
                  }}
    onPress={onPress} className={`px-4 py-2 rounded-lg ${className ?? "bg-green-500"}`}>
      <Text className="text-white text-sm font-semibold">{children}</Text>
    </TouchableOpacity>
  );
}
