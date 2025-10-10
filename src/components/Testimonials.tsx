// src/components/Testimonials.tsx
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { COLORS, isMobile } from "../constants/theme";
import { Feather } from "@expo/vector-icons";

export default function Testimonials() {
  const cards = [
    { 
      name: "Sarah Chen", 
      role: "CFO, TechCorp", 
      text: "ShareFlow transformed our financial operations completely. We've saved 40+ hours monthly and gained insights we never thought possible.",
      rating: 5
    },
    { 
      name: "Marcus Johnson", 
      role: "CEO, InnovateCo", 
      text: "The analytics dashboard revealed opportunities we'd been missing for years. Our revenue increased by 23% in the first quarter.",
      rating: 5
    },
    { 
      name: "Elena Rodriguez", 
      role: "Finance Director, GlobalBank", 
      text: "Implementation was seamless and the support team is exceptional. We've reduced operational costs by 35% while improving accuracy.",
      rating: 5
    },
    { 
      name: "David Kim", 
      role: "COO, ScaleFast", 
      text: "The automation features alone paid for the platform in the first month. Our team can now focus on strategic initiatives.",
      rating: 5
    },
  ];

  const renderStars = (rating: number) => {
    return (
      <View className="flex-row gap-0.5">
        {[...Array(rating)].map((_, index) => (
          <Feather key={index} name="star" size={16} color="#FFD700" />
        ))}
      </View>
    );
  };

  return (
    <View className="relative bg-transparent overflow-hidden w-full max-w-[1500px] mx-auto">
      {/* Background Elements */}
      <View className="absolute inset-0" style={{ backgroundColor: '#FAFAFA' }} />
      <View className="absolute inset-0 bg-transparent" style={{ opacity: 0.02 }} />
      <View className="absolute top-[-50px] left-[-50px] w-[200px] h-[200px] rounded-[100px]" style={{ backgroundColor: COLORS.accent, opacity: 0.03 }} />
      
      <View 
        className="relative z-10"
        style={{
          paddingVertical: isMobile ? 60 : 80,
          paddingHorizontal: isMobile ? 20 : 40
        }}
      >
        <View className="items-center mb-16">
          <View className="items-center mb-4 relative">
            <Text 
              className="text-primary text-center font-extrabold mb-3 tracking-[-0.8px]"
              style={{
                fontSize: isMobile ? 32 : 42,
              }}
            >
              Trusted by Industry Leaders
            </Text>
            <View className="w-20 h-1 rounded-[2px]" style={{ backgroundColor: COLORS.accent, opacity: 0.8 }} />
          </View>
          <Text 
            className="text-[#0A0A0A]/70 text-center max-w-[500px] tracking-[-0.2px] leading-6"
            style={{
              fontSize: isMobile ? 16 : 18,
            }}
          >
            Join thousands of companies transforming their financial operations with ShareFlow
          </Text>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={{
            paddingHorizontal: isMobile ? 10 : 20,
            paddingVertical: 20,
            gap: 24,
          }}
          decelerationRate="fast"
          snapToInterval={isMobile ? 320 : 380}
          snapToAlignment="center"
        >
          {cards.map((card, index) => (
            <View 
              key={card.name} 
              className="bg-transparent rounded-[24px] p-7 mx-2 relative overflow-hidden"
              style={{
                width: isMobile ? 300 : 360,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 12 },
                shadowOpacity: 0.1,
                shadowRadius: 24,
                elevation: 16,
              }}
            >
              {/* Card Background Elements */}
              <View 
                className="absolute inset-0 rounded-[24px] border"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: 'rgba(255,255,255,0.8)',
                }}
              />
              <View className="absolute top-[-1px] left-[-1px] right-[-1px] h-1 rounded-t-[24px]" style={{ backgroundColor: COLORS.accent, opacity: 0.1 }} />
              <View className="absolute top-0 left-0 w-1.5 h-full rounded-l-[24px]" style={{ backgroundColor: COLORS.accent, opacity: 0.1 }} />
              
              {/* Card Content */}
              <View className="flex-row justify-between items-center mb-5">
                <View 
                  className="w-12 h-12 rounded-[24px] justify-center items-center"
                  style={{ backgroundColor: 'rgba(134,194,50,0.08)' }}
                >
                  <Feather name="message-square" size={24} color={COLORS.accent} />
                </View>
                {renderStars(card.rating)}
              </View>

              <Text 
                className="text-[#0A0A0A]/85 italic mb-6 leading-[22px] tracking-[-0.2px]"
                style={{ fontSize: 15 }}
              >
                "{card.text}"
              </Text>

              <View className="flex-row justify-between items-center pt-5 border-t" style={{ borderTopColor: 'rgba(10,10,10,0.08)' }}>
                <View className="flex-1">
                  <Text className="text-primary font-bold text-base mb-0.5 tracking-[-0.3px]">{card.name}</Text>
                  <Text className="text-[#0A0A0A]/60 text-[13px] font-medium tracking-[0.2px]">{card.role}</Text>
                </View>
                <View 
                  className="w-11 h-11 rounded-[22px] justify-center items-center border"
                  style={{
                    backgroundColor: 'rgba(134,194,50,0.1)',
                    borderColor: 'rgba(134,194,50,0.2)',
                  }}
                >
                  <Text className="text-accent font-bold text-sm">
                    {card.name.split(' ').map(n => n[0]).join('')}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Scroll Indicator */}
        <View className="flex-row justify-center items-center mt-10 gap-2">
          {cards.map((_, index) => (
            <View 
              key={index} 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: 'rgba(10,10,10,0.2)' }}
            />
          ))}
        </View>
      </View>
    </View>
  );
}