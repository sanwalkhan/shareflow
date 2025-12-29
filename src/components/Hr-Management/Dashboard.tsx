import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

import {
  COLORS,
  HR_MANAGEMENT_THEME,
} from "../../Constants/theme";

import Leave from "./Leave";

import Avatar from "../../assets/profile.png";
import Arrow from "../../assets/arrow.png";

/* ===================== DASHBOARD ===================== */

const Dashboard = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const [showLeave, setShowLeave] = useState(false);

  /* -------- SHOW LEAVE PAGE -------- */
  if (showLeave) {
    return <Leave />;
  }

  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* ================= HEADER ================= */}
      <Text style={styles.pageTitle}>Dashboard</Text>

      {/* ================= PROFILE CARD ================= */}
      <View style={styles.profileCard}>
        <View style={styles.profileLeft}>
          <Image source={Avatar} style={styles.avatar} />

          <View>
            <Text style={styles.profileName}>Redwan husein</Text>
            <Text style={styles.profileRole}>
              UI / UX Designer & UX Writer
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        <Image source={Arrow} style={styles.arrow} />
      </View>

      {/* ================= QUICK ACTIONS ================= */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>

      <View
        style={[
          styles.quickActions,
          isMobile && styles.quickActionsMobile,
        ]}
      >
        <QuickButton
          label="Apply for Leave"
          onPress={() => setShowLeave(true)}
        />
        <QuickButton label="KPI Goals" />
        <QuickButton label="Take Appraisal" />
        <QuickButton label="View Payslip" />
        <QuickButton label="Update Profile" />
        <QuickButton label="Events" />
      </View>

      {/* ================= GRID ================= */}
      <View style={[styles.grid, isMobile && styles.gridMobile]}>
        {/* ===== Available Leave Days ===== */}
        <Card title="Available Leave Days">
          <LeaveBar label="Annual Leave" value="10 of 60 day(s)" percent={0.2} />
          <LeaveBar label="Sick Leave" value="0 of 10 day(s)" percent={0} />
          <LeaveBar label="Compassionate Leave" value="8 of 15 day(s)" percent={0.53} />
        </Card>

        {/* ===== To-dos ===== */}
        <Card title="To-dos">
          {[
            "Complete Onboarding Document Upload",
            "Follow up on clients on documents",
            "Design wireframes for LMS",
            "Create case study for next IT project",
            "Follow up on clients on documents",
          ].map((item, i) => (
            <ListItem key={i} text={item} />
          ))}
        </Card>

        {/* ===== Announcements ===== */}
        <Card title="Announcement(s)">
          {[
            "Welcome saron - We have a new staff joining us",
            "Sendforth for Project Manager : Kindly gather at the meeting hall",
            "Marriage Alert",
            "Office Space Update",
          ].map((item, i) => (
            <ListItem key={i} text={item} />
          ))}
        </Card>

        {/* ===== Payslip ===== */}
        <Card title="April Pay slip breakdown">
          <PayslipRow header />
          <PayslipRow label="Basic Wage" amount="150,000" deduction="-30,000" total="120,000" />
          <PayslipRow label="Tax" amount="15,000" deduction="-3,000" total="12,000" />
          <PayslipRow label="Pension" amount="15,000" deduction="-3,000" total="12,000" />
          <PayslipRow label="Total Earnings" amount="150,000" deduction="-36,000" total="114,000" />
        </Card>

        {/* ===== Birthdays ===== */}
        <Card title="Birthdays">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <BirthdayItem key={i} />
          ))}
        </Card>
      </View>
    </ScrollView>
  );
};

export default Dashboard;

/* ===================== REUSABLE COMPONENTS ===================== */

const QuickButton = ({ label, onPress }: any) => (
  <TouchableOpacity style={styles.quickButton} onPress={onPress}>
    <Text style={styles.quickButtonText}>{label}</Text>
  </TouchableOpacity>
);

const Card = ({ title, children }: any) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.more}>⋮</Text>
    </View>
    {children}
  </View>
);

