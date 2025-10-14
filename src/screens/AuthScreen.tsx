import React, { useState, useRef } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions,
  Animated,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

<<<<<<< Updated upstream
<<<<<<< Updated upstream
const { width, height } = Dimensions.get("window");
const isMobile = width < 768;

// Consistent Color Scheme
const COLORS = {
  accent: "#faed26",      // Bright Yellow - Primary CTA & Highlights
  primary: "#46344e",     // Dark Purple - Main Background
  secondary: "#5a5560",   // Medium Purple - Cards & Sections
  tertiary: "#9d8d8f",    // Muted Pink - Secondary Text
  neutral: "#9b986f",     // Olive Green - Supporting Elements
  white: "#ffffff",
  black: "#000000",
  textLight: "#f8f9fa",
  textDark: "#1a202c",
  overlay: "#46344e",
  error: "#ef4444",
  success: "#10b981"
};
=======
// 🔹 Components
=======
// Components
>>>>>>> Stashed changes
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

// API Configuration
const API_BASE_URL = "http://localhost:9000/api";

export default function AuthScreen() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isMobile = width < 900;
>>>>>>> Stashed changes

export default function AuthScreen({ onBack }: { onBack: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
<<<<<<< Updated upstream
=======
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
<<<<<<< Updated upstream
=======
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [tempRegistrationId, setTempRegistrationId] = useState("");
  const [registrationEmail, setRegistrationEmail] = useState("");
>>>>>>> Stashed changes

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
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
=======
  // Validation function
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

<<<<<<< Updated upstream
=======
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

>>>>>>> Stashed changes
  const handlePrevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
>>>>>>> Stashed changes

  const handleSubmit = async () => {
    // Final validation of all steps
    for (let step = 1; step <= 4; step++) {
      if (!validateStep(step)) {
        setCurrentStep(step);
        return;
      }
    }

    setIsLoading(true);
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Handle registration logic here
    }, 2000);
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {[1, 2, 3, 4].map((step) => (
        <View key={step} style={styles.stepContainer}>
          <View style={[
            styles.stepCircle,
            currentStep >= step && styles.stepCircleActive
          ]}>
            <Text style={[
              styles.stepNumber,
              currentStep >= step && styles.stepNumberActive
            ]}>
              {step}
            </Text>
          </View>
          {step < 4 && (
            <View style={[
              styles.stepLine,
              currentStep > step && styles.stepLineActive
            ]} />
          )}
        </View>
      ))}
    </View>
  );
