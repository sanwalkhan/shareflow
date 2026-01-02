import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { COLORS, HR_THEME } from "../../../Constants/theme";
import HrButton from "./Components/HrButton";

const Job: React.FC = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.pageTitle}>View Job Details</Text>

      {/* JOB ROLE */}
      <View style={styles.jobRoleWrapper}>
        <Text style={styles.label}>Job Role</Text>
        <Text style={styles.jobRole}>UIUX Designer</Text>
      </View>

      {/* DEPARTMENT + MANAGER */}
      <View style={[styles.row, isMobile && styles.rowMobile]}>
        <View style={styles.column}>
          <Text style={[styles.label, isMobile && styles.textLeft]}>
            Department
          </Text>
          <Text style={[styles.value, isMobile && styles.textLeft]}>
            Design & Marketing
          </Text>
        </View>

        <View style={styles.column}>
          <Text style={[styles.label, isMobile && styles.textLeft]}>
            Line Manager
          </Text>
          <Text style={[styles.value, isMobile && styles.textLeft]}>
            Mr Domino’s Pizza
          </Text>
        </View>
      </View>

      {/* DESCRIPTION */}
      <View style={styles.descriptionWrapper}>
        <Text style={styles.sectionTitle}>Job Description</Text>

        <Text style={styles.bullet}>
          • Creating user-centered designs by understanding business requirements
        </Text>
        <Text style={styles.bullet}>
          • Creating wireframes, prototypes and mockups
        </Text>
        <Text style={styles.bullet}>
          • Collaborating with product and engineering teams
        </Text>
      </View>

      {/* BUTTONS */}
      <View style={[styles.buttonRow, isMobile && styles.buttonRowMobile]}>
        <HrButton
          title="Upload Documents"
          active
          style={[styles.button, isMobile && styles.buttonMobile]}
        />

        <HrButton
          title="View Documents"
          style={[styles.outlineButton, isMobile && styles.buttonMobile]}
        />
      </View>
    </ScrollView>
  );
};

export default Job;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: COLORS.white,
    borderRadius: HR_THEME.card.radius,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 32,
  },

  jobRoleWrapper: {
    alignItems: "center",
    marginBottom: 32,
  },
  jobRole: {
    fontSize: 26,
    fontWeight: "800",
  },

  row: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 32,
  },
  rowMobile: {
    flexDirection: "column",
    gap: 16,
  },

  column: {
    flex: 1,
  },

  label: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: "center",
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },

  textLeft: {
    textAlign: "left",
  },

  descriptionWrapper: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 16,
  },
  bullet: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 12,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  buttonRowMobile: {
    flexDirection: "column",
  },

  button: {
    width: 220,
    height: 42,
  },
  outlineButton: {
    width: 220,
    height: 42,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: HR_THEME.sidebar.activeBg,
  },
  buttonMobile: {
    width: "100%",
  },
});
