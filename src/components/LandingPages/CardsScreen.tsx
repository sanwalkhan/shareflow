import React from "react";
import { View, StyleSheet } from "react-native";
import Cards, {
  AdvancedAnalyticsCard,
  EnterpriseSecurityCard,
  SmartAutomationCard,
} from "./Cards";

const CardsScreen = () => {
  return (
    <View style={styles.container}>
      <AdvancedAnalyticsCard />
      <EnterpriseSecurityCard />
      <SmartAutomationCard />
    </View>
  );
};

export default CardsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    alignItems: "center",
  },
});
