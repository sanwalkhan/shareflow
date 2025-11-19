import React from "react";
import { View, ScrollView, Text, Dimensions } from "react-native";

// HRPanel Components
import Header2 from "../components/HRPanel/Header2";
import Sidebar2 from "../components/HRPanel/Sidebar2";
import ProfileSection2 from "../components/HRPanel/ProfileSection2";

const { width } = Dimensions.get("window");

const ContactDetails2: React.FC = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#f3f3f3" }}>
      {/* Header */}
      <Header2 />

      <View style={{ flex: 1, flexDirection: "row" }}>
        {/* Sidebar only on large screens */}
        {width >= 768 && <Sidebar2 />}

        {/* Main content */}
        <ScrollView style={{ flex: 1, padding: 16 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
            Contact Details 2
          </Text>
          {/* Profile Section */}
          <ProfileSection2 />
        </ScrollView>
      </View>
    </View>
  );
};

export default ContactDetails2;
