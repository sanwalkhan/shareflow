import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Lock, Send, X } from "lucide-react-native";
import { COLORS } from "../../Constants/theme";

const ForgetPwd: React.FC = () => {
  const navigation = useNavigation<any>();
  const { width: screenWidth } = useWindowDimensions(); // dynamically track width

  const [email, setEmail] = useState("");

  // Responsive layout logic
  const isMobile = screenWidth < 768; // narrow screens
  const outerCardWidth = Math.min(Math.max(360, screenWidth - 40), 800); // min 360, max 800
  const innerCardWidth = Math.min(outerCardWidth - 20, 600);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E8EDF5" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingVertical: 24 }}>
          {/* Outer Card */}
          <View
            style={{
              width: outerCardWidth,
              backgroundColor: "#E6F0FF",
              borderRadius: 24,
              padding: isMobile ? 16 : 24,
              minHeight: isMobile ? "auto" : 820,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 10,
              elevation: 8,
            }}
          >
            {/* Header */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center", // vertical center
                justifyContent: "center",
                marginBottom: 16,
                paddingTop: isMobile ? 8 : 60,
              }}
            >
              <Image
                source={require("../../assets/image.png")}
                style={{ width: 40, height: 40, marginRight: 8 }}
              />
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: "#193288",
                  lineHeight: 40, // match logo height for perfect alignment
                }}
              >
                ShareFlow
              </Text>
            </View>

            {/* Back Button for Mobile Only */}
            {isMobile && (
              <View style={{ width: "100%", alignItems: "center", marginBottom: 16 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <LinearGradient
                    colors={[COLORS.button, COLORS.button]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ width: 160, height: 40, borderRadius: 12, justifyContent: "center", alignItems: "center" }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}>← Back To Home</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}

            {/* Inner Card */}
            <View
              style={{
                width: "100%",
                maxWidth: innerCardWidth,
                alignSelf: "center",
                backgroundColor: "#fff",
                borderRadius: 24,
                padding: isMobile ? 16 : 24,
                minHeight: 700,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
                elevation: 8,
              }}
            >
              {/* Close Icon */}
              <TouchableOpacity
                style={{ position: "absolute", top: 16, right: 16, zIndex: 10 }}
                onPress={() => navigation.goBack()}
              >
                <X size={26} color="#28A745" />
              </TouchableOpacity>

              {/* Password Recovery Button */}
              <TouchableOpacity
                style={{ height: 40, width: isMobile ? 160 : 190, marginBottom: 16, borderRadius: 10, overflow: "hidden" }}
              >
                <LinearGradient
                  colors={[COLORS.button, COLORS.button]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: "row" }}
                >
                  <Lock size={18} color="#fff" />
                  <Text style={{ color: "#fff", fontWeight: "600", marginLeft: 6 }}>Password Recovery</Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Heading */}
              <Text style={{ fontSize: 22, fontWeight: "bold", color: "#193288", marginBottom: 4 }}>Forget Password?</Text>
              <Text style={{ fontSize: 14, color: "#6B7280", marginBottom: 16 }}>
                We’ll help you reset password and secure your account.
              </Text>

              {/* Stepper */}
              <View style={{ marginBottom: 24, alignItems: "center" }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                  {[1, 2].map((step, idx) => {
                    const circleSize = isMobile ? 32 : 40;

                    return (
                      <React.Fragment key={step}>
                        {/* Circle */}
                        <View style={{ width: circleSize, height: circleSize, borderRadius: circleSize / 2, justifyContent: "center", alignItems: "center" }}>
                          {step === 1 ? (
                            <LinearGradient
                              colors={["#193288", "#FFC20E"]}
                              start={{ x: 0, y: 0 }}
                              end={{ x: 1, y: 1 }}
                              style={{ width: circleSize, height: circleSize, borderRadius: circleSize / 2, justifyContent: "center", alignItems: "center" }}
                            >
                              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: isMobile ? 12 : 14 }}>{step}</Text>
                            </LinearGradient>
                          ) : (
                            <View style={{ width: circleSize, height: circleSize, borderRadius: circleSize / 2, borderWidth: 2, borderColor: "#9CA3AF", backgroundColor: "#fff", justifyContent: "center", alignItems: "center" }}>
                              <Text style={{ color: "#9CA3AF", fontWeight: "bold", fontSize: isMobile ? 12 : 14 }}>{step}</Text>
                            </View>
                          )}
                        </View>

                        {/* Line between steps */}
                        {idx < 1 && (
                          <View
                            style={{
                              width: 50,
                              height: 2,
                              backgroundColor: "#193288",
                              marginHorizontal: 6,
                              alignSelf: "center",
                            }}
                          />
                        )}
                      </React.Fragment>
                    );
                  })}
                </View>

                {/* Step Labels */}
                <Text style={{ fontSize: 16, fontWeight: "600", color: "#193288", marginBottom: 4 }}>Reset Your Password</Text>
                <Text style={{ fontSize: 14, color: "#6B7280", marginBottom: 16, textAlign: "center" }}>
                  Enter your work email address. We’ll send you a verification code to reset your password.
                </Text>
              </View>

              {/* Email Field */}
              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 14, fontWeight: "500", color: "#374151", marginBottom: 4 }}>Work Email</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your work email"
                  style={{ backgroundColor: "#E5E7EB", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14 }}
                />
              </View>

              {/* Send Verification Code Button */}
              <TouchableOpacity
                style={{ height: isMobile ? 50 : 55, borderRadius: 14, overflow: "hidden", marginBottom: 16 }}
                onPress={() => navigation.navigate("VerifyReset")}
              >
                <LinearGradient
                  colors={[COLORS.button, COLORS.button]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: "row" }}
                >
                  <Send size={18} color="#fff" />
                  <Text style={{ color: "#fff", fontWeight: "bold", marginLeft: 6 }}>Send Verification Code</Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Security Notice Box */}
              <View style={{ backgroundColor: "#E6F0FF", borderColor: "#193288", borderWidth: 1, borderRadius: 12, padding: 12, width: "100%", maxWidth: 460, alignSelf: "center" }}>
                <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 4 }}>Security Notice</Text>
                <Text style={{ fontSize: 14, lineHeight: 20 }}>
                  For your security, the verification code will expire in 10 minutes. Make sure to create a strong, unique password that you haven’t used before.
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
