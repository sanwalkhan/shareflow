import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../../constants/theme";
import { Expense } from "./types";
import { updateExpense } from "../../../../utils/api";
import ProgressBar from "../../feedback/ProgressBar";
import { useStatus } from "../../feedback/StatusProvider";

interface ExpenseDetailModalProps {
  expense: Expense | null;
  onClose: () => void;
  onUpdated?: (updated: Expense) => void;
}

export default function ExpenseDetailModal({
  expense,
  onClose,
  onUpdated,
}: ExpenseDetailModalProps) {
  if (!expense) return null;

  const [title, setTitle] = useState(expense.title)
  const [amount, setAmount] = useState(String(expense.amount))
  const [category, setCategory] = useState(expense.category)
  const [saving, setSaving] = useState(false)
  const { showLoader, hideLoader, showStatus } = useStatus()

  const handleSave = async () => {
    const newAmount = parseFloat(amount)
    if (!title || isNaN(newAmount) || newAmount <= 0) {
      Alert.alert("Invalid", "Please enter valid title and amount")
      return
    }
    try {
      setSaving(true)
      showLoader("Saving changes...")
      const res = await updateExpense(String((expense as any).id || (expense as any)._id), { title, amount: newAmount, category, _originalAmount: expense.amount })
      const e = res.data
      const mapped: Expense = {
        id: e._id,
        title: e.title,
        amount: e.amount,
        type: e.type,
        category: e.category,
        date: new Date(e.date || e.createdAt),
        description: e.description || "",
        receipt: e.receipt || null,
        status: e.status,
        createdBy: e.createdBy,
        createdAt: new Date(e.createdAt),
        shareholders: (e.allocations || []).map((a: any) => ({
          id: a.shareholder || a.email,
          name: a.name,
          email: a.email,
          sharePercentage: a.sharePercentage || 0,
          allocatedAmount: a.allocatedAmount || 0,
        })),
        taxDeductible: !!e.taxDeductible,
        recurring: !!e.recurring,
        recurrence: e.recurrence,
        budgetCategory: e.budgetCategory || "",
      }
      onUpdated && onUpdated(mapped)
      onClose()
      hideLoader()
      showStatus("success", "Expense updated")
    } catch (err: any) {
      hideLoader()
      showStatus("error", err?.message || "Could not update expense")
    } finally {
      setSaving(false)
    }
  }

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

          {/* Expense Summary (editable) */}
          <View className="bg-gray-50 rounded-xl p-4 mb-6">
            <TextInput
              className="text-xl font-bold text-gray-800 mb-2"
              value={title}
              onChangeText={setTitle}
              placeholder="Title"
            />
            <TextInput
              className="text-2xl font-bold text-accent mb-4"
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
              placeholder="0.00"
            />

            <View className="flex-row flex-wrap">
              <View className="w-1/2 mb-3">
                <Text className="text-gray-500 text-sm">Type</Text>
                <Text className="font-medium text-gray-800 capitalize">
                  {expense.type}
                </Text>
              </View>
              <View className="w-1/2 mb-3">
                <Text className="text-gray-500 text-sm">Category</Text>
                <TextInput className="font-medium text-gray-800" value={category} onChangeText={setCategory} />
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
        <View className="p-4 border-t border-gray-200 flex-row justify-end gap-3">
          <TouchableOpacity className="px-4 py-3 border border-gray-300 rounded-xl" onPress={onClose}>
            <Text className="text-gray-700 font-medium">Close</Text>
          </TouchableOpacity>
          <TouchableOpacity className="px-4 py-3 bg-accent rounded-xl" onPress={handleSave} disabled={saving}>
            <Text className="text-white font-semibold">{saving ? "Saving..." : "Save Changes"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
