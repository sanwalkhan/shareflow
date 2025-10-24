import React, { useMemo, useState } from "react";
import { View, Text, Modal, TextInput, TouchableOpacity, ScrollView, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../../constants/theme";

interface SetBudgetModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (categories: Record<string, number>, validFrom: Date, validTo: Date) => void;
  initialCategories?: Record<string, number>;
  initialValidFrom?: Date;
  initialValidTo?: Date;
}

export default function SetBudgetModal({ 
  visible, 
  onClose, 
  onSubmit, 
  initialCategories,
  initialValidFrom,
  initialValidTo
}: SetBudgetModalProps) {
  const [categories, setCategories] = useState<Record<string, string>>({})
  const [newName, setNewName] = useState("")
  const [newAmount, setNewAmount] = useState("")
  const [validFrom, setValidFrom] = useState("")
  const [validTo, setValidTo] = useState("")
  
  React.useEffect(() => {
    if (visible) {
      const init = initialCategories || { 
        Operations: 0, 
        Marketing: 0, 
        "R&D": 0, 
        Administrative: 0, 
        Travel: 0, 
        Miscellaneous: 0 
      }
      const strMap: Record<string, string> = {}
      Object.entries(init).forEach(([k, v]) => { strMap[k] = String(v || 0) })
      setCategories(strMap)
      
      // Set default dates to current month
      const now = new Date()
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0)
      
      setValidFrom(initialValidFrom 
        ? initialValidFrom.toISOString().split('T')[0] 
        : firstDay.toISOString().split('T')[0])
      setValidTo(initialValidTo 
        ? initialValidTo.toISOString().split('T')[0] 
        : lastDay.toISOString().split('T')[0])
    }
  }, [visible, initialCategories, initialValidFrom, initialValidTo])
  
  const totalAlloc = useMemo(() => 
    Object.values(categories).reduce((s, v) => s + (parseFloat(v || "0") || 0), 0), 
    [categories]
  )

  const addCategory = () => {
    const name = newName.trim()
    const amount = parseFloat(newAmount || "0") || 0
    if (!name) return
    if (categories[name] !== undefined) return
    setCategories((prev) => ({ ...prev, [name]: String(amount) }))
    setNewName("")
    setNewAmount("")
  }

  const removeCategory = (name: string) => {
    const copy = { ...categories }
    delete copy[name]
    setCategories(copy)
  }

  const handleSubmit = () => {
    if (!validFrom || !validTo) {
      alert("Please select valid from and to dates")
      return
    }
    
    const fromDate = new Date(validFrom)
    const toDate = new Date(validTo)
    
    if (toDate < fromDate) {
      alert("'Valid To' date must be after 'Valid From' date")
      return
    }
    
    const categoriesData = Object.fromEntries(
      Object.entries(categories).map(([k,v]) => [k, parseFloat(v || "0") || 0])
    )
    
    onSubmit(categoriesData, fromDate, toDate)
  }

  if (Platform.OS === "web") {
    if (!visible) return null
    return (
      <View style={{ position: "fixed", inset: 0 as any, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 99999 }} className="justify-center items-center p-6">
        <View className="bg-white rounded-3xl p-6 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
          <Text className="text-xl font-bold text-gray-900 mb-4">Set Category Budgets</Text>
          
          <ScrollView className="flex-1" showsVerticalScrollIndicator>
            {/* Date Range */}
            <View className="mb-6 bg-blue-50 p-4 rounded-xl">
              <Text className="text-gray-800 font-semibold mb-3">Budget Valid Period</Text>
              <View className="flex-row gap-3">
                <View className="flex-1">
                  <Text className="text-gray-600 text-sm mb-1">Valid From *</Text>
                  <TextInput
                    className="bg-white border border-gray-300 rounded-xl px-4 py-2 text-gray-900"
                    value={validFrom}
                    onChangeText={setValidFrom}
                    placeholder="YYYY-MM-DD"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-600 text-sm mb-1">Valid To *</Text>
                  <TextInput
                    className="bg-white border border-gray-300 rounded-xl px-4 py-2 text-gray-900"
                    value={validTo}
                    onChangeText={setValidTo}
                    placeholder="YYYY-MM-DD"
                  />
                </View>
              </View>
              <Text className="text-gray-500 text-xs mt-2">
                <Feather name="info" size={12} /> Budget will only accept expenses within this date range
              </Text>
            </View>

            {/* Category Allocations */}
            <Text className="text-gray-800 font-semibold mb-2">Category Allocations</Text>
            <Text className="text-gray-500 text-sm mb-3">
              Set budget limits for each category. Expenses will be validated against these limits.
            </Text>
            
            {Object.keys(categories).map((name) => (
              <View key={name} style={{ marginBottom: 12 }}>
                <View className="flex-row items-center justify-between mb-1">
                  <Text className="text-gray-700 font-medium">{name}</Text>
                  <TouchableOpacity onPress={() => removeCategory(name)} className="p-1">
                    <Feather name="trash-2" size={16} color="#ef4444" />
                  </TouchableOpacity>
                </View>
                <View className="flex-row items-center">
                  <Text className="text-gray-500 mr-2">$</Text>
                  <TextInput
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-gray-900"
                    keyboardType="decimal-pad"
                    placeholder="0.00"
                    value={categories[name]}
                    onChangeText={(v) => setCategories((prev) => ({ ...prev, [name]: v }))}
                  />
                </View>
              </View>
            ))}
            
            {/* Add New Category */}
            <View className="mt-4 p-4 bg-gray-50 rounded-xl">
              <Text className="text-gray-800 font-semibold mb-2">Add New Category</Text>
              <View className="flex-row items-center gap-2">
                <View style={{ flex: 1 }}>
                  <TextInput
                    className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-gray-900"
                    placeholder="Category name"
                    value={newName}
                    onChangeText={setNewName}
                  />
                </View>
                <View style={{ width: 120 }}>
                  <TextInput
                    className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-gray-900"
                    placeholder="Amount"
                    keyboardType="decimal-pad"
                    value={newAmount}
                    onChangeText={setNewAmount}
                  />
                </View>
                <TouchableOpacity 
                  onPress={addCategory} 
                  className="px-3 py-2 rounded-xl" 
                  style={{ backgroundColor: COLORS.accent }}
                >
                  <Feather name="plus" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Total Summary */}
            <View className="mt-4 p-4 bg-green-50 rounded-xl">
              <View className="flex-row justify-between items-center">
                <Text className="text-gray-700 font-medium">Total Monthly Budget</Text>
                <Text className="text-2xl font-bold text-green-600">
                  ${totalAlloc.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Text>
              </View>
              <Text className="text-gray-500 text-xs mt-1">
                Sum of all category allocations
              </Text>
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View className="flex-row justify-end gap-3 mt-4 pt-4 border-t border-gray-200">
            <TouchableOpacity 
              className="px-5 py-3 border border-gray-300 rounded-xl" 
              onPress={onClose}
            >
              <Text className="text-gray-700 font-medium">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="px-5 py-3 rounded-xl flex-row items-center" 
              style={{ backgroundColor: COLORS.accent }} 
              onPress={handleSubmit}
            >
              <Feather name="check" size={18} color="white" />
              <Text className="text-white font-semibold ml-2">Save Budget</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  // Mobile version
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 justify-end" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <View className="bg-white rounded-t-3xl p-6 max-h-[90vh]">
          <Text className="text-xl font-bold text-gray-900 mb-4">Set Category Budgets</Text>
          
          <ScrollView className="flex-1" showsVerticalScrollIndicator>
            {/* Date Range */}
            <View className="mb-6 bg-blue-50 p-4 rounded-xl">
              <Text className="text-gray-800 font-semibold mb-3">Budget Valid Period</Text>
              <View className="gap-3">
                <View>
                  <Text className="text-gray-600 text-sm mb-1">Valid From *</Text>
                  <TextInput
                    className="bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900"
                    value={validFrom}
                    onChangeText={setValidFrom}
                    placeholder="YYYY-MM-DD"
                  />
                </View>
                <View>
                  <Text className="text-gray-600 text-sm mb-1">Valid To *</Text>
                  <TextInput
                    className="bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900"
                    value={validTo}
                    onChangeText={setValidTo}
                    placeholder="YYYY-MM-DD"
                  />
                </View>
              </View>
            </View>

            {/* Categories */}
            <Text className="text-gray-800 font-semibold mb-2">Category Allocations</Text>
            {Object.keys(categories).map((name) => (
              <View key={name} className="mb-3">
                <View className="flex-row items-center justify-between mb-1">
                  <Text className="text-gray-700">{name}</Text>
                  <TouchableOpacity onPress={() => removeCategory(name)}>
                    <Feather name="trash-2" size={16} color="#ef4444" />
                  </TouchableOpacity>
                </View>
                <TextInput
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900"
                  keyboardType="decimal-pad"
                  placeholder="0.00"
                  value={categories[name]}
                  onChangeText={(v) => setCategories((prev) => ({ ...prev, [name]: v }))}
                />
              </View>
            ))}
            
            <View className="mt-3 mb-6 p-3 bg-green-50 rounded-xl">
              <Text className="text-gray-600 text-sm">Total: ${totalAlloc.toLocaleString()}</Text>
            </View>
          </ScrollView>

          <View className="flex-row gap-3 mt-4">
            <TouchableOpacity className="flex-1 px-4 py-3 border border-gray-300 rounded-xl" onPress={onClose}>
              <Text className="text-gray-700 font-medium text-center">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 px-4 py-3 rounded-xl" style={{ backgroundColor: COLORS.accent }} onPress={handleSubmit}>
              <Text className="text-white font-semibold text-center">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )}