import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";

export default function AuthActions({ currentStep, isLoading, handlePrevStep, handleNextStep, handleSubmit }: any) {
  return (
    <View className="flex-row justify-between items-center mb-5">
      {currentStep > 1 && (
        <TouchableOpacity
          className="flex-row items-center gap-2 px-6 py-3.5 rounded-xl bg-gray-50 border border-gray-300"
          onPress={handlePrevStep}
        >
          <Feather name="arrow-left" size={18} color={COLORS.primary} />
          <Text className="text-textDark text-[15px] font-semibold">Previous</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        className={`${currentStep < 4 ? "flex-1 ml-3" : "flex-1"} rounded-xl overflow-hidden`}
        style={{
          backgroundColor: COLORS.accent,
          shadowColor: COLORS.accent,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 16,
          elevation: 8,
        }}
        onPress={currentStep < 4 ? handleNextStep : handleSubmit}
        disabled={isLoading}
      >
        <View className="py-3.5">
          {isLoading ? (
            <View className="flex-row items-center justify-center gap-3">
              <Feather name="loader" size={20} color={COLORS.white} />
              <Text className="text-white text-[15px] font-bold">Processing...</Text>
            </View>
          ) : (
            <View className="flex-row items-center justify-center gap-2">
              <Text className="text-white text-[15px] font-bold">
                {currentStep < 4 ? "Continue" : "Complete Registration"}
              </Text>
              <Feather name={currentStep < 4 ? "arrow-right" : "check"} size={20} color={COLORS.white} />
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}
