import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Notification } from "./types";

interface Props {
  item: Notification;
  onPress?: (id: string) => void;
}

export default function NotificationItem({ item, onPress }: Props) {
  const getIcon = () => {
    switch (item.type) {
      case "investment":
        return "trending-up";
      case "approval":
        return "check-circle";
      case "general":
      default:
        return "bell";
    }
  };

  const iconColor = {
    investment: "#3B82F6", // Blue
    approval: "#10B981",   // Green
    general: "#F59E0B",    // Amber
  }[item.type];

  return (
    <TouchableOpacity
      onPress={() => onPress && onPress(item.id)}
      activeOpacity={0.8}
      className={`flex-row items-start mb-3 p-4 rounded-xl border ${
        item.isRead ? "bg-gray-50 border-gray-200" : "bg-green-50 border-green-200"
      }`}
    >
      {/* Icon */}
      <View className="w-10 h-10 rounded-xl justify-center items-center bg-white mr-3">
        <Feather name={getIcon() as any} size={18} color={iconColor} />
      </View>

      {/* Text Content */}
      <View className="flex-1">
        <Text className="font-semibold text-gray-800 mb-0.5">{item.title}</Text>
        <Text className="text-gray-600 text-sm mb-1">{item.message}</Text>
        <Text className="text-gray-400 text-xs mt-1">{item.date}</Text>
      </View>

      {/* Read Indicator */}
      {!item.isRead && (
        <View className="w-2 h-2 rounded-full bg-green-500 mt-1.5 ml-2" />
      )}
    </TouchableOpacity>
  );
}
