// App.tsx
import "./global.css";
import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/* Header */
import Header from "./src/components/HeaderFooter/Header";

/* Landing Pages */
import HeroScreen from "./src/components/LandingPages/HeroScreen";
import BusinessScreen from "./src/components/LandingPages/BusinessScreen";
import InfoScreen from "./src/components/LandingPages/InfoScreen";
import Cards from "./src/components/LandingPages/Cards";
import Marketing from "./src/components/LandingPages/Marketing";

/* Auth / Account */
import LoginScreen from "./src/components/Login/LoginScreen";
import SignupScreen from "./src/components/SignUp/SignupScreen";
import Administrator from "./src/components/SignUp/Administrator";
import ContactDetails from "./src/components/SignUp/ContactDetails";

/* Forget / Reset / Verify */
import ForgetPwd from "./src/components/ForgetEmailPWD/Forgetpwd";
import Password from "./src/components/ForgetEmailPWD/Password";
import VerifyEmail from "./src/components/ForgetEmailPWD/VerifyEmail";
import VerifyReset from "./src/components/ForgetEmailPWD/VerifyReset";

/* Dashboard / Home */
import Dashboard from "./src/Screens/DashboardFolder/Dashboard";
import HomeLayout from "./src/Screens/HomeFolder/HomeLayout";

/* Contact / HRPanel */
import ContactDetails2 from "./src/components/HrPanel/ContactDetails2";
import Header2 from "./src/components/HrPanel/Header2";
import Sidebar2 from "./src/components/HrPanel/Sidebar2";
import ProfileSection from "./src/components/HrPanel/ProfileSection";

/* Admin */
import Shareholder from "./src/components/Admin/Expenses/Shareholder/Shareholder";
import Expenses from "./src/components/Admin/Expenses/Expenses";
import Adminreport from "./src/components/Admin/Admindashboard/Adminreport";
import AdminDashboard from "./src/components/Admin/Admindashboard/AdminDashboard";


/* Shareholder Dashboard */
import ShareholderDashboard from "./src/components/Shareholderdashboard/ShareholderDashboard";
import ShareholderReport from "./src/components/Shareholderdashboard/ShareholderReport";
import Shareholderfvrt from "./src/components/Shareholderdashboard/Shareholderfvrt";
import ShareholderHistory from "./src/components/Shareholderdashboard/ShareholderHistory";


/* Stack Param List */
export type RootStackParamList = {
  Hero: undefined;
  Business: undefined;
  InfoScreen: undefined;
  Cards: undefined;
  Marketing: undefined;
  Login: undefined;
  Signup: undefined;
  Administrator: undefined;
  ForgetPwd: undefined;
  Password: undefined;
  VerifyEmail: undefined;
  VerifyReset: undefined;
  Dashboard: undefined;
  HomeLayout: undefined;
  ContactDetails2: undefined;
  Shareholder: undefined;
  Expenses: undefined;
  Header2: undefined;
  Sidebar2: undefined;
  ProfileSection: undefined;
  ContactDetails: undefined;
  ShareholderDashboard: undefined;
  Adminreport: undefined;
  ShareholderReport;
  Shareholderfvrt;
  ShareholderHistory;
  Admindashboard;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

/* --- Wrapper for HeroScreen with Header ONLY --- */
const HeroWrapper: React.FC = () => (
  <View style={{ flex: 1 }}>
    <Header />
    <HeroScreen />
  </View>
);

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Hero"
        screenOptions={{ headerShown: false }} // hides native header
      >
        {/* Landing Pages */}
        <Stack.Screen name="Hero" component={HeroWrapper} />
        <Stack.Screen name="Business" component={BusinessScreen} />
        <Stack.Screen name="InfoScreen" component={InfoScreen} />
        <Stack.Screen name="Cards" component={Cards} />
        <Stack.Screen name="Marketing" component={Marketing} />

        {/* Auth */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Administrator" component={Administrator} />
        <Stack.Screen name="ContactDetails" component={ContactDetails} />

        {/* Forget / Reset */}
        <Stack.Screen name="ForgetPwd" component={ForgetPwd} />
        <Stack.Screen name="Password" component={Password} />
        <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
        <Stack.Screen name="VerifyReset" component={VerifyReset} />

        {/* Dashboard / Home */}
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="HomeLayout" component={HomeLayout} />

        {/* HRPanel */}
        <Stack.Screen name="ContactDetails2" component={ContactDetails2} />
        <Stack.Screen name="Header2" component={Header2} />
        <Stack.Screen name="Sidebar2" component={Sidebar2} />
        <Stack.Screen name="ProfileSection" component={ProfileSection} />

        {/* Admin */}
        <Stack.Screen name="Shareholder" component={Shareholder} />
        <Stack.Screen name="Expenses" component={Expenses} />
        <Stack.Screen name="Adminreport" component={Adminreport} />
         <Stack.Screen name="AdminDashboard" component={AdminDashboard} />


         {/* Shareholder */}
          <Stack.Screen name="ShareholderDashboard" component={ShareholderDashboard} />
            <Stack.Screen name="ShareholderReport" component={ShareholderReport} />
             <Stack.Screen name="Shareholderfvrt" component={Shareholderfvrt} />
             <Stack.Screen name="ShareholderHistory" component={ShareholderHistory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
