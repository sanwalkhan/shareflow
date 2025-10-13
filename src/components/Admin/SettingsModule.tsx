// src/components/Admin/SettingsModule.tsx
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { COLORS, isMobile } from "../../utils/responsive";
export function SettingsModule() {
  return (
    <ScrollView 
      className="flex-1"
      contentContainerStyle={{ 
        padding: isMobile ? 12 : 24, 
        paddingBottom: isMobile ? 60 : 80 
      }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View>
        <Text className="text-2xl md:text-3xl font-extrabold mb-4 md:mb-6" style={{ color: COLORS.textDark }}>
          Settings
        </Text>
        <Text className="text-sm md:text-base text-center italic" style={{ color: COLORS.tertiary, marginTop: 60 }}>
          Company settings coming soon...
        </Text>
      </View>
    </ScrollView>
  );
}