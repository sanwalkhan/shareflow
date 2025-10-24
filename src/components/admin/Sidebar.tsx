import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

interface Props {
  isCollapsed?: boolean;
  onToggle?: () => void;
  activeModule?: string;
  setActiveModule?: (m: string) => void;
}

export default function Sidebar({ isCollapsed=false, onToggle, activeModule="overview", setActiveModule }: Props) {
  const sidebarItems = [
    { id: "overview", icon: "home", label: "Dashboard", color: "#86C232" },
    { id: "expenses", icon: "credit-card", label: "Expenses", color: "#8B5CF6" },
    { id: "payroll", icon: "users", label: "Payroll", color: "#06B6D4" },
    { id: "shareholders", icon: "pie-chart", label: "Shareholders", color: "#10B981" },
    { id: "reports", icon: "bar-chart-2", label: "Analytics", color: "#F59E0B" },
    { id: "settings", icon: "settings", label: "Settings", color: "#6B7280" },
  ];

  return (
    <View className="bg-gray-800 flex-1">
      <View className="p-6 border-b border-gray-700 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View className="w-11 h-11 rounded-xl bg-green-100 border border-green-200 justify-center items-center mr-3">
            <Feather name="trending-up" size={28} color="#86C232" />
          </View>
          {!isCollapsed && (
            <View>
              <Text className="text-white text-xl font-extrabold tracking-tight">
                Share<Text className="text-green-500">Flow</Text>
              </Text>
              <Text className="text-green-500 text-xs font-bold tracking-wide mt-0.5">
                ENTERPRISE
              </Text>
            </View>
          )}
        </View>

       
      </View>

      <View className="flex-1 py-5">
        {sidebarItems.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={() => setActiveModule && setActiveModule(item.id)}
            className={`mx-3 my-1 rounded-xl overflow-hidden ${activeModule === item.id ? "shadow-lg shadow-green-500/30" : ""}`}
          >
            <View className={`flex-row items-center px-4 py-3.5 ${activeModule === item.id ? "bg-white/5" : ""}`}>
              <View className={`w-9 h-9 rounded-xl justify-center items-center ${activeModule === item.id ? "bg-[rgba(134,194,50,1)]" : "bg-transparent"}`}>
                <Feather name={item.icon as any} size={20} color={activeModule === item.id ? "#FFFFFF" : item.color} />
              </View>
              {!isCollapsed && (
                <Text className={`text-white text-base font-semibold ml-3 opacity-90 ${activeModule === item.id ? "text-green-500 font-bold" : ""}`}>
                  {item.label}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {!isCollapsed && (
        <View className="p-5 border-t border-gray-700">
          <View className="flex-row items-center mb-4">
            <View className="w-11 h-11 rounded-xl bg-green-500 justify-center items-center mr-3">
              <Text className="text-white font-bold text-base">SC</Text>
            </View>
            <View className="flex-1">
              <Text className="text-white text-base font-bold mb-0.5">Sarah Chen</Text>
              <Text className="text-gray-400 text-xs font-medium">Administrator</Text>
            </View>
          </View>

          <TouchableOpacity className="flex-row items-center justify-center py-3 rounded-xl bg-red-100 border border-red-200">
            <Feather name="log-out" size={18} color="#ef4444" />
            <Text className="text-red-500 text-sm font-semibold ml-2">Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
