import React from 'react';
import { ScrollView } from 'react-native';

// Components from LandingPages folder
import HeroScreen from '../../components/LandingPages/HeroScreen';
import BusinessScreen from '../../components/LandingPages/BusinessScreen';
import Cards from '../../components/LandingPages/Cards';
import InfoScreen from '../../components/LandingPages/InfoScreen';
import Marketing from '../../components/LandingPages/Marketing';

const LandingScreen: React.FC = () => {
  return (
    <ScrollView>
      <HeroScreen />
      <BusinessScreen />
      <Cards />
      <InfoScreen />
      <Marketing />
    </ScrollView>
  );
};

export default LandingScreen;
