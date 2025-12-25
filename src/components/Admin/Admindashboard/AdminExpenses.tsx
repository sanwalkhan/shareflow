import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Sidebar from "../../SidebarComponent/sidebar";

const COLORS = {
  primary: "#193288",
  secondary: "#2c4bd9",
  bg: "#f3f4f6",
  white: "#fff",
  success: "#16a34a",
  warning: "#f59e0b",
  grayText: "#4b5563",
};

const EXPENSE_LIST = {
  "Personnel Expenses": ["Salaries and Wages", "Benefits", "Payroll Taxes", "Recruitment Costs"],
  "Operational Expenses": ["Office Supplies", "Technology and Equipment", "Maintenance", "Rent/Lease", "Utilities", "Insurance"],
  "Administrative Expenses": ["Legal and Professional Fees", "Licenses and Permits", "Training and Development", "Travel and Meals"],
  "Marketing and Sales Expenses": ["Advertising", "Promotions", "Client Relations"],
  "Miscellaneous Expenses": ["Subscriptions", "Dues and Fees", "Contingencies"],
};

const tableData = [
  { date: "2025-12-01", category: "Office Supplies", amount: "₹12,000", method: "Credit Card", status: "Paid" },
  { date: "2025-12-05", category: "Travel", amount: "₹45,000", method: "Bank Transfer", status: "Pending" },
  { date: "2025-12-10", category: "Software", amount: "₹30,000", method: "Credit Card", status: "Paid" },
  { date: "2025-12-12", category: "Salaries and Wages", amount: "₹1,50,000", method: "Bank Transfer", status: "Paid" },
  { date: "2025-12-15", category: "Advertising", amount: "₹25,000", method: "Credit Card", status: "Pending" },
  { date: "2025-12-20", category: "Utilities", amount: "₹12,500", method: "Bank Transfer", status: "Paid" },
];

