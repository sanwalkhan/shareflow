// src/screens/LandingScreen.tsx
import React from 'react';
import { View } from 'react-native';

// Components from LandingPages folder
import ContactDetails2 from '../../components/HrPanel/ContactDetails2';
import Header2 from '../../components/HrPanel/Header2';
import ProfileSection from '../../components/HrPanel/ProfileSection';
import Sidebar2 from '../../components/HrPanel/Sidebar2';

import { Verified } from 'lucide-react-native';
const LandingScreen: React.FC = () => {
  return (
    <View>
      <ContactDetails2 />
      <Header2/>
      <ProfileSection />
       <Sidebar2/>
    </View>
  );
};

export default LandingScreen;
