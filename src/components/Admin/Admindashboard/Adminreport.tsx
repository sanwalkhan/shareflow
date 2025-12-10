// src/components/Admin/Admindashboard/AdminReport.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const COLORS = {
  primary: "#193288",
  yellow: "#FFC20E",
  card: "#000",
  white: "#fff",
};

const projects = [
  {
    name: "Shareholder Portal System",
    progress: 70,
    deadline: "28 Feb 2025",
    status: "In Progress",
  },
  {
    name: "Dividend Automation",
    progress: 45,
    deadline: "15 Jan 2025",
    status: "Pending",
  },
  {
    name: "Equity Validation Tool",
    progress: 92,
    deadline: "10 Dec 2024",
    status: "Completed",
  },
];

const AdminReport = () => {
  const [activeTab, setActiveTab] = useState("Report");

  return (
    <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#E5EDFF" }}>
       
      {/* ---------------- SIDEBAR ---------------- */}
      <View style={{ width: 250, backgroundColor: COLORS.primary, padding: 24 }}>
        <Text style={{ color: COLORS.white, fontSize: 22, fontWeight: "800", marginBottom: 30 }}>
          Admin Panel
        </Text>

        {[
          { label: "Dashboard", icon: "speedometer-outline" },
          { label: "Projects", icon: "folder-open-outline" },
          { label: "Report", icon: "document-text-outline" },
          { label: "Users", icon: "people-outline" },
        ].map((item) => {
          const isActive = activeTab === item.label;
          return (
            <TouchableOpacity
              key={item.label}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 12,
                backgroundColor: isActive ? COLORS.yellow : "transparent",
              }}
              onPress={() => setActiveTab(item.label)}
            >
              <Ionicons
                name={item.icon as any}
                size={22}
                color={isActive ? "#000" : COLORS.white}
                style={{ marginRight: 10 }}
              />
              <Text
                style={{
                  color: isActive ? "#000" : COLORS.white,
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <View style={{ flex: 1 }}>
        
        {/* HEADER */}
        <View
          style={{
            backgroundColor: COLORS.primary,
            paddingVertical: 26,
            paddingHorizontal: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="document-text-outline" size={26} color="#fff" style={{ marginRight: 6 }} />
            <Text style={{ color: COLORS.white, fontSize: 22, fontWeight: "700" }}>
              Project Reports
            </Text>
          </View>

          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={26} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* PROJECT REPORT LIST */}
        <ScrollView style={{ padding: 20 }}>
          {projects.map((project, index) => (
            <View
              key={index}
              style={{
                backgroundColor: COLORS.card,
                padding: 18,
                borderRadius: 14,
                marginBottom: 18,
              }}
            >
              <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: "700", marginBottom: 8 }}>
                {project.name}
              </Text>

              <Text style={{ color: "#ccc" }}>Deadline: {project.deadline}</Text>
              <Text style={{ color: "#ccc" }}>Status: {project.status}</Text>

              {/* PROGRESS BAR */}
              <View style={{ marginTop: 10 }}>
                <Text style={{ color: "#ccc", marginBottom: 4 }}>Progress</Text>
                <View
                  style={{
                    height: 10,
                    backgroundColor: "#222",
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  <View
                    style={{
                      width: `${project.progress}%`,
                      backgroundColor: COLORS.yellow,
                      height: "100%",
                    }}
                  />
                </View>

                <Text style={{ color: COLORS.white, marginTop: 4 }}>
                  {project.progress}% Completed
                </Text>
              </View>

              {/* Button */}
              <TouchableOpacity
                style={{
                  marginTop: 12,
                  backgroundColor: COLORS.yellow,
                  paddingVertical: 8,
                  borderRadius: 8,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#000", fontWeight: "700" }}>View Full Report</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default AdminReport;
