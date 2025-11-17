import React from "react";
import { View, Text } from "react-native";
import { COLORS } from "../../constants/theme";

interface StepIndicatorProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <View className="flex-row items-center justify-between mb-8">
      {[1, 2, 3, 4].map((step) => (
        <View key={step} className="flex-row items-center flex-1">
          <View
            className={`w-10 h-10 rounded-full justify-center items-center border-2 ${
              currentStep >= step
                ? "bg-blue-500 border-blue-500"
                : "bg-gray-50 border-gray-300"
            }`}
            style={{
              backgroundColor: currentStep >= step ? COLORS.accent : undefined,
              borderColor: currentStep >= step ? COLORS.accent : undefined,
            }}
          >
            <Text
              className={`text-sm font-bold ${
                currentStep >= step ? "text-white" : "text-gray-500"
              }`}
            >
              {step}
            </Text>
          </View>
          {step < 4 && (
            <View
              className={`flex-1 h-1 mx-3 ${
                currentStep > step ? "bg-blue-500" : "bg-gray-300"
              }`}
              style={{
                backgroundColor: currentStep > step ? COLORS.accent : undefined,
              }}
            />
          )}
        </View>
      ))}
    </View>
  );
}