// Footer.tsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';

const Footer: React.FC = () => {
  return (
    <View className="bg-[#2A2F50] px-6 py-8">
      {/* Top section */}
      <View className="flex-row flex-wrap justify-between mt-15">
        {/* Logo & Social */}
        <View className="w-1/2 md:w-1/4 mb-4">
          <Text className="text-white text-xl font-bold mb-2 ml-[22]">Nexcent</Text>
          <Text className="text-gray-400 text-sm mb-3 ml-[22]">
            Copyright © 2020 Lanthy UK Ltd.{"\n"}All rights reserved
          </Text>
          <View className="flex-row space-x-3 ml-[22]">
            <FontAwesome name="facebook" size={20} color="white" />
            <FontAwesome name="twitter" size={20} color="white" />
            <FontAwesome name="instagram" size={20} color="white" />
            <Entypo name="youtube" size={20} color="white" />
          </View>
        </View>

        {/* Company */}
        <View className="w-1/2 md:w-1/4 mb-4 ml-[62]">
          <Text className="text-white font-semibold mb-2">Company</Text>
          <Text className="text-gray-300 mb-1">About us</Text>
          <Text className="text-gray-300 mb-1">Blog</Text>
          <Text className="text-gray-300 mb-1">Contact us</Text>
          <Text className="text-gray-300 mb-1">Pricing</Text>
          <Text className="text-gray-300 mb-1">Testimonials</Text>
        </View>

        {/* Support */}
        <View className="w-1/2 md:w-1/4 mb-4 ml-[12] ">
          <Text className="text-white font-semibold mb-2">Support</Text>
          <Text className="text-gray-300 mb-1">Help center</Text>
          <Text className="text-gray-300 mb-1">Terms of service</Text>
          <Text className="text-gray-300 mb-1">Legal</Text>
          <Text className="text-gray-300 mb-1">Privacy policy</Text>
          <Text className="text-gray-300 mb-1">Status</Text>
        </View>

        {/* Stay up to date */}
        {/* Stay up to date */}
<View className="w-50 mb-4 ml-[-12]">  {/* Reduced width from w-1/2 md:w-1/4 */}
  <Text className="text-white font-semibold mb-2">Stay up to date</Text>
  <View className="flex-row border border-gray-400 rounded-full overflow-hidden">
    <TextInput
      placeholder="Your email address"
      placeholderTextColor="#b0b0b0"
      className="px-4 py-2 w-32 flex-none text-white" // input smaller inside smaller column
    />
    <TouchableOpacity className="bg-[#4CAF4F] px-4 justify-center items-center">
      <Text className="text-white font-semibold">→</Text>
    </TouchableOpacity>
  </View>
</View>


      </View>
    </View>
  );
};

export default Footer;
