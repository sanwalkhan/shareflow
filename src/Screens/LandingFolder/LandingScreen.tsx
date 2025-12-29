import React, { useState } from 'react';
import { ScrollView, View, Pressable, Text } from 'react-native';

// Landing components
import HeroScreen from '../../components/LandingPages/HeroScreen';
import BusinessScreen from '../../components/LandingPages/BusinessScreen';
import Cards from '../../components/LandingPages/Cards';
import InfoScreen from '../../components/LandingPages/InfoScreen';
import Marketing from '../../components/LandingPages/Marketing';

// ✅ Import HR Layout
import HrLayout from '../../components/Hr-profile/HrLayout';

const LandingScreen: React.FC = () => {
  const [showHR, setShowHR] = useState(false);

  // 👉 If HR Dashboard is active
  if (showHR) {
    return (
      <View className="flex-1">
        {/* Optional back button */}
        <Pressable
          onPress={() => setShowHR(false)}
          className="bg-[#FFC20E] px-4 py-3 m-4 rounded-lg w-[160px]"
        >
          <Text className="text-black font-semibold text-center">
            ← Back to Home
          </Text>
        </Pressable>

        <HrLayout />
      </View>
    );
  }

  // 👉 Default Landing Page
  return (
    <ScrollView>
      {/* 🔘 Button to open HR Dashboard */}
      <View className="items-center my-6">
        <Pressable
          onPress={() => setShowHR(true)}
          className="bg-[#001867] px-6 py-4 rounded-xl"
        >
          <Text className="text-white font-semibold text-lg">
            Open HR Dashboard
          </Text>
        </Pressable>
      </View>

      <HeroScreen />
      <BusinessScreen />
      <Cards />
      <InfoScreen />
      <Marketing />
    </ScrollView>
  );
};

export default LandingScreen;
