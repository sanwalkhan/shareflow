import './global.css';
import React from 'react';

import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/contexts/AuthContext';
import { StatusProvider } from './src/components/feedback/StatusProvider';
import { CurrencyProvider } from './src/components/feedback/CurrencyProvider';
import ToastManager from 'toastify-react-native'

export default function App() {
  return <>
    <ToastManager position="top-right" toastOptions={{
      className: "bg-primary text-white",
      duration: 3000,
      style: {
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: 10,
        padding: 10,
        margin: 10,
        color: "white",
        fontSize: 16,
      },
    }}/>
    <AuthProvider>
      <StatusProvider>
        <CurrencyProvider>
          <AppNavigator />
        </CurrencyProvider>
      </StatusProvider>
    </AuthProvider>
  </>;
}