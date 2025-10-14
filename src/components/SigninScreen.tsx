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

export default function SigninScreen() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isMobile = width < 900;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

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

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSignIn = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert("Success", "Welcome back to ShareFlow!");
      navigation.navigate("Dashboard" as never);
    }, 2000);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgetPassword" as never);
  };

  const handleSignUp = () => {
    navigation.navigate("Auth" as never);
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
                  <Text className="text-accent text-[15px] font-semibold">Back to Home</Text>
                </View>
              </TouchableOpacity>

              <View className="flex-row items-center gap-3 justify-center">
                <View className="w-13 h-13 rounded-[16px] justify-center items-center border" style={{
                  backgroundColor: "rgba(134, 194, 50, 0.15)",
                  borderColor: "rgba(134, 194, 50, 0.3)",
                }}>
                  <Feather name="trending-up" size={28} color={COLORS.accent} />
                </View>
                <Text className="text-textLight text-3xl font-extrabold tracking-tight">
                  Share<Text style={{ color: COLORS.accent }}>Flow</Text>
                </Text>
              </View>
            </View>

            {/* Responsive main content */}
            <View className={`flex-1 ${isMobile ? "flex-col px-5 pb-10" : "flex-row px-10 pb-5"} items-stretch w-full`}>
              {/* Left Panel - Branding */}
              <View 
                className={`flex-1 ${isMobile ? "mb-5" : "mr-5"} rounded-3xl overflow-hidden`}
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
                    <Feather name="award" size={20} color={COLORS.accent} />
                    <Text className="text-accent text-xs font-bold tracking-wider">ENTERPRISE SECURE</Text>
                  </View>
                  
                  <Text className="text-textLight text-4xl font-extrabold leading-[44px] tracking-tight mb-8">
                    Welcome Back to{"\n"}
                    <Text style={{ color: COLORS.accent }}>Financial Intelligence</Text>{"\n"}
                    Reimagined
                  </Text>
                  
                  <View className="mb-10">
                    <View className="flex-row items-center gap-3 mb-4">
                      <Feather name="shield" size={18} color={COLORS.accent} />
                      <Text className="text-textLight text-base font-semibold">Bank-Grade Security</Text>
                    </View>
                    <View className="flex-row items-center gap-3 mb-4">
                      <Feather name="zap" size={18} color={COLORS.accent} />
                      <Text className="text-textLight text-base font-semibold">Instant Dashboard Access</Text>
                    </View>
                    <View className="flex-row items-center gap-3 mb-4">
                      <Feather name="bar-chart" size={18} color={COLORS.accent} />
                      <Text className="text-textLight text-base font-semibold">Real-time Analytics</Text>
                    </View>
                    <View className="flex-row items-center gap-3 mb-4">
                      <Feather name="users" size={18} color={COLORS.accent} />
                      <Text className="text-textLight text-base font-semibold">Multi-user Collaboration</Text>
                    </View>
                  </View>

                  <View className="flex-row justify-around">
                    <View className="items-center">
                      <Text className="text-accent text-2xl font-extrabold mb-1">500+</Text>
                      <Text className="text-textLight text-sm font-semibold uppercase tracking-wider">Companies</Text>
                    </View>
                    <View className="items-center">
                      <Text className="text-accent text-2xl font-extrabold mb-1">99.9%</Text>
                      <Text className="text-textLight text-sm font-semibold uppercase tracking-wider">Uptime</Text>
                    </View>
                    <View className="items-center">
                      <Text className="text-accent text-2xl font-extrabold mb-1">24/7</Text>
                      <Text className="text-textLight text-sm font-semibold uppercase tracking-wider">Support</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Right Panel - Sign In Form */}
              <View 
                className="flex-1 rounded-3xl overflow-hidden bg-white"
                style={{
                  shadowColor: COLORS.black,
                  shadowOffset: { width: 0, height: 20 },
                  shadowOpacity: 0.2,
                  shadowRadius: 30,
                  elevation: 15,
                }}
              >
                <View className="flex-1 p-8 justify-between">
                  <View>
                    <View className="mb-6">
                      <View className="flex-row items-center gap-2 bg-accent/10 px-3.5 py-1.5 rounded-full border border-accent/20 mb-4 self-start">
                        <Feather name="log-in" size={16} color={COLORS.accent} />
                        <Text className="text-accent text-xs font-bold tracking-wider">SECURE SIGN IN</Text>
                      </View>
                      
                      <Text className="text-textDark text-2xl font-extrabold tracking-tight mb-2">
                        Welcome Back
                      </Text>
                      
                      <Text className="text-secondary text-base font-medium">
                        Sign in to your ShareFlow Enterprise account
                      </Text>
                    </View>

                    {/* Sign In Form */}
                    <View className="space-y-5">
                      {/* Email Input */}
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

                      {/* Password Input */}
                      <View>
                        <Text className="text-textDark text-sm font-semibold mb-2">Password *</Text>
                        <View className="relative">
                          <TextInput
                            placeholder="Enter your password"
                            placeholderTextColor={COLORS.tertiary + "80"}
                            className="bg-gray-50 rounded-xl px-4 py-3.5 text-[15px] text-textDark border border-gray-300 pr-12"
                            value={formData.password}
                            onChangeText={(value) => handleInputChange('password', value)}
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                            autoComplete="password"
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
                      </View>

                      {/* Remember Me & Forgot Password */}
                      <View className="flex-row justify-between items-center">
                        <TouchableOpacity 
                          className="flex-row items-center gap-3"
                          onPress={() => handleInputChange('rememberMe', !formData.rememberMe)}
                        >
                          <View className={`w-5 h-5 rounded border justify-center items-center ${
                            formData.rememberMe 
                              ? "bg-accent border-accent" 
                              : "bg-gray-50 border-gray-300"
                          }`}>
                            {formData.rememberMe && (
                              <Feather name="check" size={14} color={COLORS.white} />
                            )}
                          </View>
                          <Text className="text-secondary text-sm font-medium">Remember me</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleForgotPassword}>
                          <Text className="text-accent text-sm font-semibold">Forgot password?</Text>
                        </TouchableOpacity>
                      </View>

                      {/* Sign In Button */}
                      <TouchableOpacity 
                        className="rounded-xl overflow-hidden py-4 mt-2"
                        style={{
                          backgroundColor: COLORS.accent,
                          shadowColor: COLORS.accent,
                          shadowOffset: { width: 0, height: 8 },
                          shadowOpacity: 0.3,
                          shadowRadius: 16,
                          elevation: 8,
                        }}
                        onPress={handleSignIn}
                        disabled={isLoading}
                      >
                        <View className="flex-row items-center justify-center gap-3">
                          {isLoading ? (
                            <>
                              <Feather name="loader" size={20} color={COLORS.white} />
                              <Text className="text-white text-[15px] font-bold">Signing In...</Text>
                            </>
                          ) : (
                            <>
                              <Feather name="lock" size={20} color={COLORS.white} />
                              <Text className="text-white text-[15px] font-bold">Sign In to Dashboard</Text>
                            </>
                          )}
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Footer Note */}
                  <View className="items-center pt-5 border-t border-gray-300">
                    <Text className="text-secondary text-sm text-center mb-3">
                      Don't have an enterprise account?
                    </Text>
                    <TouchableOpacity 
                      className="flex-row items-center gap-2 px-4 py-2 rounded-lg border border-gray-300"
                      onPress={handleSignUp}
                    >
                      <Feather name="user-plus" size={16} color={COLORS.accent} />
                      <Text className="text-accent font-semibold">Create Company Account</Text>
                    </TouchableOpacity>
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
                  <Text className="text-accent text-[15px] font-semibold">Back to Home</Text>
                </View>
              </TouchableOpacity>

              <View className="flex-row items-center gap-3 justify-center">
                <View className="w-13 h-13 rounded-[16px] justify-center items-center border" style={{
                  backgroundColor: "rgba(134, 194, 50, 0.15)",
                  borderColor: "rgba(134, 194, 50, 0.3)",
                }}>
                  <Feather name="trending-up" size={28} color={COLORS.accent} />
                </View>
                <Text className="text-textLight text-3xl font-extrabold tracking-tight">
                  Share<Text style={{ color: COLORS.accent }}>Flow</Text>
                </Text>
              </View>
            </View>

            {/* Main Auth Container */}
            <View className="flex-col px-5 pb-5">
              {/* Left Panel - Branding */}
              <View 
                className="mb-5 rounded-3xl overflow-hidden"
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
                    <Feather name="award" size={20} color={COLORS.accent} />
                    <Text className="text-accent text-xs font-bold tracking-wider">ENTERPRISE SECURE</Text>
                  </View>
                  
                  <Text className="text-textLight text-4xl font-extrabold leading-[44px] tracking-tight mb-8">
                    Welcome Back to{"\n"}
                    <Text style={{ color: COLORS.accent }}>Financial Intelligence</Text>{"\n"}
                    Reimagined
                  </Text>
                  
                  <View className="mb-10">
                    <View className="flex-row items-center gap-3 mb-4">
                      <Feather name="shield" size={18} color={COLORS.accent} />
                      <Text className="text-textLight text-base font-semibold">Bank-Grade Security</Text>
                    </View>
                    <View className="flex-row items-center gap-3 mb-4">
                      <Feather name="zap" size={18} color={COLORS.accent} />
                      <Text className="text-textLight text-base font-semibold">Instant Dashboard Access</Text>
                    </View>
                    <View className="flex-row items-center gap-3 mb-4">
                      <Feather name="bar-chart" size={18} color={COLORS.accent} />
                      <Text className="text-textLight text-base font-semibold">Real-time Analytics</Text>
                    </View>
                    <View className="flex-row items-center gap-3 mb-4">
                      <Feather name="users" size={18} color={COLORS.accent} />
                      <Text className="text-textLight text-base font-semibold">Multi-user Collaboration</Text>
                    </View>
                  </View>

                  <View className="flex-row justify-around">
                    <View className="items-center">
                      <Text className="text-accent text-2xl font-extrabold mb-1">500+</Text>
                      <Text className="text-textLight text-sm font-semibold uppercase tracking-wider">Companies</Text>
                    </View>
                    <View className="items-center">
                      <Text className="text-accent text-2xl font-extrabold mb-1">99.9%</Text>
                      <Text className="text-textLight text-sm font-semibold uppercase tracking-wider">Uptime</Text>
                    </View>
                    <View className="items-center">
                      <Text className="text-accent text-2xl font-extrabold mb-1">24/7</Text>
                      <Text className="text-textLight text-sm font-semibold uppercase tracking-wider">Support</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Right Panel - Sign In Form */}
              <View 
                className="rounded-3xl overflow-hidden bg-white"
                style={{
                  shadowColor: COLORS.black,
                  shadowOffset: { width: 0, height: 20 },
                  shadowOpacity: 0.2,
                  shadowRadius: 30,
                  elevation: 15,
                }}
              >
                <View className="flex-1 p-6 justify-between">
                  <View>
                    <View className="mb-6">
                      <View className="flex-row items-center gap-2 bg-accent/10 px-3.5 py-1.5 rounded-full border border-accent/20 mb-4 self-start">
                        <Feather name="log-in" size={16} color={COLORS.accent} />
                        <Text className="text-accent text-xs font-bold tracking-wider">SECURE SIGN IN</Text>
                      </View>
                      
                      <Text className="text-textDark text-2xl font-extrabold tracking-tight mb-2">
                        Welcome Back
                      </Text>
                      
                      <Text className="text-secondary text-base font-medium">
                        Sign in to your ShareFlow Enterprise account
                      </Text>
                    </View>

                    {/* Sign In Form */}
                    <View className="space-y-5">
                      {/* Email Input */}
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

                      {/* Password Input */}
                      <View>
                        <Text className="text-textDark text-sm font-semibold mb-2">Password *</Text>
                        <View className="relative">
                          <TextInput
                            placeholder="Enter your password"
                            placeholderTextColor={COLORS.tertiary + "80"}
                            className="bg-gray-50 rounded-xl px-4 py-3.5 text-[15px] text-textDark border border-gray-300 pr-12"
                            value={formData.password}
                            onChangeText={(value) => handleInputChange('password', value)}
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                            autoComplete="password"
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
                      </View>

                      {/* Remember Me & Forgot Password */}
                      <View className="flex-row justify-between items-center">
                        <TouchableOpacity 
                          className="flex-row items-center gap-3"
                          onPress={() => handleInputChange('rememberMe', !formData.rememberMe)}
                        >
                          <View className={`w-5 h-5 rounded border justify-center items-center ${
                            formData.rememberMe 
                              ? "bg-accent border-accent" 
                              : "bg-gray-50 border-gray-300"
                          }`}>
                            {formData.rememberMe && (
                              <Feather name="check" size={14} color={COLORS.white} />
                            )}
                          </View>
                          <Text className="text-secondary text-sm font-medium">Remember me</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleForgotPassword}>
                          <Text className="text-accent text-sm font-semibold">Forgot password?</Text>
                        </TouchableOpacity>
                      </View>

                      {/* Sign In Button */}
                      <TouchableOpacity 
                        className="rounded-xl overflow-hidden py-4 mt-2"
                        style={{
                          backgroundColor: COLORS.accent,
                          shadowColor: COLORS.accent,
                          shadowOffset: { width: 0, height: 8 },
                          shadowOpacity: 0.3,
                          shadowRadius: 16,
                          elevation: 8,
                        }}
                        onPress={handleSignIn}
                        disabled={isLoading}
                      >
                        <View className="flex-row items-center justify-center gap-3">
                          {isLoading ? (
                            <>
                              <Feather name="loader" size={20} color={COLORS.white} />
                              <Text className="text-white text-[15px] font-bold">Signing In...</Text>
                            </>
                          ) : (
                            <>
                              <Feather name="lock" size={20} color={COLORS.white} />
                              <Text className="text-white text-[15px] font-bold">Sign In to Dashboard</Text>
                            </>
                          )}
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Footer Note */}
                  <View className="items-center pt-5 border-t border-gray-300 mt-6">
                    <Text className="text-secondary text-sm text-center mb-3">
                      Don't have an enterprise account?
                    </Text>
                    <TouchableOpacity 
                      className="flex-row items-center gap-2 px-4 py-2 rounded-lg border border-gray-300"
                      onPress={handleSignUp}
                    >
                      <Feather name="user-plus" size={16} color={COLORS.accent} />
                      <Text className="text-accent font-semibold">Create Company Account</Text>
                    </TouchableOpacity>
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