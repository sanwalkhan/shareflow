import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { HR_THEME, COLORS } from "../../../Constants/theme";

const FamilyDetails: React.FC = () => {
  const { width } = useWindowDimensions();
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
      <Text style={styles.title}>Family Details</Text>

      {/* FAMILY CARD 1 */}
      <View style={styles.card}>
        <Text style={styles.name}>MR Natnael Dawit</Text>

        <Text style={styles.meta}>
          Relationship : Brother{"  "} | {"  "}
          Phone No : 090 32398888
        </Text>

        <Text style={styles.address}>
          Address: Djibouti street ,Addis Ababa
        </Text>
      </View>

      {/* FAMILY CARD 2 */}
      <View style={styles.card}>
        <Text style={styles.name}>MR Natnael Dawit</Text>

        <Text style={styles.meta}>
          Relationship : Brother{"  "} | {"  "}
          Phone No : 090 32398888
        </Text>

        <Text style={styles.address}>
          Address: Djibouti street ,Addis Ababa
        </Text>
      </View>
    </ScrollView>
  );
};

export default FamilyDetails;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 24,
    backgroundColor: COLORS.white,
    borderRadius: HR_THEME.card.radius,
  },

  // Center content on desktop/web
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
    paddingHorizontal: 24,
    marginBottom: 18,
  },

  name: {
    fontFamily: HR_THEME.fonts.heading,
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.black,
    marginBottom: 8,
  },

  meta: {
    fontFamily: HR_THEME.fonts.body,
    fontSize: 13,
    color: HR_THEME.text.muted,
    marginBottom: 6,
    flexWrap: "wrap",
  },

  address: {
    fontFamily: HR_THEME.fonts.body,
    fontSize: 13,
    color: HR_THEME.text.muted,
    lineHeight: 20,
    flexWrap: "wrap",
  },
});
