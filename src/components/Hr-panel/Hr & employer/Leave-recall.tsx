import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

import { COLORS, HR_MANAGEMENT_THEME } from "../../../Constants/theme";
import book from "../../../assets/book-open.png";

import Dashboard from "./Dashboard";

type LeaveRecallProps = {
  onBack?: () => void;
};

const LeaveRecall: React.FC<LeaveRecallProps> = ({ onBack }) => {
  const [reason, setReason] = useState("");

  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      {/* ================= Breadcrumb ================= */}
      <View style={styles.breadcrumb}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.breadcrumbText}>
            Dashboard {" > "} Leave Recall
          </Text>
        </TouchableOpacity>
      </View>

      {/* ================= Card ================= */}
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <Image source={book} style={styles.headerIcon} />
          <Text style={styles.headerTitle}>Leave Recall</Text>
        </View>

        {/* Recall Message */}
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>
            <Text style={styles.bold}>Dear User,{"\n\n"}</Text>
            This is to inform you that you have been{" "}
            <Text style={styles.bold}>RECALLED</Text> from your{" "}
            <Text style={styles.bold}>CASUAL Leave</Text> by your line manager
            named Biruktawit mesfin for an urgent meeting and task to be
            completed in the office before 2nd June, 2022.
          </Text>
        </View>

        {/* Reason */}
        <Text style={styles.label}>If No, state reason why ?</Text>
        <TextInput
          placeholder="State your reason..."
          placeholderTextColor={COLORS.textMuted}
          style={styles.textArea}
          multiline
          numberOfLines={4}
          value={reason}
          onChangeText={setReason}
        />

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.approveBtn}>
            <Text style={styles.approveText}>Approve</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.declineBtn}>
            <Text style={styles.declineText}>Decline</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default LeaveRecall;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: HR_MANAGEMENT_THEME.layout.pageBg,
    padding: 24,
  },

  /* Breadcrumb */
  breadcrumb: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  breadcrumbText: {
    color: COLORS.textSecondary,
    fontWeight: "600",
  },

  /* Card */
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 32,
    maxWidth: 900,
    width: "100%",
    alignSelf: "center",
  },

  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  headerIcon: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: COLORS.black,
  },

  /* Message Box */
  messageBox: {
    backgroundColor: COLORS.lightBg,
    borderRadius: 12,
    padding: 28,
    marginBottom: 30,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.textPrimary,
  },
  bold: {
    fontWeight: "700",
  },

  /* Reason */
  label: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 10,
  },
  textArea: {
    backgroundColor: COLORS.lightBg,
    borderRadius: 12,
    height: 110,
    padding: 16,
    textAlignVertical: "top",
    marginBottom: 32,
  },

  /* Actions */
  actions: {
    flexDirection: "row",
    gap: 20,
    flexWrap: "wrap",
  },
  approveBtn: {
    backgroundColor: COLORS.success,
    paddingVertical: 14,
    paddingHorizontal: 42,
    borderRadius: 10,
  },
  approveText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 16,
  },
  declineBtn: {
    borderWidth: 2,
    borderColor: COLORS.danger,
    paddingVertical: 14,
    paddingHorizontal: 42,
    borderRadius: 10,
  },
  declineText: {
    color: COLORS.danger,
    fontWeight: "700",
    fontSize: 16,
  },
});
