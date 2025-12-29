import "./global.css";
import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";

/* Google Fonts */
import { Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { Inter_400Regular } from "@expo-google-fonts/inter";

/* Header */
import Header from "./src/components/HeaderFooter/Header";
import HrLayout from "./src/components/Hr-profile/HrLayout";
import HrRegister from "./src/components/Hr-Management/Register";
import HrLogin from "./src/components/Hr-Management/Login";
import HrManagement from "./src/components/Hr-Management/Hr-Managementlayout";
import SettingsLayout from "./src/components/Settings-pages/Settings-layout"; // ✅ ADD THIS

/* Landing Pages */
import HeroScreen from "./src/components/LandingPages/HeroScreen";
import BusinessScreen from "./src/components/LandingPages/BusinessScreen";
import InfoScreen from "./src/components/LandingPages/InfoScreen";
import Cards from "./src/components/LandingPages/Cards";
import Marketing from "./src/components/LandingPages/Marketing";

/* Auth */
import LoginScreen from "./src/components/Login/LoginScreen";
import SignupScreen from "./src/components/SignUp/SignupScreen";
import Administrator from "./src/components/SignUp/Administrator";
import ContactDetails from "./src/components/SignUp/ContactDetails";

/* Reset / Verify */
import ForgetPwd from "./src/components/ForgetEmailPWD/Forgetpwd";
import Password from "./src/components/ForgetEmailPWD/Password";
import VerifyEmail from "./src/components/ForgetEmailPWD/VerifyEmail";
import VerifyReset from "./src/components/ForgetEmailPWD/VerifyReset";

/* Dashboard */
import Dashboard from "./src/Screens/DashboardFolder/Dashboard";
import HomeLayout from "./src/Screens/HomeFolder/HomeLayout";

const Stack = createNativeStackNavigator();

/* Hero wrapper */
const HeroWrapper = () => (
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

  if (!fontsLoaded) {
    return null;
  }

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

        {/* HR */}
        <Stack.Screen name="HrDashboard" component={HrLayout} />
        <Stack.Screen name="HrRegister" component={HrRegister} />
        <Stack.Screen name="HrLogin" component={HrLogin} />
        <Stack.Screen name="HrLayout" component={HrManagement} />

        {/* ✅ SETTINGS (NEW) */}
        <Stack.Screen name="Settings" component={SettingsLayout} />

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

        {/* Dashboard */}
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="HomeLayout" component={HomeLayout} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
