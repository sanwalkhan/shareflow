import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  ScrollView,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import { TrendingUp, Shield, Zap } from "lucide-react-native";
import { COLORS } from "../../Constants/theme";
interface CardProps {
  icon: "analytics" | "security" | "automation";
  title: string;
  description: string;
  style?: ViewStyle;
}

export const Cards: React.FC<CardProps> = ({
  icon,
  title,
  description,
  style,
}) => {
  const { width } = useWindowDimensions();

  const isSmallMobile = width <= 380;
  const isTablet = width >= 768;
  const isDesktop = width >= 1200;

  const IconComponent =
    icon === "analytics" ? TrendingUp : icon === "security" ? Shield : Zap;

  return (
    <View
      style={[
        styles.card,
        {
          padding: isSmallMobile ? 18 : 25,
          borderRadius: isSmallMobile ? 22 : 28,
        },
        style,
      ]}
    >
      <View
        style={[
          styles.iconWrapper,
          {
            padding: isSmallMobile ? 14 : 20,
            borderRadius: isSmallMobile ? 60 : 70,
          },
        ]}
      >
        <IconComponent
          size={isSmallMobile ? 40 : 56}
          color="#FFFFFF"
          strokeWidth={3}
        />
      </View>

      <Text
        style={[
          styles.cardTitle,
          {
            fontSize: isSmallMobile ? 18 : 22,
          },
        ]}
      >
        {title}
      </Text>

      <Text
        style={[
          styles.cardDescription,
          {
            fontSize: isSmallMobile ? 14 : 16,
            lineHeight: isSmallMobile ? 20 : 22,
          },
        ]}
      >
        {description}
      </Text>
    </View>
  );
};

// Individual cards
export const AdvancedAnalyticsCard = () => (
  <Cards
    icon="analytics"
    title="Advanced Analytics"
    description="Our membership management software provides full automation of membership renewals and payments."
    style={dynamicCardWidth()}
  />
);

export const EnterpriseSecurityCard = () => (
  <Cards
    icon="security"
    title="Enterprise Security"
    description="Our membership management software provides full automation of membership renewals and payments."
    style={dynamicCardWidth()}
  />
);

export const SmartAutomationCard = () => (
  <Cards
    icon="automation"
    title="Smart Automation"
    description="Our membership management software provides full automation of membership renewals and payments."
    style={dynamicCardWidth()}
  />
);

// ========= RESPONSIVE CARD WIDTH FUNCTION =========
const dynamicCardWidth = () => {
  const width = Dimensions.get("window").width;

  if (width <= 380) {
    // ✔ Perfect for 360px — full width
    return {
      width: "100%",
      minHeight: 260,
      marginBottom: 16,
    };
  }

  if (width < 768) {
    // Normal mobile
    return {
      width: "100%",
      minHeight: 290,
      marginBottom: 16,
    };
  }

  if (width < 1200) {
    // Tablet – 3 cards in one row
    return {
      width: width / 3.4,
      minHeight: 340,
    };
  }

  // Desktop
  return {
    width: width / 4,
    minHeight: 360,
  };
};

// ========= BASE STYLES =========
const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBackground, // theme white
    marginHorizontal: 8,
    shadowColor: COLORS.black, // theme black
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 320,
  },
  iconWrapper: {
    marginBottom: 20,
    backgroundColor: COLORS.primary, // theme primary (#001867)
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontWeight: "700",
    color: COLORS.primary, // theme primary
    marginBottom: 10,
    textAlign: "center",
  },
  cardDescription: {
    color: COLORS.textDark, // theme text color (#333333)
    textAlign: "center",
  },
});

// ========= SCROLL ROW WRAPPER =========
export const CardsRow: React.FC = () => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{
      paddingHorizontal: 16,
      justifyContent: "space-between",
    }}
  >
    <AdvancedAnalyticsCard />
    <EnterpriseSecurityCard />
    <SmartAutomationCard />
  </ScrollView>
);

export default Cards;
