import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ShareholderCardProps } from "./types";
import { COLORS } from "../../../constants/theme";

export default function ShareholderCard({
  shareholder,
  onEdit,
  onDelete,
  viewMode = "grid",
}: ShareholderCardProps & { viewMode?: "grid" | "list" }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  if (viewMode === "list") {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setModalVisible(true)}
        className="bg-white rounded-2xl border border-gray-200 p-4 mb-3 shadow-sm"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
        }}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            <View className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full items-center justify-center mr-4">
              <Text className="text-white font-bold text-lg">
                {shareholder.firstName[0]}{shareholder.lastName[0]}
              </Text>
            </View>
            
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-900">
                {shareholder.name}
              </Text>
              <Text className="text-gray-500 text-sm">
                {shareholder.email}
              </Text>
            </View>
          </View>

          <View className="items-end">
            <View className="bg-blue-50 px-3 py-1 rounded-full mb-2">
              <Text className="text-blue-600 font-bold text-sm">
                {shareholder.equity}% Equity
              </Text>
            </View>
            <Text className="text-gray-900 font-semibold">
              ${shareholder.investment.toLocaleString()}
            </Text>
          </View>
        </View>

        <View className="flex-row justify-between mt-3 pt-3 border-t border-gray-100">
          <View className="items-center">
            <Text className="text-gray-500 text-xs">Profit</Text>
            <Text className="text-green-600 font-semibold">
              ${shareholder.profit.toLocaleString()}
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-gray-500 text-xs">Returns</Text>
            <Text className="text-purple-600 font-semibold">
              ${shareholder.returns.toLocaleString()}
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-gray-500 text-xs">Joined</Text>
            <Text className="text-gray-700 font-semibold text-xs">
              {new Date(shareholder.joinDate).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  // Grid View
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setModalVisible(true)}
        className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
        }}
      >
        {/* Header with Avatar and Equity */}
        <View className="flex-row justify-between items-start mb-4">
          <View className="flex-1">
            <View className="flex-row items-center mb-2">
              <View className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full items-center justify-center mr-3">
                <Text className="text-white font-bold">
                  {shareholder.firstName[0]}{shareholder.lastName[0]}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-lg font-bold text-gray-900" numberOfLines={1}>
                  {shareholder.name}
                </Text>
                <Text className="text-gray-500 text-sm" numberOfLines={1}>
                  {shareholder.email}
                </Text>
              </View>
            </View>
          </View>
          <View className="bg-blue-50 px-3 py-1 rounded-full">
            <Text className="text-blue-600 font-bold text-sm">
              {shareholder.equity}%
            </Text>
          </View>
        </View>

        {/* Investment */}
        <View className="mb-4">
          <Text className="text-gray-500 text-xs mb-1">Total Investment</Text>
          <Text className="text-2xl font-bold text-gray-900">
            ${shareholder.investment.toLocaleString()}
          </Text>
        </View>

        {/* Financial Metrics */}
        <View className="flex-row justify-between mb-4">
          <View className="items-center">
            <Text className="text-gray-500 text-xs">Profit</Text>
            <Text className="text-green-600 font-semibold">
              ${shareholder.profit.toLocaleString()}
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-gray-500 text-xs">Returns</Text>
            <Text className="text-purple-600 font-semibold">
              ${shareholder.returns.toLocaleString()}
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-gray-500 text-xs">Other</Text>
            <Text className="text-gray-700 font-semibold">
              ${shareholder.otherMoney.toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-row border-t border-gray-100 pt-3">
          <TouchableOpacity
            className="flex-1 flex-row items-center justify-center py-2 rounded-lg mr-2"
            style={{ backgroundColor: COLORS.primary + '15' }}
            onPress={(e) => {
              e.stopPropagation();
              onEdit(shareholder);
            }}
          >
            <Ionicons name="pencil" size={16} color={COLORS.primary} />
            <Text className="text-primary font-medium ml-1 text-sm">Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 flex-row items-center justify-center py-2 rounded-lg"
            style={{ backgroundColor: COLORS.danger + '15' }}
            onPress={(e) => {
              e.stopPropagation();
              onDelete(shareholder);
            }}
          >
            <Ionicons name="trash" size={16} color={COLORS.danger} />
            <Text className="text-danger font-medium ml-1 text-sm">Remove</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {/* Detail Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50 p-4">
          <View className={`bg-white rounded-3xl ${isMobile ? 'p-6 w-full' : 'p-8 w-full max-w-md'}`}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Header */}
              <View className="flex-row justify-between items-center mb-6">
                <View className="flex-row items-center">
                  <View className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full items-center justify-center mr-4">
                    <Text className="text-white font-bold text-lg">
                      {shareholder.firstName[0]}{shareholder.lastName[0]}
                    </Text>
                  </View>
                  <View>
                    <Text className="text-xl font-bold text-gray-900">
                      {shareholder.name}
                    </Text>
                    <Text className="text-gray-500">{shareholder.email}</Text>
                  </View>
                </View>
                <TouchableOpacity 
                  onPress={() => setModalVisible(false)}
                  className="w-10 h-10 items-center justify-center rounded-full bg-gray-100"
                >
                  <Ionicons name="close" size={20} color={COLORS.secondary} />
                </TouchableOpacity>
              </View>

              {/* Equity Badge */}
              <View className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-4 mb-6">
                <Text className="text-white/80 text-center text-sm">Equity Share</Text>
                <Text className="text-white text-3xl font-bold text-center">
                  {shareholder.equity}%
                </Text>
              </View>

              {/* Financial Details */}
              <View className="space-y-4 mb-6">
                <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
                  <Text className="text-gray-500">Investment</Text>
                  <Text className="text-gray-900 font-semibold">
                    ${shareholder.investment.toLocaleString()}
                  </Text>
                </View>
                <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
                  <Text className="text-gray-500">Profit Share</Text>
                  <Text className="text-green-600 font-semibold">
                    ${shareholder.profit.toLocaleString()}
                  </Text>
                </View>
                <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
                  <Text className="text-gray-500">Returns</Text>
                  <Text className="text-purple-600 font-semibold">
                    ${shareholder.returns.toLocaleString()}
                  </Text>
                </View>
                <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
                  <Text className="text-gray-500">Other Contributions</Text>
                  <Text className="text-gray-900 font-semibold">
                    ${shareholder.otherMoney.toLocaleString()}
                  </Text>
                </View>
                <View className="flex-row justify-between items-center py-3">
                  <Text className="text-gray-500">Member Since</Text>
                  <Text className="text-gray-900 font-semibold">
                    {new Date(shareholder.joinDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Text>
                </View>
              </View>

              {/* Action Buttons */}
              <View className={`flex-row space-x-3 ${isMobile ? 'flex-col space-y-2' : ''}`}>
                <TouchableOpacity
                  className={`flex-row items-center justify-center py-4 rounded-2xl flex-1`}
                  style={{ backgroundColor: COLORS.primary }}
                  onPress={() => {
                    setModalVisible(false);
                    onEdit(shareholder);
                  }}
                >
                  <Ionicons name="pencil" size={18} color={COLORS.white} />
                  <Text className="text-white font-semibold ml-2">Edit Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className={`flex-row items-center justify-center py-4 rounded-2xl flex-1 border border-gray-300`}
                  onPress={() => {
                    setModalVisible(false);
                    onDelete(shareholder);
                  }}
                >
                  <Ionicons name="trash" size={18} color={COLORS.danger} />
                  <Text className="text-danger font-semibold ml-2">Remove</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}