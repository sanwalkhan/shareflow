// Cards.tsx
import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { TrendingUp, Shield, Zap } from 'lucide-react-native';

interface CardProps {
  icon: 'analytics' | 'security' | 'automation';
  title: string;
  description: string;
  style?: ViewStyle;
}

export const Cards: React.FC<CardProps> = ({ icon, title, description, style }) => {
  const IconComponent =
    icon === 'analytics' ? TrendingUp : icon === 'security' ? Shield : Zap;

  return (
    <View style={[styles.card, style]}>
      <View style={styles.iconWrapper}>
        <IconComponent size={56} color="#3FBF7F" strokeWidth={3} />
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
  );
};

// Individual cards with custom styles
export const AdvancedAnalyticsCard = () => (
  <Cards
    icon="analytics"
    title="Advanced Analytics"
    description="Our membership management software provides full automation of membership renewals and payments."
    style={styles.advancedCard}
  />
);

export const EnterpriseSecurityCard = () => (
  <Cards
    icon="security"
    title="Enterprise Security"
    description="Our membership management software provides full automation of membership renewals and payments."
    style={styles.enterpriseCard}
  />
);

export const SmartAutomationCard = () => (
  <Cards
    icon="automation"
    title="Smart Automation"
    description="Our membership management software provides full automation of membership renewals and payments."
    style={styles.smartCard}
  />
);

const styles = StyleSheet.create({
  card: {
    width: 350,
    height: 400,
    backgroundColor: '#FEFFFA',
    borderRadius: 28,
    padding: 25,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconWrapper: {
    marginBottom: 28,
    backgroundColor: '#E8F5EE',
    padding: 28,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 18,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 17,
    color: '#6B7280',
    lineHeight: 26,
    textAlign: 'center',
  },
  // Custom styles for each card
advancedCard: {
  marginLeft: 100,  // spacing between cards
  backgroundColor: '#FEFFFA',
  marginTop: -320,   // lift the card upwards
},
enterpriseCard: {
  marginLeft: 500, // increased spacing
 backgroundColor: '#FEFFFA',
  marginTop: -410, 
},
smartCard: {
     marginLeft: 900,
      marginTop: -410, 
   backgroundColor: '#FEFFFA',
},

});

export default Cards;
