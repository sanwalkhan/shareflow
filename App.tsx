// App.tsx
import "./global.css";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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




export type RootStackParamList = {
  Hero: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
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




      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
