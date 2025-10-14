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

// 🔹 Components
import OTPModal from "../components/OTPModal";
import AuthHeader from "../components/auth/AuthHeader";
import LeftPanel from "../components/auth/AuthLeftPanel";
import StepIndicator from "../components/auth/StepIndicator";
import AuthActions from "../components/auth/AuthActions";
import AuthStep1 from "../components/auth/steps/AuthStep1";
import AuthStep2 from "../components/auth/steps/AuthStep2";
import AuthStep3 from "../components/auth/steps/AuthStep3";
import AuthStep4 from "../components/auth/steps/AuthStep4";

export default function AuthScreen() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isMobile = width < 900;

  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);

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

  const handleNextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const handlePrevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowOTPModal(true);
    }, 2000);
  };

  const handleOTPVerify = () => {
    setShowOTPModal(false);
    Alert.alert("Welcome!", "Your account has been created and verified successfully!");
  };

  const handleOTPClose = () => {
    setShowOTPModal(false);
    Alert.alert("Success", "Your account was created successfully. You can verify your email later.");
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

  // ✅ WEB VERSION (scroll + responsive)
  if (Platform.OS === "web") {
    return (
      <View className="flex flex-col h-screen bg-primary overflow-hidden">
        {/* Background visuals */}
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
            {/* Header */}
            <AuthHeader onBack={handleBack} />

            {/* Responsive main content */}
            <View
              className={`flex-1 ${
                isMobile ? "flex-col px-4 pb-10" : "flex-row px-10 pb-5"
              } items-stretch w-full`}
            >
              {/* Left panel hidden on mobile */}
              {!isMobile && <LeftPanel />}

              {/* Right Panel (Form) */}
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

        <OTPModal
          visible={showOTPModal}
          onClose={handleOTPClose}
          onVerify={handleOTPVerify}
          email={formData.email}
        />
      </View>
    );
  }

  // ✅ MOBILE APP VERSION
  return (
    <View className="flex-1" style={{ backgroundColor: COLORS.primary }}>
      {/* Background visuals */}
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

      <OTPModal
        visible={showOTPModal}
        onClose={handleOTPClose}
        onVerify={handleOTPVerify}
        email={formData.email}
      />
    </View>
  );
}
