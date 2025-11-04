import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
  StatusBar,
  Platform,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants/theme";

// Utility Function to match App.jsx styling
const hexToRgba = (hex: string, alpha: number) => {
  if (!hex || typeof hex !== 'string') {
    // Return a default or error color if hex is invalid
    return `rgba(0, 0, 0, ${alpha})`; 
  }
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default function Header() {
  const navigation = useNavigation();
  const [isMobileView, setIsMobileView] = useState(
    Dimensions.get("window").width < 768
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuHeight = useRef(new Animated.Value(0)).current;
  const menuOpacity = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Enhanced responsive handling with throttling
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout | null = null; // FIX: Initialize to null

    const handleResize = ({ window }: { window: { width: number } }) => {
      if (resizeTimeout) clearTimeout(resizeTimeout); // FIX: Check if defined
      resizeTimeout = setTimeout(() => {
        setIsMobileView(window.width < 768);
        // Close menu on resize to desktop
        if (window.width >= 768 && isMenuOpen) {
          closeMenu();
        }
      }, 100);
    };

    const subscription = Dimensions.addEventListener("change", handleResize as any); // Use 'as any' if types mismatch
    return () => {
      if (resizeTimeout) clearTimeout(resizeTimeout); // FIX: Check if defined
      subscription?.remove();
    };
  }, [isMenuOpen]); // Use isMenuOpen, not isMobileOpen

  // Enhanced menu animations
  const openMenu = () => {
    setIsMenuOpen(true);
    Animated.parallel([
      Animated.timing(menuHeight, {
        toValue: 280, // You might need to adjust this height if you add more items
        duration: 400,
        useNativeDriver: false,
      }),
      Animated.timing(menuOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeMenu = () => {
    Animated.parallel([
      Animated.timing(menuHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(menuOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => setIsMenuOpen(false));
  };

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  // Button press animation
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleRegisterPress = () => {
    navigation.navigate("Auth" as never);
  };

  const handleNavItemPress = (item: string) => {
    closeMenu();
    // Add navigation logic here for each item
    console.log(`Navigating to: ${item}`);
  };

  return (
    <View className="relative bg-transparent w-full overflow-visible">
      <StatusBar 
        backgroundColor={COLORS.neutral} 
        barStyle="light-content" 
      />
      
      {/* Enhanced Header Background with gradient effect */}
      <View
        className="absolute top-0 left-0 right-0 bottom-0 border-b"
        style={{
          backgroundColor: COLORS.neutral,
          borderColor: hexToRgba(COLORS.primary, 0.2), // `${COLORS.primary}20`
          shadowColor: COLORS.black,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 12,
          elevation: 8,
        }}
      />

      {/* Subtle background pattern overlay */}
      <View
        className="absolute top-0 left-0 right-0 h-full opacity-5"
        style={{
          backgroundColor: Platform.OS === 'web' ? `linear-gradient(45deg, ${COLORS.primary} 25%, transparent 25%)` : 'transparent',
        }}
      />

      {/* Main Header Container */}
      <View className="flex-row items-center justify-between px-4 md:px-8 lg:px-12 pt-6 pb-4 max-w-7xl mx-auto w-full">
        
        {/* Updated Logo with PNG Image - Now just the SF icon */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => navigation.navigate("Home" as never)} // Assuming tapping logo goes to Home
        >
          <Animated.View
            className="p-2 rounded-xl"
            style={{
              transform: [{ scale: scaleAnim }],
              shadowColor: COLORS.accent,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            {/* PNG Logo - Adjusted size for an icon-style logo */}
            <Image 
              source={require("../assets/images/logo.png")}
              style={{ 
                width: 40, 
                height: 40,
                resizeMode: 'contain'
              }}
            />
          </Animated.View>
        </TouchableOpacity>

        {/* Desktop Navigation (Rest of the code remains the same) */}
        {!isMobileView ? (
          <View className="flex-row items-center space-x-2">
            {["Features", "Pricing", "About", "Contact"].map((item, index) => (
              <TouchableOpacity
                key={item}
                className="px-4 py-2.5 rounded-xl mx-1 relative group"
                activeOpacity={0.7}
                onPress={() => handleNavItemPress(item)}
              >
                <Text
                  className="text-base font-semibold tracking-wide transition-all duration-300"
                  style={{ 
                    color: COLORS.textLight,
                  }}
                >
                  {item}
                </Text>
                
                {/* Animated underline */}
                <View
                  className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: COLORS.primary }}
                />
              </TouchableOpacity>
            ))}

            {/* --- NEW "SIGN IN" BUTTON (Secondary Style) --- */}
            <Animated.View style={{ transform: [{ scale: scaleAnim }], marginLeft: 12 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Signin" as never)} // Assuming "Sign In" goes to Auth
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                className="rounded-xl border items-center justify-center"
                style={{
                  paddingHorizontal: 24, // 'px-6' from App.jsx
                  paddingVertical: 12,   // 'py-3' from App.jsx
                  backgroundColor: 'transparent',
                  borderColor: hexToRgba(COLORS.white, 0.2), // 'border-white/20'
                }}
              >
                <Text className="text-white font-bold text-sm" style={{ color: COLORS.white }}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </Animated.View>

            {/* --- MODIFIED "REGISTER" BUTTON (Primary Style) --- */}
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <TouchableOpacity
                onPress={handleRegisterPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                className="flex-row items-center ml-2 rounded-xl border" // Added ml-2 for spacing
                style={{
                  backgroundColor: COLORS.accent, // 'bg-primary'
                  borderColor: COLORS.accent,   // 'border-primary'
                  paddingHorizontal: 24, // 'px-6'
                  paddingVertical: 12,   // 'py-3'
                  shadowColor: COLORS.accent,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 12,
                  elevation: 6,
                }}
              >
                <Text className="font-bold text-sm" style={{ color: COLORS.neutral }}>
                  Register Company
                </Text>
                <Feather name="arrow-right" size={16} color={COLORS.neutral} style={{ marginLeft: 6 }} />
              </TouchableOpacity>
            </Animated.View>
          </View>
        ) : (
          // Enhanced Mobile Menu Button
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
              className="p-3 rounded-xl border-2"
              onPress={toggleMenu}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              activeOpacity={0.8}
              style={{
                backgroundColor: hexToRgba(COLORS.surface, 0.8), // `${COLORS.surface}CC`
                borderColor: hexToRgba(COLORS.primary, 0.2), // `${COLORS.primary}30`
                shadowColor: COLORS.accent,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 6,
                elevation: 4,
              }}
            >
              <Feather
                name={isMenuOpen ? "x" : "menu"}
                size={24}
                color={COLORS.accent}
              />
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>

      {/* Enhanced Mobile Dropdown Menu */}
      {isMobileView && (
        <Animated.View
          className="absolute top-full left-4 right-4 mt-2 rounded-2xl border-2 overflow-hidden z-50"
          style={{
            height: menuHeight,
            opacity: menuOpacity,
            backgroundColor: COLORS.surface,
            borderColor: hexToRgba(COLORS.primary, 0.2), // `${COLORS.primary}30`
            shadowColor: COLORS.black,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.4,
            shadowRadius: 20,
            elevation: 16,
          }}
        >
          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={{ paddingVertical: 8 }}
          >
            {["Features", "Pricing", "About", "Contact"].map((item, index) => (
              <TouchableOpacity
                key={item}
                className="py-4 px-6 border-b mx-4 active:bg-white/5 rounded-xl"
                onPress={() => handleNavItemPress(item)}
                style={{ 
                  borderBottomColor: hexToRgba(COLORS.primary, 0.13), // `${COLORS.primary}20`
                  marginHorizontal: 16,
                  marginBottom: 4,
                }}
                activeOpacity={0.6}
              >
                <View className="flex-row items-center">
                  <View
                    className="w-2 h-2 rounded-full mr-3"
                    style={{ backgroundColor: COLORS.accent }}
                  />
                  <Text 
                    className="text-lg font-semibold tracking-wide flex-1"
                    style={{ color: COLORS.textLight }}
                  >
                    {item}
                  </Text>
                  <Feather 
                    name="chevron-right" 
                    size={18} 
                    color={hexToRgba(COLORS.textLight, 0.5)} // `${COLORS.textLight}80`
                  />
                </View>
              </TouchableOpacity>
            ))}

            {/* Mobile CTA Section */}
            <View className="px-6 pt-4 pb-6 mt-2">
              <View className="border-t pt-4" style={{ borderTopColor: hexToRgba(COLORS.primary, 0.13) }}>
                
                {/* --- NEW "SIGN IN" BUTTON (Secondary Style) --- */}
                <TouchableOpacity
                  onPress={() => navigation.navigate("Auth" as never)}
                  className="w-full py-3 rounded-xl border items-center justify-center"
                  style={{
                    backgroundColor: 'transparent',
                    borderColor: hexToRgba(COLORS.white, 0.2), // 'border-white/20'
                  }}
                  activeOpacity={0.7}
                >
                  <Text 
                    className="text-center font-bold text-base"
                    style={{ color: COLORS.white }}
                  >
                    Sign In
                  </Text>
                </TouchableOpacity>

                {/* --- MODIFIED "REGISTER" BUTTON (Primary Style) --- */}
                <TouchableOpacity
                  onPress={handleRegisterPress}
                  className="flex-row items-center justify-center w-full py-4 mt-3 rounded-xl border" // Added mt-3
                  style={{
                    backgroundColor: COLORS.accent,
                    borderColor: COLORS.accent,
                    shadowColor: COLORS.accent,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 6,
                  }}
                >
                  <Text className="font-bold text-lg mr-3" style={{ color: COLORS.neutral }}>
                    Register Company
                  </Text>
                  <Feather name="arrow-right" size={20} color={COLORS.neutral} />
                </TouchableOpacity>
                
                {/* ❌ REMOVED Original "Schedule Demo" button */}
              </View>
            </View>
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
}

