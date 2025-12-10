// src/components/HeroScreen.tsx
import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from "react-native";

import {
  AdvancedAnalyticsCard,
  EnterpriseSecurityCard,
  SmartAutomationCard,
} from "./Cards";

import InfoScreen from "./InfoScreen";
import BusinessScreen from "./BusinessScreen";
import Marketing from "./Marketing";
import Footer from "../HeaderFooter/Footer";

const { width: screenWidth } = Dimensions.get("window");

const HeroScreen: React.FC = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#001867ff" }}>
      {/* HERO SECTION */}
      <View
  style={{
    paddingVertical: 24, // reduce vertical padding
    paddingHorizontal: 24,
    flexDirection: screenWidth > 768 ? "row" : "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
   minHeight: screenWidth > 768 ? 300 : 200, // desktop 300, mobile 200
// optional: set explicit height
  }}
>

        {/* LEFT SIDE TEXT */}
        <View
          style={{
            flex: 1,
            paddingLeft: screenWidth > 768 ? 60 : 0, // move text slightly right
            alignItems: screenWidth > 768 ? "flex-start" : "center",
            marginTop: screenWidth > 768 ? 70 : 20, // ye line add karo
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins-SemiBold",
              fontSize: screenWidth > 768 ? 52 : 36,
              color: "#ffffff",
              textAlign: "left",
            }}
          >
            Financial Intelligence
          </Text>

          <Text
            style={{
              fontFamily: "Poppins-Bold",
              fontSize: screenWidth > 768 ? 52 : 36,
              color: "#ffffff",
              marginTop: 8,
              textAlign: "left",
            }}
          >
            Reimagined
          </Text>

          {/* BUTTONS */}
          <View
            style={{
              flexDirection: "row",
              marginTop: 24,
              justifyContent: "flex-start",
              flexWrap: "wrap",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#FFC20E",
                paddingVertical: 14,
                paddingHorizontal: 28,
                borderRadius: 8,
                marginRight: 15,
                marginBottom: 12,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#001867ff",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Register
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: "#FFC20E",
                paddingVertical: 14,
                paddingHorizontal: 28,
                borderRadius: 8,
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  color: "#001867ff",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Watch Demo
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* RIGHT SIDE IMAGE */}
        <View
  style={{
    flex: 1,
    alignItems: "flex-end",
    marginTop: screenWidth > 768 ? 0 : 30,
  }}
>
  <Image
    source={require('../../assets/Image2.png')}
    style={{
      width: screenWidth > 768 ? 400 : screenWidth * 0.7, // chhota width
      height: screenWidth > 768 ? 350 : (screenWidth * 0.7 * 350) / 400, // maintain aspect ratio
    }}
    resizeMode="contain"
  />
</View>
</View>

      {/* SECTION TITLE ABOVE CARDS */}
      <View
  style={{
    paddingHorizontal: 24,
    paddingVertical: 64, // thoda aur neeche space
    alignItems: "center", // center align
  }}
>
  <Text
    style={{
      fontFamily: "Poppins-SemiBold",
      fontSize: screenWidth > 768 ? 28 : 22,
      color: "#ffffff",
      textAlign: "center", // center text
    }}
  >
    Everything Your Business Needs
  </Text>

  <View
    style={{
      width: screenWidth > 768 ? 350 : 200,
      height: 3,
      backgroundColor: "#ffffff",
      marginTop: 8,
    }}
  />

  <Text
    style={{
      fontFamily: "Poppins-Bold",
      fontSize: screenWidth > 768 ? 18 : 16,
      color: "#ffffff",
      marginTop: 16, // thoda aur neeche
      textAlign: "center",
    }}
  >
    Who is Nextcent suitable for?
  </Text>
</View>


      {/* FEATURE CARDS */}
      <View
        style={{
          flexDirection: screenWidth > 768 ? "row" : "column",
          justifyContent: "space-between",
          paddingHorizontal: 24,
          marginBottom: 32,
        }}
      >
        <AdvancedAnalyticsCard />
        <EnterpriseSecurityCard />
        <SmartAutomationCard />
      </View>

      {/* ADDITIONAL SECTIONS */}
      <InfoScreen />
      <BusinessScreen />
      <Marketing />
      <Footer />
    </ScrollView>
  );
};

export default HeroScreen;
