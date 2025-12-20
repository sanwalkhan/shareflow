// src/components/LandingPages/HeroScreen.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  useWindowDimensions,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
  AdvancedAnalyticsCard,
  EnterpriseSecurityCard,
  SmartAutomationCard,
} from "./Cards";

import InfoScreen from "./InfoScreen";
import BusinessScreen from "./BusinessScreen";
import Marketing from "./Marketing";
import Footer from "../HeaderFooter/Footer";

const HeroScreen: React.FC = () => {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation<any>();

  const isSmallMobile = width <= 380;
  const isMobile = width < 768;
  const isTablet = width >= 768;
  const isDesktop = width >= 1200;

  const headingFontSize = isDesktop
    ? 60
    : isTablet
    ? 52
    : isSmallMobile
    ? 28
    : 36;
  const subHeadingFontSize = isSmallMobile ? 24 : headingFontSize;

  const cardContainerStyle = {
    width: isTablet || isDesktop ? "32%" : "100%",
    marginTop: 16,
  } as const;

  const heroImageStyle = {
    width: "100%",
    maxWidth: isDesktop ? 450 : isTablet ? 380 : isSmallMobile ? 220 : 320,
    aspectRatio: 300 / 350,
  };

  const sectionVerticalPadding = height <= 925 ? 30 : 60;

  const goToAdminDashboard = () => {
    navigation.navigate("AdminStack", { screen: "ADDashboard" });
  };

  // ================= CARD OVERLAP =================
  const cardSectionMarginTop = isMobile ? -120 : isTablet ? -540 : -200;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* ================= BLUE SECTION ================= */}
      <View style={{ backgroundColor: "#001867ff", position: "relative" }}>
        {/* HERO CONTENT */}
        <View
          style={{
            paddingVertical: sectionVerticalPadding,
            paddingHorizontal: 24,
            paddingBottom: isMobile ? 60 : isTablet ? 400 : 300,
          }}
        >
          {isTablet || isDesktop ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ flex: 1, paddingRight: 24 }}>
                <Text
                  style={{
                    fontSize: headingFontSize,
                    color: "#fff",
                    fontFamily: "Poppins-SemiBold",
                  }}
                >
                  Financial Intelligence
                </Text>
                <Text
                  style={{
                    fontSize: subHeadingFontSize,
                    color: "#fff",
                    fontFamily: "Poppins-Bold",
                    marginTop: 8,
                  }}
                >
                  Reimagined
                </Text>

                <View style={{ flexDirection: "row", marginTop: 24 }}>
                  <TouchableOpacity style={btnStyle} onPress={goToAdminDashboard}>
                    <Text style={btnText}>Register</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={btnStyle}>
                    <Text style={btnText}>Watch Demo</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Image
                  source={require("../../assets/Image2.png")}
                  style={heroImageStyle}
                  resizeMode="contain"
                />
              </View>
            </View>
          ) : (
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../../assets/Image2.png")}
                style={heroImageStyle}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontSize: headingFontSize,
                  color: "#fff",
                  fontFamily: "Poppins-SemiBold",
                  textAlign: "center",
                  marginTop: 16,
                }}
              >
                Financial Intelligence
              </Text>
              <Text
                style={{
                  fontSize: subHeadingFontSize,
                  color: "#fff",
                  fontFamily: "Poppins-Bold",
                  textAlign: "center",
                  marginTop: 6,
                }}
              >
                Reimagined
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 16,
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <TouchableOpacity style={btnStyle} onPress={goToAdminDashboard}>
                  <Text style={btnText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={btnStyle}>
                  <Text style={btnText}>Watch Demo</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* ================= SECTION TITLE FOR MOBILE ================= */}
          {isMobile && (
            <View
              style={{
                alignItems: "center",
                marginTop: 20,
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#fff",
                  fontFamily: "Poppins-SemiBold",
                  textAlign: "center",
                }}
              >
                Everything Your Business Needs
              </Text>
              <View
                style={{
                  width: 200,
                  height: 3,
                  backgroundColor: "#fff",
                  marginTop: 8,
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: "#fff",
                  fontFamily: "Poppins-Bold",
                  marginTop: 10,
                  textAlign: "center",
                }}
              >
                Who is Nextcent suitable for?
              </Text>
            </View>
          )}
        </View>

        {/* ================= SECTION TITLE FOR WEB/TABLET ================= */}
        {!isMobile && (
          <View
            style={{
              position: "absolute",
              top: 420,
              width: "100%",
              alignItems: "center",
              zIndex: 10,
              paddingTop: 16,
              paddingBottom: 8,
            }}
          >
            <Text
              style={{
                fontSize: 28,
                color: "#fff",
                fontFamily: "Poppins-SemiBold",
                textAlign: "center",
              }}
            >
              Everything Your Business Needs
            </Text>
            <View
              style={{
                width: 350,
                height: 3,
                backgroundColor: "#fff",
                marginTop: 8,
              }}
            />
            <Text
              style={{
                fontSize: 18,
                color: "#fff",
                fontFamily: "Poppins-Bold",
                marginTop: 10,
                textAlign: "center",
              }}
            >
              Who is Nextcent suitable for?
            </Text>
          </View>
        )}
      </View>

      {/* ================= WHITE CARD SECTION ================= */}
      <View
        style={{
          backgroundColor: "#fff",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          paddingVertical: 24,
          paddingHorizontal: 24,
        }}
      >
        <View
          style={{
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            marginTop: cardSectionMarginTop, // moved slightly up for mobile
            gap: 0, // remove extra space
          }}
        >
          <View style={cardContainerStyle}>
            <AdvancedAnalyticsCard />
          </View>
          <View style={cardContainerStyle}>
            <EnterpriseSecurityCard />
          </View>
          <View style={cardContainerStyle}>
            <SmartAutomationCard />
          </View>
        </View>
      </View>

      {/* ================= OTHER SECTIONS ================= */}
      <InfoScreen />
      <BusinessScreen />
      <Marketing />
      <Footer />
    </ScrollView>
  );
};

const btnStyle = {
  backgroundColor: "#FFC20E",
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 8,
  marginRight: 10,
};

const btnText = {
  color: "#001867",
  fontSize: 16,
  fontWeight: "bold",
};

export default HeroScreen;
