import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../../constants/theme";
import { Expense } from "./types";

interface ExpenseItemProps {
  item: Expense;
  onPress: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

export default function ExpenseItem({ item, onPress, onDelete }: ExpenseItemProps) {
  return (
    <TouchableOpacity
      className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-200"
      onPress={() => onPress(item)}
    >
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1">
          <Text className="font-semibold text-gray-800 text-base mb-1">{item.title}</Text>
          <Text className="text-gray-600 text-sm">{item.category}</Text>
        </View>
        <View className="items-end">
          <Text className="font-bold text-lg text-gray-800">
            ${item.amount.toLocaleString()}
          </Text>
          <View
            className={`px-2 py-1 rounded-full mt-1 ${
              item.type === "routine" ? "bg-accent/20" : "bg-secondary/20"
            }`}
          >
            <Text
              className={`text-xs font-medium ${
                item.type === "routine" ? "text-accent" : "text-secondary"
              }`}
            >
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </Text>
          </View>
        </View>
      </View>

      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Feather name="calendar" size={14} color={COLORS.gray} />
          <Text className="text-gray-500 text-xs ml-1">
            {item.date.toLocaleDateString()}
          </Text>
        </View>
        <View className="flex-row items-center">
          <Feather name="users" size={14} color={COLORS.gray} />
          <Text className="text-gray-500 text-xs ml-1">
            {item.shareholders.length} shareholders
          </Text>
        </View>
        <TouchableOpacity onPress={() => onDelete(item.id)} className="p-1">
          <Feather name="trash-2" size={16} color={COLORS.error} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
