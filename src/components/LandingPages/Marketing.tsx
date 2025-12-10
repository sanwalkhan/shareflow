// MarketingPage.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { ChevronRight, ArrowRight } from 'lucide-react-native';
import { LinearGradient } from "expo-linear-gradient";

const { width: screenWidth } = Dimensions.get("window");
const isDesktop = screenWidth > 768;

const cards = [
  {
    title: 'Creating Streamlined Safeguarding Processes with OneRen',
    image: require('../../assets/image18.png'),
  },
  {
    title: 'What are your safeguarding responsibilities and how can you manage them?',
    image: require('../../assets/image19.png'),
  },
  {
    title: 'Revamping the Membership Model with Triathlon Australia',
    image: require('../../assets/image20.png'),
  },
];

const Marketing: React.FC = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
        paddingHorizontal: isDesktop ? 40 : 16,
        paddingVertical: 20,
      }}
    >
      {/* Heading */}
      <Text
        style={{
          textAlign: "center",
          fontSize: isDesktop ? 32 : 24,
          fontWeight: "700",
          color: "#00124D",
          marginTop:73,
        }}
      >
        Caring is the new marketing
      </Text>

      <Text
        style={{
          textAlign: "center",
          fontSize: isDesktop ? 16 : 14,
          color: "#666666",
          marginTop: 8,
          lineHeight: 22,
        }}
      >
        The Noticest blog is the best place to read about the latest membership insights, trends and more.{"\n"}
        See who's joining the community, read about how our community are increasing their membership income{"\n"}
        and lots more.
      </Text>

      {/* Cards */}
      <View
        style={{
          flexDirection: isDesktop ? "row" : "column",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        {cards.map((card, index) => (
         <View
  key={index}
  style={{
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: isDesktop ? 0 : 16,
    width: isDesktop ? "24%" : "100%", // increased width a bit on desktop
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    height: isDesktop ? 400 : 400, // slightly taller for desktop, adjusted mobile
  }}
>


            {/* Image */}
            <Image
              source={card.image}
              style={{
                width: "100%",
                height: isDesktop ? 290 : 210,
                resizeMode: "cover",
              }}
            />

            {/* Title Box */}
            <View
              style={{
                backgroundColor: '#F0F0F0',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                marginTop: 8,
                padding: 8,
                width: "90%",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: isDesktop ? 14 : 12,
                  color: "#333",
                  fontWeight: "600",
                  lineHeight: 18,
                }}
              >
                {card.title}
              </Text>
            </View>

            {/* Read More Button */}
            <LinearGradient
              colors={['#FFC20E', '#FFC20E']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                borderRadius: 20,
                marginTop: 8,
                marginBottom: 12,
              }}
            >
              <TouchableOpacity
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "#00124D", fontWeight: "700", marginRight: 4 }}>
                  Read More
                </Text>
                <ChevronRight size={16} color="#00124D" />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        ))}
      </View>

      {/* Get a Demo Button */}
      <LinearGradient
        colors={['#FFC20E', '#FFC20E']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          borderRadius: 20,
          marginTop: 78,
          alignSelf: "center",
        }}
      >
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            paddingHorizontal: 24,
            flexDirection: "row",
            alignItems: "center",
        
          }}
        >
          <Text style={{ color: "#00124D", fontWeight: "700", marginRight: 6 }}>
            Get a Demo
          </Text>
          <ArrowRight size={18} color="#00124D" />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default Marketing;
