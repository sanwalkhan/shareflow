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
  ActivityIndicator,
  Modal,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../constants/theme";

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
  const { width, height } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isLargeScreen = width >= 1024;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // State
  const [shareholders, setShareholders] = useState<Shareholder[]>([]);
  const [otpVisible, setOtpVisible] = useState(false);
  const [pendingShareholder, setPendingShareholder] = useState<ShareholderFormData | null>(null);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [status, setStatus] = useState<{ visible: boolean; type: "success" | "error"; message?: string }>({ 
    visible: false, 
    type: "success" 
  });
  
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isActionsModalVisible, setIsActionsModalVisible] = useState(false);
  const [selectedShareholder, setSelectedShareholder] = useState<Shareholder | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentAction, setCurrentAction] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<{ visible: boolean; target?: Shareholder }>({ visible: false });
  const [viewMode, setViewMode] = useState<"grid" | "list">(isMobile ? "list" : "grid");

  const showStatus = (type: "success" | "error", message?: string) => {
    setStatus({ visible: true, type, message });
    setTimeout(() => setStatus((s) => ({ ...s, visible: false })), 3000);
  };

  // Calculations
  const totalEquity = shareholders.reduce((sum, s) => sum + s.equity, 0);
  const totalInvestment = shareholders.reduce((sum, s) => sum + (s.investment || 0), 0);
  const totalProfit = shareholders.reduce((sum, s) => sum + (s.profit || 0), 0);
  const totalReturns = shareholders.reduce((sum, s) => sum + (s.returns || 0), 0);
  const totalOtherMoney = shareholders.reduce((sum, s) => sum + (s.otherMoney || 0), 0);
  const netProfit = totalProfit - totalOtherMoney;

  const filteredShareholders = shareholders.filter(
    (s) =>
      s.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Data loading
  const loadShareholders = async (showLoader = true) => {
    try {
      if (showLoader) setGlobalLoading(true);
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
    } catch (error: any) {
      showStatus("error", error?.response?.data?.message || error?.message || "Failed to load shareholders");
    } finally {
      if (showLoader) setGlobalLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadShareholders(false);
  };

  useEffect(() => {
    loadShareholders();
  }, []);

  // Handlers
  const handleAdd = async (data: ShareholderFormData) => {
    if (isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      setPendingShareholder(data);
      setGlobalLoading(true);
      
      await sendShareholderOtp(data.email);
      setIsAddModalVisible(false);
      setOtpVisible(true);
      
    } catch (error: any) {
      showStatus("error", error?.response?.data?.message || error?.message || "Failed to send OTP");
    } finally {
      setIsSubmitting(false);
      setGlobalLoading(false);
    }
  };

  const handleEdit = (shareholder: Shareholder) => {
    if (globalLoading || isSubmitting) return;
    setSelectedShareholder(shareholder);
    setIsEditModalVisible(true);
  };

  const handleUpdate = async (updatedData: ShareholderFormData) => {
    if (!selectedShareholder || isSubmitting) return;
    
    try {
      setIsSubmitting(true);
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
      const updated = res.data;
      
      setShareholders(prev => prev.map(x => 
        x.id === selectedShareholder.id ? {
          ...x,
          firstName: updated.firstName || x.firstName,
          lastName: updated.lastName || x.lastName,
          name: `${updated.firstName || ""} ${updated.lastName || ""}`.trim() || x.name,
          email: updated.email,
          phone: updated.phone || "",
          address: updated.address || "",
          equity: updated.sharePercentage || 0,
          investment: updated.investment || 0,
          profit: updated.profit || 0,
          returns: updated.returns || 0,
          otherMoney: updated.otherMoney || 0,
          joinDate: updated.joinDate || x.joinDate,
        } : x
      ));
      
      setIsEditModalVisible(false);
      setSelectedShareholder(null);
      showStatus("success", "Shareholder updated successfully");
      
    } catch (error: any) {
      showStatus("error", error?.response?.data?.message || error?.message || "Failed to update shareholder");
    } finally {
      setIsSubmitting(false);
      setGlobalLoading(false);
    }
  };

  const handleDelete = (shareholder: Shareholder) => {
    if (globalLoading || isSubmitting) return;
    setConfirmDelete({ visible: true, target: shareholder });
  };
  
  const confirmDeleteNow = async () => {
    const target = confirmDelete.target;
    if (!target || isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      setGlobalLoading(true);
      setConfirmDelete({ visible: false });
      
      await apiDeleteShareholder(String(target.id));
      setShareholders(prev => prev.filter(s => s.id !== target.id));
      showStatus("success", "Shareholder deleted successfully");
      
    } catch (error: any) {
      showStatus("error", error?.response?.data?.message || error?.message || "Failed to delete shareholder");
    } finally {
      setIsSubmitting(false);
      setGlobalLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    if (globalLoading || isSubmitting) return;
    setCurrentAction(action);
    setIsActionsModalVisible(true);
  };

  const executeAction = () => {
    Alert.alert("Action Completed", `${currentAction} has been processed successfully.`);
    setIsActionsModalVisible(false);
    setCurrentAction("");
  };

  const handleVerifyOtp = async (code: string) => {
    if (!pendingShareholder || isSubmitting) {
      showStatus("error", "No pending shareholder data");
      return;
    }

    try {
      setIsSubmitting(true);
      setGlobalLoading(true);
      
      await verifyShareholderOtp(pendingShareholder.email, code);
      
      const payload = {
        firstName: pendingShareholder.firstName,
        lastName: pendingShareholder.lastName,
        email: pendingShareholder.email,
        phone: pendingShareholder.phone || "",
        address: pendingShareholder.address || "",
        sharePercentage: 0,
        investment: parseFloat(pendingShareholder.investment as string) || 0,
        profit: parseFloat(pendingShareholder.profit as string) || 0,
        returns: parseFloat(pendingShareholder.returns as string) || 0,
        otherMoney: parseFloat(pendingShareholder.otherMoney as string) || 0,
        joinDate: pendingShareholder.joinDate,
        password: pendingShareholder.password || "ChangeMe123!",
      };
      
      const res = await apiCreateShareholder(payload);
      const newShareholder = res.data;
      
      setShareholders(prev => ([
        ...prev,
        {
          id: newShareholder._id,
          firstName: newShareholder.firstName || "",
          lastName: newShareholder.lastName || "",
          name: `${newShareholder.firstName || ""} ${newShareholder.lastName || ""}`.trim() || "Unknown",
          email: newShareholder.email,
          phone: newShareholder.phone || "",
          address: newShareholder.address || "",
          equity: newShareholder.sharePercentage || 0,
          investment: newShareholder.investment || 0,
          profit: newShareholder.profit || 0,
          returns: newShareholder.returns || 0,
          otherMoney: newShareholder.otherMoney || 0,
          joinDate: newShareholder.joinDate || new Date(newShareholder.createdAt).toISOString().slice(0,10),
        }
      ]));
      
      setOtpVisible(false);
      setPendingShareholder(null);
      showStatus("success", "Shareholder added successfully");
      
    } catch (error: any) {
      showStatus("error", error?.response?.data?.message || error?.message || "Failed to verify OTP or create shareholder");
    } finally {
      setIsSubmitting(false);
      setGlobalLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!pendingShareholder || isSubmitting) {
      return { success: false, message: "No pending shareholder" };
    }
    
    try {
      setIsSubmitting(true);
      await sendShareholderOtp(pendingShareholder.email);
      return { success: true, message: "OTP resent successfully" };
    } catch (error: any) {
      return { success: false, message: error?.response?.data?.message || error?.message || "Failed to resend OTP" };
    } finally {
      setIsSubmitting(false);
    }
  };

  // Premium Header Component
  const PremiumHeader = () => (
    <LinearGradient
      colors={[COLORS.accent, COLORS.surface]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className={`rounded-3xl mx-4 mt-6 mb-6 ${isMobile ? 'p-6' : 'p-8'}`}
    >
      <View className={`flex-row justify-between items-start ${isMobile ? 'flex-col' : ''}`}>
        <View className={`${isMobile ? 'mb-6' : 'flex-1 mr-6'}`}>
          <Text className={`text-white ${isMobile ? 'text-2xl' : 'text-3xl'} font-bold mb-2`}>
            Shareholder Management
          </Text>
          <Text className="text-white/80 text-base mb-6">
            Manage equity, investments, and profit distributions
          </Text>
          
          {/* Quick Stats */}
          <View className={`flex-row ${isMobile ? 'flex-wrap -mx-1' : 'space-x-4'}`}>
            <View className={`bg-white/20 rounded-2xl ${isMobile ? 'p-3 mx-1 mb-2 flex-1 min-w-20' : 'px-4 py-3'}`}>
              <Text className="text-white/70 text-xs">Total Equity</Text>
              <Text className="text-white text-lg font-bold">{totalEquity.toFixed(1)}%</Text>
            </View>
            <View className={`bg-white/20 rounded-2xl ${isMobile ? 'p-3 mx-1 mb-2 flex-1 min-w-20' : 'px-4 py-3'}`}>
              <Text className="text-white/70 text-xs">Net Profit</Text>
              <Text className="text-white text-lg font-bold">${netProfit.toLocaleString()}</Text>
            </View>
            <View className={`bg-white/20 rounded-2xl ${isMobile ? 'p-3 mx-1 mb-2 flex-1 min-w-20' : 'px-4 py-3'}`}>
              <Text className="text-white/70 text-xs">Shareholders</Text>
              <Text className="text-white text-lg font-bold">{shareholders.length}</Text>
            </View>
          </View>
        </View>
        
        {/* Add Button */}
        <TouchableOpacity
          className={`flex-row items-center rounded-2xl shadow-lg ${isMobile ? 'w-full py-4 justify-center' : 'px-6 py-4'}`}
          style={{ 
            backgroundColor: globalLoading || isSubmitting ? 'rgba(255,255,255,0.5)' : 'white',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
          }}
          onPress={() => setIsAddModalVisible(true)}
          disabled={globalLoading || isSubmitting}
        >
          {globalLoading || isSubmitting ? (
            <ActivityIndicator size="small" color={COLORS.accent} />
          ) : (
            <>
              <Ionicons name="add" size={20} color={COLORS.secondary} />
              <Text className="text-[#667eea] font-semibold ml-2">
                Add Shareholder
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );

  // View Toggle
  const ViewToggle = () => (
    <View className={`flex-row bg-gray-100 rounded-2xl p-1 mx-4 mb-4 ${isMobile ? 'w-full' : 'w-auto self-start'}`}>
      <TouchableOpacity
        className={`flex-row items-center justify-center rounded-xl flex-1 p-2 ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
        onPress={() => setViewMode('grid')}
      >
        <Ionicons 
          name="grid" 
          size={16} 
          color={viewMode === 'grid' ? COLORS.accent : COLORS.tertiary} 
        />
        {!isMobile && (
          <Text className={`ml-2 font-medium ${viewMode === 'grid' ? 'text-accent' : 'text-tertiary'}`}>
            Grid
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        className={`flex-row items-center justify-center rounded-xl flex-1 p-2 ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
        onPress={() => setViewMode('list')}
      >
        <Ionicons 
          name="list" 
          size={16} 
          color={viewMode === 'list' ? COLORS.accent : COLORS.tertiary} 
        />
        {!isMobile && (
          <Text className={`ml-2 font-medium ${viewMode === 'list' ? 'text-accent' : 'text-tertiary'}`}>
            List
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );

  // QuickActionButton wrapper with disabled state
  const QuickActionButtonWithDisabled = ({ 
    icon, 
    label, 
    onPress, 
    disabled = false 
  }: { 
    icon: string; 
    label: string; 
    onPress: () => void; 
    disabled?: boolean;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{ 
        opacity: disabled ? 0.5 : 1,
        flex: isMobile ? 1 : undefined,
        minWidth: isMobile ? undefined : 140,
        marginHorizontal: isMobile ? 2 : 4
      }}
    >
      <QuickActionButton
        icon={icon}
        label={label}
        onPress={onPress} color={""}      />
    </TouchableOpacity>
  );

  // Custom ConfirmModal
  const ConfirmModalWithLoading = ({ 
    visible, 
    title, 
    message, 
    confirmText, 
    onCancel, 
    onConfirm, 
    loading = false 
  }: any) => (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/50 p-4">
        <View className={`bg-white rounded-3xl p-6 w-full ${isMobile ? 'max-w-sm' : 'max-w-md'}`}>
          <View className="items-center mb-4">
            <View className="w-12 h-12 bg-red-100 rounded-full items-center justify-center mb-3">
              <Ionicons name="warning" size={24} color="#ef4444" />
            </View>
            <Text className="text-xl font-bold text-gray-900 text-center">{title}</Text>
          </View>
          <Text className="text-gray-600 text-center mb-6">{message}</Text>
          
          <View className={`flex-row justify-end space-x-3 ${isMobile ? 'flex-col space-y-2' : ''}`}>
            <TouchableOpacity
              className={`border border-gray-300 rounded-xl ${isMobile ? 'py-3' : 'px-6 py-3 flex-1'}`}
              onPress={onCancel}
              disabled={loading}
            >
              <Text className="text-gray-700 font-medium text-center">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`bg-red-500 rounded-xl flex-row items-center justify-center ${isMobile ? 'py-3' : 'px-6 py-3 flex-1'}`}
              onPress={onConfirm}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text className="text-white font-medium text-center">{confirmText}</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // Main Content
  const renderContent = () => (
    <Animated.View 
      style={{ 
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
        flex: 1 
      }}
    >
      {/* Premium Header */}
      <PremiumHeader />

      {/* Quick Actions */}
      <View className={`flex-row mb-6 px-4 ${isMobile ? 'space-x-1' : 'space-x-2 justify-center'}`}>
        <QuickActionButtonWithDisabled
          icon="shield-checkmark"
          label="Equity Validation"
          onPress={() => handleQuickAction("Equity Validation")}
          disabled={globalLoading || isSubmitting}
        />
        <QuickActionButtonWithDisabled
          icon="cash"
          label="Dividend Actions"
          onPress={() => handleQuickAction("Dividend Actions")}
          disabled={globalLoading || isSubmitting}
        />
        <QuickActionButtonWithDisabled
          icon="analytics"
          label="Reports"
          onPress={() => handleQuickAction("Reports")}
          disabled={globalLoading || isSubmitting}
        />
        {!isMobile && (
          <QuickActionButtonWithDisabled
            icon="download"
            label="Export Data"
            onPress={() => handleQuickAction("Export Data")}
            disabled={globalLoading || isSubmitting}
          />
        )}
      </View>

      {/* Stats Overview */}
      <View className="px-4 mb-6">
        <StatsOverview
          totalEquity={totalEquity}
          totalInvestment={totalInvestment}
          totalProfit={totalProfit}
          totalReturns={totalReturns}
          totalOtherMoney={totalOtherMoney}
          totalShareholders={shareholders.length}
        />
      </View>

      {/* Controls Bar */}
      <View className={`flex-row items-center justify-between px-4 mb-4 ${isMobile ? 'flex-col space-y-3' : ''}`}>
        <View className={`flex-row items-center ${isMobile ? 'w-full justify-between' : 'flex-1'}`}>
          <Text style={{ color: COLORS.textDark }} className="text-lg font-semibold">
            Shareholders ({filteredShareholders.length})
          </Text>
          {!isMobile && (
            <ViewToggle />
          )}
        </View>
        
        <View className={`flex-row items-center space-x-3 ${isMobile ? 'w-full' : 'w-auto'}`}>
          {isMobile && (
            <ViewToggle />
          )}
          <View className={`${isMobile ? 'flex-1' : 'w-64'}`}>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery("")}
            />
          </View>
        </View>
      </View>

      {/* Shareholders List/Grid */}
      <View className={`px-4 pb-10 flex-1 ${isMobile ? '' : 'min-h-96'}`}>
        {filteredShareholders.length > 0 ? (
          <View className={
            viewMode === 'grid' 
              ? `flex-row flex-wrap -mx-2 ${isLargeScreen ? '' : 'justify-center'}`
              : 'space-y-3'
          }>
            {filteredShareholders.map((shareholder) => (
              <View 
                key={shareholder.id} 
                className={
                  viewMode === 'grid'
                    ? `px-2 mb-4 ${isLargeScreen ? 'w-1/3' : isTablet ? 'w-1/2' : 'w-full max-w-sm'}`
                    : 'w-full'
                }
              >
                <ShareholderCard
                  shareholder={shareholder}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  viewMode={viewMode}
                />
              </View>
            ))}
          </View>
        ) : (
          <EmptyState
            searchQuery={searchQuery}
            onAddPress={() => setIsAddModalVisible(true)}
          />
        )}
      </View>
    </Animated.View>
  );

  // Web Version
  if (Platform.OS === "web") {
    return (
      <View className="flex flex-col h-screen bg-gray-50">
        <ProgressBar running={globalLoading || isSubmitting} />
        <ScrollView 
          className="flex-1"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.accent]}
              tintColor={COLORS.accent}
            />
          }
        >
          {renderContent()}
        </ScrollView>

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
        <ConfirmModalWithLoading
          visible={confirmDelete.visible}
          title="Delete Shareholder"
          message={`Are you sure you want to delete ${confirmDelete.target?.name}? This will recalculate equity for all shareholders.`}
          confirmText="Delete"
          onCancel={() => setConfirmDelete({ visible: false })}
          onConfirm={confirmDeleteNow}
          loading={isSubmitting}
        />
        <ShareholderFormModal
          visible={isAddModalVisible}
          mode="add"
          onSave={handleAdd}
          onClose={() => setIsAddModalVisible(false)}
          loading={isSubmitting}
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
          loading={isSubmitting}
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

  // Mobile Version
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ProgressBar running={globalLoading || isSubmitting} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.accent]}
              tintColor={COLORS.accent}
            />
          }
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
      <ConfirmModalWithLoading
        visible={confirmDelete.visible}
        title="Delete Shareholder"
        message={`Are you sure you want to delete ${confirmDelete.target?.name}? This will recalculate equity for all shareholders.`}
        confirmText="Delete"
        onCancel={() => setConfirmDelete({ visible: false })}
        onConfirm={confirmDeleteNow}
        loading={isSubmitting}
      />
      <ShareholderFormModal
        visible={isAddModalVisible}
        mode="add"
        onSave={handleAdd}
        onClose={() => setIsAddModalVisible(false)}
        loading={isSubmitting}
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
        loading={isSubmitting}
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