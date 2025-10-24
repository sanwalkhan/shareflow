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
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    equity: "0",
    investment: "0",
    profit: "0",
    returns: "0",
    otherMoney: "0",
    joinDate: new Date().toISOString().split("T")[0],
    password: "",
  });

  // Prefill when editing existing shareholder
  useEffect(() => {
    if (shareholder && mode === "edit") {
      setFormData({
        firstName: shareholder.firstName || "",
        lastName: shareholder.lastName || "",
        email: shareholder.email || "",
        phone: shareholder.phone || "",
        address: shareholder.address || "",
        equity: shareholder.equity?.toString() || "0",
        investment: shareholder.investment?.toString() || "0",
        profit: shareholder.profit?.toString() || "0",
        returns: shareholder.returns?.toString() || "0",
        otherMoney: shareholder.otherMoney?.toString() || "0",
        joinDate: shareholder.joinDate || new Date().toISOString().split("T")[0],
        password: "",
      });
    } else if (mode === "add") {
      // Reset form for add mode
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        equity: "0",
        investment: "0",
        profit: "0",
        returns: "0",
        otherMoney: "0",
        joinDate: new Date().toISOString().split("T")[0],
        password: "",
      });
    }
  }, [shareholder, mode, visible]);

  const handleSave = () => {
    // Validation
    if (!formData.firstName.trim()) {
      Alert.alert("Error", "First name is required");
      return;
    }

    if (!formData.lastName.trim()) {
      Alert.alert("Error", "Last name is required");
      return;
    }

    if (!formData.email.trim()) {
      Alert.alert("Error", "Email is required");
      return;
    }

    // Email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    // Password validation for add mode
    if (mode === "add" && !formData.password.trim()) {
      Alert.alert("Error", "Password is required for new shareholders");
      return;
    }

    if (mode === "add" && formData.password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    // Validate numeric fields
    const numericFields = ["investment", "profit", "returns", "otherMoney"] as const;
    for (const key of numericFields) {
      const val = parseFloat(formData[key] as string);
      if (isNaN(val) || val < 0) {
        Alert.alert("Error", `Invalid value for ${key}. Must be a non-negative number.`);
        return;
      }
    }

    // Send data upward
    onSave(formData);
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View
        className="flex-1 justify-center items-center p-6"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
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
              {/* First Name */}
              <View>
                <Text className="text-gray-700 font-medium mb-2">First Name *</Text>
                <TextInput
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900"
                  value={formData.firstName}
                  onChangeText={(t) => setFormData({ ...formData, firstName: t })}
                  placeholder="Enter first name"
                />
              </View>

              {/* Last Name */}
              <View>
                <Text className="text-gray-700 font-medium mb-2">Last Name *</Text>
                <TextInput
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900"
                  value={formData.lastName}
                  onChangeText={(t) => setFormData({ ...formData, lastName: t })}
                  placeholder="Enter last name"
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
                  editable={mode === "add"}
                />
              </View>

              {/* Phone */}
              <View>
                <Text className="text-gray-700 font-medium mb-2">Phone</Text>
                <TextInput
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900"
                  value={formData.phone}
                  onChangeText={(t) => setFormData({ ...formData, phone: t })}
                  placeholder="Enter phone number"
                  keyboardType="phone-pad"
                />
              </View>

              {/* Address */}
              <View>
                <Text className="text-gray-700 font-medium mb-2">Address</Text>
                <TextInput
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900"
                  value={formData.address}
                  onChangeText={(t) => setFormData({ ...formData, address: t })}
                  placeholder="Enter address"
                />
              </View>

              {/* Password (for shareholder login) - Only for Add */}
              {mode === "add" && (
                <View>
                  <Text className="text-gray-700 font-medium mb-2">Password *</Text>
                  <TextInput
                    className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900"
                    value={formData.password}
                    onChangeText={(t) => setFormData({ ...formData, password: t })}
                    placeholder="Set initial password (min 6 characters)"
                    secureTextEntry
                    autoCapitalize="none"
                  />
                </View>
              )}

              {/* Investment */}
              <View>
                <Text className="text-gray-700 font-medium mb-2">Investment Amount</Text>
                <TextInput
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900"
                  value={formData.investment.toString()}
                  onChangeText={(t) => setFormData({ ...formData, investment: t })}
                  placeholder="0"
                  keyboardType="decimal-pad"
                />
                <Text className="text-xs text-gray-500 mt-1">
                  Equity will be calculated automatically based on total investments
                </Text>
              </View>

              {/* Profit, Returns, Other Contributions */}
              <View className="flex-row space-x-4">
                <View className="flex-1">
                  <Text className="text-gray-700 font-medium mb-2">Profit</Text>
                  <TextInput
                    className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900"
                    value={formData.profit.toString()}
                    onChangeText={(t) => setFormData({ ...formData, profit: t })}
                    placeholder="0"
                    keyboardType="decimal-pad"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-700 font-medium mb-2">Returns</Text>
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
                <Text className="text-gray-700 font-medium mb-2">Other Contributions</Text>
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
              className="px-6 py-3 rounded-xl"
              style={{ backgroundColor: COLORS.accent }}
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