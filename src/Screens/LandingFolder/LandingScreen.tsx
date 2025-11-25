// src/screens/LandingScreen.tsx
import React from 'react';
import { View } from 'react-native';

// Components from LandingPages folder
import HeroScreen from '../../components/LandingPages/HeroScreen';
import InfoScreen from '../../components/LandingPages/InfoScreen';
import BusinessScreen from '../../components/LandingPages/BusinessScreen';
import Cards from '../../components/LandingPages/Cards';
import Marketing from '../../components/LandingPages/Marketing';

const LandingScreen: React.FC = () => {
  return (
    <View>
      <HeroScreen />
      <InfoScreen />
      <BusinessScreen />
      <Cards />
      <Marketing />
    </View>
  );
};

export default LandingScreen;
