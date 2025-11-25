// src/screens/LandingScreen.tsx
import React from 'react';
import { View } from 'react-native';

// Components from LandingPages folder
import LoginScreen from '../../components/Login/LoginScreen';

const LandingScreen: React.FC = () => {
  return (
    <View>
      <LoginScreen />
    </View>
  );
};

export default LandingScreen;
