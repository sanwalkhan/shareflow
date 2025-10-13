import React from "react";
import { View, Text } from "react-native";

interface StepIndicatorProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <View className="flex-row items-center justify-between mb-8">
      {[1, 2, 3, 4].map((step) => (
        <View key={step} className="flex-row items-center flex-1">
          <View
            className={`w-9 h-9 rounded-full justify-center items-center border-2 ${
              currentStep >= step
                ? "bg-accent border-accent"
                : "bg-gray-100 border-gray-300"
            }`}
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
              className={`flex-1 h-0.5 mx-2 ${
                currentStep > step ? "bg-accent" : "bg-gray-300"
              }`}
            />
          )}
        </View>
      ))}
    </View>
  );
}
