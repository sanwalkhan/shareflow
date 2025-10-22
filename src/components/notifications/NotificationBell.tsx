import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

interface Props {
  count: number;
  onPress: () => void;
}

export default function NotificationBell({ count, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} className="relative mr-4">
      <Feather name="bell" size={22} color="#374151" />
      {count > 0 && (
        <View className="absolute -top-1.5 -right-1.5 bg-red-500 rounded-full w-4 h-4 justify-center items-center">
          <Text className="text-white text-[10px] font-bold">{count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
