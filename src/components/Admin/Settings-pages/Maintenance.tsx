import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SETTINGS_THEME } from "../../../Constants/theme";
import SettingsInput from "./Components/SettingsInput";
import SettingsSelect from "./Components/SettingsSelect";

/* ---------- PROGRESS ---------- */
const ProgressBar = ({ percent }: { percent: number }) => (
  <View style={styles.progressTrack}>
    <View style={[styles.progressFill, { width: `${percent}%` }]} />
  </View>
);

/* ---------- TOGGLE ---------- */
const Toggle = ({ active }: { active: boolean }) => (
  <View
    style={[
      styles.toggle,
      {
        backgroundColor: active
          ? SETTINGS_THEME.toggle.active
          : SETTINGS_THEME.toggle.inactive,
      },
    ]}
  >
    <View
      style={[
        styles.toggleDot,
        active && { transform: [{ translateX: 18 }] },
      ]}
    />
  </View>
);

const Maintenance = () => {
  return (
    <View>
      <Text style={styles.sectionTitle}>Maintenance</Text>

      {/* ---------- USAGE GRID ---------- */}
      <View style={styles.grid}>
        <UsageItem title="System Storage" value="120GB of 4TB Used" percent={15} />
        <UsageItem title="Disk Space" value="12GB of 128GB Used" percent={20} />
        <UsageItem title="Processor Usage" value="20% Used" percent={20} />
        <UsageItem title="Energy Usage" value="30% Used" percent={30} />
        <UsageItem title="Network Usage" value="35% Used" percent={35} />
      </View>

      {/* ---------- SETTINGS FORM ---------- */}
      <View style={styles.formGrid}>
        <FormItem label="Check for Updates">
          <SettingsSelect
            value="Weekly"
            options={["Daily", "Weekly", "Monthly"]}
          />
        </FormItem>

        <FormItem label="Perform Backup of Logs">
          <SettingsSelect
            value="Weekly"
            options={["Daily", "Weekly", "Monthly"]}
          />
        </FormItem>

        <FormItem label="Scheduled Time to Backup Logs">
          <SettingsInput value="2:00 AM Everyday" />
        </FormItem>

        <FormItem label="Generate & Upload System Report">
          <SettingsSelect
            value="Daily"
            options={["Daily", "Weekly", "Monthly"]}
          />
        </FormItem>

        <FormItem label="Agents Restart/Shutdown">
          <ToggleRow text="Allow admins to restart/shutdown" />
        </FormItem>

        <FormItem label="Backup User Logs">
          <ToggleRow text="Enable backup of logs" />
        </FormItem>

        <FormItem label="Show System Logs">
          <ToggleRow text="Allow admins to view logs" />
        </FormItem>
      </View>
    </View>
  );
};

export default Maintenance;

/* ---------- SUB COMPONENTS ---------- */
const UsageItem = ({ title, value, percent }: any) => (
  <View style={styles.usageItem}>
    <View style={styles.usageHeader}>
      <Text style={styles.usageTitle}>{title}</Text>
      <TouchableOpacity>
        <Text style={styles.viewDetails}>View Details</Text>
      </TouchableOpacity>
    </View>
    <ProgressBar percent={percent} />
    <Text style={styles.usageValue}>{value}</Text>
  </View>
);

const ToggleRow = ({ text }: { text: string }) => (
  <View style={styles.toggleRow}>
    <Text style={styles.helperText}>{text}</Text>
    <Toggle active />
  </View>
);

const FormItem = ({ label, children }: any) => (
  <View style={styles.formItem}>
    <Text style={styles.label}>{label}</Text>
    {children}
  </View>
);

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 20,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
    marginBottom: 32,
  },

  usageItem: {
    width: "30%",
    minWidth: 260,
  },

  usageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  usageTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.textPrimary,
  },

  viewDetails: {
    fontSize: 12,
    color: COLORS.settings,
  },

  progressTrack: {
    height: 10,
    borderRadius: 6,
    backgroundColor: COLORS.softGrayBg,
    marginVertical: 6,
  },

  progressFill: {
    height: "100%",
    backgroundColor: COLORS.settings,
  },

  usageValue: {
    fontSize: 12,
    color: COLORS.textMuted,
  },

  formGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
  },

  formItem: {
    width: "30%",
    minWidth: 260,
  },

  label: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 6,
  },

  helperText: {
    fontSize: 12,
    color: COLORS.textMuted,
  },

  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 44,
  },

  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    padding: 3,
  },

  toggleDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.white,
  },
});
