import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import {
  AdvancedAnalyticsCard,
  EnterpriseSecurityCard,
  SmartAutomationCard,
} from "./Cards";

import InfoScreen from "./InfoScreen";
import BusinessScreen from "./BusinessScreen";
import Marketing from "./Marketing";
import Footer from "./Footer";

const HeroScreen: React.FC = () => {
  return (
    <ScrollView className="flex-1 bg-white">

      {/* ============================
          HERO SECTION (NO BACKGROUND IMAGE)
      ============================ */}
      <View
        style={{
          backgroundColor: "#003C1F",
          paddingTop: 48,
          paddingBottom: 64,
          paddingHorizontal: 24,
          height: 960,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >

        {/* LEFT SIDE TEXT */}
        <View style={{ flex: 1, paddingRight: 20 }}>
          <Text
            style={{
              fontFamily: "Poppins-SemiBold",
              fontSize: 45,
              color: "#FFFFFF",
              marginTop: -334,
              marginLeft: 34,
            }}
          >
            Financial Intelligence
          </Text>

          <Text
            style={{
              fontFamily: "Poppins-Bold",
              fontSize: 45,
              color: "#00FF99",
              marginTop: -5,
              marginLeft: 34,
            }}
          >
            Reimagined
          </Text>

          {/* BUTTONS */}
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              marginLeft: 23,
            }}
          >
            <TouchableOpacity>
              <LinearGradient
                colors={["#2A2F50", "#28A745"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 24,
                  borderRadius: 8,
                  marginRight: 15,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "600",
                  }}
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
                  paddingVertical: 12,
                  paddingHorizontal: 24,
                  borderRadius: 8,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "600",
                  }}
                >
                  Watch Demo
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* RIGHT SIDE IMAGE */}
        <View style={{ flex: 1, alignItems: "center" }}>
          <Image
            source={require("../assets/Image2.png")}
            style={{ width:400, height: 310, marginTop: -374 }}
            resizeMode="contain"
          />
        </View>
      </View>
      

      {/* ============================
          SECTION TITLE ABOVE CARDS
      ============================ */}
      <View className="px-6 py-12 items-center">
  <View className="items-center mt-[-480]">
    <Text
      style={{
        width: 434,
        fontFamily: "Poppins-SemiBold",
        fontSize: 25,
        color: "#ffffffff",
        textAlign: "center",
      }}
    >
      Everything Your Business Needs
    </Text>

    <View
      style={{
        width: 350,
        height: 3,
        backgroundColor: "#ffffffff",
        marginTop: 4,
      }}
    />
  </View>

  <Text className="text-[white] text-center mt-4">
    Who is Nextcent suitable for?
  </Text>
</View>


      {/* ============================
           FEATURE CARDS
      ============================ */}
      <AdvancedAnalyticsCard />
      <EnterpriseSecurityCard />
      <SmartAutomationCard />

      {/* ============================
           ADDITIONAL SECTIONS
      ============================ */}
      <InfoScreen />
      <BusinessScreen />
      <Marketing />
      <Footer />
    </ScrollView>
  );
};

export default HeroScreen;
