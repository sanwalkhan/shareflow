import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import { ChevronRight, ArrowRight } from 'lucide-react-native';
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../Constants/theme";
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
  const { width: sw } = useWindowDimensions();
  const isDesktop = sw >= 1200;
  const isTablet = sw >= 768 && sw < 1200;
 
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: "#ffffff",
        paddingHorizontal: isDesktop ? 80 : isTablet ? 40 : 16,
        paddingVertical: 20,
        alignItems: 'stretch',
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Heading */}
      <Text
  style={{
    textAlign: "center",
    fontSize: isDesktop ? 32 : isTablet ? 28 : 24,
    fontWeight: "700",
    color: COLORS.textDark, // 👈 #00124D from theme
    marginTop: 24,
  }}
>
  Caring is the new marketing
</Text>
      <Text
  style={{
    textAlign: "center",
    fontSize: isDesktop ? 16 : isTablet ? 15 : 14,
    color: COLORS.gray, // 👈 #666666 from theme
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
          gap: 16,
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
              width: isDesktop ? "32%" : isTablet ? "48%" : "100%",
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
              flexGrow: 1,
              minHeight: 400, // auto adjust card height
              paddingBottom: 16,
            }}
          >
            {/* Image */}
            <Image
              source={card.image}
              style={{
                width: "90%",
                aspectRatio: 4 / 3,
                borderRadius: 12,
                resizeMode: "cover",
                marginTop: 16,
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
  colors={[COLORS.button, COLORS.button]} // 👈 gradient from theme
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 0 }}
  style={{
    borderRadius: 20,
    marginTop: 8,
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
                 <Text
    style={{
      color: COLORS.textDark, // 👈 #00124D from theme
      fontWeight: "700",
      marginRight: 4,
    }}
  >
    Read More
  </Text>
                <ChevronRight size={16} color="#00124D" />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        ))}
      </View>
 
      {/* Get a Demo Button */}
   
<View style={{ marginTop: 32, alignItems: "center" }}>
  <LinearGradient
    colors={[COLORS.button, COLORS.button]} // 👈 gradient from theme
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={{
      borderRadius: 20,
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
             <Text
      style={{
        color: COLORS.textDark, // 👈 #00124D from theme
        fontWeight: "700",
        marginRight: 6,
      }}
    >
      Get a Demo
    </Text>
    <ArrowRight size={18} color={COLORS.textDark} />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};
 
export default Marketing;