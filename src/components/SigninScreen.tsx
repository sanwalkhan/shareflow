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
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "toastify-react-native";

// Custom Imports
import AuthHeader from "../components/auth/AuthHeader";
import { COLORS, WINDOW } from "../constants/theme";
import { API_BASE } from "@env";
// 💡 NOTE: Assuming StatusProvider is correctly imported but doesn't expose isStatusVisible
import { useStatus } from "./feedback/StatusProvider"; 
import { useAuth } from "../contexts/AuthContext";

// Define RootStackParamList for better type safety in navigation
type RootStackParamList = {
  Landing: undefined;
  AdminDashboard: undefined;
  ShareholderDashboard: undefined;
  ForgetPassword: undefined;
  Auth: undefined; 
};
type ScreenNavigationProp = NavigationProp<RootStackParamList, 'Auth'>;

// --- Common Sign-in Form Component (Memoized for performance) ---
const SignInForm = memo(({
  isMobileView,
  formData,
  handleInputChange,
  handleSignIn,
  handleForgotPassword,
  handleSignUp,
  showPassword,
  setShowPassword,
  isSubmitting, // 💡 Renamed prop for clarity
}: {
  isMobileView: boolean;
  formData: any;
  handleInputChange: (field: string, value: any) => void;
  handleSignIn: () => Promise<void>;
  handleForgotPassword: () => void;
  handleSignUp: () => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  isSubmitting: boolean; // 💡 Using internal component state for this
}) => (
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
              editable={!isSubmitting} // 💡 Use isSubmitting
            />
          </View>

          <View className="mb-5">
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
                editable={!isSubmitting} // 💡 Use isSubmitting
                onSubmitEditing={handleSignIn}
              />
              <TouchableOpacity
                className="absolute right-4 top-3.5 p-1"
                onPress={() => setShowPassword(!showPassword)}
                disabled={isSubmitting} // 💡 Use isSubmitting
              >
                <Feather
                  name={showPassword ? "eye-off" : "eye"}
                  size={18}
                  color={COLORS.tertiary}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-row justify-between items-center mb-5">
            <TouchableOpacity
              className="flex-row items-center gap-3"
              onPress={() => handleInputChange('rememberMe', !formData.rememberMe)}
              disabled={isSubmitting} // 💡 Use isSubmitting
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

            <TouchableOpacity onPress={handleForgotPassword} disabled={isSubmitting}>
              <Text className="text-accent text-sm font-semibold">Forgot password?</Text>
            </TouchableOpacity>
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
              opacity: isSubmitting ? 0.7 : 1, // 💡 Use isSubmitting
            }}
            onPress={handleSignIn}
            disabled={isSubmitting} // 💡 Use isSubmitting
          >
            <View className="flex-row items-center justify-center gap-3">
              {isSubmitting ? ( // 💡 Use isSubmitting
                <>
                  <ActivityIndicator size="small" color={COLORS.white} />
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

      <View className="items-center pt-5 border-t border-gray-300 mt-6">
        <Text className="text-secondary text-sm text-center mb-3">
          Don't have an enterprise account?
        </Text>
        <TouchableOpacity
          className="flex-row items-center gap-2 px-4 py-2 rounded-lg border border-gray-300"
          onPress={handleSignUp}
          disabled={isSubmitting} // 💡 Use isSubmitting
        >
          <Feather name="user-plus" size={16} color={COLORS.accent} />
          <Text className="text-accent font-semibold">Create Company Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
));
SignInForm.displayName = 'SignInForm';

