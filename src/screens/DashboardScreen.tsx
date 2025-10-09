// src/screens/DashboardScreen.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  ScrollView,
  TextInput,
  Modal,
  Alert,
  Image
} from "react-native";
import { Feather, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { COLORS, isMobile } from "../constants/theme";

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
    { id: 1, category: "Salaries", amount: 245000, percentage: 54, trend: "up", color: COLORS.accent },
    { id: 2, category: "Operations", amount: 87300, percentage: 19, trend: "stable", color: COLORS.primary },
    { id: 3, category: "Marketing", amount: 45600, percentage: 10, trend: "up", color: COLORS.secondary },
    { id: 4, category: "R&D", amount: 38900, percentage: 9, trend: "up", color: "#8B5CF6" },
    { id: 5, category: "Other", amount: 35500, percentage: 8, trend: "down", color: COLORS.tertiary }
  ],
  recentTransactions: [
    { id: 1, type: "revenue", description: "Q3 Product Sales", amount: 125000, date: "2024-03-15", status: "completed" },
    { id: 2, type: "expense", description: "Team Offsite", amount: -15000, date: "2024-03-14", status: "completed" },
    { id: 3, type: "revenue", description: "Enterprise Contract", amount: 75000, date: "2024-03-12", status: "pending" },
    { id: 4, type: "expense", description: "Software Licenses", amount: -12000, date: "2024-03-10", status: "completed" },
    { id: 5, type: "revenue", description: "Consulting Services", amount: 45000, date: "2024-03-08", status: "completed" }
  ],
  employees: [
    { id: 1, name: "Sarah Chen", role: "CTO", department: "Engineering", salary: 185000, status: "active" },
    { id: 2, name: "Marcus Johnson", role: "CFO", department: "Finance", salary: 165000, status: "active" },
    { id: 3, name: "Elena Rodriguez", role: "CMO", department: "Marketing", salary: 155000, status: "active" },
    { id: 4, name: "David Kim", role: "Lead Developer", department: "Engineering", salary: 145000, status: "active" }
  ],
  shareholders: [
    { id: 1, name: "Sarah Chen", shares: 250000, percentage: 25, value: 6250000 },
    { id: 2, name: "Venture Partners", shares: 200000, percentage: 20, value: 5000000 },
    { id: 3, name: "Marcus Johnson", shares: 150000, percentage: 15, value: 3750000 },
    { id: 4, name: "Angel Investors", shares: 100000, percentage: 10, value: 2500000 }
  ]
};

