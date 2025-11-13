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
import { Check, Eye, EyeOff } from "lucide-react-native";

const Password: React.FC = () => {
  const navigation = useNavigation<any>();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [subscribeUpdates, setSubscribeUpdates] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-[#E8EDF5]">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 items-center justify-center px-6 py-12">
          {/* Outer Card */}
          <View
            className="bg-[#E3EDF9] rounded-3xl shadow-2xl p-6"
            style={{ width: 800, minHeight: 960 }}
          >
            {/* Header */}
            <View className="flex-row items-center justify-center mb-8 w-full relative">
              <View className="flex-row items-center">
                <Image
                  source={require("../assets/image.png")}
                  className="w-10 h-10 mr-2"
                  style={{ marginTop: 60 }}
                />
                <Text
                  className="text-2xl font-bold text-gray-800"
                  style={{ marginTop: 60 }}
                >
                  ShareFlow
                </Text>
              </View>

              {/* Back Button */}
              <TouchableOpacity
                className="absolute top-4 left-4 z-10"
                onPress={() => navigation.goBack()}
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
                  <Text className="text-white font-bold">← Back To Home</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Inner Card */}
            <View
              className="bg-white rounded-3xl shadow-2xl p-8"
              style={{
                alignSelf: "center",
                width: "90%",
                minHeight: 780,
              }}
            >
              {/* Stepper */}
              <View className="flex-row items-center justify-between mb-10 w-full px-4">
                {[1, 2, 3, 4].map((step, index) => (
                  <React.Fragment key={index}>
                    <View className="items-center">
                      <LinearGradient
                        colors={
                          step <= 2 ? ["#2A2F50", "#28A745"] : ["#FFFFFF", "#FFFFFF"]
                        }
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                          justifyContent: "center",
                          alignItems: "center",
                          borderWidth: step > 2 ? 2 : 0,
                          borderColor: step > 2 ? "#9CA3AF" : "transparent",
                        }}
                      >
                        <Text
                          className={`font-bold text-lg ${
                            step <= 2 ? "text-white" : "text-gray-500"
                          }`}
                        >
                          {step}
                        </Text>
                      </LinearGradient>
                    </View>
                    {step < 4 && (
                      <View
                        style={{
                          flex: 1,
                          height: 3,
                          backgroundColor: "#9CA3AF",
                          marginHorizontal: 6,
                          marginTop: 19,
                          width: 30,
                        }}
                      />
                    )}
                  </React.Fragment>
                ))}
              </View>

              {/* Heading */}
              <View className="flex-row justify-between mb-4">
                <Text
                  className="text-black font-bold"
                  style={{
                    width: 253,
                    height: 26,
                    fontSize: 22,
                    fontWeight: "700",
                    fontFamily: "Poppins",
                  }}
                >
                  Security & Preferences
                </Text>
              </View>
              <Text className="text-black text-sm font-semibold mb-8">
                Set up your account security...
              </Text>

              {/* Password Fields */}
              <View className="space-y-6">
                <View>
                  <Text className="text-base font-bold text-gray-800 mb-2">
                    Password
                  </Text>
                  <View className="flex-row items-center bg-gray-100 rounded-lg px-4 shadow-sm border border-gray-200">
                    <TextInput
                      value={password}
                      onChangeText={setPassword}
                      placeholder="Enter your password"
                      placeholderTextColor="#6B7280"
                      secureTextEntry={!showPassword}
                      className="flex-1 h-12 text-gray-900"
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </TouchableOpacity>
                  </View>
                </View>

                <View>
                  <Text className="text-base font-bold text-gray-800 mb-2">
                    Confirm Password
                  </Text>
                  <View className="flex-row items-center bg-gray-100 rounded-lg px-4 shadow-sm border border-gray-200">
                    <TextInput
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      placeholder="Re-enter your password"
                      placeholderTextColor="#6B7280"
                      secureTextEntry={!showConfirmPassword}
                      className="flex-1 h-12 text-gray-900"
                    />
                    <TouchableOpacity
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </TouchableOpacity>
                  </View>
                  <Text className="text-black text-xs mt-1 italic">
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
                    className={`w-5 h-5 rounded border border-gray-500 items-center justify-center mr-2 ${
                      agreeTerms ? "bg-[#28A745]" : "bg-white"
                    }`}
                  >
                    {agreeTerms && <Check size={16} color="#fff" />}
                  </View>
                  <Text className="text-black text-sm font-semibold">
                    I agree to the Terms of Service and Privacy Policy*
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-row items-center"
                  onPress={() => setSubscribeUpdates(!subscribeUpdates)}
                >
                  <View className={`w-5 h-5 rounded bg-[#28A745] items-center justify-center mr-2`}>
                    {subscribeUpdates && <Check size={16} color="#000" />}
                  </View>
                  <Text className="text-black text-sm font-semibold">
                    Send me product updates, security tips, and industry insights
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Buttons */}
              <View className="flex-row justify-between space-x-6 mt-16">
                <TouchableOpacity
                  className="flex-1 rounded-xl items-center justify-center"
                  style={{ height: 55, backgroundColor: "#D1D5DB" }}
                  onPress={() => navigation.goBack()}
                >
                  <Text className="text-gray-700 font-bold text-base">← Previous</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-1 rounded-xl items-center justify-center"
                  style={{ height: 55 }}
                  onPress={() => navigation.navigate("Forgetpwd")}
                >
                  <LinearGradient
                    colors={["#2A2F50", "#28A745"]}
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
                    <Check size={24} color="#fff" strokeWidth={3} />
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* Divider & Footer */}
              <View className="border-t border-gray-300 mt-14 pt-4">
                <Text className="text-center text-sm text-gray-500">
                  Already have an Account?{" "}
                  <Text className="text-green-600 font-medium">Sign in here</Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Password;
