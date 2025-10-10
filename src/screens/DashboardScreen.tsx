// src/screens/DashboardScreen.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
  ScrollView,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

interface DashboardScreenProps {
  navigation: any;
}

// Demo Data
const DEMO_DATA = {
  company: {
    name: "TechNova Solutions",
    industry: "Technology",
    employees: 47,
    founded: 2018,
    revenue: 2456780,
    growth: 12.5
  },
  financials: {
    revenue: {
      current: 2456780,
      previous: 2183450,
      trend: "up"
    },
    expenses: {
      current: 452300,
      previous: 467800,
      trend: "down"
    },
    profit: {
      current: 845920,
      previous: 712340,
      trend: "up"
    },
    cashFlow: {
      current: 324560,
      previous: 287650,
      trend: "up"
    }
  },
  expenses: [
    { id: 1, category: "Salaries", amount: 245000, percentage: 54, trend: "up", color: "#86C232" },
    { id: 2, category: "Operations", amount: 87300, percentage: 19, trend: "stable", color: "#3A7CA5" },
    { id: 3, category: "Marketing", amount: 45600, percentage: 10, trend: "up", color: "#F9C80E" },
    { id: 4, category: "R&D", amount: 38900, percentage: 9, trend: "up", color: "#8B5CF6" },
    { id: 5, category: "Other", amount: 35500, percentage: 8, trend: "down", color: "#6B7280" }
  ],
  recentTransactions: [
    { id: 1, type: "revenue", description: "Q3 Product Sales", amount: 125000, date: "2024-03-15", status: "completed" },
    { id: 2, type: "expense", description: "Team Offsite", amount: -15000, date: "2024-03-14", status: "completed" },
    { id: 3, type: "revenue", description: "Enterprise Contract", amount: 75000, date: "2024-03-12", status: "pending" },
    { id: 4, type: "expense", description: "Software Licenses", amount: -12000, date: "2024-03-10", status: "completed" },
    { id: 5, type: "revenue", description: "Consulting Services", amount: 45000, date: "2024-03-08", status: "completed" }
  ],
};

// Format currency function
const formatCurrency = (amount: number): string => {
  if (typeof amount !== "number" || isNaN(amount)) return "$0";
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
};

