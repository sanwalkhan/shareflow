// src/components/TransactionItem.tsx
import React from "react";
import { View, Text } from "react-native";

interface TransactionItemProps {
  title: string;
  amount: string;
  status: "Completed" | "Pending";
}

export default function TransactionItem({ title, amount, status }: TransactionItemProps) {
  const statusColor = status === "Completed" ? "text-green-500" : "text-yellow-500";

  return (
    <View className="flex-row justify-between px-4 py-3 border-b border-gray-200 last:border-b-0">
      <View>
        <Text className="text-gray-900 font-medium">{title}</Text>
        <Text className={`text-sm font-semibold ${statusColor}`}>{status}</Text>
      </View>
      <Text className="text-gray-900 font-bold">{amount}</Text>
    </View>
  );
}
