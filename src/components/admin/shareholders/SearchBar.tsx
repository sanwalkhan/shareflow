import React from "react";
import { View, TextInput, TouchableOpacity, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SearchBarProps } from "./types";
import { COLORS } from "../../../constants/theme";

export default function SearchBar({ value, onChange, onClear }: SearchBarProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View 
      className="rounded-2xl px-4 py-3 flex-row items-center bg-white border border-gray-200"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      }}
    >
      <Ionicons name="search" size={20} color={COLORS.tertiary} />
      <TextInput
        className="flex-1 ml-3 text-gray-900"
        placeholder={isMobile ? "Search shareholders..." : "Search by name, email, or phone..."}
        placeholderTextColor={COLORS.tertiary}
        value={value}
        onChangeText={onChange}
        style={{ fontSize: 16 }}
      />
      {value ? (
        <TouchableOpacity onPress={onClear} className="p-1">
          <Ionicons name="close-circle" size={20} color={COLORS.tertiary} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}