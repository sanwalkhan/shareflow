// src/components/admin/shareholders/SearchBar.tsx
import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SearchBarProps } from "./types";

export default function SearchBar({ value, onChange, onClear }: SearchBarProps) {
  return (
    <View className="bg-gray-100 rounded-xl px-4 py-3 flex-row items-center">
      <Ionicons name="search" size={20} color="#9CA3AF" />
      <TextInput
        className="flex-1 ml-2 text-gray-900"
        placeholder="Search shareholders by name or email..."
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChange}
      />
      {value ? (
        <TouchableOpacity onPress={onClear}>
          <Ionicons name="close-circle" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
