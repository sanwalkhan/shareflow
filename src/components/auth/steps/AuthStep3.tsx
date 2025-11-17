// src/screens/auth/steps/AuthStep3.tsx
import React from "react";
import { View, Text, TextInput } from "react-native";

export default function AuthStep3({ formData, handleInputChange }: any) {
  const adminInputs = [
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
  ];

  return (
    <View className="flex-1">
      <Text className="text-gray-900 text-2xl font-bold mb-2">
        Administrator Details
      </Text>
      <Text className="text-gray-600 text-base mb-6 font-medium">
        Primary account administrator information
      </Text>

      <View className="flex-col">
        {adminInputs.map((input, index) => (
          <View
            key={index}
            className="w-full mb-5"
          >
            <Text className="text-gray-900 text-sm font-semibold mb-2">
              {input.label}
            </Text>
            <TextInput
              placeholder={input.placeholder}
              placeholderTextColor="#999999"
              keyboardType={input.keyboardType as any}
              autoCapitalize="none"
              className="bg-gray-50 rounded-xl px-4 py-4 text-base text-gray-900 border border-gray-300"
              value={formData[input.field]}
              onChangeText={(value) => handleInputChange(input.field, value)}
            />
          </View>
        ))}
      </View>
    </View>
  );
}