import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../Constants/theme";
 
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
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation<any>();
 
  const isSmallMobile = width <= 380;
  const isMobile = width < 780;
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
 
  const heroImageStyle = {
    width: "100%",
    maxWidth: isDesktop ? 450 : isTablet ? 380 : isSmallMobile ? 220 : 320,
    aspectRatio: 300 / 350,
  };
 
  const sectionVerticalPadding = height <= 925 ? 30 : 60;
 
  const goToAdminDashboard = () => {
    navigation.navigate("AdminStack", { screen: "ADDashboard" });
  };
 
  // Card overlap for visual effect
  const cardSectionMarginTop = isMobile ? -120 : isTablet ? -540 : -200;
 
  // Card container style
  const cardContainerStyle = (isMobile: boolean) => ({
  width: isMobile ? "100%" : "32%",
  marginTop: isMobile ? -210 : 16, // 0 for mobile, 16 (or negative if needed) for desktop/tablet
});
 
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* ================= BLUE HERO SECTION ================= */}
     <View
  style={{
    backgroundColor: COLORS.heroBackground, // 👈 theme.tsx se
    position: "relative",
  }}
>
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
                  <TouchableOpacity
                    style={btnStyle}
                    onPress={goToAdminDashboard}
                  >
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
                <TouchableOpacity
                  style={btnStyle}
                  onPress={goToAdminDashboard}
                >
                  <Text style={btnText}>Register</Text>
                </TouchableOpacity>
               
                <TouchableOpacity
                  style={btnStyle}
                  onPress={goToAdminDashboard}
                >
                  <Text style={btnText}>Watch Demo</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
 
          {/* MOBILE SECTION TITLE */}
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
 
        {/* DESKTOP/TABLET SECTION TITLE */}
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
    backgroundColor: COLORS.cardBackground, // 👈 theme.tsx se
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 24,
  }}
>
 
        <View
          style={{
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "flex-start",
            marginTop: cardSectionMarginTop,
            gap: 0,
            marginLeft: isMobile ? 0 : 104,
          }}
        >
          <View style={cardContainerStyle(isMobile)}>
            <AdvancedAnalyticsCard />
          </View>
          <View style={cardContainerStyle(isMobile)}>
            <EnterpriseSecurityCard />
          </View>
          <View style={cardContainerStyle(isMobile)}>
            <SmartAutomationCard />
          </View>
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
 
const btnStyle = {
  backgroundColor: COLORS.button, // 👈 #FFC20E from theme
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 8,
  marginRight: 10,
};
 
const btnText = {
  color: COLORS.accent, // 👈 #001867ff from theme
  fontSize: 16,
  fontWeight: "bold",
};
 
export default HeroScreen;