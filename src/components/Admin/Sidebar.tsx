// src/components/Admin/Sidebar.tsx
import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Animated } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../utils/responsive";

interface SidebarProps {
  isSidebarCollapsed: boolean;
  activeModule: string;
  setActiveModule: (module: string) => void;
  toggleSidebar: () => void;
  handleLogout: () => void;
  sidebarWidth: Animated.Value;
  sidebarOpacity: Animated.Value;
}

const sidebarItems = [
  { id: "overview", icon: "home", label: "Dashboard", color: COLORS.accent },
  { id: "expenses", icon: "credit-card", label: "Expenses", color: "#8B5CF6" },
  { id: "payroll", icon: "users", label: "Payroll", color: "#06B6D4" },
  { id: "shareholders", icon: "pie-chart", label: "Shareholders", color: "#10B981" },
  { id: "reports", icon: "bar-chart-2", label: "Analytics", color: "#F59E0B" },
  { id: "settings", icon: "settings", label: "Settings", color: COLORS.tertiary },
];

export default function Sidebar({
  isSidebarCollapsed,
  activeModule,
  setActiveModule,
  toggleSidebar,
  handleLogout,
  sidebarWidth,
  sidebarOpacity,
}: SidebarProps) {
  return (
    <Animated.View 
      style={{ 
        width: sidebarWidth,
        opacity: sidebarOpacity,
        backgroundColor: COLORS.neutral,
      }}
      className="shadow-xl z-50"
    >
      <View className="flex-1">
        {/* Sidebar Header */}
        <View className="p-4 lg:p-6 border-b flex-row items-center justify-between" style={{ borderColor: COLORS.secondary }}>
          <View className="flex-row items-center">
            <View 
              className="w-10 h-10 lg:w-11 lg:h-11 rounded-xl justify-center items-center mr-2 lg:mr-3"
              style={{ backgroundColor: `${COLORS.accent}20`, borderColor: `${COLORS.accent}40`, borderWidth: 1 }}
            >
              <Feather name="trending-up" size={24} color={COLORS.accent} />
            </View>
            {!isSidebarCollapsed && (
              <View>
                <Text className="text-lg lg:text-xl font-extrabold tracking-tight" style={{ color: COLORS.white }}>
                  Share<Text style={{ color: COLORS.accent }}>Flow</Text>
                </Text>
                <Text className="text-xs font-bold tracking-wide mt-0.5" style={{ color: COLORS.accent }}>
                  ENTERPRISE
                </Text>
              </View>
            )}
          </View>
          
          <TouchableOpacity 
            className="w-8 h-8 lg:w-9 lg:h-9 rounded-xl justify-center items-center"
            style={{ backgroundColor: COLORS.secondary, borderColor: COLORS.tertiary, borderWidth: 1 }}
            onPress={toggleSidebar}
          >
            <Feather 
              name={isSidebarCollapsed ? "chevron-right" : "chevron-left"} 
              size={16} 
              color={COLORS.white} 
            />
          </TouchableOpacity>
        </View>

        {/* Navigation Items */}
        <ScrollView 
          className="flex-1 py-3 lg:py-5"
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
        >
          {sidebarItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              className={`mx-2 lg:mx-3 my-1 rounded-xl overflow-hidden`}
              onPress={() => setActiveModule(item.id)}
              style={activeModule === item.id ? { 
                shadowColor: COLORS.accent,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              } : {}}
            >
              <View 
                className="flex-row items-center px-3 lg:px-4 py-3 lg:py-3.5"
                style={activeModule === item.id ? { backgroundColor: `${COLORS.accent}30` } : {}}
              >
                <View 
                  className="w-8 h-8 lg:w-9 lg:h-9 rounded-xl justify-center items-center shadow-sm"
                  style={{ backgroundColor: activeModule === item.id ? COLORS.accent : "transparent" }}
                >
                  <Feather 
                    name={item.icon as any} 
                    size={18} 
                    color={activeModule === item.id ? COLORS.white : item.color} 
                  />
                </View>
                
                {!isSidebarCollapsed && (
                  <Text 
                    className="text-sm lg:text-base font-semibold ml-2 lg:ml-3"
                    style={{ 
                      color: activeModule === item.id ? COLORS.accent : COLORS.white,
                      opacity: 0.9 
                    }}
                  >
                    {item.label}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* User Profile & Logout */}
        {!isSidebarCollapsed && (
          <View className="p-4 lg:p-5 border-t" style={{ borderColor: COLORS.secondary }}>
            <View className="flex-row items-center mb-3 lg:mb-4">
              <View 
                className="w-10 h-10 lg:w-11 lg:h-11 rounded-xl justify-center items-center mr-2 lg:mr-3"
                style={{ backgroundColor: COLORS.accent }}
              >
                <Text className="text-sm lg:text-base font-bold" style={{ color: COLORS.white }}>SC</Text>
              </View>
              <View className="flex-1">
                <Text className="text-sm lg:text-base font-bold mb-0.5" style={{ color: COLORS.white }}>Sarah Chen</Text>
                <Text className="text-xs font-medium" style={{ color: COLORS.tertiary }}>Administrator</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              className="flex-row items-center justify-center py-2.5 lg:py-3 rounded-xl border"
              style={{ backgroundColor: "#fee", borderColor: "#fcc" }}
              onPress={handleLogout}
            >
              <Feather name="log-out" size={16} color="#ef4444" />
              <Text className="text-xs lg:text-sm font-semibold ml-2" style={{ color: "#ef4444" }}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Animated.View>
  );
}