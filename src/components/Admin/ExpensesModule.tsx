// src/components/Admin/ExpensesModule.tsx
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { COLORS, isMobile } from "../../utils/responsive";

export default function ExpensesModule() {
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
          Expense Management
        </Text>
        <Text className="text-sm md:text-base text-center italic" style={{ color: COLORS.tertiary, marginTop: 60 }}>
          Advanced expense tracking coming soon...
        </Text>
      </View>
    </ScrollView>
  );
}







