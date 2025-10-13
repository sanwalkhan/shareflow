// src/components/admin/shareholders/ShareholdersModule.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  useWindowDimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, WINDOW } from "../../constants/theme";

// Modular components
import {
  QuickActionButton,
  ShareholderCard,
  ShareholderFormModal,
  ActionsModal,
  StatsOverview,
  SearchBar,
  EmptyState,
} from "./shareholders";
import { Shareholder, ShareholderFormData } from "./shareholders/types";

export default function ShareholdersModule() {
  const { width } = useWindowDimensions();
  const isMobile = width < 900;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // ──────────────────────────────
  // 🧠 State
  // ──────────────────────────────
  const [shareholders, setShareholders] = useState<Shareholder[]>([
    {
      id: 1,
      name: "Sarah Chen",
      email: "sarah.chen@email.com",
      equity: 32.5,
      investment: 325000,
      profit: 50000,
      returns: 15000,
      otherMoney: 10000,
      joinDate: "2022-03-15",
    },
    {
      id: 2,
      name: "Marcus Johnson",
      email: "marcus.j@email.com",
      equity: 25.0,
      investment: 250000,
      profit: 30000,
      returns: 10000,
      otherMoney: 5000,
      joinDate: "2021-11-08",
    },
    {
      id: 3,
      name: "Aisha Patel",
      email: "a.patel@email.com",
      equity: 18.7,
      investment: 187000,
      profit: 20000,
      returns: 8000,
      otherMoney: 2000,
      joinDate: "2023-01-22",
    },
    {
      id: 4,
      name: "James Wilson",
      email: "jwilson@email.com",
      equity: 12.3,
      investment: 123000,
      profit: 15000,
      returns: 5000,
      otherMoney: 1000,
      joinDate: "2022-07-30",
    },
    {
      id: 5,
      name: "Emma Rodriguez",
      email: "emma.r@email.com",
      equity: 11.5,
      investment: 115000,
      profit: 12000,
      returns: 4000,
      otherMoney: 500,
      joinDate: "2023-02-14",
    },
  ]);

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isActionsModalVisible, setIsActionsModalVisible] = useState(false);
  const [selectedShareholder, setSelectedShareholder] = useState<Shareholder | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentAction, setCurrentAction] = useState("");

  // ──────────────────────────────
  // 📊 Derived Calculations
  // ──────────────────────────────
  const totalEquity = shareholders.reduce((sum, s) => sum + s.equity, 0);
  const totalInvestment = shareholders.reduce((sum, s) => sum + s.investment, 0);
  const totalProfit = shareholders.reduce((sum, s) => sum + (s.profit || 0), 0);
  const totalReturns = shareholders.reduce((sum, s) => sum + (s.returns || 0), 0);
  const totalOtherMoney = shareholders.reduce((sum, s) => sum + (s.otherMoney || 0), 0);

  const filteredShareholders = shareholders.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ──────────────────────────────
  // ⚙️ Handlers
  // ──────────────────────────────
  const handleAdd = (data: ShareholderFormData) => {
    const id = Math.max(0, ...shareholders.map((s) => s.id)) + 1;
    const newShareholder: Shareholder = {
      id,
      name: data.name,
      email: data.email,
      equity: parseFloat(data.equity as string) || 0,
      investment: parseFloat(data.investment as string) || 0,
      profit: parseFloat(data.profit as string) || 0,
      returns: parseFloat(data.returns as string) || 0,
      otherMoney: parseFloat(data.otherMoney as string) || 0,
      joinDate: data.joinDate,
    };
    setShareholders([...shareholders, newShareholder]);
    setIsAddModalVisible(false);
  };

  const handleEdit = (shareholder: Shareholder) => {
    setSelectedShareholder(shareholder);
    setIsEditModalVisible(true);
  };

  const handleUpdate = (updatedData: ShareholderFormData) => {
    if (selectedShareholder) {
      setShareholders((prev) =>
        prev.map((s) =>
          s.id === selectedShareholder.id
            ? {
                ...s,
                name: updatedData.name,
                email: updatedData.email,
                equity: parseFloat(updatedData.equity as string) || 0,
                investment: parseFloat(updatedData.investment as string) || 0,
                profit: parseFloat(updatedData.profit as string) || 0,
                returns: parseFloat(updatedData.returns as string) || 0,
                otherMoney: parseFloat(updatedData.otherMoney as string) || 0,
                joinDate: updatedData.joinDate,
              }
            : s
        )
      );
      setSelectedShareholder(null);
      setIsEditModalVisible(false);
    }
  };

  const handleDelete = (shareholder: Shareholder) => {
    Alert.alert(
      "Remove Shareholder",
      `Are you sure you want to remove ${shareholder.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            setShareholders((prev) => prev.filter((s) => s.id !== shareholder.id));
          },
        },
      ]
    );
  };

  const handleQuickAction = (action: string) => {
    setCurrentAction(action);
    setIsActionsModalVisible(true);
  };

  const executeAction = () => {
    Alert.alert("Action Completed", `${currentAction} has been processed successfully.`, [
      { text: "OK" },
    ]);
    setIsActionsModalVisible(false);
    setCurrentAction("");
  };

  // ──────────────────────────────
  // 🌐 WEB VERSION
  // ──────────────────────────────
  if (Platform.OS === "web") {
    return (
      <View className="flex flex-col h-screen bg-gray-50 overflow-hidden">
        <View className="flex-1 overflow-y-auto overflow-x-hidden web-scroll">
          <Animated.View
            style={{
              minHeight: WINDOW.height,
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            {/* Header Section */}
            <View style={{ backgroundColor: COLORS.white }} className="px-6 pt-6 pb-4 border-b border-gray-200 shadow-sm">
              <View className="flex-row justify-between items-start mb-6">
                <View className="flex-1 mr-4">
                  <Text style={{ color: COLORS.textDark }} className="text-3xl font-bold">
                    Shareholder Management
                  </Text>
                  <Text style={{ color: COLORS.tertiary }} className="text-base mt-1">
                    Manage equity, profit, returns, and contributions
                  </Text>
                </View>
                <TouchableOpacity
                  className="flex-row items-center px-4 py-3 rounded-2xl shadow-lg"
                  style={{ backgroundColor: COLORS.accent }}
                  onPress={() => setIsAddModalVisible(true)}
                >
                  <Ionicons name="add" size={20} color={COLORS.white} />
                  <Text style={{ color: COLORS.white }} className="font-semibold ml-2">
                    Add New
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Quick Actions + Stats */}
              <View className="flex-row mb-4">
                <QuickActionButton
                  icon="shield-checkmark"
                  label="Equity Validation"
                  color="bg-green-500"
                  onPress={() => handleQuickAction("Equity Validation")}
                />
                <QuickActionButton
                  icon="cash"
                  label="Dividend Actions"
                  color="bg-purple-500"
                  onPress={() => handleQuickAction("Dividend Actions")}
                />
                <QuickActionButton
                  icon="analytics"
                  label="Reports"
                  color="bg-blue-500"
                  onPress={() => handleQuickAction("Reports")}
                />
              </View>

              <StatsOverview
                totalEquity={totalEquity}
                totalInvestment={totalInvestment}
                totalProfit={totalProfit}
                totalReturns={totalReturns}
                totalOtherMoney={totalOtherMoney}
                totalShareholders={shareholders.length}
              />
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                onClear={() => setSearchQuery("")}
              />
            </View>

            {/* Scrollable List */}
            <View className="px-6 pt-4 pb-10">
              <Text style={{ color: COLORS.textDark }} className="font-medium mb-3">
                All Shareholders ({filteredShareholders.length})
              </Text>

              {filteredShareholders.length > 0 ? (
                filteredShareholders.map((shareholder) => (
                  <ShareholderCard
                    key={shareholder.id}
                    shareholder={shareholder}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))
              ) : (
                <EmptyState
                  searchQuery={searchQuery}
                  onAddPress={() => setIsAddModalVisible(true)}
                />
              )}
            </View>
          </Animated.View>
        </View>

        {/* Modals */}
        <ShareholderFormModal
          visible={isAddModalVisible}
          mode="add"
          onSave={handleAdd}
          onClose={() => setIsAddModalVisible(false)}
        />
        <ShareholderFormModal
          visible={isEditModalVisible}
          mode="edit"
          shareholder={selectedShareholder}
          onSave={handleUpdate}
          onClose={() => {
            setIsEditModalVisible(false);
            setSelectedShareholder(null);
          }}
        />
        <ActionsModal
          visible={isActionsModalVisible}
          action={currentAction}
          stats={{
            totalEquity,
            totalInvestment,
            totalProfit,
            totalReturns,
            totalOtherMoney,
            totalShareholders: shareholders.length,
          }}
          onExecute={executeAction}
          onClose={() => {
            setIsActionsModalVisible(false);
            setCurrentAction("");
          }}
        />
      </View>
    );
  }

  // ──────────────────────────────
  // 📱 MOBILE VERSION
  // ──────────────────────────────
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={{
              minHeight: WINDOW.height,
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            {/* Header + Content identical to web */}
            <View style={{ backgroundColor: COLORS.white }} className="px-6 pt-6 pb-4 border-b border-gray-200">
              <View className="flex-row justify-between items-start mb-6">
                <View className="flex-1 mr-4">
                  <Text style={{ color: COLORS.textDark }} className="text-3xl font-bold">
                    Shareholder Management
                  </Text>
                  <Text style={{ color: COLORS.tertiary }} className="text-base mt-1">
                    Manage equity, profit, returns, and contributions
                  </Text>
                </View>
                <TouchableOpacity
                  className="flex-row items-center px-4 py-3 rounded-2xl shadow-lg"
                  style={{ backgroundColor: COLORS.accent }}
                  onPress={() => setIsAddModalVisible(true)}
                >
                  <Ionicons name="add" size={20} color={COLORS.white} />
                  <Text style={{ color: COLORS.white }} className="font-semibold ml-2">
                    Add New
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="flex-row mb-4">
                <QuickActionButton
                  icon="shield-checkmark"
                  label="Equity Validation"
                  color="bg-green-500"
                  onPress={() => handleQuickAction("Equity Validation")}
                />
                <QuickActionButton
                  icon="cash"
                  label="Dividend Actions"
                  color="bg-purple-500"
                  onPress={() => handleQuickAction("Dividend Actions")}
                />
                <QuickActionButton
                  icon="analytics"
                  label="Reports"
                  color="bg-blue-500"
                  onPress={() => handleQuickAction("Reports")}
                />
              </View>

              <StatsOverview
                totalEquity={totalEquity}
                totalInvestment={totalInvestment}
                totalProfit={totalProfit}
                totalReturns={totalReturns}
                totalOtherMoney={totalOtherMoney}
                totalShareholders={shareholders.length}
              />
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                onClear={() => setSearchQuery("")}
              />
            </View>

            <View className="px-6 pt-4">
              <Text style={{ color: COLORS.textDark }} className="font-medium mb-3">
                All Shareholders ({filteredShareholders.length})
              </Text>

              {filteredShareholders.length > 0 ? (
                filteredShareholders.map((shareholder) => (
                  <ShareholderCard
                    key={shareholder.id}
                    shareholder={shareholder}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))
              ) : (
                <EmptyState
                  searchQuery={searchQuery}
                  onAddPress={() => setIsAddModalVisible(true)}
                />
              )}
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modals */}
      <ShareholderFormModal
        visible={isAddModalVisible}
        mode="add"
        onSave={handleAdd}
        onClose={() => setIsAddModalVisible(false)}
      />
      <ShareholderFormModal
        visible={isEditModalVisible}
        mode="edit"
        shareholder={selectedShareholder}
        onSave={handleUpdate}
        onClose={() => {
          setIsEditModalVisible(false);
          setSelectedShareholder(null);
        }}
      />
      <ActionsModal
        visible={isActionsModalVisible}
        action={currentAction}
        stats={{
          totalEquity,
          totalInvestment,
          totalProfit,
          totalReturns,
          totalOtherMoney,
          totalShareholders: shareholders.length,
        }}
        onExecute={executeAction}
        onClose={() => {
          setIsActionsModalVisible(false);
          setCurrentAction("");
        }}
      />
    </View>
  );
}
