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
 
  );
};

export default App;
