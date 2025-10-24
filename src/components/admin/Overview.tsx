import React from "react";
import { View, Text, ScrollView } from "react-native";

export default function Overview({ data }: any) {
  return (
    <ScrollView className="flex-1" contentContainerStyle={{ padding: 24 }}>
      <View>
        <Text className="text-2xl font-extrabold text-gray-900 mb-2">Welcome back, 👋</Text>
        <Text className="text-gray-500 text-base font-medium">
          Here's what's happening with {data?.name ?? "the company"} today.
        </Text>
      </View>

      <View className="mt-6">
        <Text className="text-gray-700">(Overview quick cards & charts will appear here.)</Text>
      </View>
    </ScrollView>
  );
}
