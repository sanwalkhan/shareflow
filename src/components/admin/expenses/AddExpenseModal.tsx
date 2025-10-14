// src/components/admin/expenses/AddExpenseModal.tsx
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Modal,
  TextInput,
  Switch,
  Platform,
  useWindowDimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../../constants/theme";
import ShareholderAllocation from "./ShareholderAllocation";
import { Shareholder } from "./types";

interface AddExpenseModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
  loading: boolean;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  expenseTypes: { label: string; value: string; icon: string; color: string }[];
  categories: string[];
  shareholders: Shareholder[];
  distributionMethod: "equal" | "percentage" | "custom";
  setDistributionMethod: (v: "equal" | "percentage" | "custom") => void;
  customAllocations: { [key: string]: string };
  setCustomAllocations: React.Dispatch<
    React.SetStateAction<{ [key: string]: string }>
  >;
  calculateAllocations: (amount: number) => Shareholder[];
}

export default function AddExpenseModal({
  visible,
  onClose,
  onSubmit,
  loading,
  formData,
  setFormData,
  expenseTypes,
  categories,
  shareholders,
  distributionMethod,
  setDistributionMethod,
  customAllocations,
  setCustomAllocations,
  calculateAllocations,
}: AddExpenseModalProps) {
  const slideAnim = useRef(new Animated.Value(600)).current;
  const { height } = useWindowDimensions();
  const HEADER_HEIGHT = 64;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : 600,
      duration: visible ? 300 : 200,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  // ───────────────────────────────
  // 🌐 WEB VERSION (scrollable overlay)
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
            paddingHorizontal: 24,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#fff",
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: "700", color: "#111827" }}>
            Add New Expense
          </Text>
          <TouchableOpacity onPress={onClose} style={{ padding: 6 }}>
            <Feather name="x" size={24} color={COLORS.gray} />
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
                paddingHorizontal: 24,
              }}
            >
              {/* Expense Type */}
              <View style={{ marginBottom: 24 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: 10,
                  }}
                >
                  Expense Type
                </Text>
                <View style={{ flexDirection: "row" }}>
                  {expenseTypes.map((type) => (
                    <TouchableOpacity
                      key={type.value}
                      onPress={() =>
                        setFormData((prev: any) => ({
                          ...prev,
                          type: type.value,
                        }))
                      }
                      style={{
                        flex: 1,
                        marginHorizontal: 8,
                        padding: 16,
                        borderRadius: 14,
                        borderWidth: 2,
                        borderColor:
                          formData.type === type.value
                            ? COLORS.accent
                            : "#d1d5db",
                        backgroundColor:
                          formData.type === type.value
                            ? `${COLORS.accent}20`
                            : "#fff",
                        alignItems: "center",
                      }}
                    >
                      <Feather
                        name={type.icon as any}
                        size={22}
                        color={
                          formData.type === type.value
                            ? type.color
                            : COLORS.gray
                        }
                      />
                      <Text
                        style={{
                          marginTop: 8,
                          fontWeight: "600",
                          color:
                            formData.type === type.value
                              ? COLORS.accent
                              : "#4b5563",
                        }}
                      >
                        {type.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Basic Info */}
              <View style={{ marginBottom: 24 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: 10,
                  }}
                >
                  Basic Information
                </Text>

                {[
                  {
                    label: "Title *",
                    key: "title",
                    placeholder: "Enter expense title",
                  },
                  {
                    label: "Amount *",
                    key: "amount",
                    placeholder: "0.00",
                    keyboardType: "decimal-pad",
                  },
                ].map((input) => (
                  <View style={{ marginBottom: 14 }} key={input.key}>
                    <Text
                      style={{
                        color: "#374151",
                        marginBottom: 6,
                        fontWeight: "500",
                      }}
                    >
                      {input.label}
                    </Text>
                    <TextInput
                      value={formData[input.key]}
                      onChangeText={(val) =>
                        setFormData((prev: any) => ({
                          ...prev,
                          [input.key]: val,
                        }))
                      }
                      placeholder={input.placeholder}
                      keyboardType={input.keyboardType as any}
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

                {/* Category */}
                <View style={{ marginBottom: 14 }}>
                  <Text
                    style={{
                      color: "#374151",
                      marginBottom: 8,
                      fontWeight: "500",
                    }}
                  >
                    Category *
                  </Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {categories.map((cat) => (
                      <TouchableOpacity
                        key={cat}
                        onPress={() =>
                          setFormData((prev: any) => ({
                            ...prev,
                            category: cat,
                          }))
                        }
                        style={{
                          marginRight: 8,
                          marginBottom: 8,
                          paddingHorizontal: 12,
                          paddingVertical: 8,
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor:
                            formData.category === cat
                              ? COLORS.accent
                              : "#d1d5db",
                          backgroundColor:
                            formData.category === cat
                              ? `${COLORS.accent}10`
                              : "#fff",
                        }}
                      >
                        <Text
                          style={{
                            color:
                              formData.category === cat
                                ? COLORS.accent
                                : "#4b5563",
                            fontWeight:
                              formData.category === cat ? "600" : "400",
                          }}
                        >
                          {cat}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Description */}
                <View style={{ marginBottom: 14 }}>
                  <Text
                    style={{
                      color: "#374151",
                      marginBottom: 6,
                      fontWeight: "500",
                    }}
                  >
                    Description
                  </Text>
                  <TextInput
                    value={formData.description}
                    onChangeText={(val) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        description: val,
                      }))
                    }
                    placeholder="Enter expense description"
                    multiline
                    style={{
                      backgroundColor: "#f8fafc",
                      borderWidth: 1,
                      borderColor: "#d1d5db",
                      paddingHorizontal: 12,
                      paddingVertical: 10,
                      borderRadius: 12,
                      minHeight: 100,
                      textAlignVertical: "top",
                    }}
                  />
                </View>
              </View>

              {/* Additional Options */}
              <View style={{ marginBottom: 30 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: 10,
                  }}
                >
                  Additional Options
                </Text>
                {[
                  { label: "Tax Deductible", key: "taxDeductible" },
                  { label: "Recurring Expense", key: "recurring" },
                ].map((opt) => (
                  <View
                    key={opt.key}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingVertical: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: "#e5e7eb",
                    }}
                  >
                    <Text style={{ color: "#374151", fontWeight: "500" }}>
                      {opt.label}
                    </Text>
                    <Switch
                      value={formData[opt.key]}
                      onValueChange={(val) =>
                        setFormData((prev: any) => ({
                          ...prev,
                          [opt.key]: val,
                        }))
                      }
                      trackColor={{ true: COLORS.accent, false: "#e5e7eb" }}
                    />
                  </View>
                ))}
              </View>

              {/* Shareholder Allocation */}
              <ShareholderAllocation
                shareholders={shareholders}
                amount={formData.amount}
                distributionMethod={distributionMethod}
                setDistributionMethod={setDistributionMethod}
                customAllocations={customAllocations}
                setCustomAllocations={setCustomAllocations}
                calculateAllocations={calculateAllocations}
              />

              {/* Submit Button */}
              <TouchableOpacity
                onPress={onSubmit}
                disabled={loading}
                style={{
                  backgroundColor: COLORS.accent,
                  paddingVertical: 14,
                  borderRadius: 14,
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 30,
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
                  {loading ? "Saving..." : "Add Expense & Allocate"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    );
  }

  // ───────────────────────────────
  // 📱 MOBILE VERSION (Modal)
  // ───────────────────────────────
  return (
    <Modal visible={visible} transparent={false} animationType="none">
      <View className="flex-1 bg-white">
        <Animated.View
          className="flex-1 bg-white"
          style={{ transform: [{ translateY: slideAnim }] }}
        >
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingVertical: 20,
              paddingBottom: 80,
            }}
            showsVerticalScrollIndicator={false}
          >
            {/* replicate the same content as above */}
            {/* ... you can reuse the same inner structure here ... */}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}
