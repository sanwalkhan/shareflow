import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import Sidebar from "./Sidebar";
import { COLORS, HR_THEME } from "../../Constants/theme";

/* Pages */
import Personal from "./Personal";
import Contact from "./Contact";
import Next from "./Next";
import Education from "./Education";
import EducationRecords from "./EducationRecords";
import Guarantor from "./Guarantor";
import Family from "./Family";
import Job from "./Job";
import Financial from "./Financial";
import GuarantorDetails from "./GuarantorDetails";
import FamilyDetails from "./FamilyDetails";
import JobUploads from "./JobUploads";
import JobDocs from "./JobDocs";
import FinancialDetails from "./FinancialDetails";

const HrLayout = () => {
  const [activePage, setActivePage] = useState("personal");
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const renderPage = () => {
    switch (activePage) {
      case "contact": return <Contact />;
      case "next": return <Next />;
      case "education": return <Education />;
      case "educationrecords": return <EducationRecords />;
      case "guarantor": return <Guarantor />;
      case "guarantordetails": return <GuarantorDetails />;
      case "family": return <Family />;
      case "familydetails": return <FamilyDetails />;
      case "job": return <Job />;
      case "jobuploads": return <JobUploads />;
      case "jobdocs": return <JobDocs />;
      case "financial": return <Financial />;
      case "financialdetails": return <FinancialDetails />;
      default: return <Personal />;
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.hrBg }}
      contentContainerStyle={{
        paddingHorizontal: isMobile ? 16 : 32,
        paddingVertical: 28,
      }}
    >
      {/* Breadcrumb */}
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: HR_THEME.card.radius,
          paddingVertical: 16,
          paddingHorizontal: 20,
          marginBottom: 24,
        }}
      >
        <Text
          style={{
            fontFamily: HR_THEME.fonts.body,
            fontSize: 14,
            color: HR_THEME.text.muted,
          }}
        >
          Dashboard &gt; Update Profile
        </Text>
      </View>

      {/* Main Layout */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          gap: isMobile ? 5 : 20, // ✅ FIX HERE
        }}
      >
        {/* Sidebar */}
        <Sidebar activePage={activePage} onChangePage={setActivePage} />

        {/* Right Content */}
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            borderRadius: HR_THEME.card.radius,
            padding: isMobile ? 20 : 36,
            minHeight: 500,
          }}
        >
          {renderPage()}
        </View>
      </View>
    </ScrollView>
  );
};

export default HrLayout;
