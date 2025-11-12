import React from "react";
import { View, Text, TouchableOpacity, Image, ImageBackground, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const HeroSection: React.FC = () => {
  return (
    <ImageBackground
      source={require("../assets/Rectangle.png")}
      style={{
        width: width,  // full screen width
        height: 834,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 40,
        paddingVertical: 40,
      }}
      resizeMode="cover"
    >
      {/* Left Text + Buttons */}
      <View style={{ flex: 1, marginTop: -50 }}>
        <Text style={{ fontSize: 46, fontWeight: "900", color: "#FFFFFF", marginBottom: 4 }}>
          Financial Intelligence
        </Text>
        <Text style={{ fontSize: 46, fontWeight: "900", color: "#4CAF4F" }}>
          Reimagined
        </Text>

        <View style={{ flexDirection: "row", marginTop: 32 }}>
          <TouchableOpacity>
            <LinearGradient
              colors={["#2A2F50", "#28A745"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                paddingHorizontal: 24,
                paddingVertical: 14,
                borderRadius: 10,
                marginRight: 16,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "700", fontSize: 18 }}>
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
                paddingHorizontal: 24,
                paddingVertical: 14,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "700", fontSize: 18 }}>
                Demo
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* Right Image + Center Text */}
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", position: "relative" }}>
        <Image
          source={require("../assets/Image2.png")}
          style={{
            width: 380,
            height: 380,
            resizeMode: "contain",
            marginBottom: 50,
          }}
        />

        <View style={{
          position: "absolute",
          top: 50,
          alignItems: "center"
        }}>
          <Text style={{
            color: "#FFFFFF",
            fontSize: 26,
            fontWeight: "800",
            textAlign: "center",
            marginBottom: 6,
          }}>
            Everything Your Business Needs
          </Text>

          <View style={{
            width: 240,
            height: 2,
            backgroundColor: "#FFFFFF",
            marginVertical: 6,
          }} />

          <Text style={{
            color: "#FFFFFF",
            fontSize: 18,
            textAlign: "center",
            fontWeight: "500",
            opacity: 0.9,
          }}>
            Who is Nextcent suitable for?
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HeroSection;
