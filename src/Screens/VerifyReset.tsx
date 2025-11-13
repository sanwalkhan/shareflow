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
import { Lock, Eye, EyeOff } from "lucide-react-native";

const VerifyReset: React.FC = () => {
  const navigation = useNavigation<any>();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-[#E8EDF5]">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 items-center justify-center px-6 py-12">
          {/* Outer Card */}
          <View
            className="bg-[#E3EDF9] rounded-3xl shadow-2xl p-6"
            style={{ width: 800, minHeight: 1050 }}
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
              className="bg-white rounded-3xl shadow-2xl p-10 relative"
              style={{
                alignSelf: "center",
                width: "90%",
                minHeight: 900,
              }}
            >
              {/* Secure Reset Button */}
              <TouchableOpacity
                className="self-start mb-6 rounded-lg"
                style={{ height: 40, width: 190 }}
              >
                <LinearGradient
                  colors={["#2A2F50", "#28A745"]}
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
                    Secure Reset
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Main Heading */}
              <Text className="text-2xl font-bold text-gray-800 mb-2">
                Create A New Password
              </Text>
              <Text className="text-gray-600 text-base mb-6">
                Enter the verification code and create a new password
              </Text>

              {/* Stepper */}
              <View className="flex-row items-center mb-8">
                {/* Step 1 */}
                <LinearGradient
                  colors={["#2A2F50", "#28A745"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text className="text-white font-bold">1</Text>
                </LinearGradient>

                {/* Line */}
                <View
                  style={{
                    width: 120,
                    height: 2,
                    backgroundColor: "#9CA3AF",
                    marginLeft: 8,
                    marginRight: 8,
                  }}
                />

                {/* Step 2 */}
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#AEA2A2",
                  }}
                >
                  <Text className="text-white font-bold">2</Text>
                </View>
              </View>

              {/* Step Headings */}
              <Text className="text-lg font-bold text-gray-800 mb-2">
                Verify and Reset
              </Text>
              <Text className="text-gray-500 text-sm mb-6">
                Enter the 6-digit code sent to: Your registered email
              </Text>

              {/* Verification Code */}
              <Text className="text-sm font-bold text-gray-700 mb-2">
                Verification Code*
              </Text>
              <View className="flex-row justify-between mb-2">
                {code.map((c, i) => (
                  <TextInput
                    key={i}
                    value={c}
                    onChangeText={(text) => {
                      const newCode = [...code];
                      newCode[i] = text;
                      setCode(newCode);
                    }}
                    className="bg-gray-200 rounded-lg text-center text-lg"
                    style={{ width: 50, height: 50 }}
                    keyboardType="number-pad"
                    maxLength={1}
                  />
                ))}
              </View>

              {/* Subtexts below boxes */}
              <View className="flex-row justify-between mb-6">
                <Text className="text-gray-500 text-xs">Code expires in 0:59</Text>
                <Text className="text-gray-500 text-xs">Resend (0:59)</Text>
              </View>

              {/* New Password Field */}
              <Text className="text-sm font-bold text-gray-700 mb-2">
                New Password*
              </Text>
              <View className="flex-row items-center bg-gray-200 rounded-lg px-4 py-0 mb-1">
                <TextInput
                  value={newPassword}
                  onChangeText={setNewPassword}
                  placeholder="Enter new password"
                  secureTextEntry={!showPassword}
                  className="flex-1 py-3 text-base"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </TouchableOpacity>
              </View>
              <Text className="text-gray-500 text-xs mb-6">
                Must be at least 8 characters with uppercase, lowercase, and numbers
              </Text>

              {/* Confirm New Password */}
              <Text className="text-sm font-bold text-gray-700 mb-2">
                Confirm New Password*
              </Text>
              <View className="flex-row items-center bg-gray-200 rounded-lg px-4 py-0 mb-6">
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm new password"
                  secureTextEntry={!showConfirmPassword}
                  className="flex-1 py-3 text-base"
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </TouchableOpacity>
              </View>

              {/* Reset Password Button */}
              <TouchableOpacity
                className="rounded-xl items-center justify-center mt-4"
                style={{ height: 55 }}
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
                  <Lock size={18} color="#fff" />
                  <Text className="text-white font-bold text-base ml-2">
                    Reset Password
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Security Notice Box */}
              <View
                className="rounded-xl p-5 mt-8 border border-[#28A745]"
                style={{
                  width: "95%", // increased width
                  alignSelf: "center",
                  backgroundColor: "rgba(178, 175, 175, 0.5)",
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

export default VerifyReset;
