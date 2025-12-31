// App.tsx
import "./global.css";
import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


/* Sidebar */
import sidebar from "./src/components/Shareholderdashboard/sidebar";
import ADsidebar from "./src/components/Admin/Admindashboard/ADsidebar";

/* Landing Pages */
import HeroScreen from "./src/components/LandingPages/HeroScreen";
import BusinessScreen from "./src/components/LandingPages/BusinessScreen";
import InfoScreen from "./src/components/LandingPages/InfoScreen";
import Cards from "./src/components/LandingPages/Cards";
import Marketing from "./src/components/LandingPages/Marketing";
import Header from "./src/components/LandingPages/Header";

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



/* Shareholder Dashboard */
import ShareholderDashboard from "./src/components/Shareholderdashboard/ShareholderDashboard";
import ShareholderReport from "./src/components/Shareholderdashboard/ShareholderReport";
import Shareholderfvrt from "./src/components/Shareholderdashboard/Shareholderfvrt";
import ShareholderHistory from "./src/components/Shareholderdashboard/ShareholderHistory";
import ShareholderAnalytic from "./src/components/Shareholderdashboard/ShareholderAnalytic";
import ShareholderHelp from "./src/components/Shareholderdashboard/ShareholderHelp";
import ShareholderMessage from "./src/components/Shareholderdashboard/ShareholderMessage";
import Shareholderpayrol from "./src/components/Shareholderdashboard/Shareholderpayrol";
import Shareholdersetting from "./src/components/Shareholderdashboard/Shareholdersetting";



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
  sidebar;
  ADsidebar;
  ShareholderAnalytic;
  ShareholderHelp;
  ShareholderMessage;
  Shareholderpayrol;
  Shareholdersetting;
  ADDashboard;
  AdminAnalytic;
  Adminfvrt;
  AdminHelp;
  AdminHistory;
  AdminMessage;
  Adminpayrol;
  Adminsetting;
  ADReport;
  ADDashboard;
  AdminShareholder;
  AdminExpenses;
  

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
       
        <Stack.Screen name="HomeLayout" component={HomeLayout} />

    
       

        {/* Admin */}
        <Stack.Screen name="Shareholder" component={Shareholder} />
        <Stack.Screen name="Expenses" component={Expenses} />
        <Stack.Screen name="Adminreport" component={Adminreport} />
         <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
         <Stack.Screen name="AdminAnalytic" component={AdminAnalytic} />
         <Stack.Screen name="Adminfvrt" component={Adminfvrt} />

         <Stack.Screen name="AdminHelp" component={AdminHelp} />
         <Stack.Screen name="AdminHistory" component={AdminHistory} />
         <Stack.Screen name="AdminMessage" component={AdminMessage} />
         <Stack.Screen name="Adminpayrol" component={Adminpayrol} />
       
         <Stack.Screen name="Adminsetting" component={Adminsetting} />
         <Stack.Screen name="ADReport" component={ADReport} />
         <Stack.Screen name="ADDashboard" component={ADDashboard} />
          <Stack.Screen name="AdminShareholder" component={AdminShareholder} />
          <Stack.Screen name="AdminExpenses" component={AdminExpenses} />


         {/* Shareholder */}
          <Stack.Screen name="ShareholderDashboard" component={ShareholderDashboard} />
            <Stack.Screen name="ShareholderReport" component={ShareholderReport} />
             <Stack.Screen name="Shareholderfvrt" component={Shareholderfvrt} />
             <Stack.Screen name="ShareholderHistory" component={ShareholderHistory} />
               <Stack.Screen name="ShareholderAnalytic" component={ShareholderAnalytic} />
                <Stack.Screen name="Shareholderpayrol" component={Shareholderpayrol} />
                 <Stack.Screen name="Shareholdersetting" component={Shareholdersetting} /> 
              <Stack.Screen name="ShareholderHelp" component={ShareholderHelp} />
                     <Stack.Screen name="ShareholderMessage" component={ShareholderMessage} />
                     

               {/* SidebarComponent */}
             <Stack.Screen name="sidebar" component={sidebar} />

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