const AdminExpenses: React.FC = () => {
  const [isMobile, setIsMobile] = useState(Dimensions.get("window").width <= 760);
  const [windowWidth, setWindowWidth] = useState(Dimensions.get("window").width);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);

  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [distribution, setDistribution] = useState<"equity" | "equal" | null>(null);

  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const sidebarAnim = useRef(new Animated.Value(isMobile ? -260 : 0)).current;
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    const sub = Dimensions.addEventListener("change", ({ window }) => {
      setWindowWidth(window.width);
      const mobile = window.width <= 760;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(true);
        Animated.timing(sidebarAnim, { toValue: 0, duration: 0, useNativeDriver: false }).start();
      } else {
        setSidebarOpen(false);
        Animated.timing(sidebarAnim, { toValue: -260, duration: 0, useNativeDriver: false }).start();
      }
    });
    return () => sub.remove();
  }, []);

  const toggleSidebar = () => {
    const toValue = sidebarOpen ? -260 : 0;
    setSidebarOpen(!sidebarOpen);
    Animated.timing(sidebarAnim, { toValue, duration: 300, useNativeDriver: false }).start();
  };

  const openNotifications = () => {
    setShowNotifications(true);
    Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: false }).start();
  };

  const closeNotifications = () => {
    Animated.timing(slideAnim, { toValue: 300, duration: 300, useNativeDriver: false }).start(() => setShowNotifications(false));
  };

  const openAddExpense = () => setShowAddExpense(true);
  const closeAddExpense = () => {
    setShowAddExpense(false);
    setSelectedType(null);
    setSelectedCategory(null);
    setAmount("");
    setDistribution(null);
    setIsTypeOpen(false);
    setIsCategoryOpen(false);
  };

  const handleSubmitExpense = () => {
    console.log({ type: selectedType, category: selectedCategory, amount, distribution });
    closeAddExpense();
  };

  const showHeaderButton = windowWidth > 700;
  const showContentButton = windowWidth <= 700;

  return (
    <View style={{ flex: 1, flexDirection: "row", backgroundColor: COLORS.bg, minWidth: 360 }}>
      {/* Sidebar */}
      {isMobile && sidebarOpen && (
        <>
          <TouchableWithoutFeedback onPress={toggleSidebar}>
            <View style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.35)", zIndex: 900 }} />
          </TouchableWithoutFeedback>
          <Animated.View style={{ position: "absolute", left: sidebarAnim, top: 0, bottom: 0, width: 260, backgroundColor: COLORS.white, elevation: 10, zIndex: 1000 }}>
            <Sidebar />
          </Animated.View>
        </>
      )}
      {!isMobile && <Sidebar />}

      {/* Main Content */}
      <View style={{ flex: 1 }}>
        {/* Header */}
        <LinearGradient colors={[COLORS.primary, COLORS.secondary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingVertical: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {isMobile && <TouchableOpacity onPress={toggleSidebar} style={{ marginRight: 12 }}><Ionicons name="menu-outline" size={28} color="#fff" /></TouchableOpacity>}
            <Ionicons name="wallet-outline" size={28} color="#fff" />
            <Text style={{ fontSize: 24, fontWeight: "700", color: "#fff", marginLeft: 8 }}>Expenses</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {showHeaderButton && (
              <TouchableOpacity onPress={openAddExpense}>
                <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={{ borderRadius: 28 }}>
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 14, paddingHorizontal: 16 }}>
                    <Ionicons name="add-outline" size={22} color="#fff" />
                    <Text style={{ color: "#fff", fontWeight: "700", marginLeft: 8 }}>Add Expense</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={openNotifications} style={{ marginLeft: 12 }}><Ionicons name="notifications-outline" size={28} color="#fff" /></TouchableOpacity>
          </View>
        </LinearGradient>

        <ScrollView contentContainerStyle={{ padding: 20 }}>
          {showContentButton && (
            <View style={{ marginBottom: 20, alignItems: "flex-start" }}>
              <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={{ borderRadius: 28, width: 200 }}>
                <TouchableOpacity onPress={openAddExpense} style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 14 }}>
                  <Ionicons name="add-outline" size={22} color="#fff" />
                  <Text style={{ color: "#fff", fontWeight: "700", marginLeft: 8 }}>Add Expense</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          )}

          {/* Expense Cards */}
          <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
            {tableData.map((row, idx) => (
              <View key={idx} style={{
                width: windowWidth <= 700 ? "100%" : "30%",
                backgroundColor: COLORS.white,
                borderRadius: 16,
                padding: 24,
                marginBottom: 16,
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 6,
                elevation: 3,
              }}>
                <Text style={{ fontWeight: "700", fontSize: 16, marginBottom: 12, color: COLORS.grayText }}>{row.category}</Text>
                <Text style={{ fontSize: 14, color: COLORS.grayText }}>Date: {row.date}</Text>
                <Text style={{ fontSize: 14, color: COLORS.grayText }}>Amount: {row.amount}</Text>
                <Text style={{ fontSize: 14, color: COLORS.grayText }}>Payment: {row.method}</Text>
                <View style={{ marginTop: 12, alignItems: "flex-start" }}>
                  <Text style={{
                    backgroundColor: row.status === "Paid" ? "#dcfce7" : "#fef3c7",
                    color: row.status === "Paid" ? COLORS.success : COLORS.warning,
                    fontWeight: "600",
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 12,
                    textAlign: "center",
                    minWidth: 80,
                  }}>
                    {row.status}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Add Expense Modal */}
     {/* Add Expense Modal */}
<Modal visible={showAddExpense} animationType="fade" transparent>
  <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center", padding: 20 }}>
    <View style={{
      backgroundColor: "#fff",
      borderRadius: 16,
      padding: 20,
      width: Math.min(windowWidth * 0.9, 400), // compact width
      maxHeight: "80%",
    }}>
      <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 16 }}>Add Expense</Text>

      {/* Expense Type Dropdown */}
      <Text style={{ fontWeight: "600", marginBottom: 8 }}>Expense Type</Text>
      <TouchableOpacity
        onPress={() => setIsTypeOpen(!isTypeOpen)}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 12,
          backgroundColor: "#fff",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8
        }}
      >
        <Text style={{ color: selectedType ? COLORS.primary : "#999" }}>
          {selectedType || "Select Type"}
        </Text>
        <Ionicons name={isTypeOpen ? "chevron-up-outline" : "chevron-down-outline"} size={20} color={COLORS.primary} />
      </TouchableOpacity>

      {isTypeOpen && (
        <View style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, backgroundColor: "#fff", marginBottom: 16 }}>
          {Object.keys(EXPENSE_LIST).map((type) => (
            <TouchableOpacity
              key={type}
              onPress={() => { setSelectedType(type); setSelectedCategory(null); setIsTypeOpen(false); }}
              style={{ padding: 12 }}
            >
              <Text style={{ color: COLORS.primary }}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Category Dropdown */}
      {selectedType && (
        <>
          <Text style={{ fontWeight: "600", marginBottom: 8 }}>Category</Text>
          <TouchableOpacity
            onPress={() => setIsCategoryOpen(!isCategoryOpen)}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 12,
              backgroundColor: "#fff",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8
            }}
          >
            <Text style={{ color: selectedCategory ? COLORS.primary : "#999" }}>
              {selectedCategory || "Select Category"}
            </Text>
            <Ionicons name={isCategoryOpen ? "chevron-up-outline" : "chevron-down-outline"} size={20} color={COLORS.primary} />
          </TouchableOpacity>

          {isCategoryOpen && (
            <View style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, backgroundColor: "#fff", marginBottom: 16 }}>
              {EXPENSE_LIST[selectedType].map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => { setSelectedCategory(cat); setIsCategoryOpen(false); }}
                  style={{ padding: 12 }}
                >
                  <Text style={{ color: COLORS.primary }}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </>
      )}

      {/* Amount */}
      <Text style={{ fontWeight: "600", marginBottom: 8 }}>Amount</Text>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        placeholder="Enter amount"
        keyboardType="numeric"
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 16 }}
      />

      {/* Distribution */}
      <Text style={{ fontWeight: "600", marginBottom: 8 }}>Distribution</Text>
      <View style={{ flexDirection: "row", marginBottom: 16 }}>
        <TouchableOpacity onPress={() => setDistribution("equity")} style={{ flexDirection: "row", alignItems: "center", marginRight: 20 }}>
          <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: "#000", justifyContent: "center", alignItems: "center", marginRight: 6 }}>
            {distribution === "equity" && <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS.primary }} />}
          </View>
          <Text>Equity-based</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setDistribution("equal")} style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: "#000", justifyContent: "center", alignItems: "center", marginRight: 6 }}>
            {distribution === "equal" && <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS.primary }} />}
          </View>
          <Text>Equally distributed</Text>
        </TouchableOpacity>
      </View>

      {/* Submit */}
      <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={{ borderRadius: 28 }}>
        <TouchableOpacity onPress={handleSubmitExpense} style={{ paddingVertical: 14, alignItems: "center" }}>
          <Text style={{ color: "#fff", fontWeight: "700" }}>Submit</Text>
        </TouchableOpacity>
      </LinearGradient>

      <TouchableOpacity onPress={closeAddExpense} style={{ position: "absolute", top: 12, right: 12 }}>
        <Ionicons name="close-outline" size={28} color="#000" />
      </TouchableOpacity>
    </View>
  </View>
</Modal>

    </View>
  );
};

export default AdminExpenses;
