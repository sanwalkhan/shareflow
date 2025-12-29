import React, { useState } from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { COLORS , SETTINGS_THEME} from "../../Constants/theme";

import SettingsButton from "./Components/SettingsButton";
import SettingsSelect from "./Components/SettingsSelect";
import SettingsToggle from "./Components/SettingsToggle";

const General = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const [language, setLanguage] = useState("English");
  const [adminTheme, setAdminTheme] = useState("Light Theme");
  const [timezone, setTimezone] = useState("CET - Central European Time");
  const [currency, setCurrency] = useState("USD ($)");
  const [font, setFont] = useState("Default - Hanken Grotesk");

  const [userTheme, setUserTheme] = useState("Light Theme");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [layout, setLayout] = useState("Default - Spacious");

  const [agentLang, setAgentLang] = useState("English");
  const [agentTheme, setAgentTheme] = useState("Light Theme");
  const [updateFreq, setUpdateFreq] = useState("Monthly");
  const [securityFreq, setSecurityFreq] = useState("Weekly");
  const [logsFormat, setLogsFormat] = useState("CSV, PDF & XLS");

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>General</Text>

      <View style={[styles.grid, isMobile && styles.gridMobile]}>
        {/* ===== COLUMN 1 ===== */}
        <View style={styles.column}>
          <Field label="System Language">
            <SettingsSelect
              value={language}
              options={["English", "French", "Spanish"]}
              onChange={setLanguage}
            />
          </Field>

          <Field label="Admin Dashboard Theme">
            <SettingsSelect
              value={adminTheme}
              options={["Light Theme", "Dark Theme"]}
              onChange={setAdminTheme}
            />
          </Field>

          <Field label="Time Zone">
            <SettingsSelect
              value={timezone}
              options={[
                "CET - Central European Time",
                "GMT - Greenwich Mean Time",
                "EST - Eastern Standard Time",
              ]}
              onChange={setTimezone}
            />
          </Field>

          <Field label="Currency">
            <SettingsSelect
              value={currency}
              options={["USD ($)", "EUR (€)", "GBP (£)"]}
              onChange={setCurrency}
            />
          </Field>

          <Field label="System Font">
            <SettingsSelect
              value={font}
              options={[
                "Default - Hanken Grotesk",
                "Inter",
                "Roboto",
              ]}
              onChange={setFont}
            />
          </Field>
        </View>

        {/* ===== COLUMN 2 ===== */}
        <View style={styles.column}>
          <HeadingWithDivider title="User Sign up" />

          <ToggleField
            description="Allow new users to sign up"
            enabled
          />

          <Field label="Default Theme for Users">
            <SettingsSelect
              value={userTheme}
              options={["Light Theme", "Dark Theme"]}
              onChange={setUserTheme}
            />
          </Field>

          <Field label="Date and Time Format">
            <SettingsSelect
              value={dateFormat}
              options={["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"]}
              onChange={setDateFormat}
            />
          </Field>

          <HeadingWithDivider title="Notifications" />

          <ToggleField
            description="Allow system notifications"
            enabled
          />

          <Field label="Admin Dashboard Layout">
            <SettingsSelect
              value={layout}
              options={["Default - Spacious", "Compact"]}
              onChange={setLayout}
            />
          </Field>
        </View>

        {/* ===== COLUMN 3 ===== */}
        <View style={styles.column}>
          <Field label="Default Agents’ Language">
            <SettingsSelect
              value={agentLang}
              options={["English", "French", "Spanish"]}
              onChange={setAgentLang}
            />
          </Field>

          <Field label="Default Theme for AI Agents">
            <SettingsSelect
              value={agentTheme}
              options={["Light Theme", "Dark Theme"]}
              onChange={setAgentTheme}
            />
          </Field>

          <Field label="System Update Frequency">
            <SettingsSelect
              value={updateFreq}
              options={["Weekly", "Monthly", "Quarterly"]}
              onChange={setUpdateFreq}
            />
          </Field>

          <Field label="Security Checks Frequency">
            <SettingsSelect
              value={securityFreq}
              options={["Daily", "Weekly", "Monthly"]}
              onChange={setSecurityFreq}
            />
          </Field>

          <Field label="Logs / Reports Download Format">
            <SettingsSelect
              value={logsFormat}
              options={["CSV", "PDF", "XLS", "CSV, PDF & XLS"]}
              onChange={setLogsFormat}
            />
          </Field>
        </View>
      </View>

      {/* ===== ACTION ===== */}
      <View style={styles.footer}>
        <SettingsButton title="Save Changes" />
      </View>
    </View>
  );
};

export default General;

/* ---------------- HELPERS ---------------- */

const Field = ({ label, children }: any) => (
  <View style={styles.field}>
    <Text style={styles.label}>{label}</Text>
    {children}
  </View>
);

const ToggleField = ({ description, enabled }: any) => (
  <View style={styles.toggleField}>
    <Text style={styles.helper}>{description}</Text>
    <SettingsToggle enabled={enabled} />
  </View>
);

const HeadingWithDivider = ({ title }: { title: string }) => (
  <View style={{ marginBottom: -25 }}>
    <Text style={styles.heading}>{title}</Text>
    <View style={styles.divider} />
  </View>
);

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  wrapper: { width: "100%" },

  sectionTitle: {
  fontSize: 18,
  fontWeight: "700",
  color: COLORS.textPrimary,
  marginBottom: 28,
},

label: {
  fontSize: 14,
  color: COLORS.textPrimary,
  fontWeight: "600",
},

helper: {
  fontSize: 13,
  color: COLORS.textMuted,
  marginVertical: 8,
},

heading: {
  fontSize: 15,
  fontWeight: "600",
  color: COLORS.textPrimary,
},

divider: {
  height: 1,
  backgroundColor: SETTINGS_THEME.card.border,
  marginVertical: 8,
},


  grid: { flexDirection: "row", gap: 36 },
  gridMobile: { flexDirection: "column", gap: 32 },

  column: { flex: 1, gap: 28 },

  field: { gap: 14 },



  toggleField: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  },


  footer: {
    marginTop: 40,
    alignItems: "flex-end",
  },
});
