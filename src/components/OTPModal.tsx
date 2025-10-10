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
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, isMobile } from "../constants/theme";

interface OTPModalProps {
  visible: boolean;
  onClose: () => void;
  onVerify: () => void;
  email?: string;
}

export default function OTPModal({ visible, onClose, onVerify, email }: OTPModalProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    if (visible) {
      setTimer(60);
      setOtp(["", "", "", "", "", ""]);
      startAnimation();
      startTimer();
    }
  }, [visible]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (visible && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
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

  const startTimer = () => {
    setTimer(60);
  };

  const handleOtpChange = (value: string, index: number) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }

      if (newOtp.every((digit) => digit !== "") && index === 5) {
        handleVerify();
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOTP = async () => {
    if (timer > 0 || isResending) return;

    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      startTimer();
      Alert.alert("OTP Sent", "A new verification code has been sent to your email.");
    }, 1500);
  };

  const handleVerify = () => {
    const otpCode = otp.join("");
    if (otpCode.length === 6) {
      setTimeout(() => {
        onVerify();
        Alert.alert("Success", "Your email has been verified successfully!");
      }, 1000);
    }
  };

  const handleSkip = () => {
    Alert.alert(
      "Skip Verification",
      "You can verify your email later from your account settings. Continue to dashboard?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Continue", onPress: onClose },
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
                  SECURE VERIFICATION
                </Text>
              </View>
              <TouchableOpacity
                onPress={handleSkip}
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
                  Enter the 6-digit code sent to your email
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
              <Feather name="clock" size={16} color={COLORS.secondary} />
              <Text style={{ color: COLORS.secondary, fontSize: 14, marginLeft: 6 }}>
                Code expires in{" "}
                <Text
                  style={{
                    fontWeight: "600",
                    color: timer < 10 ? COLORS.primary : COLORS.textDark,
                  }}
                >
                  {formatTime(timer)}
                </Text>
              </Text>
            </View>

            {/* Action Buttons */}
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={handleSkip}
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
                }}
              >
                <Feather name="skip-forward" size={18} color={COLORS.secondary} />
                <Text style={{ color: COLORS.secondary, fontWeight: "600" }}>
                  Verify Later
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleVerify}
                disabled={otp.join("").length !== 6}
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
                  opacity: otp.join("").length === 6 ? 1 : 0.6,
                }}
              >
                <Feather name="check-circle" size={18} color={COLORS.white} />
                <Text style={{ color: COLORS.white, fontWeight: "700" }}>Verify</Text>
              </TouchableOpacity>
            </View>

            {/* Resend OTP */}
            <View className="flex-row justify-center mt-6">
              <TouchableOpacity
                onPress={handleResendOTP}
                disabled={timer > 0 || isResending}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 8,
                  opacity: timer > 0 || isResending ? 0.5 : 1,
                }}
              >
                <Feather
                  name={isResending ? "loader" : "refresh-cw"}
                  size={16}
                  color={COLORS.accent}
                />
                <Text style={{ color: COLORS.accent, fontWeight: "600" }}>
                  {isResending
                    ? "Sending..."
                    : timer > 0
                    ? `Resend in ${formatTime(timer)}`
                    : "Resend Code"}
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
                For security reasons, this code will expire in 10 minutes. You can
                verify your email later from account settings.
              </Text>
            </View>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
