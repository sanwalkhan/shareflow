import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Lock, Send, X } from "lucide-react-native";
import { COLORS } from "../../Constants/theme";

const ForgetPwd: React.FC = () => {
  const navigation = useNavigation<any>();
  const screenWidth = Dimensions.get("window").width;
  const isMobile = screenWidth < 768;

  const [email, setEmail] = useState("");

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: "#E8EDF5" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 items-center justify-center px-4 py-8">
          {/* Outer Card */}
          <View
            className="rounded-3xl shadow-2xl p-4"
            style={{
              width: isMobile ? screenWidth - 20 : 800,
              minHeight: isMobile ? "auto" : 1050,
              backgroundColor: "#E6F0FF",
            }}
          >
            {/* Header */}
            <View className="flex-row items-center justify-center mb-4 w-full relative">
              <View className="flex-row items-center">
                <Image
                  source={require("../../assets/image.png")}
                  className="w-10 h-10 mr-2"
                  style={{ marginTop: isMobile ? 10 : 60 }}
                />
                <Text
                  className="text-2xl font-bold"
                  style={{ marginTop: isMobile ? 10 : 60, color: "#193288" }}
                >
                  ShareFlow
                </Text>
              </View>
            </View>

            {/* Back Button below ShareFlow for mobile */}
            {isMobile && (
              <View className="w-full items-center mb-4">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <LinearGradient
                    colors={[COLORS.button, COLORS.button]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      width: 160,
                      height: 40,
                      borderRadius: 12,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text className="text-white font-bold text-sm">
                      ← Back To Home
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}

            {/* Inner Card */}
            <View
              className="rounded-3xl shadow-2xl p-6 relative"
              style={{
                alignSelf: "center",
                width: "90%",
                minHeight: isMobile ? 700 : 800,
                backgroundColor: "#FFFFFF",
              }}
            >
              {/* Close Icon */}
              <TouchableOpacity
                className="absolute top-4 right-4 z-10"
                onPress={() => navigation.goBack()}
              >
                <X size={26} color="#28A745" />
              </TouchableOpacity>

              {/* Password Recovery Button */}
              <TouchableOpacity
                className="self-start mb-6 rounded-lg"
                style={{
                  height: 40,
                  width: isMobile ? 160 : 190,
                }}
              >
                <LinearGradient
                  colors={[COLORS.button, COLORS.button]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Lock size={18} color="#fff" />
                  <Text className="text-white font-semibold text-sm ml-2">
                    Password Recovery
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Main Heading */}
              <Text
                className="text-2xl font-bold mb-2"
                style={{ color: "#193288" }}
              >
                Forget Password?
              </Text>
              <Text className="text-gray-500 text-base mb-6">
                We’ll help you reset password and secure your account.
              </Text>

              {/* Step Section */}
              <View className="mb-8">
                <View className="flex-row items-center justify-center mb-4">
                  {[1, 2].map((step) => (
                    <React.Fragment key={step}>
                      {step === 1 ? (
                        <LinearGradient
                          colors={["#193288", "#FFC20E"]}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          style={{
                            width: isMobile ? 32 : 40,
                            height: isMobile ? 32 : 40,
                            borderRadius: 20,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: "#FFFFFF",
                              fontWeight: "bold",
                              fontSize: isMobile ? 12 : 14,
                            }}
                          >
                            {step}
                          </Text>
                        </LinearGradient>
                      ) : (
                        <View
                          style={{
                            width: isMobile ? 32 : 40,
                            height: isMobile ? 32 : 40,
                            borderRadius: 20,
                            backgroundColor: "#FFFFFF",
                            borderWidth: 2,
                            borderColor: "#9CA3AF",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: "#9CA3AF",
                              fontWeight: "bold",
                              fontSize: isMobile ? 12 : 14,
                            }}
                          >
                            {step}
                          </Text>
                        </View>
                      )}
                      {/* Line between steps */}
{step < 2 && (
  <View
    style={{
      width: 80, // fixed width for both mobile and desktop
      height: 2,
      backgroundColor: step === 1 ? "#193288" : "#9CA3AF",
      marginHorizontal: 4,
      marginTop: 18,
    }}
  />
)}

                    </React.Fragment>
                  ))}
                </View>

                {/* Step Headings */}
                <Text
                  className="text-lg font-bold text-gray-800 mb-2"
                  style={{ color: "#193288" }}
                >
                  Reset Your Password
                </Text>
                <Text className="text-gray-500 text-sm mb-6">
                  Enter your work email address. We’ll send you a verification
                  code to reset your password.
                </Text>

                {/* Email Field */}
                <View className="mb-6">
                  <Text className="text-sm font-medium text-gray-700 mb-2">
                    Work Email
                  </Text>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your work email"
                    className="bg-gray-200 rounded-xl px-4 py-3 text-base"
                  />
                </View>

                {/* Send Verification Code Button */}
                <TouchableOpacity
                  className="rounded-xl items-center justify-center mt-4"
                  style={{ height: isMobile ? 50 : 55 }}
                  onPress={() => navigation.navigate("VerifyReset")}
                >
                  <LinearGradient
                    colors={[COLORS.button, COLORS.button]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 14,
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Send size={18} color="#fff" />
                    <Text className="text-white font-bold text-base ml-2">
                      Send Verification Code
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* Security Notice Box */}
              <View
                className="rounded-xl p-4 mt-6 border"
                style={{
                  width: isMobile ? "100%" : 460,
                  alignSelf: "center",
                  backgroundColor: "#E6F0FF",
                  borderColor: "#193288",
                }}
              >
                <Text className="text-lg font-semibold text-gray-800 mb-1">
                  Security Notice
                </Text>
                <Text className="text-gray-700 text-sm leading-5">
                  For your security, the verification code will expire in 10
                  minutes. Make sure to create a strong, unique password that
                  you haven’t used before.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgetPwd;
