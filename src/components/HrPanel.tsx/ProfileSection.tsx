import React from "react";
import { View, Text, Image } from "react-native";

const ProfileSection: React.FC = () => {
  return (
  <View className="bg-white rounded-xl p-6 shadow flex items-center w-[1243px] h-[690px] ml-[20px] mt-[6px]">
      {/* Avatar */}
      <Image
        source={require("../assets/Avator.png")}
        className="w-28 h-28 rounded-full"
      />

      {/* Edit Icon */}
      <View className="absolute top-4 right-4">
        <Image source={require("../assets/Vector.png")} className="w-6 h-6" />
      </View>

      {/* Details */}
      <Text className="mt-2 text-gray-500 text-center">Employee Name</Text>
      <Text className="text-xl font-bold text-center">Biruk Dawit</Text>

      <Text className="mt-3 text-gray-500 text-center">Department</Text>
      <Text className="text-lg font-semibold text-center">Design & Marketing</Text>

      <View className="flex-row justify-between w-full mt-16 px-6">
        <View>
          <Text className="text-gray-500 ml-[430]">Job Title</Text>
          <Text className="font-bold text-[20px] text-[#000000] ml-[430]">
  UI / UX Designer
</Text>
        </View>
        <View>
          <Text className="text-gray-500 ml-[-490]">Job Category</Text>
          <Text className="font-bold text-[20px] text-[#000000] ml-[-490]">
 Full Time
</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileSection;
