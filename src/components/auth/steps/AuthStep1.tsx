// src/screens/auth/steps/AuthStep1.tsx
import React from "react";
import { 
  View, 
  Text, 
  TextInput, 
  ScrollView
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function AuthStep1({ formData, handleInputChange }: any) {
  return (
    <ScrollView 
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 16 }}
    >
      <Text className="text-2xl font-bold text-gray-900 mb-2">
        Company Information
      </Text>
      <Text className="text-base text-gray-600 mb-6 font-medium">
        Tell us about your organization
      </Text>

      {/* Company Legal Name */}
      <View className="mb-5 w-full">
        <Text className="text-sm font-semibold text-gray-900 mb-2">
          Company Legal Name *
        </Text>
        <TextInput
          placeholder="Enter legal company name"
          placeholderTextColor="#999999"
          className="bg-gray-50 rounded-xl px-4 py-4 text-base text-gray-900 border border-gray-300"
          value={formData.companyName}
          onChangeText={(value) => handleInputChange("companyName", value)}
        />
      </View>

      {/* Company Type */}
      <View className="mb-5 w-full">
        <Text className="text-sm font-semibold text-gray-900 mb-2">
          Company Type *
        </Text>
        <TextInput
          placeholder="e.g., Corporation, LLC, Partnership"
          placeholderTextColor="#999999"
          className="bg-gray-50 rounded-xl px-4 py-4 text-base text-gray-900 border border-gray-300"
          value={formData.companyType}
          onChangeText={(value) => handleInputChange("companyType", value)}
        />
      </View>

      {/* Industry */}
      <View className="mb-5 w-full">
        <Text className="text-sm font-semibold text-gray-900 mb-2">
          Industry *
        </Text>
        <TextInput
          placeholder="e.g., Technology, Finance, Healthcare"
          placeholderTextColor="#999999"
          className="bg-gray-50 rounded-xl px-4 py-4 text-base text-gray-900 border border-gray-300"
          value={formData.industry}
          onChangeText={(value) => handleInputChange("industry", value)}
        />
      </View>

      {/* Company Size (Dropdown) */}
      <View className="mb-5 w-full">
        <Text className="text-sm font-semibold text-gray-900 mb-2">
          Company Size *
        </Text>
        <View className="bg-gray-50 rounded-xl border border-gray-300 overflow-hidden">
          <Picker
            selectedValue={formData.companySize}
            onValueChange={(value) => handleInputChange("companySize", value)}
            style={{ color: '#1A1A1A', fontSize: 15 }}
            dropdownIconColor="#666666"
          >
            <Picker.Item label="Select company size" value="" />
            <Picker.Item label="1 - 50 employees" value="1-50" />
            <Picker.Item label="50 - 500 employees" value="50-500" />
            <Picker.Item label="500 - 2000 employees" value="500-2000" />
          </Picker>
        </View>
      </View>

      {/* Year Founded */}
      <View className="mb-5 w-full">
        <Text className="text-sm font-semibold text-gray-900 mb-2">
          Year Founded
        </Text>
        <TextInput
          placeholder="YYYY"
          placeholderTextColor="#999999"
          keyboardType="numeric"
          className="bg-gray-50 rounded-xl px-4 py-4 text-base text-gray-900 border border-gray-300"
          value={formData.foundedYear}
          onChangeText={(value) => handleInputChange("foundedYear", value)}
        />
      </View>

      {/* Tax ID / EIN */}
      <View className="mb-5 w-full">
        <Text className="text-sm font-semibold text-gray-900 mb-2">
          Tax ID / EIN *
        </Text>
        <TextInput
          placeholder="Enter tax identification number"
          placeholderTextColor="#999999"
          className="bg-gray-50 rounded-xl px-4 py-4 text-base text-gray-900 border border-gray-300"
          value={formData.taxId}
          onChangeText={(value) => handleInputChange("taxId", value)}
        />
      </View>

      {/* Registration Number */}
      <View className="mb-5 w-full">
        <Text className="text-sm font-semibold text-gray-900 mb-2">
          Registration Number
        </Text>
        <TextInput
          placeholder="Business registration number"
          placeholderTextColor="#999999"
          className="bg-gray-50 rounded-xl px-4 py-4 text-base text-gray-900 border border-gray-300"
          value={formData.registrationNumber}
          onChangeText={(value) =>
            handleInputChange("registrationNumber", value)
          }
        />
      </View>
    </ScrollView>
  );
}