import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

import { COLORS, HR_MANAGEMENT_THEME } from "../../../Constants/theme";

import avatar from "../../../assets/Avator.png";
import Arrow from "../../../assets/arrow.png";
import DateIcon from "../../../assets/date.png";

import { useHrNavigation } from "./HrNavigationContext";

/* ===================== DASHBOARD ===================== */

const Dashboard: React.FC = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const { goToLeave } = useHrNavigation();

  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={[
        styles.container,
        isMobile && styles.containerMobile,
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <Text style={styles.pageTitle}>Dashboard</Text>

      {/* PROFILE CARD */}
      <View
        style={[
          styles.profileCard,
          isMobile && styles.profileCardMobile,
        ]}
      >
        <View
          style={[
            styles.profileLeft,
            isMobile && styles.profileLeftMobile,
          ]}
        >
          <Image source={avatar} style={styles.avatar} />

          <View style={isMobile && styles.profileTextCenter}>
            <Text style={styles.profileName}>Redwan husein</Text>
            <Text style={styles.profileRole}>
              UI / UX Designer & UX Writer
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.profileRight,
            isMobile && styles.profileRightMobile,
          ]}
        >
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>

          {!isMobile && (
            <Image source={Arrow} style={styles.arrow} />
          )}
        </View>
      </View>

      {/* QUICK ACTIONS */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>

      <View
        style={[
          styles.quickActions,
          isMobile && styles.quickActionsMobile,
        ]}
      >
        <QuickButton label="Apply for Leave" onPress={goToLeave} full={isMobile} />
        <QuickButton label="KPI Goals" full={isMobile} />
        <QuickButton label="Take Appraisal" full={isMobile} />
        <QuickButton label="View Payslip" full={isMobile} />
        <QuickButton label="Update Profile" full={isMobile} />
        <QuickButton label="Events" full={isMobile} />
      </View>

      {/* GRID */}
      <View style={[styles.grid, isMobile && styles.gridMobile]}>
        <Card title="Available Leave Days" full={isMobile}>
          <LeaveBar label="Annual Leave" value="10 of 60 day(s)" percent={0.2} />
          <LeaveBar label="Sick Leave" value="0 of 10 day(s)" percent={0} />
          <LeaveBar
            label="Compassionate Leave"
            value="8 of 15 day(s)"
            percent={0.53}
          />
        </Card>

        <Card title="To-dos" full={isMobile}>
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

        <Card title="Announcement(s)" full={isMobile}>
          {[
            "Welcome saron - We have a new staff joining us",
            "Sendforth for Project Manager",
            "Marriage Alert",
            "Office Space Update",
          ].map((item, i) => (
            <ListItem key={i} text={item} />
          ))}
        </Card>

        <Card title="April Pay slip breakdown" full={isMobile}>
          <PayslipRow header />
          <PayslipRow label="Basic Wage" amount="150,000" deduction="-30,000" total="120,000" />
          <PayslipRow label="Tax" amount="15,000" deduction="-3,000" total="12,000" />
          <PayslipRow label="Pension" amount="15,000" deduction="-3,000" total="12,000" />
          <PayslipRow label="Total Earnings" amount="150,000" deduction="-36,000" total="114,000" />
        </Card>

        <Card title="Birthdays" full={isMobile}>
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

const QuickButton = ({ label, onPress, full }: any) => (
  <TouchableOpacity
    style={[styles.quickButton, full && styles.quickButtonMobile]}
    onPress={onPress}
  >
    <Text style={styles.quickButtonText}>{label}</Text>
  </TouchableOpacity>
);

const Card = ({ title, children, full }: any) => (
  <View style={[styles.card, full && styles.cardMobile]}>
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

const PayslipRow = ({ label, amount, deduction, total }: any) => (
  <View style={[styles.payslipRow, styles.payslipHighlight]}>
    <Text style={styles.payslipText}>{label || "Earnings"}</Text>
    <Text style={styles.payslipText}>{amount || "Amount"}</Text>
    <Text style={styles.payslipText}>{deduction || "Deductions"}</Text>
    <Text style={styles.payslipText}>{total || "Total"}</Text>
  </View>
);

const BirthdayItem = () => (
  <View style={styles.birthdayRow}>
    <View style={styles.birthdayLeft}>
      <Image source={DateIcon} style={styles.dateIcon} />
      <Text style={styles.birthdayText}>
        biruk kidan’s Day - April 25th
      </Text>
    </View>
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
  containerMobile: {
    padding: 16,
  },

  pageTitle: {
    fontSize: 22,
    fontFamily: HR_MANAGEMENT_THEME.fonts.heading,
    color: HR_MANAGEMENT_THEME.text.title,
    marginBottom: 18,
  },

  profileCard: {
    backgroundColor: HR_MANAGEMENT_THEME.button.secondaryBg,
    borderRadius: 18,
    padding: 24,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  profileCardMobile: {
    flexDirection: "column",
    gap: 16,
    alignItems: "center",
  },

  profileLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  profileLeftMobile: {
    flexDirection: "column",
    gap: 12,
  },

  profileTextCenter: {
    alignItems: "center",
  },

  profileRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  profileRightMobile: {
    justifyContent: "center",
  },

  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginRight: 16,
  },

  profileName: {
    fontSize: 20,
    fontFamily: HR_MANAGEMENT_THEME.fonts.heading,
    color: COLORS.white,
  },

  profileRole: {
    fontSize: 14,
    color: COLORS.white,
    marginTop: 6,
  },

  editButton: {
    backgroundColor: COLORS.button,
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 12,
  },

  editButtonText: {
    fontWeight: "700",
  },

  arrow: {
    width: 150,
    height: 150,
  },

  sectionTitle: {
    fontSize: 18,
    fontFamily: HR_MANAGEMENT_THEME.fonts.subHeading,
    marginBottom: 16,
  },

  quickActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 36,
  },
  quickActionsMobile: {
    flexDirection: "column",
  },

  quickButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 14,
    paddingHorizontal: 26,
    borderRadius: 26,
  },
  quickButtonMobile: {
    width: "100%",
    alignItems: "center",
  },

  quickButtonText: {
    fontSize: 14,
    fontWeight: "600",
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
    borderRadius: 18,
    padding: 20,
    width: "48%",
  },
  cardMobile: {
    width: "100%",
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  cardTitle: {
    fontSize: 17,
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
    fontSize: 14,
  },

  leaveValue: {
    fontSize: 13,
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
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  listText: {
    fontSize: 14,
  },

  chevron: {
    fontSize: 14,
  },

  payslipRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },

  payslipHighlight: {
    backgroundColor: COLORS.lightBg,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
  },

  payslipText: {
    fontSize: 13,
    width: "25%",
    textAlign: "center",
  },

  birthdayRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.lightBg,
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },

  birthdayLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  dateIcon: {
    width: 18,
    height: 18,
  },

  birthdayText: {
    fontSize: 13,
  },

  wishButton: {
    backgroundColor: COLORS.button,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 10,
  },

  wishText: {
    fontSize: 13,
    fontWeight: "700",
  },
});
