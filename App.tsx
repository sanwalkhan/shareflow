import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/Screens/LoginScreen';
import ContactDetails from './src/Screens/ContactDetails';

export type RootStackParamList = {
  Login: undefined;
  ContactDetails: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
     <Stack.Navigator
  initialRouteName="Login"
  screenOptions={{
    headerShown: false, // header + back icon completely hide
  }}
>
  <Stack.Screen name="Login" component={LoginScreen} />
  <Stack.Screen name="ContactDetails" component={ContactDetails} />
</Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
