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

  const slideAnim = useRef(new Animated.Value(600)).current;
  const { height } = useWindowDimensions();
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
            paddingHorizontal: 24,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#fff",
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: "700", color: "#111827" }}>
            Set Category Budgets
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
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingVertical: 20,
              paddingBottom: 80,
              maxWidth: 900,
              alignSelf: "center",
            }}
          >
            {/* Date Range */}
            <View
              style={{
                marginBottom: 24,
                backgroundColor: "#eff6ff",
                padding: 16,
                borderRadius: 12,
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "600", marginBottom: 10 }}
              >
                Budget Valid Period
              </Text>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: "#4b5563", marginBottom: 4 }}>
                    Valid From *
                  </Text>
                  <TextInput
                    value={validFrom}
                    onChangeText={setValidFrom}
                    placeholder="YYYY-MM-DD"
                    style={{
                      backgroundColor: "#fff",
                      borderWidth: 1,
                      borderColor: "#d1d5db",
                      borderRadius: 10,
                      padding: 10,
                    }}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: "#4b5563", marginBottom: 4 }}>
                    Valid To *
                  </Text>
                  <TextInput
                    value={validTo}
                    onChangeText={setValidTo}
                    placeholder="YYYY-MM-DD"
                    style={{
                      backgroundColor: "#fff",
                      borderWidth: 1,
                      borderColor: "#d1d5db",
                      borderRadius: 10,
                      padding: 10,
                    }}
                  />
                </View>
              </View>
            </View>

            {/* Categories */}
            <Text
              style={{
                fontSize: 18,
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
                    marginBottom: 4,
                  }}
                >
                  <Text style={{ fontWeight: "500", color: "#374151" }}>
                    {name}
                  </Text>
                  <TouchableOpacity onPress={() => removeCategory(name)}>
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
                    padding: 10,
                    borderRadius: 10,
                  }}
                />
              </View>
            ))}

            {/* Add New Category */}
            <View
              style={{
                marginTop: 20,
                padding: 16,
                backgroundColor: "#f9fafb",
                borderRadius: 12,
              }}
            >
              <Text style={{ fontWeight: "600", color: "#111827", marginBottom: 8 }}>
                Add New Category
              </Text>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <TextInput
                  style={{
                    flex: 1,
                    backgroundColor: "#fff",
                    borderWidth: 1,
                    borderColor: "#d1d5db",
                    borderRadius: 10,
                    padding: 10,
                  }}
                  placeholder="Category name"
                  value={newName}
                  onChangeText={setNewName}
                />
                <TextInput
                  style={{
                    width: 100,
                    backgroundColor: "#fff",
                    borderWidth: 1,
                    borderColor: "#d1d5db",
                    borderRadius: 10,
                    padding: 10,
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
                    paddingHorizontal: 12,
                  }}
                >
                  <Feather name="plus" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Total */}
            <View
              style={{
                marginTop: 24,
                padding: 16,
                backgroundColor: "#ecfdf5",
                borderRadius: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color: "#065f46",
                  marginBottom: 6,
                }}
              >
                Total Monthly Budget
              </Text>
              <Text
                style={{
                  fontSize: 22,
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

            {/* Submit */}
            <TouchableOpacity
              onPress={handleSubmit}
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
                Save Budget
              </Text>
            </TouchableOpacity>
          </ScrollView>
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
            {/* reuse same inner structure */}
            {/* (you can copy from web version body above for mobile if needed) */}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}
