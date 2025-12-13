// LoginScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { Eye, EyeOff, LogIn, Building2 } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../Constants/theme";

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const { width: sw } = useWindowDimensions();
  const isMobile = sw <= 360;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: isMobile ? 12 : 24,
            paddingVertical: 48,
          }}
        >
          {/* Outer Card */}
          <View
            style={{
              width: isMobile ? "95%" : 700,
              minHeight: isMobile ? 800 : 590,
              backgroundColor: "#E6F0FF",
              borderRadius: 24,
              padding: isMobile ? 16 : 24,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            {/* Top Bar */}
            <View
              style={{
                flexDirection: isMobile ? "column" : "row",
                alignItems: isMobile ? "center" : "center",
                justifyContent: isMobile ? "center" : "center",
                marginBottom: isMobile ? 16 : 24,
                width: "100%",
                position: "relative",
              }}
            >
              {/* Logo + ShareFlow Text */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: isMobile ? 8 : 0,
                }}
              >
                <Image
                  source={require("../../assets/image.png")}
                  style={{ width: 40, height: 40, marginRight: 8 }}
                />
                <Text
                  style={{
                    color: COLORS.primary,
                    fontSize: isMobile ? 20 : 24,
                    fontWeight: "bold",
                  }}
                >
                  ShareFlow
                </Text>
              </View>

              {/* Back Button - Mobile Below Text */}
              {isMobile && (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Header")}
                  style={{ marginTop: 8 }}
                >
                  <LinearGradient
                    colors={[COLORS.button, COLORS.button]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 16,
                      borderRadius: 12,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
                      ← Back To Home
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}

              {/* Desktop Back Button Top Left */}
              {!isMobile && (
                <TouchableOpacity
                  style={{ position: "absolute", top: 4, left: 4, zIndex: 10 }}
                  onPress={() => navigation.navigate("Header")}
                >
                  <LinearGradient
                    colors={[COLORS.button, COLORS.button]}
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
                    <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
                      ← Back To Home
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </View>

            {/* Inner Card */}
            <View
              style={{
                width: "100%",
                minHeight: isMobile ? 600 : 650,
                backgroundColor: COLORS.white,
                borderRadius: 24,
                padding: isMobile ? 16 : 32,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              {/* Secure Badge */}
              <LinearGradient
                colors={[COLORS.button, COLORS.button]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  position: "absolute",
                  top: 6,
                  left: 6,
                  paddingHorizontal: 16,
                  paddingVertical: 4,
                  borderRadius: 12,
                }}
              >
                <Text
                  style={{ color: COLORS.white, fontWeight: "600", fontSize: 12 }}
                >
                  Secure Sign-In
                </Text>
              </LinearGradient>

              {/* Welcome */}
              <Text
                style={{
                  color: COLORS.primary,
                  fontSize: isMobile ? 24 : 30,
                  fontWeight: "800",
                  marginBottom: 8,
                  textAlign: "center",
                  marginTop: 40,
                }}
              >
                Welcome Back
              </Text>
              <Text
                style={{
                  color: COLORS.gray,
                  fontSize: isMobile ? 14 : 16,
                  marginBottom: 24,
                  textAlign: "center",
                }}
              >
                Sign into your ShareFlow account
              </Text>

              {/* Email */}
              <View style={{ marginBottom: 20 }}>
                <Text
                  style={{
                    color: COLORS.primary,
                    fontSize: 14,
                    fontWeight: "500",
                    marginBottom: 6,
                  }}
                >
                  Email Address
                </Text>
                <TextInput
                  style={{
                    width: "100%",
                    borderRadius: 16,
                    paddingHorizontal: 16,
                    paddingVertical: 16,
                    backgroundColor: "#E6F0FF",
                    color: COLORS.primary,
                  }}
                  placeholder="yourname@work.com"
                  placeholderTextColor="#6C717DFF"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Password */}
              <View style={{ marginBottom: 12 }}>
                <Text
                  style={{
                    color: COLORS.primary,
                    fontSize: 14,
                    fontWeight: "500",
                    marginBottom: 6,
                  }}
                >
                  Password
                </Text>
                <View style={{ position: "relative" }}>
                  <TextInput
                    style={{
                      width: "100%",
                      borderRadius: 16,
                      paddingHorizontal: 16,
                      paddingVertical: 16,
                      paddingRight: 48,
                      backgroundColor: "#E6F0FF",
                      color: COLORS.primary,
                    }}
                    placeholder="Enter your password"
                    placeholderTextColor="#6C717DFF"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    style={{ position: "absolute", right: 16, top: 16 }}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff size={22} color={COLORS.primary} />
                    ) : (
                      <Eye size={22} color={COLORS.primary} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Remember / Forget */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 24,
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center" }}
                  onPress={() => setRememberMe(!rememberMe)}
                >
                  <View
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 4,
                      borderWidth: 2,
                      marginRight: 8,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: rememberMe ? COLORS.button : COLORS.white,
                      borderColor: rememberMe ? COLORS.button : COLORS.primary,
                    }}
                  >
                    {rememberMe && (
                      <Text
                        style={{ color: COLORS.white, fontSize: 10, fontWeight: "bold" }}
                      >
                        ✓
                      </Text>
                    )}
                  </View>
                  <Text style={{ color: COLORS.primary }}>Remember me</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("ForgetPwd")}>
                  <Text style={{ color: COLORS.accent, fontWeight: "600" }}>
                    Forget password?
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Sign In Button */}
              <TouchableOpacity
                style={{ borderRadius: 16, marginBottom: 16 }}
                onPress={() => navigation.navigate("ShareholderDashboard")}
              >
                <LinearGradient
                  colors={[COLORS.button, COLORS.button]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    paddingVertical: 16,
                    borderRadius: 16,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <LogIn size={20} color={COLORS.white} />
                  <Text
                    style={{ color: COLORS.white, fontWeight: "bold", fontSize: 16 }}
                  >
                    Sign Into Dashboard
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* No account text */}
              <Text
                style={{
                  color: COLORS.gray,
                  fontSize: 14,
                  textAlign: "center",
                  marginBottom: 12,
                }}
              >
                Don’t have an enterprise account?
              </Text>

              {/* Create Account */}
              <TouchableOpacity
                style={{ marginBottom: 24 }}
                onPress={() => navigation.navigate("Signup")}
              >
                <LinearGradient
                  colors={[COLORS.button, COLORS.button]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    paddingVertical: 16,
                    paddingHorizontal: 24,
                    borderRadius: 16,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Building2 size={20} color={COLORS.white} />
                  <Text
                    style={{ color: COLORS.white, fontWeight: "bold", fontSize: 16 }}
                  >
                    Create Company Account
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
