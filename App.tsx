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
