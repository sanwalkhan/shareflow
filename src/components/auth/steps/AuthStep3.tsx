// src/screens/auth/steps/AuthStep3.tsx
import React from "react";
import { View, Text, TextInput } from "react-native";
import { COLORS, isMobile } from "../../../constants/theme";

export default function AuthStep3({ formData, handleInputChange }: any) {
  return (
    <View className="flex-1">
      <Text className="text-textDark text-[22px] font-bold mb-2">
        Administrator Details
      </Text>
      <Text className="text-secondary text-[15px] mb-6 font-medium">
        Primary account administrator information
      </Text>

      <View className="flex-row flex-wrap justify-between">
        {[
          {
            label: "First Name *",
            field: "firstName",
            placeholder: "Enter first name",
          },
          {
            label: "Last Name *",
            field: "lastName",
            placeholder: "Enter last name",
          },
          {
            label: "Job Title *",
            field: "jobTitle",
            placeholder: "e.g., CEO, Finance Manager",
          },
          {
            label: "Admin Email *",
            field: "adminEmail",
            placeholder: "admin@company.com",
            keyboardType: "email-address",
          },
        ].map((input, index) => (
          <View
            key={index}
            className={`${isMobile ? "w-full" : "w-[48%]"} mb-5`}
          >
            <Text className="text-textDark text-sm font-semibold mb-2">
              {input.label}
            </Text>
            <TextInput
              placeholder={input.placeholder}
              placeholderTextColor={COLORS.tertiary + "80"}
              keyboardType={input.keyboardType as any}
              autoCapitalize="none"
              className="bg-gray-50 rounded-xl px-4 py-3.5 text-[15px] text-textDark border border-gray-300"
              value={formData[input.field]}
              onChangeText={(value) => handleInputChange(input.field, value)}
            />
          </View>
        ))}
      </View>
    </View>
  );
}
