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
import { CheckCircle, RefreshCw, Shield, X } from "lucide-react-native";

const VerifyEmail: React.FC = () => {
  const navigation = useNavigation<any>();

  const [emailCode, setEmailCode] = useState(["", "", "", "", "", ""]);
  const [phoneCode, setPhoneCode] = useState(["", "", "", "", "", ""]);

  const handleCodeChange = (
    text: string,
    index: number,
    type: "email" | "phone"
  ) => {
    const newCode = type === "email" ? [...emailCode] : [...phoneCode];
    newCode[index] = text;
    type === "email" ? setEmailCode(newCode) : setPhoneCode(newCode);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#E8EDF5]">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 items-center justify-center px-6 py-12">
          {/* Outer Card */}
          <View
            className="bg-[#E3EDF9] rounded-3xl shadow-2xl p-4"
            style={{ width: 800, height: 960 }}
          >
            {/* Header */}
            <View className="flex-row items-center justify-center mb-6 w-full relative">
              <View className="flex-row items-center">
                <Image
                 source={require('../../assets/image.png')}
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
                height: 730,
              }}
            >
              {/* ✅ Green Cross Icon (Top Right) */}
              <TouchableOpacity
                className="absolute top-4 right-4 z-10"
                onPress={() => navigation.goBack()}
              >
                <X size={26} color="#28A745" />
              </TouchableOpacity>

              {/* Secure Verification Button */}
              <TouchableOpacity
                className="self-start mb-6 rounded-lg"
                style={{ height: 40, width: 180 }}
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
                  <Shield size={18} color="#fff" className="mr-2" />
                  <Text className="text-white font-semibold text-sm">
                    Secure Verification
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Verify Email Section */}
              <View className="mb-10">
                <Text className="text-xl font-bold text-gray-800 mb-1">
                  Verify Your Email
                </Text>
                <Text className="text-gray-500 text-sm mb-3">
                  Enter the 6-digit code sent to your Email
                </Text>
                <View className="h-[1px] bg-gray-300 mb-2" />
                <Text className="text-gray-500 text-sm mb-5">
                  Verification Code Sent
                </Text>

                {/* Email Code Inputs */}
                <View className="flex-row justify-center space-x-3">
                  {emailCode.map((digit, i) => (
                    <TextInput
                      key={i}
                      value={digit}
                      onChangeText={(text) =>
                        handleCodeChange(text.slice(-1), i, "email")
                      }
                      keyboardType="numeric"
                      maxLength={1}
                      className="bg-gray-200 text-center rounded-lg text-lg font-semibold text-gray-800"
                      style={{ width: 50, height: 50 }}
                    />
                  ))}
                </View>
              </View>

              {/* Verify Number Section */}
              <View>
                <Text className="text-xl font-bold text-gray-800 mb-1">
                  Verify Your Number
                </Text>
                <Text className="text-gray-500 text-sm mb-3">
                  Enter the 6-digit code sent to your Number
                </Text>
                <View className="h-[1px] bg-gray-300 mb-2" />
                <Text className="text-gray-500 text-sm mb-5">
                  Verification Code Sent
                </Text>

                {/* Number Code Inputs */}
                <View className="flex-row justify-center space-x-3 mb-8">
                  {phoneCode.map((digit, i) => (
                    <TextInput
                      key={i}
                      value={digit}
                      onChangeText={(text) =>
                        handleCodeChange(text.slice(-1), i, "phone")
                      }
                      keyboardType="numeric"
                      maxLength={1}
                      className="bg-gray-200 text-center rounded-lg text-lg font-semibold text-gray-800"
                      style={{ width: 50, height: 50 }}
                    />
                  ))}
                </View>

                {/* Timer */}
                <Text className="text-center text-gray-600 mb-8">
                  Code Expires in <Text className="font-semibold">0:59</Text>
                </Text>

                {/* Buttons */}
                <View className="flex-row justify-between">
                  {/* Resend Button */}
                  <TouchableOpacity
                    className="flex-1 mr-2 rounded-lg items-center justify-center bg-gray-300"
                    style={{ height: 50 }}
                  >
                    <View className="flex-row items-center space-x-2">
                      <RefreshCw size={18} color="#333" />
                      <Text className="text-gray-700 font-semibold">
                        Resend Code
                      </Text>
                    </View>
                  </TouchableOpacity>

                  {/* Verify Button */}
                  <TouchableOpacity
                    className="flex-1 ml-2 rounded-lg items-center justify-center"
                    style={{ height: 50 }}
                    onPress={() => navigation.navigate("Administrator")}
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
                        flexDirection: "row",
                      }}
                    >
                      <CheckCircle size={20} color="#fff" className="mr-2" />
                      <Text className="text-white font-bold">Verify</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerifyEmail;
