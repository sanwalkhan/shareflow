// src/components/Admin/AdminSidebar/ADsidebar.tsx
import React, { useRef, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated, Modal, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { LayoutDashboard, BarChart3, Users, Wallet, Receipt, FileText, Star, History, Settings, LogOut, HelpCircle, X, MessageCircle } from "lucide-react-native";
import { COLORS } from "../../../Constants/theme";
import { Tab } from "../../../Screens/AdminFolder/Admin";

interface SidebarProps {
  mobile?: boolean;
  open?: boolean;
  onClose?: () => void;
  activeTab: Tab;
  setActiveTab: React.Dispatch<React.SetStateAction<Tab>>;
}

const ADSidebar: React.FC<SidebarProps> = ({ mobile, open, onClose, activeTab, setActiveTab }) => {
  const translateX = useRef(new Animated.Value(mobile ? -280 : 0)).current;
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    if (mobile) {
      Animated.timing(translateX, {
        toValue: open ? 0 : -280,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [open]);

  const menuItems = [
    { id: "Dashboard", title: "Dashboard", icon: <LayoutDashboard size={20} color="#fff" /> },
    { id: "Analytics", title: "Analytics", icon: <BarChart3 size={20} color="#fff" /> },
    { id: "Shareholder", title: "Shareholder", icon: <Users size={20} color="#fff" /> },
    { id: "Payroll", title: "Payroll", icon: <Wallet size={20} color="#fff" /> },
    { id: "Expenses", title: "Expenses", icon: <Receipt size={20} color="#fff" /> },
    { id: "Reports", title: "Reports", icon: <FileText size={20} color="#fff" /> },
    { id: "Favourite", title: "Favourite", icon: <Star size={20} color="#fff" /> },
    { id: "Messages", title: "Messages", icon: <MessageCircle size={20} color="#fff" />, badge: 1 },
    { id: "History", title: "History", icon: <History size={20} color="#fff" /> },
    { id: "Settings", title: "Settings", icon: <Settings size={20} color="#fff" /> },
    { id: "Help", title: "Help & Support", icon: <HelpCircle size={20} color="#fff" /> },
    { id: "Logout", title: "Logout", icon: <LogOut size={20} color="#fff" /> },
  ];

  const handlePress = (id: Tab | "Logout") => {
    if (id === "Logout") {
      setShowLogout(true);
      return;
    }
    setActiveTab(id);
    mobile && onClose?.();
  };

  const renderItem = (item: typeof menuItems[0]) => {
    const active = item.id === activeTab;

    return (
      <TouchableOpacity
        key={item.id}
        style={[styles.menuItem, { backgroundColor: active ? COLORS.button : "transparent" }]}
        onPress={() => handlePress(item.id as Tab | "Logout")}
      >
        <View style={styles.iconBox}>{item.icon}</View>
        <Text style={[styles.menuText, { color: active ? COLORS.accent : "#fff" }]}>{item.title}</Text>
        {item.badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <>
      {mobile && open && <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />}
      <Animated.View style={[styles.wrapper, { transform: [{ translateX }] }, mobile && { position: "absolute", zIndex: 999, width: 280 }]}>
        <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={styles.container}>
          {mobile && (
            <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.7}>
              <X size={24} color="#fff" />
            </TouchableOpacity>
          )}
          <View style={styles.header}>
            <Text style={styles.logo}>
              <Text style={{ color: "#fff" }}>Share</Text>
              <Text style={{ color: COLORS.button }}>Flow</Text>
            </Text>
            <Text style={styles.sub}>Enterprise</Text>
          </View>
          <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContentContainer}>
            {menuItems.map(renderItem)}
            {mobile && <View style={{ height: 20 }} />}
          </ScrollView>
          <View style={styles.profile}>
            <Image source={{ uri: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg" }} style={styles.avatar} />
            <View>
              <Text style={styles.name}>Sarah Chen</Text>
              <Text style={styles.role}>Director</Text>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>

      <Modal transparent visible={showLogout} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <Text style={styles.popupTitle}>Logout</Text>
            <Text style={styles.popupText}>Are you sure you want to logout?</Text>
            <View style={styles.popupBtns}>
              <TouchableOpacity style={[styles.popupBtn, { backgroundColor: "#e5e7eb" }]} onPress={() => setShowLogout(false)}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.popupBtn, { backgroundColor: COLORS.button }]} onPress={() => { setShowLogout(false); alert("Logged out!"); }}>
                <Text style={{ fontWeight: "700", color: "#fff" }}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ADSidebar;

const styles = StyleSheet.create({
  wrapper: { width: 280, height: "100%" },
  container: { flex: 1, paddingTop: 40, paddingBottom: 20 },
  header: { paddingHorizontal: 24, marginBottom: 24 },
  logo: { fontSize: 26, fontWeight: "700" },
  sub: { color: "#fff", opacity: 0.8 },
  backdrop: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 998 },
  closeButton: { position: "absolute", top: 50, right: 12, zIndex: 1000, backgroundColor: "rgba(255,255,255,0.3)", borderRadius: 22, padding: 12, width: 48, height: 48, justifyContent: "center", alignItems: "center" },
  scrollContent: { flex: 1 },
  scrollContentContainer: { paddingBottom: 8 },
  menuItem: { flexDirection: "row", alignItems: "center", padding: 14, marginHorizontal: 16, borderRadius: 10, marginBottom: 4 },
  iconBox: { width: 26, marginRight: 12 },
  menuText: { fontSize: 15, flex: 1 },
  badge: { backgroundColor: "#ef4444", width: 18, height: 18, borderRadius: 9, alignItems: "center", justifyContent: "center" },
  badgeText: { color: "#fff", fontSize: 10 },
  profile: { flexDirection: "row", alignItems: "center", padding: 16, marginHorizontal: 16, marginTop: 12, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.1)" },
  avatar: { width: 44, height: 44, borderRadius: 22, marginRight: 12 },
  name: { color: "#fff", fontWeight: "600" },
  role: { color: "#fff", opacity: 0.7, fontSize: 12 },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", alignItems: "center" },
  popup: { width: "85%", maxWidth: 320, backgroundColor: "#fff", borderRadius: 16, padding: 20 },
  popupTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  popupText: { fontSize: 14, marginBottom: 16 },
  popupBtns: { flexDirection: "row", gap: 12 },
  popupBtn: { flex: 1, paddingVertical: 12, borderRadius: 10, alignItems: "center" },
});
