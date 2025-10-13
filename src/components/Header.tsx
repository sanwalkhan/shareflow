//src/components/Header.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants/theme";
import Button from "../UI/Button"; // ✅ Reusable button

export default function Header() {
  const navigation = useNavigation();
  const [isMobileView, setIsMobileView] = useState(
    Dimensions.get("window").width < 768
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuHeight] = useState(new Animated.Value(0));

  // ✅ Handle dynamic responsiveness
  useEffect(() => {
    const handleResize = () => {
      const width = Dimensions.get("window").width;
      setIsMobileView(width < 768);
    };

    const subscription = Dimensions.addEventListener("change", handleResize);
    return () => {
      if (typeof subscription?.remove === "function") subscription.remove();
    };
  }, []);

  // ✅ Toggle mobile dropdown
  const toggleMenu = () => {
    Animated.timing(menuHeight, {
      toValue: isMenuOpen ? 0 : 220, // slightly taller for scroll content
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleRegisterPress = () => {
    navigation.navigate("Auth" as never);
  };

  return (
    <View className="relative bg-transparent w-full overflow-hidden pb-4">
      {/* Header Background */}
      <View
        className="absolute top-0 left-0 right-0 bottom-0 border-b shadow-lg"
        style={{
          backgroundColor: COLORS.secondary,
          borderColor: "rgba(255,255,255,0.08)",
          shadowColor: COLORS.black,
        }}
      />

      {/* Main Header */}
      <View className="flex-row items-center justify-between px-6 pt-5 max-w-[1500px] self-center w-full">
        {/* Logo */}
        <View className="flex-row items-center">
          <View
            className="flex-row items-center py-2 px-3 rounded-xl border"
            style={{
              backgroundColor: "rgba(255,255,255,0.02)",
              borderColor: "rgba(255,255,255,0.05)",
            }}
          >
            <Feather name="trending-up" size={24} color={COLORS.accent} />
            <Text
              className="text-white text-xl font-extrabold ml-2.5 tracking-tight"
              style={{
                textShadowColor: "rgba(255,255,255,0.1)",
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 2,
              }}
            >
              Share<Text style={{ color: COLORS.accent }}>Flow</Text>
            </Text>
          </View>
        </View>

        {/* Right Section */}
        {!isMobileView ? (
          // ✅ Desktop View
          <View className="flex-row items-center">
            {["Features", "Pricing", "About"].map((item) => (
              <TouchableOpacity key={item} className="mx-3 py-2 relative">
                <Text
                  className="text-base font-semibold tracking-tight"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}

            {/* ✅ Reusable Button */}
            <Button
              onPress={handleRegisterPress}
              className="flex-row items-center ml-3"
              style={{
                backgroundColor: COLORS.accent,
                paddingHorizontal: 18,
                paddingVertical: 10,
                borderRadius: 12,
              }}
            >
              <Text className="text-white font-bold text-base tracking-tight mr-1.5">
                Register as Company
              </Text>
              <Feather name="arrow-right" size={16} color="#fff" />
            </Button>
          </View>
        ) : (
          // ✅ Mobile View
          <View className="flex-row items-center">
            <TouchableOpacity
              className="p-2 rounded-lg border border-white/10"
              onPress={toggleMenu}
            >
              <Feather
                name={isMenuOpen ? "x" : "menu"}
                size={22}
                color={COLORS.accent}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* ✅ Mobile Dropdown Menu */}
      {isMobileView && (
        <Animated.View
          className="overflow-hidden bg-[rgba(0,0,0,0.3)] mt-2 mx-6 rounded-2xl border border-white/10"
          style={{ height: menuHeight }}
        >
          {/* ✅ Make the dropdown scrollable */}
          <ScrollView
            className="max-h-60"
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
          >
            {["Features", "Pricing", "About"].map((item, index) => (
              <TouchableOpacity
                key={index}
                className="py-3 px-5 border-b border-white/10"
                onPress={() => {
                  setIsMenuOpen(false);
                  Animated.timing(menuHeight, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: false,
                  }).start();
                }}
              >
                <Text className="text-white text-base font-semibold tracking-tight">
                  {item}
                </Text>
              </TouchableOpacity>
            ))}

            {/* ✅ Reusable Button inside menu */}
            <View className="px-4 py-4">
              <Button
                onPress={handleRegisterPress}
                className="flex-row items-center justify-center w-full"
                style={{
                  backgroundColor: COLORS.accent,
                  borderRadius: 12,
                  paddingVertical: 10,
                }}
              >
                <Text className="text-white font-bold text-base mr-2">
                  Register as Company
                </Text>
                <Feather name="arrow-right" size={16} color="#fff" />
              </Button>
            </View>
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
}