// Format currency function - moved to top level
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
  const [dateRange, setDateRange] = useState("q1_2024");
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
    { id: "overview", icon: "home", label: "Dashboard", color: COLORS.accent },
    { id: "expenses", icon: "credit-card", label: "Expenses", color: "#8B5CF6" },
    { id: "payroll", icon: "users", label: "Payroll", color: "#06B6D4" },
    { id: "shareholders", icon: "pie-chart", label: "Shareholders", color: "#10B981" },
    { id: "reports", icon: "bar-chart-2", label: "Analytics", color: "#F59E0B" },
    { id: "settings", icon: "settings", label: "Settings", color: COLORS.tertiary },
  ];

  const renderModuleContent = () => {
    switch (activeModule) {
      case "overview":
        return <OverviewModule data={DEMO_DATA} />;
      case "expenses":
        return <ExpensesModule data={DEMO_DATA} />;
      case "payroll":
        return <PayrollModule data={DEMO_DATA} />;
      case "shareholders":
        return <ShareholdersModule data={DEMO_DATA} />;
      case "reports":
        return <ReportsModule data={DEMO_DATA} />;
      case "settings":
        return <SettingsModule />;
      default:
        return <OverviewModule data={DEMO_DATA} />;
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Premium Sidebar Navigation */}
      <Animated.View 
        style={[
          styles.sidebar,
          { 
            width: sidebarWidth,
            opacity: sidebarOpacity
          }
        ]}
      >
        <View style={styles.sidebarBackground}>
          {/* Sidebar Header */}
          <View style={styles.sidebarHeader}>
            <View style={styles.logoContainer}>
              <View style={styles.logoIcon}>
                <Feather name="trending-up" size={28} color={COLORS.accent} />
              </View>
              {!isSidebarCollapsed && (
                <View>
                  <Text style={styles.logoText}>
                    Share<Text style={styles.logoAccent}>Flow</Text>
                  </Text>
                  <Text style={styles.companySubtitle}>ENTERPRISE</Text>
                </View>
              )}
            </View>
            
            <TouchableOpacity 
              style={styles.collapseButton}
              onPress={toggleSidebar}
            >
              <Feather 
                name={isSidebarCollapsed ? "chevron-right" : "chevron-left"} 
                size={18} 
                color={COLORS.textLight} 
              />
            </TouchableOpacity>
          </View>

          {/* Navigation Items */}
          <ScrollView style={styles.sidebarContent} showsVerticalScrollIndicator={false}>
            {sidebarItems.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.navItem,
                  activeModule === item.id && styles.navItemActive
                ]}
                onPress={() => setActiveModule(item.id)}
              >
                <View style={[
                  styles.navItemBackground,
                  activeModule === item.id && { backgroundColor: item.color + '30' }
                ]}>
                  <View style={[
                    styles.navIconContainer,
                    { backgroundColor: activeModule === item.id ? item.color : 'transparent' }
                  ]}>
                    <Feather 
                      name={item.icon as any} 
                      size={20} 
                      color={activeModule === item.id ? COLORS.white : item.color} 
                    />
                  </View>
                  
                  {!isSidebarCollapsed && (
                    <Text style={[
                      styles.navLabel,
                      activeModule === item.id && styles.navLabelActive
                    ]}>
                      {item.label}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* User Profile & Logout */}
          {!isSidebarCollapsed && (
            <View style={styles.sidebarFooter}>
              <View style={styles.userProfile}>
                <View style={styles.userAvatar}>
                  <Text style={styles.userAvatarText}>SC</Text>
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>Sarah Chen</Text>
                  <Text style={styles.userRole}>Administrator</Text>
                </View>
              </View>
              
              <TouchableOpacity 
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <Feather name="log-out" size={18} color="#ef4444" />
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Animated.View>

      {/* Main Content Area */}
      <View style={styles.mainContent}>
        {/* Premium Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <Text style={styles.headerTitle}>
                {sidebarItems.find(item => item.id === activeModule)?.label}
              </Text>
              <Text style={styles.headerSubtitle}>
                {DEMO_DATA.company.name} • {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Text>
            </View>

            <View style={styles.headerRight}>
              {/* Search Bar */}
              <View style={styles.searchContainer}>
                <Feather name="search" size={18} color={COLORS.tertiary} />
                <TextInput
                  placeholder="Search transactions, reports..."
                  placeholderTextColor={COLORS.tertiary + "80"}
                  style={styles.searchInput}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                {searchQuery && (
                  <TouchableOpacity onPress={() => setSearchQuery("")}>
                    <Feather name="x" size={16} color={COLORS.tertiary} />
                  </TouchableOpacity>
                )}
              </View>

              {/* Date Range Selector */}
              <TouchableOpacity style={styles.dateSelector}>
                <Feather name="calendar" size={16} color={COLORS.tertiary} />
                <Text style={styles.dateText}>Q1 2024</Text>
                <Feather name="chevron-down" size={14} color={COLORS.tertiary} />
              </TouchableOpacity>

              {/* Notifications */}
              <TouchableOpacity style={styles.notificationButton}>
                <Feather name="bell" size={18} color={COLORS.tertiary} />
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationCount}>3</Text>
                </View>
              </TouchableOpacity>

              {/* Theme Toggle */}
              <TouchableOpacity 
                style={styles.themeToggle}
                onPress={() => setIsDarkMode(!isDarkMode)}
              >
                <View style={[
                  styles.themeToggleBackground,
                  { backgroundColor: isDarkMode ? '#4B5563' : '#FBBF24' }
                ]}>
                  <Feather 
                    name={isDarkMode ? "moon" : "sun"} 
                    size={16} 
                    color={COLORS.white} 
                  />
                </View>
              </TouchableOpacity>

              {/* Profile Dropdown */}
              <TouchableOpacity 
                style={styles.profileButton}
                onPress={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              >
                <View style={styles.profileAvatar}>
                  <Text style={styles.profileAvatarText}>SC</Text>
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
            style={styles.dropdownOverlay}
            activeOpacity={1}
            onPress={() => setIsProfileDropdownOpen(false)}
          >
            <View style={styles.profileDropdown}>
              <View style={styles.dropdownHeader}>
                <View style={styles.dropdownAvatar}>
                  <Text style={styles.dropdownAvatarText}>SC</Text>
                </View>
                <View style={styles.dropdownProfileInfo}>
                  <Text style={styles.dropdownName}>Sarah Chen</Text>
                  <Text style={styles.dropdownRole}>Chief Technology Officer</Text>
                  <Text style={styles.dropdownCompany}>{DEMO_DATA.company.name}</Text>
                </View>
              </View>
              
              <View style={styles.dropdownContent}>
                <TouchableOpacity style={styles.dropdownItem}>
                  <Feather name="user" size={18} color={COLORS.tertiary} />
                  <Text style={styles.dropdownText}>My Profile</Text>
                  <Feather name="chevron-right" size={16} color={COLORS.tertiary} />
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.dropdownItem}>
                  <Feather name="settings" size={18} color={COLORS.tertiary} />
                  <Text style={styles.dropdownText}>Company Settings</Text>
                  <Feather name="chevron-right" size={16} color={COLORS.tertiary} />
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.dropdownItem}>
                  <Feather name="credit-card" size={18} color={COLORS.tertiary} />
                  <Text style={styles.dropdownText}>Billing & Plans</Text>
                  <Feather name="chevron-right" size={16} color={COLORS.tertiary} />
                </TouchableOpacity>
                
                <View style={styles.dropdownDivider} />
                
                <TouchableOpacity 
                  style={[styles.dropdownItem, styles.logoutDropdownItem]}
                  onPress={handleLogout}
                >
                  <Feather name="log-out" size={18} color="#ef4444" />
                  <Text style={styles.logoutDropdownText}>Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Main Module Content */}
        <ScrollView 
          style={styles.moduleContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.moduleContent}
        >
          {renderModuleContent()}
        </ScrollView>
      </View>
    </Animated.View>
  );
}

