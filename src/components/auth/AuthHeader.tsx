import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS, isMobile } from "../../constants/theme";

interface AuthHeaderProps {
  onBack?: () => void;
}

export default function AuthHeader({ onBack }: AuthHeaderProps) {
  const navigation = useNavigation();

  const handleBack = () => {
    if (typeof onBack === "function") {
      onBack();
    } else {
      // fallback to navigation if no handler provided
      // @ts-ignore - navigation.goBack exists on the navigator object
      navigation.goBack();
    }
  };

  return (
    <View className={`${isMobile ? "px-5" : "px-10"} pt-5 mb-5`}>
      <TouchableOpacity
        onPress={handleBack}
        className="self-start mb-5 rounded-xl overflow-hidden"
      >
        <View
          className="flex-row items-center gap-2 px-4 py-3 rounded-xl border"
          style={{
            borderColor: "rgba(134, 194, 50, 0.3)",
            backgroundColor: "rgba(134, 194, 50, 0.1)",
          }}
        >
          <Feather name="arrow-left" size={20} color={COLORS.accent} />
          <Text className="text-accent text-[15px] font-semibold">Back to Home</Text>
        </View>
      </TouchableOpacity>

      <View className="flex-row items-center gap-3 justify-center">
        <View
          className="w-13 h-13 rounded-[16px] justify-center items-center border"
          style={{
            backgroundColor: "rgba(134, 194, 50, 0.15)",
            borderColor: "rgba(134, 194, 50, 0.3)",
          }}
        >
          <Feather name="trending-up" size={28} color={COLORS.accent} />
        </View>
        <Text className="text-textLight text-3xl font-extrabold tracking-tight">
          Share<Text style={{ color: COLORS.accent }}>Flow</Text>
        </Text>
      </View>
    </View>
  );
}
