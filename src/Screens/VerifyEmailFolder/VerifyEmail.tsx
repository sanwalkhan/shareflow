// src/screens/LandingScreen.tsx
import React from 'react';
import { View } from 'react-native';

// Components from LandingPages folder
import Forgetpwd from '../../components/ForgetEmailPWD/Forgetpwd';
import Password from '../../components/ForgetEmailPWD/Password';
import VerifyEmail from '../../components/ForgetEmailPWD/VerifyEmail';
import VerifyReset from '../../components/ForgetEmailPWD/VerifyReset';
import { Verified } from 'lucide-react-native';
const LandingScreen: React.FC = () => {
  return (
    <View>
      <Forgetpwd />
      <Password/>
      <VerifyEmail />
       <Verified />
    </View>
  );
};

export default LandingScreen;
