import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../../constants/theme";

export default function AuthStep4({ formData, handleInputChange, showPassword, setShowPassword }: any) {
  return (
    <View className="flex-1">
      <Text className="text-textDark text-[22px] font-bold mb-2">Security & Preferences</Text>
      <Text className="text-secondary text-[15px] mb-6 font-medium">Set up your account security</Text>

      {/* Password Fields */}
      {["password", "confirmPassword"].map((field, i) => (
        <View key={i} className="w-full mb-5">
          <Text className="text-textDark text-sm font-semibold mb-2">
            {field === "password" ? "Password *" : "Confirm Password *"}
          </Text>
          <View className="relative">
            <TextInput
              placeholder={field === "password" ? "Create secure password" : "Re-enter your password"}
              placeholderTextColor={COLORS.tertiary + "80"}
              className="bg-gray-50 rounded-xl px-4 py-3.5 text-[15px] text-textDark border border-gray-300 pr-12"
              value={formData[field]}
              onChangeText={(value) => handleInputChange(field, value)}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              className="absolute right-4 top-3.5 p-1"
              onPress={() => setShowPassword(!showPassword)}
            >
              <Feather
                name={showPassword ? "eye-off" : "eye"}
                size={18}
                color={COLORS.tertiary}
              />
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* Checkboxes */}
      {[
        {
          label: (
            <>
              I agree to the <Text className="text-accent font-semibold">Terms of Service</Text> and{" "}
              <Text className="text-accent font-semibold">Privacy Policy</Text> *
            </>
          ),
          field: "acceptTerms",
        },
        {
          label: "Send me product updates, security tips, and industry insights",
          field: "newsletter",
        },
      ].map((item, i) => (
        <View key={i} className="w-full mb-5">
          <View className="flex-row items-start gap-3">
            <TouchableOpacity
              className={`w-5 h-5 rounded border justify-center items-center mt-0.5 ${
                formData[item.field] ? "bg-accent border-accent" : "bg-gray-50 border-gray-300"
              }`}
              onPress={() => handleInputChange(item.field, !formData[item.field])}
            >
              {formData[item.field] && <Feather name="check" size={16} color={COLORS.white} />}
            </TouchableOpacity>
            <Text className="text-secondary text-sm flex-1 leading-5">{item.label}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}
