import './global.css';
import React from 'react';
import { StatusBar } from 'react-native';

import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/contexts/AuthContext';
import { StatusProvider } from './src/components/feedback/StatusProvider';
import { CurrencyProvider } from './src/components/feedback/CurrencyProvider';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([]);
console.error = (error) => {
  console.log("ERROR LOGGED FROM SCREEN: ", error);
}
export default function App() {
  return (
    <>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#000000"
      />
      <AuthProvider>
        <StatusProvider>
          <CurrencyProvider>
            <AppNavigator />
          </CurrencyProvider>
        </StatusProvider>
      </AuthProvider>
    </>
  );
}