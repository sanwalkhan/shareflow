// src/components/admin/shareholders/ShareholderCard.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ShareholderCardProps } from "./types";
import { COLORS } from "../../../constants/theme";

export default function ShareholderCard({
  shareholder,
  onEdit,
  onDelete,
}: ShareholderCardProps) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      {/* Card */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setModalVisible(true)}
        className="bg-white rounded-2xl p-4 mb-3 shadow-lg border border-gray-100"
      >
        {/* Header: Name & Equity */}
        <View className="flex-row justify-between items-start mb-3">
          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-900">
              {shareholder.name}
            </Text>
          </View>
          <View
            className="px-3 py-1 rounded-full"
            style={{ backgroundColor: COLORS.accent + "33" }}
          >
            <Text
              className="font-bold text-sm"
              style={{ color: COLORS.accent }}
            >
              {shareholder.equity}%
            </Text>
          </View>
        </View>

        {/* Financial Summary */}
        <View className="flex-row justify-between">
          <View>
            <Text className="text-gray-500 text-xs">Investment</Text>
            <Text className="text-gray-900 font-semibold">
              ${shareholder.investment.toLocaleString()}
            </Text>
          </View>
          <View>
            <Text className="text-gray-500 text-xs">Profit</Text>
            <Text
              className="font-semibold"
              style={{ color: COLORS.accent }}
            >
              ${shareholder.profit.toLocaleString()}
            </Text>
          </View>
          <View>
            <Text className="text-gray-500 text-xs">Returns</Text>
            <Text
              className="font-semibold"
              style={{ color: COLORS.secondary }}
            >
              ${shareholder.returns.toLocaleString()}
            </Text>
          </View>
          <View>
            <Text className="text-gray-500 text-xs">Other</Text>
            <Text className="text-gray-900 font-semibold">
              ${shareholder.otherMoney.toLocaleString()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Modal: Full Details */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50 p-4">
          <View className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
            <ScrollView>
              {/* Header */}
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-2xl font-bold text-gray-900">
                  {shareholder.name}
                </Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={24} color={COLORS.secondary} />
                </TouchableOpacity>
              </View>

              {/* Details */}
              <View className="space-y-3">
                <Text className="text-gray-500 text-xs">Email</Text>
                <Text className="text-gray-900 font-semibold">{shareholder.email}</Text>

                <Text className="text-gray-500 text-xs">Equity</Text>
                <Text className="text-gray-900 font-semibold">{shareholder.equity}%</Text>

                <Text className="text-gray-500 text-xs">Investment</Text>
                <Text className="text-gray-900 font-semibold">
                  ${shareholder.investment.toLocaleString()}
                </Text>

                <Text className="text-gray-500 text-xs">Profit</Text>
                <Text className="text-green-600 font-semibold">
                  ${shareholder.profit.toLocaleString()}
                </Text>

                <Text className="text-gray-500 text-xs">Returns</Text>
                <Text className="text-blue-600 font-semibold">
                  ${shareholder.returns.toLocaleString()}
                </Text>

                <Text className="text-gray-500 text-xs">Other Contributions</Text>
                <Text className="text-gray-900 font-semibold">
                  ${shareholder.otherMoney.toLocaleString()}
                </Text>

                <Text className="text-gray-500 text-xs">Joined</Text>
                <Text className="text-gray-900 font-semibold">
                  {new Date(shareholder.joinDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </Text>
              </View>

              {/* Action Buttons */}
              <View className="flex-row justify-between space-x-2 mt-6">
                <TouchableOpacity
                  className="flex-row items-center flex-1 px-4 py-2 bg-gray-100 rounded-lg justify-center"
                  onPress={() => {
                    setModalVisible(false);
                    onEdit(shareholder);
                  }}
                >
                  <Ionicons name="pencil" size={16} color="#6B7280" />
                  <Text className="text-gray-600 ml-2 font-medium">Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-row items-center flex-1 px-4 py-2 bg-red-50 rounded-lg justify-center"
                  onPress={() => {
                    setModalVisible(false);
                    onDelete(shareholder);
                  }}
                >
                  <Ionicons name="trash" size={16} color="#DC2626" />
                  <Text className="text-red-600 ml-2 font-medium">Remove</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}
