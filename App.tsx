import React, { useState } from "react";
import LandingScreen from "./src/screens/LandingScreen";
import AuthScreen from "./src/screens/AuthScreen";
import DashboardLayout from "./src/layout/DashboardLayout";

export default function App() {
  const [page, setPage] = useState<"landing" | "auth" | "dashboard">("landing");

  if (page === "landing")
    return <LandingScreen onLoginPress={() => setPage("auth")} />;

  if (page === "auth")
    return <AuthScreen onBack={() => setPage("landing")} />;

  return <DashboardLayout />;
}
