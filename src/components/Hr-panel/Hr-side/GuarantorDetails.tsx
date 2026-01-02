import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { HR_THEME, COLORS } from "../../../Constants/theme";

const GuarantorDetails: React.FC = () => {
  const { width } = useWindowDimensions();

  // max width for desktop/web
  const isLargeScreen = width >= 1024;

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        isLargeScreen && styles.containerDesktop,
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* PAGE TITLE */}
      <Text style={styles.title}>Guarantor Details</Text>

      {/* CARD 1 */}
      <View style={styles.card}>
        <Text style={styles.name}>MR Natnael Dawit</Text>
        <Text style={styles.subText}>
          Human resource, Abysinia bank - 090 500 500 6000
        </Text>
      </View>

      {/* CARD 2 */}
      <View style={styles.card}>
        <Text style={styles.name}>MR Natnael Dawit</Text>
        <Text style={styles.subText}>
          Accountant, Abysinia bank - 090 500 500 6000
        </Text>
      </View>
    </ScrollView>
  );
};

export default GuarantorDetails;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 24,
    backgroundColor: COLORS.white,
    borderRadius: HR_THEME.card.radius,
  },

  // Centers content on large screens
  containerDesktop: {
    maxWidth: 920,
    alignSelf: "center",
    padding: 32,
  },

  title: {
    fontFamily: HR_THEME.fonts.heading,
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.black,
    marginBottom: 24,
  },

  card: {
    width: "100%",
    backgroundColor: HR_THEME.input.bg,
    borderRadius: HR_THEME.input.radius,
    paddingVertical: 20,
    paddingHorizontal: 22,
    marginBottom: 18,
  },

  name: {
    fontFamily: HR_THEME.fonts.heading,
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.black,
    marginBottom: 6,
  },

  subText: {
    fontFamily: HR_THEME.fonts.body,
    fontSize: 13,
    color: HR_THEME.text.muted,
    lineHeight: 20,
    flexWrap: "wrap",
  },
});
