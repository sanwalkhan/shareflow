import React from "react";
import { View, Text, TextInput } from "react-native";
import { COLORS, isMobile } from "../../../constants/theme";

export default function AuthStep2({ formData, handleInputChange }: any) {
  return (
    <View className="flex-1">
      <Text className="text-textDark text-[22px] font-bold mb-2">Contact Details</Text>
      <Text className="text-secondary text-[15px] mb-6 font-medium">Where can we reach your company?</Text>

      <View className="flex-row flex-wrap justify-between">
        {[
          { label: "Business Email *", field: "email", placeholder: "contact@company.com", keyboardType: "email-address" },
          { label: "Phone Number *", field: "phone", placeholder: "+1 (555) 000-0000", keyboardType: "phone-pad" },
        ].map((input, index) => (
          <View key={index} className={`${isMobile ? "w-full" : "w-[48%]"} mb-5`}>
            <Text className="text-textDark text-sm font-semibold mb-2">{input.label}</Text>
            <TextInput
              placeholder={input.placeholder}
              placeholderTextColor={COLORS.tertiary + "80"}
              className="bg-gray-50 rounded-xl px-4 py-3.5 text-[15px] text-textDark border border-gray-300"
              value={formData[input.field]}
              onChangeText={(value) => handleInputChange(input.field, value)}
              keyboardType={input.keyboardType as any}
            />
          </View>
        ))}

        {[
          { label: "Street Address *", field: "address", placeholder: "Enter company headquarters address" },
          { label: "City *", field: "city", placeholder: "Enter city" },
          { label: "Country *", field: "country", placeholder: "Enter country" },
          { label: "Postal Code *", field: "postalCode", placeholder: "ZIP / Postal code" },
        ].map((input, index) => (
          <View key={index} className={`${isMobile ? "w-full" : "w-[48%]"} mb-5`}>
            <Text className="text-textDark text-sm font-semibold mb-2">{input.label}</Text>
            <TextInput
              placeholder={input.placeholder}
              placeholderTextColor={COLORS.tertiary + "80"}
              className="bg-gray-50 rounded-xl px-4 py-3.5 text-[15px] text-textDark border border-gray-300"
              value={formData[input.field]}
              onChangeText={(value) => handleInputChange(input.field, value)}
            />
          </View>
        ))}
      </View>
    </View>
  );
}
