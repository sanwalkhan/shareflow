import React from "react";
import { View, Text } from "react-native";
import Sidebar2 from "./Sidebar2";  
import ProfileSection from "./ProfileSection";  

const Header2: React.FC = () => {
  return (
    <View
      className="flex items-center justify-start"
      style={{ backgroundColor: '#d8e9ffff', width: 1700, height: 870 }}
    >
      
      {/* HEADER (full width) */}
     <View className="bg-white rounded-xl shadow w-[1620px] p-4 mt-4">
        <Text className="text-gray-500 text-sm">
          Dashboard &gt; Update Profile
        </Text>
      </View>

      {/* SIDEBAR AND PROFILE */}
      <View className="flex-row mt-4 w-full px-4">
        {/* Sidebar fixed width */}
        <Sidebar2 />

        {/* Spacing */}
        <View className="w-6" />

        {/* ProfileSection takes remaining space */}
        <View className="flex-1">
          <ProfileSection />
        </View>
      </View>

    </View>
  );
};

export default Header2;