=======

    // Prepare clean data for API
    const registrationData = {
      // Step 1: Company Information
      companyName: formData.companyName.trim(),
      companyType: formData.companyType.trim(),
      industry: formData.industry.trim(),
      companySize: formData.companySize,
      foundedYear: formData.foundedYear?.trim() || "",
      taxId: formData.taxId.trim(),
      registrationNumber: formData.registrationNumber?.trim() || "",
      
      // Step 2: Contact Details
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      city: formData.city.trim(),
      country: formData.country.trim(),
      postalCode: formData.postalCode.trim(),
      
      // Step 3: Administrator Details
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      jobTitle: formData.jobTitle.trim(),
      adminEmail: formData.adminEmail.trim().toLowerCase(),
      
      // Step 4: Security & Preferences
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      acceptTerms: formData.acceptTerms,
      newsletter: formData.newsletter,
    };

    console.log("📤 Sending registration data to:", `${API_BASE_URL}/auth/register`);
    console.log("📋 Data:", {
      ...registrationData,
      password: "***hidden***",
      confirmPassword: "***hidden***"
    });

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
=======

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
                // Navigate to login or dashboard
                // navigation.navigate("Login");
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
>>>>>>> Stashed changes
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
<<<<<<< Updated upstream
        body: JSON.stringify(registrationData),
      });

      console.log("📥 Response status:", response.status);
      
      const data = await response.json();
      console.log("📥 Response data:", data);

      if (response.ok && data.success) {
        console.log("✅ Registration successful!");
        
        // Store token if needed
        // await AsyncStorage.setItem('authToken', data.data.token);
        
        Alert.alert(
          "Success! 🎉",
          `Welcome ${data.data.admin.firstName} ${data.data.admin.lastName}!\n\nYour company "${data.data.company.companyName}" has been registered successfully.`,
          [
            {
              text: "Continue to Dashboard",
              onPress: () => {
                console.log("Token:", data.data.token);
                // Navigate to dashboard
                // navigation.navigate('Dashboard', { 
                //   admin: data.data.admin,
                //   company: data.data.company 
                // });
                
                // Reset form
                setFormData({
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
                setCurrentStep(1);
              },
            },
          ]
        );
      } else {
        console.error("❌ Registration failed:", data);
        
        let errorMessage = data.message || "Registration failed. Please try again.";
        
        if (data.errors && Array.isArray(data.errors)) {
          errorMessage = data.errors.join("\n");
        }
        
        Alert.alert(
          "Registration Failed",
          errorMessage,
          [{ text: "OK" }]
        );
      }
    } catch (error) {
      console.error("❌ Network error:", error);
      Alert.alert(
        "Connection Error",
        `Unable to connect to the server.\n\nPlease check:\n• Backend is running on port 9000\n• MongoDB is connected\n• Network connection is active\n\nURL: ${API_BASE_URL}/auth/register\n\nError: ${error.message}`,
        [{ text: "OK" }]
      );
    } finally {
      setIsLoading(false);
=======
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
>>>>>>> Stashed changes
    }
  };

  const handleBack = () => navigation.goBack();
