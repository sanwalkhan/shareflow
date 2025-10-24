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
import SetBudgetModal from "../admin/expenses/SetBudgetModal";
import ExpenseList from "../admin/expenses/ExpenseList";
import AddExpenseModal from "../admin/expenses/AddExpenseModal";
import ExpenseDetailModal from "../admin/expenses/ExpenseDetailModal";
import { Expense, Budget, Shareholder } from "../admin/expenses/types";
import { getExpenses, createExpense as apiCreateExpense, deleteExpense as apiDeleteExpense, getBudget as apiGetBudget, getShareholders as apiGetShareholders, setBudgetLimit as apiSetBudgetLimit, setCategoryAllocations as apiSetCategoryAllocations } from "../../../utils/api";
import ConfirmModal from "../UI/ConfirmModal";
import LoaderOverlay from "../feedback/LoaderOverlay";
import LottieStatus from "../feedback/LottieStatus";
import ProgressBar from "../feedback/ProgressBar";

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

  // STATE
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showSetBudget, setShowSetBudget] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [loading, setLoading] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [status, setStatus] = useState<{ visible: boolean; type: "success" | "error"; message?: string }>({ visible: false, type: "success" });

  const showStatus = (type: "success" | "error", message?: string) => {
    setStatus({ visible: true, type, message })
    setTimeout(() => setStatus((s) => ({ ...s, visible: false })), 2000)
  }

  const [budget, setBudget] = useState<Budget & { validFrom?: Date; validTo?: Date }>({ 
    total: 0, 
    used: 0, 
    remaining: 0, 
    categories: {} as any 
  });

  const [shareholders, setShareholders] = useState<Shareholder[]>([]);

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

  // Get categories ONLY from budget
  const categories = Object.keys(budget.categories || {});

  const expenseTypes = [
    { label: "Routine Expense", value: "routine", icon: "refresh-cw", color: COLORS.accent },
    { label: "Special Expense", value: "special", icon: "star", color: COLORS.secondary },
  ];

  // FUNCTIONS
  const calculateAllocations = (amount: number) => {
    if (!shareholders.length) return [] as Shareholder[]
    const totalShares = shareholders.reduce((sum, sh) => sum + (sh.sharePercentage || 0), 0);
    if (distributionMethod === "custom") {
      return shareholders.map((sh) => ({
        ...sh,
        allocatedAmount: parseFloat(customAllocations[sh.id] || "0"),
      }))
    }
    return shareholders.map((sh) => ({
      ...sh,
      allocatedAmount:
        distributionMethod === "equal"
          ? amount / shareholders.length
          : distributionMethod === "percentage"
          ? totalShares > 0 ? (amount * (sh.sharePercentage || 0)) / totalShares : 0
          : 0,
    }));
  };

  useEffect(() => {
    const load = async () => {
      try {
        setGlobalLoading(true)
        const [expensesRes, budgetRes, shareholdersRes] = await Promise.all([
          getExpenses(),
          apiGetBudget(),
          apiGetShareholders(),
        ])
        const mapped: Expense[] = (expensesRes.data || []).map((e: any) => ({
          id: e._id,
          title: e.title,
          amount: e.amount,
          type: e.type,
          category: e.category,
          date: new Date(e.date || e.createdAt),
          description: e.description || "",
          receipt: e.receipt || null,
          status: e.status,
          createdBy: e.createdBy,
          createdAt: new Date(e.createdAt),
          shareholders: (e.allocations || []).map((a: any) => ({
            id: a.shareholder || a.email,
            name: a.name,
            email: a.email,
            sharePercentage: a.sharePercentage || 0,
            allocatedAmount: a.allocatedAmount || 0,
          })),
          taxDeductible: !!e.taxDeductible,
          recurring: !!e.recurring,
          recurrence: e.recurrence,
          budgetCategory: e.budgetCategory || "",
        }))
        setExpenses(mapped)
        const b = budgetRes.data
        const mappedBudget: Budget & { validFrom?: Date; validTo?: Date } = {
          total: b.limit,
          used: b.used,
          remaining: Math.max(0, b.limit - b.used),
          validFrom: b.validFrom ? new Date(b.validFrom) : undefined,
          validTo: b.validTo ? new Date(b.validTo) : undefined,
          categories: Object.fromEntries(
            Object.entries(b.categories || {}).map(([k, v]: any) => [
              k,
              { allocated: v.allocated || 0, used: v.used || 0, remaining: Math.max(0, (v.allocated || 0) - (v.used || 0)) },
            ]),
          ),
        }
        setBudget(mappedBudget)
        const sh = (shareholdersRes.data || []).map((s: any) => ({ 
          id: s._id, 
          name: s.name, 
          email: s.email, 
          sharePercentage: s.sharePercentage, 
          allocatedAmount: 0 
        }))
        setShareholders(sh)
      } catch (e: any) {
        showStatus("error", e?.message || "Failed to load expenses")
      } finally {
        setGlobalLoading(false)
      }
    }
    load()
  }, [])

  const handleAddExpense = async () => {
    if (!formData.title || !formData.amount || !formData.category) {
      Alert.alert("Missing Information", "Please fill all required fields");
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid amount");
      return;
    }

    // Validate category exists in budget
    if (!categories.includes(formData.category)) {
      Alert.alert("Invalid Category", `Category "${formData.category}" is not defined in budget. Please set up budget categories first.`);
      return;
    }

    try {
      setLoading(true);
      setGlobalLoading(true)
      const allocations = calculateAllocations(amount).map((s) => ({
        name: s.name,
        email: s.email,
        sharePercentage: s.sharePercentage,
        allocatedAmount: s.allocatedAmount,
      }))
      const payload = {
        title: formData.title,
        amount,
        type: formData.type,
        category: formData.category,
        date: new Date(),
        description: formData.description,
        taxDeductible: formData.taxDeductible,
        recurring: formData.recurring,
        recurrence: formData.recurring ? formData.recurrence : undefined,
        budgetCategory: formData.budgetCategory,
        allocations,
      }
      const res = await apiCreateExpense(payload)
      const e = res.data
      const newExpense: Expense = {
        id: e._id,
        title: e.title,
        amount: e.amount,
        type: e.type,
        category: e.category,
        date: new Date(e.date || e.createdAt),
        description: e.description || "",
        receipt: e.receipt || null,
        status: e.status,
        createdBy: e.createdBy,
        createdAt: new Date(e.createdAt),
        shareholders: (e.allocations || []).map((a: any) => ({
          id: a.shareholder || a.email,
          name: a.name,
          email: a.email,
          sharePercentage: a.sharePercentage || 0,
          allocatedAmount: a.allocatedAmount || 0,
        })),
        taxDeductible: !!e.taxDeductible,
        recurring: !!e.recurring,
        recurrence: e.recurrence,
        budgetCategory: e.budgetCategory || "",
      }
      setExpenses((prev) => [newExpense, ...prev]);
      // refresh budget
      try {
        const budgetRes = await apiGetBudget()
        const b = budgetRes.data
        setBudget({
          total: b.limit,
          used: b.used,
          remaining: Math.max(0, b.limit - b.used),
          validFrom: b.validFrom ? new Date(b.validFrom) : undefined,
          validTo: b.validTo ? new Date(b.validTo) : undefined,
          categories: Object.fromEntries(
            Object.entries(b.categories || {}).map(([k, v]: any) => [
              k,
              { allocated: v.allocated || 0, used: v.used || 0, remaining: Math.max(0, (v.allocated || 0) - (v.used || 0)) },
            ]),
          ),
        })
      } catch {}
      setShowAddExpense(false);
      showStatus("success", "Expense added")
    } catch (e: any) {
      const msg = e?.message || "Failed to add expense"
      showStatus("error", msg)
    } finally {
      setLoading(false)
      setGlobalLoading(false)
    }
  };

  const [confirmExpense, setConfirmExpense] = useState<{ visible: boolean; id?: string }>({ visible: false })
  const handleDeleteExpense = async (id: string) => {
    const expense = expenses.find((e) => e.id === id);
    if (!expense) return;
    setConfirmExpense({ visible: true, id })
  };
  
  const confirmDeleteExpenseNow = async () => {
    const id = confirmExpense.id
    if (!id) return
    try {
      setGlobalLoading(true)
      setConfirmExpense({ visible: false })
      await apiDeleteExpense(id)
      setExpenses((prev) => prev.filter((e) => e.id !== id))
      try {
        const budgetRes = await apiGetBudget()
        const b = budgetRes.data
        setBudget({
          total: b.limit,
          used: b.used,
          remaining: Math.max(0, b.limit - b.used),
          validFrom: b.validFrom ? new Date(b.validFrom) : undefined,
          validTo: b.validTo ? new Date(b.validTo) : undefined,
          categories: Object.fromEntries(
            Object.entries(b.categories || {}).map(([k, v]: any) => [
              k,
              { allocated: v.allocated || 0, used: v.used || 0, remaining: Math.max(0, (v.allocated || 0) - (v.used || 0)) },
            ]),
          ),
        })
      } catch {}
      showStatus("success", "Expense deleted")
    } catch (e: any) {
      showStatus("error", e?.message || "Failed to delete")
    } finally {
      setGlobalLoading(false)
    }
  }

  // WEB VERSION
  if (Platform.OS === "web") {
    return (
      <View className="flex flex-col h-screen bg-gray-50 overflow-hidden">
        <ProgressBar running={globalLoading} />
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
                  {budget.validFrom && budget.validTo && (
                    <View className="flex-row items-center mt-2">
                      <Feather name="calendar" size={14} color={COLORS.gray} />
                      <Text className="text-gray-500 text-sm ml-1">
                        Budget Period: {budget.validFrom.toLocaleDateString()} - {budget.validTo.toLocaleDateString()}
                      </Text>
                    </View>
                  )}
                </View>

                <View className="flex-row space-x-3">
                  <TouchableOpacity
                    className="bg-accent px-6 py-3 rounded-xl flex-row items-center shadow-lg"
                    onPress={() => {
                      if (categories.length === 0) {
                        Alert.alert("No Budget Categories", "Please set up budget categories before adding expenses.")
                        setShowSetBudget(true)
                        return
                      }
                      setShowAddExpense(true)
                    }}
                  >
                    <Feather name="plus" size={20} color="white" />
                    <Text className="text-white font-semibold ml-2">Add Expense</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="bg-secondary px-6 py-3 rounded-xl flex-row items-center shadow-lg"
                    onPress={() => setShowSetBudget(true)}
                  >
                    <Feather name="sliders" size={20} color="white" />
                    <Text className="text-white font-semibold ml-2">Set Budget</Text>
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
                <BudgetOverview budget={budget} onSetBudget={() => setShowSetBudget(true)} />

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

        <SetBudgetModal
          visible={showSetBudget}
          onClose={() => setShowSetBudget(false)}
          onSubmit={async (categoryMap, validFrom, validTo) => {
            try {
              setGlobalLoading(true)
              await apiSetCategoryAllocations(categoryMap, validFrom, validTo)
              const b = (await apiGetBudget()).data
              setBudget({
                total: b.limit,
                used: b.used,
                remaining: Math.max(0, b.limit - b.used),
                validFrom: b.validFrom ? new Date(b.validFrom) : undefined,
                validTo: b.validTo ? new Date(b.validTo) : undefined,
                categories: Object.fromEntries(
                  Object.entries(b.categories || {}).map(([k, v]: any) => [
                    k,
                    { allocated: v.allocated || 0, used: v.used || 0, remaining: Math.max(0, (v.allocated || 0) - (v.used || 0)) },
                  ]),
                ),
              })
              showStatus("success", "Category budgets updated")
            } catch (e: any) {
              showStatus("error", e?.message || "Failed to update category budgets")
            } finally {
              setGlobalLoading(false)
              setShowSetBudget(false)
            }
          }}
          initialCategories={Object.fromEntries(Object.entries(budget.categories || {}).map(([k, v]: any) => [k, Number(v.allocated || 0)]))}
          initialValidFrom={budget.validFrom}
          initialValidTo={budget.validTo}
        />

        <ExpenseDetailModal
          expense={selectedExpense}
          onClose={() => setSelectedExpense(null)}
          onUpdated={(e) => {
            setExpenses((prev) => prev.map((x) => (x.id === e.id ? e : x)))
            showStatus("success", "Expense updated")
          }}
        />
        <ConfirmModal
          visible={confirmExpense.visible}
          title="Delete Expense"
          message="Are you sure you want to delete this expense? Budget usage will be reduced accordingly."
          confirmText="Delete"
          onCancel={() => setConfirmExpense({ visible: false })}
          onConfirm={confirmDeleteExpenseNow}
        />
        <LoaderOverlay visible={globalLoading} message="Loading data" />
        <LottieStatus visible={status.visible} type={status.type} message={status.message} onDone={() => setStatus((s) => ({ ...s, visible: false }))} />
      </View>
    );
  }

  // MOBILE VERSION - Similar structure
  return (
    <View className="flex-1 bg-gray-50">
      <ProgressBar running={globalLoading} />
      {/* Mobile implementation similar to web */}
      <LoaderOverlay visible={globalLoading} message="Loading data" />
      <LottieStatus visible={status.visible} type={status.type} message={status.message} onDone={() => setStatus((s) => ({ ...s, visible: false }))} />
    </View>
  );
}