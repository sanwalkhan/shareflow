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

// --- Component Props ---
interface OTPModalProps {
    visible: boolean;
    onClose: () => void;
    onVerify: (otp: string) => Promise<void>;
    onResend: () => Promise<{ success: boolean; message?: string }>;
    email?: string;
}

// --- Component ---
export default function OTPModal({ 
    visible, 
    onClose, 
    onVerify, 
    onResend,
    email 
}: OTPModalProps) {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(600);
    const [isResending, setIsResending] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [canResend, setCanResend] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(0);

    const inputRefs = useRef<Array<TextInput | null>>([]);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    // --- Effects and Animation ---
    
    useEffect(() => {
        if (visible) {
            setTimer(600);
            setOtp(["", "", "", "", "", ""]);
            setCanResend(false);
            setErrorMessage(null);
            setFocusedIndex(0);
            startAnimation();
            const timeoutId = setTimeout(() => inputRefs.current[0]?.focus(), 500);
            return () => clearTimeout(timeoutId);
        }
    }, [visible]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (visible && timer > 0 && !isResending && !isVerifying) {
            interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        setCanResend(true);
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        if (timer === 0 && visible) {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [timer, visible, isResending, isVerifying]);

    const startAnimation = () => {
        fadeAnim.setValue(0);
        slideAnim.setValue(50);

        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
            Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
        ]).start();
    };

    // --- Handlers ---

    const handleOtpChange = (value: string, index: number) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            setErrorMessage(null);

            if (value && index < 5) {
                inputRefs.current[index + 1]?.focus();
                setFocusedIndex(index + 1);
            }

            if (newOtp.every((digit) => digit !== "") && index === 5) {
                handleVerify(newOtp.join(""));
            }
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
            setFocusedIndex(index - 1);
        } else if (e.nativeEvent.key === "Backspace" && otp[index]) {
            setFocusedIndex(index);
        }
    };

    const handleResendOTP = async () => {
        if (!canResend || isResending || isVerifying) return;

        setIsResending(true);
        setErrorMessage(null);
        setOtp(["", "", "", "", "", ""]);
        setFocusedIndex(0);
        inputRefs.current[0]?.focus();

        try {
            const result = await onResend();
            if (result.success) {
                setTimer(600);
                setCanResend(false);
                Alert.alert("Success", "A new verification code has been sent to your email.");
            } else {
                setErrorMessage(result.message || "Failed to resend code. Please try again.");
            }
        } catch (error: any) {
            setErrorMessage(error.message || "Failed to resend code. Please try again.");
        } finally {
            setIsResending(false);
        }
    };

    const handleVerify = async (otpCode?: string) => {
        const code = otpCode || otp.join("");
        setErrorMessage(null);
        
        if (code.length !== 6) {
            setErrorMessage("Please enter the complete 6-digit code.");
            return;
        }

        setIsVerifying(true);
        try {
            await onVerify(code);
        } catch (error: any) {
            const errorMsg = error.message || "Invalid verification code. Please try again.";
            setErrorMessage(errorMsg);
            setOtp(["", "", "", "", "", ""]);
            inputRefs.current[0]?.focus();
            setFocusedIndex(0);
        } finally {
            setIsVerifying(false);
        }
    };

    // Direct close function
    const handleClose = () => {
        if (!isVerifying && !isResending) {
            onClose();
        }
    };

    // Cancel button handler with confirmation
    const handleCancel = () => {
        if (isVerifying || isResending) return;
        
        Alert.alert(
            "Cancel Verification",
            "Are you sure you want to cancel? Your progress will be lost.",
            [
                { 
                    text: "Continue", 
                    style: "cancel" 
                },
                { 
                    text: "Cancel Verification", 
                    style: "destructive",
                    onPress: handleClose  // Call the direct close function
                },
            ]
        );
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    // --- Render Logic ---

    return (
        <Modal 
            visible={visible} 
            animationType="fade" 
            transparent 
            statusBarTranslucent 
            onRequestClose={handleCancel}  // Use handleCancel for back button
        >
            <View className="flex-1 justify-center items-center bg-black/50">
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ width: '100%' }}
                >
                    <View className="flex-1 justify-center items-center">
                        <TouchableOpacity 
                            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                            activeOpacity={1}
                            onPress={handleCancel}  // Backdrop tap uses cancel with confirmation
                        >
                            <View />
                        </TouchableOpacity>
                        
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
                                    {/* Cross Button - Direct close without confirmation */}
                                    <TouchableOpacity
                                        onPress={handleClose}
                                        disabled={isVerifying || isResending}
                                        style={{
                                            width: 32,
                                            height: 32,
                                            borderRadius: 16,
                                            backgroundColor: COLORS.tertiary + "10",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            opacity: (isVerifying || isResending) ? 0.5 : 1,
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
                                <View className="flex-row justify-between mb-2">
                                    {[0, 1, 2, 3, 4, 5].map((index) => {
                                        const isFocused = focusedIndex === index;
                                        const hasError = errorMessage !== null;

                                        return (
                                            <View
                                                key={index}
                                                style={{
                                                    width: 48,
                                                    height: 56,
                                                    borderRadius: 12,
                                                    borderWidth: 2,
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    borderColor: hasError ? COLORS.primary : isFocused ? COLORS.accent : (otp[index] ? COLORS.accent : COLORS.tertiary + "60"),
                                                    backgroundColor: hasError ? COLORS.primary + "10" : (isFocused ? COLORS.accent + "10" : (otp[index] ? COLORS.accent + "10" : COLORS.tertiary + "08")),
                                                }}
                                            >
                                                <TextInput
                                                    ref={(ref) => { inputRefs.current[index] = ref; }}
                                                    value={otp[index]}
                                                    onFocus={() => setFocusedIndex(index)}
                                                    onBlur={() => setFocusedIndex(null)}
                                                    onChangeText={(value) => handleOtpChange(value, index)}
                                                    onKeyPress={(e) => handleKeyPress(e, index)}
                                                    keyboardType="numeric"
                                                    maxLength={1}
                                                    editable={!isVerifying && !isResending}
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
                                        );
                                    })}
                                </View>
                                
                                {/* Inline Error Message */}
                                {errorMessage && (
                                    <View className="flex-row items-center justify-center mt-2 mb-4">
                                        <Feather name="alert-triangle" size={14} color={COLORS.primary} />
                                        <Text style={{ color: COLORS.primary, fontSize: 12, marginLeft: 6, fontWeight: "500", textAlign: "center" }}>
                                            {errorMessage}
                                        </Text>
                                    </View>
                                )}

                                {/* Timer */}
                                <View className="flex-row justify-center items-center mb-6 mt-4">
                                    <Feather name="clock" size={16} color={timer < 60 ? COLORS.primary : COLORS.secondary} />
                                    {timer > 0 ? (
                                        <Text style={{ color: timer < 60 ? COLORS.primary : COLORS.secondary, fontSize: 14, marginLeft: 6 }}>
                                            Code expires in
                                            <Text
                                                style={{
                                                    fontWeight: "700",
                                                    color: timer < 60 ? COLORS.primary : COLORS.textDark,
                                                }}
                                            >
                                                {` ${formatTime(timer)}`}
                                            </Text>
                                        </Text>
                                    ) : (
                                        <Text style={{ fontWeight: "700", color: COLORS.primary, marginLeft: 6 }}>
                                            Code expired. Please resend.
                                        </Text>
                                    )}
                                </View>

                                {/* Action Buttons */}
                                <View className="flex-row gap-3">
                                    {/* Verify Button */}
                                    <TouchableOpacity
                                        onPress={() => handleVerify()}
                                        disabled={otp.join("").length !== 6 || isVerifying || isResending}
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
                                            opacity: (otp.join("").length === 6 && !isVerifying && !isResending) ? 1 : 0.6,
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
                                            opacity: (canResend && !isResending && !isVerifying) ? 1 : 0.5,
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
                                                : `Resend in ${formatTime(timer)}`} 
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
                                    <Feather name="info" size={14} color={COLORS.tertiary} style={{ marginTop: 2 }} />
                                    <Text style={{ color: COLORS.secondary, fontSize: 12, flex: 1 }}>
                                        This verification ensures the **security** of your business email. Please check your inbox (and spam folder).
                                    </Text>
                                </View>
                            </View>
                        </Animated.View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
}