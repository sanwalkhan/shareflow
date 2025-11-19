import React from "react";
import { View, ScrollView, Text, Dimensions } from "react-native";

// HRPanel Components
import Header2 from "../components/HrPanel/Header2";
import Sidebar2 from "../components/HrPanel/Sidebar2";
import ProfileSection from "../components/HrPanel/ProfileSection";

const { width } = Dimensions.get("window");

const Dashboard: React.FC = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#f3f3f3" }}>
      {/* Header */}
      <Header2 />

      <View style={{ flex: 1, flexDirection: "row" }}>
        {/* Sidebar only on large screens */}
        {width >= 768 && <Sidebar2 />}

        {/* Main content */}
        <ScrollView style={{ flex: 1, padding: 16 }}>
          <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 16 }}>
            HR Dashboard
          </Text>

          {/* Profile Section */}
          <ProfileSection />

          {/* Additional content */}
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 16, marginBottom: 8 }}>
              Welcome to the HR Dashboard. Here you can manage employee information, view contact details, and navigate to different sections.
            </Text>

            <Text style={{ fontSize: 16, marginBottom: 8 }}>
              Use the sidebar to access Personal Details, Contact Details, Next of Kin Details, Education Qualifications, and more.
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Dashboard;
