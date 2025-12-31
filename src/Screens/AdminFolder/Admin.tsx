// src/screens/AdminFolder/Admin.tsx
import React, { useState } from "react";
import { View } from "react-native";

// Admin Screens
import ADDashboard from "../../components/Admin/Admindashboard/ADDashboard";
import AdminAnalytics from "../../components/Admin/Admindashboard/AdminAnalytic";
import AdminShareholder from "../../components/Admin/Admindashboard/AdminShareholder";
import AdminExpenses from "../../components/Admin/Admindashboard/AdminExpenses";
import AdminPayrol from "../../components/Admin/Admindashboard/Adminpayrol";
import ADReport from "../../components/Admin/Admindashboard/ADReport";
import AdminHistory from "../../components/Admin/Admindashboard/AdminHistory";
import AdminSetting from "../../components/Admin/Admindashboard/Adminsetting";
import AdminMessage from "../../components/Admin/Admindashboard/AdminMessage";
import Adminfvrt from "../../components/Admin/Admindashboard/Adminfvrt";
import AdminHelp from "../../components/Admin/Admindashboard/AdminHelp";

// Sidebar
import ADSidebar from "../../components/Admin/Admindashboard/ADsidebar";

export type Tab =
  | "Dashboard"
  | "Analytics"
  | "Shareholder"
  | "Expenses"
  | "Payroll"
  | "Reports"
  | "History"
  | "Settings"
  | "Messages"
  | "Favourite"
  | "Help";

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("Dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard": return <ADDashboard />;
      case "Analytics": return <AdminAnalytics />;
      case "Shareholder": return <AdminShareholder />;
      case "Expenses": return <AdminExpenses />;
      case "Payroll": return <AdminPayrol />;
      case "Reports": return <ADReport />;
      case "History": return <AdminHistory />;
      case "Settings": return <AdminSetting />;
      case "Messages": return <AdminMessage />;
      case "Favourite": return <Adminfvrt />;
      case "Help": return <AdminHelp />;
      default: return <View />;
    }
  };

  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      {/* Sidebar */}
      <ADSidebar
        activeTab={activeTab}
        onSelect={(tab) => setActiveTab(tab)}
      />

      {/* Screen Content */}
      <View style={{ flex: 1 }}>
        {renderContent()}
      </View>
    </View>
  );
};

export default Admin;