>>>>>>> Stashed changes

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Company Information</Text>
            <Text style={styles.stepSubtitle}>Tell us about your organization</Text>
            
            <View style={styles.formGrid}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Company Legal Name *</Text>
                <TextInput
                  placeholder="Enter legal company name"
                  placeholderTextColor={COLORS.tertiary + "80"}
                  style={styles.input}
                  value={formData.companyName}
                  onChangeText={(value) => handleInputChange('companyName', value)}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Company Type *</Text>
                <View style={styles.selectInput}>
                  <Text style={[
                    styles.selectText,
                    !formData.companyType && { color: COLORS.tertiary + "80" }
                  ]}>
                    {formData.companyType || "Select company type"}
                  </Text>
                  <Feather name="chevron-down" size={20} color={COLORS.tertiary} />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Industry *</Text>
                <View style={styles.selectInput}>
                  <Text style={[
                    styles.selectText,
                    !formData.industry && { color: COLORS.tertiary + "80" }
                  ]}>
                    {formData.industry || "Select industry"}
                  </Text>
                  <Feather name="chevron-down" size={20} color={COLORS.tertiary} />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Company Size *</Text>
                <View style={styles.selectInput}>
                  <Text style={[
                    styles.selectText,
                    !formData.companySize && { color: COLORS.tertiary + "80" }
                  ]}>
                    {formData.companySize || "Select company size"}
                  </Text>
                  <Feather name="chevron-down" size={20} color={COLORS.tertiary} />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Year Founded</Text>
                <TextInput
                  placeholder="YYYY"
                  placeholderTextColor={COLORS.tertiary + "80"}
                  style={styles.input}
                  value={formData.foundedYear}
                  onChangeText={(value) => handleInputChange('foundedYear', value)}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Tax ID / EIN *</Text>
                <TextInput
                  placeholder="Enter tax identification number"
                  placeholderTextColor={COLORS.tertiary + "80"}
                  style={styles.input}
                  value={formData.taxId}
                  onChangeText={(value) => handleInputChange('taxId', value)}
                />
              </View>
            </View>
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Contact Details</Text>
            <Text style={styles.stepSubtitle}>Where can we reach your company?</Text>
            
            <View style={styles.formGrid}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Business Email *</Text>
                <TextInput
                  placeholder="contact@company.com"
                  placeholderTextColor={COLORS.tertiary + "80"}
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(value) => handleInputChange('email', value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Phone Number *</Text>
                <TextInput
                  placeholder="+1 (555) 000-0000"
                  placeholderTextColor={COLORS.tertiary + "80"}
                  style={styles.input}
                  value={formData.phone}
                  onChangeText={(value) => handleInputChange('phone', value)}
                  keyboardType="phone-pad"
                />
              </View>

              <View style={[styles.inputGroup, styles.fullWidth]}>
                <Text style={styles.inputLabel}>Street Address *</Text>
                <TextInput
                  placeholder="Enter company headquarters address"
                  placeholderTextColor={COLORS.tertiary + "80"}
                  style={styles.input}
                  value={formData.address}
                  onChangeText={(value) => handleInputChange('address', value)}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>City *</Text>
                <TextInput
                  placeholder="Enter city"
                  placeholderTextColor={COLORS.tertiary + "80"}
                  style={styles.input}
                  value={formData.city}
                  onChangeText={(value) => handleInputChange('city', value)}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Country *</Text>
                <View style={styles.selectInput}>
                  <Text style={[
                    styles.selectText,
                    !formData.country && { color: COLORS.tertiary + "80" }
                  ]}>
                    {formData.country || "Select country"}
                  </Text>
                  <Feather name="chevron-down" size={20} color={COLORS.tertiary} />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Postal Code *</Text>
                <TextInput
                  placeholder="ZIP / Postal code"
                  placeholderTextColor={COLORS.tertiary + "80"}
                  style={styles.input}
                  value={formData.postalCode}
                  onChangeText={(value) => handleInputChange('postalCode', value)}
                />
              </View>
            </View>
          </View>
        );

      case 3:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Administrator Details</Text>
            <Text style={styles.stepSubtitle}>Primary account administrator information</Text>
            
            <View style={styles.formGrid}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>First Name *</Text>
                <TextInput
                  placeholder="Enter first name"
                  placeholderTextColor={COLORS.tertiary + "80"}
                  style={styles.input}
                  value={formData.firstName}
                  onChangeText={(value) => handleInputChange('firstName', value)}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Last Name *</Text>
                <TextInput
                  placeholder="Enter last name"
                  placeholderTextColor={COLORS.tertiary + "80"}
                  style={styles.input}
                  value={formData.lastName}
                  onChangeText={(value) => handleInputChange('lastName', value)}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Job Title *</Text>
                <TextInput
                  placeholder="e.g., CEO, Finance Manager"
                  placeholderTextColor={COLORS.tertiary + "80"}
                  style={styles.input}
                  value={formData.jobTitle}
                  onChangeText={(value) => handleInputChange('jobTitle', value)}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Department *</Text>
                <View style={styles.selectInput}>
                  <Text style={[
                    styles.selectText,
                    !formData.department && { color: COLORS.tertiary + "80" }
                  ]}>
                    {formData.department || "Select department"}
                  </Text>
                  <Feather name="chevron-down" size={20} color={COLORS.tertiary} />
                </View>
              </View>
            </View>
          </View>
        );

      case 4:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Security & Preferences</Text>
            <Text style={styles.stepSubtitle}>Set up your account security</Text>
            
            <View style={styles.formGrid}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Password *</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    placeholder="Create secure password"
                    placeholderTextColor={COLORS.tertiary + "80"}
                    style={[styles.input, styles.passwordInput]}
                    value={formData.password}
                    onChangeText={(value) => handleInputChange('password', value)}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity 
                    style={styles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Feather 
                      name={showPassword ? "eye-off" : "eye"} 
                      size={18} 
                      color={COLORS.tertiary} 
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.passwordHint}>
                  Must be at least 8 characters with uppercase, lowercase, and numbers
                </Text>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Confirm Password *</Text>
                <TextInput
                  placeholder="Re-enter your password"
                  placeholderTextColor={COLORS.tertiary + "80"}
                  style={styles.input}
                  value={formData.confirmPassword}
                  onChangeText={(value) => handleInputChange('confirmPassword', value)}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
              </View>

              <View style={[styles.inputGroup, styles.fullWidth]}>
                <View style={styles.checkboxContainer}>
                  <TouchableOpacity 
                    style={[
                      styles.checkbox,
                      formData.acceptTerms && styles.checkboxChecked
                    ]}
                    onPress={() => handleInputChange('acceptTerms', !formData.acceptTerms)}
                  >
                    {formData.acceptTerms && (
                      <Feather name="check" size={16} color={COLORS.primary} />
                    )}
                  </TouchableOpacity>
                  <Text style={styles.checkboxLabel}>
                    I agree to the <Text style={styles.checkboxLink}>Terms of Service</Text> and{" "}
                    <Text style={styles.checkboxLink}>Privacy Policy</Text> *
                  </Text>
                </View>
              </View>

              <View style={[styles.inputGroup, styles.fullWidth]}>
                <View style={styles.checkboxContainer}>
                  <TouchableOpacity 
                    style={[
                      styles.checkbox,
                      formData.newsletter && styles.checkboxChecked
                    ]}
                    onPress={() => handleInputChange('newsletter', !formData.newsletter)}
                  >
                    {formData.newsletter && (
                      <Feather name="check" size={16} color={COLORS.primary} />
                    )}
                  </TouchableOpacity>
                  <Text style={styles.checkboxLabel}>
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

