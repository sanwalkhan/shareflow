import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, TouchableOpacity, PanResponder, Animated } from "react-native";
import { COLORS } from "../constants/theme";
import { Feather } from "@expo/vector-icons";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const pan = useState(new Animated.ValueXY())[0];
  const screenHeight = Dimensions.get("window").height;

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CFO, TechCorp",
      text: "ShareFlow transformed our financial operations completely. We've saved 40+ hours monthly and gained insights we never thought possible.",
      rating: 5,
      result: "40+ hours saved monthly"
    },
    {
      name: "Marcus Johnson",
      role: "CEO, InnovateCo",
      text: "The analytics dashboard revealed opportunities we'd been missing for years. Our revenue increased by 23% in the first quarter.",
      rating: 5,
      result: "23% revenue growth"
    },
    {
      name: "Elena Rodriguez",
      role: "Finance Director, GlobalBank",
      text: "Implementation was seamless and the support team is exceptional. We've reduced operational costs by 35% while improving accuracy.",
      rating: 5,
      result: "35% cost reduction"
    },
    {
      name: "David Kim",
      role: "COO, ScaleFast",
      text: "The automation features alone paid for the platform in the first month. Our team can now focus on strategic initiatives.",
      rating: 5,
      result: "ROI in first month"
    },
  ];

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      { dy: pan.y }
    ], { useNativeDriver: false }),
    onPanResponderRelease: (e, gesture) => {
      if (gesture.dy < -50) {
        // Swipe up - next testimonial
        goToNext();
      } else if (gesture.dy > 50) {
        // Swipe down - previous testimonial
        goToPrevious();
      } else {
        // Return to original position
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false
        }).start();
      }
    }
  });

  const goToNext = () => {
    Animated.timing(pan, {
      toValue: { x: 0, y: -screenHeight },
      duration: 300,
      useNativeDriver: false
    }).start(() => {
      pan.setValue({ x: 0, y: screenHeight });
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false
      }).start();
    });
  };

  const goToPrevious = () => {
    Animated.timing(pan, {
      toValue: { x: 0, y: screenHeight },
      duration: 300,
      useNativeDriver: false
    }).start(() => {
      pan.setValue({ x: 0, y: -screenHeight });
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false
      }).start();
    });
  };

  const renderStars = (rating: number) => (
    <View className="flex-row gap-1">
      {[...Array(rating)].map((_, index) => (
        <Feather key={index} name="star" size={16} color={COLORS.warning} />
      ))}
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      
      {/* Header */}
      <View className="pt-16 pb-8 px-6 bg-white">
        <Text className="text-primary text-center font-black text-2xl mb-2">
          Real Results
        </Text>
        <Text className="text-textDark/75 text-center text-base">
          See what industry leaders are achieving
        </Text>
        <View className="w-16 h-1 rounded-sm bg-accent/80 mx-auto mt-3" />
      </View>

      {/* Main Card Stack */}
      <View className="flex-1 justify-center items-center px-4" {...panResponder.panHandlers}>
        <Animated.View 
          style={{
            transform: [{ translateY: pan.y }]
          }}
          className="w-full max-w-sm"
        >
          {/* Current Testimonial Card */}
          <View className="bg-white rounded-3xl p-6 border border-gray-100 shadow-2xl">
            
            {/* Result Badge */}
            <View className="bg-accent/10 border border-accent/20 rounded-2xl px-4 py-2 mb-6 self-start">
              <Text className="text-accent font-bold text-sm">
                {testimonials[currentIndex].result}
              </Text>
            </View>

            {/* Testimonial Text */}
            <Text className="text-textDark/85 text-base leading-6 italic mb-6">
              "{testimonials[currentIndex].text}"
            </Text>

            {/* Author Info */}
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-primary font-bold text-base mb-1">
                  {testimonials[currentIndex].name}
                </Text>
                <Text className="text-textDark/60 text-sm">
                  {testimonials[currentIndex].role}
                </Text>
              </View>
              
              {/* Rating */}
              {renderStars(testimonials[currentIndex].rating)}
            </View>

            {/* Avatar & Progress */}
            <View className="flex-row items-center justify-between mt-6 pt-4 border-t border-gray-200">
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-full justify-center items-center border-2 border-white bg-accent/20">
                  <Text className="text-accent font-bold text-xs">
                    {testimonials[currentIndex].name.split(" ").map((n) => n[0]).join("")}
                  </Text>
                </View>
                <Text className="text-textDark/40 text-xs ml-2">
                  Swipe for more
                </Text>
              </View>
              
              <Text className="text-textDark/40 text-sm">
                {currentIndex + 1}/{testimonials.length}
              </Text>
            </View>
          </View>

          {/* Navigation Hints */}
          <View className="flex-row justify-between items-center mt-8 px-4">
            <TouchableOpacity onPress={goToPrevious} className="flex-row items-center">
              <Feather name="chevron-up" size={20} color={COLORS.textDark} />
              <Text className="text-textDark/60 text-sm ml-1">Previous</Text>
            </TouchableOpacity>

            <View className="flex-row gap-1">
              {testimonials.map((_, index) => (
                <View
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentIndex ? 'bg-accent' : 'bg-gray-300'
                  }`}
                />
              ))}
            </View>

            <TouchableOpacity onPress={goToNext} className="flex-row items-center">
              <Text className="text-textDark/60 text-sm mr-1">Next</Text>
              <Feather name="chevron-down" size={20} color={COLORS.textDark} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>

      {/* Bottom Stats */}
      <View className="pb-8 px-6">
        <View className="flex-row justify-around bg-white/80 rounded-2xl p-4 border border-gray-100">
          <View className="items-center">
            <Text className="text-primary font-black text-lg">500+</Text>
            <Text className="text-textDark/60 text-xs">Companies</Text>
          </View>
          <View className="items-center">
            <Text className="text-primary font-black text-lg">4.9/5</Text>
            <Text className="text-textDark/60 text-xs">Rating</Text>
          </View>
          <View className="items-center">
            <Text className="text-primary font-black text-lg">99.7%</Text>
            <Text className="text-textDark/60 text-xs">Satisfaction</Text>
          </View>
        </View>
      </View>
    </View>
  );
}