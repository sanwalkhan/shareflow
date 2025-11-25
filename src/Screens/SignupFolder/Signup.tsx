// src/screens/LandingScreen.tsx
import React from 'react';
import { View } from 'react-native';

// Components from LandingPages folder
import Administrator from '../../components/SignUp/Administrator';
import ContactDetails from '../../components/SignUp/ContactDetails';
import SignupScreen from '../../components/SignUp/SignupScreen';
const LandingScreen: React.FC = () => {
  return (
    <View>
      <Administrator />
      <ContactDetails/>
      <SignupScreen />
    </View>
  );
};

export default LandingScreen;
