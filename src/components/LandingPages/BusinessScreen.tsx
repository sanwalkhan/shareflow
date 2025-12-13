// BusinessScreen.tsx (responsive for web + mobile)
import React from "react";
import { View, Text, Image, TouchableOpacity, useWindowDimensions, ScrollView } from "react-native";
import { Users, Building, CreditCard, Wallet } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

const BusinessScreen: React.FC = () => {
  const { width: sw } = useWindowDimensions();
  const isDesktop = sw >= 1200;
  const isTablet = sw >= 768 && sw < 1200;

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: isDesktop ? 80 : isTablet ? 40 : 16,
        paddingTop: 16,
        paddingBottom: 16,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Heading */}
      <View style={{ marginBottom: 16, alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "Poppins-Bold",
            fontSize: isDesktop ? 36 : isTablet ? 30 : 24,
            color: "#00124D",
            textAlign: "center",
          }}
        >
          Helping a local
        </Text>
        <Text
          style={{
            fontFamily: "Poppins-Bold",
            fontSize: isDesktop ? 36 : isTablet ? 30 : 24,
            color: "#FFC20E",
            textAlign: "center",
          }}
        >
          business reinvent itself
        </Text>
        <Text
          style={{
            fontFamily: "Poppins-Regular",
            fontSize: isDesktop ? 16 : isTablet ? 15 : 14,
            color: "#00124D",
            marginTop: 8,
            textAlign: "center",
          }}
        >
          We reached here with our hard work and dedication.
        </Text>
      </View>

      {/* Stats Boxes */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 12,
          marginBottom: 24,
        }}
      >
        {[ 
          { icon: <Users color="#00124D" size={36} />, title: "2,245,341", subtitle: "Members" },
          { icon: <Building color="#00124D" size={36} />, title: "684,931", subtitle: "Clubs" },
          { icon: <CreditCard color="#00124D" size={36} />, title: "1,234,567", subtitle: "Payments" },
          { icon: <Wallet color="#00124D" size={36} />, title: "643,284", subtitle: "Earnings" },
        ].map((box, index) => (
          <View
            key={index}
            style={{
              width: isDesktop ? "23%" : isTablet ? "45%" : "48%",
              minHeight: 90,
              backgroundColor: "#fff",
              borderRadius: 16,
              padding: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 3,
              marginBottom: 12,
            }}
          >
            {box.icon}
            <View style={{ marginLeft: 16 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "#00124D" }}>{box.title}</Text>
              <Text style={{ fontSize: 13, color: "#00124D", marginTop: 2 }}>{box.subtitle}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Image + Text */}
      <View
        style={{
          flexDirection: isDesktop || isTablet ? "row" : "column",
          alignItems: "stretch",
          gap: isDesktop || isTablet ? 40 : 24,
        }}
      >
        {/* Image */}
        <View style={{ flex: 1 }}>
          <Image
            source={require("../../assets/Image3.png")}
            style={{
              width: "80%",
              height: "80%",
              borderRadius: 16,
              aspectRatio: 4 / 3,
            }}
            resizeMode="cover"
          />
        </View>

        {/* Text */}
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: isDesktop || isTablet ? "flex-start" : "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins-Bold",
              fontSize: isDesktop ? 28 : isTablet ? 24 : 22,
              color: "#00124D",
              lineHeight: isDesktop ? 36 : isTablet ? 32 : 28,
              textAlign: isDesktop || isTablet ? "left" : "center",
              marginBottom: 12,
            }}
          >
            How to design your site footer like we did
          </Text>

          <Text
            style={{
              fontFamily: "Poppins-Regular",
              fontSize: isDesktop ? 18 : isTablet ? 16 : 14,
              color: "#00124D",
              lineHeight: isDesktop ? 24 : isTablet ? 22 : 20,
              textAlign: isDesktop || isTablet ? "left" : "center",
              marginBottom: 16,
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pretium, justo in
            scelerisque tincidunt, odio justo fermentum libero, at pulvinar elit mauris vitae
            nunc. Curabitur vitae nisl nec lorem tincidunt consectetur. Vestibulum ante ipsum primis
            in faucibus orci luctus et ultrices posuere cubilia curae; Sed et eros sit amet odio
            convallis lacinia. Proin sit amet ligula at arcu volutpat efficitur.
          </Text>

          <TouchableOpacity style={{ width: 160 }}>
            <LinearGradient
              colors={["#FFC20E", "#FFC20E"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                paddingVertical: 12,
                borderRadius: 12,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: "#00124D",
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

export default BusinessScreen;
