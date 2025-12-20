// InfoScreen.tsx
import React from "react";
import { View, Text, Image, TouchableOpacity, useWindowDimensions, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const InfoScreen: React.FC = () => {
  const { width: sw } = useWindowDimensions();

  const isDesktop = sw >= 1200;
  const isTablet = sw >= 768 && sw < 1200;
  const isMobile = sw < 768;

  const headingFontSize = isDesktop ? 36 : isTablet ? 30 : 22;
  const paragraphFontSize = isDesktop ? 18 : isTablet ? 16 : 14;
  const lineHeight = isDesktop ? 42 : isTablet ? 28 : 22;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: "#FFFFFF",
        paddingHorizontal: isDesktop ? 80 : 16,
        paddingTop: 40,
        paddingBottom: isMobile ? 60 : 40, // extra bottom padding for mobile
      }}
    >
      <View
        style={{
          flexDirection: isDesktop || isTablet ? "row" : "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          gap: isDesktop || isTablet ? 40 : 24,
        }}
      >
        {/* IMAGE */}
        <View
          style={{
            width: isDesktop || isTablet ? "50%" : "100%",
            alignItems: "center",
            marginBottom: isMobile ? 20 : 0, // spacing below image on mobile
          }}
        >
          <Image
            source={require("../../assets/Image3.png")}
            style={{
              width: "100%",
              maxWidth: 500,
              aspectRatio: 4 / 3,
              borderRadius: 16,
            }}
            resizeMode="cover"
          />
        </View>

        {/* CONTENT */}
        <View
          style={{
            width: isDesktop || isTablet ? "50%" : "100%",
            alignItems: isDesktop || isTablet ? "flex-start" : "center",
          }}
        >
          {/* HEADING */}
          <Text
            style={{
              fontFamily: "Inter-SemiBold",
              fontSize: headingFontSize,
              lineHeight: lineHeight,
              color: "#001867",
              textAlign: isDesktop || isTablet ? "left" : "center",
              marginBottom: 12,
              flexShrink: 1,
            }}
          >
            The unseen of spending three years at Pixelgrade
          </Text>

          {/* PARAGRAPH */}
          <Text
            style={{
              fontFamily: "Inter-Regular",
              fontSize: paragraphFontSize,
              lineHeight: paragraphFontSize * 1.6,
              color: "#222629",
              textAlign: isDesktop || isTablet ? "left" : "center",
              marginBottom: isMobile ? 24 : 12, // extra spacing before button on mobile
              flexShrink: 1,
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
            justo ipsum. Sed accumsan quam vitae est varius fringilla. Pellentesque
            placerat vestibulum lorem sed porta. Nullam mattis tristique iaculis.
            Nullam pulvinar sit amet risus pretium auctor. Etiam quis massa
            pulvinar, aliquam quam vitae, tempus sem. Donec elementum pulvinar odio.
          </Text>

          {/* BUTTON */}
          <TouchableOpacity
            style={{
              width: 160,
              borderRadius: 12,
              overflow: "hidden",
              alignSelf: isDesktop || isTablet ? "flex-start" : "center",
            }}
          >
            <LinearGradient
              colors={["#FFC20E", "#FFC20E"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                paddingVertical: 12,
                alignItems: "center",
                borderRadius: 12,
              }}
            >
              <Text
                style={{
                  color: "#001867",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Learn More
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default InfoScreen;
