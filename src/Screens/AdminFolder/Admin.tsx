// src/screens/LandingScreen.tsx
import React from 'react';
import { View } from 'react-native';

// Components from LandingPages folder
import Shareholder from '../../components/Admin/Shareholder/Shareholder';

import Expenses from '../../components/Admin/Expenses/Expenses';

const LandingScreen: React.FC = () => {
  return (
    <View>
      <Shareholder />
      <Expenses />
    </View>
  );
};

export default LandingScreen;
