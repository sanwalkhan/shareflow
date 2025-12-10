// src/screens/LandingScreen.tsx
import React from 'react';
import { View } from 'react-native';

// Components from LandingPages folder
import ShareholderDashboard from '../../components/Shareholderdashboard/ShareholderDashboard';
import Report from '../../components/Shareholderdashboard/Report';


const Dashboard: React.FC = () => {
  return (
    <View>
      <ShareholderDashboard/>
      <Report/>
    </View>
  );
};

export default Dashboard;
