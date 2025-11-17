import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function AuthStep4({ formData, handleInputChange, showPassword, setShowPassword }: any) {
  const passwordFields = [
    {
      field: "password",
      label: "Password *",
      placeholder: "Create secure password"
    },
    {
      field: "confirmPassword", 
      label: "Confirm Password *",
      placeholder: "Re-enter your password"
    }
  ];

  const checkboxes = [
    {
      label: (
        <>
          I agree to the <Text className="text-blue-500 font-semibold">Terms of Service</Text> and{" "}
          <Text className="text-blue-500 font-semibold">Privacy Policy</Text> *
        </>
      ),
      field: "acceptTerms",
    },
    {
      label: "Send me product updates, security tips, and industry insights",
      field: "newsletter",
    },
  ];

  return (
    <View className="flex-1">
      <Text className="text-gray-900 text-2xl font-bold mb-2">Security & Preferences</Text>
      <Text className="text-gray-600 text-base mb-6 font-medium">Set up your account security</Text>

      {/* Password Fields */}
      {passwordFields.map((fieldConfig, index) => (
        <View key={index} className="w-full mb-5">
          <Text className="text-gray-900 text-sm font-semibold mb-2">
            {fieldConfig.label}
          </Text>
          <View className="relative">
            <TextInput
              placeholder={fieldConfig.placeholder}
              placeholderTextColor="#999999"
              className="bg-gray-50 rounded-xl px-4 py-4 text-base text-gray-900 border border-gray-300 pr-12"
              value={formData[fieldConfig.field]}
              onChangeText={(value) => handleInputChange(fieldConfig.field, value)}
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
                color="#666666"
              />
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* Checkboxes */}
      {checkboxes.map((item, index) => (
        <View key={index} className="w-full mb-5">
          <View className="flex-row items-start gap-3">
            <TouchableOpacity
              className={`w-5 h-5 rounded border justify-center items-center mt-0.5 ${
                formData[item.field] ? "bg-blue-500 border-blue-500" : "bg-gray-50 border-gray-300"
              }`}
              onPress={() => handleInputChange(item.field, !formData[item.field])}
            >
              {formData[item.field] && <Feather name="check" size={16} color="white" />}
            </TouchableOpacity>
            <Text className="text-gray-600 text-sm flex-1 leading-5">{item.label}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}