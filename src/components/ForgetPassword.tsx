// src/components/ForgotPasswordScreen.tsx
import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { COLORS, WINDOW } from "../constants/theme";

// Custom Imports
import AuthHeader from "../components/auth/AuthHeader";

// --- Common Forgot Password Form Component (Memoized for performance) ---
const ForgotPasswordForm = memo(({
  isMobileView,
  currentStep,
  formData,
  handleInputChange,
  handleSendOTP,
  handleResetPassword,
  handleResendOTP,
  showPassword,
  setShowPassword,
  isLoading,
  isResending,
  timer,
  inputRefs,
  handleOtpChange,
  handleKeyPress,
}: {
  isMobileView: boolean;
  currentStep: number;
  formData: any;
  handleInputChange: (field: string, value: any) => void;
  handleSendOTP: () => Promise<void>;
  handleResetPassword: () => Promise<void>;
  handleResendOTP: () => Promise<void>;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  isLoading: boolean;
  isResending: boolean;
  timer: number;
  inputRefs: React.MutableRefObject<(TextInput | null)[]>;
  handleOtpChange: (value: string, index: number) => void;
  handleKeyPress: (e: any, index: number) => void;
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const renderStepIndicator = () => (
    <View className="flex-row items-center justify-between mb-6">
      {[1, 2].map((step) => (
        <View key={step} className="flex-row items-center flex-1">
          <View className={`w-8 h-8 rounded-full justify-center items-center border-2 ${
            currentStep >= step 
              ? "bg-accent border-accent" 
              : "bg-gray-100 border-gray-300"
          }`}>
            <Text className={`text-sm font-bold ${
              currentStep >= step ? "text-white" : "text-gray-500"
            }`}>
              {step}
            </Text>
          </View>
          {step < 2 && (
            <View className={`flex-1 h-0.5 mx-2 ${
              currentStep > step ? "bg-accent" : "bg-gray-300"
            }`} />
          )}
        </View>
      ))}
    </View>
  );

  const renderStepContent = () => {
    if (currentStep === 1) {
      return (
        <View className="space-y-5">
          <View className="mb-5">
            <Text className="text-textDark text-sm font-semibold mb-2">Work Email *</Text>
            <TextInput
              placeholder="name@company.com"
              placeholderTextColor={COLORS.tertiary + "80"}
              className="bg-gray-50 rounded-xl px-4 py-3.5 text-[15px] text-textDark border border-gray-300"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              editable={!isLoading}
            />
          </View>

          <TouchableOpacity
            className="rounded-xl overflow-hidden py-4"
            style={{
              backgroundColor: COLORS.accent,
              shadowColor: COLORS.accent,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 8,
              opacity: isLoading ? 0.7 : 1,
            }}
            onPress={handleSendOTP}
            disabled={isLoading}
          >
            <View className="flex-row items-center justify-center gap-3">
              {isLoading ? (
                <>
                  <ActivityIndicator size="small" color={COLORS.white} />
                  <Text className="text-white text-[15px] font-bold">Sending OTP...</Text>
                </>
              ) : (
                <>
                  <Feather name="send" size={20} color={COLORS.white} />
                  <Text className="text-white text-[15px] font-bold">Send Verification Code</Text>
                </>
              )}
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View className="space-y-5">
          <View className="mb-5">
            <Text className="text-textDark text-sm font-semibold mb-3">Verification Code *</Text>
            <View className="flex-row justify-between mb-4">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <View 
                  key={index}
                  className={`w-12 h-12 rounded-xl border-2 justify-center items-center ${
                    formData.otp[index] ? "border-accent bg-accent/5" : "border-gray-300 bg-gray-50"
                  }`}
                >
                  <TextInput
                    ref={(ref) => { inputRefs.current[index] = ref; }}
                    value={formData.otp[index]}
                    onChangeText={(value) => handleOtpChange(value, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    keyboardType="numeric"
                    maxLength={1}
                    className="text-textDark text-xl font-bold text-center w-full"
                    selectTextOnFocus
                    editable={!isLoading}
                  />
                </View>
              ))}
            </View>

            <View className="flex-row justify-between items-center mb-2">
              <View className="flex-row items-center">
                <Feather name="clock" size={16} color={COLORS.secondary} />
                <Text className="text-secondary text-sm ml-2">
                  Code expires in{" "}
                  <Text className={`font-semibold ${timer < 10 ? "text-red-500" : "text-textDark"}`}>
                    {formatTime(timer)}
                  </Text>
                </Text>
              </View>
              
              <TouchableOpacity 
                onPress={handleResendOTP}
                disabled={timer > 0 || isResending}
                style={{ opacity: (timer > 0 || isResending) ? 0.5 : 1 }}
              >
                <Text className="text-accent font-semibold text-sm">
                  {isResending ? "Sending..." : timer > 0 ? `Resend (${formatTime(timer)})` : "Resend Code"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="mb-5">
            <Text className="text-textDark text-sm font-semibold mb-2">New Password *</Text>
            <View className="relative">
              <TextInput
                placeholder="Enter new password"
                placeholderTextColor={COLORS.tertiary + "80"}
                className="bg-gray-50 rounded-xl px-4 py-3.5 text-[15px] text-textDark border border-gray-300 pr-12"
                value={formData.newPassword}
                onChangeText={(value) => handleInputChange('newPassword', value)}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                editable={!isLoading}
              />
              <TouchableOpacity
                className="absolute right-4 top-3.5 p-1"
                onPress={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                <Feather
                  name={showPassword ? "eye-off" : "eye"}
                  size={18}
                  color={COLORS.tertiary}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View className="mb-5">
            <Text className="text-textDark text-sm font-semibold mb-2">Confirm New Password *</Text>
            <TextInput
              placeholder="Re-enter new password"
              placeholderTextColor={COLORS.tertiary + "80"}
              className="bg-gray-50 rounded-xl px-4 py-3.5 text-[15px] text-textDark border border-gray-300"
              value={formData.confirmPassword}
              onChangeText={(value) => handleInputChange('confirmPassword', value)}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              editable={!isLoading}
            />
          </View>

          <TouchableOpacity
            className="rounded-xl overflow-hidden py-4"
            style={{
              backgroundColor: COLORS.accent,
              shadowColor: COLORS.accent,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 8,
              opacity: isLoading ? 0.7 : 1,
            }}
            onPress={handleResetPassword}
            disabled={isLoading}
          >
            <View className="flex-row items-center justify-center gap-3">
              {isLoading ? (
                <>
                  <ActivityIndicator size="small" color={COLORS.white} />
                  <Text className="text-white text-[15px] font-bold">Resetting Password...</Text>
                </>
              ) : (
                <>
                  <Feather name="lock" size={20} color={COLORS.white} />
                  <Text className="text-white text-[15px] font-bold">Reset Password</Text>
                </>
              )}
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <View
      className={`flex-1 rounded-3xl overflow-hidden bg-white ${isMobileView ? "p-6" : "p-8"}`}
      style={{
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.2,
        shadowRadius: 30,
        elevation: 15,
      }}
    >
      <View className="flex-1 justify-between">
        <View>
          <View className="mb-6">
            <View className="flex-row items-center gap-2 bg-accent/10 px-3.5 py-1.5 rounded-full border border-accent/20 mb-4 self-start">
              <Feather name="key" size={16} color={COLORS.accent} />
              <Text className="text-accent text-xs font-bold tracking-wider">
                {currentStep === 1 ? 'PASSWORD RECOVERY' : 'SECURE RESET'}
              </Text>
            </View>

            <Text className="text-textDark text-2xl font-extrabold tracking-tight mb-2">
              {currentStep === 1 ? 'Forgot Password?' : 'Create New Password'}
            </Text>

            <Text className="text-secondary text-base font-medium">
              {currentStep === 1 
                ? 'We\'ll help you reset your password and secure your account'
                : 'Enter the verification code and create a new password'
              }
            </Text>
          </View>

          {renderStepIndicator()}
          {renderStepContent()}
        </View>

        <View className="items-center pt-5 border-t border-gray-300 mt-6">
          <Text className="text-secondary text-sm text-center mb-3">
            Remember your password?
          </Text>
          <TouchableOpacity
            className="flex-row items-center gap-2 px-4 py-2 rounded-lg border border-gray-300"
            onPress={() => {/* Navigate to SignIn */}}
            disabled={isLoading}
          >
            <Feather name="log-in" size={16} color={COLORS.accent} />
            <Text className="text-accent font-semibold">Back to Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
});
ForgotPasswordForm.displayName = 'ForgotPasswordForm';

// --- Main ForgotPasswordScreen Component ---
export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    otp: ["", "", "", "", "", ""],
    newPassword: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(60);

  // Animation Refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const inputRefs = useRef<Array<TextInput | null>>([]);

  // Handlers (useCallback for stability, especially for memoized children)
  const handleBack = useCallback(() => navigation.navigate("Signin" as never), [navigation]);

  const handleInputChange = useCallback((field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleOtpChange = useCallback((value: string, index: number) => {
    if (value.length <= 1) {
      const newOtp = [...formData.otp];
      newOtp[index] = value;
      setFormData(prev => ({ ...prev, otp: newOtp }));

      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  }, [formData.otp]);

  const handleKeyPress = useCallback((e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !formData.otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }, [formData.otp]);

  // Timer effect for OTP resend
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (currentStep === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer, currentStep]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true, }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true, }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleSendOTP = useCallback(async () => {
    if (!formData.email) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(2);
      setTimer(60);
      Alert.alert("OTP Sent", "We've sent a 6-digit verification code to your email.");
    }, 1500);
  }, [formData.email]);

  const handleResendOTP = useCallback(async () => {
    if (timer > 0 || isResending) return;
    
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      setTimer(60);
      Alert.alert("OTP Resent", "A new verification code has been sent to your email.");
    }, 1500);
  }, [timer, isResending]);

  const handleResetPassword = useCallback(async () => {
    if (formData.otp.join("").length !== 6) {
      Alert.alert("Error", "Please enter the complete 6-digit OTP");
      return;
    }

    if (!formData.newPassword) {
      Alert.alert("Error", "Please enter your new password");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (formData.newPassword.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        "Success", 
        "Your password has been reset successfully!",
        [
          {
            text: "Sign In",
            onPress: () => navigation.navigate("Signin" as never)
          }
        ]
      );
    }, 2000);
  }, [formData, navigation]);

  // --- Props for ForgotPasswordForm ---
  const forgotPasswordFormProps = {
    isMobileView: !isDesktop,
    currentStep,
    formData,
    handleInputChange,
    handleSendOTP,
    handleResetPassword,
    handleResendOTP,
    showPassword,
    setShowPassword,
    isLoading,
    isResending,
    timer,
    inputRefs,
    handleOtpChange,
    handleKeyPress,
  };

  if (Platform.OS === "web") {
    return (
      <View className="flex flex-col h-screen bg-primary overflow-hidden">
        {/* Background Decorative Shapes */}
        <View className="absolute top-0 left-0 right-0 bottom-0">
          <View className="absolute w-[300px] h-[300px] rounded-full bg-accent opacity-10 top-[-150px] right-[-100px]" />
          <View className="absolute w-[200px] h-[200px] rounded-full bg-neutral opacity-10 bottom-[-100px] left-[-50px]" />
          <View className="absolute w-[100px] h-[100px] rounded-[25px] bg-secondary/30 border border-secondary/50 top-1/5 right-1/10 transform rotate-45" />
          <View className="absolute w-[80px] h-[80px] rounded-[20px] bg-secondary/30 border border-secondary/50 bottom-[15%] left-[5%] transform -rotate-30" />
        </View>

        <View className="flex-1 overflow-y-auto overflow-x-hidden web-scroll">
          <AuthHeader onBack={handleBack} />

          <Animated.View
            className="flex-1"
            style={{
              minHeight: WINDOW.height - 100,
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            <View className={`flex-1 ${!isDesktop ? "flex-col px-5 pb-10" : "flex-row px-10 pb-5"} items-stretch w-full`}>
              {/* Desktop Left Panel (Marketing/Info) */}
              {isDesktop && (
                <View
                  className="flex-1 mr-5 rounded-3xl overflow-hidden"
                  style={{
                    backgroundColor: COLORS.secondary,
                    shadowColor: COLORS.black,
                    shadowOffset: { width: 0, height: 20 },
                    shadowOpacity: 0.3,
                    shadowRadius: 40,
                    elevation: 20,
                    borderWidth: 1.5,
                    borderColor: "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <View className="flex-1 p-8 justify-center">
                    <View className="flex-row items-center gap-2 bg-accent/12 px-4 py-2 rounded-full border border-accent/25 mb-8 self-start">
                      <Feather name="shield" size={20} color={COLORS.accent} />
                      <Text className="text-accent text-xs font-bold tracking-wider">SECURE RECOVERY</Text>
                    </View>

                    <Text className="text-textLight text-4xl font-extrabold leading-[44px] tracking-tight mb-8">
                      Secure Account{"\n"}
                      <Text style={{ color: COLORS.accent }}>Recovery</Text>{"\n"}
                      Process
                    </Text>

                    <View className="mb-10">
                      <View className="flex-row items-center gap-3 mb-4">
                        <Feather name="mail" size={18} color={COLORS.accent} />
                        <Text className="text-textLight text-base font-semibold">Email Verification</Text>
                      </View>
                      <View className="flex-row items-center gap-3 mb-4">
                        <Feather name="lock" size={18} color={COLORS.accent} />
                        <Text className="text-textLight text-base font-semibold">Secure OTP Process</Text>
                      </View>
                      <View className="flex-row items-center gap-3 mb-4">
                        <Feather name="refresh-cw" size={18} color={COLORS.accent} />
                        <Text className="text-textLight text-base font-semibold">Instant Password Reset</Text>
                      </View>
                      <View className="flex-row items-center gap-3 mb-4">
                        <Feather name="check-circle" size={18} color={COLORS.accent} />
                        <Text className="text-textLight text-base font-semibold">Bank-Level Security</Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}

              {/* Forgot Password Form */}
              <ForgotPasswordForm {...forgotPasswordFormProps} />
            </View>
          </Animated.View>
        </View>
      </View>
    );
  }

  // ✅ --- Mobile Version (Default) ---
  return (
    <View className="flex-1" style={{ backgroundColor: COLORS.primary }}>
      {/* Background Decorative Shapes (for mobile) */}
      <View className="absolute top-0 left-0 right-0 bottom-0">
        <View className="absolute w-[300px] h-[300px] rounded-full bg-accent opacity-10 top-[-150px] right-[-100px]" />
        <View className="absolute w-[200px] h-[200px] rounded-full bg-neutral opacity-10 bottom-[-100px] left-[-50px]" />
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <AuthHeader onBack={handleBack} />

          <Animated.View
            className="flex-1"
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            <View className="px-5 pt-0 pb-10">
              {/* Forgot Password Form */}
              <ForgotPasswordForm {...forgotPasswordFormProps} />
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}