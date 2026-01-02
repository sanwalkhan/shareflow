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
  const { width } = useWindowDimensions();
 
  // 🔑 SAFE WIDTH (360 minimum reference)
  const SAFE_WIDTH = Math.max(width, 360);
 
  const isMobile = SAFE_WIDTH <= 480;
  const isCongested = SAFE_WIDTH < 500; // 👈 Back button breakpoint
 
  // 🔑 SMART CARD WIDTH
  const cardWidth =
    SAFE_WIDTH < 768
      ? SAFE_WIDTH - 24
      : Math.min(SAFE_WIDTH * 0.6, 720);
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
 
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* OUTER CARD */}
        <View
  style={{
    width: cardWidth,
    backgroundColor: COLORS.outerCardBackground, // 👈 theme.tsx se outer card bg
    borderRadius: 24,
    padding: 20,
    shadowColor: COLORS.black,
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  }}
>
 
          {/* TOP BAR */}
          <View
            style={{
              alignItems: "center",
              marginBottom: 24,
              position: "relative",
            }}
          >
            {/* Back Button — Top Left (>=500px) */}
            {!isCongested && (
              <TouchableOpacity
                onPress={() => navigation.navigate("Hero")}
                style={{ position: "absolute", left: 0, top: 0 }}
              >
                <LinearGradient
                  colors={[COLORS.button, COLORS.button]}
                  style={{
                    paddingHorizontal: 16,
                    height: 40,
                    borderRadius: 12,
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
                    ← Back To Home
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
 
            {/* Logo + ShareFlow Text */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../../assets/image.png")}
                style={{
                  width: 40,
                  height: 40,
                  resizeMode: "contain",
                  marginRight: 8,
                }}
              />
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: COLORS.primary,
                  lineHeight: 40, // align with image height
                }}
              >
                ShareFlow
              </Text>
            </View>
 
            {/* Back Button — Below Logo (<500px) */}
            {isCongested && (
              <TouchableOpacity
                onPress={() => navigation.navigate("Header")}
                style={{ marginTop: 12 }}
              >
                <LinearGradient
                  colors={[COLORS.button, COLORS.button]}
                  style={{
                    paddingHorizontal: 18,
                    height: 40,
                    borderRadius: 12,
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
                    ← Back To Home
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
 
          {/* INNER CARD */}
          <View
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 24,
              padding: isMobile ? 16 : 28,
            }}
          >
            {/* Secure Badge */}
            <TouchableOpacity
              onPress={() => navigation.navigate("ADDashboard")}
              style={{
                position: "absolute",
                top: 8,
                left: 8,
              }}
            >
              <LinearGradient
                colors={[COLORS.button, COLORS.button]}
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 4,
                  borderRadius: 12,
                }}
              >
                <Text style={{ color: COLORS.white, fontSize: 12 }}>
                  Secure Sign-In
                </Text>
              </LinearGradient>
            </TouchableOpacity>
 
            {/* Title */}
            <Text
              style={{
                fontSize: isMobile ? 24 : 30,
                fontWeight: "800",
                color: COLORS.primary,
                textAlign: "center",
                marginTop: 32,
              }}
            >
              Welcome Back
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: COLORS.gray,
                marginBottom: 24,
              }}
            >
              Sign into your ShareFlow account
            </Text>
 
            {/* Email */}
            <Text style={{ color: COLORS.primary, marginBottom: 6 }}>
              Email Address
            </Text>
            <TextInput
              style={{
                backgroundColor: "#E6F0FF",
                borderRadius: 16,
                padding: 16,
                marginBottom: 20,
              }}
              placeholder="yourname@work.com"
              placeholderTextColor="#6C717D"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
 
            {/* Password */}
            <Text style={{ color: COLORS.primary, marginBottom: 6 }}>
              Password
            </Text>
            <View style={{ position: "relative" }}>
              <TextInput
                style={{
                  backgroundColor: "#E6F0FF",
                  borderRadius: 16,
                  padding: 16,
                  paddingRight: 48,
                }}
                placeholder="Enter your password"
                placeholderTextColor="#6C717D"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{ position: "absolute", right: 16, top: 16 }}
              >
                {showPassword ? (
                  <EyeOff size={22} color={COLORS.primary} />
                ) : (
                  <Eye size={22} color={COLORS.primary} />
                )}
              </TouchableOpacity>
            </View>
 
            {/* Remember + Forget */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 20,
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
                    borderWidth: 2,
                    borderColor: COLORS.primary,
                    marginRight: 8,
                    backgroundColor: rememberMe ? COLORS.button : COLORS.white,
                  }}
                />
                <Text>Remember me</Text>
              </TouchableOpacity>
 
              <TouchableOpacity onPress={() => navigation.navigate("ForgetPwd")}>
                <Text style={{ color: COLORS.accent }}>Forget password?</Text>
              </TouchableOpacity>
            </View>
 
            {/* Login Button */}
            <TouchableOpacity onPress={() => navigation.navigate("ShareholderDashboard")}>
              <LinearGradient
                colors={[COLORS.button, COLORS.button]}
                style={{
                  height: 50,
                  borderRadius: 16,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: 8,
                }}
              >
                <LogIn size={18} color={COLORS.white} />
                <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
                  Sign Into Dashboard
                </Text>
              </LinearGradient>
            </TouchableOpacity>
 
            {/* Create Account */}
            <TouchableOpacity
              style={{ marginTop: 20 }}
              onPress={() => navigation.navigate("Signup")}
            >
              <LinearGradient
                colors={[COLORS.button, COLORS.button]}
                style={{
                  height: 50,
                  borderRadius: 16,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: 8,
                }}
              >
                <Building2 size={18} color={COLORS.white} />
                <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
                  Create Company Account
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}