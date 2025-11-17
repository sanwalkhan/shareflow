import React from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../contexts/AuthContext";

import LandingScreen from "../screens/LandingScreen";
import AuthScreen from "../screens/AuthScreen";
import AdminDashboardScreen from "../screens/admin/AdminDashboardScreen";
import ShareholderDashboardScreen from "../screens/shareholder/ShareholderDashboardScreen";
import SigninScreen from "../components/SigninScreen";
import ForgetPassword from "../components/ForgetPassword";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-blue-500">
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  const getInitialRoute = () => {
    if (!isAuthenticated) return "Landing";
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
          animation: 'slide_from_right', // Android-like animation
          gestureEnabled: true, // Enable Android gestures
          fullScreenGestureEnabled: true, // Better for Android
        }}
      > 
        {/* Public Routes */}
        <Stack.Screen 
          name="Landing" 
          component={LandingScreen}
          options={{
            gestureEnabled: false, // Disable back gesture on landing
          }}
        />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        
        {/* Protected Routes */}
        <Stack.Screen 
          name="AdminDashboard" 
          component={AdminDashboardScreen}
          options={{
            gestureEnabled: false, // Prevent swipe back on dashboard
            animation: 'fade', // Different animation for dashboard
          }}
        />
        <Stack.Screen 
          name="ShareholderDashboard" 
          component={ShareholderDashboardScreen}
          options={{
            gestureEnabled: false, // Prevent swipe back on dashboard
            animation: 'fade', // Different animation for dashboard
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}