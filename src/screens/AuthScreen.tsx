import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Animated,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS, WINDOW } from "../constants/theme";
import { useAuth } from "../contexts/AuthContext";
import { Toast } from "toastify-react-native";
import { API_BASE_URL } from "../../config";

// Components
import AuthHeader from "../components/auth/AuthHeader";
import LeftPanel from "../components/auth/AuthLeftPanel";
import StepIndicator from "../components/auth/StepIndicator";
import AuthActions from "../components/auth/AuthActions";
import AuthStep1 from "../components/auth/steps/AuthStep1";
import AuthStep2 from "../components/auth/steps/AuthStep2";
import AuthStep3 from "../components/auth/steps/AuthStep3";
import AuthStep4 from "../components/auth/steps/AuthStep4";
import OTPModal from "../components/OTPModal";
import Button from "../UI/Button";

export default function AuthScreen() {
  const navigation = useNavigation();
  const { login } = useAuth();
  const { width } = useWindowDimensions();
  const isMobile = width < 900;

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

  // ✅ Unified toast-based validation feedback
  const showError = (msg: string) => Toast.error(msg);
  const showSuccess = (msg: string) => Toast.success(msg);

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.companyName?.trim()) return showError("Company name is required"), false;
        if (!formData.companyType?.trim()) return showError("Company type is required"), false;
        if (!formData.industry?.trim()) return showError("Industry is required"), false;
        if (!formData.companySize) return showError("Company size is required"), false;
        if (!formData.taxId?.trim()) return showError("Tax ID is required"), false;
        break;

      case 2:
        if (!formData.email?.trim()) return showError("Business email is required"), false;
        if (!/^\S+@\S+\.\S+$/.test(formData.email))
          return showError("Please enter a valid business email"), false;
        if (!formData.phone?.trim()) return showError("Phone number is required"), false;
        if (!formData.address?.trim()) return showError("Address is required"), false;
        if (!formData.city?.trim()) return showError("City is required"), false;
        if (!formData.country?.trim()) return showError("Country is required"), false;
        if (!formData.postalCode?.trim()) return showError("Postal code is required"), false;
        break;

      case 3:
        if (!formData.firstName?.trim()) return showError("First name is required"), false;
        if (!formData.lastName?.trim()) return showError("Last name is required"), false;
        if (!formData.jobTitle?.trim()) return showError("Job title is required"), false;
        if (!formData.adminEmail?.trim()) return showError("Admin email is required"), false;
        if (!/^\S+@\S+\.\S+$/.test(formData.adminEmail))
          return showError("Please enter a valid admin email"), false;
        if (formData.email.toLowerCase() === formData.adminEmail.toLowerCase())
          return showError("Business and admin emails must be different"), false;
        break;

      case 4:
        if (!formData.password?.trim()) return showError("Password is required"), false;
        if (formData.password.length < 6)
          return showError("Password must be at least 6 characters"), false;
        if (!formData.confirmPassword?.trim()) return showError("Confirm your password"), false;
        if (formData.password !== formData.confirmPassword)
          return showError("Passwords do not match"), false;
        if (!formData.acceptTerms)
          return showError("You must accept the Terms & Privacy Policy"), false;
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

    const registrationData = {
      ...formData,
      email: formData.email.trim().toLowerCase(),
      adminEmail: formData.adminEmail.trim().toLowerCase(),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showSuccess("Verification code sent to your admin email!");
        setTempRegistrationId(data.data.tempRegistrationId);
        setRegistrationEmail(formData.adminEmail);
        setShowOTPModal(true);
      } else {
        const msg =
          data.errors && Array.isArray(data.errors)
            ? data.errors.join("\n• ")
            : data.message || "Registration failed";
        showError(msg);
      }
    } catch (error: any) {
      showError(`Network error: ${error.message || error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (otp: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register/verify`, {
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
        setShowOTPModal(false);
        showSuccess("Registration successful! Welcome to ShareFlow 🎉");
        if (data.data.token && data.data.user) {
          await login(data.data.token, data.data.user);
        } else {
          navigation.navigate("Signin" as never);
        }
      } else {
        throw new Error(data.message || "OTP verification failed");
      }
    } catch (error: any) {
      showError(error.message || "OTP verification error");
      throw error;
    }
  };

  const handleResendOTP = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: registrationEmail,
          tempRegistrationId,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showSuccess("OTP resent successfully!");
        return { success: true };
      } else {
        throw new Error(data.message || "Failed to resend OTP");
      }
    } catch (error: any) {
      showError(error.message || "Error resending OTP");
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

  const BackgroundShapes = () => (
    <>
      <View className="absolute w-[300px] h-[300px] rounded-full bg-accent opacity-10 top-[-150px] right-[-100px]" />
      <View className="absolute w-[200px] h-[200px] rounded-full bg-neutral opacity-10 bottom-[-100px] left-[-50px]" />
      <View className="absolute w-[100px] h-[100px] rounded-[25px] bg-secondary/30 border border-secondary/50 top-1/5 right-1/10 transform rotate-45" />
      <View className="absolute w-[80px] h-[80px] rounded-[20px] bg-secondary/30 border border-secondary/50 bottom-[15%] left-[5%] transform -rotate-30" />
    </>
  );

  // ✅ WEB VERSION
  if (Platform.OS === "web") {
    return (
      <>
        <View className="flex flex-col h-screen bg-primary overflow-hidden">
          <BackgroundShapes />
          <View className="flex-1 overflow-y-auto overflow-x-hidden web-scroll">
            <Animated.View
              className="flex-1"
              style={{
                minHeight: WINDOW.height,
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }}
            >
              <AuthHeader onBack={handleBack} />
              <View
                className={`flex-1 ${
                  isMobile ? "flex-col px-4 pb-10" : "flex-row px-10 pb-5"
                } items-stretch w-full`}
              >
                {!isMobile && <LeftPanel />}
                <View
                  className={`flex-1 rounded-3xl overflow-hidden bg-white ${
                    isMobile ? "mt-4" : "ml-5"
                  }`}
                  style={{
                    shadowColor: COLORS.black,
                    shadowOffset: { width: 0, height: 20 },
                    shadowOpacity: 0.2,
                    shadowRadius: 30,
                    elevation: 15,
                  }}
                >
                  <View className={`flex-1 ${isMobile ? "p-5" : "p-8"} justify-between`}>
                    <View>
                      <StepIndicator currentStep={currentStep} />
                      <View className="flex-1 mt-4">{renderStepContent()}</View>
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
          </View>
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

  // ✅ MOBILE APP VERSION
  return (
    <>
      <View className="flex-1" style={{ backgroundColor: COLORS.primary }}>
        <BackgroundShapes />

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
              <AuthHeader onBack={handleBack} />

              <View className="flex-col px-5 pb-5">
                <LeftPanel />

                <View
                  className="flex-1 rounded-3xl overflow-hidden bg-white mt-4"
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
                      <View className="flex-1 mt-4">{renderStepContent()}</View>
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
                        <Button
                          className="text-accent font-bold"
                          onPress={() => navigation.navigate("Signin" as never)}
                        >
                          Sign in here
                        </Button>
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
