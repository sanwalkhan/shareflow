// src/components/Features.tsx
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, isMobile } from "../constants/theme";

export default function Features() {
  const features = [
    { 
      icon: "bar-chart-2", 
      title: "Advanced Analytics", 
      desc: "Real-time insights and custom reports with predictive modeling and AI-driven recommendations." 
    },
    { 
      icon: "shield", 
      title: "Enterprise Security", 
      desc: "Bank-grade encryption, multi-factor authentication, and comprehensive audit trails." 
    },
    { 
      icon: "zap", 
      title: "Smart Automation", 
      desc: "Intelligent workflow automation for approvals, payroll, and compliance processes." 
    },
  ];

  return (
    <View style={styles.container}>
      {/* Background Elements */}
      <View style={styles.backgroundBase} />
      <View style={styles.backgroundAccent} />
      <View style={styles.backgroundPattern} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Everything your business needs</Text>
            <View style={styles.titleUnderline} />
          </View>
          <Text style={styles.subtitle}>
            Advanced tools designed to simplify complex financial operations and drive sustainable growth.
          </Text>
        </View>

        <View style={styles.grid}>
          {features.map((f, index) => (
            <View key={f.title} style={styles.cardContainer}>
              <View style={styles.card}>
                {/* Card Background Elements */}
                <View style={styles.cardBackground} />
                <View style={styles.cardGlow} />
                <View style={styles.cardAccent} />
                
                {/* Icon Section */}
                <View style={styles.iconContainer}>
                  <View style={styles.iconBackground} />
                  <Feather name={f.icon as any} size={26} color={COLORS.accent} />
                  <View style={styles.iconBadge}>
                    <Text style={styles.iconBadgeText}>{index + 1}</Text>
                  </View>
                </View>

                {/* Content */}
                <Text style={styles.cardTitle}>{f.title}</Text>
                <Text style={styles.cardDesc}>{f.desc}</Text>

                {/* Card Footer */}
                <View style={styles.cardFooter}>
                  <View style={styles.footerLine} />
                  <View style={styles.footerLine} />
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Bottom Pattern */}
        <View style={styles.bottomPattern} />
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
    backgroundColor: COLORS.primary,
  },
  backgroundAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 160,
    backgroundColor: '#0A0A0A',
  },
  backgroundPattern: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    opacity: 0.02,
  },
  content: {
    paddingVertical: isMobile ? 60 : 80,
    paddingHorizontal: isMobile ? 20 : 40,
    position: 'relative',
    zIndex: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: isMobile ? 40 : 60,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  title: { 
    fontSize: isMobile ? 32 : 42, 
    fontWeight: "800", 
    color: '#FFFFFF', 
    textAlign: "center", 
    marginBottom: 12,
    letterSpacing: -0.8,
    textShadowColor: 'rgba(255,255,255,0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  titleUnderline: {
    width: 80,
    height: 4,
    backgroundColor: COLORS.accent,
    borderRadius: 2,
    opacity: 0.8,
  },
  subtitle: { 
    color: 'rgba(255,255,255,0.85)', 
    textAlign: "center", 
    fontSize: isMobile ? 16 : 18,
    lineHeight: 24,
    maxWidth: 600,
    letterSpacing: -0.2,
  },
  grid: { 
    flexDirection: isMobile ? "column" : "row", 
    justifyContent: "center",
    alignItems: "flex-start",
    gap: isMobile ? 24 : 32,
  },
  cardContainer: {
    flex: 1,
    maxWidth: isMobile ? '100%' : 380,
    minWidth: isMobile ? '100%' : 300,
  },
  card: {
    backgroundColor: "transparent",
    borderRadius: 24,
    padding: 32,
    position: 'relative',
    overflow: 'hidden',
    height: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 16,
  },
  cardBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.8)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 12,
  },
  cardGlow: {
    position: 'absolute',
    top: -1,
    left: -1,
    right: -1,
    height: 4,
    backgroundColor: COLORS.accent,
    opacity: 0.1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  cardAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 6,
    height: '100%',
    backgroundColor: COLORS.accent,
    opacity: 0.1,
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  iconBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(134,194,50,0.08)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(134,194,50,0.12)',
  },
  iconBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconBadgeText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '800',
  },
  cardTitle: { 
    fontSize: 22, 
    fontWeight: "800", 
    color: '#0A0A0A', 
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  cardDesc: { 
    color: 'rgba(10,10,10,0.75)', 
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: -0.2,
    marginBottom: 20,
  },
  cardFooter: {
    marginTop: 'auto',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(10,10,10,0.08)',
    gap: 8,
  },
  footerLine: {
    height: 4,
    backgroundColor: 'rgba(10,10,10,0.06)',
    borderRadius: 2,
    width: '40%',
  },
  bottomPattern: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(10,10,10,0.04)',
  },
});