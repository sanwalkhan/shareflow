import "./global.css";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import HeroScreen from "./src/Screens/HeroScreen";
import LoginScreen from "./src/Screens/LoginScreen";
import Header from "./src/Screens/Header";
import SignupScreen from "./src/Screens/SignupScreen";
import ContactDetails from "./src/Screens/ContactDetails";
import VerifyEmail from "./src/Screens/VerifyEmail";
import Administrator from "./src/Screens/Administrator";
import Forgetpwd from "./src/Screens/Forgetpwd";
import Password from "./src/Screens/Password";
import VerifyReset from "./src/Screens/VerifyReset";

import HomeLayout from "./src/Screens/HomeLayout";
import Cards from "./src/Screens/Cards";
import InfoScreen from "./src/Screens/InfoScreen";
import BusinessScreen from "./src/Screens/BusinessScreen";
import Marketing from "./src/Screens/Marketing";
import Footer from "./src/Screens/Footer";
import ContactDetails2 from "./src/Screens/ContactDetails2";
import Dashboard from "./src/Screens/Dashboard"; // ✅ Dashboard Screen

// HRPanel Components
import Header2 from "./src/components/HrPanel/Header2";
import Sidebar2 from "./src/components/HrPanel/Sidebar2";
import ProfileSection from "./src/components/HrPanel/ProfileSection";

// Stack Param List
export type RootStackParamList = {
  // Screens
  Hero: undefined;
  Login: undefined;
  Signup: undefined;
  ContactDetails: undefined;
  VerifyEmail: undefined;
  Administrator: undefined;
  Forgetpwd: undefined;
  Password: undefined;
  VerifyReset: undefined;
  Cards: undefined;
  InfoScreen: undefined;
  BusinessScreen: undefined;
  Marketing: undefined;
  Footer: undefined;
  HomeLayout: undefined;
  Dashboard: undefined;

  // HRPanel Components
  Header2: undefined;
  Sidebar2: undefined;
  ProfileSection: undefined;

  // Sidebar Tabs
  PersonalDetails: undefined;
  ContactDetails2: undefined;
  NextOfKinDetails: undefined;
  EducationQualifications: undefined;
  GuarantorDetails: undefined;
  FamilyDetails: undefined;
  JobDetails: undefined;
  FinancialDetails: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Screens */}
        <Stack.Screen name="HomeLayout" component={HomeLayout} />
        <Stack.Screen name="Header" component={Header} />
        <Stack.Screen name="Hero" component={HeroScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ContactDetails" component={ContactDetails} />
        <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
        <Stack.Screen name="Administrator" component={Administrator} />
        <Stack.Screen name="Forgetpwd" component={Forgetpwd} />
        <Stack.Screen name="Password" component={Password} />
        <Stack.Screen name="VerifyReset" component={VerifyReset} />
        <Stack.Screen name="Cards" component={Cards} />
        <Stack.Screen name="InfoScreen" component={InfoScreen} />
        <Stack.Screen name="BusinessScreen" component={BusinessScreen} />
        <Stack.Screen name="Marketing" component={Marketing} />
        <Stack.Screen name="Footer" component={Footer} />

        {/* HRPanel Components */}
        <Stack.Screen name="Header2" component={Header2} />
        <Stack.Screen name="Sidebar2" component={Sidebar2} />
        <Stack.Screen name="ProfileSection" component={ProfileSection} />

        {/* Dashboard Screen */}
        <Stack.Screen name="Dashboard" component={Dashboard} />

        {/* Sidebar Tabs */}
        <Stack.Screen name="ContactDetails2" component={ContactDetails2} />
        {/* Future tabs */}
        {/* <Stack.Screen name="PersonalDetails" component={PersonalDetails} /> */}
        {/* <Stack.Screen name="NextOfKinDetails" component={NextOfKinDetails} /> */}
        {/* <Stack.Screen name="EducationQualifications" component={EducationQualifications} /> */}
        {/* <Stack.Screen name="GuarantorDetails" component={GuarantorDetails} /> */}
        {/* <Stack.Screen name="FamilyDetails" component={FamilyDetails} /> */}
        {/* <Stack.Screen name="JobDetails" component={JobDetails} /> */}
        {/* <Stack.Screen name="FinancialDetails" component={FinancialDetails} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
