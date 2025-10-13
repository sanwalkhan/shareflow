import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { EmptyStateProps } from "./types";
import { COLORS } from "../../../constants/theme";

export default function EmptyState({ searchQuery, onAddPress }: EmptyStateProps) {
  const isSearching = !!searchQuery;

  return (
    <View className="rounded-2xl p-8 items-center justify-center mt-4 shadow" style={{ backgroundColor: COLORS.white }}>
      <Ionicons name="people-outline" size={48} color={COLORS.tertiary} />
      <Text className="text-lg font-medium mt-4" style={{ color: COLORS.secondary }}>
        {isSearching ? "No shareholders found" : "No shareholders yet"}
      </Text>

      <Text className="text-center mt-2" style={{ color: COLORS.tertiary }}>
        {isSearching
          ? "Try adjusting your search terms"
          : "Get started by adding your first shareholder"}
      </Text>

      {!isSearching && (
        <TouchableOpacity
          className="mt-4 flex-row items-center px-4 py-3 rounded-xl"
          style={{ backgroundColor: COLORS.accent }}
          onPress={onAddPress}
        >
          <Ionicons name="add" size={20} color={COLORS.white} />
          <Text className="font-semibold ml-2" style={{ color: COLORS.white }}>
            Add First Shareholder
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
