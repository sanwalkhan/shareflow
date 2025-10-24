import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, isMobile } from "../constants/theme";

interface OTPModalProps {
  visible: boolean;
  onClose: () => void;
  onVerify: (otp: string) => Promise<void>;
  onResend: () => Promise<{ success: boolean }>;
  email?: string;
}

export default function OTPModal({ 
  visible, 
  onClose, 
  onVerify, 
  onResend,
  email 
}: OTPModalProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(600); // 10 minutes
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    if (visible) {
      setTimer(600); // Reset to 10 minutes
      setOtp(["", "", "", "", "", ""]);
      setCanResend(false);
      startAnimation();
    }
  }, [visible]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (visible && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer, visible]);

  const startAnimation = () => {
    fadeAnim.setValue(0);
    slideAnim.setValue(50);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleOtpChange = (value: string, index: number) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }

      // Auto-submit when all fields are filled
      if (newOtp.every((digit) => digit !== "") && index === 5) {
        handleVerify(newOtp.join(""));
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOTP = async () => {
    if (!canResend || isResending) return;

    setIsResending(true);
    try {
      const result = await onResend();
      if (result.success) {
        setTimer(600); // Reset timer to 10 minutes
        setCanResend(false);
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
        Alert.alert("Success", "A new verification code has been sent to your email.");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to resend code. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  const handleVerify = async (otpCode?: string) => {
    const code = otpCode || otp.join("");
    
    if (code.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter all 6 digits");
      return;
    }

    setIsVerifying(true);
    try {
      await onVerify(code);
      // Success - modal will be closed by parent component
    } catch (error: any) {
      Alert.alert("Verification Failed", error.message || "Invalid verification code. Please try again.");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSkip = () => {
    Alert.alert(
      "Cancel Registration",
      "Are you sure you want to cancel? Your registration will not be completed.",
      [
        { text: "No, Continue", style: "cancel" },
        { 
          text: "Yes, Cancel", 
          style: "destructive",
          onPress: onClose 
        },
      ]
    );
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <Modal visible={visible} animationType="fade" transparent statusBarTranslucent>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: COLORS.neutral + "AA" }}
      >
        <Animated.View
          className={`rounded-3xl mx-5 ${isMobile ? "w-full max-w-sm" : "w-96"}`}
          style={{
            backgroundColor: COLORS.white,
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            shadowColor: COLORS.black,
            shadowOffset: { width: 0, height: 20 },
            shadowOpacity: 0.3,
            shadowRadius: 30,
            elevation: 20,
          }}
        >
          {/* Header */}
          <View
            style={{
              padding: 24,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.tertiary + "30",
            }}
          >
            <View className="flex-row justify-between items-center mb-3">
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  backgroundColor: COLORS.accent + "20",
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  borderRadius: 9999,
                }}
              >
                <Feather name="shield" size={14} color={COLORS.accent} />
                <Text style={{ color: COLORS.accent, fontSize: 12, fontWeight: "700" }}>
                  EMAIL VERIFICATION
                </Text>
              </View>
              <TouchableOpacity
                onPress={handleSkip}
                disabled={isVerifying}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: COLORS.tertiary + "10",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Feather name="x" size={18} color={COLORS.secondary} />
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center gap-3">
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 16,
                  backgroundColor: COLORS.accent + "20",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Feather name="mail" size={24} color={COLORS.accent} />
              </View>
              <View className="flex-1">
                <Text
                  style={{
                    color: COLORS.textDark,
                    fontSize: 20,
                    fontWeight: "700",
                    marginBottom: 2,
                  }}
                >
                  Verify Your Email
                </Text>
                <Text style={{ color: COLORS.secondary, fontSize: 14 }}>
                  Enter the 6-digit code we sent
                </Text>
              </View>
            </View>
          </View>

          {/* Content */}
          <View style={{ padding: 24 }}>
            <Text style={{ color: COLORS.textDark, fontSize: 14, fontWeight: "500", marginBottom: 4 }}>
              Verification code sent to:
            </Text>
            <Text style={{ color: COLORS.accent, fontSize: 14, fontWeight: "600", marginBottom: 24 }}>
              {email || "your email address"}
            </Text>

            {/* OTP Inputs */}
            <View className="flex-row justify-between mb-6">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <View
                  key={index}
                  style={{
                    width: 48,
                    height: 56,
                    borderRadius: 12,
                    borderWidth: 2,
                    justifyContent: "center",
                    alignItems: "center",
                    borderColor: otp[index] ? COLORS.accent : COLORS.tertiary + "60",
                    backgroundColor: otp[index]
                      ? COLORS.accent + "10"
                      : COLORS.tertiary + "08",
                  }}
                >
                  <TextInput
                    ref={(ref) => {
                      inputRefs.current[index] = ref;
                    }}
                    value={otp[index]}
                    onChangeText={(value) => handleOtpChange(value, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    keyboardType="numeric"
                    maxLength={1}
                    editable={!isVerifying}
                    style={{
                      color: COLORS.textDark,
                      fontSize: 20,
                      fontWeight: "700",
                      textAlign: "center",
                      width: "100%",
                    }}
                    selectTextOnFocus
                  />
                </View>
              ))}
            </View>

            {/* Timer */}
            <View className="flex-row justify-center items-center mb-6">
              <Feather name="clock" size={16} color={timer < 60 ? COLORS.primary : COLORS.secondary} />
              {timer > 0 ? (
                <Text style={{ color: timer < 60 ? COLORS.primary : COLORS.secondary, fontSize: 14, marginLeft: 6 }}>
                  Code expires in
                  <Text
                    style={{
                      fontWeight: "600",
                      color: timer < 60 ? COLORS.primary : COLORS.textDark,
                    }}
                  >
                    {` ${formatTime(timer)}`}
                  </Text>
                </Text>
              ) : (
                <Text style={{ fontWeight: "600", color: COLORS.primary, marginLeft: 6 }}>
                  Code expired
                </Text>
              )}
            </View>

            {/* Action Buttons */}
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={handleSkip}
                disabled={isVerifying}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  paddingVertical: 14,
                  borderRadius: 12,
                  borderWidth: 1.5,
                  borderColor: COLORS.tertiary + "60",
                  opacity: isVerifying ? 0.5 : 1,
                }}
              >
                <Feather name="x-circle" size={18} color={COLORS.secondary} />
                <Text style={{ color: COLORS.secondary, fontWeight: "600" }}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleVerify()}
                disabled={otp.join("").length !== 6 || isVerifying}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  paddingVertical: 14,
                  borderRadius: 12,
                  backgroundColor: COLORS.accent,
                  shadowColor: COLORS.accent,
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.3,
                  shadowRadius: 16,
                  elevation: 8,
                  opacity: otp.join("").length === 6 && !isVerifying ? 1 : 0.6,
                }}
              >
                {isVerifying ? (
                  <ActivityIndicator size="small" color={COLORS.white} />
                ) : (
                  <>
                    <Feather name="check-circle" size={18} color={COLORS.white} />
                    <Text style={{ color: COLORS.white, fontWeight: "700" }}>Verify</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            {/* Resend OTP */}
            <View className="flex-row justify-center mt-6">
              <TouchableOpacity
                onPress={handleResendOTP}
                disabled={!canResend || isResending || isVerifying}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 8,
                  opacity: canResend && !isResending && !isVerifying ? 1 : 0.5,
                }}
              >
                {isResending ? (
                  <ActivityIndicator size="small" color={COLORS.accent} />
                ) : (
                  <Feather name="refresh-cw" size={16} color={COLORS.accent} />
                )}
                <Text style={{ color: COLORS.accent, fontWeight: "600" }}>
                  {isResending
                    ? "Sending..."
                    : canResend
                    ? "Resend Code"
                    : "Wait to resend"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer Note */}
          <View
            style={{
              backgroundColor: COLORS.primary + "10",
              borderTopWidth: 1,
              borderTopColor: COLORS.tertiary + "30",
              borderBottomLeftRadius: 24,
              borderBottomRightRadius: 24,
              paddingVertical: 16,
              paddingHorizontal: 24,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 8 }}>
              <Feather name="info" size={14} color={COLORS.tertiary} />
              <Text style={{ color: COLORS.tertiary, fontSize: 12, flex: 1 }}>
                This verification ensures the security of your business email. The code expires in 10 minutes.
              </Text>
            </View>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
}