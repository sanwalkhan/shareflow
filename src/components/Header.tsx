import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
  Image,
  Animated,
  Modal,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants/theme";

const { width, height } = Dimensions.get("window");

export default function Header() {
  const navigation = useNavigation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const slideAnim = useState(new Animated.Value(height))[0];

  const toggleMenu = () => {
    if (isMenuOpen) {
      // Slide down
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsMenuOpen(false));
    } else {
      setIsMenuOpen(true);
      // Slide up
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleRegisterPress = () => {
    closeMenu();
    navigation.navigate("Auth" as never);
  };

  const handleSignInPress = () => {
    closeMenu();
    navigation.navigate("Signin" as never);
  };

  const handleNavItemPress = (item: string) => {
    closeMenu();
    console.log(`Navigating to: ${item}`);
  };

  const handleLogoPress = () => {
    closeMenu();
    navigation.navigate("Landing" as never);
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setIsMenuOpen(false));
  };

  const menuItems = [
    { icon: "zap", label: "Features", color: COLORS.accent },
    { icon: "dollar-sign", label: "Pricing", color: "#10B981" },
    { icon: "info", label: "About", color: "#3B82F6" },
    { icon: "mail", label: "Contact", color: "#8B5CF6" },
  ];

  return (
    <View style={{ backgroundColor: 'transparent', width: '100%' }}>
      <StatusBar 
        backgroundColor={COLORS.secondary} 
        barStyle="light-content" 
      />
      
      {/* Header Background with subtle gradient effect */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: COLORS.neutral,
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(255,255,255,0.1)',
          elevation: 8,
        }}
      />

      {/* Main Header Container */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingHorizontal: 20, 
        paddingTop: 24,
        paddingBottom: 16,
        width: '100%'
      }}>
        
        {/* Logo with App Name */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleLogoPress}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Image 
            source={require("../assets/images/logo.png")}
            style={{ 
              width: 36, 
              height: 36,
              resizeMode: 'contain'
            }}
          />
          <Text style={{ 
            color: COLORS.white, 
            fontSize: 20, 
            fontWeight: 'bold', 
            marginLeft: 12,
            letterSpacing: 0.5 
          }}>
            ShareFlow
          </Text>
        </TouchableOpacity>

        {/* Modern Menu Button */}
        <TouchableOpacity
          style={{
            padding: 10,
            borderRadius: 12,
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.2)',
            elevation: 4,
          }}
          onPress={toggleMenu}
          activeOpacity={0.8}
        >
          <Feather
            name={isMenuOpen ? "x" : "menu"}
            size={22}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet Menu */}
      <Modal
        visible={isMenuOpen}
        transparent={true}
        animationType="none"
        onRequestClose={closeMenu}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <TouchableOpacity 
            style={{ flex: 1 }} 
            activeOpacity={1} 
            onPress={closeMenu}
          />
          
          <Animated.View 
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: COLORS.surface,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: 24,
              paddingBottom: 40,
              transform: [{ translateY: slideAnim }],
              elevation: 24,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.3,
              shadowRadius: 20,
            }}
          >
            {/* Drag Handle */}
            <View style={{ 
              width: 40, 
              height: 4, 
              backgroundColor: 'rgba(255,255,255,0.3)', 
              borderRadius: 2, 
              alignSelf: 'center',
              marginBottom: 24 
            }} />

            {/* Menu Items */}
            <View style={{ marginBottom: 24 }}>
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={item.label}
                  style={{ 
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 16,
                    paddingHorizontal: 8,
                    borderRadius: 12,
                    marginBottom: 8,
                  }}
                  onPress={() => handleNavItemPress(item.label)}
                  activeOpacity={0.7}
                >
                  <View style={{ 
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: item.color + '20',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 16
                  }}>
                    <Feather name={item.icon as any} size={20} color={item.color} />
                  </View>
                  <Text style={{ 
                    fontSize: 18, 
                    fontWeight: '600', 
                    color: COLORS.white,
                    flex: 1 
                  }}>
                    {item.label}
                  </Text>
                  <Feather name="chevron-right" size={18} color="rgba(255,255,255,0.5)" />
                </TouchableOpacity>
              ))}
            </View>

            {/* Auth Buttons */}
            <View style={{ gap: 12 }}>
              <TouchableOpacity
                onPress={handleSignInPress}
                style={{
                  paddingVertical: 16,
                  borderRadius: 14,
                  borderWidth: 2,
                  borderColor: 'rgba(255,255,255,0.2)',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                }}
                activeOpacity={0.8}
              >
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: COLORS.white
                }}>
                  Sign In
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleRegisterPress}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 18,
                  borderRadius: 14,
                  backgroundColor: COLORS.accent,
                  elevation: 8,
                }}
                activeOpacity={0.8}
              >
                <Text style={{ 
                  fontSize: 16, 
                  fontWeight: '700', 
                  color: COLORS.neutral,
                  marginRight: 8 
                }}>
                  Register Company
                </Text>
                <Feather name="arrow-up-right" size={18} color={COLORS.neutral} />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}