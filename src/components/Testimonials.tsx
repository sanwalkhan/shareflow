// src/components/Testimonials.tsx
import React from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
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
      <View style={styles.starsContainer}>
        {[...Array(rating)].map((_, index) => (
          <Feather key={index} name="star" size={16} color="#FFD700" />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Background Elements */}
      <View style={styles.backgroundBase} />
      <View style={styles.backgroundPattern} />
      <View style={styles.backgroundGlow} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Trusted by Industry Leaders</Text>
            <View style={styles.titleUnderline} />
          </View>
          <Text style={styles.subtitle}>
            Join thousands of companies transforming their financial operations with ShareFlow
          </Text>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.scrollContent}
          decelerationRate="fast"
          snapToInterval={isMobile ? 320 : 380}
          snapToAlignment="center"
        >
          {cards.map((card, index) => (
            <View key={card.name} style={styles.cardContainer}>
              {/* Card Background Elements */}
              <View style={styles.cardBackground} />
              <View style={styles.cardGlow} />
              <View style={styles.cardAccent} />
              
              {/* Card Content */}
              <View style={styles.cardHeader}>
                <View style={styles.quoteIcon}>
                  <Feather name="message-square" size={24} color={COLORS.accent} />
                </View>
                {renderStars(card.rating)}
              </View>

              <Text style={styles.cardText}>"{card.text}"</Text>

              <View style={styles.cardFooter}>
                <View style={styles.author}>
                  <Text style={styles.authorName}>{card.name}</Text>
                  <Text style={styles.authorRole}>{card.role}</Text>
                </View>
                <View style={styles.companyLogo}>
                  <Text style={styles.companyInitial}>
                    {card.name.split(' ').map(n => n[0]).join('')}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Scroll Indicator */}
        <View style={styles.scrollIndicator}>
          {cards.map((_, index) => (
            <View key={index} style={styles.indicatorDot} />
          ))}
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
    backgroundColor: '#FAFAFA',
  },
  backgroundPattern: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    opacity: 0.02,
    // backgroundImage is not supported in React Native
    // backgroundImage: `radial-gradient(circle at 20% 80%, rgba(74, 144, 226, 0.1) 0%, transparent 50%)`,
  },
  backgroundGlow: {
    position: 'absolute',
    top: -50,
    left: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: COLORS.accent,
    opacity: 0.03,
    // blurRadius is not supported in React Native styles
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
    color: COLORS.primary, 
    textAlign: "center", 
    marginBottom: 12,
    letterSpacing: -0.8,
  },
  titleUnderline: {
    width: 80,
    height: 4,
    backgroundColor: COLORS.accent,
    borderRadius: 2,
    opacity: 0.8,
  },
  subtitle: { 
    color: 'rgba(10,10,10,0.7)', 
    textAlign: "center",
    fontSize: isMobile ? 16 : 18,
    lineHeight: 24,
    maxWidth: 500,
    letterSpacing: -0.2,
  },
  scrollContent: { 
    paddingHorizontal: isMobile ? 10 : 20,
    paddingVertical: 20,
    gap: 24,
  },
  cardContainer: {
    width: isMobile ? 300 : 360,
    backgroundColor: 'transparent',
    borderRadius: 24,
    padding: 28,
    marginHorizontal: 8,
    position: 'relative',
    overflow: 'hidden',
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  quoteIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(74, 144, 226, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  cardText: { 
    color: 'rgba(10,10,10,0.85)', 
    fontStyle: "italic", 
    marginBottom: 24,
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: -0.2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(10,10,10,0.08)',
  },
  author: {
    flex: 1,
  },
  authorName: { 
    color: COLORS.primary, 
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 2,
    letterSpacing: -0.3,
  },
  authorRole: { 
    color: 'rgba(10,10,10,0.6)', 
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  companyLogo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(74, 144, 226, 0.2)',
  },
  companyInitial: {
    color: COLORS.accent,
    fontWeight: '700',
    fontSize: 14,
  },
  scrollIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    gap: 8,
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(10,10,10,0.2)',
  },
});