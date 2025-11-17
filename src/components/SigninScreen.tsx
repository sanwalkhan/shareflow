import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Custom Imports
import AuthHeader from "../components/auth/AuthHeader";
import { COLORS } from "../constants/theme";
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

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// --- Common Sign-in Form Component (Memoized for performance) ---
const SignInForm = memo(({
  formData,
  handleInputChange,
  handleSignIn,
  handleForgotPassword,
  handleSignUp,
  showPassword,
  setShowPassword,
  isSubmitting,
}: {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
  handleSignIn: () => Promise<void>;
  handleForgotPassword: () => void;
  handleSignUp: () => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  isSubmitting: boolean;
}) => (
  <View
    className="flex-1 rounded-3xl overflow-hidden bg-white p-6"
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
              editable={!isSubmitting}
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
                editable={!isSubmitting}
                onSubmitEditing={handleSignIn}
              />
              <TouchableOpacity
                className="absolute right-4 top-3.5 p-1"
                onPress={() => setShowPassword(!showPassword)}
                disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              opacity: isSubmitting ? 0.7 : 1,
            }}
            onPress={handleSignIn}
            disabled={isSubmitting}
          >
            <View className="flex-row items-center justify-center gap-3">
              {isSubmitting ? (
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
          disabled={isSubmitting}
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

  // Handlers
  const handleBack = useCallback(() => navigation.navigate("Landing"), [navigation]);
  const handleForgotPassword = useCallback(() => navigation.navigate("ForgetPassword"), [navigation]);
  const handleSignUp = useCallback(() => navigation.navigate("Auth"), [navigation]);

  const handleInputChange = useCallback((field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

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
          // Token parsing failed, continue without auto-login
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
      Animated.timing(fadeAnim, { 
        toValue: 1, 
        duration: 800, 
        useNativeDriver: true 
      }),
      Animated.timing(slideAnim, { 
        toValue: 0, 
        duration: 600, 
        useNativeDriver: true 
      }),
    ]).start();

    checkAuthStatus();
    loadSavedCredentials();
  }, [fadeAnim, slideAnim]);

  const validateForm = useCallback(() => {
    if (!formData.email.trim()) { 
      showStatus("error", "Email is required"); 
      return false; 
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(formData.email)) { 
      showStatus("error", "Please enter a valid email address"); 
      return false; 
    }
    if (!formData.password.trim()) { 
      showStatus("error", "Password is required"); 
      return false; 
    }
    if (formData.password.length < 6) { 
      showStatus("error", "Password must be at least 6 characters"); 
      return false; 
    }
    return true;
  }, [formData.email, formData.password, showStatus]);

  const handleSignIn = useCallback(async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    showLoader("Signing in...");

    const loginData = {
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    };

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(`${process.env.API_BASE}/auth/login`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          Accept: "application/json" 
        },
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

        hideLoader();

        const destination = userData.role === "admin"
          ? "AdminDashboard"
          : userData.role === "shareholder"
            ? "ShareholderDashboard"
            : "Landing";

        navigation.reset({ 
          index: 0, 
          routes: [{ name: destination as keyof RootStackParamList }] 
        });

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
      setIsSubmitting(false);
    }
  }, [formData, navigation, login, showLoader, hideLoader, showStatus, validateForm]);

  const signInFormProps = {
    formData,
    handleInputChange,
    handleSignIn,
    handleForgotPassword,
    handleSignUp,
    showPassword,
    setShowPassword,
    isSubmitting,
  };

  return (
    <View className="flex-1" style={{ backgroundColor: COLORS.primary }}>
      {/* Android-optimized background with original decorative shapes */}
      <View className="absolute top-0 left-0 right-0 bottom-0">
        <View 
          className="absolute w-[300px] h-[300px] rounded-full opacity-10 -top-32 -right-16"
          style={{ backgroundColor: COLORS.accent }}
        />
        <View 
          className="absolute w-[200px] h-[200px] rounded-full opacity-10 -bottom-24 -left-12"
          style={{ backgroundColor: COLORS.secondary }}
        />
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior="padding"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <AuthHeader onBack={handleBack} />

          <Animated.View
            className="flex-1"
            style={{
              minHeight: SCREEN_HEIGHT - 100,
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            <View className="px-5 pt-4 pb-10">
              <SignInForm {...signInFormProps} />
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}