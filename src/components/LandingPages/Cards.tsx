import React from 'react';
import { View, Text, StyleSheet, ViewStyle, ScrollView, Dimensions } from 'react-native';
import { TrendingUp, Shield, Zap } from 'lucide-react-native';

interface CardProps {
  icon: 'analytics' | 'security' | 'automation';
  title: string;
  description: string;
  style?: ViewStyle;
}

export const Cards: React.FC<CardProps> = ({ icon, title, description, style }) => {
  const IconComponent = icon === 'analytics' ? TrendingUp : icon === 'security' ? Shield : Zap;

  return (
    <View style={[styles.card, style]}>
      <View style={styles.iconWrapper}>
        <IconComponent size={56} color="#FFFFFF" strokeWidth={3} /> {/* icon color white */}
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
  );
};

// Individual cards
export const AdvancedAnalyticsCard = () => (
  <Cards
    icon="analytics"
    title="Advanced Analytics"
    description="Our membership management software provides full automation of membership renewals and payments."
    style={styles.cardBase}
  />
);
export const EnterpriseSecurityCard = () => (
  <Cards
    icon="security"
    title="Enterprise Security"
    description="Our membership management software provides full automation of membership renewals and payments."
    style={styles.cardBase}
  />
);
export const SmartAutomationCard = () => (
  <Cards
    icon="automation"
    title="Smart Automation"
    description="Our membership management software provides full automation of membership renewals and payments."
    style={styles.cardBase}
  />
);

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF', // pure white
    borderRadius: 28,
    padding: 25,
    marginHorizontal: 8, // spacing between cards
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexShrink: 0, // prevent shrinking
  },
  iconWrapper: {
    marginBottom: 20,
    backgroundColor: '#001867ff', // accent background for icon
    padding: 20,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#001867ff', // accent color
    marginBottom: 10,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 16,
    color: '#333333', // neutral/dark color
    lineHeight: 22,
    textAlign: 'center',
  },
  cardBase: {
    width: screenWidth / 3.8, // reduced width, 3 cards per line comfortably
    minHeight: 380,
  },
});

// Wrapper for horizontal scrolling (optional)
export const CardsRow: React.FC = () => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ paddingHorizontal: 16, justifyContent: 'space-between' }}
  >
    <AdvancedAnalyticsCard />
    <EnterpriseSecurityCard />
    <SmartAutomationCard />
  </ScrollView>
);

export default Cards;
