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
import ConfirmModal from "../UI/ConfirmModal";
import OTPModal from "../OTPModal";
import { 
  getShareholders, 
  sendShareholderOtp, 
  verifyShareholderOtp, 
  createShareholder as apiCreateShareholder, 
  deleteShareholder as apiDeleteShareholder, 
  updateShareholder as apiUpdateShareholder 
} from "../../../utils/api";
import LoaderOverlay from "../feedback/LoaderOverlay";
import LottieStatus from "../feedback/LottieStatus";
import ProgressBar from "../feedback/ProgressBar";

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
  const [shareholders, setShareholders] = useState<Shareholder[]>([]);
  const [otpVisible, setOtpVisible] = useState(false);
  const [pendingShareholder, setPendingShareholder] = useState<ShareholderFormData | null>(null);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [status, setStatus] = useState<{ visible: boolean; type: "success" | "error"; message?: string }>({ 
    visible: false, 
    type: "success" 
  });
  
  const showStatus = (type: "success" | "error", message?: string) => {
    setStatus({ visible: true, type, message });
    setTimeout(() => setStatus((s) => ({ ...s, visible: false })), 2000);
  };

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
  const totalInvestment = shareholders.reduce((sum, s) => sum + (s.investment || 0), 0);
  const totalProfit = shareholders.reduce((sum, s) => sum + (s.profit || 0), 0);
  const totalReturns = shareholders.reduce((sum, s) => sum + (s.returns || 0), 0);
  const totalOtherMoney = shareholders.reduce((sum, s) => sum + (s.otherMoney || 0), 0);

  const filteredShareholders = shareholders.filter(
    (s) =>
      s.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ──────────────────────────────
  // ⚙️ Handlers
  // ──────────────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        setGlobalLoading(true);
        const res = await getShareholders();
        const mapped: Shareholder[] = (res.data || []).map((s: any) => ({
          id: s._id,
          firstName: s.firstName || "",
          lastName: s.lastName || "",
          name: `${s.firstName || ""} ${s.lastName || ""}`.trim() || s.name || "Unknown",
          email: s.email,
          phone: s.phone || "",
          address: s.address || "",
          equity: s.sharePercentage || 0,
          investment: s.investment || 0,
          profit: s.profit || 0,
          returns: s.returns || 0,
          otherMoney: s.otherMoney || 0,
          joinDate: s.joinDate || new Date(s.createdAt).toISOString().slice(0,10),
        }));
        setShareholders(mapped);
      } catch (e: any) {
        showStatus("error", e?.message || "Failed to load shareholders");
      } finally {
        setGlobalLoading(false);
      }
    };
    load();
  }, []);

  const handleAdd = async (data: ShareholderFormData) => {
    try {
      // Validate email format
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(data.email)) {
        showStatus("error", "Invalid email format");
        return;
      }

      // Store pending shareholder data
      setPendingShareholder(data);
      
      setGlobalLoading(true);
      
      // Send OTP to the email
      await sendShareholderOtp(data.email);
      
      setIsAddModalVisible(false);
      setOtpVisible(true);
      
    } catch (e: any) {
      console.error("Send OTP error:", e);
      showStatus("error", e?.message || "Failed to send OTP");
    } finally {
      setGlobalLoading(false);
    }
  };

  const handleEdit = (shareholder: Shareholder) => {
    setSelectedShareholder(shareholder);
    setIsEditModalVisible(true);
  };

  const handleUpdate = async (updatedData: ShareholderFormData) => {
    if (!selectedShareholder) return;
    
    try {
      setGlobalLoading(true);
      
      const payload = {
        firstName: updatedData.firstName,
        lastName: updatedData.lastName,
        email: updatedData.email,
        phone: updatedData.phone,
        address: updatedData.address,
        sharePercentage: parseFloat(updatedData.equity as string) || 0,
        investment: parseFloat(updatedData.investment as string) || 0,
        profit: parseFloat(updatedData.profit as string) || 0,
        returns: parseFloat(updatedData.returns as string) || 0,
        otherMoney: parseFloat(updatedData.otherMoney as string) || 0,
        joinDate: updatedData.joinDate,
      };
      
      const res = await apiUpdateShareholder(String(selectedShareholder.id), payload);
      const s = res.data;
      
      setShareholders((prev) => prev.map((x) => x.id === selectedShareholder.id ? {
        ...x,
        firstName: s.firstName || x.firstName,
        lastName: s.lastName || x.lastName,
        name: `${s.firstName || ""} ${s.lastName || ""}`.trim() || x.name,
        email: s.email,
        phone: s.phone || "",
        address: s.address || "",
        equity: s.sharePercentage || 0,
        investment: s.investment || 0,
        profit: s.profit || 0,
        returns: s.returns || 0,
        otherMoney: s.otherMoney || 0,
        joinDate: s.joinDate || x.joinDate,
      } : x));
      
      setIsEditModalVisible(false);
      setSelectedShareholder(null);
      showStatus("success", "Shareholder updated successfully");
      
    } catch (e: any) {
      console.error("Update error:", e);
      showStatus("error", e?.message || "Failed to update shareholder");
    } finally {
      setGlobalLoading(false);
    }
  };

  const [confirmDelete, setConfirmDelete] = useState<{ visible: boolean; target?: Shareholder }>({ visible: false });
  
  const handleDelete = (shareholder: Shareholder) => {
    setConfirmDelete({ visible: true, target: shareholder });
  };
  
  const confirmDeleteNow = async () => {
    const target = confirmDelete.target;
    if (!target) return;
    
    try {
      setGlobalLoading(true);
      setConfirmDelete({ visible: false });
      
      await apiDeleteShareholder(String(target.id));
      
      setShareholders((prev) => prev.filter((s) => s.id !== target.id));
      showStatus("success", "Shareholder deleted successfully");
      
    } catch (e: any) {
      console.error("Delete error:", e);
      showStatus("error", e?.message || "Failed to delete shareholder");
    } finally {
      setGlobalLoading(false);
    }
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

  const handleVerifyOtp = async (code: string) => {
    if (!pendingShareholder) {
      showStatus("error", "No pending shareholder data");
      return;
    }

    try {
      setGlobalLoading(true);
      
      // Verify OTP
      await verifyShareholderOtp(pendingShareholder.email, code);
      
      // Create shareholder with the verified email
      const payload = {
        firstName: pendingShareholder.firstName,
        lastName: pendingShareholder.lastName,
        email: pendingShareholder.email,
        phone: pendingShareholder.phone || "",
        address: pendingShareholder.address || "",
        sharePercentage: 0, // Will be calculated on backend
        investment: parseFloat(pendingShareholder.investment as string) || 0,
        profit: parseFloat(pendingShareholder.profit as string) || 0,
        returns: parseFloat(pendingShareholder.returns as string) || 0,
        otherMoney: parseFloat(pendingShareholder.otherMoney as string) || 0,
        joinDate: pendingShareholder.joinDate,
        password: pendingShareholder.password || "ChangeMe123!",
      };
      
      const res = await apiCreateShareholder(payload);
      const s = res.data;
      
      // Add new shareholder to the list
      setShareholders((prev) => ([
        ...prev,
        {
          id: s._id,
          firstName: s.firstName || "",
          lastName: s.lastName || "",
          name: `${s.firstName || ""} ${s.lastName || ""}`.trim() || "Unknown",
          email: s.email,
          phone: s.phone || "",
          address: s.address || "",
          equity: s.sharePercentage || 0,
          investment: s.investment || 0,
          profit: s.profit || 0,
          returns: s.returns || 0,
          otherMoney: s.otherMoney || 0,
          joinDate: s.joinDate || new Date(s.createdAt).toISOString().slice(0,10),
        }
      ]));
      
      setOtpVisible(false);
      setPendingShareholder(null);
      showStatus("success", "Shareholder added successfully");
      
    } catch (e: any) {
      console.error("OTP verification error:", e);
      showStatus("error", e?.message || "Failed to verify OTP or create shareholder");
    } finally {
      setGlobalLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!pendingShareholder) {
      return { success: false, message: "No pending shareholder" };
    }
    
    try {
      await sendShareholderOtp(pendingShareholder.email);
      return { success: true, message: "OTP resent successfully" };
    } catch (e: any) {
      return { success: false, message: e?.message || "Failed to resend OTP" };
    }
  };

  // ──────────────────────────────
  // 🌐 RENDER
  // ──────────────────────────────
  const renderContent = () => (
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
  );

  // ──────────────────────────────
  // 🌐 WEB VERSION
  // ──────────────────────────────
  if (Platform.OS === "web") {
    return (
      <View className="flex flex-col h-screen bg-gray-50 overflow-hidden">
        <ProgressBar running={globalLoading} />
        <View className="flex-1 overflow-y-auto overflow-x-hidden web-scroll">
          {renderContent()}
        </View>

        {/* Modals */}
        <OTPModal
          visible={otpVisible}
          email={pendingShareholder?.email}
          onClose={() => { 
            setOtpVisible(false); 
            setPendingShareholder(null);
          }}
          onResend={handleResendOtp}
          onVerify={handleVerifyOtp}
        />
        <LoaderOverlay visible={globalLoading} message="Loading data" />
        <LottieStatus 
          visible={status.visible} 
          type={status.type} 
          message={status.message} 
          onDone={() => setStatus((s) => ({ ...s, visible: false }))} 
        />
        <ConfirmModal
          visible={confirmDelete.visible}
          title="Delete Shareholder"
          message={`Are you sure you want to delete ${confirmDelete.target?.name}? This will recalculate equity for all shareholders.`}
          confirmText="Delete"
          onCancel={() => setConfirmDelete({ visible: false })}
          onConfirm={confirmDeleteNow}
        />
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
      <ProgressBar running={globalLoading} />
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
          {renderContent()}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modals */}
      <LoaderOverlay visible={globalLoading} message="Loading data" />
      <LottieStatus 
        visible={status.visible} 
        type={status.type} 
        message={status.message} 
        onDone={() => setStatus((s) => ({ ...s, visible: false }))} 
      />
      <OTPModal
        visible={otpVisible}
        email={pendingShareholder?.email}
        onClose={() => { 
          setOtpVisible(false); 
          setPendingShareholder(null);
        }}
        onResend={handleResendOtp}
        onVerify={handleVerifyOtp}
      />
      <ConfirmModal
        visible={confirmDelete.visible}
        title="Delete Shareholder"
        message={`Are you sure you want to delete ${confirmDelete.target?.name}? This will recalculate equity for all shareholders.`}
        confirmText="Delete"
        onCancel={() => setConfirmDelete({ visible: false })}
        onConfirm={confirmDeleteNow}
      />
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