import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

import {
  COLORS,
  FONTS,
  WINDOW,
  isMobile,
  isSmallMobile,
} from "../../Constants/theme";

import Dashboard from "./Dashboard";

import notification from "../../assets/notification.png";
import inbox from "../../assets/inbox.png";
import profile from "../../assets/Avator.png";

const HrManagementLayout = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const tabs = ["Dashboard", "Requests", "Payroll", "Company", "Extras"];

  return (
    <View style={styles.container}>
      {/* ================= HEADER ================= */}
      <View style={styles.header}>
        {/* CENTER TABS */}
        <View style={styles.tabsWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabs}
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab;

              return (
                <TouchableOpacity
                  key={tab}
                  disabled={tab !== "Dashboard"}
                  onPress={() => setActiveTab(tab)}
                  style={[
                    styles.tabItem,
                    isActive && styles.activeTabItem,
                  ]}
                >
                  <Text
                    style={[
                      styles.tabText,
                      isActive && styles.activeTabText,
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* RIGHT ICONS */}
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

      {/* ================= CONTENT ================= */}
      <View style={styles.content}>
        {activeTab === "Dashboard" && <Dashboard />}
      </View>
    </View>
  );
};

export default HrManagementLayout;

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.hrBg,
  },

  /* HEADER */
  header: {
    height: isMobile ? 82 : 96,
    backgroundColor: COLORS.white,
    paddingTop: isMobile ? 14 : 20,
    paddingBottom: 12,
    paddingHorizontal: isMobile ? 16 : 32,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.softGrayBg,
    justifyContent: "flex-end",
  },

  /* TABS */
  tabsWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
  },

  tabs: {
    flexDirection: "row",
    paddingHorizontal: isMobile ? 12 : 0,
  },

  tabItem: {
    paddingHorizontal: isMobile ? 16 : 22,
    paddingBottom: 10,
    alignItems: "center",
  },

  activeTabItem: {
    borderBottomWidth: 4,
    borderBottomColor: COLORS.accent,
  },

  tabText: {
    fontFamily: FONTS.productSans.medium,
    fontSize: isMobile ? 15 : 17,
    color: COLORS.textMuted,
    whiteSpace: "nowrap",
  },

  activeTabText: {
    fontFamily: FONTS.productSans.bold,
    color: COLORS.black,
  },

  /* ICONS */
  icons: {
    flexDirection: "row",
    alignItems: "center",
    gap: isMobile ? 12 : 16,
    alignSelf: "flex-end",
  },

  iconCircle: {
    width: isMobile ? 38 : 44,
    height: isMobile ? 38 : 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  notificationBg: {
    backgroundColor: COLORS.primary,
  },

  inboxBg: {
    backgroundColor: "#2FA84F",
  },

  icon: {
    width: isMobile ? 16 : 18,
    height: isMobile ? 16 : 18,
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
    width: isMobile ? 36 : 44,
    height: isMobile ? 36 : 44,
    borderRadius: 22,
  },

  /* CONTENT */
  content: {
    flex: 1,
    padding: isMobile ? 16 : 32,
    backgroundColor: COLORS.hrBg,
  },
});
