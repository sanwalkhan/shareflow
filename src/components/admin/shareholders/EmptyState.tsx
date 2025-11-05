import React from "react";
import { View, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { EmptyStateProps } from "./types";
import { COLORS } from "../../../constants/theme";

export default function EmptyState({ searchQuery, onAddPress }: EmptyStateProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isSearching = !!searchQuery;

  return (
    <View className={`rounded-xl p-8 items-center justify-center mt-4 ${isMobile ? 'mx-2' : ''}`} style={{ backgroundColor: COLORS.white }}>
      <Ionicons name="people-outline" size={isMobile ? 40 : 48} color={COLORS.tertiary} />
      <Text className={`${isMobile ? 'text-lg' : 'text-xl'} font-medium mt-4`} style={{ color: COLORS.secondary }}>
        {isSearching ? "No shareholders found" : "No shareholders yet"}
      </Text>

      <Text className="text-center mt-2" style={{ color: COLORS.tertiary }}>
        {isSearching
          ? "Try adjusting your search terms"
          : "Get started by adding your first shareholder"}
      </Text>

      {!isSearching && (
        <TouchableOpacity
          className={`mt-4 flex-row items-center rounded-xl ${isMobile ? 'px-4 py-3 w-full justify-center' : 'px-6 py-3'}`}
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