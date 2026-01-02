import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import { COLORS, HR_MANAGEMENT_THEME } from "../../../Constants/theme";
import book from "../../../assets/book-open.png";
import LeavePopup from "./Leave-popup";
import LeaveRecall from "./Leave-recall";
import { useHrNavigation } from "./HrNavigationContext";

/* ===========================
   CONSTANTS
=========================== */
const reliefOfficers = [
  { label: "Select Relief Officer", value: "" },
  { label: "Ahmed Ali", value: "Ahmed Ali" },
  { label: "Sara Khan", value: "Sara Khan" },
  { label: "Usman Raza", value: "Usman Raza" },
];

const Annual: React.FC = () => {
  const { goToDashboard, goToLeave } = useHrNavigation();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const fileInputRef = useRef<any>(null);

  const [showPopup, setShowPopup] = useState(false);
  const [form, setForm] = useState({
    leaveType: "Annual Leave",
    startDate: "",
    endDate: "",
    duration: "",
    resumptionDate: "",
    reason: "",
    reliefOfficer: "",
    file: null as File | null,
  });

  const update = (key: string, value: any) =>
    setForm((p) => ({ ...p, [key]: value }));

  return (
    <>
      <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
        {/* ✅ Breadcrumb (context-based navigation) */}
        <View style={styles.breadcrumb}>
  <Text
    style={[styles.breadcrumbText, styles.linkText]}
    onPress={goToDashboard}
  >
    Dashboard
  </Text>

  <Text style={styles.breadcrumbText}> {" > "} </Text>

  <Text
    style={[styles.breadcrumbText, styles.linkText]}
    onPress={goToLeave}
  >
    Apply for Leave
  </Text>

  <Text style={styles.breadcrumbText}> {" > "} Annual Leave</Text>
</View>


        {/* Card */}
        <View style={[styles.card, isMobile && { padding: 20 }]}>
          <View style={styles.header}>
            <Image source={book} style={styles.headerIcon} />
            <Text style={styles.headerTitle}>Leave Application</Text>
          </View>

          <Text style={styles.subtitle}>
            Fill the required fields below to apply for annual leave.
          </Text>

          <FormGroup label="Leave Type">
            <TextInput value={form.leaveType} editable={false} style={styles.input} />
          </FormGroup>

          <View style={[styles.row, isMobile && styles.column]}>
            <FormGroup label="Start Date" half={!isMobile}>
              <DateInput value={form.startDate} onChange={(v) => update("startDate", v)} />
            </FormGroup>
            <FormGroup label="End Date" half={!isMobile}>
              <DateInput value={form.endDate} onChange={(v) => update("endDate", v)} />
            </FormGroup>
          </View>

          <View style={[styles.row, isMobile && styles.column]}>
            <FormGroup label="Duration (Days)" half={!isMobile}>
              {Platform.OS === "web" ? (
                <input
                  type="number"
                  value={form.duration}
                  onChange={(e) => update("duration", e.target.value)}
                  style={webNumberInput}
                />
              ) : (
                <TextInput
                  value={form.duration}
                  keyboardType="number-pad"
                  style={styles.input}
                />
              )}
            </FormGroup>

            <FormGroup label="Resumption Date" half={!isMobile}>
              <DateInput
                value={form.resumptionDate}
                onChange={(v) => update("resumptionDate", v)}
              />
            </FormGroup>
          </View>

          <FormGroup label="Reason for leave">
            <TextInput
              multiline
              numberOfLines={4}
              value={form.reason}
              onChangeText={(v) => update("reason", v)}
              placeholder="Enter reason"
              style={[styles.input, styles.textArea]}
            />
          </FormGroup>

          <FormGroup label="Attach handover document">
            {Platform.OS === "web" && (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e: any) => update("file", e.target.files?.[0] || null)}
                />
                <View style={styles.fileRow}>
                  <TouchableOpacity
                    style={styles.chooseFileBtn}
                    onPress={() => fileInputRef.current?.click()}
                  >
                    <Text style={styles.chooseFileText}>Choose File</Text>
                  </TouchableOpacity>
                  <View style={styles.fileBox}>
                    <Text>{form.file?.name || ""}</Text>
                  </View>
                </View>
              </>
            )}
          </FormGroup>

          <FormGroup label="Choose Relief Officer">
            {Platform.OS === "web" ? (
              <select
                value={form.reliefOfficer}
                onChange={(e) => update("reliefOfficer", e.target.value)}
                style={webSelect}
              >
                {reliefOfficers.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            ) : (
              <Picker
                selectedValue={form.reliefOfficer}
                onValueChange={(v) => update("reliefOfficer", v)}
              >
                {reliefOfficers.map((o) => (
                  <Picker.Item key={o.value} label={o.label} value={o.value} />
                ))}
              </Picker>
            )}
          </FormGroup>

          <View style={[styles.actions, isMobile && styles.column]}>
            <TouchableOpacity style={styles.submitBtn} onPress={() => setShowPopup(true)}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
             <TouchableOpacity
                        style={styles.resetBtn}
                        onPress={() =>
                          setForm({
                            leaveType: "Sick Leave",
                            startDate: "",
                            endDate: "",
                            duration: "",
                            resumptionDate: "",
                            reason: "",
                            reliefOfficer: "",
                            file: null,
                          })
                        }
                      >
                        <Text style={styles.resetText}>Reset</Text>
                      </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <LeavePopup visible={showPopup} onClose={() => setShowPopup(false)} />
    </>
  );
};

