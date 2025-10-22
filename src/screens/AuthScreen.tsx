import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  useWindowDimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS, WINDOW } from "../constants/theme";

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
import { Toast } from "toastify-react-native";
import { API_BASE_URL } from "../../config";

export default function AuthScreen() {
  const navigation = useNavigation();
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

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.companyName?.trim()) {
          Alert.alert("Validation Error", "Company name is required");
          return false;
        }
        if (!formData.companyType?.trim()) {
          Alert.alert("Validation Error", "Company type is required");
          return false;
        }
        if (!formData.industry?.trim()) {
          Alert.alert("Validation Error", "Industry is required");
          return false;
        }
        if (!formData.companySize) {
          Alert.alert("Validation Error", "Company size is required");
          return false;
        }
        if (!formData.taxId?.trim()) {
          Alert.alert("Validation Error", "Tax ID is required");
          return false;
        }
        break;
      
      case 2:
        if (!formData.email?.trim()) {
          Alert.alert("Validation Error", "Business email is required");
          return false;
        }
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(formData.email)) {
          Alert.alert("Validation Error", "Please enter a valid business email");
          return false;
        }
        if (!formData.phone?.trim()) {
          Alert.alert("Validation Error", "Phone number is required");
          return false;
        }
        if (!formData.address?.trim()) {
          Alert.alert("Validation Error", "Address is required");
          return false;
        }
        if (!formData.city?.trim()) {
          Alert.alert("Validation Error", "City is required");
          return false;
        }
        if (!formData.country?.trim()) {
          Alert.alert("Validation Error", "Country is required");
          return false;
        }
        if (!formData.postalCode?.trim()) {
          Alert.alert("Validation Error", "Postal code is required");
          return false;
        }
        break;
      
      case 3:
        if (!formData.firstName?.trim()) {
          Alert.alert("Validation Error", "First name is required");
          return false;
        }
        if (!formData.lastName?.trim()) {
          Alert.alert("Validation Error", "Last name is required");
          return false;
        }
        if (!formData.jobTitle?.trim()) {
          Alert.alert("Validation Error", "Job title is required");
          return false;
        }
        if (!formData.adminEmail?.trim()) {
          Alert.alert("Validation Error", "Admin email is required");
          return false;
        }
        const adminEmailRegex = /^\S+@\S+\.\S+$/;
        if (!adminEmailRegex.test(formData.adminEmail)) {
          Alert.alert("Validation Error", "Please enter a valid admin email");
          return false;
        }
        if (formData.email.toLowerCase() === formData.adminEmail.toLowerCase()) {
          Alert.alert("Validation Error", "Business email and admin email must be different");
          return false;
        }
        break;
      
      case 4:
        if (!formData.password?.trim()) {
          Alert.alert("Validation Error", "Password is required");
          return false;
        }
        if (formData.password.length < 6) {
          Alert.alert("Validation Error", "Password must be at least 6 characters");
          return false;
        }
        if (!formData.confirmPassword?.trim()) {
          Alert.alert("Validation Error", "Please confirm your password");
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          Alert.alert("Validation Error", "Passwords do not match");
          return false;
        }
        if (!formData.acceptTerms) {
          Alert.alert("Validation Error", "You must accept the Terms of Service and Privacy Policy");
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
    // Final validation of all steps
    for (let step = 1; step <= 4; step++) {
      if (!validateStep(step)) {
        setCurrentStep(step);
        return;
      }
    }

    setIsLoading(true);

    const registrationData = {
      companyName: formData.companyName.trim(),
      companyType: formData.companyType.trim(),
      industry: formData.industry.trim(),
      companySize: formData.companySize,
      foundedYear: formData.foundedYear?.trim() || "",
      taxId: formData.taxId.trim(),
      registrationNumber: formData.registrationNumber?.trim() || "",
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      city: formData.city.trim(),
      country: formData.country.trim(),
      postalCode: formData.postalCode.trim(),
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      jobTitle: formData.jobTitle.trim(),
      adminEmail: formData.adminEmail.trim().toLowerCase(),
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      acceptTerms: formData.acceptTerms,
      newsletter: formData.newsletter,
    };

    console.log("📤 Initiating registration...");
    console.log("📋 Form Data:", {
      ...registrationData,
      password: "***hidden***",
      confirmPassword: "***hidden***"
    });

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register/initiate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();
      console.log("📥 Response:", data);

      if (response.ok && data.success) {
        console.log("✅ OTP sent successfully");
        setTempRegistrationId(data.data.tempRegistrationId);
        setRegistrationEmail(data.data.email);
        setShowOTPModal(true);
        Toast.success("Verification code sent to your email!");
      } else {
        console.error("❌ Registration failed:", data);
        
        // Better error display
        let errorMessage = data.message || "Registration failed";
        
        if (data.errors && Array.isArray(data.errors)) {
          console.error("📋 Validation Errors:", data.errors);
          errorMessage = data.errors.join("\n• ");
          errorMessage = "Validation Errors:\n• " + errorMessage;
        }
        
        Alert.alert("Registration Error", errorMessage);
      }
    } catch (error) {
      console.error("❌ Network error:", error);
      Alert.alert(
        "Connection Error",
        `Unable to connect to the server.\n\nError: ${error}`,
        [{ text: "OK" }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (otp: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          email: registrationEmail,
          otp: otp,
          tempRegistrationId: tempRegistrationId,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        console.log("✅ Registration completed!");
        setShowOTPModal(false);
        
        Alert.alert(
          "Success!",
          "Registration completed successfully. You can now login.",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("Signin" as never)
              },
            },
          ]
        );
      } else {
        throw new Error(data.message || "OTP verification failed");
      }
    } catch (error: any) {
      console.error("❌ OTP verification error:", error);
      throw error; // Let OTPModal handle the error
    }
  };

  const handleResendOTP = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register/resend-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          email: registrationEmail,
          tempRegistrationId: tempRegistrationId,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        return { success: true };
      } else {
        throw new Error(data.message || "Failed to resend OTP");
      }
    } catch (error: any) {
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

  // WEB VERSION
  if (Platform.OS === "web") {
    return (
      <>
        <View className="flex flex-col h-screen bg-primary overflow-hidden">
          <View className="absolute top-0 left-0 right-0 bottom-0">
            <View className="absolute w-[300px] h-[300px] rounded-full bg-accent opacity-10 top-[-150px] right-[-100px]" />
            <View className="absolute w-[200px] h-[200px] rounded-full bg-neutral opacity-10 bottom-[-100px] left-[-50px]" />
            <View className="absolute w-[100px] h-[100px] rounded-[25px] bg-secondary/30 border border-secondary/50 top-1/5 right-1/10 transform rotate-45" />
            <View className="absolute w-[80px] h-[80px] rounded-[20px] bg-secondary/30 border border-secondary/50 bottom-[15%] left-[5%] transform -rotate-30" />
          </View>

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
                  <View
                    className={`flex-1 ${
                      isMobile ? "p-5" : "p-8"
                    } justify-between`}
                  >
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

  // MOBILE APP VERSION
  return (
    <>
      <View className="flex-1" style={{ backgroundColor: COLORS.primary }}>
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