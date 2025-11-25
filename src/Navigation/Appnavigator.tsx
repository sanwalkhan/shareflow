// src/Navigation/AppNavigator.tsx
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
import Shareholder from '../components/Admin/Shareholder/Shareholder';
import Expenses from '../components/Admin/Expenses/Expenses';
import Administrator from '../components/SignUp/Administrator';
import ContactDetails from '../components/SignUp/ContactDetails';
import Password from '../components/ForgetEmailPWD/Password';
import Forgetpwd from '../components/ForgetEmailPWD/Forgetpwd';
import VerifyReset from '../components/ForgetEmailPWD/VerifyReset';

export type RootStackParamList = {
  LandingScreen: undefined;
  Admin: undefined;
  Shareholder: undefined;
  Expenses: undefined;
  HomeLayout: undefined;
  Dashboard: undefined;
  HeaderFooterFile: undefined;
  HRFile: undefined;
  Login: undefined;
  Signup: undefined;
  Administrator: undefined;
  ContactDetails: undefined;
  Password: undefined;
  Forgetpwd: undefined;
  VerifyReset: undefined;
  VerifyEmail: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="HomeLayout">
      <Stack.Screen name="LandingScreen" component={LandingScreen} />
      <Stack.Screen name="Admin" component={Admin} />
      <Stack.Screen name="Shareholder" component={Shareholder} />
      <Stack.Screen name="Expenses" component={Expenses} />
      <Stack.Screen name="HomeLayout" component={HomeLayout} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="HeaderFooterFile" component={HeaderFooterFile} />
      <Stack.Screen name="HRFile" component={HRFile} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Administrator" component={Administrator} />
      <Stack.Screen name="ContactDetails" component={ContactDetails} />
      <Stack.Screen name="Password" component={Password} />
      <Stack.Screen name="Forgetpwd" component={Forgetpwd} />
      <Stack.Screen name="VerifyReset" component={VerifyReset} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
