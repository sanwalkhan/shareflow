import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Animated,
  useWindowDimensions,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, WINDOW } from "../../constants/theme";
import BudgetOverview from "../admin/expenses/BudgetOverview";
import ExpenseList from "../admin/expenses/ExpenseList";
import AddExpenseModal from "../admin/expenses/AddExpenseModal";
import AddFundsModal from "../admin/expenses/AddFundsModal";
import ExpenseDetailModal from "../admin/expenses/ExpenseDetailModal";
import { Expense, Budget, Shareholder } from "../admin/expenses/types";

export default function ExpensesModule() {
  const { width } = useWindowDimensions();
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

  // ───────────────────────────────────────────────
  // 🔹 STATE
  // ───────────────────────────────────────────────
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [loading, setLoading] = useState(false);

  const [budget, setBudget] = useState<Budget>({
    total: 100000,
    used: 0,
    remaining: 100000,
    categories: {
      Operations: { allocated: 30000, used: 0, remaining: 30000 },
      Marketing: { allocated: 20000, used: 0, remaining: 20000 },
      "R&D": { allocated: 15000, used: 0, remaining: 15000 },
      Administrative: { allocated: 10000, used: 0, remaining: 10000 },
      Travel: { allocated: 5000, used: 0, remaining: 5000 },
      Miscellaneous: { allocated: 20000, used: 0, remaining: 20000 },
    },
  });

  const [shareholders] = useState<Shareholder[]>([
    { id: "1", name: "John Doe", email: "john@company.com", sharePercentage: 40, allocatedAmount: 0 },
    { id: "2", name: "Jane Smith", email: "jane@company.com", sharePercentage: 30, allocatedAmount: 0 },
    { id: "3", name: "Mike Johnson", email: "mike@company.com", sharePercentage: 20, allocatedAmount: 0 },
    { id: "4", name: "Sarah Wilson", email: "sarah@company.com", sharePercentage: 10, allocatedAmount: 0 },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "routine" as "routine" | "special",
    category: "",
    date: new Date(),
    description: "",
    taxDeductible: false,
    recurring: false,
    recurrence: "monthly" as "daily" | "weekly" | "monthly" | "yearly",
    budgetCategory: "",
  });

  const [distributionMethod, setDistributionMethod] = useState<"equal" | "percentage" | "custom">("percentage");
  const [customAllocations, setCustomAllocations] = useState<{ [key: string]: string }>({});

  const categories = ["Operations", "Marketing", "R&D", "Administrative", "Travel", "Miscellaneous"];

  const expenseTypes = [
    { label: "Routine Expense", value: "routine", icon: "refresh-cw", color: COLORS.accent },
    { label: "Special Expense", value: "special", icon: "star", color: COLORS.secondary },
  ];

  // ───────────────────────────────────────────────
  // 🔹 FUNCTIONS
  // ───────────────────────────────────────────────
  const calculateAllocations = (amount: number) => {
    const totalShares = shareholders.reduce((sum, sh) => sum + sh.sharePercentage, 0);
    return shareholders.map((sh) => ({
      ...sh,
      allocatedAmount:
        distributionMethod === "equal"
          ? amount / shareholders.length
          : distributionMethod === "percentage"
          ? (amount * sh.sharePercentage) / totalShares
          : parseFloat(customAllocations[sh.id] || "0"),
    }));
  };

  const handleAddExpense = () => {
    if (!formData.title || !formData.amount || !formData.category) {
      Alert.alert("Missing Information", "Please fill all required fields");
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid amount");
      return;
    }

    if (amount > budget.remaining) {
      Alert.alert("Budget Exceeded", `This expense exceeds your remaining budget of $${budget.remaining.toLocaleString()}`);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const newExpense: Expense = {
        id: Date.now().toString(),
        title: formData.title,
        amount,
        type: formData.type,
        category: formData.category,
        date: new Date(),
        description: formData.description,
        receipt: null,
        status: "approved",
        createdBy: "Admin",
        createdAt: new Date(),
        shareholders: calculateAllocations(amount),
        taxDeductible: formData.taxDeductible,
        recurring: formData.recurring,
        recurrence: formData.recurring ? formData.recurrence : undefined,
        budgetCategory: formData.budgetCategory,
      };

      const updatedBudget = {
        ...budget,
        used: budget.used + amount,
        remaining: budget.remaining - amount,
        categories: {
          ...budget.categories,
          [formData.category]: {
            ...budget.categories[formData.category],
            used: budget.categories[formData.category].used + amount,
            remaining: budget.categories[formData.category].remaining - amount,
          },
        },
      };

      setExpenses((prev) => [newExpense, ...prev]);
      setBudget(updatedBudget);
      setLoading(false);
      setShowAddExpense(false);
      Alert.alert("Success", "Expense added successfully");
    }, 800);
  };

  const handleAddFunds = (amount: number, category?: string) => {
    if (isNaN(amount) || amount <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid positive number");
      return;
    }

    if (category) {
      setBudget((prev) => ({
        ...prev,
        total: prev.total + amount,
        remaining: prev.remaining + amount,
        categories: {
          ...prev.categories,
          [category]: {
            ...prev.categories[category],
            allocated: prev.categories[category].allocated + amount,
            remaining: prev.categories[category].remaining + amount,
          },
        },
      }));
      Alert.alert("Funds Added", `Added $${amount} to ${category}`);
    } else {
      setBudget((prev) => ({
        ...prev,
        total: prev.total + amount,
        remaining: prev.remaining + amount,
      }));
      Alert.alert("Funds Added", `Added $${amount} to total budget`);
    }
    setShowAddFunds(false);
  };

  const handleDeleteExpense = (id: string) => {
    const expense = expenses.find((e) => e.id === id);
    if (!expense) return;

    const updatedBudget = {
      ...budget,
      used: budget.used - expense.amount,
      remaining: budget.remaining + expense.amount,
      categories: {
        ...budget.categories,
        [expense.category]: {
          ...budget.categories[expense.category],
          used: budget.categories[expense.category].used - expense.amount,
          remaining: budget.categories[expense.category].remaining + expense.amount,
        },
      },
    };

    setExpenses((prev) => prev.filter((e) => e.id !== id));
    setBudget(updatedBudget);
    Alert.alert("Deleted", "Expense deleted successfully");
  };

  // ───────────────────────────────────────────────
  // 🌐 WEB VERSION
  // ───────────────────────────────────────────────
  if (Platform.OS === "web") {
    return (
      <View className="flex flex-col h-screen bg-gray-50 overflow-hidden">
        {/* Scrollable body */}
        <View className="flex-1 overflow-y-auto overflow-x-hidden web-scroll">
          <Animated.View
            className="flex-1"
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            {/* Header */}
            <View className="bg-white px-6 pt-6 pb-4 border-b border-gray-200 shadow-sm">
              <View className="flex-row justify-between items-start mb-6">
                <View className="flex-1 mr-4">
                  <Text className="text-3xl font-bold text-gray-900">Expense Management</Text>
                  <Text className="text-gray-600 mt-1">
                    Track, allocate, and manage company expenses
                  </Text>
                </View>

                <View className="flex-row space-x-3">
                  <TouchableOpacity
                    className="bg-accent px-6 py-3 rounded-xl flex-row items-center shadow-lg"
                    onPress={() => setShowAddExpense(true)}
                  >
                    <Feather name="plus" size={20} color="white" />
                    <Text className="text-white font-semibold ml-2">Add Expense</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="bg-secondary px-6 py-3 rounded-xl flex-row items-center shadow-lg"
                    onPress={() => setShowAddFunds(true)}
                  >
                    <Feather name="dollar-sign" size={20} color="white" />
                    <Text className="text-white font-semibold ml-2">Add Funds</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Quick Stats */}
              <View className="flex-row justify-between bg-gray-50 rounded-xl p-4">
                <View className="items-center">
                  <Text className="text-2xl font-bold text-accent">${budget.remaining.toLocaleString()}</Text>
                  <Text className="text-gray-600 text-sm">Remaining</Text>
                </View>
                <View className="items-center">
                  <Text className="text-2xl font-bold text-gray-800">${budget.used.toLocaleString()}</Text>
                  <Text className="text-gray-600 text-sm">Used</Text>
                </View>
                <View className="items-center">
                  <Text className="text-2xl font-bold text-gray-800">{expenses.length}</Text>
                  <Text className="text-gray-600 text-sm">Expenses</Text>
                </View>
              </View>
            </View>

            {/* Main */}
            <View className="px-6 pt-6 pb-10 flex-1">
              <View className="max-w-[1100px] w-full mx-auto flex-1">
                <BudgetOverview budget={budget} />

                {/* ✅ Scrollable ExpenseList Section */}
                <View className="mt-6 flex-1">
                  <ScrollView
                    className="web-scroll"
                    contentContainerStyle={{ paddingBottom: 120 }}
                    showsVerticalScrollIndicator
                  >
                    <ExpenseList
                      expenses={expenses}
                      onPressItem={setSelectedExpense}
                      onDeleteItem={handleDeleteExpense}
                      onViewAll={() => console.log("View all")}
                    />
                  </ScrollView>
                </View>
              </View>
            </View>
          </Animated.View>
        </View>

        {/* Modals */}
        <AddExpenseModal
          visible={showAddExpense}
          onClose={() => setShowAddExpense(false)}
          onSubmit={handleAddExpense}
          loading={loading}
          formData={formData}
          setFormData={setFormData}
          expenseTypes={expenseTypes}
          categories={categories}
          shareholders={shareholders}
          distributionMethod={distributionMethod}
          setDistributionMethod={setDistributionMethod}
          customAllocations={customAllocations}
          setCustomAllocations={setCustomAllocations}
          calculateAllocations={calculateAllocations}
        />

        <AddFundsModal
          visible={showAddFunds}
          onClose={() => setShowAddFunds(false)}
          onAddFunds={handleAddFunds}
          categories={categories}
        />

        <ExpenseDetailModal expense={selectedExpense} onClose={() => setSelectedExpense(null)} />
      </View>
    );
  }

  // ───────────────────────────────────────────────
  // 📱 MOBILE VERSION
  // ───────────────────────────────────────────────
  return (
    <View className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
          <Animated.View
            className="flex-1"
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            {/* Header */}
            <View className="bg-white px-6 pt-6 pb-4 border-b border-gray-200 shadow-sm">
              <View className="flex-row justify-between items-start mb-6">
                <View className="flex-1 mr-4">
                  <Text className="text-3xl font-bold text-gray-900">Expense Management</Text>
                  <Text className="text-gray-600 mt-1">
                    Track and manage company expenses
                  </Text>
                </View>

                <View className="flex-row space-x-3">
                  <TouchableOpacity
                    className="bg-accent px-6 py-3 rounded-xl flex-row items-center shadow-lg"
                    onPress={() => setShowAddExpense(true)}
                  >
                    <Feather name="plus" size={20} color="white" />
                    <Text className="text-white font-semibold ml-2">Add</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="bg-secondary px-6 py-3 rounded-xl flex-row items-center shadow-lg"
                    onPress={() => setShowAddFunds(true)}
                  >
                    <Feather name="dollar-sign" size={20} color="white" />
                    <Text className="text-white font-semibold ml-2">Funds</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Stats */}
              <View className="flex-row flex-wrap justify-between bg-gray-50 rounded-xl p-4">
                <View className="items-center w-1/2 mb-4">
                  <Text className="text-2xl font-bold text-accent">${budget.remaining.toLocaleString()}</Text>
                  <Text className="text-gray-600 text-sm">Remaining</Text>
                </View>
                <View className="items-center w-1/2 mb-4">
                  <Text className="text-2xl font-bold text-gray-800">${budget.used.toLocaleString()}</Text>
                  <Text className="text-gray-600 text-sm">Used</Text>
                </View>
              </View>
            </View>

            {/* Content */}
            <View className="px-6 pt-6 pb-10 flex-1">
              <BudgetOverview budget={budget} />
              <View className="mt-6 flex-1">
                <ScrollView
                  contentContainerStyle={{ paddingBottom: 100 }}
                  showsVerticalScrollIndicator
                >
                  <ExpenseList
                    expenses={expenses}
                    onPressItem={setSelectedExpense}
                    onDeleteItem={handleDeleteExpense}
                    onViewAll={() => console.log("View all")}
                  />
                </ScrollView>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modals */}
      <AddExpenseModal
        visible={showAddExpense}
        onClose={() => setShowAddExpense(false)}
        onSubmit={handleAddExpense}
        loading={loading}
        formData={formData}
        setFormData={setFormData}
        expenseTypes={expenseTypes}
        categories={categories}
        shareholders={shareholders}
        distributionMethod={distributionMethod}
        setDistributionMethod={setDistributionMethod}
        customAllocations={customAllocations}
        setCustomAllocations={setCustomAllocations}
        calculateAllocations={calculateAllocations}
      />

      <AddFundsModal
        visible={showAddFunds}
        onClose={() => setShowAddFunds(false)}
        onAddFunds={handleAddFunds}
        categories={categories}
      />

      <ExpenseDetailModal expense={selectedExpense} onClose={() => setSelectedExpense(null)} />
    </View>
  );
}
