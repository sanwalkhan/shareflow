import React, { useState, useEffect, useRef } from "react";
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";

export default function Features() {
  const [isMobileView, setIsMobileView] = useState(
    Dimensions.get("window").width < 768
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setIsMobileView(window.width < 768);
    });

    return () => subscription?.remove();
  }, []);

  const features = [
    {
      icon: "bar-chart-2",
      title: "Advanced Analytics",
      desc: "Real-time insights and custom reports with predictive modeling and AI-driven recommendations.",
    },
    {
      icon: "shield",
      title: "Enterprise Security",
      desc: "Bank-grade encryption, multi-factor authentication, and comprehensive audit trails.",
    },
    {
      icon: "zap",
      title: "Smart Automation",
      desc: "Intelligent workflow automation for approvals, payroll, and compliance processes.",
    },
    {
      icon: "send",
      title: "Cross-Platform Sharing",
      desc: "Seamlessly share financial data and reports across different devices and team members.",
    },
  ];

  const handleScroll = (event: any) => {
    const slideSize = isMobileView ? 320 : 380;
    const currentIndex = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    setActiveIndex(currentIndex);
  };

  const scrollToIndex = (index: number) => {
    const slideSize = isMobileView ? 320 : 380;
    scrollViewRef.current?.scrollTo({
      x: index * slideSize,
      animated: true,
    });
    setActiveIndex(index);
  };

  const nextSlide = () => {
    const nextIndex = (activeIndex + 1) % features.length;
    scrollToIndex(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = (activeIndex - 1 + features.length) % features.length;
    scrollToIndex(prevIndex);
  };

  return (
    <View className="w-full bg-neutral">
      
      {/* Main Content */}
      <View
        style={{
          paddingVertical: isMobileView ? 40 : 80,
          paddingHorizontal: isMobileView ? 16 : 32,
        }}
      >
        <View className="w-full max-w-6xl mx-auto">
          
          {/* Section Header */}
          <View className="items-center mb-12">
            <View className="items-center mb-3">
              <Text className="text-white text-center font-black mb-2 tracking-tight text-2xl md:text-3xl">
                Everything your business needs
              </Text>
              <View className="w-16 h-1 rounded-sm bg-accent/80" />
            </View>
            <Text className="text-white/80 text-center text-sm md:text-base leading-6 tracking-tight max-w-[600px]">
              Advanced tools to simplify financial operations and drive growth.
            </Text>
          </View>

          {/* Slider Container */}
          <View className="relative">
            
            {/* Navigation Arrows - Desktop */}
            {!isMobileView && (
              <>
                <TouchableOpacity
                  onPress={prevSlide}
                  className="absolute left-[-60px] top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/20 justify-center items-center z-10"
                >
                  <Feather name="chevron-left" size={24} color={COLORS.white} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={nextSlide}
                  className="absolute right-[-60px] top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/20 justify-center items-center z-10"
                >
                  <Feather name="chevron-right" size={24} color={COLORS.white} />
                </TouchableOpacity>
              </>
            )}

            {/* Features Slider */}
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              decelerationRate="fast"
              snapToInterval={isMobileView ? 320 : 380}
              snapToAlignment="center"
              contentContainerStyle={{
                paddingHorizontal: isMobileView ? 10 : 20,
                gap: isMobileView ? 16 : 24,
              }}
            >
              {features.map((feature, index) => (
                <View
                  key={feature.title}
                  className="bg-white rounded-2xl p-6 relative overflow-hidden border border-gray-100 shadow-xl"
                  style={{
                    width: isMobileView ? 300 : 360,
                    height: isMobileView ? 280 : 320,
                  }}
                >
                  
                  {/* Accent Top Bar */}
                  <View className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-accent/80" />

                  {/* Icon Section */}
                  <View className="flex-row items-start mb-4">
                    <View className="w-12 h-12 rounded-xl justify-center items-center mr-4 bg-accent/10 border border-accent/20">
                      <Feather 
                        name={feature.icon as any} 
                        size={22} 
                        color={COLORS.accent} 
                      />
                    </View>
                    
                    {/* Number Badge */}
                    <View className="w-6 h-6 rounded-full justify-center items-center border border-white bg-accent shadow-md">
                      <Text className="text-white text-[10px] font-black">
                        {index + 1}
                      </Text>
                    </View>
                  </View>

                  {/* Content */}
                  <Text className="text-xl font-black text-textDark mb-3 tracking-tight">
                    {feature.title}
                  </Text>
                  <Text className="text-sm leading-5 text-textDark/70 tracking-tight mb-6">
                    {feature.desc}
                  </Text>

                  {/* Progress Indicator */}
                  <View className="mt-auto pt-4 border-t border-gray-200">
                    <View className="flex-row gap-1">
                      {features.map((_, dotIndex) => (
                        <View
                          key={dotIndex}
                          className={`h-1 rounded-full ${
                            dotIndex === index ? 'bg-accent w-6' : 'bg-gray-300 w-2'
                          }`}
                        />
                      ))}
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>

            {/* Mobile Navigation Dots */}
            {isMobileView && (
              <View className="flex-row justify-center items-center mt-8 gap-2">
                {features.map((_, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => scrollToIndex(index)}
                  >
                    <View
                      className={`w-2 h-2 rounded-full ${
                        index === activeIndex ? 'bg-accent' : 'bg-white/30'
                      }`}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Desktop Navigation Dots */}
            {!isMobileView && (
              <View className="flex-row justify-center items-center mt-8 gap-3">
                {features.map((_, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => scrollToIndex(index)}
                    className={`p-1 rounded-full ${
                      index === activeIndex ? 'bg-accent/20' : ''
                    }`}
                  >
                    <View
                      className={`w-3 h-3 rounded-full border ${
                        index === activeIndex 
                          ? 'bg-accent border-accent' 
                          : 'bg-transparent border-white/40'
                      }`}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Mobile Navigation Arrows */}
          {isMobileView && (
            <View className="flex-row justify-center items-center mt-6 gap-4">
              <TouchableOpacity
                onPress={prevSlide}
                className="w-10 h-10 rounded-full bg-white/10 border border-white/20 justify-center items-center"
              >
                <Feather name="chevron-left" size={20} color={COLORS.white} />
              </TouchableOpacity>
              
              <Text className="text-white/80 text-sm font-medium">
                {activeIndex + 1} / {features.length}
              </Text>
              
              <TouchableOpacity
                onPress={nextSlide}
                className="w-10 h-10 rounded-full bg-white/10 border border-white/20 justify-center items-center"
              >
                <Feather name="chevron-right" size={20} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Bottom Divider */}
      <View className="h-px bg-white/10" />
    </View>
  );
}