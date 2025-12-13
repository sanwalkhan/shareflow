// src/components/HeroScreen.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  useWindowDimensions,
} from "react-native";

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

  const isSmallMobile = width <= 380;       // ✔ Best for 360 width
  const isTablet = width >= 768;
  const isDesktop = width >= 1200;

  // ---- FONT SIZES ----
  const headingFontSize = isDesktop
    ? 60
    : isTablet
    ? 52
    : isSmallMobile
    ? 32
    : 36;

  const subHeadingFontSize = headingFontSize;

  // ---- CARD WIDTH ----
  const cardContainerStyle = {
    width: isTablet ? "32%" : "100%",
    marginBottom: 16,
  } as const;

  // ---- HERO IMAGE SIZE FOR SMALL MOBILE ----
  const heroImageStyle = {
    width: "100%",
    maxWidth: isDesktop ? 450 : isTablet ? 380 : isSmallMobile ? 260 : 320,
    aspectRatio: 400 / 350,
  };

  // ---- SECTION PADDING BASED ON HEIGHT (360×925 support) ----
  const sectionVerticalPadding = height <= 925 ? 40 : 60;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#001867ff" }}>
      {/* ========== HERO SECTION ========== */}
      <View
        style={{
          width: "100%",
          paddingVertical: sectionVerticalPadding,
          paddingHorizontal: 24,
        }}
      >
        {isTablet ? (
          // ---------- Tablet/Desktop ----------
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* LEFT: TEXT */}
            <View
              style={{
                flex: 1,
                paddingRight: 24,
                alignItems: "flex-start",
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-SemiBold",
                  fontSize: headingFontSize,
                  color: "#ffffff",
                }}
              >
                Financial Intelligence
              </Text>

              <Text
                style={{
                  fontFamily: "Poppins-Bold",
                  fontSize: subHeadingFontSize,
                  color: "#ffffff",
                  marginTop: 8,
                }}
              >
                Reimagined
              </Text>

              {/* BUTTONS */}
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 24,
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

            {/* RIGHT: IMAGE */}
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <Image
                source={require("../../assets/Image2.png")}
                style={heroImageStyle}
                resizeMode="contain"
              />
            </View>
          </View>
        ) : (
          // ---------- MOBILE (360) ----------
          <>
            <View style={{ width: "100%", alignItems: "center", marginBottom: 20 }}>
              <Image
                source={require("../../assets/Image2.png")}
                style={heroImageStyle}
                resizeMode="contain"
              />
            </View>

            <View
              style={{
                width: "100%",
                alignItems: "center",
                paddingHorizontal: isSmallMobile ? 6 : 10,
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-SemiBold",
                  fontSize: headingFontSize,
                  color: "#ffffff",
                  textAlign: "center",
                }}
              >
                Financial Intelligence
              </Text>

              <Text
                style={{
                  fontFamily: "Poppins-Bold",
                  fontSize: subHeadingFontSize,
                  color: "#ffffff",
                  marginTop: 8,
                  textAlign: "center",
                }}
              >
                Reimagined
              </Text>

              {/* BUTTONS */}
              <View
                style={{
                  flexDirection: "row",
                  marginTop: isSmallMobile ? 16 : 24,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "#FFC20E",
                    paddingVertical: 12,
                    paddingHorizontal: isSmallMobile ? 20 : 28,
                    borderRadius: 8,
                    marginRight: 10,
                    marginBottom: 12,
                  }}
                >
                  <Text
                    style={{
                      color: "#001867ff",
                      fontSize: isSmallMobile ? 16 : 20,
                      fontWeight: "bold",
                    }}
                  >
                    Register
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: "#FFC20E",
                    paddingVertical: 12,
                    paddingHorizontal: isSmallMobile ? 20 : 28,
                    borderRadius: 8,
                    marginBottom: 12,
                  }}
                >
                  <Text
                    style={{
                      color: "#001867ff",
                      fontSize: isSmallMobile ? 16 : 20,
                      fontWeight: "bold",
                    }}
                  >
                    Watch Demo
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </View>

      {/* ========== SECTION TITLE ========== */}
      <View
        style={{
          paddingHorizontal: 24,
          paddingVertical: isTablet ? 80 : sectionVerticalPadding,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins-SemiBold",
            fontSize: isTablet ? 28 : 22,
            color: "#ffffff",
          }}
        >
          Everything Your Business Needs
        </Text>

        <View
          style={{
            width: isTablet ? 350 : 200,
            height: 3,
            backgroundColor: "#ffffff",
            marginTop: 8,
          }}
        />

        <Text
          style={{
            fontFamily: "Poppins-Bold",
            fontSize: isTablet ? 18 : 16,
            color: "#ffffff",
            marginTop: 16,
            textAlign: "center",
          }}
        >
          Who is Nextcent suitable for?
        </Text>
      </View>

      {/* ========== CARDS ========== */}
      <View
        style={{
          flexDirection: isTablet ? "row" : "column",
          justifyContent: isTablet ? "space-between" : "flex-start",
          alignItems: isTablet ? "flex-start" : "center",
          paddingHorizontal: 24,
          marginBottom: 40,
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

      {/* OTHER SECTIONS */}
      <InfoScreen />
      <BusinessScreen />
      <Marketing />
      <Footer />
    </ScrollView>
  );
};

export default HeroScreen;
