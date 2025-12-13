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
import { Check, Eye, EyeOff } from "lucide-react-native";

const Password: React.FC = () => {
  const navigation = useNavigation<any>();
  const screenWidth = Dimensions.get("window").width;
  const isMobile = screenWidth < 768;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [subscribeUpdates, setSubscribeUpdates] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-[#E8EDF5]">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 items-center justify-center px-4 py-8">
          {/* Outer Card */}
          <View
            className="bg-[#E6F0FF] rounded-3xl shadow-2xl p-4"
            style={{
              width: isMobile ? screenWidth - 20 : 800,
              minHeight: isMobile ? "auto" : 860,
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

              {/* Desktop Back Button */}
              {!isMobile && (
                <TouchableOpacity
                  className="absolute top-4 left-4 z-10"
                  onPress={() => navigation.goBack()}
                >
                  <LinearGradient
                    colors={["#FFC20E", "#FFD666"]}
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
              )}
            </View>

            {/* Mobile Back Button */}
            {isMobile && (
              <View className="w-full items-center mb-4">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <LinearGradient
                    colors={["#FFC20E", "#FFD666"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      width: 140,
                      height: 38,
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
              className="bg-white rounded-3xl shadow-2xl p-6"
              style={{
                width: isMobile ? "100%" : "90%",
                alignSelf: "center",
                minHeight: 680,
              }}
            >
              {/* Stepper */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 24,
                  paddingHorizontal: 4,
                }}
              >
                {[1, 2, 3, 4].map((step, idx) => (
                  <React.Fragment key={step}>
                    <View style={{ alignItems: "center" }}>
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
                    </View>
                    {/* Stepper Lines */}
                    {idx < 3 && (
                      <View
                        style={{
                          flex: 1,
                          height: 2,
                          backgroundColor: "#193288",
                          marginHorizontal: isMobile ? 4 : 6,
                        }}
                      />
                    )}
                  </React.Fragment>
                ))}
              </View>

              {/* Heading */}
              <Text className="font-extrabold text-[22px] text-[#193288] mb-2">
                Security & Preferences
              </Text>
              <Text className="text-gray-500 mb-8 font-medium">
                Set up your account security and preferences below
              </Text>

              {/* Password Fields */}
              <View className="space-y-6">
                <View>
                  <Text className="text-gray-800 font-semibold mb-2">
                    Password
                  </Text>
                  <View className="flex-row items-center bg-gray-200 rounded-lg px-4">
                    <TextInput
                      value={password}
                      onChangeText={setPassword}
                      placeholder="Enter your password"
                      placeholderTextColor="#6B7280"
                      secureTextEntry={!showPassword}
                      className="flex-1 h-12 text-black"
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </TouchableOpacity>
                  </View>
                </View>

                <View>
                  <Text className="text-gray-800 font-semibold mb-2">
                    Confirm Password
                  </Text>
                  <View className="flex-row items-center bg-gray-200 rounded-lg px-4">
                    <TextInput
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      placeholder="Re-enter your password"
                      placeholderTextColor="#6B7280"
                      secureTextEntry={!showConfirmPassword}
                      className="flex-1 h-12 text-black"
                    />
                    <TouchableOpacity
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </TouchableOpacity>
                  </View>
                  <Text className="text-gray-500 text-xs mt-1 italic">
                    Please make sure your password matches.
                  </Text>
                </View>
              </View>

              {/* Checkboxes */}
              <View className="mt-12 space-y-4">
                <TouchableOpacity
                  className="flex-row items-center"
                  onPress={() => setAgreeTerms(!agreeTerms)}
                >
                  <View
                    className={`w-5 h-5 rounded items-center justify-center mr-2 ${
                      agreeTerms ? "bg-[#FFC20E]" : "bg-white"
                    } border border-gray-500`}
                  >
                    {agreeTerms && <Check size={16} color="#193288" />}
                  </View>
                  <Text className="text-gray-800 text-sm font-medium">
                    I agree to the Terms of Service and Privacy Policy*
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-row items-center"
                  onPress={() => setSubscribeUpdates(!subscribeUpdates)}
                >
                  <View
                    className={`w-5 h-5 rounded items-center justify-center mr-2 ${
                      subscribeUpdates ? "bg-[#FFC20E]" : "bg-white"
                    } border border-gray-500`}
                  >
                    {subscribeUpdates && <Check size={16} color="#193288" />}
                  </View>
                  <Text className="text-gray-800 text-sm font-medium">
                    Send me product updates, security tips, and industry insights
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Buttons */}
              <View className="flex-row justify-between space-x-4 mt-6">
                <TouchableOpacity
                  className="flex-1 rounded-xl items-center justify-center"
                  style={{
                    height: isMobile ? 50 : 55,
                    backgroundColor: "#D1D5DB",
                  }}
                  onPress={() => navigation.goBack()}
                >
                  <Text className="text-gray-700 font-semibold text-base">
                    ← Previous
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-1 rounded-xl items-center justify-center"
                  style={{ height: isMobile ? 50 : 55 }}
                  onPress={() => navigation.navigate("Forgetpwd")}
                >
                  <LinearGradient
                    colors={["#FFC20E", "#FFD666"]}
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
                    <Text className="text-white font-bold text-base mr-2">
                      Complete
                    </Text>
                    <Check size={24} color="#ffffff" strokeWidth={3} />
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* Footer */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  flexWrap: "nowrap",
                  marginTop: 16,
                }}
              >
                <Text className="text-gray-500 text-sm">
                  Already have an Account?{" "}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text className="text-[#FFC20E] text-sm font-medium">
                    Sign in here
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Password;
