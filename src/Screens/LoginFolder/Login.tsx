// src/screens/LandingScreen.tsx
import React from 'react';
import { ScrollView, View } from 'react-native';

// Components from LandingPages folder
import LoginScreen from '../../components/Login/LoginScreen';

const LandingScreen: React.FC = () => {
  return (
    <ScrollView>
      <LoginScreen />
    </ScrollView>
  );
};

export default LandingScreen;
