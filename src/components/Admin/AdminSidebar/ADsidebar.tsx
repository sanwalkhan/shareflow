// src/components/Admin/AdminSidebar/ADsidebar.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Wallet,
  Receipt,
  FileText,
  Star,
  History,
  Settings,
  LogOut,
  HelpCircle,
  MessageCircle,
} from "lucide-react-native";
import { COLORS } from "../../../Constants/theme";
import type { Tab } from "../../../Screens/AdminFolder/Admin";

interface SidebarProps {
  activeTab: Tab;
  onSelect?: (tab: Tab) => void;
}

const ADSidebar: React.FC<SidebarProps> = ({ activeTab, onSelect }) => {
  const [showLogout, setShowLogout] = useState(false);

  const menuItems = [
    { id: "Dashboard", title: "Dashboard", icon: <LayoutDashboard size={20} color="#fff" /> },
    { id: "Analytics", title: "Analytics", icon: <BarChart3 size={20} color="#fff" /> },
    { id: "Shareholder", title: "Shareholder", icon: <Users size={20} color="#fff" /> },
    { id: "Payroll", title: "Payroll", icon: <Wallet size={20} color="#fff" /> },
    { id: "Expenses", title: "Expenses", icon: <Receipt size={20} color="#fff" /> },
    { id: "Reports", title: "Reports", icon: <FileText size={20} color="#fff" /> },
    { id: "Favourite", title: "Favourite", icon: <Star size={20} color="#fff" /> },
    { id: "Messages", title: "Messages", icon: <MessageCircle size={20} color="#fff" /> },
    { id: "History", title: "History", icon: <History size={20} color="#fff" /> },
    { id: "Settings", title: "Settings", icon: <Settings size={20} color="#fff" /> },
    { id: "Help", title: "Help & Support", icon: <HelpCircle size={20} color="#fff" /> },
    { id: "Logout", title: "Logout", icon: <LogOut size={20} color="#fff" /> },
  ] as const;

  const handlePress = (id: Tab | "Logout") => {
    if (id === "Logout") {
      setShowLogout(true);
      return;
    }
    onSelect?.(id);
  };

  return (
    <View style={{ width: 280 }}>
      <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}><Text style={{ color: "#fff" }}>Share</Text><Text style={{ color: COLORS.button }}>Flow</Text></Text>
          <Text style={styles.sub}>Enterprise</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {menuItems.map(item => {
            const active = item.id === activeTab;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.menuItem, { backgroundColor: active ? COLORS.button : "transparent" }]}
                onPress={() => handlePress(item.id)}
              >
                {item.icon}
                <Text style={[styles.menuText, { marginLeft: 12 }]}>{item.title}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.profile}>
          <Image
            source={{ uri: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg" }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.name}>Sarah Chen</Text>
            <Text style={styles.role}>Director</Text>
          </View>
        </View>
      </LinearGradient>

      <Modal transparent visible={showLogout}>
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <Text style={styles.popupTitle}>Logout</Text>
            <Text style={styles.popupText}>Are you sure?</Text>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <TouchableOpacity onPress={() => setShowLogout(false)} style={styles.popupBtn}><Text>Cancel</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.popupBtn, { backgroundColor: COLORS.button }]} onPress={() => setShowLogout(false)}>
                <Text style={{ color: "#fff", fontWeight: "700" }}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ADSidebar;

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40, height: "100%" },
  header: { paddingHorizontal: 24, marginBottom: 24 },
  logo: { fontSize: 26, fontWeight: "700" },
  sub: { color: "#fff", opacity: 0.8 },
  menuItem: { flexDirection: "row", alignItems: "center", padding: 14, marginHorizontal: 16, borderRadius: 10 },
  menuText: { color: "#fff", fontSize: 15 },
  profile: { flexDirection: "row", padding: 16, alignItems: "center" },
  avatar: { width: 44, height: 44, borderRadius: 22, marginRight: 12 },
  name: { color: "#fff", fontWeight: "600" },
  role: { color: "#fff", opacity: 0.7, fontSize: 12 },
  overlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.4)" },
  popup: { backgroundColor: "#fff", padding: 20, borderRadius: 14, width: 280 },
  popupTitle: { fontSize: 18, fontWeight: "700" },
  popupText: { marginVertical: 12 },
  popupBtn: { flex: 1, padding: 12, borderRadius: 10, alignItems: "center" },
});