const LeaveBar = ({ label, value, percent }: any) => (
  <View style={{ marginBottom: 16 }}>
    <View style={styles.leaveRow}>
      <Text style={styles.leaveLabel}>{label}</Text>
      <Text style={styles.leaveValue}>{value}</Text>
    </View>
    <View style={styles.leaveTrack}>
      <View style={[styles.leaveFill, { width: `${percent * 100}%` }]} />
    </View>
  </View>
);

const ListItem = ({ text }: any) => (
  <View style={styles.listItem}>
    <Text style={styles.listText}>{text}</Text>
    <Text style={styles.chevron}>▾</Text>
  </View>
);

const PayslipRow = ({ header, label, amount, deduction, total }: any) => (
  <View style={[styles.payslipRow, header && styles.payslipHeader]}>
    <Text style={styles.payslipText}>{label || "Earnings"}</Text>
    <Text style={styles.payslipText}>{amount || "Amount"}</Text>
    <Text style={styles.payslipText}>{deduction || "Deductions"}</Text>
    <Text style={styles.payslipText}>{total || "Total"}</Text>
  </View>
);

const BirthdayItem = () => (
  <View style={styles.birthdayRow}>
    <Text style={styles.birthdayText}>
      biruk kidan’s Day - April 25th
    </Text>
    <TouchableOpacity style={styles.wishButton}>
      <Text style={styles.wishText}>Send Wishes</Text>
    </TouchableOpacity>
  </View>
);

/* ===================== STYLES ===================== */

const styles = StyleSheet.create({
  page: {
    backgroundColor: HR_MANAGEMENT_THEME.layout.pageBg,
  },
  container: {
    padding: 24,
  },

  pageTitle: {
    fontSize: 20,
    fontFamily: HR_MANAGEMENT_THEME.fonts.heading,
    color: HR_MANAGEMENT_THEME.text.title,
    marginBottom: 16,
  },

  profileCard: {
    backgroundColor: HR_MANAGEMENT_THEME.button.secondaryBg,
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },

  profileLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 14,
  },

  profileName: {
    fontSize: 18,
    fontFamily: HR_MANAGEMENT_THEME.fonts.heading,
    color: COLORS.white,
  },

  profileRole: {
    fontSize: 13,
    color: COLORS.white,
    marginTop: 4,
  },

  editButton: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },

  editButtonText: {
    fontWeight: "600",
  },

  arrow: {
    width: 40,
    height: 40,
    marginLeft: 12,
  },

  sectionTitle: {
    fontSize: 16,
    marginBottom: 12,
    fontFamily: HR_MANAGEMENT_THEME.fonts.subHeading,
  },

  quickActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 28,
  },

  quickActionsMobile: {
    flexDirection: "column",
  },

  quickButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
  },

  quickButtonText: {
    fontSize: 13,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
  },

  gridMobile: {
    flexDirection: "column",
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 18,
    width: "48%",
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  cardTitle: {
    fontSize: 15,
    fontFamily: HR_MANAGEMENT_THEME.fonts.subHeading,
  },

  more: {
    fontSize: 18,
  },

  leaveRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  leaveLabel: {
    fontSize: 13,
  },

  leaveValue: {
    fontSize: 12,
    color: COLORS.textMuted,
  },

  leaveTrack: {
    height: 10,
    backgroundColor: COLORS.softGrayBg,
    borderRadius: 6,
    marginTop: 6,
  },

  leaveFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 6,
  },

  listItem: {
    backgroundColor: COLORS.lightBg,
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  listText: {
    fontSize: 13,
  },

  chevron: {
    fontSize: 14,
  },

  payslipRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },

  payslipHeader: {
    backgroundColor: COLORS.lightBg,
    borderRadius: 8,
    paddingHorizontal: 8,
  },

  payslipText: {
    fontSize: 12,
    width: "25%",
    textAlign: "center",
  },

  birthdayRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.lightBg,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },

  birthdayText: {
    fontSize: 12,
  },

  wishButton: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },

  wishText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
