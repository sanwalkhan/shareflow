// MarketingPage.tsx
import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronRight, ArrowRight } from 'lucide-react-native';
import { LinearGradient } from "expo-linear-gradient";

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
    <ScrollView className="bg-white flex-1 px-5 pt-5 mt-[-113]">
      {/* Heading */}
      <Text className="text-center text-2xl font-bold text-[#4D4D4D]">
  Caring is the new marketing
</Text>

      <Text className="text-center text-gray-500 mt-4">
  The Noticest blog is the best place to read about the latest membership insights, trends and more.{"\n"}
  See who's joining the community, read about how our community are increasing their membership income{"\n"}
  and lots more.
</Text>


      {/* Cards - 3 in one row */}
      <View className="flex-row justify-between mt-12">
        {cards.map((card, index) => (
          <View
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden items-center w-[32%] h-[520]"
          > 
            {/* Image */}
            <Image
              source={card.image}
              className="w-full h-82"
              resizeMode="cover"
            />

            {/* Title Box */}
            <View
              style={{
                width: 400,
                height: 120,
                backgroundColor: '#F0F0F0',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                marginTop: 5,
                padding: 10,
              }}
            >
              <Text className="text-gray-800 font-semibold text-center text-base">
                {card.title}
              </Text>
            </View>

            {/* Read More Button */}
           <LinearGradient
  colors={['#2A2F50', '#28A745']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 0 }}
  className="mt-3 rounded-full"
>
  <TouchableOpacity className="py-2 px-4 flex-row items-center justify-center">
    <Text className="text-white font-semibold mr-2">Read More</Text>
    <ChevronRight size={16} color="#ffffff" />
  </TouchableOpacity>
</LinearGradient>
          </View>
        ))}
      </View>

      <LinearGradient
  colors={['#2A2F50', '#28A745']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 0 }}
  className="py-3 px-8 rounded-full self-center mt-6 mb-10"
>
  <TouchableOpacity className="flex-row items-center justify-center">
    <Text className="text-white font-semibold text-center mr-2">
      Get a Demo
    </Text>
    <ArrowRight size={20} color="#FFFFFF" />
  </TouchableOpacity>
</LinearGradient>

    </ScrollView>
  );
};

export default Marketing;
