<<<<<<< Updated upstream
// App.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import LandingScreen from "./src/screens/LandingScreen";

export default function App() {
  const [page, setPage] = useState<"landing" | "auth" | "dashboard">("landing");

  if (page === "auth") {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#46344e" }}>
        <Text style={{ color: "#faed26", fontSize: 20, fontWeight: "700", marginBottom: 16 }}>Auth screen (placeholder)</Text>
        <TouchableOpacity onPress={() => setPage("landing")} style={{ backgroundColor: "#faed26", padding: 12, borderRadius: 10 }}>
          <Text style={{ color: "#46344e", fontWeight: "700" }}>Back to Landing</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (page === "dashboard") {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Dashboard (placeholder)</Text>
      </View>
    );
  }

  return <LandingScreen onLoginPress={() => setPage("auth")} />;
}
=======
import './global.css';
import React from 'react';

import AppNavigator from './src/navigation/AppNavigator';
import ToastManager from 'toastify-react-native'

export default function App() {

  return<>
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
  
   <AppNavigator /></>;
}
>>>>>>> Stashed changes
