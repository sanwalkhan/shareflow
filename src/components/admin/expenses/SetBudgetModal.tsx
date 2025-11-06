// src/components/admin/expenses/SetBudgetModal.tsx
import React, { useEffect, useRef, useMemo, useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
  Platform,
  useWindowDimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../../constants/theme";
import DateTimePicker from '@react-native-community/datetimepicker';

interface SetBudgetModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (
    categories: Record<string, number>,
    validFrom: Date,
    validTo: Date
  ) => void;
  initialCategories?: Record<string, number>;
  initialValidFrom?: Date;
  initialValidTo?: Date;
}

export default function SetBudgetModal({
  visible,
  onClose,
  onSubmit,
  initialCategories,
  initialValidFrom,
  initialValidTo,
}: SetBudgetModalProps) {
  const [categories, setCategories] = useState<Record<string, string>>({});
  const [newName, setNewName] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [validFrom, setValidFrom] = useState("");
  const [validTo, setValidTo] = useState("");
  const [showDatePicker, setShowDatePicker] = useState<'from' | 'to' | null>(null);
  const [tempDate, setTempDate] = useState(new Date());

  const slideAnim = useRef(new Animated.Value(600)).current;
  const { width, height } = useWindowDimensions();
  const isMobile = width < 768;
  const HEADER_HEIGHT = 64;

  // Animate slide up/down
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : 600,
      duration: visible ? 300 : 200,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  useEffect(() => {
    if (visible) {
      const init =
        initialCategories || {
          Operations: 0,
          Marketing: 0,
          "R&D": 0,
          Administrative: 0,
          Travel: 0,
          Miscellaneous: 0,
        };
      const strMap: Record<string, string> = {};
      Object.entries(init).forEach(([k, v]) => (strMap[k] = String(v || 0)));
      setCategories(strMap);

      const now = new Date();
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      setValidFrom(
        initialValidFrom
          ? initialValidFrom.toISOString().split("T")[0]
          : firstDay.toISOString().split("T")[0]
      );
      setValidTo(
        initialValidTo
          ? initialValidTo.toISOString().split("T")[0]
          : lastDay.toISOString().split("T")[0]
      );
    }
  }, [visible, initialCategories, initialValidFrom, initialValidTo]);

  const totalAlloc = useMemo(
    () =>
      Object.values(categories).reduce(
        (s, v) => s + (parseFloat(v || "0") || 0),
        0
      ),
    [categories]
  );

  const addCategory = () => {
    const name = newName.trim();
    const amount = parseFloat(newAmount || "0") || 0;
    if (!name || categories[name] !== undefined) return;
    setCategories((prev) => ({ ...prev, [name]: String(amount) }));
    setNewName("");
    setNewAmount("");
  };

  const removeCategory = (name: string) => {
    const copy = { ...categories };
    delete copy[name];
    setCategories(copy);
  };

  const handleDatePress = (type: 'from' | 'to') => {
    // Set temp date to current value or today
    const currentDate = type === 'from' && validFrom 
      ? new Date(validFrom) 
      : type === 'to' && validTo 
      ? new Date(validTo)
      : new Date();
    setTempDate(currentDate);
    setShowDatePicker(type);
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      const dateString = selectedDate.toISOString().split("T")[0];
      if (showDatePicker === 'from') {
        setValidFrom(dateString);
      } else if (showDatePicker === 'to') {
        setValidTo(dateString);
      }
    }
    setShowDatePicker(null);
  };

  const handleSubmit = () => {
    if (!validFrom || !validTo) {
      alert("Please select valid from and to dates");
      return;
    }

    const fromDate = new Date(validFrom);
    const toDate = new Date(validTo);

    if (toDate < fromDate) {
      alert("'Valid To' date must be after 'Valid From' date");
      return;
    }

    const categoriesData = Object.fromEntries(
      Object.entries(categories).map(([k, v]) => [
        k,
        parseFloat(v || "0") || 0,
      ])
    );

    onSubmit(categoriesData, fromDate, toDate);
  };

  // ───────────────────────────────
  // 🌐 WEB VERSION (Slide Overlay)
  // ───────────────────────────────
  if (Platform.OS === "web") {
    if (!visible) return null;

    return (
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          backgroundColor: "white",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <View
          style={{
            height: HEADER_HEIGHT,
            borderBottomWidth: 1,
            borderBottomColor: "#e5e7eb",
            paddingHorizontal: isMobile ? 20 : 24,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#fff",
          }}
        >
          <Text style={{ 
            fontSize: isMobile ? 20 : 22, 
            fontWeight: "700", 
            color: "#111827" 
          }}>
            Set Category Budgets
          </Text>
          <TouchableOpacity onPress={onClose} style={{ padding: 6 }}>
            <Feather name="x" size={isMobile ? 20 : 24} color={COLORS.gray} />
          </TouchableOpacity>
        </View>

        {/* Scrollable Body */}
        <Animated.View
          style={{
            transform: [{ translateY: slideAnim }],
            flex: 1,
            backgroundColor: "#fff",
          }}
        >
          <View
            className="overflow-y-auto web-scroll"
            style={{
              flex: 1,
              paddingVertical: 20,
              paddingBottom: 40,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "100%",
                maxWidth: 900,
                paddingHorizontal: isMobile ? 20 : 24,
              }}
            >
              {/* Date Range - FIXED SPACING WITH CALENDAR */}
              <View style={{ marginBottom: 24 }}>
                <Text
                  style={{
                    fontSize: isMobile ? 16 : 18,
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: 16,
                  }}
                >
                  Budget Valid Period
                </Text>
                
                <View style={{ 
                  flexDirection: isMobile ? "column" : "row", 
                  gap: isMobile ? 20 : 10,
                }}>
                  <View style={{ flex: isMobile ? 0 : 1 }}>
                    <Text style={{ 
                      color: "#374151", 
                      marginBottom: 8,
                      fontWeight: "500",
                      fontSize: isMobile ? 14 : 16 
                    }}>
                      Valid From *
                    </Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <TextInput
                        value={validFrom}
                        onChangeText={setValidFrom}
                        placeholder="YYYY-MM-DD"
                        style={{
                          flex: 1,
                          backgroundColor: "#f8fafc",
                          borderWidth: 1,
                          borderColor: "#d1d5db",
                          paddingHorizontal: 12,
                          paddingVertical: 10,
                          borderRadius: 12,
                          fontSize: isMobile ? 14 : 16,
                        }}
                      />
                      <TouchableOpacity 
                        onPress={() => handleDatePress('from')}
                        style={{ 
                          marginLeft: 8,
                          padding: 10,
                          backgroundColor: "#f3f4f6",
                          borderRadius: 10,
                        }}
                      >
                        <Feather name="calendar" size={18} color={COLORS.gray} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ flex: isMobile ? 0 : 1 }}>
                    <Text style={{ 
                      color: "#374151", 
                      marginBottom: 8,
                      fontWeight: "500",
                      fontSize: isMobile ? 14 : 16 
                    }}>
                      Valid To *
                    </Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <TextInput
                        value={validTo}
                        onChangeText={setValidTo}
                        placeholder="YYYY-MM-DD"
                        style={{
                          flex: 1,
                          backgroundColor: "#f8fafc",
                          borderWidth: 1,
                          borderColor: "#d1d5db",
                          paddingHorizontal: 12,
                          paddingVertical: 10,
                          borderRadius: 12,
                          fontSize: isMobile ? 14 : 16,
                        }}
                      />
                      <TouchableOpacity 
                        onPress={() => handleDatePress('to')}
                        style={{ 
                          marginLeft: 8,
                          padding: 10,
                          backgroundColor: "#f3f4f6",
                          borderRadius: 10,
                        }}
                      >
                        <Feather name="calendar" size={18} color={COLORS.gray} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>

              {/* Categories */}
              <View style={{ marginBottom: 24 }}>
                <Text
                  style={{
                    fontSize: isMobile ? 16 : 18,
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: 10,
                  }}
                >
                  Category Allocations
                </Text>
                
                {Object.keys(categories).map((name) => (
                  <View key={name} style={{ marginBottom: 14 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 6,
                      }}
                    >
                      <Text style={{ fontWeight: "500", color: "#374151" }}>
                        {name}
                      </Text>
                      <TouchableOpacity 
                        onPress={() => removeCategory(name)}
                        style={{ padding: 4 }}
                      >
                        <Feather name="trash-2" size={16} color="#ef4444" />
                      </TouchableOpacity>
                    </View>
                    <TextInput
                      keyboardType="decimal-pad"
                      placeholder="0.00"
                      value={categories[name]}
                      onChangeText={(v) =>
                        setCategories((prev) => ({ ...prev, [name]: v }))
                      }
                      style={{
                        backgroundColor: "#f8fafc",
                        borderWidth: 1,
                        borderColor: "#d1d5db",
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                        borderRadius: 12,
                      }}
                    />
                  </View>
                ))}
              </View>

              {/* Add New Category */}
              <View
                style={{
                  marginBottom: 24,
                  padding: 16,
                  backgroundColor: "#f9fafb",
                  borderRadius: 12,
                }}
              >
                <Text style={{ 
                  fontWeight: "600", 
                  color: "#111827", 
                  marginBottom: 8,
                  fontSize: isMobile ? 14 : 16 
                }}>
                  Add New Category
                </Text>
                <View style={{ 
                  flexDirection: isMobile ? "column" : "row", 
                  gap: isMobile ? 12 : 8 
                }}>
                  <TextInput
                    style={{
                      flex: isMobile ? 0 : 1,
                      backgroundColor: "#fff",
                      borderWidth: 1,
                      borderColor: "#d1d5db",
                      borderRadius: 10,
                      paddingHorizontal: 12,
                      paddingVertical: 10,
                    }}
                    placeholder="Category name"
                    value={newName}
                    onChangeText={setNewName}
                  />
                  <TextInput
                    style={{
                      width: isMobile ? "100%" : 100,
                      backgroundColor: "#fff",
                      borderWidth: 1,
                      borderColor: "#d1d5db",
                      borderRadius: 10,
                      paddingHorizontal: 12,
                      paddingVertical: 10,
                    }}
                    placeholder="Amount"
                    keyboardType="decimal-pad"
                    value={newAmount}
                    onChangeText={setNewAmount}
                  />
                  <TouchableOpacity
                    onPress={addCategory}
                    style={{
                      backgroundColor: COLORS.accent,
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      paddingHorizontal: isMobile ? 16 : 12,
                      paddingVertical: isMobile ? 12 : 10,
                      flexDirection: "row",
                    }}
                  >
                    <Feather name="plus" size={18} color="white" />
                    <Text style={{ color: "white", fontWeight: "600", marginLeft: 6 }}>
                      Add
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Total */}
              <View
                style={{
                  marginBottom: 24,
                  padding: 16,
                  backgroundColor: "#ecfdf5",
                  borderRadius: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: isMobile ? 14 : 16,
                    fontWeight: "500",
                    color: "#065f46",
                    marginBottom: 6,
                  }}
                >
                  Total Monthly Budget
                </Text>
                <Text
                  style={{
                    fontSize: isMobile ? 20 : 22,
                    fontWeight: "700",
                    color: "#059669",
                  }}
                >
                  ${totalAlloc.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Text>
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                onPress={handleSubmit}
                style={{
                  backgroundColor: COLORS.accent,
                  paddingVertical: 14,
                  borderRadius: 14,
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 10,
                  marginBottom: 60,
                }}
              >
                <Feather name="check" size={20} color="white" />
                <Text
                  style={{
                    color: "white",
                    fontWeight: "700",
                    marginLeft: 8,
                    fontSize: 16,
                  }}
                >
                  Save Budget
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {/* Date Picker Modal for Web */}
        {showDatePicker && Platform.OS === 'web' && (
          <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10000,
          }}>
            <View style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 12,
              minWidth: 300,
            }}>
              <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16 }}>
                Select {showDatePicker === 'from' ? 'Start' : 'End'} Date
              </Text>
              <input
                type="date"
                value={showDatePicker === 'from' ? validFrom : validTo}
                onChange={(e) => {
                  if (showDatePicker === 'from') {
                    setValidFrom(e.target.value);
                  } else {
                    setValidTo(e.target.value);
                  }
                  setShowDatePicker(null);
                }}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px',
                  marginBottom: 16,
                }}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
                <TouchableOpacity
                  onPress={() => setShowDatePicker(null)}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: '#d1d5db',
                  }}
                >
                  <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setShowDatePicker(null)}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 8,
                    backgroundColor: COLORS.accent,
                  }}
                >
                  <Text style={{ color: 'white' }}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }

  // ───────────────────────────────
  // 📱 MOBILE VERSION (Modal)
  // ───────────────────────────────
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 bg-white">
        <Animated.View
          className="flex-1 bg-white"
          style={{ transform: [{ translateY: slideAnim }] }}
        >
          {/* Header */}
          <View className="px-4 py-4 border-b border-gray-200 bg-white flex-row items-center justify-between">
            <Text className="text-xl font-bold text-gray-900">
              Set Category Budgets
            </Text>
            <TouchableOpacity onPress={onClose} className="w-8 h-8 items-center justify-center rounded-full bg-gray-100">
              <Feather name="x" size={18} color={COLORS.gray} />
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingVertical: 16,
              paddingBottom: 100,
            }}
            showsVerticalScrollIndicator={false}
          >
            {/* Date Range - MOBILE OPTIMIZED */}
            <View className="mb-6">
              <Text className="text-lg font-semibold text-gray-900 mt-400">
                Budget Valid Period
              </Text>
              
              <View className="space-y-4">
                <View>
                  <Text className="text-gray-600 text-sm mb-2">Valid From *</Text>
                  <View className="flex-row items-center">
                    <TextInput
                      value={validFrom}
                      onChangeText={setValidFrom}
                      placeholder="YYYY-MM-DD"
                      className="flex-1 bg-gray-50 border border-gray-300 rounded-lg p-3 text-gray-900"
                    />
                    <TouchableOpacity 
                      onPress={() => handleDatePress('from')}
                      className="ml-2 p-3 bg-gray-100 rounded-lg"
                    >
                      <Feather name="calendar" size={18} color={COLORS.gray} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View>
                  <Text className="text-gray-600 text-sm mb-2">Valid To *</Text>
                  <View className="flex-row items-center">
                    <TextInput
                      value={validTo}
                      onChangeText={setValidTo}
                      placeholder="YYYY-MM-DD"
                      className="flex-1 bg-gray-50 border border-gray-300 rounded-lg p-3 text-gray-900"
                    />
                    <TouchableOpacity 
                      onPress={() => handleDatePress('to')}
                      className="ml-2 p-3 bg-gray-100 rounded-lg"
                    >
                      <Feather name="calendar" size={18} color={COLORS.gray} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            {/* Rest of the mobile content... */}
            <Text className="text-base text-gray-500 text-center">
              Mobile content implementation would continue here...
            </Text>
          </ScrollView>

          {/* Submit Button */}
          <View className="px-4 py-4 border-t border-gray-200 bg-white">
            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-green-500 py-4 rounded-xl flex-row items-center justify-center"
            >
              <Feather name="check" size={20} color="white" />
              <Text className="text-white font-bold text-lg ml-2">
                Save Budget
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Native Date Picker for Mobile */}
        {showDatePicker && (
          <DateTimePicker
            value={tempDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onDateChange}
          />
        )}
      </View>
    </Modal>
  );
}