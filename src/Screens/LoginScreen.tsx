// src/Screens/LoginScreen.tsx
import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TailwindProvider } from "tailwindcss-react-native";
import { theme } from "../Constants/theme";

export default function LoginScreen() {
  return (
    <TailwindProvider>
      <View style={{ flex: 1, backgroundColor: theme.tokens.colors.muted100 }}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            backgroundColor: "#D9D9D9",
            paddingVertical: 20,
          }}
        >
          {/* Left: Poll-like icon + ShareFlow + Image1 */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            {/* Poll bars */}
            <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 3 }}>
              <View
                style={{
                  width: 8,
                  height: 20,
                  backgroundColor: "#1F6A3D",
                  borderRadius: 2,
                }}
              />
              <View
                style={{
                  width: 6,
                  height: 14,
                  backgroundColor: "#28A745",
                  borderRadius: 2,
                }}
              />
            </View>

            {/* ShareFlow text + logo */}
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                <Text style={{ color: "#000000" }}>Share</Text>
                <Text style={{ color: "#018502" }}>Flow</Text>
              </Text>
              <Image
                source={require("../assets/Image1.png")}
                style={{ width: 30, height: 30, resizeMode: "contain" }}
              />
            </View>
          </View>

          {/* Navigation */}
          <View style={{ flexDirection: "row", gap: 80 }}>
            <Text style={{ fontSize: 16, color: "#000" }}>Home</Text>
            <Text style={{ fontSize: 16, color: "#000" }}>About Us</Text>
            <Text style={{ fontSize: 16, color: "#000" }}>Pricing</Text>
          </View>

          {/* Register Button */}
          <TouchableOpacity>
            <LinearGradient
              colors={["#2A2F50", "#28A745"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 }}
            >
              <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
                Register
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Main Section */}
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View
            style={{
              width: "100%",
              height: 440,
              backgroundColor: "#1F6A3D",
              paddingVertical: 60,
              paddingHorizontal: 30,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Left Text Section */}
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 40,
                  fontWeight: "700",
                  fontFamily: "Poppins",
                  color: "#FFFFFF",
                  marginBottom: 10,
                }}
              >
                Financial Intelligence
              </Text>
              <Text
                style={{
                  fontSize: 40,
                  fontWeight: "700",
                  fontFamily: "Poppins",
                  color: "#4CAF4F",
                }}
              >
                Reimagined
              </Text>

              {/* Buttons */}
              <View style={{ flexDirection: "row", gap: 20, marginTop: 30 }}>
                <TouchableOpacity>
                  <LinearGradient
                    colors={["#2A2F50", "#28A745"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      paddingHorizontal: 20,
                      paddingVertical: 12,
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}
                    >
                      Register
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity>
                  <LinearGradient
                    colors={["#4CAF4F", "#28A745"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      paddingHorizontal: 20,
                      paddingVertical: 12,
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}
                    >
                      Demo
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

            {/* Right Image */}
            <Image
              source={require("../assets/Image2.png")}
              style={{
                width: 220,
                height: 220,
                resizeMode: "contain",
                marginLeft: 20,
              }}
            />
          </View>

          {/* Features Section */}
          <View
            style={{
              backgroundColor: "#E3EDF9",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              paddingVertical: 50,
            }}
          >
            {/* Feature Card 1 */}
            <View
              style={{
                backgroundColor: "#fff",
                width: 110,
                height: 150,
                borderRadius: 20,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
              }}
            >
              {/* <Image
                source={require("../assets/Image1.png")}
                style={{ width: 40, height: 40, marginBottom: 8 }}
                resizeMode="contain"
              /> */}
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: 12,
                  color: "#000",
                }}
              >
                Advanced Analytics
              </Text>
            </View>

            {/* Feature Card 2 */}
            <View
              style={{
                backgroundColor: "#fff",
                width: 110,
                height: 150,
                borderRadius: 20,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
              }}
            >
              {/* <Image
                source={require("../assets/icon-security.png")}
                style={{ width: 40, height: 40, marginBottom: 8 }}
                resizeMode="contain"
              /> */}
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: 12,
                  color: "#000",
                }}
              >
                Enterprise Security
              </Text>
            </View>

            {/* Feature Card 3 */}
            <View
              style={{
                backgroundColor: "#fff",
                width: 110,
                height: 150,
                borderRadius: 20,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Image
                source={require("../assets/icon-automation.png")}
                style={{ width: 40, height: 40, marginBottom: 8 }}
                resizeMode="contain"
              />
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: 12,
                  color: "#000",
                }}
              >
                Smart Automation
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </TailwindProvider>
  );
}
