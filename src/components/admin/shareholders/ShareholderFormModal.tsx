// src/components/admin/shareholders/ShareholderFormModal.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ShareholderFormModalProps, ShareholderFormData } from "./types";
import { COLORS } from "../../../constants/theme";

export default function ShareholderFormModal({
  visible,
  mode,
  shareholder,
  onSave,
  onClose,
}: ShareholderFormModalProps) {
  const [formData, setFormData] = useState<ShareholderFormData>({
    name: "",
    email: "",
    equity: "",
    investment: "",
    profit: "",
    returns: "",
    otherMoney: "",
    joinDate: new Date().toISOString().split("T")[0],
  });

  // Prefill when editing
  useEffect(() => {
    if (shareholder) {
      setFormData({
        name: shareholder.name,
        email: shareholder.email,
        equity: shareholder.equity.toString(),
        investment: shareholder.investment.toString(),
        profit: shareholder.profit?.toString() || "0",
        returns: shareholder.returns?.toString() || "0",
        otherMoney: shareholder.otherMoney?.toString() || "0",
        joinDate: shareholder.joinDate,
      });
    }
  }, [shareholder]);

  const handleSave = () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    if (
      parseFloat(formData.equity as string) < 0 ||
      parseFloat(formData.investment as string) < 0 ||
      parseFloat(formData.profit as string) < 0 ||
      parseFloat(formData.returns as string) < 0 ||
      parseFloat(formData.otherMoney as string) < 0
    ) {
      Alert.alert("Error", "Values cannot be negative.");
      return;
    }

    onSave(formData);

    // Reset form
    setFormData({
      name: "",
      email: "",
      equity: "",
      investment: "",
      profit: "",
      returns: "",
      otherMoney: "",
      joinDate: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center p-6" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <View className="bg-white rounded-3xl p-6 w-full max-w-md">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-bold text-gray-900">
              {mode === "add" ? "Add Shareholder" : "Edit Shareholder"}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={COLORS.tertiary} />
            </TouchableOpacity>
          </View>

          {/* Form */}
          <ScrollView className="max-h-96">
            <View className="space-y-4">
              {/* Name */}
              <View>
                <Text className="text-gray-700 font-medium mb-2">Full Name *</Text>
                <TextInput
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900"
                  value={formData.name}
                  onChangeText={(t) => setFormData({ ...formData, name: t })}
                  placeholder="Enter full name"
                />
              </View>

              {/* Email */}
              <View>
                <Text className="text-gray-700 font-medium mb-2">Email *</Text>
                <TextInput
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900"
                  value={formData.email}
                  onChangeText={(t) => setFormData({ ...formData, email: t })}
                  placeholder="Enter email address"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Equity + Investment */}
              <View className="flex-row space-x-4">
                <View className="flex-1">
                  <Text className="text-gray-700 font-medium mb-2">Equity %</Text>
                  <TextInput
                    className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900"
                    value={formData.equity.toString()}
                    onChangeText={(t) => setFormData({ ...formData, equity: t })}
                    placeholder="0.0"
                    keyboardType="decimal-pad"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-700 font-medium mb-2">Investment $</Text>
                  <TextInput
                    className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900"
                    value={formData.investment.toString()}
                    onChangeText={(t) => setFormData({ ...formData, investment: t })}
                    placeholder="0"
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>

              {/* Profit, Returns, Other Contributions */}
              <View className="flex-row space-x-4">
                <View className="flex-1">
                  <Text className="text-gray-700 font-medium mb-2">Profit $</Text>
                  <TextInput
                    className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900"
                    value={formData.profit.toString()}
                    onChangeText={(t) => setFormData({ ...formData, profit: t })}
                    placeholder="0"
                    keyboardType="decimal-pad"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-700 font-medium mb-2">Returns $</Text>
                  <TextInput
                    className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900"
                    value={formData.returns.toString()}
                    onChangeText={(t) => setFormData({ ...formData, returns: t })}
                    placeholder="0"
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>

              <View>
                <Text className="text-gray-700 font-medium mb-2">Other Contributions $</Text>
                <TextInput
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900"
                  value={formData.otherMoney.toString()}
                  onChangeText={(t) => setFormData({ ...formData, otherMoney: t })}
                  placeholder="0"
                  keyboardType="decimal-pad"
                />
              </View>

              {/* Join Date */}
              <View>
                <Text className="text-gray-700 font-medium mb-2">Join Date</Text>
                <TextInput
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900"
                  value={formData.joinDate}
                  onChangeText={(t) => setFormData({ ...formData, joinDate: t })}
                  placeholder="YYYY-MM-DD"
                />
              </View>
            </View>
          </ScrollView>

          {/* Footer Buttons */}
          <View className="flex-row justify-end space-x-3 mt-6">
            <TouchableOpacity
              className="px-6 py-3 border border-gray-300 rounded-xl"
              onPress={onClose}
            >
              <Text className="text-gray-700 font-medium">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="px-6 py-3 bg-accent rounded-xl"
              onPress={handleSave}
            >
              <Text className="text-white font-medium">
                {mode === "add" ? "Add Shareholder" : "Save Changes"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
