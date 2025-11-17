import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Animated,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants/theme";
import { useAuth } from "../contexts/AuthContext";

// Components
import AuthHeader from "../components/auth/AuthHeader";
import StepIndicator from "../components/auth/StepIndicator";
import AuthActions from "../components/auth/AuthActions";
import AuthStep1 from "../components/auth/steps/AuthStep1";
import AuthStep2 from "../components/auth/steps/AuthStep2";
import AuthStep3 from "../components/auth/steps/AuthStep3";
import AuthStep4 from "../components/auth/steps/AuthStep4";
import OTPModal from "../components/OTPModal";
import { useStatus } from "../components/feedback/StatusProvider";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function AuthScreen() {
  const navigation = useNavigation();
  const { login } = useAuth();
  const { showLoader, hideLoader, showStatus } = useStatus();

  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [tempRegistrationId, setTempRegistrationId] = useState("");
  const [registrationEmail, setRegistrationEmail] = useState("");

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  const [formData, setFormData] = useState({
    companyName: "",
    companyType: "",
    industry: "",
    companySize: "",
    foundedYear: "",
    taxId: "",
    registrationNumber: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    firstName: "",
    lastName: "",
    jobTitle: "",
    adminEmail: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    newsletter: true,
  });

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
      }),
    ]).start();
  }, []);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.companyName?.trim()) {
          showStatus("error", "Company name is required");
          return false;
        }
        if (!formData.companyType?.trim()) {
          showStatus("error", "Company type is required");
          return false;
        }
        if (!formData.industry?.trim()) {
          showStatus("error", "Industry is required");
          return false;
        }
        if (!formData.companySize) {
          showStatus("error", "Company size is required");
          return false;
        }
        if (!formData.taxId?.trim()) {
          showStatus("error", "Tax ID is required");
          return false;
        }
        break;

      case 2:
        if (!formData.email?.trim()) {
          showStatus("error", "Business email is required");
          return false;
        }
        if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
          showStatus("error", "Please enter a valid business email");
          return false;
        }
        if (!formData.phone?.trim()) {
          showStatus("error", "Phone number is required");
          return false;
        }
        if (!formData.address?.trim()) {
          showStatus("error", "Address is required");
          return false;
        }
        if (!formData.city?.trim()) {
          showStatus("error", "City is required");
          return false;
        }
        if (!formData.country?.trim()) {
          showStatus("error", "Country is required");
          return false;
        }
        if (!formData.postalCode?.trim()) {
          showStatus("error", "Postal code is required");
          return false;
        }
        break;

      case 3:
        if (!formData.firstName?.trim()) {
          showStatus("error", "First name is required");
          return false;
        }
        if (!formData.lastName?.trim()) {
          showStatus("error", "Last name is required");
          return false;
        }
        if (!formData.jobTitle?.trim()) {
          showStatus("error", "Job title is required");
          return false;
        }
        if (!formData.adminEmail?.trim()) {
          showStatus("error", "Admin email is required");
          return false;
        }
        if (!/^\S+@\S+\.\S+$/.test(formData.adminEmail)) {
          showStatus("error", "Please enter a valid admin email");
          return false;
        }
        if (formData.email.toLowerCase() === formData.adminEmail.toLowerCase()) {
          showStatus("error", "Business and admin emails must be different");
          return false;
        }
        break;

      case 4:
        if (!formData.password?.trim()) {
          showStatus("error", "Password is required");
          return false;
        }
        if (formData.password.length < 6) {
          showStatus("error", "Password must be at least 6 characters");
          return false;
        }
        if (!formData.confirmPassword?.trim()) {
          showStatus("error", "Confirm your password");
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          showStatus("error", "Passwords do not match");
          return false;
        }
        if (!formData.acceptTerms) {
          showStatus("error", "You must accept the Terms & Privacy Policy");
          return false;
        }
        break;
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handlePrevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    for (let step = 1; step <= 4; step++) {
      if (!validateStep(step)) {
        setCurrentStep(step);
        return;
      }
    }

    setIsLoading(true);
    showLoader("Creating your account...");

    const registrationData = {
      ...formData,
      email: formData.email.trim().toLowerCase(),
      adminEmail: formData.adminEmail.trim().toLowerCase(),
    };

    try {
      const response = await fetch(`${process.env.API_BASE}/auth/register/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        hideLoader();
        showStatus("success", "Verification code sent to your admin email!");
        setTempRegistrationId(data.data.tempRegistrationId);
        setRegistrationEmail(formData.adminEmail);
        setShowOTPModal(true);
      } else {
        hideLoader();
        const msg = data.errors && Array.isArray(data.errors)
          ? data.errors.join("\n• ")
          : data.message || "Registration failed";
        showStatus("error", msg);
      }
    } catch (error: any) {
      hideLoader();
      showStatus("error", `Network error: ${error.message || error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (otp: string) => {
    try {
      showLoader("Verifying your account...");
      const response = await fetch(`${process.env.API_BASE}/auth/register/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: registrationEmail,
          otp,
          tempRegistrationId,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        hideLoader();
        setShowOTPModal(false);
        showStatus("success", "Registration successful! Welcome to ShareFlow 🎉");
        if (data.data.token && data.data.user) {
          await login(data.data.token, data.data.user);
        } else {
          navigation.navigate("Signin" as never);
        }
      } else {
        throw new Error(data.message || "OTP verification failed");
      }
    } catch (error: any) {
      hideLoader();
      showStatus("error", error.message || "OTP verification error");
      throw error;
    }
  };

  const handleResendOTP = async () => {
    try {
      showLoader("Resending verification code...");
      const response = await fetch(`${process.env.API_BASE}/auth/register/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: registrationEmail,
          tempRegistrationId,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        hideLoader();
        showStatus("success", "OTP resent successfully!");
        return { success: true };
      } else {
        throw new Error(data.message || "Failed to resend OTP");
      }
    } catch (error: any) {
      hideLoader();
      showStatus("error", error.message || "Error resending OTP");
      throw error;
    }
  };

  const handleBack = () => navigation.goBack();

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <AuthStep1 formData={formData} handleInputChange={handleInputChange} />;
      case 2:
        return <AuthStep2 formData={formData} handleInputChange={handleInputChange} />;
      case 3:
        return <AuthStep3 formData={formData} handleInputChange={handleInputChange} />;
      case 4:
        return (
          <AuthStep4
            formData={formData}
            handleInputChange={handleInputChange}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <View className="flex-1" style={{ backgroundColor: COLORS.primary }}>
        {/* Android-optimized background with matching SigninScreen style */}
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
            <Animated.View
              className="flex-1"
              style={{
                minHeight: SCREEN_HEIGHT - 100,
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }}
            >
              <AuthHeader onBack={handleBack} />

              <View className="px-5 pt-4 pb-10">
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
                  <View className="flex-1 p-6 justify-between">
                    <View>
                      <StepIndicator currentStep={currentStep} />
                      <View className="flex-1 mt-4">
                        {renderStepContent()}
                      </View>
                    </View>

                    <AuthActions
                      currentStep={currentStep}
                      isLoading={isLoading}
                      handlePrevStep={handlePrevStep}
                      handleNextStep={handleNextStep}
                      handleSubmit={handleSubmit}
                    />

                    <View className="items-center pt-5 border-t border-gray-300 mt-6">
                      <Text className="text-secondary text-sm text-center">
                        Already have an account?{" "}
                        <Text
                          className="text-accent font-bold"
                          onPress={() => navigation.navigate("Signin" as never)}
                        >
                          Sign in here
                        </Text>
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

      <OTPModal
        visible={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        onVerify={handleVerifyOTP}
        onResend={handleResendOTP}
        email={registrationEmail}
      />
    </>
  );
}