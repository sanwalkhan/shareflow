// src/components/CTA.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, isMobile } from "../constants/theme";

export default function CTA() {
  return (
    <View style={styles.container}>
      {/* Background Elements */}
      <View style={styles.backgroundBase} />
      <View style={styles.backgroundAccent} />
      <View style={styles.backgroundPattern} />
      <View style={styles.backgroundGlow} />
      
      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Ready to transform your financial operations?</Text>
            <View style={styles.titleUnderline} />
          </View>
          
          <Text style={styles.subtitle}>
            Join thousands of companies already using ShareFlow to save time, reduce risk, and drive sustainable growth.
          </Text>
        </View>

        <TouchableOpacity style={styles.ctaButton}>
          {/* Button Background Elements */}
          <View style={styles.buttonBackground} />
          <View style={styles.buttonGlow} />
          <View style={styles.buttonShine} />
          
          {/* Button Content */}
          <Text style={styles.buttonText}>Get Started Today</Text>
          <View style={styles.iconContainer}>
            <Feather name="arrow-up-right" size={20} color="#000" />
          </View>
        </TouchableOpacity>

        {/* Trust Indicators */}
        <View style={styles.trustSection}>
          <View style={styles.trustItem}>
            <View style={styles.trustIcon}>
              <Feather name="shield" size={16} color={COLORS.accent} />
            </View>
            <Text style={styles.trustText}>Enterprise Security</Text>
          </View>
          
          <View style={styles.trustItem}>
            <View style={styles.trustIcon}>
              <Feather name="clock" size={16} color={COLORS.accent} />
            </View>
            <Text style={styles.trustText}>30-Day Trial</Text>
          </View>
          
          <View style={styles.trustItem}>
            <View style={styles.trustIcon}>
              <Feather name="users" size={16} color={COLORS.accent} />
            </View>
            <Text style={styles.trustText}>24/7 Support</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    width: '100%',
    maxWidth: 1500,
  },
  backgroundBase: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0A0A0A',
  },
  backgroundAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: COLORS.primary,
    opacity: 0.95,
  },
  backgroundPattern: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    opacity: 0.03,
    // backgroundImage is not supported in React Native
    // backgroundImage: `radial-gradient(circle at 30% 50%, rgba(74, 144, 226, 0.1) 0%, transparent 50%)`,
  },
  backgroundGlow: {
    position: 'absolute',
    bottom: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: COLORS.accent,
    opacity: 0.05,
    // blurRadius is not supported in React Native styles
  },
  content: {
    paddingVertical: isMobile ? 60 : 80,
    paddingHorizontal: isMobile ? 20 : 40,
    alignItems: 'center',
    position: 'relative',
    zIndex: 10,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
    maxWidth: 800,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  title: { 
    color: '#FFFFFF', 
    fontSize: isMobile ? 28 : 42, 
    fontWeight: "800", 
    textAlign: "center", 
    marginBottom: 12,
    lineHeight: isMobile ? 36 : 52,
    letterSpacing: -0.8,
    textShadowColor: 'rgba(255,255,255,0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  titleUnderline: {
    width: 100,
    height: 4,
    backgroundColor: COLORS.accent,
    borderRadius: 2,
    opacity: 0.8,
  },
  subtitle: { 
    color: 'rgba(255,255,255,0.85)', 
    textAlign: "center", 
    marginBottom: 16,
    fontSize: isMobile ? 16 : 18,
    lineHeight: 24,
    letterSpacing: -0.2,
    maxWidth: 600,
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 18,
    borderRadius: 16,
    marginBottom: 40,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: COLORS.accent,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 16,
    minWidth: 240,
  },
  buttonBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.accent,
    opacity: 0.95,
  },
  buttonGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.accent,
    opacity: 0.3,
    // blurRadius is not supported in React Native styles
  },
  buttonShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  buttonText: { 
    color: '#000', 
    fontWeight: "800", 
    marginRight: 12,
    fontSize: 17,
    letterSpacing: -0.2,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  trustSection: {
    flexDirection: isMobile ? "column" : "row",
    alignItems: "center",
    gap: isMobile ? 16 : 32,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  trustIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(134,194,50,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  trustText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});