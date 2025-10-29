// src/components/shareholder/ShareholderSidebar.tsx
import React, { Dispatch, SetStateAction } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  useWindowDimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";

interface Props {
  isCollapsed: boolean;
  onToggle: () => void;
  activeModule: string;
  setActiveModule: Dispatch<SetStateAction<string>>;
}

export default function ShareholderSidebar({
  isCollapsed = false,
  onToggle,
  activeModule = "overview",
  setActiveModule,
}: Props) {
  const { width } = useWindowDimensions();
  const isTablet = width < 1200 && width >= 768;
  const isMobile = width < 768;

  const sidebarItems = [
    { id: "overview", icon: "home", label: "Overview", color: "#86C232" },
    { id: "investments", icon: "trending-up", label: "My Investments", color: "#3B82F6" },
    { id: "requests", icon: "file-plus", label: "Investment Requests", color: "#F59E0B" },
    { id: "dividends", icon: "dollar-sign", label: "Dividends", color: "#10B981" },
    { id: "reports", icon: "bar-chart-2", label: "Reports", color: "#06B6D4" },
    { id: "settings", icon: "settings", label: "Settings", color: "#6B7280" },
  ];

  const renderMenuItems = () =>
    sidebarItems.map((item) => (
      <TouchableOpacity
        key={item.id}
        onPress={() => setActiveModule(item.id)}
        activeOpacity={0.8}
        className={`mx-3 my-1 rounded-xl overflow-hidden ${
          activeModule === item.id ? "shadow-lg shadow-green-500/30" : ""
        }`}
      >
        <View
          className={`flex-row items-center px-4 py-3.5 ${
            activeModule === item.id ? "bg-white/5" : ""
          }`}
        >
          <View
            className={`w-9 h-9 rounded-xl justify-center items-center ${
              activeModule === item.id ? "bg-[rgba(134,194,50,1)]" : "bg-transparent"
            }`}
          >
            <Feather
              name={item.icon as any}
              size={20}
              color={activeModule === item.id ? "#FFFFFF" : item.color}
            />
          </View>
          {!isCollapsed && (
            <Text
              className={`text-white text-base font-semibold ml-3 opacity-90 ${
                activeModule === item.id ? "text-green-500 font-bold" : ""
              }`}
            >
              {item.label}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    ));

  const FooterBlock = !isCollapsed && (
    <View className="p-5 border-t border-gray-700">
      <View className="flex-row items-center mb-4">
        <View className="w-11 h-11 rounded-xl bg-green-500 justify-center items-center mr-3">
          <Text className="text-white font-bold text-base">SC</Text>
        </View>
        <View className="flex-1">
          <Text className="text-white text-base font-bold mb-0.5">Sarah Chen</Text>
          <Text className="text-gray-400 text-xs font-medium">Shareholder</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={onToggle}
        className="flex-row items-center justify-center py-3 rounded-xl bg-red-100 border border-red-200"
        activeOpacity={0.8}
      >
        <Feather name="log-out" size={18} color="#ef4444" />
        <Text className="text-red-500 text-sm font-semibold ml-2">Logout</Text>
      </TouchableOpacity>
    </View>
  );

  // 🌐 Web version (responsive)
  if (Platform.OS === "web") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          backgroundColor: "#1F2937", // gray-800
          transition: "width 0.3s ease, transform 0.3s ease",
          width: isCollapsed ? (isMobile ? 0 : 70) : isMobile ? "100%" : isTablet ? 240 : 300,
          transform: isMobile && isCollapsed ? "translateX(-100%)" : "translateX(0)",
          overflow: "hidden",
          position: isMobile ? "absolute" : "relative",
          zIndex: 50,
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: isMobile ? 16 : 24,
            borderBottom: "1px solid #374151",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                backgroundColor: "#D1FAE5",
                border: "1px solid #A7F3D0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 12,
              }}
            >
              <Feather name="pie-chart" size={26} color="#86C232" />
            </div>
            {!isCollapsed && !isMobile && (
              <div>
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    fontWeight: "800",
                    letterSpacing: -0.5,
                  }}
                >
                  Share<Text style={{ color: "#86C232" }}>Flow</Text>
                </Text>
                <Text
                  style={{
                    color: "#86C232",
                    fontSize: 10,
                    fontWeight: "700",
                    marginTop: 2,
                  }}
                >
                  SHAREHOLDER
                </Text>
              </div>
            )}
          </div>
        </div>

        {/* Scrollable section (hidden scrollbar) */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            paddingTop: 8,
            paddingBottom: 8,
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          className="hide-scrollbar"
        >
          {renderMenuItems()}
        </div>

        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
        `}</style>

        {FooterBlock}
      </div>
    );
  }

  // 📱 Mobile version
  return (
    <View
      className="bg-gray-800 flex-1 absolute top-0 left-0 z-50"
      style={{
        width: isCollapsed ? 0 : 280,
        height: "100%",
        transform: [{ translateX: isCollapsed ? -300 : 0 }],
      }}
    >
      {/* Header */}
      <View className="p-6 border-b border-gray-700 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View className="w-11 h-11 rounded-xl bg-green-100 border border-green-200 justify-center items-center mr-3">
            <Feather name="pie-chart" size={26} color="#86C232" />
          </View>
          {!isCollapsed && (
            <View>
              <Text className="text-white text-xl font-extrabold tracking-tight">
                Share<Text className="text-green-500">Flow</Text>
              </Text>
              <Text className="text-green-500 text-xs font-bold tracking-wide mt-0.5">
                SHAREHOLDER
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Scrollable items */}
      <ScrollView
        contentContainerStyle={{ paddingVertical: 10, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {renderMenuItems()}
      </ScrollView>

      {FooterBlock}
    </View>
  );
}
