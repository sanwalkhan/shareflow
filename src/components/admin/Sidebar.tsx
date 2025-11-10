// src/components/admin/AdminSidebar.tsx
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  useWindowDimensions,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
  isCollapsed: boolean;
  onToggle: () => void;
  activeModule: string;
  setActiveModule: Dispatch<SetStateAction<string>>;
  isMobile?: boolean;
}

interface CompanyData {
  id: string;
  name: string;
  email: string;
  currencyCode: string;
  currencySymbol: string;
}

interface UserData {
  id: string;
  email: string;
  firstName: string;
  fullName: string;
  lastName: string;
  investment: number;
  profit: number;
  returns: number;
  role: string;
  sharePercentage: number;
  company: CompanyData;
}

export default function AdminSidebar({
  isCollapsed = false,
  onToggle,
  activeModule = "overview",
  setActiveModule,
}: Props) {
  const { width } = useWindowDimensions();
  const isTablet = width < 1200 && width >= 768;
  const isMobile = width < 768;

  const [companyData, setCompanyData] = useState<CompanyData>({ 
    id: '',
    name: 'ShareFlow', 
    email: '',
    currencyCode: 'USD',
    currencySymbol: '$'
  });
  const [userProfile, setUserProfile] = useState<any>(null);

  const sidebarItems = [
    { id: "overview", icon: "home", label: "Dashboard", color: "#86C232" },
    { id: "expenses", icon: "credit-card", label: "Expenses", color: "#8B5CF6" },
    { id: "payroll", icon: "users", label: "Payroll", color: "#06B6D4" },
    { id: "shareholders", icon: "pie-chart", label: "Shareholders", color: "#10B981" },
    { id: "reports", icon: "bar-chart-2", label: "Analytics", color: "#F59E0B" },
    { id: "settings", icon: "settings", label: "Settings", color: "#6B7280" },
  ];

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const userData: UserData = JSON.parse(userDataString);
        
        if (userData.company) {
          setCompanyData(userData.company);
        }
        
        setUserProfile({
          name: userData.fullName || `${userData.firstName} ${userData.lastName}`,
          email: userData.email,
          role: userData.role,
          investment: userData.investment,
          profit: userData.profit,
          sharePercentage: userData.sharePercentage
        });
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const getInitials = (name: string) => {
    if (!name) return 'A';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

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

  const FooterBlock = !isCollapsed && userProfile && (
    <View className="p-5 border-t border-gray-700">
      <View className="flex-row items-center mb-4">
        <View className="w-11 h-11 rounded-xl bg-green-500 justify-center items-center mr-3 overflow-hidden">
          <Text className="text-white font-bold text-base">
            {getInitials(userProfile.name)}
          </Text>
        </View>
        <View className="flex-1">
          <Text className="text-white text-base font-bold mb-0.5" numberOfLines={1}>
            {userProfile.name}
          </Text>
          <Text className="text-gray-400 text-xs font-medium capitalize">
            {userProfile.role.toLowerCase()}
          </Text>
          {userProfile.sharePercentage !== undefined && (
            <Text className="text-green-400 text-xs font-medium mt-0.5">
              {userProfile.sharePercentage}% Shares
            </Text>
          )}
        </View>
      </View>
    </View>
  );

  // 🌐 Web version (responsive) - EXACT SAME WIDTHS AS SHAREHOLDER SIDEBAR
  if (Platform.OS === "web") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          backgroundColor: "#1F2937",
          transition: "width 0.3s ease, transform 0.3s ease",
          // EXACT SAME WIDTHS AS SHAREHOLDER SIDEBAR:
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
                overflow: "hidden",
              }}
            >
              <img 
                src={require('../../assets/images/logo.png')} 
                alt="Company Logo"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    const featherIcon = document.createElement('div');
                    featherIcon.innerHTML = '<Feather name="trending-up" size={26} color="#86C232" />';
                    parent.appendChild(featherIcon);
                  }
                }}
              />
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
                  {companyData.name}
                </Text>
                <Text
                  style={{
                    color: "#86C232",
                    fontSize: 10,
                    fontWeight: "700",
                    marginTop: 2,
                  }}
                >
                  ENTERPRISE
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

  // 📱 Mobile version - EXACT SAME WIDTHS AS SHAREHOLDER SIDEBAR
  return (
    <View
      className="bg-gray-800 flex-1 absolute top-0 left-0 z-50"
      style={{
        width: isCollapsed ? 0 : 280, // SAME AS SHAREHOLDER: 280px
        height: "100%",
        transform: [{ translateX: isCollapsed ? -300 : 0 }], // SAME AS SHAREHOLDER
      }}
    >
      {/* Header */}
      <View className="p-6 border-b border-gray-700 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View className="w-11 h-11 rounded-xl bg-green-100 border border-green-200 justify-center items-center mr-3 overflow-hidden">
            <Image 
              source={require('../../assets/images/logo.png')}
              className="w-full h-full"
              resizeMode="cover"
              onError={() => {
                // Fallback handled by showing the icon below if image fails
              }}
            />
            {/* Fallback icon if logo doesn't load */}
            <View className="absolute inset-0 justify-center items-center">
              <Feather name="trending-up" size={26} color="#86C232" />
            </View>
          </View>
          {!isCollapsed && (
            <View>
              <Text className="text-white text-xl font-extrabold tracking-tight">
                {companyData.name}
              </Text>
              <Text className="text-green-500 text-xs font-bold tracking-wide mt-0.5">
                ENTERPRISE
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