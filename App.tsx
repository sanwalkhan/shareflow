<<<<<<< HEAD

import { Text, View } from "react-native";
 
export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
    </View>
=======
import React from "react";
import { SafeAreaView } from "react-native";
//import { TailwindProvider } from "tailwindcss-react-native";
import LoginScreen from "./src/Screens/LoginScreen";
 import './global.css';

const App: React.FC = () => {
  return (
  
      <SafeAreaView className="flex-1">
        <LoginScreen />
      </SafeAreaView>
 
>>>>>>> f0ab0405882ca33d2bdf4ad2e9ea7e31144cf06d
  );
}