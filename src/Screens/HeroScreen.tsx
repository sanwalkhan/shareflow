import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// import { AdvancedAnalyticsCard, EnterpriseSecurityCard, SmartAutomationCard } from './Cards';
import { AdvancedAnalyticsCard, EnterpriseSecurityCard, SmartAutomationCard } from './Cards';
import InfoScreen from "./InfoScreen";
import BusinessScreen from "./BusinessScreen";
import Marketing from "./Marketing";
import Footer from "./Footer";





const HeroScreen: React.FC = () => {
  return (
    <ScrollView className="flex-1 bg-white">
    
      {/* Top Section with Rectangle.png Background */}
     <View
  style={{
    backgroundColor: "#003C1F", // exact color
    paddingTop: 48,   // pt-12
    paddingBottom: 64, // pb-16
    paddingHorizontal: 24, // px-6
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 850, // h-[850px]
  }}
></View>

     <ImageBackground
  source={require("../assets/Rectangle.png")}
  className="px-2 pt-172 pb-16 mt-[-690] flex-row justify-between items-center h-[950px] w-full"
  resizeMode="cover" // ensures full coverage
  imageStyle={{}} // remove marginLeft
>
 <ImageBackground
  source={require("../assets/Rectangle.png")}
  className="px-2 pt-172 pb-16 mt-[210] flex-row justify-between items-center h-[950px] w-full"
  resizeMode="cover"
  imageStyle={{
    marginLeft: 220, // 👈 image ko left shift karega
  }}
>
</ImageBackground>




     {/* Left Text */}
<View
  className="flex-1 pr-4 mt-[-760]"
  style={{ marginLeft: -1300 }}   // 👈 Left move yahan control karo
>
  <Text
    style={{
      width: 495,
      height: 53,
      opacity: 1,
      fontFamily: "Poppins-SemiBold",
      fontSize: 40,
      color: "#FFFFFF",
    }}
  >
    Financial Intelligence
  </Text>

  <Text
    style={{
      width: 495,
      height: 53,
      opacity: 1,
      fontFamily: "Poppins-Bold",
      fontSize: 40,
      color: "#00FF99",
    }}
  >
    Reimagined
  </Text>

  <View className="flex-row mt-6 space-x-4">
    <TouchableOpacity>
      <LinearGradient
        colors={["#2A2F50", "#28A745"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="px-6 py-3 rounded-lg"
      >
        <Text className="text-white font-semibold text-lg">Register</Text>
      </LinearGradient>
    </TouchableOpacity>

    <TouchableOpacity>
      <LinearGradient
        colors={["#4CAF4F", "#28A745"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="px-6 py-3 rounded-lg"
      >
        <Text className="text-white font-semibold text-lg">Watch Demo</Text>
      </LinearGradient>
    </TouchableOpacity>
  </View>
</View>


{/* Right Image */}
<View className="flex-1 items-center justify-center mt-[-760] ml-[-100]">  {/* Right Image upar shift */}
  <Image
    source={require("../assets/Image2.png")}
    className="w-96 h-96"
    resizeMode="contain"
  />
</View>
</ImageBackground>
      {/* Rest of your sections remain the same */}
      {/* Middle Section */}
      <View className="px-6 py-12 items-center">
        <View className="items-center mt-[-680]"> {/* upar shift container */}
  <Text
    style={{
      width: 434,
      height: 31,
      fontFamily: "Poppins-SemiBold",
      fontSize: 25.06,
      fontWeight: "600",
      color: "#FFFFFF",
      textAlign: "center",
    }}
  >
    Everything Your Business Needs
  </Text>

  {/* White underline */}
  <View
    style={{
      width: 350,        // same as text width
      height: 2,         // line thickness
      backgroundColor: "#FFFFFF",
      marginTop: 4,      // space between text and line
    }}
  />
</View>

        <Text className="text-white text-center mt-4">Who is Nextcent suitable for?</Text>
      </View>
      
  <AdvancedAnalyticsCard />
      <EnterpriseSecurityCard />
      <SmartAutomationCard />
      {/* Add Info Section below */}
<InfoScreen />
<BusinessScreen/>
<Marketing/>
<Footer/>
    </ScrollView>
  );
};

export default HeroScreen;
