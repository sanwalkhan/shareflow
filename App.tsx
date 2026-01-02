// App.tsx
import "./global.css";
import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";

/* ======================
   FONTS
====================== */
import { Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { Inter_400Regular } from "@expo-google-fonts/inter";

/* Header */
import Header from "./src/components/LandingPages/Header";

/* HR */
import HrDashboardLayout from "./src/components/Hr-panel/Hr-side/HrLayout";
import HrRegister from "./src/components/Hr-panel/Hr & employer/Register";
import HrLogin from "./src/components/Hr-panel/Hr & employer/Login";
import HrManagement from "./src/components/Hr-panel/Hr & employer/Hr-Managementlayout";
import HrDashboard from "./src/components/Hr-panel/Hr & employer/Dashboard";
import Leave from "./src/components/Hr-panel/Hr & employer/Leave";
import AnnualLeave from "./src/components/Hr-panel/Hr & employer/Annual-leave";
import SickLeave from "./src/components/Hr-panel/Hr & employer/Sick-leave";
import LeaveRecall from "./src/components/Hr-panel/Hr & employer/Leave-recall";
/* Sidebar */
import Sidebar from "./src/components/Shareholderdashboard/sidebar";

/* Landing Pages */
import HeroScreen from "./src/components/LandingPages/HeroScreen";
import BusinessScreen from "./src/components/LandingPages/BusinessScreen";
import InfoScreen from "./src/components/LandingPages/InfoScreen";
import Cards from "./src/components/LandingPages/CardsScreen";
import Marketing from "./src/components/LandingPages/Marketing";

/* Auth */
import LoginScreen from "./src/components/Login/LoginScreen";
import SignupScreen from "./src/components/SignUp/SignupScreen";
import Administrator from "./src/components/SignUp/Administrator";
import ContactDetails from "./src/components/SignUp/ContactDetails";

/* Reset */
import ForgetPwd from "./src/components/ForgetEmailPWD/Forgetpwd";
import Password from "./src/components/ForgetEmailPWD/Password";
import VerifyEmail from "./src/components/ForgetEmailPWD/VerifyEmail";
import VerifyReset from "./src/components/ForgetEmailPWD/VerifyReset";

/* Home */
import HomeLayout from "./src/Screens/HomeFolder/HomeLayout";

/* Admin */
import Shareholder from "./src/components/Shareholderdashboard/Shareholder";
import Expenses from "./src/components/Shareholderdashboard/Expenses";
import Adminreport from "./src/components/Admin/Admindashboard/Adminreport";
import AdminDashboard from "./src/components/Admin/Admindashboard/AdminDashboard";
import ADDashboard from "./src/components/Admin/Admindashboard/ADDashboard";
import AdminAnalytic from "./src/components/Admin/Admindashboard/AdminAnalytic";
import Adminfvrt from "./src/components/Admin/Admindashboard/Adminfvrt";
import AdminHelp from "./src/components/Admin/Admindashboard/AdminHelp";
import AdminHistory from "./src/components/Admin/Admindashboard/AdminHistory";
import AdminMessage from "./src/components/Admin/Admindashboard/AdminMessage";
import Adminpayrol from "./src/components/Admin/Admindashboard/Adminpayrol";
import Adminsetting from "./src/components/Admin/Admindashboard/Adminsetting";
import ADReport from "./src/components/Admin/Admindashboard/ADReport";
import AdminShareholder from "./src/components/Admin/Admindashboard/AdminShareholder";
import AdminExpenses from "./src/components/Admin/Admindashboard/AdminExpenses";

/* Shareholder */
import ShareholderDashboard from "./src/components/Shareholderdashboard/ShareholderDashboard";
import ShareholderReport from "./src/components/Shareholderdashboard/ShareholderReport";
import Shareholderfvrt from "./src/components/Shareholderdashboard/Shareholderfvrt";
import ShareholderHistory from "./src/components/Shareholderdashboard/ShareholderHistory";
import ShareholderAnalytic from "./src/components/Shareholderdashboard/ShareholderAnalytic";
import ShareholderHelp from "./src/components/Shareholderdashboard/ShareholderHelp";
import ShareholderMessage from "./src/components/Shareholderdashboard/ShareholderMessage";
import Shareholderpayrol from "./src/components/Shareholderdashboard/Shareholderpayrol";
import Shareholdersetting from "./src/components/Shareholderdashboard/Shareholdersetting";

/* ======================
   STACK TYPES
====================== */
export type RootStackParamList = {
  Hero: undefined;
  Business: undefined;
  InfoScreen: undefined;
  Cards: undefined;
  Marketing: undefined;

  Login: undefined;
  Signup: undefined;
  Administrator: undefined;
  ContactDetails: undefined;

  ForgetPwd: undefined;
  Password: undefined;
  VerifyEmail: undefined;
  VerifyReset: undefined;

  HrDashboardLayout: undefined;
  HrDashboard: undefined;
  Leave: undefined;
  AnnualLeave: undefined;
  SickLeave: undefined;
  LeaveRecall: undefined;

  HrRegister: undefined;
  HrLogin: undefined;
  HrManagement: undefined;

  HomeLayout: undefined;

  ShareholderDashboard: undefined;
  Shareholder: undefined;
  Expenses: undefined;
  Adminreport: undefined;
  AdminDashboard: undefined;

  ShareholderReport: any;
  Shareholderfvrt: any;
  ShareholderHistory: any;
  ShareholderAnalytic: any;
  ShareholderHelp: any;
  ShareholderMessage: any;
  Shareholderpayrol: any;
  Shareholdersetting: any;

  ADDashboard: any;
  AdminAnalytic: any;
  Adminfvrt: any;
  AdminHelp: any;
  AdminHistory: any;
  AdminMessage: any;
  Adminpayrol: any;
  Adminsetting: any;
  ADReport: any;
  AdminShareholder: any;
  AdminExpenses: any;

  Sidebar: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

/* Hero wrapper */
const HeroWrapper: React.FC = () => (
  <View style={{ flex: 1 }}>
    <Header />
    <HeroScreen />
  </View>
);

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Inter_400Regular,
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Hero"
        screenOptions={{ headerShown: false }}
      >
        {/* Landing */}
        <Stack.Screen name="Hero" component={HeroWrapper} />
        <Stack.Screen name="Business" component={BusinessScreen} />
        <Stack.Screen name="InfoScreen" component={InfoScreen} />
        <Stack.Screen name="Cards" component={Cards} />
        <Stack.Screen name="Marketing" component={Marketing} />

        {/* HR MAIN LAYOUT */}
        <Stack.Screen
          name="HrDashboardLayout"
          component={HrDashboardLayout}
        />

        {/* HR PAGES (Breadcrumb targets) */}
        <Stack.Screen name="HrDashboard" component={HrDashboard} />
        <Stack.Screen name="Leave" component={Leave} />
        <Stack.Screen name="AnnualLeave" component={AnnualLeave} />
        <Stack.Screen name="SickLeave" component={SickLeave} />
        <Stack.Screen name="LeaveRecall" component={LeaveRecall} />

        {/* HR AUTH */}
        <Stack.Screen name="HrRegister" component={HrRegister} />
        <Stack.Screen name="HrLogin" component={HrLogin} />
        <Stack.Screen name="HrManagement" component={HrManagement} />
        

        {/* Auth */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Administrator" component={Administrator} />
        <Stack.Screen name="ContactDetails" component={ContactDetails} />

        {/* Reset */}
        <Stack.Screen name="ForgetPwd" component={ForgetPwd} />
        <Stack.Screen name="Password" component={Password} />
        <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
        <Stack.Screen name="VerifyReset" component={VerifyReset} />

        {/* Home */}
        <Stack.Screen name="HomeLayout" component={HomeLayout} />

        {/* Admin */}
        <Stack.Screen name="Shareholder" component={Shareholder} />
        <Stack.Screen name="Expenses" component={Expenses} />
        <Stack.Screen name="Adminreport" component={Adminreport} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="ADDashboard" component={ADDashboard} />
        <Stack.Screen name="AdminAnalytic" component={AdminAnalytic} />
        <Stack.Screen name="Adminfvrt" component={Adminfvrt} />
        <Stack.Screen name="AdminHelp" component={AdminHelp} />
        <Stack.Screen name="AdminHistory" component={AdminHistory} />
        <Stack.Screen name="AdminMessage" component={AdminMessage} />
        <Stack.Screen name="Adminpayrol" component={Adminpayrol} />
        <Stack.Screen name="Adminsetting" component={Adminsetting} />
        <Stack.Screen name="ADReport" component={ADReport} />
        <Stack.Screen name="AdminShareholder" component={AdminShareholder} />
        <Stack.Screen name="AdminExpenses" component={AdminExpenses} />

        {/* Shareholder */}
        <Stack.Screen
          name="ShareholderDashboard"
          component={ShareholderDashboard}
        />
        <Stack.Screen name="ShareholderReport" component={ShareholderReport} />
        <Stack.Screen name="Shareholderfvrt" component={Shareholderfvrt} />
        <Stack.Screen
          name="ShareholderHistory"
          component={ShareholderHistory}
        />
        <Stack.Screen
          name="ShareholderAnalytic"
          component={ShareholderAnalytic}
        />
        <Stack.Screen name="ShareholderHelp" component={ShareholderHelp} />
        <Stack.Screen
          name="ShareholderMessage"
          component={ShareholderMessage}
        />
        <Stack.Screen
          name="Shareholderpayrol"
          component={Shareholderpayrol}
        />
        <Stack.Screen
          name="Shareholdersetting"
          component={Shareholdersetting}
        />

        {/* Sidebar */}
        <Stack.Screen name="Sidebar" component={Sidebar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