<<<<<<< Updated upstream
<<<<<<< Updated upstream
  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.secondary, "#6a6375"]}
      style={styles.container}
    >
      {/* Background Elements */}
      <View style={styles.backgroundElements}>
        <View style={[styles.floatingOrb, styles.orb1]} />
        <View style={[styles.floatingOrb, styles.orb2]} />
        <View style={[styles.geometricShape, styles.shape1]} />
        <View style={[styles.geometricShape, styles.shape2]} />
=======
  // ✅ WEB VERSION
  if (Platform.OS === "web") {
    return (
      <View className="flex flex-col h-screen bg-primary overflow-hidden">
=======
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
                          onPress={() => Alert.alert("Login", "Navigate to login")}
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
>>>>>>> Stashed changes
        <View className="absolute top-0 left-0 right-0 bottom-0">
          <View className="absolute w-[300px] h-[300px] rounded-full bg-accent opacity-10 top-[-150px] right-[-100px]" />
          <View className="absolute w-[200px] h-[200px] rounded-full bg-neutral opacity-10 bottom-[-100px] left-[-50px]" />
          <View className="absolute w-[100px] h-[100px] rounded-[25px] bg-secondary/30 border border-secondary/50 top-1/5 right-1/10 transform rotate-45" />
          <View className="absolute w-[80px] h-[80px] rounded-[20px] bg-secondary/30 border border-secondary/50 bottom-[15%] left-[5%] transform -rotate-30" />
        </View>

<<<<<<< Updated upstream
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
                        onPress={() => Alert.alert("Login", "Navigate to login")}
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
    );
  }

  // ✅ MOBILE APP VERSION
  return (
    <View className="flex-1" style={{ backgroundColor: COLORS.primary }}>
      <View className="absolute top-0 left-0 right-0 bottom-0">
        <View className="absolute w-[300px] h-[300px] rounded-full bg-accent opacity-10 top-[-150px] right-[-100px]" />
        <View className="absolute w-[200px] h-[200px] rounded-full bg-neutral opacity-10 bottom-[-100px] left-[-50px]" />
        <View className="absolute w-[100px] h-[100px] rounded-[25px] bg-secondary/30 border border-secondary/50 top-1/5 right-1/10 transform rotate-45" />
        <View className="absolute w-[80px] h-[80px] rounded-[20px] bg-secondary/30 border border-secondary/50 bottom-[15%] left-[5%] transform -rotate-30" />
>>>>>>> Stashed changes
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardAvoid}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View 
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            {/* Header Section */}
            <View style={styles.header}>
              <TouchableOpacity onPress={onBack} style={styles.backBtn}>
                <LinearGradient
                  colors={["rgba(250, 237, 38, 0.1)", "rgba(250, 237, 38, 0.05)"]}
                  style={styles.backBtnGradient}
                >
                  <Feather name="arrow-left" size={20} color={COLORS.accent} />
                  <Text style={styles.backText}>Back to Home</Text>
                </LinearGradient>
              </TouchableOpacity>

              <View style={styles.logoSection}>
                <View style={styles.logoIcon}>
                  <Feather name="trending-up" size={28} color={COLORS.accent} />
                </View>
                <Text style={styles.logoText}>
                  Share<Text style={styles.logoAccent}>Flow</Text>
                </Text>
              </View>
            </View>

            {/* Main Auth Container */}
            <View style={styles.mainContainer}>
              {/* Left Panel - Branding */}
              <View style={styles.brandingPanel}>
                <LinearGradient
                  colors={["rgba(70, 52, 78, 0.9)", "rgba(90, 85, 96, 0.85)"]}
                  style={styles.brandingGradient}
                >
                  <View style={styles.brandingContent}>
                    <View style={styles.brandingBadge}>
                      <Feather name="award" size={20} color={COLORS.accent} />
                      <Text style={styles.brandingBadgeText}>ENTERPRISE GRADE</Text>
                    </View>
                    
                    <Text style={styles.brandingTitle}>
                      Join 500+ Companies{"\n"}
                      <Text style={styles.brandingTitleAccent}>Managing Finances</Text>{"\n"}
                      with Confidence
                    </Text>
                    
                    <View style={styles.featuresList}>
                      <View style={styles.featureItem}>
                        <Feather name="check-circle" size={18} color={COLORS.accent} />
                        <Text style={styles.featureText}>Automated Expense Tracking</Text>
                      </View>
                      <View style={styles.featureItem}>
                        <Feather name="check-circle" size={18} color={COLORS.accent} />
                        <Text style={styles.featureText}>Seamless Payroll Management</Text>
                      </View>
                      <View style={styles.featureItem}>
                        <Feather name="check-circle" size={18} color={COLORS.accent} />
                        <Text style={styles.featureText}>Real-time Shareholder Insights</Text>
                      </View>
                      <View style={styles.featureItem}>
                        <Feather name="check-circle" size={18} color={COLORS.accent} />
                        <Text style={styles.featureText}>Bank-Grade Security</Text>
                      </View>
                    </View>

                    <View style={styles.statsContainer}>
                      <View style={styles.stat}>
                        <Text style={styles.statNumber}>99.7%</Text>
                        <Text style={styles.statLabel}>Uptime</Text>
                      </View>
                      <View style={styles.stat}>
                        <Text style={styles.statNumber}>256-bit</Text>
                        <Text style={styles.statLabel}>Encryption</Text>
                      </View>
                      <View style={styles.stat}>
                        <Text style={styles.statNumber}>24/7</Text>
                        <Text style={styles.statLabel}>Support</Text>
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              </View>

              {/* Right Panel - Registration Form */}
              <View style={styles.formPanel}>
                <LinearGradient
                  colors={["rgba(255, 255, 255, 0.95)", "rgba(255, 255, 255, 0.98)"]}
                  style={styles.formGradient}
                >
                  <View style={styles.formHeader}>
                    <View style={styles.formBadge}>
                      <Feather name="home" size={16} color={COLORS.accent} />
                      <Text style={styles.formBadgeText}>COMPANY REGISTRATION</Text>
                    </View>
                    
                    <Text style={styles.formTitle}>
                      Create Your Company Account
                    </Text>
                    
                    <Text style={styles.formSubtitle}>
                      Complete your company profile to get started with ShareFlow Enterprise
                    </Text>

                    {/* Step Indicator */}
                    {renderStepIndicator()}
                  </View>

                  {/* Step Content */}
                  <ScrollView 
                    style={styles.formContent}
                    showsVerticalScrollIndicator={false}
                  >
                    {renderStepContent()}
                  </ScrollView>

                  {/* Action Buttons */}
                  <View style={styles.actionButtons}>
                    {currentStep > 1 && (
                      <TouchableOpacity 
                        style={styles.secondaryButton}
                        onPress={handlePrevStep}
                      >
                        <Feather name="arrow-left" size={18} color={COLORS.primary} />
                        <Text style={styles.secondaryButtonText}>Previous</Text>
                      </TouchableOpacity>
                    )}
                    
                    <TouchableOpacity 
                      style={[
                        styles.primaryButton,
                        currentStep < 4 && styles.nextButton
                      ]}
                      onPress={currentStep < 4 ? handleNextStep : handleSubmit}
                      disabled={isLoading}
                    >
                      <LinearGradient
                        colors={[COLORS.accent, "#e6d422"]}
                        style={styles.primaryButtonGradient}
                      >
                        {isLoading ? (
                          <View style={styles.loadingContainer}>
                            <Feather name="loader" size={20} color={COLORS.primary} />
                            <Text style={styles.primaryButtonText}>
                              Processing...
                            </Text>
                          </View>
                        ) : (
                          <View style={styles.buttonContent}>
                            <Text style={styles.primaryButtonText}>
                              {currentStep < 4 ? 'Continue' : 'Complete Registration'}
                            </Text>
                            <Feather 
                              name={currentStep < 4 ? "arrow-right" : "check"} 
                              size={20} 
                              color={COLORS.primary} 
                            />
                          </View>
                        )}
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>

                  {/* Footer Note */}
                  <View style={styles.footerNote}>
                    <Text style={styles.footerText}>
                      Already have an account?{" "}
                      <Text 
                        style={styles.footerLink}
                        onPress={() => setIsLogin(true)}
                      >
                        Sign in here
