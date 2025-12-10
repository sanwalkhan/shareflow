// InfoSection.tsx
import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width: screenWidth } = Dimensions.get("window");

const InfoScreen: React.FC = () => {
  return (
    <View
      style={{
        flexDirection: screenWidth > 768 ? "row" : "column",
        backgroundColor: "#ffffff",
        paddingHorizontal: 24,
        paddingVertical: 32,
        alignItems: "flex-start",
        justifyContent: "center",
      
      }}
    >
      {/* LEFT SIDE IMAGE */}
      <View
        style={{
          width: screenWidth > 768 ? "50%" : "100%",
          paddingRight: screenWidth > 768 ? 24 : 0,
          marginTop: screenWidth > 768 ? 130 : 40, // move image slightly down
          marginBottom: screenWidth > 768 ? 0 : 20,
        }}
      >
        <Image
          source={require('../../assets/Image3.png')}
          style={{
            width: "90%",
            height: screenWidth > 768 ? 580 : 200,
            borderRadius: 16,
          }}
          resizeMode="cover"
        />
      </View>

      {/* RIGHT SIDE CONTENT */}
      <View
        style={{
          width: screenWidth > 768 ? "50%" : "100%",
          paddingLeft: screenWidth > 768 ? 24 : 0,
          alignItems: "flex-start", // left-aligned
        }}
      >
        {/* Heading */}
        <Text
          style={{
            fontFamily: "Inter-SemiBold",
            fontSize: screenWidth > 768 ? 36 : 28,
            color: "#001867ff",
            lineHeight: screenWidth > 768 ? 42 : 36,
            marginTop: 196,
            textAlign: "left",
          }}
        >
          The unseen of spending three years at Pixelgrade
        </Text>

        {/* Paragraph */}
       <Text
  style={{
    fontFamily: "Inter-Regular",
    fontSize: 20,
    color: "#222629",
    lineHeight: 28,
    textAlign: "left",
    marginBottom: 24,
  }}
>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Sed sit amet justo ipsum. {"\n"}Sed accumsan quam vitae est varius fringilla.
  Pellentesque placerat vestibulum {"\n"}lorem sed porta.Nullam mattis tristique iaculis.
  Nullam pulvinar sit amet risus {"\n"}  pretium  auctor. Etiam quis massa pulvinar,
  aliquam quam vitae, tempus sem.{"\n"} Donec elementum pulvinar odio.
</Text>

        {/* BUTTON */}
       <View style={{ alignItems: "center", marginTop: 16 }}>
  <TouchableOpacity
    style={{
      width: 160,
      borderRadius: 12,
      overflow: "hidden",
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
          color: "#001867ff",
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
    </View>
  );
};

export default InfoScreen;
