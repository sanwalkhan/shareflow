import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

import HrLayout from "./Hr-Managementlayout";
import Annual from "./Annual-leave";
import Sick from "./Sick-leave";

import book from "../../assets/book-open.png";

import {
  COLORS,
  HR_MANAGEMENT_THEME,
} from "../../Constants/theme";

const Leave = () => {
  const [activePage, setActivePage] = useState<
    "leave" | "annual" | "sick"
  >("leave");

  /* =========================
     PAGE SWITCH
  ========================= */
  if (activePage === "annual") {
    return <Annual />;
  }

  if (activePage === "sick") {
    return <Sick />;
  }

  return (
    <HrLayout>
      <ScrollView style={styles.page}>

        {/* ================= Breadcrumb ================= */}
        <View style={styles.breadcrumb}>
          <Text style={styles.breadcrumbText}>
            Dashboard {" > "} Apply for Leave
          </Text>
        </View>

        {/* ================= Header ================= */}
        <View style={styles.header}>
          <Image source={book} style={styles.headerIcon} />
          <Text style={styles.headerTitle}>Leave Application</Text>
        </View>

        {/* ================= Leave Cards ================= */}
        <View style={styles.cardsRow}>
          <LeaveCard
            count="60"
            title="Annual Leave"
            active
            onPress={() => setActivePage("annual")}
          />
          <LeaveCard
            count="20"
            title="Sick Leave"
            active
            onPress={() => setActivePage("sick")}
          />
          <LeaveCard count="60" title="Maternity Leave" />
          <LeaveCard count="30" title="Compassionate Leave" />
        </View>

        {/* ================= Leave History ================= */}
        <View style={styles.historyHeader}>
          <Text style={styles.historyTitle}>Leave History</Text>

          <TouchableOpacity style={styles.exportBtn}>
            <Text style={styles.exportText}>Export</Text>
          </TouchableOpacity>
        </View>

        {/* ================= Table ================= */}
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
            name="Abenezer kebede"
            duration="7"
            start="22/04/2022"
            end="30/04/2022"
            type="Exam"
            reason="Examination"
            alt
          />
          <TableRow
            name="Abenezer kebede"
            duration="120"
            start="22/04/2022"
            end="28/06/2022"
            type="Maternity"
            reason="Child Care"
          />
          <TableRow
            name="Abenezer kebede"
            duration="5"
            start="22/04/2022"
            end="28/04/2022"
            type="Sick"
            reason="Personal"
            alt
          />
        </View>
      </ScrollView>
    </HrLayout>
  );
};

export default Leave;

/* =====================================================
   COMPONENTS
===================================================== */

const LeaveCard = ({
  count,
  title,
  active = false,
  onPress,
}: any) => (
  <View style={styles.card}>
    <View style={styles.cardCircle}>
      <Text style={styles.cardCount}>{count}</Text>
    </View>

    <Text style={styles.cardTitle}>{title}</Text>

    <TouchableOpacity
      disabled={!active}
      onPress={onPress}
      style={[
        styles.applyBtn,
        !active && { opacity: 0.5 },
      ]}
    >
      <Text style={styles.applyText}>Apply</Text>
    </TouchableOpacity>
  </View>
);

const TableHeader = () => (
  <View style={styles.tableHeader}>
    <Text style={styles.th}>Name(s)</Text>
    <Text style={styles.th}>Duration(s)</Text>
    <Text style={styles.th}>Start Date</Text>
    <Text style={styles.th}>End Date</Text>
    <Text style={styles.th}>Type</Text>
    <Text style={styles.th}>Reason(s)</Text>
    <Text style={styles.th}>Actions</Text>
  </View>
);

const TableRow = ({
  name,
  duration,
  start,
  end,
  type,
  reason,
  alt = false,
}: any) => (
  <View
    style={[
      styles.tableRow,
      alt && styles.altRow,
    ]}
  >
    <Text style={styles.td}>{name}</Text>
    <Text style={styles.td}>{duration}</Text>
    <Text style={styles.td}>{start}</Text>
    <Text style={styles.td}>{end}</Text>
    <Text style={styles.td}>{type}</Text>
    <Text style={styles.td}>{reason}</Text>

    <TouchableOpacity style={styles.actionBtn}>
      <Text style={styles.actionText}>Actions</Text>
    </TouchableOpacity>
  </View>
);

/* =====================================================
   STYLES
===================================================== */

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
  },
  breadcrumbText: {
    color: COLORS.textSecondary,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  headerIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    color: COLORS.black,
    fontWeight: "600",
  },

  cardsRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 30,
    flexWrap: "wrap",
  },

  card: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 20,
    width: 260,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  cardCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
  cardCount: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.primary,
  },
  cardTitle: {
    color: COLORS.white,
    fontSize: 16,
    flex: 1,
  },
  applyBtn: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 20,
  },
  applyText: {
    color: COLORS.black,
    fontWeight: "600",
  },

  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  exportBtn: {
    backgroundColor: "#3f861e",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 10,
  },
  exportText: {
    color: COLORS.white,
    fontWeight: "600",
  },

  table: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 12,
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: COLORS.hrBg,
    padding: 12,
    borderRadius: 10,
  },
  th: {
    flex: 1,
    fontWeight: "600",
  },

  tableRow: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
  },
  altRow: {
    backgroundColor: COLORS.hrBg,
    borderRadius: 10,
  },
  td: {
    flex: 1,
  },

  actionBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  actionText: {
    color: COLORS.white,
    fontWeight: "600",
  },
});
