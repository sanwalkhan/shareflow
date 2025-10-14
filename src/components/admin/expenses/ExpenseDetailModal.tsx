import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../../constants/theme";
import { Expense } from "./types";

interface ExpenseDetailModalProps {
  expense: Expense | null;
  onClose: () => void;
}

export default function ExpenseDetailModal({
  expense,
  onClose,
}: ExpenseDetailModalProps) {
  if (!expense) return null;

  return (
    <Modal visible={!!expense} animationType="slide" transparent={false}>
      <View className="flex-1 bg-white">
        <ScrollView className="flex-1 p-6">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl font-bold text-gray-900">
              Expense Details
            </Text>
            <TouchableOpacity onPress={onClose} className="p-2">
              <Feather name="x" size={24} color={COLORS.gray} />
            </TouchableOpacity>
          </View>

          {/* Expense Summary */}
          <View className="bg-gray-50 rounded-xl p-4 mb-6">
            <Text className="text-xl font-bold text-gray-800 mb-2">
              {expense.title}
            </Text>
            <Text className="text-2xl font-bold text-accent mb-4">
              ${expense.amount.toLocaleString()}
            </Text>

            <View className="flex-row flex-wrap">
              <View className="w-1/2 mb-3">
                <Text className="text-gray-500 text-sm">Type</Text>
                <Text className="font-medium text-gray-800 capitalize">
                  {expense.type}
                </Text>
              </View>
              <View className="w-1/2 mb-3">
                <Text className="text-gray-500 text-sm">Category</Text>
                <Text className="font-medium text-gray-800">
                  {expense.category}
                </Text>
              </View>
              <View className="w-1/2 mb-3">
                <Text className="text-gray-500 text-sm">Date</Text>
                <Text className="font-medium text-gray-800">
                  {expense.date.toLocaleDateString()}
                </Text>
              </View>
              <View className="w-1/2 mb-3">
                <Text className="text-gray-500 text-sm">Tax Deductible</Text>
                <Text className="font-medium text-gray-800">
                  {expense.taxDeductible ? "Yes" : "No"}
                </Text>
              </View>
            </View>

            {expense.description ? (
              <View className="mt-2">
                <Text className="text-gray-500 text-sm">Description</Text>
                <Text className="font-medium text-gray-800 mt-1">
                  {expense.description}
                </Text>
              </View>
            ) : null}
          </View>

          {/* Shareholder Allocations */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-800 mb-4">
              Shareholder Allocations
            </Text>
            {expense.shareholders.map((sh) => (
              <View
                key={sh.id}
                className="flex-row justify-between items-center py-3 border-b border-gray-200"
              >
                <View>
                  <Text className="font-medium text-gray-800">{sh.name}</Text>
                  <Text className="text-gray-500 text-xs">
                    {sh.sharePercentage}% Share
                  </Text>
                </View>
                <Text className="font-bold text-gray-800">
                  ${sh.allocatedAmount.toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}
