import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  useWindowDimensions,
  Text,
  Modal,
  Pressable,
} from "react-native";

import { COLORS, FONTS } from "../../../Constants/theme";

import Dashboard from "./Dashboard";
import Leave from "./Leave";
import AnnualLeave from "./Annual-leave";
import SickLeave from "./Sick-leave";
import LeaveRecall from "./Leave-recall";

import notification from "../../../assets/notification.png";
import inbox from "../../../assets/inbox.png";
import profile from "../../../assets/Avator.png";

import {
  HrNavigationProvider,
  PageType,
} from "./HrNavigationContext";

const HrManagementLayout = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isSmallMobile = width < 420;

  const [page, setPage] = useState<PageType>("dashboard");
  const [menuVisible, setMenuVisible] = useState(false);

  const tabs = ["Dashboard", "Requests", "Payroll", "Company", "Extras"];

  const renderContent = () => {
    switch (page) {
      case "dashboard":
        return <Dashboard />;
      case "leave":
        return <Leave />;
      case "annual":
        return <AnnualLeave />;
      case "sick":
        return <SickLeave />;
      case "recall":
        return <LeaveRecall />;
      default:
        return null;
    }
  };

  return (
    <HrNavigationProvider
      value={{
        goToDashboard: () => setPage("dashboard"),
        goToLeave: () => setPage("leave"),
        goToAnnual: () => setPage("annual"),
        goToSick: () => setPage("sick"),
        goToRecall: () => setPage("recall"),
      }}
    >
      <View style={styles.container}>
        {/* HEADER */}
        <View style={[styles.header, isMobile && styles.headerMobile]}>
          <View style={styles.headerRow}>
            {isMobile && (
              <TouchableOpacity
                onPress={() => setMenuVisible(true)}
                style={styles.hamburgerBtn}
              >
                <Text style={styles.hamburgerIcon}>☰</Text>
              </TouchableOpacity>
            )}

            {!isMobile && (
              <View style={styles.tabsWrapper}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {tabs.map((tab) => {
                    const active = tab === "Dashboard";
                    return (
                      <TouchableOpacity
                        key={tab}
                        disabled
                        style={[styles.tabItem, active && styles.activeTabItem]}
                      >
                        <Text
                          style={[
                            styles.tabText,
                            active && styles.activeTabText,
                          ]}
                        >
                          {tab}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            )}

            <View style={styles.icons}>
              <View style={[styles.iconCircle, styles.notificationBg]}>
                <Image source={notification} style={styles.icon} />
                <View style={styles.badge} />
              </View>

              <View style={[styles.iconCircle, styles.inboxBg]}>
                <Image source={inbox} style={styles.icon} />
                <View style={styles.badge} />
              </View>

              {!isSmallMobile && (
                <Image source={profile} style={styles.avatar} />
              )}
            </View>
          </View>
        </View>

        {/* CONTENT */}
        <View style={styles.content}>{renderContent()}</View>

        {/* MOBILE MENU */}
        <Modal
          visible={menuVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setMenuVisible(false)}
        >
          <Pressable
            style={styles.overlay}
            onPress={() => setMenuVisible(false)}
          >
            <View style={styles.menuModal}>
              {tabs.map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={styles.menuItem}
                  onPress={() => setMenuVisible(false)}
                >
                  <Text style={styles.menuText}>{tab}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Pressable>
        </Modal>
      </View>
    </HrNavigationProvider>
  );
};

export default HrManagementLayout;

/* styles remain EXACTLY the same as you posted */

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.hrBg },

  header: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.softGrayBg,
    paddingHorizontal: 32,
    paddingTop: 40,
    paddingBottom: 12,
  },

  headerMobile: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  tabsWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },

  tabItem: {
    paddingHorizontal: 18,
    paddingBottom: 10,
  },

  activeTabItem: {
    borderBottomWidth: 4,
    borderBottomColor: COLORS.button,
  },

  tabText: {
    fontFamily: FONTS.productSans.medium,
    fontSize: 15,
    color: COLORS.textMuted,
  },

  activeTabText: {
    fontFamily: FONTS.productSans.bold,
    color: COLORS.black,
  },

  icons: {
    flexDirection: "row",
    gap: 12,
    marginLeft: "auto",
  },

  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  notificationBg: { backgroundColor: COLORS.primary },
  inboxBg: { backgroundColor: "#2FA84F" },

  icon: {
    width: 16,
    height: 16,
    tintColor: COLORS.white,
  },

  badge: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    backgroundColor: COLORS.danger,
    borderRadius: 8,
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },

  hamburgerBtn: {
    paddingRight: 12,
    paddingVertical: 4,
  },

  hamburgerIcon: {
    fontSize: 26,
    color: COLORS.black,
    fontWeight: "600",
  },

  content: {
    flex: 1,
    backgroundColor: COLORS.hrBg,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  menuModal: {
    backgroundColor: COLORS.white,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

  menuItem: {
    paddingVertical: 14,
  },

  menuText: {
    fontSize: 16,
    fontFamily: FONTS.productSans.medium,
    color: COLORS.black,
  },
});
