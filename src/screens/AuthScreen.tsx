import React, { useState, useRef } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Animated,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS, WINDOW, isMobile } from "../constants/theme";

export default function AuthScreen() {
  const navigation = useNavigation();
  const [isLogin, setIsLogin] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Company Details
    companyName: "",
    companyType: "",
    industry: "",
    companySize: "",
    foundedYear: "",
    taxId: "",
    registrationNumber: "",
    
    // Contact Details
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    
    // Admin Details
    firstName: "",
    lastName: "",
    jobTitle: "",
    department: "",
    
    // Security
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    newsletter: true
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
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

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const renderStepIndicator = () => (
    <View className="flex-row items-center justify-between mb-8">
      {[1, 2, 3, 4].map((step) => (
        <View key={step} className="flex-row items-center flex-1">
          <View className={`w-9 h-9 rounded-full justify-center items-center border-2 ${
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
          {step < 4 && (
            <View className={`flex-1 h-0.5 mx-2 ${
              currentStep > step ? "bg-accent" : "bg-gray-300"
            }`} />
          )}
        </View>
      ))}
    </View>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View className="flex-1">
            <Text className="text-textDark text-[22px] font-bold mb-2">Company Information</Text>
            <Text className="text-secondary text-[15px] mb-6 font-medium">Tell us about your organization</Text>
            
            <View className="flex-row flex-wrap justify-between">
              <View className={`${isMobile ? "w-full" : "w-[48%]"} mb-5`}>
                <Text className="text-textDark text-sm font-semibold mb-2">Company Legal Name *</Text>
                <TextInput
                  placeholder="Enter legal company name"
                  placeholderTextColor={COLORS.tertiary + "80"}
                  className="bg-gray-50 rounded-xl px-4 py-3.5 text-[15px] text-textDark border border-gray-300"
                  value={formData.companyName}
                  onChangeText={(value) => handleInputChange('companyName', value)}
                />
              </View>

              <View className={`${isMobile ? "w-full" : "w-[48%]"} mb-5`}>
                <Text className="text-textDark text-sm font-semibold mb-2">Company Type *</Text>
                <TextInput
                  placeholder="e.g., Corporation, LLC, Partnership"
                  placeholderTextColor={COLORS.tertiary + "80"}
                  className="bg-gray-50 rounded-xl px-4 py-3.5 text-[15px] text-textDark border border-gray-300"
                  value={formData.companyType}
                  onChangeText={(value) => handleInputChange('companyType', value)}
                />
              </View>

              <View className={`${isMobile ? "w-full" : "w-[48%]"} mb-5`}>
                <Text className="text-textDark text-sm font-semibold mb-2">Industry *</Text>
                <TextInput
                  placeholder="e.g., Technology, Finance, Healthcare"
                  placeholderTextColor={COLORS.tertiary + "80"}
                  className="bg-gray-50 rounded-xl px-4 py-3.5 text-[15px] text-textDark border border-gray-300"
                  value={formData.industry}
                  onChangeText={(value) => handleInputChange('industry', value)}
                />
              </View>

              <View className={`${isMobile ? "w-full" : "w-[48%]"} mb-5`}>
                <Text className="text-textDark text-sm font-semibold mb-2">Company Size *</Text>
                <TextInput
                  placeholder="e.g., 1-10, 11-50, 51-200"
                  placeholderTextColor={COLORS.tertiary + "80"}
                  className="bg-gray-50 rounded-xl px-4 py-3.5 text-[15px] text-textDark border border-gray-300"
                  value={formData.companySize}
                  onChangeText={(value) => handleInputChange('companySize', value)}
                />
              </View>

              <View className={`${isMobile ? "w-full" : "w-[48%]"} mb-5`}>
                <Text className="text-textDark text-sm font-semibold mb-2">Year Founded</Text>
                <TextInput
                  placeholder="YYYY"
                  placeholderTextColor={COLORS.tertiary + "80"}
                  className="bg-gray-50 rounded-xl px-4 py-3.5 text-[15px] text-textDark border border-gray-300"
                  value={formData.foundedYear}
                  onChangeText={(value) => handleInputChange('foundedYear', value)}
                  keyboardType="numeric"
                />
              </View>

              <View className={`${isMobile ? "w-full" : "w-[48%]"} mb-5`}>
                <Text className="text-textDark text-sm font-semibold mb-2">Tax ID / EIN *</Text>
                <TextInput
                  placeholder="Enter tax identification number"
                  placeholderTextColor={COLORS.tertiary + "80"}
                  className="bg-gray-50 rounded-xl px-4 py-3.5 text-[15px] text-textDark border border-gray-300"
                  value={formData.taxId}
                  onChangeText={(value) => handleInputChange('taxId', value)}
                />
              </View>

              <View className="w-full mb-5">
                <Text className="text-textDark text-sm font-semibold mb-2">Registration Number</Text>
                <TextInput
                  placeholder="Business registration number"
                  placeholderTextColor={COLORS.tertiary + "80"}
                  className="bg-gray-50 rounded-xl px-4 py-3.5 text-[15px] text-textDark border border-gray-300"
                  value={formData.registrationNumber}
                  onChangeText={(value) => handleInputChange('registrationNumber', value)}
                />
              </View>
            </View>
          </View>
        );

      case 2:
        return (
          <View className="flex-1">
            <Text className="text-textDark text-[22px] font-bold mb-2">Contact Details</Text>
            <Text className="text-secondary text-[15px] mb-6 font-medium">Where can we reach your company?</Text>
            
            <View className="flex-row flex-wrap justify-between">
              <View className={`${isMobile ? "w-full" : "w-[48%]"} mb-5`}>
                <Text className="text-textDark text-sm font-semibold mb-2">Business Email *</Text>
                <TextInput
                  placeholder="contact@company.com"
                  placeholderTextColor={COLORS.tertiary + "80"}
                  className="bg-gray-50 rounded-xl px-4 py-3.5 text-[15px] text-textDark border border-gray-300"
                  value={formData.email}
                  onChangeText={(value) => handleInputChange('email', value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View className={`${isMobile ? "w-full" : "w-[48%]"} mb-5`}>
                <Text className="text-textDark text-sm font-semibold mb-2">Phone Number *</Text>
                <TextInput
                  placeholder="+1 (555) 000-0000"
                  placeholderTextColor={COLORS.tertiary + "80"}
                  className="bg-gray-50 rounded-xl px-4 py-3.5 text-[15px] text-textDark border border-gray-300"
                  value={formData.phone}
                  onChangeText={(value) => handleInputChange('phone', value)}
                  keyboardType="phone-pad"
                />
              </View>

              <View className="w-full mb-5">
                <Text className="text-textDark text-sm font-semibold mb-2">Street Address *</Text>
                <TextInput
                  placeholder="Enter company headquarters address"
                  placeholderTextColor={COLORS.tertiary + "80"}
                  className="bg-gray-50 rounded-xl px-4 py-3.5 text-[15px] text-textDark border border-gray-300"
                  value={formData.address}
                  onChangeText={(value) => handleInputChange('address', value)}
                />
              </View>

              <View className={`${isMobile ? "w-full" : "w-[48%]"} mb-5`}>
                <Text className="text-textDark text-sm font-semibold mb-2">City *</Text>
                <TextInput
                  placeholder="Enter city"
                  placeholderTextColor={COLORS.tertiary + "80"}
                  className="bg-gray-50 rounded-xl px-4 py-3.5 text-[15px] text-textDark border border-gray-300"
                  value={formData.city}
                  onChangeText={(value) => handleInputChange('city', value)}
                />
              </View>

              <View className={`${isMobile ? "w-full" : "w-[48%]"} mb-5`}>
                <Text className="text-textDark text-sm font-semibold mb-2">Country *</Text>
                <TextInput
                  placeholder="Enter country"
                  placeholderTextColor={COLORS.tertiary + "80"}
                  className="bg-gray-50 rounded-xl px-4 py-3.5 text-[15px] text-textDark border border-gray-300"
                  value={formData.country}
                  onChangeText={(value) => handleInputChange('country', value)}
                />
              </View>

              <View className={`${isMobile ? "w-full" : "w-[48%]"} mb-5`}>
                <Text className="text-textDark text-sm font-semibold mb-2">Postal Code *</Text>
                <TextInput
                  placeholder="ZIP / Postal code"
                  placeholderTextColor={COLORS.tertiary + "80"}
                  className="bg-gray-50 rounded-xl px-4 py-3.5 text-[15px] text-textDark border border-gray-300"
                  value={formData.postalCode}
                  onChangeText={(value) => handleInputChange('postalCode', value)}
                />
              </View>
            </View>
          </View>
        );

      case 3:
        return (
          <View className="flex-1">
            <Text className="text-textDark text-[22px] font-bold mb-2">Administrator Details</Text>
            <Text className="text-secondary text-[15px] mb-6 font-medium">Primary account administrator information</Text>
            
            <View className="flex-row flex-wrap justify-between">
              <View className={`${isMobile ? "w-full" : "w-[48%]"} mb-5`}>
                <Text className="text-textDark text-sm font-semibold mb-2">First Name *</Text>
                <TextInput
                  placeholder="Enter first name"
                  placeholderTextColor={COLORS.tertiary + "80"}
                  className="bg-gray-50 rounded-xl px-4 py-3.5 text-[15px] text-textDark border border-gray-300"
                  value={formData.firstName}
                  onChangeText={(value) => handleInputChange('firstName', value)}
                />
              </View>

              <View className={`${isMobile ? "w-full" : "w-[48%]"} mb-5`}>
                <Text className="text-textDark text-sm font-semibold mb-2">Last Name *</Text>
                <TextInput
                  placeholder="Enter last name"
                  placeholderTextColor={COLORS.tertiary + "80"}
                  className="bg-gray-50 rounded-xl px-4 py-3.5 text-[15px] text-textDark border border-gray-300"
                  value={formData.lastName}
                  onChangeText={(value) => handleInputChange('lastName', value)}
                />
              </View>

              <View className={`${isMobile ? "w-full" : "w-[48%]"} mb-5`}>
                <Text className="text-textDark text-sm font-semibold mb-2">Job Title *</Text>
                <TextInput
                  placeholder="e.g., CEO, Finance Manager"
                  placeholderTextColor={COLORS.tertiary + "80"}
                  className="bg-gray-50 rounded-xl px-4 py-3.5 text-[15px] text-textDark border border-gray-300"
                  value={formData.jobTitle}
                  onChangeText={(value) => handleInputChange('jobTitle', value)}
                />
              </View>

              <View className={`${isMobile ? "w-full" : "w-[48%]"} mb-5`}>
                <Text className="text-textDark text-sm font-semibold mb-2">Department *</Text>
                <TextInput
                  placeholder="e.g., Finance, HR, Operations"
                  placeholderTextColor={COLORS.tertiary + "80"}
                  className="bg-gray-50 rounded-xl px-4 py-3.5 text-[15px] text-textDark border border-gray-300"
                  value={formData.department}
                  onChangeText={(value) => handleInputChange('department', value)}
                />
              </View>
            </View>
          </View>
        );

      case 4:
        return (
          <View className="flex-1">
            <Text className="text-textDark text-[22px] font-bold mb-2">Security & Preferences</Text>
            <Text className="text-secondary text-[15px] mb-6 font-medium">Set up your account security</Text>
            
            <View className="flex-row flex-wrap justify-between">
              <View className="w-full mb-5">
                <Text className="text-textDark text-sm font-semibold mb-2">Password *</Text>
                <View className="relative">
                  <TextInput
                    placeholder="Create secure password"
                    placeholderTextColor={COLORS.tertiary + "80"}
                    className="bg-gray-50 rounded-xl px-4 py-3.5 text-[15px] text-textDark border border-gray-300 pr-12"
                    value={formData.password}
                    onChangeText={(value) => handleInputChange('password', value)}
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

              <View className="w-full mb-5">
                <Text className="text-textDark text-sm font-semibold mb-2">Confirm Password *</Text>
                <TextInput
                  placeholder="Re-enter your password"
                  placeholderTextColor={COLORS.tertiary + "80"}
                  className="bg-gray-50 rounded-xl px-4 py-3.5 text-[15px] text-textDark border border-gray-300"
                  value={formData.confirmPassword}
                  onChangeText={(value) => handleInputChange('confirmPassword', value)}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
              </View>

              <View className="w-full mb-5">
                <View className="flex-row items-start gap-3">
                  <TouchableOpacity 
                    className={`w-5 h-5 rounded border justify-center items-center mt-0.5 ${
                      formData.acceptTerms 
                        ? "bg-accent border-accent" 
                        : "bg-gray-50 border-gray-300"
                    }`}
                    onPress={() => handleInputChange('acceptTerms', !formData.acceptTerms)}
                  >
                    {formData.acceptTerms && (
                      <Feather name="check" size={16} color={COLORS.white} />
                    )}
                  </TouchableOpacity>
                  <Text className="text-secondary text-sm flex-1 leading-5">
                    I agree to the <Text className="text-accent font-semibold">Terms of Service</Text> and{" "}
                    <Text className="text-accent font-semibold">Privacy Policy</Text> *
                  </Text>
                </View>
              </View>

              <View className="w-full mb-5">
                <View className="flex-row items-start gap-3">
                  <TouchableOpacity 
                    className={`w-5 h-5 rounded border justify-center items-center mt-0.5 ${
                      formData.newsletter 
                        ? "bg-accent border-accent" 
                        : "bg-gray-50 border-gray-300"
                    }`}
                    onPress={() => handleInputChange('newsletter', !formData.newsletter)}
                  >
                    {formData.newsletter && (
                      <Feather name="check" size={16} color={COLORS.white} />
                    )}
                  </TouchableOpacity>
                  <Text className="text-secondary text-sm flex-1 leading-5">
                    Send me product updates, security tips, and industry insights
                  </Text>
                </View>
              </View>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

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
              transform: [{ translateY: slideAnim }]
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

            {/* Main Auth Container */}
            <View className={`flex-1 ${isMobile ? "flex-col px-5" : "flex-row px-10"} pb-5`}>
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
                    <Text className="text-accent text-xs font-bold tracking-wider">ENTERPRISE GRADE</Text>
                  </View>
                  
                  <Text className="text-textLight text-4xl font-extrabold leading-[44px] tracking-tight mb-8">
                    Join 500+ Companies{"\n"}
                    <Text style={{ color: COLORS.accent }}>Managing Finances</Text>{"\n"}
                    with Confidence
                  </Text>
                  
                  <View className="mb-10">
                    <View className="flex-row items-center gap-3 mb-4">
                      <Feather name="check-circle" size={18} color={COLORS.accent} />
                      <Text className="text-textLight text-base font-semibold">Automated Expense Tracking</Text>
                    </View>
                    <View className="flex-row items-center gap-3 mb-4">
                      <Feather name="check-circle" size={18} color={COLORS.accent} />
                      <Text className="text-textLight text-base font-semibold">Seamless Payroll Management</Text>
                    </View>
                    <View className="flex-row items-center gap-3 mb-4">
                      <Feather name="check-circle" size={18} color={COLORS.accent} />
                      <Text className="text-textLight text-base font-semibold">Real-time Shareholder Insights</Text>
                    </View>
                    <View className="flex-row items-center gap-3 mb-4">
                      <Feather name="check-circle" size={18} color={COLORS.accent} />
                      <Text className="text-textLight text-base font-semibold">Bank-Grade Security</Text>
                    </View>
                  </View>

                  <View className="flex-row justify-around">
                    <View className="items-center">
                      <Text className="text-accent text-2xl font-extrabold mb-1">99.7%</Text>
                      <Text className="text-textLight text-sm font-semibold uppercase tracking-wider">Uptime</Text>
                    </View>
                    <View className="items-center">
                      <Text className="text-accent text-2xl font-extrabold mb-1">256-bit</Text>
                      <Text className="text-textLight text-sm font-semibold uppercase tracking-wider">Encryption</Text>
                    </View>
                    <View className="items-center">
                      <Text className="text-accent text-2xl font-extrabold mb-1">24/7</Text>
                      <Text className="text-textLight text-sm font-semibold uppercase tracking-wider">Support</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Right Panel - Registration Form */}
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
                    <View className="mb-4">
                      <View className="flex-row items-center gap-2 bg-accent/10 px-3.5 py-1.5 rounded-full border border-accent/20 mb-4 self-start">
                        <Feather name="home" size={16} color={COLORS.accent} />
                        <Text className="text-accent text-xs font-bold tracking-wider">COMPANY REGISTRATION</Text>
                      </View>
                      
                      <Text className="text-textDark text-2xl font-extrabold tracking-tight mb-2">
                        Create Your Company Account
                      </Text>
                      
                      <Text className="text-secondary text-base mb-6 font-medium">
                        Complete your company profile to get started with ShareFlow Enterprise
                      </Text>

                      {/* Step Indicator */}
                      {renderStepIndicator()}
                    </View>

                    {/* Step Content */}
                    <View className="flex-1">
                      {renderStepContent()}
                    </View>
                  </View>

                  {/* Action Buttons */}
                  <View>
                    <View className="flex-row justify-between items-center mb-5">
                      {currentStep > 1 && (
                        <TouchableOpacity 
                          className="flex-row items-center gap-2 px-6 py-3.5 rounded-xl bg-gray-50 border border-gray-300"
                          onPress={handlePrevStep}
                        >
                          <Feather name="arrow-left" size={18} color={COLORS.primary} />
                          <Text className="text-textDark text-[15px] font-semibold">Previous</Text>
                        </TouchableOpacity>
                      )}
                      
                      <TouchableOpacity 
                        className={`${currentStep < 4 ? "flex-1 ml-3" : "flex-1"} rounded-xl overflow-hidden`}
                        style={{
                          backgroundColor: COLORS.accent,
                          shadowColor: COLORS.accent,
                          shadowOffset: { width: 0, height: 8 },
                          shadowOpacity: 0.3,
                          shadowRadius: 16,
                          elevation: 8,
                        }}
                        onPress={currentStep < 4 ? handleNextStep : handleSubmit}
                        disabled={isLoading}
                      >
                        <View className="py-3.5">
                          {isLoading ? (
                            <View className="flex-row items-center justify-center gap-3">
                              <Feather name="loader" size={20} color={COLORS.white} />
                              <Text className="text-white text-[15px] font-bold">
                                Processing...
                              </Text>
                            </View>
                          ) : (
                            <View className="flex-row items-center justify-center gap-2">
                              <Text className="text-white text-[15px] font-bold">
                                {currentStep < 4 ? 'Continue' : 'Complete Registration'}
                              </Text>
                              <Feather 
                                name={currentStep < 4 ? "arrow-right" : "check"} 
                                size={20} 
                                color={COLORS.white} 
                              />
                            </View>
                          )}
                        </View>
                      </TouchableOpacity>
                    </View>

                    {/* Footer Note */}
                    <View className="items-center pt-5 border-t border-gray-300">
                      <Text className="text-secondary text-sm text-center">
                        Already have an account?{" "}
                        <Text 
                          className="text-accent font-bold"
                          onPress={() => setIsLogin(true)}
                        >
                          Sign in here
                        </Text>
                      </Text>
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