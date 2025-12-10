import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { Users, Building, CreditCard, Wallet } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const BusinessScreen: React.FC = () => {
  const isDesktop = screenWidth > 768;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
        paddingHorizontal: 24,
        paddingVertical: 20,
      }}
    >
      {/* SECTION 1: Heading */}
      <View style={{ marginBottom: 24, alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "Poppins-Bold",
            fontSize: isDesktop ? 36 : 28,
            lineHeight: isDesktop ? 44 : 34,
            color: "#00124D",
            textAlign: "center",
            fontWeight: "700",
          }}
        >
          Helping a local
        </Text>
        <Text
          style={{
            fontFamily: "Poppins-Bold",
            fontSize: isDesktop ? 36 : 28,
            lineHeight: isDesktop ? 44 : 34,
            color: "#FFC20E",
            textAlign: "center",
            fontWeight: "700",
            marginTop: -4,
          }}
        >
          business reinvent itself
        </Text>
        <Text
          style={{
            fontFamily: "Poppins-Regular",
            fontSize: 14,
            color: "#00124D",
            marginTop: 8,
            textAlign: "center",
          }}
        >
          We reached here with our hard work and dedication.
        </Text>
      </View>

      {/* SECTION 2: Stats Boxes 2x2 */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: 40,
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
              width: isDesktop ? "34%" : "25%",
              height: 90,
              backgroundColor: "#fff",
              borderRadius: 16,
              padding: 12,
              marginBottom: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 3,
              marginLeft: index % 2 !== 0 ? 12 : 0, // spacing between 2 cards
            }}
          >
            {box.icon}
            <View style={{ marginLeft: 18 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "#00124D" }}>
                {box.title}
              </Text>
              <Text style={{ fontSize: 13, color: "#00124D", marginTop: 2 }}>
                {box.subtitle}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* SECTION 3: Image + Text */}
      <View
        style={{
          flexDirection: isDesktop ? "row" : "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Image Left */}
        <Image
          source={require("../../assets/Image3.png")}
          style={{
            width: isDesktop ? "48%" : "100%",
            height: isDesktop ? 520 : 180,
            borderRadius: 16,
            marginBottom: isDesktop ? 0 : 12,
          }}
          resizeMode="cover"
        />

        {/* Text Right */}
        <View
          style={{
            width: isDesktop ? "48%" : "100%",
            paddingLeft: isDesktop ? 24 : 0,
            alignItems: isDesktop ? "flex-start" : "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins-Bold",
              fontSize: isDesktop ? 28 : 22,
              color: "#00124D",
              lineHeight: isDesktop ? 36 : 28,
              textAlign: isDesktop ? "left" : "center",
              marginTop: -200,
            }}
          >
            How to design your site footer like we did
          </Text>
<Text
  style={{
    fontFamily: "Poppins-Regular",
    fontSize: isDesktop ? 18 : 15,
    color: "#00124D",
    lineHeight: isDesktop ? 24 : 22,
    textAlign: isDesktop ? "left" : "center",
    marginBottom: 32,
  }}
>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pretium,{"\n"} justo in
  scelerisque tincidunt, odio justo fermentum libero, at pulvinar elit {"\n"} mauris vitae
  nunc. Curabitur vitae nisl nec lorem tincidunt consectetur.{"\n"}Vestibulum ante ipsum primis
  in faucibus orci luctus et ultrices posuere{"\n"} cubilia curae; Sed et eros sit amet odio
  convallis lacinia.{"\n"} Proin sit amet ligula at arcu volutpat efficitur.
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
    </View>
  );
};

export default BusinessScreen;