export default Annual;


/* ===========================
   DATE INPUT
=========================== */
const DateInput = ({ value, onChange }: any) => {
  if (Platform.OS === "web") {
    return (
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={webDateInput}
      />
    );
  }
  return <TextInput value={value} placeholder="YYYY-MM-DD" style={styles.input} />;
};

/* ===========================
   FORM GROUP
=========================== */
const FormGroup = ({ label, children, half }: any) => (
  <View style={[styles.formGroup, half && { flex: 1 }]}>
    <Text style={styles.label}>{label}</Text>
    {children}
  </View>
);

/* ===========================
   STYLES
=========================== */
const styles = StyleSheet.create({
  page: {
    backgroundColor: HR_MANAGEMENT_THEME.layout.pageBg,
    padding: 24,
  },
  breadcrumb: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  breadcrumbText: {
    fontWeight: "600",
    color: COLORS.textSecondary,
  },
  linkText: {
    textDecorationLine: "underline",
    color: COLORS.primary,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 32,
    maxWidth: 920,
    alignSelf: "center",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  headerIcon: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "600",
  },
  subtitle: {
    color: COLORS.textMuted,
    marginBottom: 28,
  },
  row: {
    flexDirection: "row",
    gap: 24,
  },
  column: {
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: 22,
  },
  label: {
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    backgroundColor: COLORS.lightBg,
    borderRadius: 10,
    height: 46,
    paddingHorizontal: 14,
  },
  textArea: {
    height: 90,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  reasonInput: {
    paddingTop: 8,
  },
  pickerWrapper: {
    backgroundColor: COLORS.lightBg,
    borderRadius: 10,
    height: 46,
    justifyContent: "center",
  },
  fileRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  chooseFileBtn: {
    backgroundColor: "#222",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  chooseFileText: {
    color: "#fff",
  },
  fileBox: {
    flex: 1,
    height: 46,
    backgroundColor: COLORS.lightBg,
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  fileName: {
    color: COLORS.textMuted,
  },
  actions: {
    flexDirection: "row",
    gap: 20,
    marginTop: 30,
  },
  submitBtn: {
    backgroundColor: COLORS.success,
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 10,
  },
  submitText: {
    color: "#fff",
    fontWeight: "700",
  },
  resetBtn: {
    borderWidth: 2,
    borderColor: COLORS.danger,
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 10,
  },
  resetText: {
    color: COLORS.danger,
    fontWeight: "700",
  },
});

/* ===========================
   WEB INPUT STYLES
=========================== */
const webDateInput: React.CSSProperties = {
  width: "95%",
  height: 46,
  borderRadius: 10,
  border: "none",
  padding: "0 14px",
  backgroundColor: COLORS.lightBg,
  fontSize: 14,
};

const webNumberInput: React.CSSProperties = {
  ...webDateInput,
  paddingRight: 10,
};

const webSelect: React.CSSProperties = {
  ...webDateInput,
  paddingRight: 44,
  appearance: "none",
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 14px center",
};