export default function DashboardScreen({ navigation }: DashboardScreenProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeModule, setActiveModule] = useState("overview");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const sidebarWidth = useRef(new Animated.Value(280)).current;
  const sidebarOpacity = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const toggleSidebar = () => {
    const toValue = isSidebarCollapsed ? 280 : 80;
    const opacityValue = isSidebarCollapsed ? 1 : 0.7;
    
    Animated.parallel([
      Animated.spring(sidebarWidth, {
        toValue,
        friction: 8,
        tension: 40,
        useNativeDriver: false,
      }),
      Animated.timing(sidebarOpacity, {
        toValue: opacityValue,
        duration: 300,
        useNativeDriver: false,
      })
    ]).start();
    
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout Confirmation",
      "Are you sure you want to logout from your dashboard?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Logout", 
          style: "destructive",
          onPress: () => navigation.navigate("Landing")
        }
      ]
    );
  };

  const sidebarItems = [
    { id: "overview", icon: "home", label: "Dashboard", color: "#86C232" },
    { id: "expenses", icon: "credit-card", label: "Expenses", color: "#8B5CF6" },
    { id: "payroll", icon: "users", label: "Payroll", color: "#06B6D4" },
    { id: "shareholders", icon: "pie-chart", label: "Shareholders", color: "#10B981" },
    { id: "reports", icon: "bar-chart-2", label: "Analytics", color: "#F59E0B" },
    { id: "settings", icon: "settings", label: "Settings", color: "#6B7280" },
  ];

  const renderModuleContent = () => {
    switch (activeModule) {
      case "overview":
        return <OverviewModule data={DEMO_DATA} />;
      case "expenses":
        return <ExpensesModule />;
      case "payroll":
        return <PayrollModule />;
      case "shareholders":
        return <ShareholdersModule />;
      case "reports":
        return <ReportsModule />;
      case "settings":
        return <SettingsModule />;
      default:
        return <OverviewModule data={DEMO_DATA} />;
    }
  };

  return (
    <View className="flex-1 flex-row bg-white">
      {/* Premium Sidebar Navigation */}
      <Animated.View 
        className="bg-gray-800 shadow-xl z-50"
        style={{ 
          width: sidebarWidth,
          opacity: sidebarOpacity
        }}
      >
        <View className="flex-1 bg-gray-800">
          {/* Sidebar Header */}
          <View className="p-6 border-b border-gray-700 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="w-11 h-11 rounded-xl bg-green-100 border border-green-200 justify-center items-center mr-3">
                <Feather name="trending-up" size={28} color="#86C232" />
              </View>
              {!isSidebarCollapsed && (
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
            
            <TouchableOpacity 
              className="w-9 h-9 rounded-xl bg-gray-700 border border-gray-600 justify-center items-center"
              onPress={toggleSidebar}
            >
              <Feather 
                name={isSidebarCollapsed ? "chevron-right" : "chevron-left"} 
                size={18} 
                color="#FFFFFF" 
              />
            </TouchableOpacity>
          </View>

          {/* Navigation Items */}
          <ScrollView 
            className="flex-1 py-5"
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
          >
            {sidebarItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                className={`mx-3 my-1 rounded-xl overflow-hidden ${
                  activeModule === item.id ? "shadow-lg shadow-green-500/30" : ""
                }`}
                onPress={() => setActiveModule(item.id)}
              >
                <View 
                  className={`flex-row items-center px-4 py-3.5 ${
                    activeModule === item.id ? `bg-[${item.color}30]` : ""
                  }`}
                >
                  <View 
                    className={`w-9 h-9 rounded-xl justify-center items-center shadow-sm ${
                      activeModule === item.id ? `bg-[${item.color}]` : "bg-transparent"
                    }`}
                  >
                    <Feather 
                      name={item.icon as any} 
                      size={20} 
                      color={activeModule === item.id ? "#FFFFFF" : item.color} 
                    />
                  </View>
                  
                  {!isSidebarCollapsed && (
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
            ))}
          </ScrollView>

          {/* User Profile & Logout */}
          {!isSidebarCollapsed && (
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
              
              <TouchableOpacity 
                className="flex-row items-center justify-center py-3 rounded-xl bg-red-100 border border-red-200"
                onPress={handleLogout}
              >
                <Feather name="log-out" size={18} color="#ef4444" />
                <Text className="text-red-500 text-sm font-semibold ml-2">Logout</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Animated.View>

      {/* Main Content Area - This should take the remaining space */}
      <View className="flex-1 bg-gray-50">
        {/* Premium Header */}
        <View className="bg-white border-b border-gray-200 shadow-sm">
          <View className="px-6 py-5 flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-2xl font-extrabold text-gray-900 mb-1">
                {sidebarItems.find(item => item.id === activeModule)?.label}
              </Text>
              <Text className="text-gray-500 text-sm font-medium">
                {DEMO_DATA.company.name} • {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Text>
            </View>

            <View className="flex-row items-center">
              {/* Search Bar */}
              <View className="flex-row items-center bg-white px-4 py-2.5 rounded-xl border border-gray-200 min-w-72 shadow-sm mr-4">
                <Feather name="search" size={18} color="#6B7280" />
                <TextInput
                  placeholder="Search transactions, reports..."
                  placeholderTextColor="#9CA3AF"
                  className="flex-1 ml-3 mr-2 text-sm text-gray-900"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                {searchQuery && (
                  <TouchableOpacity onPress={() => setSearchQuery("")}>
                    <Feather name="x" size={16} color="#6B7280" />
                  </TouchableOpacity>
                )}
              </View>

              {/* Date Range Selector */}
              <TouchableOpacity className="flex-row items-center bg-white px-3.5 py-2.5 rounded-lg border border-gray-200 shadow-sm mr-4">
                <Feather name="calendar" size={16} color="#6B7280" />
                <Text className="text-gray-900 text-sm font-semibold mx-2">Q1 2024</Text>
                <Feather name="chevron-down" size={14} color="#6B7280" />
              </TouchableOpacity>

              {/* Notifications */}
              <TouchableOpacity className="relative w-11 h-11 rounded-xl bg-white justify-center items-center border border-gray-200 shadow-sm mr-4">
                <Feather name="bell" size={18} color="#6B7280" />
                <View className="absolute top-2 right-2 w-4.5 h-4.5 rounded-full bg-red-500 justify-center items-center">
                  <Text className="text-white text-xs font-bold">3</Text>
                </View>
              </TouchableOpacity>

              {/* Theme Toggle */}
              <TouchableOpacity 
                className="w-11 h-11 rounded-xl overflow-hidden shadow-sm mr-4"
                onPress={() => setIsDarkMode(!isDarkMode)}
              >
                <View 
                  className={`w-full h-full justify-center items-center rounded-xl ${
                    isDarkMode ? 'bg-gray-600' : 'bg-yellow-400'
                  }`}
                >
                  <Feather 
                    name={isDarkMode ? "moon" : "sun"} 
                    size={16} 
                    color="#FFFFFF" 
                  />
                </View>
              </TouchableOpacity>

              {/* Profile Dropdown */}
              <TouchableOpacity 
                className="ml-2 shadow-sm"
                onPress={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              >
                <View className="w-11 h-11 rounded-xl bg-green-500 justify-center items-center">
                  <Text className="text-white font-bold text-base">SC</Text>
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
            className="flex-1 bg-black/40 justify-start items-end pt-24 pr-6"
            activeOpacity={1}
            onPress={() => setIsProfileDropdownOpen(false)}
          >
            <View className="bg-white rounded-2xl w-80 shadow-xl overflow-hidden">
              <View className="p-6 bg-green-500 flex-row items-center">
                <View className="w-15 h-15 rounded-2xl bg-white/20 justify-center items-center mr-4">
                  <Text className="text-white font-bold text-lg">SC</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-white text-lg font-bold mb-0.5">Sarah Chen</Text>
                  <Text className="text-white/90 text-sm font-semibold mb-0.5">Chief Technology Officer</Text>
                  <Text className="text-white/70 text-xs font-medium">{DEMO_DATA.company.name}</Text>
                </View>
              </View>
              
              <View className="p-4">
                <TouchableOpacity className="flex-row items-center py-3.5 px-3 rounded-lg">
                  <Feather name="user" size={18} color="#6B7280" />
                  <Text className="flex-1 text-gray-900 text-base font-medium ml-3">My Profile</Text>
                  <Feather name="chevron-right" size={16} color="#6B7280" />
                </TouchableOpacity>
                
                <TouchableOpacity className="flex-row items-center py-3.5 px-3 rounded-lg">
                  <Feather name="settings" size={18} color="#6B7280" />
                  <Text className="flex-1 text-gray-900 text-base font-medium ml-3">Company Settings</Text>
                  <Feather name="chevron-right" size={16} color="#6B7280" />
                </TouchableOpacity>
                
                <TouchableOpacity className="flex-row items-center py-3.5 px-3 rounded-lg">
                  <Feather name="credit-card" size={18} color="#6B7280" />
                  <Text className="flex-1 text-gray-900 text-base font-medium ml-3">Billing & Plans</Text>
                  <Feather name="chevron-right" size={16} color="#6B7280" />
                </TouchableOpacity>
                
                <View className="h-px bg-gray-100 my-2" />
                
                <TouchableOpacity 
                  className="flex-row items-center py-3.5 px-3 rounded-lg mt-1"
                  onPress={handleLogout}
                >
                  <Feather name="log-out" size={18} color="#ef4444" />
                  <Text className="flex-1 text-red-500 text-base font-semibold ml-3">Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Main Module Content */}
        <View className="flex-1">
          {renderModuleContent()}
        </View>
      </View>
    </View>
  );
}

// Premium Module Components
const OverviewModule = ({ data }: any) => (
  <ScrollView 
    className="flex-1"
    contentContainerStyle={{ padding: 24, paddingBottom: 80 }}
    showsVerticalScrollIndicator={false}
    keyboardShouldPersistTaps="handled"
  >
    <View>
      {/* Welcome & Quick Stats */}
      <View className="flex-row items-center justify-between mb-8">
        <View className="flex-1">
          <Text className="text-2xl font-extrabold text-gray-900 mb-2">Welcome back, Sarah! 👋</Text>
          <Text className="text-gray-500 text-base font-medium">
            Here's what's happening with {data.company.name} today.
          </Text>
        </View>
        <View className="flex-row">
          <TouchableOpacity className="flex-row items-center bg-green-500 px-5 py-3 rounded-xl shadow-lg shadow-green-500/30 mr-3">
            <Feather name="plus" size={18} color="#FFFFFF" />
            <Text className="text-white text-sm font-semibold ml-2">Add Expense</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center bg-white px-5 py-3 rounded-xl border border-gray-200">
            <Feather name="bar-chart" size={18} color="#86C232" />
            <Text className="text-green-500 text-sm font-semibold ml-2">Generate Report</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Financial Overview Cards */}
      <View className="flex-row flex-wrap mb-8" style={{ gap: 16 }}>
        <FinancialCard
          title="Total Revenue"
          amount={data.financials.revenue.current}
          change={data.financials.revenue.trend}
          changeAmount={data.financials.revenue.current - data.financials.revenue.previous}
          icon="trending-up"
          color="#10B981"
        />
        <FinancialCard
          title="Operating Expenses"
          amount={data.financials.expenses.current}
          change={data.financials.expenses.trend}
          changeAmount={data.financials.expenses.current - data.financials.expenses.previous}
          icon="trending-down"
          color="#EF4444"
        />
        <FinancialCard
          title="Net Profit"
          amount={data.financials.profit.current}
          change={data.financials.profit.trend}
          changeAmount={data.financials.profit.current - data.financials.profit.previous}
          icon="dollar-sign"
          color="#8B5CF6"
        />
        <FinancialCard
          title="Cash Flow"
          amount={data.financials.cashFlow.current}
          change={data.financials.cashFlow.trend}
          changeAmount={data.financials.cashFlow.current - data.financials.cashFlow.previous}
          icon="refresh-cw"
          color="#06B6D4"
        />
      </View>

      {/* Charts & Analytics Row */}
      <View className={`${width < 768 ? 'flex-col' : 'flex-row'} mb-8`} style={{ gap: 24 }}>
        <View className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 ${
          width < 768 ? 'flex-1 mb-6' : 'flex-2'
        }`}>
          <View className="flex-row items-center justify-between mb-5">
            <Text className="text-lg font-bold text-gray-900">Revenue Trend</Text>
            <TouchableOpacity>
              <Text className="text-green-500 text-sm font-semibold">View Report →</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 200, justifyContent: 'space-between' }}>
            {/* Simulated chart with bars */}
            <View className="flex-1 flex-row items-end justify-between px-5">
              {[60, 80, 45, 90, 75, 95, 70].map((height, index) => (
                <View 
                  key={index} 
                  className="w-7 bg-green-500 rounded-lg mx-1"
                  style={{ height: `${height}%` }}
                />
              ))}
            </View>
            <View className="flex-row justify-between px-5 mt-3">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((label, index) => (
                <Text key={index} className="text-gray-500 text-xs font-medium">{label}</Text>
              ))}
            </View>
          </View>
        </View>

        <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex-1">
          <View className="flex-row items-center justify-between mb-5">
            <Text className="text-lg font-bold text-gray-900">Expense Breakdown</Text>
            <Text className="text-green-500 text-base font-bold">{formatCurrency(data.financials.expenses.current)}</Text>
          </View>
          {data.expenses.map((expense: any) => (
            <ExpenseItem key={expense.id} expense={expense} />
          ))}
        </View>
      </View>

      {/* Recent Activity */}
      <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <View className="flex-row items-center justify-between mb-5">
          <Text className="text-lg font-bold text-gray-900">Recent Transactions</Text>
          <TouchableOpacity>
            <Text className="text-green-500 text-sm font-semibold">View All →</Text>
          </TouchableOpacity>
        </View>
        {data.recentTransactions.map((transaction: any) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </View>
    </View>
  </ScrollView>
);

const FinancialCard = ({ title, amount, change, changeAmount, icon, color }: any) => (
  <View 
    className="bg-white rounded-2xl shadow-lg overflow-hidden"
    style={{ 
      width: width < 768 ? '100%' : '48%',
      minWidth: 280,
      marginBottom: 16,
    }}
  >
    <View className="p-6">
      <View className="flex-row items-center justify-between mb-4">
        <View 
          className="w-12 h-12 rounded-xl justify-center items-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Feather name={icon} size={20} color={color} />
        </View>
        <View className="flex-row items-center">
          <Feather 
            name={change === 'up' ? 'trending-up' : 'trending-down'} 
            size={14} 
            color={change === 'up' ? '#10B981' : '#EF4444'} 
          />
          <Text 
            className={`text-xs font-semibold ml-1.5 ${
              change === 'up' ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {change === 'up' ? '+' : ''}{formatCurrency(Math.abs(changeAmount))}
          </Text>
        </View>
      </View>
      
      <Text className="text-2xl font-extrabold text-gray-900 mb-1">{formatCurrency(amount)}</Text>
      <Text className="text-gray-500 text-base font-semibold mb-2">{title}</Text>
      
      <View className="flex-row items-center justify-between">
        <Text className="text-gray-500 text-xs font-medium">Last 30 days</Text>
      </View>
    </View>
  </View>
);

const ExpenseItem = ({ expense }: any) => (
  <View className="flex-row items-center justify-between py-3 border-b border-gray-50">
    <View className="flex-row items-center">
      <View 
        className="w-3 h-3 rounded-full mr-3"
        style={{ backgroundColor: expense.color }}
      />
      <View>
        <Text className="text-gray-900 text-sm font-semibold mb-0.5">{expense.category}</Text>
        <Text className="text-gray-500 text-xs font-medium">{expense.percentage}% of total</Text>
      </View>
    </View>
    <View className="flex-row items-center">
      <Text className="text-gray-900 text-sm font-semibold mr-2">{formatCurrency(expense.amount)}</Text>
      <Feather 
        name={expense.trend === 'up' ? 'trending-up' : expense.trend === 'down' ? 'trending-down' : 'minus'}
        size={14} 
        color={expense.trend === 'up' ? '#10B981' : expense.trend === 'down' ? '#EF4444' : '#6B7280'} 
      />
    </View>
  </View>
);

const TransactionItem = ({ transaction }: any) => (
  <View className="flex-row items-center py-4 border-b border-gray-50">
    <View 
      className="w-10 h-10 rounded-xl justify-center items-center mr-4"
      style={{ 
        backgroundColor: transaction.type === 'revenue' ? '#10B98120' : '#EF444420' 
      }}
    >
      <Feather 
        name={transaction.type === 'revenue' ? 'arrow-down-left' : 'arrow-up-right'} 
        size={16} 
        color={transaction.type === 'revenue' ? '#10B981' : '#EF4444'} 
      />
    </View>
    
    <View className="flex-1">
      <Text className="text-gray-900 text-base font-semibold mb-1">{transaction.description}</Text>
      <Text className="text-gray-500 text-xs font-medium">
        {new Date(transaction.date).toLocaleDateString()} • 
        <Text 
          className={`font-semibold ${
            transaction.status === 'completed' ? 'text-green-500' : 'text-yellow-500'
          }`}
        >
          {transaction.status === 'completed' ? ' Completed' : ' Pending'}
        </Text>
      </Text>
    </View>
    
    <Text 
      className={`text-base font-bold ${
        transaction.type === 'revenue' ? 'text-green-500' : 'text-red-500'
      }`}
    >
      {transaction.type === 'revenue' ? '+' : ''}{formatCurrency(transaction.amount)}
    </Text>
  </View>
);

// Placeholder modules for other sections
const ExpensesModule = () => (
  <ScrollView 
    className="flex-1"
    contentContainerStyle={{ padding: 24, paddingBottom: 80 }}
    showsVerticalScrollIndicator={false}
    keyboardShouldPersistTaps="handled"
  >
    <View>
      <Text className="text-3xl font-extrabold text-gray-900 mb-6">Expense Management</Text>
      <Text className="text-gray-500 text-base text-center mt-15 italic">Advanced expense tracking coming soon...</Text>
    </View>
  </ScrollView>
);

const PayrollModule = () => (
  <ScrollView 
    className="flex-1"
    contentContainerStyle={{ padding: 24, paddingBottom: 80 }}
    showsVerticalScrollIndicator={false}
    keyboardShouldPersistTaps="handled"
  >
    <View>
      <Text className="text-3xl font-extrabold text-gray-900 mb-6">Payroll Management</Text>
      <Text className="text-gray-500 text-base text-center mt-15 italic">Payroll automation coming soon...</Text>
    </View>
  </ScrollView>
);

const ShareholdersModule = () => (
  <ScrollView 
    className="flex-1"
    contentContainerStyle={{ padding: 24, paddingBottom: 80 }}
    showsVerticalScrollIndicator={false}
    keyboardShouldPersistTaps="handled"
  >
    <View>
      <Text className="text-3xl font-extrabold text-gray-900 mb-6">Shareholder Management</Text>
      <Text className="text-gray-500 text-base text-center mt-15 italic">Equity management coming soon...</Text>
    </View>
  </ScrollView>
);

const ReportsModule = () => (
  <ScrollView 
    className="flex-1"
    contentContainerStyle={{ padding: 24, paddingBottom: 80 }}
    showsVerticalScrollIndicator={false}
    keyboardShouldPersistTaps="handled"
  >
    <View>
      <Text className="text-3xl font-extrabold text-gray-900 mb-6">Advanced Analytics</Text>
      <Text className="text-gray-500 text-base text-center mt-15 italic">Deep analytics dashboard coming soon...</Text>
    </View>
  </ScrollView>
);

const SettingsModule = () => (
  <ScrollView 
    className="flex-1"
    contentContainerStyle={{ padding: 24, paddingBottom: 80 }}
    showsVerticalScrollIndicator={false}
    keyboardShouldPersistTaps="handled"
  >
    <View>
      <Text className="text-3xl font-extrabold text-gray-900 mb-6">Settings</Text>
      <Text className="text-gray-500 text-base text-center mt-15 italic">Company settings coming soon...</Text>
    </View>
  </ScrollView>
);