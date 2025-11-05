// src/components/admin/shareholders/ShareholderFormModal.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ShareholderFormModalProps, ShareholderFormData } from "./types";
import { COLORS } from "../../../constants/theme";

export default function ShareholderFormModal({
  visible,
  mode,
  shareholder,
  onSave,
  onClose,
  loading = false,
}: ShareholderFormModalProps & { loading?: boolean }) {
  const [formData, setFormData] = useState<ShareholderFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    equity: "0",
    investment: "0",
    profit: "0",
    returns: "0",
    otherMoney: "0",
    joinDate: new Date().toISOString().split("T")[0],
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Prefill when editing existing shareholder
  useEffect(() => {
    if (shareholder && mode === "edit") {
      setFormData({
        firstName: shareholder.firstName || "",
        lastName: shareholder.lastName || "",
        email: shareholder.email || "",
        phone: shareholder.phone || "",
        address: shareholder.address || "",
        equity: shareholder.equity?.toString() || "0",
        investment: shareholder.investment?.toString() || "0",
        profit: shareholder.profit?.toString() || "0",
        returns: shareholder.returns?.toString() || "0",
        otherMoney: shareholder.otherMoney?.toString() || "0",
        joinDate: shareholder.joinDate || new Date().toISOString().split("T")[0],
        password: "",
      });
    } else if (mode === "add") {
      // Reset form for add mode
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        equity: "0",
        investment: "0",
        profit: "0",
        returns: "0",
        otherMoney: "0",
        joinDate: new Date().toISOString().split("T")[0],
        password: "",
      });
    }
    // Reset errors and touched states when modal becomes visible
    setErrors({});
    setTouched({});
    setHasSubmitted(false);
  }, [shareholder, mode, visible]);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "firstName":
        if (!value.trim()) return "First name is required";
        if (value.trim().length < 2) return "First name must be at least 2 characters";
        if (!/^[a-zA-Z\s\-']+$/.test(value.trim())) return "First name can only contain letters, spaces, hyphens, and apostrophes";
        return "";
      
      case "lastName":
        if (!value.trim()) return "Last name is required";
        if (value.trim().length < 2) return "Last name must be at least 2 characters";
        if (!/^[a-zA-Z\s\-']+$/.test(value.trim())) return "Last name can only contain letters, spaces, hyphens, and apostrophes";
        return "";
      
      case "email":
        if (!value.trim()) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) return "Please enter a valid email address";
        if (value.trim().length > 100) return "Email must be less than 100 characters";
        return "";
      
      case "password":
        if (mode === "add") {
          if (!value.trim()) return "Password is required";
          if (value.length < 8) return "Password must be at least 8 characters";
          if (!/(?=.*[a-z])/.test(value)) return "Password must contain at least one lowercase letter";
          if (!/(?=.*[A-Z])/.test(value)) return "Password must contain at least one uppercase letter";
          if (!/(?=.*\d)/.test(value)) return "Password must contain at least one number";
          if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(value)) return "Password must contain at least one special character";
          if (value.length > 50) return "Password must be less than 50 characters";
        }
        return "";
      
      case "phone":
        if (value.trim() && !/^[\+]?[0-9\s\-\(\)]{10,15}$/.test(value.trim())) {
          return "Please enter a valid phone number";
        }
        return "";
      
      case "investment":
      case "profit":
      case "returns":
      case "otherMoney":
        if (value.trim()) {
          const numValue = parseFloat(value);
          if (isNaN(numValue)) return `Please enter a valid number for ${name}`;
          if (numValue < 0) return `${name} cannot be negative`;
          if (numValue > 1000000000) return `${name} cannot exceed 1,000,000,000`;
          if (!/^\d*\.?\d{0,2}$/.test(value)) return `${name} can only have up to 2 decimal places`;
        }
        return "";
      
      case "equity":
        if (value.trim()) {
          const numValue = parseFloat(value);
          if (isNaN(numValue)) return "Please enter a valid number for equity";
          if (numValue < 0) return "Equity cannot be negative";
          if (numValue > 100) return "Equity cannot exceed 100%";
          if (!/^\d*\.?\d{0,2}$/.test(value)) return "Equity can only have up to 2 decimal places";
        }
        return "";
      
      case "joinDate":
        if (!value.trim()) return "Join date is required";
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(value)) return "Please enter a valid date in YYYY-MM-DD format";
        
        // Validate actual date
        const date = new Date(value);
        if (isNaN(date.getTime())) return "Please enter a valid date";
        
        // Check if date is in the future
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (date > today) return "Join date cannot be in the future";
        
        // Check if date is too far in the past (e.g., more than 100 years)
        const hundredYearsAgo = new Date();
        hundredYearsAgo.setFullYear(today.getFullYear() - 100);
        if (date < hundredYearsAgo) return "Join date is too far in the past";
        return "";
      
      case "address":
        if (value.trim().length > 200) return "Address must be less than 200 characters";
        return "";
      
      default:
        return "";
    }
  };

  const validateForm = (): { isValid: boolean; errors: Record<string, string> } => {
    const newErrors: Record<string, string> = {};
    
    // Validate all fields
    Object.keys(formData).forEach(key => {
      if (key === "password" && mode !== "add") return; // Skip password validation in edit mode
      
      const error = validateField(key, formData[key as keyof ShareholderFormData] as string);
      if (error) {
        newErrors[key] = error;
      }
    });

    return { isValid: Object.keys(newErrors).length === 0, errors: newErrors };
  };

  const handleFieldChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }

    // Validate field in real-time if it's been touched before or form was submitted
    if (touched[name] || hasSubmitted) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleFieldBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, formData[name as keyof ShareholderFormData] as string);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSave = () => {
    if (loading) return;

    setHasSubmitted(true);
    
    // Mark all fields as touched to show errors
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setTouched(allTouched);

    const validation = validateForm();
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      
      // Find first error field and scroll to it
      const firstErrorField = Object.keys(validation.errors)[0];
      if (firstErrorField) {
        // You could add scroll to field logic here if needed
        console.log(`First error in field: ${firstErrorField}`);
      }
      
      return;
    }

    // Additional validation for total equity in edit mode
    if (mode === "edit" && shareholder) {
      const equity = parseFloat(formData.equity as string);
      if (equity > 100) {
        setErrors(prev => ({ ...prev, equity: "Total equity cannot exceed 100%" }));
        return;
      }
    }

    onSave(formData);
  };

  const getInputStyle = (fieldName: string) => {
    const hasError = (touched[fieldName] || hasSubmitted) && errors[fieldName];
    const baseStyle = "bg-gray-50 border rounded-xl px-4 py-3 text-gray-900";
    const borderStyle = hasError ? 'border-red-500' : 'border-gray-200';
    const disabledStyle = loading ? 'opacity-50' : '';
    
    return `${baseStyle} ${borderStyle} ${disabledStyle}`;
  };

  const getFieldPlaceholder = (fieldName: string) => {
    switch (fieldName) {
      case "investment":
      case "profit":
      case "returns":
      case "otherMoney":
        return "0.00";
      case "equity":
        return "0.00%";
      case "joinDate":
        return "YYYY-MM-DD";
      case "phone":
        return "+1 (555) 123-4567";
      default:
        return "";
    }
  };

  const isSaveDisabled = () => {
    if (loading) return true;
    
    // Check if there are any errors in touched fields
    const hasVisibleErrors = Object.keys(errors).some(key => 
      (touched[key] || hasSubmitted) && errors[key]
    );
    
    return hasVisibleErrors;
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View
        className="flex-1 justify-center items-center p-6"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <View className="bg-white rounded-3xl p-6 w-full max-w-md max-h-[90vh]">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-bold text-gray-900">
              {mode === "add" ? "Add Shareholder" : "Edit Shareholder"}
            </Text>
            <TouchableOpacity onPress={onClose} disabled={loading}>
              <Ionicons 
                name="close" 
                size={24} 
                color={loading ? COLORS.tertiary : COLORS.textDark} 
              />
            </TouchableOpacity>
          </View>

          {/* Form */}
          <ScrollView 
            className="flex-1" 
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{ paddingBottom: 10 }}
          >
            <View className="space-y-4">
              {/* First Name */}
              <View>
                <Text className="text-gray-700 font-medium mb-2">First Name *</Text>
                <TextInput
                  className={getInputStyle("firstName")}
                  value={formData.firstName}
                  onChangeText={(t) => handleFieldChange("firstName", t)}
                  onBlur={() => handleFieldBlur("firstName")}
                  placeholder="Enter first name"
                  editable={!loading}
                  maxLength={50}
                />
                {(touched.firstName || hasSubmitted) && errors.firstName && (
                  <Text className="text-red-500 text-xs mt-1 flex items-center">
                    <Ionicons name="warning-outline" size={12} color="red" className="mr-1" />
                    {errors.firstName}
                  </Text>
                )}
              </View>

              {/* Last Name */}
              <View>
                <Text className="text-gray-700 font-medium mb-2">Last Name *</Text>
                <TextInput
                  className={getInputStyle("lastName")}
                  value={formData.lastName}
                  onChangeText={(t) => handleFieldChange("lastName", t)}
                  onBlur={() => handleFieldBlur("lastName")}
                  placeholder="Enter last name"
                  editable={!loading}
                  maxLength={50}
                />
                {(touched.lastName || hasSubmitted) && errors.lastName && (
                  <Text className="text-red-500 text-xs mt-1 flex items-center">
                    <Ionicons name="warning-outline" size={12} color="red" className="mr-1" />
                    {errors.lastName}
                  </Text>
                )}
              </View>

              {/* Email */}
              <View>
                <Text className="text-gray-700 font-medium mb-2">Email *</Text>
                <TextInput
                  className={getInputStyle("email")}
                  value={formData.email}
                  onChangeText={(t) => handleFieldChange("email", t)}
                  onBlur={() => handleFieldBlur("email")}
                  placeholder="Enter email address"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  editable={mode === "add" && !loading}
                  maxLength={100}
                />
                {(touched.email || hasSubmitted) && errors.email && (
                  <Text className="text-red-500 text-xs mt-1 flex items-center">
                    <Ionicons name="warning-outline" size={12} color="red" className="mr-1" />
                    {errors.email}
                  </Text>
                )}
              </View>

              {/* Phone */}
              <View>
                <Text className="text-gray-700 font-medium mb-2">Phone</Text>
                <TextInput
                  className={getInputStyle("phone")}
                  value={formData.phone}
                  onChangeText={(t) => handleFieldChange("phone", t)}
                  onBlur={() => handleFieldBlur("phone")}
                  placeholder={getFieldPlaceholder("phone")}
                  keyboardType="phone-pad"
                  autoComplete="tel"
                  editable={!loading}
                  maxLength={20}
                />
                {(touched.phone || hasSubmitted) && errors.phone && (
                  <Text className="text-red-500 text-xs mt-1 flex items-center">
                    <Ionicons name="warning-outline" size={12} color="red" className="mr-1" />
                    {errors.phone}
                  </Text>
                )}
              </View>

              {/* Address */}
              <View>
                <Text className="text-gray-700 font-medium mb-2">Address</Text>
                <TextInput
                  className={getInputStyle("address")}
                  value={formData.address}
                  onChangeText={(t) => handleFieldChange("address", t)}
                  onBlur={() => handleFieldBlur("address")}
                  placeholder="Enter address"
                  editable={!loading}
                  multiline
                  numberOfLines={2}
                  maxLength={200}
                />
                {(touched.address || hasSubmitted) && errors.address && (
                  <Text className="text-red-500 text-xs mt-1 flex items-center">
                    <Ionicons name="warning-outline" size={12} color="red" className="mr-1" />
                    {errors.address}
                  </Text>
                )}
                <Text className="text-xs text-gray-500 mt-1 text-right">
                  {formData.address.length}/200
                </Text>
              </View>

              {/* Password (for shareholder login) - Only for Add */}
              {mode === "add" && (
                <View>
                  <Text className="text-gray-700 font-medium mb-2">Password *</Text>
                  <TextInput
                    className={getInputStyle("password")}
                    value={formData.password}
                    onChangeText={(t) => handleFieldChange("password", t)}
                    onBlur={() => handleFieldBlur("password")}
                    placeholder="Set secure password (min 8 characters)"
                    secureTextEntry
                    autoCapitalize="none"
                    autoComplete="new-password"
                    editable={!loading}
                    maxLength={50}
                  />
                  {(touched.password || hasSubmitted) && errors.password && (
                    <Text className="text-red-500 text-xs mt-1 flex items-center">
                      <Ionicons name="warning-outline" size={12} color="red" className="mr-1" />
                      {errors.password}
                    </Text>
                  )}
                  <Text className="text-xs text-gray-500 mt-1">
                    Must contain uppercase, lowercase, number, and special character
                  </Text>
                </View>
              )}

              {/* Investment */}
              <View>
                <Text className="text-gray-700 font-medium mb-2">Investment Amount</Text>
                <TextInput
                  className={getInputStyle("investment")}
                  value={formData.investment.toString()}
                  onChangeText={(t) => handleFieldChange("investment", t)}
                  onBlur={() => handleFieldBlur("investment")}
                  placeholder={getFieldPlaceholder("investment")}
                  keyboardType="decimal-pad"
                  editable={!loading}
                />
                {(touched.investment || hasSubmitted) && errors.investment && (
                  <Text className="text-red-500 text-xs mt-1 flex items-center">
                    <Ionicons name="warning-outline" size={12} color="red" className="mr-1" />
                    {errors.investment}
                  </Text>
                )}
                <Text className="text-xs text-gray-500 mt-1">
                  Equity will be calculated automatically based on total investments
                </Text>
              </View>

              {/* Profit, Returns, Other Contributions */}
              <View className="flex-row space-x-4">
                <View className="flex-1">
                  <Text className="text-gray-700 font-medium mb-2">Profit</Text>
                  <TextInput
                    className={getInputStyle("profit")}
                    value={formData.profit.toString()}
                    onChangeText={(t) => handleFieldChange("profit", t)}
                    onBlur={() => handleFieldBlur("profit")}
                    placeholder={getFieldPlaceholder("profit")}
                    keyboardType="decimal-pad"
                    editable={!loading}
                  />
                  {(touched.profit || hasSubmitted) && errors.profit && (
                    <Text className="text-red-500 text-xs mt-1 flex items-center">
                      <Ionicons name="warning-outline" size={12} color="red" className="mr-1" />
                      {errors.profit}
                    </Text>
                  )}
                </View>
                <View className="flex-1">
                  <Text className="text-gray-700 font-medium mb-2">Returns</Text>
                  <TextInput
                    className={getInputStyle("returns")}
                    value={formData.returns.toString()}
                    onChangeText={(t) => handleFieldChange("returns", t)}
                    onBlur={() => handleFieldBlur("returns")}
                    placeholder={getFieldPlaceholder("returns")}
                    keyboardType="decimal-pad"
                    editable={!loading}
                  />
                  {(touched.returns || hasSubmitted) && errors.returns && (
                    <Text className="text-red-500 text-xs mt-1 flex items-center">
                      <Ionicons name="warning-outline" size={12} color="red" className="mr-1" />
                      {errors.returns}
                    </Text>
                  )}
                </View>
              </View>

              <View>
                <Text className="text-gray-700 font-medium mb-2">Other Contributions</Text>
                <TextInput
                  className={getInputStyle("otherMoney")}
                  value={formData.otherMoney.toString()}
                  onChangeText={(t) => handleFieldChange("otherMoney", t)}
                  onBlur={() => handleFieldBlur("otherMoney")}
                  placeholder={getFieldPlaceholder("otherMoney")}
                  keyboardType="decimal-pad"
                  editable={!loading}
                />
                {(touched.otherMoney || hasSubmitted) && errors.otherMoney && (
                  <Text className="text-red-500 text-xs mt-1 flex items-center">
                    <Ionicons name="warning-outline" size={12} color="red" className="mr-1" />
                    {errors.otherMoney}
                  </Text>
                )}
              </View>

              {/* Join Date */}
              <View>
                <Text className="text-gray-700 font-medium mb-2">Join Date *</Text>
                <TextInput
                  className={getInputStyle("joinDate")}
                  value={formData.joinDate}
                  onChangeText={(t) => handleFieldChange("joinDate", t)}
                  onBlur={() => handleFieldBlur("joinDate")}
                  placeholder={getFieldPlaceholder("joinDate")}
                  editable={!loading}
                />
                {(touched.joinDate || hasSubmitted) && errors.joinDate && (
                  <Text className="text-red-500 text-xs mt-1 flex items-center">
                    <Ionicons name="warning-outline" size={12} color="red" className="mr-1" />
                    {errors.joinDate}
                  </Text>
                )}
              </View>
            </View>
          </ScrollView>

          {/* Footer Buttons */}
          <View className="flex-row justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
            <TouchableOpacity
              className="px-6 py-3 border border-gray-300 rounded-xl"
              onPress={onClose}
              disabled={loading}
            >
              <Text className={`font-medium ${loading ? 'text-gray-400' : 'text-gray-700'}`}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="px-6 py-3 rounded-xl flex-row items-center justify-center min-w-20"
              style={{ 
                backgroundColor: isSaveDisabled() || loading ? COLORS.tertiary : COLORS.accent,
                opacity: isSaveDisabled() || loading ? 0.6 : 1
              }}
              onPress={handleSave}
              disabled={isSaveDisabled() || loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color={COLORS.white} />
              ) : (
                <Text className="text-white font-medium">
                  {mode === "add" ? "Add Shareholder" : "Save Changes"}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}