import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../../constants/theme";
import { Expense } from "./types";
import ExpenseItem from "./ExpenseItem";

interface ExpenseListProps {
  expenses: Expense[];
  onPressItem: (expense: Expense) => void;
  onDeleteItem: (id: string) => void;
  onViewAll?: () => void;
}

export default function ExpenseList({
  expenses,
  onPressItem,
  onDeleteItem,
  onViewAll,
}: ExpenseListProps) {
  return (
    <View className="bg-white rounded-2xl p-6 shadow-lg">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold text-gray-800">Recent Expenses</Text>
        <TouchableOpacity className="flex-row items-center" onPress={onViewAll}>
          <Text className="text-accent font-semibold mr-2">View All</Text>
          <Feather name="chevron-right" size={16} color={COLORS.accent} />
        </TouchableOpacity>
      </View>

      {/* Empty State */}
      {expenses.length === 0 ? (
        <View className="items-center py-12">
          <Feather name="file-text" size={48} color={COLORS.gray} />
          <Text className="text-gray-500 text-lg mt-4">No expenses yet</Text>
          <Text className="text-gray-400 text-center mt-2">
            Add your first expense to start tracking and allocating costs
          </Text>
        </View>
      ) : (
        <FlatList
          data={expenses.slice(0, 5)}
          renderItem={({ item }) => (
            <ExpenseItem
              item={item}
              onPress={onPressItem}
              onDelete={onDeleteItem}
            />
          )}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      )}
    </View>
  );
}