// Premium Module Components
const OverviewModule = ({ data }: any) => (
  <View style={styles.module}>
    {/* Welcome & Quick Stats */}
    <View style={styles.welcomeSection}>
      <View style={styles.welcomeText}>
        <Text style={styles.welcomeTitle}>Welcome back, Sarah! 👋</Text>
        <Text style={styles.welcomeSubtitle}>
          Here's what's happening with {data.company.name} today.
        </Text>
      </View>
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.quickAction}>
          <Feather name="plus" size={18} color={COLORS.white} />
          <Text style={styles.quickActionText}>Add Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionSecondary}>
          <Feather name="bar-chart" size={18} color={COLORS.accent} />
          <Text style={styles.quickActionTextSecondary}>Generate Report</Text>
        </TouchableOpacity>
      </View>
    </View>

    {/* Financial Overview Cards */}
    <View style={styles.financialGrid}>
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
    <View style={styles.analyticsRow}>
      <View style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Revenue Trend</Text>
          <TouchableOpacity>
            <Text style={styles.chartAction}>View Report →</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.chartPlaceholder}>
          {/* Simulated chart with bars */}
          <View style={styles.chartBars}>
            {[60, 80, 45, 90, 75, 95, 70].map((height, index) => (
              <View key={index} style={[styles.chartBar, { height: `${height}%` }]} />
            ))}
          </View>
          <View style={styles.chartLabels}>
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((label, index) => (
              <Text key={index} style={styles.chartLabel}>{label}</Text>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.expenseBreakdown}>
        <View style={styles.expenseHeader}>
          <Text style={styles.expenseTitle}>Expense Breakdown</Text>
          <Text style={styles.expenseTotal}>{formatCurrency(data.financials.expenses.current)}</Text>
        </View>
        {data.expenses.map((expense: any) => (
          <ExpenseItem key={expense.id} expense={expense} />
        ))}
      </View>
    </View>

    {/* Recent Activity */}
    <View style={styles.recentActivity}>
      <View style={styles.activityHeader}>
        <Text style={styles.activityTitle}>Recent Transactions</Text>
        <TouchableOpacity>
          <Text style={styles.activityAction}>View All →</Text>
        </TouchableOpacity>
      </View>
      {data.recentTransactions.map((transaction: any) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </View>
  </View>
);

const FinancialCard = ({ title, amount, change, changeAmount, icon, color }: any) => (
  <View style={styles.financialCard}>
    <View style={styles.financialCardBackground}>
      <View style={styles.financialCardHeader}>
        <View style={[styles.financialIcon, { backgroundColor: color + '20' }]}>
          <Feather name={icon} size={20} color={color} />
        </View>
        <View style={styles.financialTrend}>
          <Feather 
            name={change === 'up' ? 'trending-up' : 'trending-down'} 
            size={14} 
            color={change === 'up' ? '#10B981' : '#EF4444'} 
          />
          <Text style={[
            styles.trendText,
            { color: change === 'up' ? '#10B981' : '#EF4444' }
          ]}>
            {change === 'up' ? '+' : ''}{formatCurrency(Math.abs(changeAmount))}
          </Text>
        </View>
      </View>
      
      <Text style={styles.financialAmount}>{formatCurrency(amount)}</Text>
      <Text style={styles.financialTitle}>{title}</Text>
      
      <View style={styles.financialFooter}>
        <Text style={styles.financialSubtitle}>Last 30 days</Text>
      </View>
    </View>
  </View>
);

const ExpenseItem = ({ expense }: any) => (
  <View style={styles.expenseItem}>
    <View style={styles.expenseLeft}>
      <View style={[styles.expenseDot, { backgroundColor: expense.color }]} />
      <View>
        <Text style={styles.expenseCategory}>{expense.category}</Text>
        <Text style={styles.expensePercentage}>{expense.percentage}% of total</Text>
      </View>
    </View>
    <View style={styles.expenseRight}>
      <Text style={styles.expenseAmount}>{formatCurrency(expense.amount)}</Text>
      <Feather 
        name={expense.trend === 'up' ? 'trending-up' : expense.trend === 'down' ? 'trending-down' : 'minus'}
        size={14} 
        color={expense.trend === 'up' ? '#10B981' : expense.trend === 'down' ? '#EF4444' : '#6B7280'} 
      />
    </View>
  </View>
);

const TransactionItem = ({ transaction }: any) => (
  <View style={styles.transactionItem}>
    <View style={[
      styles.transactionIcon,
      { backgroundColor: transaction.type === 'revenue' ? '#10B98120' : '#EF444420' }
    ]}>
      <Feather 
        name={transaction.type === 'revenue' ? 'arrow-down-left' : 'arrow-up-right'} 
        size={16} 
        color={transaction.type === 'revenue' ? '#10B981' : '#EF4444'} 
      />
    </View>
    
    <View style={styles.transactionDetails}>
      <Text style={styles.transactionDescription}>{transaction.description}</Text>
      <Text style={styles.transactionDate}>
        {new Date(transaction.date).toLocaleDateString()} • 
        <Text style={[
          styles.transactionStatus,
          { color: transaction.status === 'completed' ? '#10B981' : '#F59E0B' }
        ]}>
          {transaction.status === 'completed' ? ' Completed' : ' Pending'}
        </Text>
      </Text>
    </View>
    
    <Text style={[
      styles.transactionAmount,
      { color: transaction.type === 'revenue' ? '#10B981' : '#EF4444' }
    ]}>
      {transaction.type === 'revenue' ? '+' : ''}{formatCurrency(transaction.amount)}
    </Text>
  </View>
);

// Placeholder modules for other sections (would be fully implemented similarly)
const ExpensesModule = ({ data }: any) => (
  <View style={styles.module}>
    <Text style={styles.moduleTitle}>Expense Management</Text>
    <Text style={styles.comingSoon}>Advanced expense tracking coming soon...</Text>
  </View>
);

const PayrollModule = ({ data }: any) => (
  <View style={styles.module}>
    <Text style={styles.moduleTitle}>Payroll Management</Text>
    <Text style={styles.comingSoon}>Payroll automation coming soon...</Text>
  </View>
);

const ShareholdersModule = ({ data }: any) => (
  <View style={styles.module}>
    <Text style={styles.moduleTitle}>Shareholder Management</Text>
    <Text style={styles.comingSoon}>Equity management coming soon...</Text>
  </View>
);

const ReportsModule = ({ data }: any) => (
  <View style={styles.module}>
    <Text style={styles.moduleTitle}>Advanced Analytics</Text>
    <Text style={styles.comingSoon}>Deep analytics dashboard coming soon...</Text>
  </View>
);

const SettingsModule = () => (
  <View style={styles.module}>
    <Text style={styles.moduleTitle}>Settings</Text>
    <Text style={styles.comingSoon}>Company settings coming soon...</Text>
  </View>
);

// Ultra-Premium Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: COLORS.white,
  },
  sidebar: {
    backgroundColor: COLORS.neutral,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    zIndex: 1000,
  },
  sidebarBackground: {
    flex: 1,
    backgroundColor: COLORS.neutral,
  },
  sidebarHeader: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logoIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(134, 194, 50, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(134, 194, 50, 0.3)",
  },
  logoText: {
    color: COLORS.textLight,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  logoAccent: {
    color: COLORS.accent,
  },
  companySubtitle: {
    color: COLORS.accent,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    marginTop: 2,
  },
  collapseButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  sidebarContent: {
    flex: 1,
    paddingVertical: 20,
  },
  navItem: {
    marginHorizontal: 12,
    marginVertical: 4,
    borderRadius: 12,
    overflow: "hidden",
  },
  navItemBackground: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  navItemActive: {
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  navIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  navLabel: {
    color: COLORS.textLight,
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 12,
    opacity: 0.9,
  },
  navLabelActive: {
    color: COLORS.accent,
    fontWeight: "700",
  },
  sidebarFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  userProfile: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  userAvatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.accent,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  userAvatarText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: COLORS.textLight,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 2,
  },
  userRole: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    fontWeight: "500",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.2)",
    gap: 8,
  },
  logoutText: {
    color: "#ef4444",
    fontSize: 14,
    fontWeight: "600",
  },
  mainContent: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  headerContent: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.textDark,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.tertiary,
    fontWeight: "500",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    minWidth: 280,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
    fontSize: 14,
    color: COLORS.textDark,
  },
  dateSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dateText: {
    fontSize: 14,
    color: COLORS.textDark,
    fontWeight: "600",
  },
  notificationButton: {
    position: "relative",
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationCount: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "700",
  },
  themeToggle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  themeToggleBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  profileButton: {
    marginLeft: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  profileAvatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.accent,
    justifyContent: "center",
    alignItems: "center",
  },
  profileAvatarText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 16,
  },
  dropdownOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 100,
    paddingRight: 24,
  },
  profileDropdown: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    width: 320,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 16,
    overflow: "hidden",
  },
  dropdownHeader: {
    padding: 24,
    backgroundColor: COLORS.accent,
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownAvatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  dropdownAvatarText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 20,
  },
  dropdownProfileInfo: {
    flex: 1,
  },
  dropdownName: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 2,
  },
  dropdownRole: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  dropdownCompany: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    fontWeight: "500",
  },
  dropdownContent: {
    padding: 16,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    gap: 12,
  },
  dropdownText: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textDark,
    fontWeight: "500",
  },
  dropdownDivider: {
    height: 1,
    backgroundColor: "#f1f5f9",
    marginVertical: 8,
  },
  logoutDropdownItem: {
    marginTop: 4,
  },
  logoutDropdownText: {
    flex: 1,
    fontSize: 15,
    color: "#ef4444",
    fontWeight: "600",
  },
  moduleContainer: {
    flex: 1,
  },
  moduleContent: {
    padding: 24,
  },
  module: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.textDark,
    marginBottom: 24,
  },
  comingSoon: {
    fontSize: 16,
    color: COLORS.tertiary,
    textAlign: "center",
    marginTop: 60,
    fontStyle: "italic",
  },
  welcomeSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  welcomeText: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.textDark,
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: COLORS.tertiary,
    fontWeight: "500",
  },
  quickActions: {
    flexDirection: "row",
    gap: 12,
  },
  quickAction: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.accent,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  quickActionText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
  },
  quickActionSecondary: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  quickActionTextSecondary: {
    color: COLORS.accent,
    fontSize: 14,
    fontWeight: "600",
  },
  financialGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 32,
  },
  financialCard: {
    width: isMobile ? "100%" : "48%",
    minWidth: 280,
    flex: 1,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    overflow: "hidden",
  },
  financialCardBackground: {
    padding: 24,
    backgroundColor: COLORS.white,
  },
  financialCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  financialIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  financialTrend: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  trendText: {
    fontSize: 12,
    fontWeight: "600",
  },
  financialAmount: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.textDark,
    marginBottom: 4,
  },
  financialTitle: {
    fontSize: 16,
    color: COLORS.tertiary,
    fontWeight: "600",
    marginBottom: 8,
  },
  financialFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  financialSubtitle: {
    fontSize: 12,
    color: COLORS.tertiary,
    fontWeight: "500",
  },
  analyticsRow: {
    flexDirection: isMobile ? "column" : "row",
    gap: 24,
    marginBottom: 32,
  },
  chartContainer: {
    flex: 2,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  chartHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textDark,
  },
  chartAction: {
    fontSize: 14,
    color: COLORS.accent,
    fontWeight: "600",
  },
  chartPlaceholder: {
    height: 200,
    justifyContent: "space-between",
  },
  chartBars: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  chartBar: {
    width: 30,
    backgroundColor: COLORS.accent,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  chartLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 12,
  },
  chartLabel: {
    fontSize: 12,
    color: COLORS.tertiary,
    fontWeight: "500",
  },
  expenseBreakdown: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  expenseHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  expenseTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textDark,
  },
  expenseTotal: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.accent,
  },
  expenseItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f8fafc",
  },
  expenseLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  expenseDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  expenseCategory: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textDark,
    marginBottom: 2,
  },
  expensePercentage: {
    fontSize: 12,
    color: COLORS.tertiary,
    fontWeight: "500",
  },
  expenseRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  expenseAmount: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textDark,
  },
  recentActivity: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  activityHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textDark,
  },
  activityAction: {
    fontSize: 14,
    color: COLORS.accent,
    fontWeight: "600",
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f8fafc",
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.textDark,
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: COLORS.tertiary,
    fontWeight: "500",
  },
  transactionStatus: {
    fontWeight: "600",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "700",
  },
});