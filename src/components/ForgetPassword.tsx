// src/components/ForgotPasswordScreen.tsx
import React, { useState, useRef, useEffect } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Animated,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  useWindowDimensions
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS, WINDOW } from "../constants/theme";

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isMobile = width < 900;

  const [currentStep, setCurrentStep] = useState(1); // 1: Email, 2: OTP & Password
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

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

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

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleOtpChange = (value: string, index: number) => {
    if (value.length <= 1) {
      const newOtp = [...formData.otp];
      newOtp[index] = value;
      setFormData(prev => ({ ...prev, otp: newOtp }));

      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }

      // Auto-submit when all OTP fields are filled
      if (newOtp.every(digit => digit !== "") && index === 5) {
        // You can auto-submit here or wait for manual submission
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !formData.otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSendOTP = async () => {
    if (!formData.email) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    setIsLoading(true);
    // Simulate API call to send OTP
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(2);
      setTimer(60);
      Alert.alert("OTP Sent", "We've sent a 6-digit verification code to your email.");
    }, 1500);
  };

  const handleResendOTP = async () => {
    if (timer > 0 || isResending) return;
    
    setIsResending(true);
    // Simulate API call to resend OTP
    setTimeout(() => {
      setIsResending(false);
      setTimer(60);
      Alert.alert("OTP Resent", "A new verification code has been sent to your email.");
    }, 1500);
  };

  const handleResetPassword = async () => {
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
    // Simulate API call to reset password
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        "Success", 
        "Your password has been reset successfully!",
        [
          {
            text: "Sign In",
            onPress: () => (navigation as any).navigate("SignIn")
          }
        ]
      );
    }, 2000);
  };

  const handleBack = () => {
    if (currentStep === 1) {
      navigation.goBack();
    } else {
      setCurrentStep(1);
    }
  };

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
        <View className="space-y-6">
          <View>
            <Text className="text-textDark text-[22px] font-bold mb-2">Reset Your Password</Text>
            <Text className="text-secondary text-[15px]">
              Enter your work email address and we'll send you a verification code to reset your password.
            </Text>
          </View>

          <View>
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
            />
          </View>

          <TouchableOpacity 
            className="rounded-xl overflow-hidden py-4 mt-4"
            style={{
              backgroundColor: COLORS.accent,
              shadowColor: COLORS.accent,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 8,
            }}
            onPress={handleSendOTP}
            disabled={isLoading}
          >
            <View className="flex-row items-center justify-center gap-3">
              {isLoading ? (
                <>
                  <Feather name="loader" size={20} color={COLORS.white} />
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
        <View className="space-y-6">
          <View>
            <Text className="text-textDark text-[22px] font-bold mb-2">Verify and Reset</Text>
            <Text className="text-secondary text-[15px] mb-2">
              Enter the 6-digit code sent to:
            </Text>
            <Text className="text-accent text-[15px] font-semibold">
              {formData.email}
            </Text>
          </View>

          {/* OTP Input */}
          <View>
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
                  />
                </View>
              ))}
            </View>

            {/* Timer and Resend */}
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

          {/* New Password */}
          <View>
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
              />
              <TouchableOpacity 
                className="absolute right-4 top-3.5 p-1"
                onPress={() => setShowPassword(!showPassword)}
              >
                <Feather 
                  name={showPassword ? "eye-off" : "eye"} 
                  size={18} 
                  color={COLORS.tertiary} 
                />
              </TouchableOpacity>
            </View>
            <Text className="text-secondary text-xs mt-1.5 italic">
              Must be at least 8 characters with uppercase, lowercase, and numbers
            </Text>
          </View>

          {/* Confirm Password */}
          <View>
            <Text className="text-textDark text-sm font-semibold mb-2">Confirm New Password *</Text>
            <TextInput
              placeholder="Re-enter new password"
              placeholderTextColor={COLORS.tertiary + "80"}
              className="bg-gray-50 rounded-xl px-4 py-3.5 text-[15px] text-textDark border border-gray-300"
              value={formData.confirmPassword}
              onChangeText={(value) => handleInputChange('confirmPassword', value)}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity 
            className="rounded-xl overflow-hidden py-4 mt-4"
            style={{
              backgroundColor: COLORS.accent,
              shadowColor: COLORS.accent,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 8,
            }}
            onPress={handleResetPassword}
            disabled={isLoading}
          >
            <View className="flex-row items-center justify-center gap-3">
              {isLoading ? (
                <>
                  <Feather name="loader" size={20} color={COLORS.white} />
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

  // ✅ WEB VERSION (scroll + responsive)
  if (Platform.OS === "web") {
    return (
      <View className="flex flex-col h-screen bg-primary overflow-hidden">
        {/* Background Elements */}
        <View className="absolute top-0 left-0 right-0 bottom-0">
          <View className="absolute w-[300px] h-[300px] rounded-full bg-accent opacity-10 top-[-150px] right-[-100px]" />
          <View className="absolute w-[200px] h-[200px] rounded-full bg-neutral opacity-10 bottom-[-100px] left-[-50px]" />
          <View className="absolute w-[100px] h-[100px] rounded-[25px] bg-secondary/30 border border-secondary/50 top-1/5 right-1/10 transform rotate-45" />
          <View className="absolute w-[80px] h-[80px] rounded-[20px] bg-secondary/30 border border-secondary/50 bottom-[15%] left-[5%] transform -rotate-30" />
        </View>

        {/* Scrollable content */}
        <View className="flex-1 overflow-y-auto overflow-x-hidden web-scroll">
          <Animated.View
            className="flex-1"
            style={{
              minHeight: WINDOW.height,
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            {/* Header Section */}
            <View className={`${isMobile ? "px-5" : "px-10"} pt-5 mb-5`}>
              <TouchableOpacity onPress={handleBack} className="self-start mb-5 rounded-xl overflow-hidden">
                <View className="flex-row items-center gap-2 px-4 py-3 rounded-xl border" style={{ 
                  borderColor: "rgba(134, 194, 50, 0.3)",
                  backgroundColor: "rgba(134, 194, 50, 0.1)" 
                }}>
                  <Feather name="arrow-left" size={20} color={COLORS.accent} />
                  <Text className="text-accent text-[15px] font-semibold">
                    {currentStep === 1 ? 'Back to Sign In' : 'Back to Email'}
                  </Text>
                </View>
              </TouchableOpacity>

              <View className="flex-row items-center gap-3 justify-center">
                <View className="w-13 h-13 rounded-[16px] justify-center items-center border" style={{
                  backgroundColor: "rgba(134, 194, 50, 0.15)",
                  borderColor: "rgba(134, 194, 50, 0.3)",
                }}>
                  <Feather name="shield" size={28} color={COLORS.accent} />
                </View>
                <Text className="text-textLight text-3xl font-extrabold tracking-tight">
                  Share<Text style={{ color: COLORS.accent }}>Flow</Text>
                </Text>
              </View>
            </View>

            {/* Responsive main content */}
            <View className={`flex-1 ${isMobile ? "flex-col px-5 pb-10" : "flex-row px-10 pb-5"} items-center justify-center w-full`}>
              <View 
                className="rounded-3xl overflow-hidden bg-white"
                style={{
                  width: isMobile ? '100%' : 480,
                  shadowColor: COLORS.black,
                  shadowOffset: { width: 0, height: 20 },
                  shadowOpacity: 0.2,
                  shadowRadius: 30,
                  elevation: 15,
                }}
              >
                <View className="p-8">
                  {/* Header */}
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
                    
                    <Text className="text-secondary text-base font-medium mb-4">
                      {currentStep === 1 
                        ? 'We\'ll help you reset your password and secure your account'
                        : 'Enter the verification code and create a new password'
                      }
                    </Text>

                    {/* Step Indicator */}
                    {renderStepIndicator()}
                  </View>

                  {/* Step Content */}
                  {renderStepContent()}

                  {/* Security Note */}
                  <View className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <View className="flex-row items-start gap-2">
                      <Feather name="info" size={16} color={COLORS.accent} />
                      <View className="flex-1">
                        <Text className="text-textDark text-sm font-semibold mb-1">
                          Security Notice
                        </Text>
                        <Text className="text-secondary text-xs">
                          For your security, the verification code will expire in 10 minutes. 
                          Make sure to create a strong, unique password that you haven't used before.
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Animated.View>
        </View>
      </View>
    );
  }

  // ✅ MOBILE APP VERSION
  return (
    <View className="flex-1" style={{ backgroundColor: COLORS.primary }}>
      {/* Background Elements */}
      <View className="absolute top-0 left-0 right-0 bottom-0">
        <View className="absolute w-[300px] h-[300px] rounded-full bg-accent opacity-10 top-[-150px] right-[-100px]" />
        <View className="absolute w-[200px] h-[200px] rounded-full bg-neutral opacity-10 bottom-[-100px] left-[-50px]" />
        <View className="absolute w-[100px] h-[100px] rounded-[25px] bg-secondary/30 border border-secondary/50 top-1/5 right-1/10 transform rotate-45" />
        <View className="absolute w-[80px] h-[80px] rounded-[20px] bg-secondary/30 border border-secondary/50 bottom-[15%] left-[5%] transform -rotate-30" />
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            className="flex-1"
            style={{
              minHeight: WINDOW.height,
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            {/* Header Section */}
            <View className="px-5 pt-5 mb-5">
              <TouchableOpacity onPress={handleBack} className="self-start mb-5 rounded-xl overflow-hidden">
                <View className="flex-row items-center gap-2 px-4 py-3 rounded-xl border" style={{ 
                  borderColor: "rgba(134, 194, 50, 0.3)",
                  backgroundColor: "rgba(134, 194, 50, 0.1)" 
                }}>
                  <Feather name="arrow-left" size={20} color={COLORS.accent} />
                  <Text className="text-accent text-[15px] font-semibold">
                    {currentStep === 1 ? 'Back to Sign In' : 'Back to Email'}
                  </Text>
                </View>
              </TouchableOpacity>

              <View className="flex-row items-center gap-3 justify-center">
                <View className="w-13 h-13 rounded-[16px] justify-center items-center border" style={{
                  backgroundColor: "rgba(134, 194, 50, 0.15)",
                  borderColor: "rgba(134, 194, 50, 0.3)",
                }}>
                  <Feather name="shield" size={28} color={COLORS.accent} />
                </View>
                <Text className="text-textLight text-3xl font-extrabold tracking-tight">
                  Share<Text style={{ color: COLORS.accent }}>Flow</Text>
                </Text>
              </View>
            </View>

            {/* Main Content */}
            <View className="px-5 pb-5">
              <View 
                className="rounded-3xl overflow-hidden bg-white mx-auto"
                style={{
                  width: '100%',
                  shadowColor: COLORS.black,
                  shadowOffset: { width: 0, height: 20 },
                  shadowOpacity: 0.2,
                  shadowRadius: 30,
                  elevation: 15,
                }}
              >
                <View className="p-6">
                  {/* Header */}
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
                    
                    <Text className="text-secondary text-base font-medium mb-4">
                      {currentStep === 1 
                        ? 'We\'ll help you reset your password and secure your account'
                        : 'Enter the verification code and create a new password'
                      }
                    </Text>

                    {/* Step Indicator */}
                    {renderStepIndicator()}
                  </View>

                  {/* Step Content */}
                  {renderStepContent()}

                  {/* Security Note */}
                  <View className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <View className="flex-row items-start gap-2">
                      <Feather name="info" size={16} color={COLORS.accent} />
                      <View className="flex-1">
                        <Text className="text-textDark text-sm font-semibold mb-1">
                          Security Notice
                        </Text>
                        <Text className="text-secondary text-xs">
                          For your security, the verification code will expire in 10 minutes. 
                          Make sure to create a strong, unique password that you haven't used before.
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}