import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const SignupScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Company Information
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");

  // Step 2: Contact Details
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");

  // Step 3: Administrator Details
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [adminEmail, setAdminEmail] = useState("");

  // Step 4: Security & Preferences
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [productUpdates, setProductUpdates] = useState(false);

  // OTP Verification (Separate from main steps)
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [showOtpVerification, setShowOtpVerification] = useState(false);

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // After completing step 4, show OTP verification
      setShowOtpVerification(true);
    }
  };

  const prevStep = () => {
    if (showOtpVerification) {
      setShowOtpVerification(false);
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  const handleVerify = () => {
    // Handle OTP verification logic here
    navigation.navigate("Login");
  };

  const renderMainStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <Text className="text-xl font-bold mb-2 text-center text-gray-800">
              Company Information
            </Text>
            <Text className="text-sm text-gray-500 mb-6 text-center">
              Tell us about your organization
            </Text>

            <View className="mb-4">
              <Text className="text-sm font-bold text-gray-700 mb-1">
                Company Name*
              </Text>
              <TextInput
                value={companyName}
                onChangeText={setCompanyName}
                placeholder="Enter your company name"
                className="bg-gray-200 rounded-lg px-4 py-3"
              />
            </View>

            <View className="mb-4">
              <Text className="text-sm font-bold text-gray-700 mb-1">
                Industry*
              </Text>
              <TextInput
                value={industry}
                onChangeText={setIndustry}
                placeholder="Select industry"
                className="bg-gray-200 rounded-lg px-4 py-3"
              />
            </View>

            <View className="mb-4">
              <Text className="text-sm font-bold text-gray-700 mb-1">
                Company Size*
              </Text>
              <TextInput
                value={companySize}
                onChangeText={setCompanySize}
                placeholder="Number of employees"
                className="bg-gray-200 rounded-lg px-4 py-3"
              />
            </View>

            <View className="mb-6">
              <Text className="text-sm font-bold text-gray-700 mb-1">
                Registration Number*
              </Text>
              <TextInput
                placeholder="Enter registration number"
                className="bg-gray-200 rounded-lg px-4 py-3"
              />
            </View>
          </>
        );

      case 2:
        return (
          <>
            <Text className="text-xl font-bold mb-2 text-center text-gray-800">
              Contact Details
            </Text>
            <Text className="text-sm text-gray-500 mb-6 text-center">
              Where can we reach your company?
            </Text>

            <View className="mb-4">
              <Text className="text-sm font-bold text-gray-700 mb-1">
                Business Email
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="contact@company.com"
                className="bg-gray-200 rounded-lg px-4 py-3"
              />
            </View>

            <View className="mb-4">
              <Text className="text-sm font-bold text-gray-700 mb-1">
                Phone Number
              </Text>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="+1 (123) 456-7890"
                className="bg-gray-200 rounded-lg px-4 py-3"
              />
            </View>

            <View className="mb-4">
              <Text className="text-sm font-bold text-gray-700 mb-1">
                Street Address
              </Text>
              <TextInput
                value={street}
                onChangeText={setStreet}
                placeholder="Enter company headquarters"
                className="bg-gray-200 rounded-lg px-4 py-3"
              />
            </View>

            <View className="flex-row mb-4">
              <View className="flex-1 mr-2">
                <Text className="text-sm font-bold text-gray-700 mb-1">City</Text>
                <TextInput
                  value={city}
                  onChangeText={setCity}
                  placeholder="City"
                  className="bg-gray-200 rounded-lg px-4 py-3"
                />
              </View>
              <View className="flex-1 ml-2">
                <Text className="text-sm font-bold text-gray-700 mb-1">Postal Code</Text>
                <TextInput
                  value={postalCode}
                  onChangeText={setPostalCode}
                  placeholder="ZIP/Postal Code"
                  className="bg-gray-200 rounded-lg px-4 py-3"
                />
              </View>
            </View>

            <View className="mb-6">
              <Text className="text-sm font-bold text-gray-700 mb-1">Country</Text>
              <TextInput
                value={country}
                onChangeText={setCountry}
                placeholder="Enter Country"
                className="bg-gray-200 rounded-lg px-4 py-3"
              />
            </View>
          </>
        );

      case 3:
        return (
          <>
            <Text className="text-xl font-bold mb-2 text-center text-gray-800">
              Administrator Details
            </Text>
            <Text className="text-sm text-gray-500 mb-6 text-center">
              Primary account administrator information
            </Text>

            <View className="mb-4">
              <Text className="text-sm font-bold text-gray-700 mb-1">
                First Name*
              </Text>
              <TextInput
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Enter First Name"
                className="bg-gray-200 rounded-lg px-4 py-3"
              />
            </View>

            <View className="mb-4">
              <Text className="text-sm font-bold text-gray-700 mb-1">
                Last Name*
              </Text>
              <TextInput
                value={lastName}
                onChangeText={setLastName}
                placeholder="Enter Last Name"
                className="bg-gray-200 rounded-lg px-4 py-3"
              />
            </View>

            <View className="mb-4">
              <Text className="text-sm font-bold text-gray-700 mb-1">
                Job Title*
              </Text>
              <TextInput
                value={jobTitle}
                onChangeText={setJobTitle}
                placeholder="Enter Job Title"
                className="bg-gray-200 rounded-lg px-4 py-3"
              />
            </View>

            <View className="mb-6">
              <Text className="text-sm font-bold text-gray-700 mb-1">
                Admin Email*
              </Text>
              <TextInput
                value={adminEmail}
                onChangeText={setAdminEmail}
                placeholder="admin@company.com"
                className="bg-gray-200 rounded-lg px-4 py-3"
              />
            </View>
          </>
        );

      case 4:
        return (
          <>
            <Text className="text-xl font-bold mb-2 text-center text-gray-800">
              Security & Preferences
            </Text>
            <Text className="text-sm text-gray-500 mb-6 text-center">
              Set up your account security
            </Text>

            <View className="mb-4">
              <Text className="text-sm font-bold text-gray-700 mb-1">
                Password*
              </Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Create a strong password"
                secureTextEntry
                className="bg-gray-200 rounded-lg px-4 py-3"
              />
            </View>

            <View className="mb-6">
              <Text className="text-sm font-bold text-gray-700 mb-1">
                Confirm Password*
              </Text>
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm your password"
                secureTextEntry
                className="bg-gray-200 rounded-lg px-4 py-3"
              />
            </View>

            <View className="mb-4 flex-row items-center">
              <TouchableOpacity 
                className="mr-2"
                onPress={() => setAgreeToTerms(!agreeToTerms)}
              >
                <View className={`w-5 h-5 border rounded ${agreeToTerms ? 'bg-green-500 border-green-500' : 'border-gray-400'}`}>
                  {agreeToTerms && (
                    <Text className="text-white text-center text-xs">✓</Text>
                  )}
                </View>
              </TouchableOpacity>
              <Text className="text-sm text-gray-700 flex-1">
                I agree to the Terms of Service and Privacy Policy*
              </Text>
            </View>

            <View className="mb-6 flex-row items-center">
              <TouchableOpacity 
                className="mr-2"
                onPress={() => setProductUpdates(!productUpdates)}
              >
                <View className={`w-5 h-5 border rounded ${productUpdates ? 'bg-green-500 border-green-500' : 'border-gray-400'}`}>
                  {productUpdates && (
                    <Text className="text-white text-center text-xs">✓</Text>
                  )}
                </View>
              </TouchableOpacity>
              <Text className="text-sm text-gray-700 flex-1">
                Send me product updates, security tips, and industry insights
              </Text>
            </View>
          </>
        );

      default:
        return null;
    }
  };

  const renderOtpVerification = () => {
    return (
      <>
        <Text className="text-xl font-bold mb-2 text-center text-gray-800">
          Verify Your Email
        </Text>
        <Text className="text-sm text-gray-500 mb-6 text-center">
          Enter the 8-digit code sent to your email
        </Text>

        <View className="mb-8">
          <Text className="text-sm font-bold text-gray-700 mb-4 text-center">
            Verification Code
          </Text>
          
          <View className="flex-row justify-between mb-4">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                placeholder="0"
                keyboardType="numeric"
                maxLength={1}
                className="w-10 h-12 bg-gray-200 rounded-lg text-center text-lg font-bold"
              />
            ))}
          </View>
          
          <Text className="text-sm text-gray-500 text-center">
            Code expires in: 05:00
          </Text>
        </View>

        <View className="flex-row justify-between mt-4">
          <TouchableOpacity
            className="flex-1 mr-2 rounded-lg items-center justify-center"
            style={{ height: 50, backgroundColor: "#D1D5DB" }}
            onPress={() => setShowOtpVerification(false)}
          >
            <Text className="text-gray-700 font-bold">Verify Later</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 ml-2 rounded-lg items-center justify-center"
            style={{ height: 50 }}
            onPress={handleVerify}
          >
            <LinearGradient
              colors={["#2A2F50", "#28A745"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 12.77,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text className="text-white font-bold">Verify</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const renderProgressStepper = () => {
    const steps = [1, 2, 3, 4];
    
    return (
      <View className="flex-row items-center justify-between mb-6 w-full px-4">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            {/* Step Circle */}
            <View className="items-center">
              {step <= currentStep ? (
                <LinearGradient
                  colors={["#2A2F50", "#28A745"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text className="text-white font-bold text-lg">{step}</Text>
                </LinearGradient>
              ) : (
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "#FFFFFF",
                    borderWidth: 2,
                    borderColor: "#9CA3AF",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text className="text-gray-500 font-bold text-lg">{step}</Text>
                </View>
              )}
            </View>

            {/* Line between steps (don't render after last step) */}
            {index < steps.length - 1 && (
              <View
                style={{
                  width: 100,
                  height: 2,
                  backgroundColor: step < currentStep ? "#2A2F50" : "#9CA3AF",
                  marginTop: 19,
                }}
              />
            )}
          </React.Fragment>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#E8EDF5]">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 items-center justify-center px-6 py-12">
          {/* Outer Card */}
          <View
            className="bg-[#E3EDF9] rounded-3xl shadow-2xl p-4"
            style={{ width: 800, height: 1050 }}
          >
            {/* Top Bar */}
            <View className="flex-row items-center justify-center mb-6 w-full relative">
              <View className="flex-row items-center">
                <Image
                  source={require('../../assets/image.png')}
                  className="w-10 h-10 mr-2"
                  style={{ marginTop: 60 }}
                />
                <Text className="text-2xl font-bold text-gray-800" style={{ marginTop: 60 }}>
                  ShareFlow
                </Text>
              </View>

              {/* Back Button */}
              <TouchableOpacity
                className="absolute top-4 left-4 z-10"
                onPress={prevStep}
              >
                <LinearGradient
                  colors={["#2A2F50", "#28A745"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    width: 183,
                    height: 41,
                    borderRadius: 12.77,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text className="text-white font-bold">← Back</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Inner Card */}
            <View className="bg-white rounded-3xl shadow-2xl p-6" style={{ alignSelf: "center", width: "90%" }}>
              
              {/* Progress Stepper - Only show for main steps, not OTP */}
              {!showOtpVerification && renderProgressStepper()}

              {/* Step Content */}
              {showOtpVerification ? renderOtpVerification() : renderMainStepContent()}

              {/* Buttons - Only show for main steps, not OTP */}
              {!showOtpVerification && (
                <>
                  <View className="flex-row justify-between mt-2">
                    <TouchableOpacity
                      className="flex-1 mr-2 rounded-lg items-center justify-center"
                      style={{ height: 50, backgroundColor: "#D1D5DB" }}
                      onPress={prevStep}
                    >
                      <Text className="text-gray-700 font-bold">← Previous</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      className="flex-1 ml-2 rounded-lg items-center justify-center"
                      style={{ height: 50 }}
                      onPress={nextStep}
                    >
                      <LinearGradient
                        colors={["#2A2F50", "#28A745"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 12.77,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text className="text-white font-bold">
                          {currentStep === 4 ? "Complete →" : "Next →"}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>

                  {/* Horizontal Line */}
                  <View
                    style={{
                      height: 3,
                      backgroundColor: "#000000",
                      width: "90%",
                      alignSelf: "center",
                      marginVertical: 20,
                      marginTop: 28,
                    }}
                  />
                  
                  {/* Already Have Account */}
                  <View className="flex-row justify-center mt-4">
                    <Text className="text-sm text-gray-500">
                      Already have an Account?{" "}
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                      <Text className="text-sm text-green-600 font-medium">Sign in here</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupScreen;