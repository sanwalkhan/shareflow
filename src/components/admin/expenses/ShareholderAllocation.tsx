import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Shareholder } from "./types";

interface ShareholderAllocationProps {
  shareholders: Shareholder[];
  amount: string;
  distributionMethod: "equal" | "percentage" | "custom";
  setDistributionMethod: (method: "equal" | "percentage" | "custom") => void;
  customAllocations: { [key: string]: string };
  setCustomAllocations: React.Dispatch<
    React.SetStateAction<{ [key: string]: string }>
  >;
  calculateAllocations: (amount: number) => Shareholder[];
}

export default function ShareholderAllocation({
  shareholders,
  amount,
  distributionMethod,
  setDistributionMethod,
  customAllocations,
  setCustomAllocations,
  calculateAllocations,
}: ShareholderAllocationProps) {
  return (
    <View className="mb-6">
      <Text className="text-lg font-semibold text-gray-800 mb-4">
        Shareholder Allocation
      </Text>

      {/* Distribution Method */}
      <View className="flex-row mb-4">
        {[
          { label: "Equal", value: "equal" },
          { label: "By Percentage", value: "percentage" },
          { label: "Custom", value: "custom" },
        ].map((method) => (
          <TouchableOpacity
            key={method.value}
            className={`flex-1 mx-1 py-2 rounded-lg border ${
              distributionMethod === method.value
                ? "border-accent bg-accent/10"
                : "border-gray-300 bg-white"
            }`}
            onPress={() => setDistributionMethod(method.value as any)}
          >
            <Text
              className={`text-center font-medium ${
                distributionMethod === method.value
                  ? "text-accent"
                  : "text-gray-600"
              }`}
            >
              {method.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Allocation Details */}
      {shareholders.map((sh, index) => (
        <View
          key={sh.id}
          className="flex-row items-center justify-between py-3 border-b border-gray-200"
        >
          <View className="flex-1">
            <Text className="font-medium text-gray-800">{sh.name}</Text>
            <Text className="text-gray-500 text-xs">
              {sh.sharePercentage}% Share
            </Text>
          </View>

          {distributionMethod === "custom" ? (
            <TextInput
              className="w-20 h-10 border border-gray-300 rounded-lg px-3 text-right"
              placeholder="0.00"
              keyboardType="decimal-pad"
              value={customAllocations[sh.id] || ""}
              onChangeText={(value) =>
                setCustomAllocations((prev) => ({
                  ...prev,
                  [sh.id]: value,
                }))
              }
            />
          ) : (
            <Text className="font-medium text-gray-800">
              $
              {calculateAllocations(parseFloat(amount || "0"))[
                index
              ]?.allocatedAmount.toFixed(2) || "0.00"}
            </Text>
          )}
        </View>
      ))}
    </View>
  );
}
