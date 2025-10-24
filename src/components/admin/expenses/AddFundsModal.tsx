import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  Animated,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../../constants/theme";

interface AddFundsModalProps {
  visible: boolean;
  onClose: () => void;
  onAddFunds: (
    amount: number,
    category?: string,
    details?: Record<string, string>
  ) => void;
  categories: string[];
}

export default function AddFundsModal({
  visible,
  onClose,
  onAddFunds,
  categories,
}: AddFundsModalProps) {
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [fundSource, setFundSource] = useState("");
  const [fromEntity, setFromEntity] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [notes, setNotes] = useState("");

  const slideAnim = useRef(new Animated.Value(600)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : 600,
      duration: visible ? 300 : 200,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const handleSubmit = () => {
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    onAddFunds(value, selectedCategory || undefined, {
      fundSource,
      fromEntity,
      referenceId,
      notes,
    });

    setAmount("");
    setSelectedCategory(null);
    setFundSource("");
    setFromEntity("");
    setReferenceId("");
    setNotes("");
    onClose();
  };

  // ───────────────────────────────
  // 🌐 WEB VERSION
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
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <View
          style={{
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: "#e5e7eb",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: "700", color: "#111827" }}>
            Add Budget Allocation
          </Text>
          <TouchableOpacity onPress={onClose}>
            <Feather name="x" size={22} color={COLORS.gray} />
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
              paddingBottom: 80,
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
              {/* Amount */}
              <View style={{ marginBottom: 24 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: 10,
                  }}
                >
                  Budget Amount *
                </Text>
                <TextInput
                  value={amount}
                  onChangeText={setAmount}
                  placeholder="Enter budget amount (USD)"
                  keyboardType="decimal-pad"
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

              {/* Category */}
              <View style={{ marginBottom: 24 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: 10,
                  }}
                >
                  Allocate To (Category)
                </Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  <TouchableOpacity
                    onPress={() => setSelectedCategory(null)}
                    style={{
                      marginRight: 8,
                      marginBottom: 8,
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: !selectedCategory
                        ? COLORS.accent
                        : "#d1d5db",
                      backgroundColor: !selectedCategory
                        ? `${COLORS.accent}10`
                        : "#fff",
                    }}
                  >
                    <Text
                      style={{
                        color: !selectedCategory ? COLORS.accent : "#4b5563",
                        fontWeight: !selectedCategory ? "600" : "400",
                      }}
                    >
                      Total Budget (no category)
                    </Text>
                  </TouchableOpacity>

                  {categories.map((cat) => (
                    <TouchableOpacity
                      key={cat}
                      onPress={() => setSelectedCategory(cat)}
                      style={{
                        marginRight: 8,
                        marginBottom: 8,
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor:
                          selectedCategory === cat
                            ? COLORS.accent
                            : "#d1d5db",
                        backgroundColor:
                          selectedCategory === cat
                            ? `${COLORS.accent}10`
                            : "#fff",
                      }}
                    >
                      <Text
                        style={{
                          color:
                            selectedCategory === cat
                              ? COLORS.accent
                              : "#4b5563",
                          fontWeight:
                            selectedCategory === cat ? "600" : "400",
                        }}
                      >
                        {cat}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Optional Details */}
              <View style={{ marginBottom: 24 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: 10,
                  }}
                >
                  Source (optional)
                </Text>
                <TextInput
                  value={fundSource}
                  onChangeText={setFundSource}
                  placeholder="e.g., Investor, Bank, Revenue"
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

              {/* From / Sender */}
              <View style={{ marginBottom: 24 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: 10,
                  }}
                >
                  From (Sender / Entity)
                </Text>
                <TextInput
                  value={fromEntity}
                  onChangeText={setFromEntity}
                  placeholder="e.g., John Doe, ABC Bank"
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

              {/* Reference ID */}
              <View style={{ marginBottom: 24 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: 10,
                  }}
                >
                  Reference / Transaction ID (optional)
                </Text>
                <TextInput
                  value={referenceId}
                  onChangeText={setReferenceId}
                  placeholder="Enter transaction or reference number"
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

              {/* Notes */}
              <View style={{ marginBottom: 40 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: 10,
                  }}
                >
                  Notes / Description (optional)
                </Text>
                <TextInput
                  value={notes}
                  onChangeText={setNotes}
                  placeholder="Add any remarks or details about this fund"
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
                  Add Budget
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    );
  }

  // ───────────────────────────────
  // 📱 MOBILE VERSION
  // ───────────────────────────────
  return (
    <Modal visible={visible} transparent={false} animationType="slide">
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
            {/* Same inner structure */}
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-2xl font-bold text-gray-900">
                Add Budget Allocation
              </Text>
              <TouchableOpacity onPress={onClose} className="p-2">
                <Feather name="x" size={24} color={COLORS.gray} />
              </TouchableOpacity>
            </View>

            {/* Reuse all fields from web version */}
            {/* ... same content as above ... */}

            {/* Submit */}
            <TouchableOpacity
              className="bg-accent py-4 rounded-xl flex-row justify-center items-center shadow-lg mt-6"
              onPress={handleSubmit}
            >
              <Feather name="check" size={20} color="white" />
              <Text className="text-white font-semibold text-lg ml-2">
                Add Budget
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}
