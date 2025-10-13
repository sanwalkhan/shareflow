// src/components/Admin/Header.tsx
import React from "react";
import { View, Text, TouchableOpacity, TextInput, Modal } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, isMobile } from "../../utils/responsive";

interface HeaderProps {
  activeModule: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  isProfileDropdownOpen: boolean;
  setIsProfileDropdownOpen: (value: boolean) => void;
  handleLogout: () => void;
  companyName: string;
}

const moduleLabels: Record<string, string> = {
  overview: "Dashboard",
  expenses: "Expenses",
  payroll: "Payroll",
  shareholders: "Shareholders",
  reports: "Analytics",
  settings: "Settings",
};

export default function Header({
  activeModule,
  searchQuery,
  setSearchQuery,
  isDarkMode,
  setIsDarkMode,
  isProfileDropdownOpen,
  setIsProfileDropdownOpen,
  handleLogout,
  companyName,
}: HeaderProps) {
  return (
    <>
      <View className="bg-white border-b shadow-sm" style={{ borderColor: "#e5e7eb" }}>
        <View className="px-3 md:px-6 py-3 md:py-5 flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-xl md:text-2xl font-extrabold mb-0.5 md:mb-1" style={{ color: COLORS.textDark }}>
              {moduleLabels[activeModule]}
            </Text>
            <Text className="text-xs md:text-sm font-medium" style={{ color: COLORS.tertiary }}>
              {companyName} • {new Date().toLocaleDateString('en-US', { 
                weekday: isMobile ? undefined : 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Text>
          </View>

          <View className="flex-row items-center">
            {!isMobile && (
              <>
                {/* Search Bar */}
                <View 
                  className="flex-row items-center bg-white px-3 md:px-4 py-2 md:py-2.5 rounded-xl border shadow-sm mr-2 md:mr-4"
                  style={{ minWidth: isMobile ? 150 : 280, borderColor: "#e5e7eb" }}
                >
                  <Feather name="search" size={16} color={COLORS.tertiary} />
                  <TextInput
                    placeholder="Search..."
                    placeholderTextColor={COLORS.tertiary}
                    className="flex-1 ml-2 text-xs md:text-sm"
                    style={{ color: COLORS.textDark }}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                  {searchQuery && (
                    <TouchableOpacity onPress={() => setSearchQuery("")}>
                      <Feather name="x" size={14} color={COLORS.tertiary} />
                    </TouchableOpacity>
                  )}
                </View>

                {/* Date Range Selector */}
                <TouchableOpacity 
                  className="flex-row items-center bg-white px-2.5 md:px-3.5 py-2 md:py-2.5 rounded-lg border shadow-sm mr-2 md:mr-4"
                  style={{ borderColor: "#e5e7eb" }}
                >
                  <Feather name="calendar" size={14} color={COLORS.tertiary} />
                  <Text className="text-xs md:text-sm font-semibold mx-1.5 md:mx-2" style={{ color: COLORS.textDark }}>Q1 2024</Text>
                  <Feather name="chevron-down" size={12} color={COLORS.tertiary} />
                </TouchableOpacity>

                {/* Notifications */}
                <TouchableOpacity 
                  className="relative w-9 h-9 md:w-11 md:h-11 rounded-xl bg-white justify-center items-center border shadow-sm mr-2 md:mr-4"
                  style={{ borderColor: "#e5e7eb" }}
                >
                  <Feather name="bell" size={16} color={COLORS.tertiary} />
                  <View 
                    className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full justify-center items-center"
                    style={{ backgroundColor: "#ef4444" }}
                  >
                    <Text className="text-white text-xs font-bold">3</Text>
                  </View>
                </TouchableOpacity>

                {/* Theme Toggle */}
                <TouchableOpacity 
                  className="w-9 h-9 md:w-11 md:h-11 rounded-xl overflow-hidden shadow-sm mr-2 md:mr-4"
                  onPress={() => setIsDarkMode(!isDarkMode)}
                  style={{ backgroundColor: isDarkMode ? COLORS.tertiary : "#fbbf24" }}
                >
                  <View className="w-full h-full justify-center items-center rounded-xl">
                    <Feather 
                      name={isDarkMode ? "moon" : "sun"} 
                      size={14} 
                      color={COLORS.white} 
                    />
                  </View>
                </TouchableOpacity>
              </>
            )}

            {/* Profile Dropdown */}
            <TouchableOpacity 
              className="shadow-sm"
              onPress={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            >
              <View 
                className="w-9 h-9 md:w-11 md:h-11 rounded-xl justify-center items-center"
                style={{ backgroundColor: COLORS.accent }}
              >
                <Text className="text-sm md:text-base font-bold" style={{ color: COLORS.white }}>SC</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Profile Dropdown Modal */}
      <Modal
        visible={isProfileDropdownOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsProfileDropdownOpen(false)}
      >
        <TouchableOpacity 
          className="flex-1 bg-black/40 justify-start items-end pt-16 md:pt-24 pr-3 md:pr-6"
          activeOpacity={1}
          onPress={() => setIsProfileDropdownOpen(false)}
        >
          <View className="bg-white rounded-2xl w-72 md:w-80 shadow-xl overflow-hidden">
            <View 
              className="p-4 md:p-6 flex-row items-center"
              style={{ backgroundColor: COLORS.accent }}
            >
              <View 
                className="w-12 h-12 md:w-15 md:h-15 rounded-2xl justify-center items-center mr-3 md:mr-4"
                style={{ backgroundColor: `${COLORS.white}20` }}
              >
                <Text className="text-base md:text-lg font-bold" style={{ color: COLORS.white }}>SC</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base md:text-lg font-bold mb-0.5" style={{ color: COLORS.white }}>Sarah Chen</Text>
                <Text className="text-xs md:text-sm font-semibold mb-0.5" style={{ color: `${COLORS.white}dd` }}>Chief Technology Officer</Text>
                <Text className="text-xs font-medium" style={{ color: `${COLORS.white}bb` }}>{companyName}</Text>
              </View>
            </View>
            
            <View className="p-3 md:p-4">
              <TouchableOpacity className="flex-row items-center py-3 md:py-3.5 px-2 md:px-3 rounded-lg">
                <Feather name="user" size={16} color={COLORS.tertiary} />
                <Text className="flex-1 text-sm md:text-base font-medium ml-2 md:ml-3" style={{ color: COLORS.textDark }}>My Profile</Text>
                <Feather name="chevron-right" size={14} color={COLORS.tertiary} />
              </TouchableOpacity>
              
              <TouchableOpacity className="flex-row items-center py-3 md:py-3.5 px-2 md:px-3 rounded-lg">
                <Feather name="settings" size={16} color={COLORS.tertiary} />
                <Text className="flex-1 text-sm md:text-base font-medium ml-2 md:ml-3" style={{ color: COLORS.textDark }}>Company Settings</Text>
                <Feather name="chevron-right" size={14} color={COLORS.tertiary} />
              </TouchableOpacity>
              
              <TouchableOpacity className="flex-row items-center py-3 md:py-3.5 px-2 md:px-3 rounded-lg">
                <Feather name="credit-card" size={16} color={COLORS.tertiary} />
                <Text className="flex-1 text-sm md:text-base font-medium ml-2 md:ml-3" style={{ color: COLORS.textDark }}>Billing & Plans</Text>
                <Feather name="chevron-right" size={14} color={COLORS.tertiary} />
              </TouchableOpacity>
              
              <View className="h-px bg-gray-100 my-2" />
              
              <TouchableOpacity 
                className="flex-row items-center py-3 md:py-3.5 px-2 md:px-3 rounded-lg mt-1"
                onPress={handleLogout}
              >
                <Feather name="log-out" size={16} color="#ef4444" />
                <Text className="flex-1 text-sm md:text-base font-semibold ml-2 md:ml-3" style={{ color: "#ef4444" }}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}