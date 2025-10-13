// src/components/Admin/PayrollModule.tsx
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { COLORS, isMobile } from "../../utils/responsive";
export function PayrollModule() {
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
          Payroll Management
        </Text>
        <Text className="text-sm md:text-base text-center italic" style={{ color: COLORS.tertiary, marginTop: 60 }}>
          Payroll automation coming soon...
        </Text>
      </View>
    </ScrollView>
  );
}