import React from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { COLORS } from "../constants/theme";
import { useAuth } from "../contexts/AuthContext";

import LandingScreen from "../screens/LandingScreen";
import AuthScreen from "../screens/AuthScreen";
import AdminDashboardScreen from "../screens/admin/AdminDashboardScreen";
import ShareholderDashboardScreen from "../screens/ShareholderDashboardScreen";
import SigninScreen from "../components/SigninScreen";
import ForgetPassword from "../components/ForgetPassword";

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: COLORS.primary 
      }}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </View>
    );
  }

  const getInitialRoute = () => {
    if (!isAuthenticated) return "ShareholderDashboard";
    if (user?.role === 'admin') return "AdminDashboard";
    if (user?.role === 'shareholder') return "ShareholderDashboard";
    return "Landing";
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={getInitialRoute()}
        screenOptions={{
          headerShown: false,
        }}
      > 
        {/* Public Routes */}
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        
        {/* Protected Routes */}
        <Stack.Screen 
          name="AdminDashboard" 
          component={AdminDashboardScreen}
          options={{
            gestureEnabled: false, // Prevent swipe back
          }}
        />
        <Stack.Screen 
          name="ShareholderDashboard" 
          component={ShareholderDashboardScreen}
          options={{
            gestureEnabled: false, // Prevent swipe back
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}