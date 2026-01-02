import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  useWindowDimensions,
} from "react-native";

import book from "../../../assets/book-open.png";
import dropdown from "../../../assets/dropdown.png";
import filter from "../../../assets/filter.png";

import { COLORS, HR_MANAGEMENT_THEME } from "../../../Constants/theme";
import { useHrNavigation } from "./HrNavigationContext";

const Leave: React.FC = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const { goToDashboard, goToAnnual, goToSick } = useHrNavigation();

  return (
    <ScrollView style={styles.page} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* ================= Breadcrumb ================= */}
      <View style={styles.breadcrumb}>
        <TouchableOpacity onPress={goToDashboard}>
          <Text style={styles.breadcrumbLink}>Dashboard</Text>
        </TouchableOpacity>
        <Text style={styles.breadcrumbText}> {" > "} Apply for Leave</Text>
      </View>

      {/* ================= Content ================= */}
      <View style={styles.contentWrapper}>
        {/* Header */}
        <View style={styles.header}>
          <Image source={book} style={styles.headerIcon} />
          <Text style={styles.headerTitle}>Leave Application</Text>
        </View>

        {/* Leave Cards */}
        <View style={[styles.cardsRow, isMobile && { flexDirection: "column" }]}>
          <LeaveCard title="Annual Leave" count="60" onPress={goToAnnual} />
          <LeaveCard title="Sick Leave" count="20" onPress={goToSick} />
          <LeaveCard title="Maternity Leave" count="60" />
          <LeaveCard title="Compassionate Leave" count="30" wider />
        </View>

        {/* Leave History Header */}
        <View
          style={[
            styles.historyHeader,
            isMobile && { flexDirection: "column", alignItems: "flex-start", gap: 12 },
          ]}
        >
          <Text style={styles.historyTitle}>Leave History</Text>

          <View style={styles.historyActions}>
            <Image source={filter} style={styles.filterIcon} />
            <TouchableOpacity style={styles.exportBtn}>
              <Text style={styles.exportText}>Export</Text>
              <Image source={dropdown} style={styles.dropdownIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* ================= TABLE ================= */}
        <ScrollView horizontal={isMobile}>
          <View style={styles.table}>
            <TableHeader />
            <TableRow
              name="Abenezer kebede"
              duration="5"
              start="22/04/2022"
              end="28/04/2022"
              type="Sick"
              reason="Personal"
            />
            <TableRow
              alt
              name="Abenezer kebede"
              duration="7"
              start="22/04/2022"
              end="30/04/2022"
              type="Exam"
              reason="Examination"
            />
            <TableRow
              name="Abenezer kebede"
              duration="120"
              start="22/04/2022"
              end="28/06/2022"
              type="Maternity"
              reason="Child Care"
            />
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default Leave;

/* ================= CARDS ================= */

const LeaveCard = ({ title, count, onPress, wider }: any) => (
  <View style={[styles.card, wider && { width: 320 }]}>
    <View style={styles.cardCircle}>
      <Text style={styles.cardCount}>{count}</Text>
    </View>

    <View style={{ flex: 1 }}>
      <Text style={styles.cardTitle}>{title}</Text>
      {onPress && (
        <TouchableOpacity style={styles.applyBtn} onPress={onPress}>
          <Text style={styles.applyText}>Apply</Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
);

/* ================= TABLE ================= */

const TableHeader = () => (
  <View style={styles.tableHeader}>
    <Text style={[styles.th, styles.colName]}>Name(s)</Text>
    <Text style={[styles.th, styles.colDuration]}>Duration</Text>
    <Text style={[styles.th, styles.colStart]}>Start</Text>
    <Text style={[styles.th, styles.colEnd]}>End</Text>
    <Text style={[styles.th, styles.colType]}>Type</Text>
    <Text style={[styles.th, styles.colReason]}>Reason</Text>
    <Text style={[styles.th, styles.colAction]}>Actions</Text>
  </View>
);

const TableRow = ({ name, duration, start, end, type, reason, alt }: any) => (
  <View style={[styles.tableRow, alt && styles.altRow]}>
    <Text style={[styles.td, styles.colName]}>{name}</Text>
    <Text style={[styles.td, styles.colDuration]}>{duration}</Text>
    <Text style={[styles.td, styles.colStart]}>{start}</Text>
    <Text style={[styles.td, styles.colEnd]}>{end}</Text>
    <Text style={[styles.td, styles.colType]}>{type}</Text>
    <Text style={[styles.td, styles.colReason]}>{reason}</Text>

    <View style={styles.colAction}>
      <TouchableOpacity style={styles.actionBtn}>
        <Text style={styles.actionText}>Actions</Text>
        <Image source={dropdown} style={styles.actionDropdown} />
      </TouchableOpacity>
    </View>
  </View>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  page: { backgroundColor: HR_MANAGEMENT_THEME.layout.pageBg, padding: 24 },

  breadcrumb: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },

  breadcrumbLink: { color: COLORS.primary, fontWeight: "600" },
  breadcrumbText: { fontWeight: "600" },

  contentWrapper: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 24,
  },

  header: { flexDirection: "row", alignItems: "center", marginBottom: 28 },
  headerIcon: { width: 22, height: 22, marginRight: 10 },
  headerTitle: { fontSize: 20, fontWeight: "600" },

  cardsRow: { flexDirection: "row", flexWrap: "wrap", gap: 20, marginBottom: 36 },

  card: {
    backgroundColor: COLORS.primary,
    borderRadius: 18,
    padding: 20,
    width: 280,
    flexDirection: "row",
    gap: 16,
  },

  cardCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },

  cardCount: { fontSize: 30, fontWeight: "700", color: COLORS.primary },
  cardTitle: { color: COLORS.white, fontSize: 16, fontWeight: "600", marginBottom: 10 },

  applyBtn: {
    backgroundColor: COLORS.button,
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 20,
    alignSelf: "flex-start",
  },

  applyText: { fontWeight: "600" },

  historyHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 14 },
  historyTitle: { fontSize: 18, fontWeight: "600" },

  historyActions: { flexDirection: "row", alignItems: "center", gap: 18 },
  filterIcon: { width: 18, height: 18 },

  exportBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: COLORS.success,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },

  exportText: { color: COLORS.white, fontWeight: "600" },
  dropdownIcon: { width: 12, height: 12, tintColor: COLORS.white },

  table: { width: "100%" },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: COLORS.lightBg,
    padding: 12,
    borderRadius: 10,
  },

  tableRow: { flexDirection: "row", padding: 12, alignItems: "center" },
  altRow: { backgroundColor: COLORS.lightBg, borderRadius: 10 },

  th: { fontWeight: "600" },
  td: {},

  colName: { flex: 2 },
  colDuration: { flex: 1 },
  colStart: { flex: 1.2 },
  colEnd: { flex: 1.2 },
  colType: { flex: 1 },
  colReason: { flex: 1.5 },
  colAction: { width: 140 },

  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },

  actionText: { color: COLORS.white, fontWeight: "600" },
  actionDropdown: { width: 12, height: 12, tintColor: COLORS.white },
});
