import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ActionsModalProps } from "./types";
import { COLORS } from "../../../constants/theme";

export default function ActionsModal({
  visible,
  action,
  onExecute,
  onClose,
  stats,
}: ActionsModalProps) {
  if (!visible) return null;

  const getActionDetails = (): {
    title: string;
    description: string;
    icon: keyof typeof Ionicons.glyphMap;
    color: string;
  } => {
    switch (action) {
      case "Equity Validation":
        return {
          title: "Equity Validation",
          description:
            "Validate and audit all equity distributions across shareholders.",
          icon: "shield-checkmark" as const,
          color: COLORS.accent,
        };
      case "Dividend Actions":
        return {
          title: "Dividend Distribution",
          description:
            "Process dividend payments based on equity percentages.",
          icon: "cash" as const,
          color: COLORS.primary,
        };
      case "Reports":
        return {
          title: "Generate Reports",
          description: "Create comprehensive shareholder and equity reports.",
          icon: "analytics" as const,
          color: COLORS.secondary,
        };
      default:
        return {
          title: "Action",
          description: "Perform administrative action.",
          icon: "cog" as const,
          color: COLORS.tertiary,
        };
    }
  };

  const details = getActionDetails();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center p-6" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <View
          className="rounded-3xl p-6 w-full max-w-md"
          style={{ backgroundColor: COLORS.white }}
        >
          {/* Header with Icon */}
          <View className="items-center mb-6">
            <View
              className="p-4 rounded-full mb-4"
              style={{ backgroundColor: details.color }}
            >
              <Ionicons name={details.icon} size={32} color={COLORS.white} />
            </View>
            <Text
              className="text-xl font-bold text-center"
              style={{ color: COLORS.textDark }}
            >
              {details.title}
            </Text>
            <Text
              className="text-center mt-2"
              style={{ color: COLORS.tertiary }}
            >
              {details.description}
            </Text>
          </View>

          {/* Summary */}
          <View
            className="p-4 rounded-xl mb-6"
            style={{ backgroundColor: COLORS.textLight }}
          >
            <Text
              className="font-medium mb-2"
              style={{ color: COLORS.textDark }}
            >
              Summary
            </Text>
            <Text style={{ color: COLORS.tertiary, fontSize: 14 }}>
              Total Shareholders: {stats.totalShareholders}
            </Text>
            <Text style={{ color: COLORS.tertiary, fontSize: 14 }}>
              Total Equity: {stats.totalEquity.toFixed(1)}%
            </Text>
            <Text style={{ color: COLORS.tertiary, fontSize: 14 }}>
              Total Investment: ${stats.totalInvestment.toLocaleString()}
            </Text>
          </View>

          {/* Buttons */}
          <View className="flex-row justify-end space-x-3">
            <TouchableOpacity
              className="px-6 py-3 rounded-xl border"
              style={{
                borderColor: COLORS.tertiary,
                backgroundColor: COLORS.white,
              }}
              onPress={onClose}
            >
              <Text style={{ color: COLORS.secondary, fontWeight: "500" }}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="px-6 py-3 rounded-xl"
              style={{ backgroundColor: COLORS.accent }}
              onPress={onExecute}
            >
              <Text style={{ color: COLORS.white, fontWeight: "600" }}>
                Execute Action
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