// --- Main SigninScreen Component ---
export default function SigninScreen() {
  const navigation = useNavigation<ScreenNavigationProp>();
  const { login } = useAuth();
  const { showLoader, hideLoader, showStatus } = useStatus();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  // 💡 FIX: Internal state to manage submission status, resolving the context error.
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  // Animation Refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // Handlers (useCallback for stability, especially for memoized children)
  const handleBack = useCallback(() => navigation.navigate("Landing"), [navigation]);
  const handleForgotPassword = useCallback(() => navigation.navigate("ForgetPassword"), [navigation]);
  const handleSignUp = useCallback(() => navigation.navigate("Auth"), [navigation]);

  const handleInputChange = useCallback((field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  // [checkAuthStatus and loadSavedCredentials remain the same]
  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const userData = await AsyncStorage.getItem("userData");

      if (token && userData) {
        try {
          const [, payload] = token.split(".");
          const decoded = JSON.parse(atob(payload));
          if (decoded?.exp && Date.now() >= decoded.exp * 1000) {
            await AsyncStorage.clear();
            return;
          }
        } catch (e) {
        }

        const parsedUser = JSON.parse(userData);
        const destination = parsedUser?.role === "admin"
          ? "AdminDashboard"
          : parsedUser?.role === "shareholder"
            ? "ShareholderDashboard"
            : "Landing";

        navigation.reset({ index: 0, routes: [{ name: destination as keyof RootStackParamList }] });
      }
    } catch (error) {
      console.error("Auth check error:", error);
    }
  };

  const loadSavedCredentials = async () => {
    try {
      const rememberMe = await AsyncStorage.getItem("rememberMe");
      const savedEmail = await AsyncStorage.getItem("savedEmail");
      if (rememberMe === "true" && savedEmail) {
        setFormData((prev) => ({ ...prev, email: savedEmail, rememberMe: true }));
      }
    } catch (error) {
      console.error("Error loading saved credentials:", error);
    }
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true, }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true, }),
    ]).start();

    checkAuthStatus();
    loadSavedCredentials();
  }, [fadeAnim, slideAnim]);

  const validateForm = useCallback(() => {
    if (!formData.email.trim()) { showStatus("error", "Email is required"); return false; }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(formData.email)) { showStatus("error", "Please enter a valid email address"); return false; }
    if (!formData.password.trim()) { showStatus("error", "Password is required"); return false; }
    if (formData.password.length < 6) { showStatus("error", "Password must be at least 6 characters"); return false; }
    return true;
  }, [formData.email, formData.password, showStatus]);

  // Use useCallback for handleSignIn as it is passed to the memoized child component
  const handleSignIn = useCallback(async () => {
    if (!validateForm()) return;

    setIsSubmitting(true); // 💡 Start submitting
    showLoader("Signing in...");

    const loginData = {
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    };

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(loginData),
        signal: controller.signal,
      });

      clearTimeout(timeout);
      const data = await response.json();

      if (response.ok && data.success) {
        const userData = data.user || data.admin;
        await login(data.token, userData);

        await AsyncStorage.setItem("authToken", data.token);
        await AsyncStorage.setItem("userData", JSON.stringify(userData));

        if (formData.rememberMe) {
          await AsyncStorage.setItem("rememberMe", "true");
          await AsyncStorage.setItem("savedEmail", formData.email);
        } else {
          await AsyncStorage.removeItem("rememberMe");
          await AsyncStorage.removeItem("savedEmail");
        }

        const userName =
          userData.fullName ||
          `${userData.firstName || ""} ${userData.lastName || ""}`.trim() ||
          "User";

        Toast.success(`Welcome back, ${userName}!`);

        hideLoader();

        const destination = userData.role === "admin"
          ? "AdminDashboard"
          : userData.role === "shareholder"
            ? "ShareholderDashboard"
            : "Landing";

        navigation.reset({ index: 0, routes: [{ name: destination as keyof RootStackParamList }] });

      } else {
        hideLoader();
        showStatus("error", data?.message || "Invalid email or password");
      }
    } catch (error: any) {
      hideLoader();
      showStatus(
        "error",
        error.name === "AbortError"
          ? "Request timed out. Please check your internet connection."
          : "Unable to connect to the server."
      );
    } finally {
      setIsSubmitting(false); // 💡 Stop submitting in all cases (success/error)
    }
  }, [formData, navigation, login, showLoader, hideLoader, showStatus, validateForm]);

  // --- Props for SignInForm ---
  const signInFormProps = {
    isMobileView: !isDesktop,
    formData,
    handleInputChange,
    handleSignIn,
    handleForgotPassword,
    handleSignUp,
    showPassword,
    setShowPassword,
    isSubmitting, // 💡 Pass the internal state
  };


  // ✅ --- Web/Desktop Version (Styling unchanged from previous version) ---
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
                      <Feather name="award" size={20} color={COLORS.accent} />
                      <Text className="text-accent text-xs font-bold tracking-wider">ENTERPRISE SECURE</Text>
                    </View>

                    <Text className="text-textLight text-4xl font-extrabold leading-[44px] tracking-tight mb-8">
                      Welcome Back to{"\n"}
                      <Text style={{ color: COLORS.accent }}>Financial Intelligence</Text>{"\n"}
                      Reimagined
                    </Text>

                    <View className="mb-10">
                      {/* Feature List */}
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
                  </View>
                </View>
              )}

              {/* Sign-in Form */}
              <SignInForm {...signInFormProps} />
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
              {/* Sign-in Form */}
              <SignInForm {...signInFormProps} />
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}