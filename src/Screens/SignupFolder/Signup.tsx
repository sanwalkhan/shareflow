// src/screens/LandingScreen.tsx
import React from 'react';
import { ScrollView, View } from 'react-native';


import SignupScreen from '../../components/SignUp/SignupScreen';
const Signup: React.FC = () => {
  return (
    <ScrollView>
      <SignupScreen />
    </ScrollView>
  );
};

export default Signup;
