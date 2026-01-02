import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { HR_THEME, COLORS } from "../../../Constants/theme";

const FinancialDetails: React.FC = () => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        isDesktop && styles.desktopContainer,
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* TITLE */}
      <Text style={styles.title}>Financial Details</Text>

      {/* ACCOUNT CARD 1 */}
      <View style={styles.card}>
        <Text style={styles.accountNo}>100013455451 John Doe</Text>
        <Text style={styles.subText}>CBE | Savings Account</Text>
      </View>

      {/* ACCOUNT CARD 2 */}
      <View style={styles.card}>
        <Text style={styles.accountNo}>100055563301 | Doe John</Text>
        <Text style={styles.subText}>Awash Bank | Savings Account</Text>
      </View>
    </ScrollView>
  );
};

export default FinancialDetails;

/* ---------------------------- */
/* Styles                       */
/* ---------------------------- */
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: 24,
    borderRadius: HR_THEME.card.radius,
    width: "100%",
  },

  desktopContainer: {
    maxWidth: 1000, // ✅ keeps layout clean on large screens
    alignSelf: "center",
    padding: 32,
  },

  title: {
    fontFamily: HR_THEME.fonts.heading,
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.black,
    marginBottom: 22,
  },

  card: {
    backgroundColor: HR_THEME.input.bg, // light blue
    borderRadius: HR_THEME.input.radius,
    paddingVertical: 18,
    paddingHorizontal: 22,
    marginBottom: 16,
  },

  accountNo: {
    fontFamily: HR_THEME.fonts.heading,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.black,
    marginBottom: 6,
  },

  subText: {
    fontFamily: HR_THEME.fonts.body,
    fontSize: 13,
    color: HR_THEME.text.muted,
  },
});
