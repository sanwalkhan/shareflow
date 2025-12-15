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
import { Check, Eye, EyeOff } from "lucide-react-native";
import { COLORS } from "../../Constants/theme";

const Password: React.FC = () => {
  const navigation = useNavigation<any>();
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  // Responsive checks
  const isMobile = SCREEN_WIDTH < 768;
  const CARD_MIN_WIDTH = 360;
  const CARD_MAX_WIDTH = 800;

  const cardWidth = Math.min(Math.max(SCREEN_WIDTH * 0.95, CARD_MIN_WIDTH), CARD_MAX_WIDTH);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [subscribeUpdates, setSubscribeUpdates] = useState(true);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, alignItems: "center", paddingVertical: 24 }}>

          {/* Outer Card */}
          <View
            style={{
              width: cardWidth,
              backgroundColor: "#E6F0FF",
              borderRadius: 24,
              padding: 24,
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 6,
              elevation: 5,
              minHeight: isMobile ? "auto" : 500, // Outer card height slightly increased
            }}
          >
            {/* Header */}
            <View style={{ alignItems: "center", marginBottom: 24, position: "relative", width: "100%" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../../assets/image.png")}
                  style={{ width: 40, height: 40, marginRight: 8 }}
                />
                <Text style={{ color: "#193288", fontSize: 24, fontWeight: "bold" }}>ShareFlow</Text>
              </View>

              {/* Back Button */}
              {isMobile ? (
                <View style={{ marginTop: 12 }}>
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
                      <Text style={{ color: COLORS.white, fontWeight: "bold", fontSize: 14 }}>
                        ← Back To Home
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{ position: "absolute", top: 4, left: 4, zIndex: 10 }}
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
                    <Text style={{ color: COLORS.white, fontWeight: "bold" }}>← Back To Home</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </View>

            {/* Inner Card */}
            <View
              style={{
                width: "100%",
                backgroundColor: COLORS.white,
                borderRadius: 24,
                padding: 24,
                minHeight: isMobile ? "auto" : 680, // Inner card height increased
              }}
            >
              {/* Stepper */}
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 24 }}>
  {[1, 2, 3, 4].map((step, idx) => {
    const circleSize = isMobile ? 32 : 40;

    return (
      <React.Fragment key={step}>
        {/* Circle with number */}
        <View
          style={{
            width: circleSize,
            height: circleSize,
            borderRadius: circleSize / 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LinearGradient
            colors={["#193288", "#FFC20E"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: circleSize,
              height: circleSize,
              borderRadius: circleSize / 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: isMobile ? 12 : 14,
              }}
            >
              {step}
            </Text>
          </LinearGradient>
        </View>

        {/* Connecting line */}
        {idx < 3 && (
          <View
            style={{
              flex: 1,
              height: 2,
              backgroundColor: "#193288",
              marginHorizontal: isMobile ? 4 : 6,
              alignSelf: "center", // ✅ line circle ke center me
            }}
          />
        )}
      </React.Fragment>
    );
  })}
</View>


              {/* Heading */}
              <Text style={{ fontSize: 22, fontWeight: "800", color: "#193288", marginBottom: 8 }}>
                Security & Preferences
              </Text>
              <Text style={{ fontSize: 14, color: "#6C717D", marginBottom: 24 }}>
                Set up your account security and preferences below
              </Text>

              {/* Password Fields */}
              <View style={{ gap: 24 }}>
                {/** Password **/}
                <View>
                  <Text style={{ fontWeight: "600", marginBottom: 4 }}>Password</Text>
                  <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#E8EDF5", borderRadius: 12, paddingHorizontal: 12 }}>
                    <TextInput
                      value={password}
                      onChangeText={setPassword}
                      placeholder="Enter your password"
                      placeholderTextColor="#6B7280"
                      secureTextEntry={!showPassword}
                      style={{ flex: 1, height: 48, color: "#000" }}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </TouchableOpacity>
                  </View>
                </View>

                {/** Confirm Password **/}
                <View>
                  <Text style={{ fontWeight: "600", marginBottom: 4 }}>Confirm Password</Text>
                  <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#E8EDF5", borderRadius: 12, paddingHorizontal: 12 }}>
                    <TextInput
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      placeholder="Re-enter your password"
                      placeholderTextColor="#6B7280"
                      secureTextEntry={!showConfirmPassword}
                      style={{ flex: 1, height: 48, color: "#000" }}
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </TouchableOpacity>
                  </View>
                  <Text style={{ color: "#6C717D", fontSize: 12, marginTop: 4 }}>Please make sure your password matches.</Text>
                </View>
              </View>

              {/* Checkboxes */}
              <View style={{ marginTop: 24, gap: 16 }}>
                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => setAgreeTerms(!agreeTerms)}>
                  <View style={{
                    width: 20, height: 20, borderRadius: 4, borderWidth: 1, borderColor: "#6B7280",
                    backgroundColor: agreeTerms ? "#FFC20E" : "#fff", justifyContent: "center", alignItems: "center", marginRight: 8
                  }}>
                    {agreeTerms && <Check size={16} color="#193288" />}
                  </View>
                  <Text style={{ fontSize: 13, color: "#374151" }}>I agree to the Terms of Service and Privacy Policy*</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => setSubscribeUpdates(!subscribeUpdates)}>
                  <View style={{
                    width: 20, height: 20, borderRadius: 4, borderWidth: 1, borderColor: "#6B7280",
                    backgroundColor: subscribeUpdates ? "#FFC20E" : "#fff", justifyContent: "center", alignItems: "center", marginRight: 8
                  }}>
                    {subscribeUpdates && <Check size={16} color="#193288" />}
                  </View>
                  <Text style={{ fontSize: 13, color: "#374151" }}>Send me product updates, security tips, and industry insights</Text>
                </TouchableOpacity>
              </View>

              {/* Buttons */}
              <View style={{ flexDirection: "row", gap: 12, marginTop: 24 }}>
                <TouchableOpacity
                  style={{ flex: 1, height: 48, backgroundColor: "#D1D5DB", borderRadius: 12, justifyContent: "center", alignItems: "center" }}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={{ color: "#4B5563", fontWeight: "bold" }}>← Previous</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flex: 1, height: 48, borderRadius: 12 }}
                  onPress={() => navigation.navigate("Forgetpwd")}
                >
                  <LinearGradient
                    colors={["#FFC20E", "#FFD666"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ flex: 1, justifyContent: "center", alignItems: "center", borderRadius: 12, flexDirection: "row" }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "bold", marginRight: 4 }}>Complete</Text>
                    <Check size={20} color="#fff" strokeWidth={3} />
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* Footer */}
              <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 16 }}>
                <Text style={{ fontSize: 12, color: "#6C717D" }}>Already have an Account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={{ fontSize: 12, color: "#FFC20E", fontWeight: "600" }}>Sign in here</Text>
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
