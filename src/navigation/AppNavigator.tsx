import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LandingScreen from "../screens/LandingScreen";
import AuthScreen from "../screens/AuthScreen";
import AdminDashboardScreen from "../screens/admin/AdminDashboardScreen";
import SigninScreen from "../components/SigninScreen";
import  ForgetPassword from "../components/ForgetPassword";
import ShareholderDashboardScreen from "../screens/shareholder/ShareholderDashboardScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AdminDashboard"
        screenOptions={{
          headerShown: false,
        }}
      > 
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="ShareholderDashboard" component={ShareholderDashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
