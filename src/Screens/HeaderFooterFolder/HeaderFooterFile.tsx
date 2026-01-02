// src/screens/LandingScreen.tsx
import React from 'react';
import { View } from 'react-native';

// Components from LandingPages folder
import Header from '../../components/LandingPages/Header';
import Footer from '../../components/LandingPages/Footer';
import { Verified } from 'lucide-react-native';
const LandingScreen: React.FC = () => {
  return (
    <View>
      <Header/>
       <Footer />
    </View>
  );
};

export default LandingScreen;
