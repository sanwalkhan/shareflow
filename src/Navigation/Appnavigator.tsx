import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from '../Screens/LandingFolder/LandingScreen';
import Admin from '../Screens/AdminFolder/Admin';
import HomeLayout from '../Screens/HomeFolder/HomeLayout';
import Dashboard from '../Screens/DashboardFolder/Dashboard';
import HeaderFooterFile from '../Screens/HeaderFooterFolder/HeaderFooterFile';
import HRFile from '../Screens/HRPanelFolder/HRFile';
import Login from '../Screens/LoginFolder/Login';
import Signup from '../Screens/SignupFolder/Signup';
import VerifyEmail from '../Screens/VerifyEmailFolder/VerifyEmail';

export type RootStackParamList = {
  LandingScreen: undefined;
  Admin: undefined;
  HomeLayout: undefined;
  Dashboard: undefined;
  HeaderFooterFile: undefined;
  HRFile: undefined;
  Login: undefined;
  Signup: undefined;
  VerifyEmail: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LandingScreen" component={LandingScreen} />
      <Stack.Screen name="Admin" component={Admin} />
      <Stack.Screen name="HomeLayout" component={HomeLayout} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="HeaderFooterFile" component={HeaderFooterFile} />
      <Stack.Screen name="HRFile" component={HRFile} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