=======
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
                          onPress={() => Alert.alert("Login", "Navigate to login")}
                        >
                          Sign in here
                        </Text>
>>>>>>> Stashed changes
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
<<<<<<< Updated upstream
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
<<<<<<< Updated upstream
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundElements: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  floatingOrb: {
    position: "absolute",
    borderRadius: 9999,
    opacity: 0.1,
  },
  orb1: {
    width: 300,
    height: 300,
    backgroundColor: COLORS.accent,
    top: -150,
    right: -100,
  },
  orb2: {
    width: 200,
    height: 200,
    backgroundColor: COLORS.neutral,
    bottom: -100,
    left: -50,
  },
  geometricShape: {
    position: "absolute",
    backgroundColor: `${COLORS.overlay}15`,
    borderWidth: 1,
    borderColor: `${COLORS.overlay}30`,
  },
  shape1: {
    width: 100,
    height: 100,
    borderRadius: 25,
    top: "20%",
    right: "10%",
    transform: [{ rotate: "45deg" }],
  },
  shape2: {
    width: 80,
    height: 80,
    borderRadius: 20,
    bottom: "15%",
    left: "5%",
    transform: [{ rotate: "-30deg" }],
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingVertical: 20,
  },
  header: {
    paddingHorizontal: isMobile ? 20 : 40,
    marginBottom: 20,
  },
  backBtn: {
    alignSelf: "flex-start",
    marginBottom: 20,
    borderRadius: 12,
    overflow: "hidden",
  },
  backBtnGradient: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(250, 237, 38, 0.2)",
  },
  backText: {
    color: COLORS.accent,
    fontSize: 15,
    fontWeight: "600",
  },
  logoSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    justifyContent: "center",
  },
  logoIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "rgba(250, 237, 38, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(250, 237, 38, 0.3)",
  },
  logoText: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.white,
    letterSpacing: -1,
  },
  logoAccent: {
    color: COLORS.accent,
  },
  mainContainer: {
    flex: 1,
    flexDirection: isMobile ? "column" : "row",
    paddingHorizontal: isMobile ? 20 : 40,
  },
  brandingPanel: {
    flex: 1,
    marginRight: isMobile ? 0 : 20,
    marginBottom: isMobile ? 20 : 0,
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 40,
    elevation: 20,
  },
  brandingGradient: {
    flex: 1,
    padding: 32,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  brandingContent: {
    flex: 1,
    justifyContent: "center",
  },
  brandingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(250, 237, 38, 0.12)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(250, 237, 38, 0.25)",
    marginBottom: 32,
    alignSelf: "flex-start",
  },
  brandingBadgeText: {
    color: COLORS.accent,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  brandingTitle: {
    fontSize: 36,
    fontWeight: "800",
    color: COLORS.white,
    lineHeight: 44,
    letterSpacing: -0.5,
    marginBottom: 32,
  },
  brandingTitleAccent: {
    color: COLORS.accent,
  },
  featuresList: {
    marginBottom: 40,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  featureText: {
    color: COLORS.tertiary,
    fontSize: 16,
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  stat: {
    alignItems: "center",
  },
  statNumber: {
    color: COLORS.accent,
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 4,
  },
  statLabel: {
    color: COLORS.tertiary,
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  formPanel: {
    flex: 1,
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 15,
  },
  formGradient: {
    flex: 1,
    padding: 32,
  },
  formHeader: {
    marginBottom: 24,
  },
  formBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(250, 237, 38, 0.1)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(250, 237, 38, 0.2)",
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  formBadgeText: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.primary,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  formSubtitle: {
    fontSize: 16,
    color: COLORS.secondary,
    marginBottom: 24,
    fontWeight: "500",
  },
  stepIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e2e8f0",
  },
  stepCircleActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: "700",
    color: "#64748b",
  },
  stepNumberActive: {
    color: COLORS.primary,
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#e2e8f0",
    marginHorizontal: 8,
  },
  stepLineActive: {
    backgroundColor: COLORS.accent,
  },
  formContent: {
    flex: 1,
    marginBottom: 24,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 15,
    color: COLORS.secondary,
    marginBottom: 24,
    fontWeight: "500",
  },
  formGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  inputGroup: {
    width: isMobile ? "100%" : "48%",
    marginBottom: 20,
  },
  fullWidth: {
    width: "100%",
  },
  inputLabel: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: COLORS.primary,
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
  },
  selectInput: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectText: {
    fontSize: 15,
    color: COLORS.primary,
  },
  passwordContainer: {
    position: "relative",
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeButton: {
    position: "absolute",
    right: 16,
    top: 14,
    padding: 4,
  },
  passwordHint: {
    fontSize: 12,
    color: COLORS.secondary,
    marginTop: 6,
    fontStyle: "italic",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: "#f8fafc",
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    color: COLORS.secondary,
    lineHeight: 20,
  },
  checkboxLink: {
    color: COLORS.accent,
    fontWeight: "600",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#f1f5f9",
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: "600",
  },
  primaryButton: {
    flex: 1,
    marginLeft: 12,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  nextButton: {
    flex: 0.5,
  },
  primaryButtonGradient: {
    paddingVertical: 14,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  primaryButtonText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: "700",
  },
  footerNote: {
    alignItems: "center",
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  footerText: {
    color: COLORS.secondary,
    fontSize: 14,
    textAlign: "center",
  },
  footerLink: {
    color: COLORS.accent,
    fontWeight: "700",
  },
});
=======
    </View>
  );
}
>>>>>>> Stashed changes
=======
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
>>>>>>> Stashed changes
