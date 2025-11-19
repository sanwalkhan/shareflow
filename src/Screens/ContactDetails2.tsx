import React from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import Header2 from "./HRPanel/Header2";
import Sidebar2 from "./HRPanel/Sidebar2";

const { width } = Dimensions.get("window");

const ContactDetails2: React.FC = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#f3f3f3" }}>
      {/* Header */}
      <Header2 />

      <View style={{ flex: 1, flexDirection: "row" }}>
        {/* Sidebar: visible on large screens */}
        {width >= 768 && <Sidebar2 />}

        {/* Main Content */}
        <ScrollView style={{ flex: 1, padding: 16 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
            Contact Details 2 Screen
          </Text>
          <Text style={{ marginBottom: 16 }}>
            This is the extended Contact Details page. You can display additional information, forms, or tabs here.
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default ContactDetails2;
