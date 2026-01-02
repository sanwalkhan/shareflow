import React from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { COLORS,SETTINGS_THEME } from "../../../Constants/theme";

import SettingsButton from "./Components/SettingsButton";
import SettingsSelect from "./Components/SettingsSelect";
import SettingsToggle from "./Components/SettingsToggle";

const T = COLORS?.settings?.text || {};
const BORDER = COLORS?.settings?.border || "#E5E7EB";
const PRIMARY = COLORS?.settings?.primary || "#2563EB";

const User = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>Users’ Settings</Text>

      <View style={[styles.grid, isMobile && styles.gridMobile]}>
        <View style={styles.column}>
          <Heading title="Users uploading Profile Picture" />
          <ToggleRow label="Allow profile pictures" enabled />

          <Field label="Limit of Responses for free users">
            <SettingsSelect value="50 Responses" />
          </Field>

          <Field label="Size Limit for Profile Pictures (in Kb)">
            <SettingsSelect value="Default - 4096 Kb (4Mb)" />
          </Field>
        </View>

        <View style={styles.column}>
          <Heading title="User Sign up" />
          <ToggleRow label="Allow new users to sign up" enabled />

          <Heading title="Notification about Newly added AI Agents" />
          <ToggleRow label="Notify users about new AI Agents" enabled={false} />

          <Heading title="Notifications" />
          <ToggleRow label="Send notifications to users" enabled />
        </View>

        <View style={styles.column}>
          <Field label="Response format">
            <SettingsSelect value="Text only" />
          </Field>

          <Field label="Default Theme for Users">
            <SettingsSelect value="Light Theme" />
          </Field>

          <Heading title="Profile Edit" />
          <ToggleRow label="Allow users to edit their profile" enabled />
        </View>
      </View>

      <View style={styles.bigDivider} />

      <View style={styles.accountHeader}>
        <View>
          <Text style={styles.accountTitle}>Account Creation</Text>
          <Text style={styles.accountSubtitle}>
            Select/Edit Required fields for users during Sign Up
          </Text>
        </View>

        <SettingsButton title="Add New Field +" />
      </View>
    </View>
  );
};

export default User;

/* ================= HELPERS ================= */

const Heading = ({ title }: { title: string }) => (
  <View style={styles.headingWrapper}>
    <Text style={styles.heading}>{title}</Text>
    <View style={styles.divider} />
  </View>
);

const ToggleRow = ({ label, enabled }: any) => (
  <View style={styles.toggleRow}>
    <Text style={styles.toggleLabel}>{label}</Text>
    <SettingsToggle enabled={enabled} />
  </View>
);

const Field = ({ label, children }: any) => (
  <View style={styles.field}>
    <Text style={styles.label}>{label}</Text>
    {children}
  </View>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  wrapper: { width: "100%" },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: T.sectionTitle || "#111827",
    marginBottom: 32,
  },

  grid: { flexDirection: "row", gap: 36 },
  gridMobile: { flexDirection: "column", gap: 28 },
  column: { flex: 1, gap: 24 },

  headingWrapper: { marginBottom: 6 },
  heading: {
    fontSize: 14,
    fontWeight: "600",
    color: T.sectionTitle || "#111827",
  },

  divider: {
    height: 1,
    backgroundColor: BORDER,
    marginTop: 8,
  },

  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  toggleLabel: {
    fontSize: 13,
    color: T.body || "#374151",
  },

  field: { gap: 10 },

  label: {
    fontSize: 13,
    fontWeight: "500",
    color: T.label || "#374151",
  },

  bigDivider: {
    height: 1,
    backgroundColor: BORDER,
    marginVertical: 36,
  },

  accountHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  accountTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: T.sectionTitle || "#111827",
  },

  accountSubtitle: {
    fontSize: 13,
    color: T.muted || "#6B7280",
    marginTop: 4,
  },
});
