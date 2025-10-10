// App.tsx
import './global'; // Ensure global styles are imported first
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StatusBar, Text, View, TouchableOpacity } from 'react-native';
import SignInScreen from './src/components/SigninScreen';
import AuthScreen from './src/screens/AuthScreen';
import { COLORS } from './src/constants/theme';
import ForgotPasswordScreen from './src/components/ForgetPassword';

// Simple Home Screen for navigation testing
function HomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.primary }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      
      <View style={{ alignItems: 'center', padding: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 40 }}>
          <View style={{ 
            width: 52, 
            height: 52, 
            borderRadius: 16, 
            backgroundColor: 'rgba(134, 194, 50, 0.15)',
            borderWidth: 1.5,
            borderColor: 'rgba(134, 194, 50, 0.3)',
            justifyContent: 'center', 
            alignItems: 'center',
            marginRight: 12 
          }}>
            <Text style={{ color: COLORS.accent, fontSize: 24, fontWeight: 'bold' }}>S</Text>
          </View>
          <Text style={{ color: COLORS.textLight, fontSize: 32, fontWeight: '800' }}>
            Share<Text style={{ color: COLORS.accent }}>Flow</Text>
          </Text>
        </View>

        <Text style={{ color: COLORS.textLight, fontSize: 24, fontWeight: '700', marginBottom: 10, textAlign: 'center' }}>
          Welcome to ShareFlow
        </Text>
        <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, marginBottom: 40, textAlign: 'center' }}>
          Enterprise Financial Intelligence Platform
        </Text>

        <TouchableOpacity 
          style={{
            backgroundColor: COLORS.accent,
            paddingHorizontal: 32,
            paddingVertical: 16,
            borderRadius: 12,
            marginBottom: 16,
            width: 280,
            alignItems: 'center',
            shadowColor: COLORS.accent,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 16,
            elevation: 8,
          }}
          onPress={() => navigation.navigate('SignIn')}
        >
          <Text style={{ color: COLORS.black, fontSize: 16, fontWeight: '700' }}>
            Sign In
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            paddingHorizontal: 32,
            paddingVertical: 16,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.2)',
            width: 280,
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('Auth')}
        >
          <Text style={{ color: COLORS.textLight, fontSize: 16, fontWeight: '600' }}>
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <Stack.Navigator 
  initialRouteName="Home"
  screenOptions={{
    headerShown: false,
    cardStyle: { backgroundColor: COLORS.primary }
  }}
>
  <Stack.Screen name="Home" component={HomeScreen} />
  <Stack.Screen name="SignIn" component={SignInScreen} />
  <Stack.Screen name="Auth" component={AuthScreen} />
  <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
</Stack.Navigator>
    </NavigationContainer>
  );
}