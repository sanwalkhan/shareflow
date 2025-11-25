// InfoSection.tsx
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";


const InfoScreen: React.FC = () => {
  return (
    <View className="w-full flex-row px-6 py-10 items-center">

      {/* LEFT SIDE IMAGE */}
      <View className="w-1/2 pr-4">
        <Image
  source={require('../../assets/Image3.png')}
  className="w-full h-60 rounded-xl"
  resizeMode="cover"
/>

      </View>

      {/* RIGHT SIDE CONTENT */}
      <View className="w-1/2 pl-4">
        <Text
  style={{
    width: 521,
    height: 77,
    fontFamily: "Inter-SemiBold",
    fontSize: 31.24,
    color: "#4D4D4D",
    lineHeight: 36, // perfect spacing
    marginLeft:22,
  }}
>
  The unseen of spending three years{"\n"}
  at Pixelgrade
<View className="px-6 mt-4">
  <Text
    style={{
      color: "#000000",             // black text
      fontFamily: "Inter-Regular",   // your font
      fontSize: 16,                  // readable
      lineHeight: 24,                // space between lines
      textAlign: "justify", 
      marginLeft:-18,         // aligns both left and right edges
    }}
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
    justo ipsum. Sed accumsan quam vitae est varius fringilla. Pellentesque
    placerat vestibulum lorem sed porta. Nullam mattis tristique iaculis.
    Nullam pulvinar sit amet risus pretium auctor. Etiam quis massa pulvinar,
    aliquam quam vitae, tempus sem. Donec elementum pulvinar odio.
  </Text>
</View>
</Text>

        {/* BUTTON */}
       <TouchableOpacity className="mt-40 w-36 rounded-xl overflow-hidden ml-[30]">
  <LinearGradient
    colors={["#2A2F50", "#28A745"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    className="px-5 py-3 rounded-xl"
  >
    <Text className="text-white font-semibold text-center">
      Learn More
    </Text>
  </LinearGradient>
</TouchableOpacity>

      </View>

    </View>
  );
};

export default InfoScreen;
