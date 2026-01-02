import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  useWindowDimensions,
} from "react-native";

import { COLORS } from "../../../Constants/theme";

import General from "./General";
import User from "./User";
import Maintenance from "./Maintenance";

import Avatar from "../../../assets/profile.png";
import BellIcon from "../../../assets/bell.png";
import SearchIcon from "../../../assets/search.png";

const LIGHT_BG = "#f3f4f6";

const SettingsLayout = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const [activeTab, setActiveTab] = useState<
    "general" | "user" | "maintenance"
  >("general");

  const renderContent = () => {
    if (activeTab === "general") return <General />;
    if (activeTab === "user") return <User />;
    return <Maintenance />;
  };

  return (
    <View style={styles.container}>
      {/* TOP BAR */}
      <View style={[styles.topBar, isMobile && styles.topBarMobile]}>
        <View style={[styles.searchWrapper, isMobile && { width: "100%" }]}>
          <Image source={SearchIcon} style={styles.searchIcon} />
          <TextInput
            placeholder="Search here..."
            placeholderTextColor={COLORS.textMuted}
            style={styles.searchInput}
          />
        </View>

        <View style={styles.topRight}>
          <TouchableOpacity style={styles.bellWrapper}>
            <Image source={BellIcon} style={styles.bellIcon} />
          </TouchableOpacity>
          <Image source={Avatar} style={styles.avatar} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.contentWrapper}>
        {/* PAGE HEADER */}
        <View style={[styles.pageHeader, isMobile && styles.pageHeaderMobile]}>
          <View>
            <Text style={styles.pageTitle}>System Settings</Text>
            <Text style={styles.pageSubtitle}>
              Setup and edit system settings and preferences
            </Text>
          </View>

          <View style={[styles.searchSettingsWrapper, isMobile && { width: "100%" }]}>
            <Image source={SearchIcon} style={styles.searchIcon} />
            <TextInput
              placeholder="Search Settings"
              placeholderTextColor={COLORS.textMuted}
              style={styles.searchInput}
            />
          </View>
        </View>

        {/* TABS */}
        <View style={[styles.tabsWrapper, isMobile && { flexWrap: "wrap" }]}>
          <Tab label="General Settings" active={activeTab === "general"} onPress={() => setActiveTab("general")} />
          <Tab label="Users’ Settings" active={activeTab === "user"} onPress={() => setActiveTab("user")} />
          <Tab label="Maintenance" active={activeTab === "maintenance"} onPress={() => setActiveTab("maintenance")} />
        </View>

        {/* CONTENT */}
        <View style={styles.card}>{renderContent()}</View>
      </ScrollView>
    </View>
  );
};

export default SettingsLayout;

const Tab = ({ label, active, onPress }: any) => (
  <TouchableOpacity onPress={onPress} style={styles.tabItem}>
    <Text style={[styles.tabText, active && styles.tabActive]}>{label}</Text>
    {active && <View style={styles.activeLine} />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightBg },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderColor: COLORS.softGrayBg,
  },
  topBarMobile: { flexDirection: "column", gap: 12 },

  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: LIGHT_BG,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    width: 420,
  },

  searchSettingsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    width: 260,
    borderWidth: 1,
    borderColor: COLORS.softGrayBg,
  },

  searchIcon: { width: 18, height: 18, tintColor: COLORS.textMuted, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: COLORS.textPrimary },

  topRight: { flexDirection: "row", alignItems: "center", gap: 14 },
  bellWrapper: { width: 40, height: 40, borderRadius: 20, backgroundColor: LIGHT_BG, justifyContent: "center", alignItems: "center" },
  bellIcon: { width: 20, height: 20 },
  avatar: { width: 36, height: 36, borderRadius: 18 },

  contentWrapper: { padding: 24 },

  pageHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 24 },
  pageHeaderMobile: { flexDirection: "column", gap: 16 },

  pageTitle: { fontSize: 22, fontWeight: "700", color: COLORS.black,marginBottom:10},
  pageSubtitle: { fontSize: 14, color: COLORS.textMuted, marginTop: 8 },

  tabsWrapper: { flexDirection: "row", gap: 28, borderBottomWidth: 1, borderColor: COLORS.softGrayBg },
  tabItem: { paddingBottom: 12 },
  tabText: { fontSize: 14, color: COLORS.textMuted },
  tabActive: { color: COLORS.settings, fontWeight: "600" },
  activeLine: { height: 3, backgroundColor: COLORS.settings, marginTop: 6 },

  card: { backgroundColor: COLORS.white, borderRadius: 16, padding: 24, borderWidth: 1, borderColor: COLORS.softGrayBg },
});
