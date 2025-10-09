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
import { useNavigation } from "@react-navigation/native";
import { COLORS, WINDOW, isMobile } from "../constants/theme";

const { width, height } = WINDOW;

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
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Handle registration logic here
    }, 2000);
  };

  const handleBack = () => {
    navigation.goBack();
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
                <TextInput
                  placeholder="e.g., Corporation, LLC, Partnership"
                  placeholderTextColor={COLORS.tertiary + "80"}
                  style={styles.input}
                  value={formData.companyType}
                  onChangeText={(value) => handleInputChange('companyType', value)}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Industry *</Text>
                <TextInput
                  placeholder="e.g., Technology, Finance, Healthcare"
                  placeholderTextColor={COLORS.tertiary + "80"}
                  style={styles.input}
                  value={formData.industry}
                  onChangeText={(value) => handleInputChange('industry', value)}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Company Size *</Text>
                <TextInput
                  placeholder="e.g., 1-10, 11-50, 51-200"
                  placeholderTextColor={COLORS.tertiary + "80"}
                  style={styles.input}
                  value={formData.companySize}
                  onChangeText={(value) => handleInputChange('companySize', value)}
                />
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

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Registration Number</Text>
                <TextInput
                  placeholder="Business registration number"
                  placeholderTextColor={COLORS.tertiary + "80"}
                  style={styles.input}
                  value={formData.registrationNumber}
                  onChangeText={(value) => handleInputChange('registrationNumber', value)}
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
                <TextInput
                  placeholder="Enter country"
                  placeholderTextColor={COLORS.tertiary + "80"}
                  style={styles.input}
                  value={formData.country}
                  onChangeText={(value) => handleInputChange('country', value)}
                />
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
                <TextInput
                  placeholder="e.g., Finance, HR, Operations"
                  placeholderTextColor={COLORS.tertiary + "80"}
                  style={styles.input}
                  value={formData.department}
                  onChangeText={(value) => handleInputChange('department', value)}
                />
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
                      <Feather name="check" size={16} color={COLORS.white} />
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
                      <Feather name="check" size={16} color={COLORS.white} />
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

  return (
    <View style={styles.container}>
      {/* Background Elements */}
      <View style={styles.backgroundElements}>
        <View style={[styles.floatingOrb, styles.orb1]} />
        <View style={[styles.floatingOrb, styles.orb2]} />
        <View style={[styles.geometricShape, styles.shape1]} />
        <View style={[styles.geometricShape, styles.shape2]} />
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardAvoid}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView 
          style={styles.scrollView}
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
              <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
                <View style={styles.backBtnContent}>
                  <Feather name="arrow-left" size={20} color={COLORS.accent} />
                  <Text style={styles.backText}>Back to Home</Text>
                </View>
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
              </View>

              {/* Right Panel - Registration Form */}
              <View style={styles.formPanel}>
                <View style={styles.formContentContainer}>
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
                  <View style={styles.formContent}>
                    {renderStepContent()}
                  </View>

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
                      <View style={styles.primaryButtonContent}>
                        {isLoading ? (
                          <View style={styles.loadingContainer}>
                            <Feather name="loader" size={20} color={COLORS.white} />
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
                              color={COLORS.white} 
                            />
                          </View>
                        )}
                      </View>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
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
    backgroundColor: `${COLORS.secondary}30`,
    borderWidth: 1,
    borderColor: `${COLORS.secondary}50`,
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    minHeight: height,
  },
  header: {
    paddingHorizontal: isMobile ? 20 : 40,
    paddingTop: 20,
    marginBottom: 20,
  },
  backBtn: {
    alignSelf: "flex-start",
    marginBottom: 20,
    borderRadius: 12,
    overflow: "hidden",
  },
  backBtnContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(134, 194, 50, 0.3)",
    backgroundColor: "rgba(134, 194, 50, 0.1)",
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
    backgroundColor: "rgba(134, 194, 50, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(134, 194, 50, 0.3)",
  },
  logoText: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.textLight,
    letterSpacing: -1,
  },
  logoAccent: {
    color: COLORS.accent,
  },
  mainContainer: {
    flex: 1,
    flexDirection: isMobile ? "column" : "row",
    paddingHorizontal: isMobile ? 20 : 40,
    paddingBottom: 20,
  },
  brandingPanel: {
    flex: 1,
    marginRight: isMobile ? 0 : 20,
    marginBottom: isMobile ? 20 : 0,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: COLORS.secondary,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 40,
    elevation: 20,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  brandingContent: {
    flex: 1,
    padding: 32,
    justifyContent: "center",
  },
  brandingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(134, 194, 50, 0.12)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(134, 194, 50, 0.25)",
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
    color: COLORS.textLight,
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
    color: COLORS.textLight,
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
    color: COLORS.textLight,
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  formPanel: {
    flex: 1,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 15,
  },
  formContentContainer: {
    flex: 1,
    padding: 32,
    justifyContent: "space-between",
  },
  formHeader: {
    marginBottom: 24,
  },
  formBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(134, 194, 50, 0.1)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(134, 194, 50, 0.2)",
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
    color: COLORS.textDark,
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
    color: COLORS.white,
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
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.textDark,
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
    color: COLORS.textDark,
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
    color: COLORS.textDark,
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
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
    marginTop: 20,
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
    color: COLORS.textDark,
    fontSize: 15,
    fontWeight: "600",
  },
  primaryButton: {
    flex: 1,
    marginLeft: 12,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: COLORS.accent,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  nextButton: {
    flex: 0.5,
  },
  primaryButtonContent: {
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
    color: COLORS.white,
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