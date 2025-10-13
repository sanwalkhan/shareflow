// src/screens/auth/steps/AuthStep1.tsx
import React from "react";
import { View, Text, TextInput, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { COLORS, isMobile } from "../../../constants/theme";

export default function AuthStep1({ formData, handleInputChange }: any) {
  return (
    <View className="flex-1">
      <Text className="text-textDark text-[22px] font-bold mb-2">
        Company Information
      </Text>
      <Text className="text-secondary text-[15px] mb-6 font-medium">
        Tell us about your organization
      </Text>

      <View className="flex-row flex-wrap justify-between">
        {/* Company Legal Name */}
        <View className={`${isMobile ? "w-full" : "w-[48%]"} mb-5`}>
          <Text className="text-textDark text-sm font-semibold mb-2">
            Company Legal Name *
          </Text>
          <TextInput
            placeholder="Enter legal company name"
            placeholderTextColor={COLORS.tertiary + "80"}
            className="bg-gray-50 rounded-xl px-4 py-3.5 text-[15px] text-textDark border border-gray-300"
            value={formData.companyName}
            onChangeText={(value) => handleInputChange("companyName", value)}
          />
        </View>

        {/* Company Type */}
        <View className={`${isMobile ? "w-full" : "w-[48%]"} mb-5`}>
          <Text className="text-textDark text-sm font-semibold mb-2">
            Company Type *
          </Text>
          <TextInput
            placeholder="e.g., Corporation, LLC, Partnership"
            placeholderTextColor={COLORS.tertiary + "80"}
            className="bg-gray-50 rounded-xl px-4 py-3.5 text-[15px] text-textDark border border-gray-300"
            value={formData.companyType}
            onChangeText={(value) => handleInputChange("companyType", value)}
          />
        </View>

        {/* Industry */}
        <View className={`${isMobile ? "w-full" : "w-[48%]"} mb-5`}>
          <Text className="text-textDark text-sm font-semibold mb-2">
            Industry *
          </Text>
          <TextInput
            placeholder="e.g., Technology, Finance, Healthcare"
            placeholderTextColor={COLORS.tertiary + "80"}
            className="bg-gray-50 rounded-xl px-4 py-3.5 text-[15px] text-textDark border border-gray-300"
            value={formData.industry}
            onChangeText={(value) => handleInputChange("industry", value)}
          />
        </View>

        {/* Company Size (Dropdown) */}
        <View className={`${isMobile ? "w-full" : "w-[48%]"} mb-5`}>
          <Text className="text-textDark text-sm font-semibold mb-2">
            Company Size *
          </Text>
          <View
            className="bg-gray-50 rounded-xl border border-gray-300"
            style={{
              overflow: "hidden",
            }}
          >
            <Picker
              selectedValue={formData.companySize}
              onValueChange={(value) => handleInputChange("companySize", value)}
              style={{
                color: COLORS.textDark,
                fontSize: 15,
                paddingVertical: Platform.OS === "web" ? 12 : 0,
              }}
            >
              <Picker.Item label="Select company size" value="" />
              <Picker.Item label="1 - 50 employees" value="1-50" />
              <Picker.Item label="50 - 500 employees" value="50-500" />
              <Picker.Item label="500 - 2000 employees" value="500-2000" />
            </Picker>
          </View>
        </View>

        {/* Year Founded */}
        <View className={`${isMobile ? "w-full" : "w-[48%]"} mb-5`}>
          <Text className="text-textDark text-sm font-semibold mb-2">
            Year Founded
          </Text>
          <TextInput
            placeholder="YYYY"
            placeholderTextColor={COLORS.tertiary + "80"}
            keyboardType="numeric"
            className="bg-gray-50 rounded-xl px-4 py-3.5 text-[15px] text-textDark border border-gray-300"
            value={formData.foundedYear}
            onChangeText={(value) => handleInputChange("foundedYear", value)}
          />
        </View>

        {/* Tax ID / EIN */}
        <View className={`${isMobile ? "w-full" : "w-[48%]"} mb-5`}>
          <Text className="text-textDark text-sm font-semibold mb-2">
            Tax ID / EIN *
          </Text>
          <TextInput
            placeholder="Enter tax identification number"
            placeholderTextColor={COLORS.tertiary + "80"}
            className="bg-gray-50 rounded-xl px-4 py-3.5 text-[15px] text-textDark border border-gray-300"
            value={formData.taxId}
            onChangeText={(value) => handleInputChange("taxId", value)}
          />
        </View>

        {/* Registration Number */}
        <View className="w-full mb-5">
          <Text className="text-textDark text-sm font-semibold mb-2">
            Registration Number
          </Text>
          <TextInput
            placeholder="Business registration number"
            placeholderTextColor={COLORS.tertiary + "80"}
            className="bg-gray-50 rounded-xl px-4 py-3.5 text-[15px] text-textDark border border-gray-300"
            value={formData.registrationNumber}
            onChangeText={(value) =>
              handleInputChange("registrationNumber", value)
            }
          />
        </View>
      </View>
    </View>
  );
}
