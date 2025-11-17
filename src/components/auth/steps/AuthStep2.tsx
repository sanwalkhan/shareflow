import React from "react";
import { View, Text, TextInput, ScrollView } from "react-native";

export default function AuthStep2({ formData, handleInputChange }: any) {
  const contactInputs = [
    { 
      label: "Business Email *", 
      field: "email", 
      placeholder: "contact@company.com", 
      keyboardType: "email-address" 
    },
    { 
      label: "Phone Number *", 
      field: "phone", 
      placeholder: "+1 (555) 000-0000", 
      keyboardType: "phone-pad" 
    },
  ];

  const addressInputs = [
    { 
      label: "Street Address *", 
      field: "address", 
      placeholder: "Enter company headquarters address" 
    },
    { 
      label: "City *", 
      field: "city", 
      placeholder: "Enter city" 
    },
    { 
      label: "Country *", 
      field: "country", 
      placeholder: "Enter country" 
    },
    { 
      label: "Postal Code *", 
      field: "postalCode", 
      placeholder: "ZIP / Postal code" 
    },
  ];

  return (
    <ScrollView 
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
      contentContainerClassName="p-4"
    >
      <Text className="text-2xl font-bold text-gray-900 mb-2">
        Contact Details
      </Text>
      <Text className="text-base text-gray-600 mb-6 font-medium">
        Where can we reach your company?
      </Text>

      {/* Contact Information */}
      <View className="mb-2">
        {contactInputs.map((input, index) => (
          <View key={index} className="mb-5 w-full">
            <Text className="text-sm font-semibold text-gray-900 mb-2">
              {input.label}
            </Text>
            <TextInput
              placeholder={input.placeholder}
              placeholderTextColor="#999999"
              className="bg-gray-50 rounded-xl px-4 py-4 text-base text-gray-900 border border-gray-300"
              value={formData[input.field]}
              onChangeText={(value) => handleInputChange(input.field, value)}
              keyboardType={input.keyboardType as any}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        ))}
      </View>

      {/* Address Information */}
      <View className="mb-2">
        {addressInputs.map((input, index) => (
          <View key={index} className="mb-5 w-full">
            <Text className="text-sm font-semibold text-gray-900 mb-2">
              {input.label}
            </Text>
            <TextInput
              placeholder={input.placeholder}
              placeholderTextColor="#999999"
              className="bg-gray-50 rounded-xl px-4 py-4 text-base text-gray-900 border border-gray-300"
              value={formData[input.field]}
              onChangeText={(value) => handleInputChange(input.field, value)}
              autoCapitalize="sentences"
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}