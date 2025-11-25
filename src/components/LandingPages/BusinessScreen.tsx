import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Users, Building, CreditCard, Wallet } from "lucide-react-native"; // icons
import { LinearGradient } from "expo-linear-gradient";

const BusinessScreen: React.FC = () => {
  return (
    <ScrollView className="flex-1 bg-white px-6 py-10">

      {/* ------------------------------------
          SECTION 1: LEFT TEXT
      ------------------------------------ */}
     <View className="w-full mb-14">
  {/* Line 1 */}
 <Text
  style={{
    width: 351.89,
    height: 76,
    opacity: 1,
    fontFamily: "Poppins-Bold",   // 👈 bold
    fontSize: 36,                 // 👈 thodi badi
    color: "#4D4D4D",
    marginLeft: 53,               // 👈 left shift
  }}
>
  Helping a local
</Text>


  {/* Line 2 */}
  <Text
   style={{
    width: 351.89,
    height: 76,
    opacity: 1,
    fontFamily: "Poppins-Bold",   // 👈 bold
    fontSize: 36,                 // 👈 thodi badi
    color: "#4CAF4F",
    marginLeft: 53,               // 👈 left shift
    marginTop: -40,               // 👈 upar shift
  }}
  >
    business reinvent itself
  </Text>

  {/* Sub text */}
 <Text
  className="text-[#4D4D4D] text-base leading-6"
  style={{ marginTop: -20, marginLeft: 53 }}   // 👈 thoda upar aur left shift
>
  We reached here with our hard work and dedication.
</Text>

</View>


      {/* ------------------------------------
          SECTION 2: RIGHT SIDE STATS (4 BOXES)
      ------------------------------------ */}
     <View className="w-full flex-row flex-wrap justify-center ml-[400] mt-[-190]">

  {/* Box 1 */}
  <View className="w-[42%] bg-white rounded-2xl mb-6 mx-2 flex-row items-center p-3 ml-[144]">
    <Users color="#4CAF4F" size={42} />
    <View className="ml-4">
      <Text className="text-[#4D4D4D] font-bold text-xl">2,245,341</Text>
      <Text className="text-[#4D4D4D] text-sm mt-1">Members</Text>
    </View>
  </View>

  {/* Box 2 */}
  <View className="w-[42%] bg-white rounded-2xl mb-6 mx-2 flex-row items-center p-3 ml-[-250]">
    <Building color="#4CAF4F" size={42} />
    <View className="ml-4">
      <Text className="text-[#4D4D4D] font-bold text-xl">684,931</Text>
      <Text className="text-[#4D4D4D] text-sm mt-1">Clubs</Text>
    </View>
  </View>

  {/* Box 3 */}
  <View className="w-[42%] bg-white rounded-2xl mb-6 mx-2 flex-row items-center p-3 ml-[270]">
    <CreditCard color="#4CAF4F" size={42} />
    <View className="ml-4">
      <Text className="text-[#4D4D4D] font-bold text-xl">1,234,567</Text>
      <Text className="text-[#4D4D4D] text-sm mt-1">Payments</Text>
    </View>
  </View>

  {/* Box 4 */}
  <View className="w-[42%] bg-white rounded-2xl mb-6 mx-2 flex-row items-center p-3 ml-[-120]">
    <Wallet color="#4CAF4F" size={42} style={{ marginLeft: -125 }} />

    <View className="ml-4">
      <Text className="text-[#4D4D4D] font-bold text-xl ml-[-5]">643,284</Text>
      <Text className="text-[#4D4D4D] text-sm mt-1 ml-[-5]">Earnings</Text>
    </View>
  </View>

</View>

      {/* ------------------------------------
          SECTION 3: IMAGE LEFT – TEXT RIGHT
      ------------------------------------ */}
      <View className="w-full flex-row mt-12">
        {/* Left Image */}
       <Image
  source={require('../../assets/Image3.png')}
  className="w-1/2 h-52 rounded-xl"
  resizeMode="cover"
/>


        {/* Right */}
        <View className="w-1/2 pl-5">
          <Text
            style={{
              width: 474,
              height: 70,
              fontFamily: "Poppins-Bold",
              fontSize: 28.4,
              marginLeft:250,
              color: "#4D4D4D",
            }}
          >
            How to design your site footer like we did
          </Text>

        {/* Paragraph */}
<Text
  className="text-[#4D4D4D] mt-3 text-[13.5px] leading-6"
  style={{ marginLeft: 250 }}   // 👈 jitna right shift chahiye adjust karo
>
  Donec a eros justo. Fusce egestas tristique ultrices. Nam tempor,
  augue nec tincidunt molestie, massa nunc varius arcu, at scelerisque
  elit erat a magna. Donec quis erat at libero ultrices mollis.
  Vivamus vehicula leo dui, at porta nisi facilisis finibus.
</Text>


          {/* Button */}
         <TouchableOpacity className="mt-5 w-32 rounded-lg" style={{ marginLeft: 255,  marginTop:32}}>
  <LinearGradient
    colors={["#2A2F50", "#28A745"]}   // 👈 gradient colors
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    className="w-full py-3 rounded-lg"
  >
    <Text className="text-center text-white font-semibold">
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
