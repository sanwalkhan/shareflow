import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Modal,
  useWindowDimensions,
} from "react-native";
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
  X,
  MessageCircle,
} from "lucide-react-native";
import { COLORS } from "../../Constants/theme";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { width: screenWidth } = useWindowDimensions();
  const mobile = screenWidth < 700;

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
  }, [open, mobile]);

  const currentTab = route.name;

  const menuItems = [
    { id: "ShareholderDashboard", title: "Dashboard", icon: <LayoutDashboard size={20} color={COLORS.white}
  /> },
    { id: "ShareholderAnalytic", title: "Analytics", icon: <BarChart3 size={20} color={COLORS.white} /> },
    { id: "Shareholder", title: "Shareholder", icon: <Users size={20} color={COLORS.white} /> },
    { id: "Shareholderpayrol", title: "Payroll", icon: <Wallet size={20} color={COLORS.white} /> },
    { id: "Expenses", title: "Expenses", icon: <Receipt size={20} color={COLORS.white} /> },
    { id: "ShareholderReport", title: "Reports", icon: <FileText size={20} color={COLORS.white} /> },
    { id: "Shareholderfvrt", title: "Favourite", icon: <Star size={20} color={COLORS.white} /> },
    { id: "ShareholderMessage", title: "Messages", icon: <MessageCircle size={20} color={COLORS.white} />, badge: 1 },
    { id: "ShareholderHistory", title: "History", icon: <History size={20} color={COLORS.white} /> },
    { id: "Shareholdersetting", title: "Settings", icon: <Settings size={20} color={COLORS.white} /> },
  ];

  const bottomItems = [
    { id: "help", title: "Help & Support", icon: <HelpCircle size={20} color="#fff" /> },
    { id: "logout", title: "Logout", icon: <LogOut size={20} color="#fff" /> },
  ];

  const handlePress = (id: string) => {
    if (id === "logout") {
      setShowLogout(true);
      return;
    }
    if (id === "help") {
      navigation.navigate("ShareholderHelp");
    } else {
      navigation.navigate(id as any);
    }
    mobile && onClose?.();
  };

  const renderItem = (item: any) => {
    const active = currentTab === item.id;
    return (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.menuItem,
          { backgroundColor: active ? COLORS.button : "transparent" },
        ]}
        onPress={() => handlePress(item.id)}
      >
        <View style={styles.iconBox}>{item.icon}</View>
        <Text style={[styles.menuText, { color: active ? COLORS.accent : "#fff" }]}>
          {item.title}
        </Text>
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
      <Animated.View
        style={[
          styles.wrapper,
          { transform: [{ translateX }] },
          mobile && { position: "absolute", zIndex: 999 },
        ]}
      >
  <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.logo}>
             <Text style={{ color: COLORS.white }}>Share</Text>
 
              <Text style={{ color: COLORS.button }}>Flow</Text>
            </Text>
            {/* Close button on mobile */}
            {mobile && open && (
              <TouchableOpacity style={styles.close} onPress={onClose}>
                <X size={22} color={COLORS.white} />
              </TouchableOpacity>
            )}
          </View>

          {/* Menu Items */}
         {/* Menu Items */}
<Animated.ScrollView
  style={{ flex: 1 }}
  contentContainerStyle={{ paddingBottom: 16 }}
  showsVerticalScrollIndicator={false}
>
  {menuItems.map(renderItem)}
  <View style={styles.divider} />
  {bottomItems.map(renderItem)}
</Animated.ScrollView>


          {/* Profile */}
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
      </Animated.View>

      {/* Logout Modal */}
      <Modal transparent visible={showLogout} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <Text style={styles.popupTitle}>Logout</Text>
            <Text style={styles.popupText}>Are you sure you want to logout?</Text>
 
            <View style={styles.popupBtns}>
             <TouchableOpacity
  style={[styles.popupBtn, { backgroundColor: COLORS.popupButtonBackground }]}
  onPress={() => setShowLogout(false)}
>
  <Text style={{ color: COLORS.popupButtonText }}>Cancel</Text>
</TouchableOpacity>
 
 
              <TouchableOpacity
                style={[styles.popupBtn, { backgroundColor: COLORS.button }]}
                onPress={() => {
                  setShowLogout(false);
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "Login" as any }],
                  });
                }}
              >
                <Text style={{ fontWeight: "700" }}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: { width: 280, height: "100%" },
  container: { flex: 1, paddingTop: 40, paddingBottom: 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 24,
    justifyContent: "space-between",
  },
  logo: { fontSize: 26, fontWeight: "700" },
  close: { padding: 4 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    marginHorizontal: 16,
    borderRadius: 10,
    marginBottom: 4,
  },
  iconBox: { width: 26, marginRight: 12 },
  menuText: { fontSize: 15, flex: 1 },
  badge: {
    backgroundColor: COLORS.danger, // red badge from theme
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { color: COLORS.white, fontSize: 10 }, // theme white
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.2)", // semi-transparent white, optional to keep
    marginVertical: 16,
    marginHorizontal: 20,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.1)", // semi-transparent white, can create theme color if needed
  },
  avatar: { width: 44, height: 44, borderRadius: 22, marginRight: 12 },
  name: { color: COLORS.white, fontWeight: "600" }, // theme white
  role: { color: COLORS.white, opacity: 0.7, fontSize: 12 }, // theme white with opacity
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)", // can keep as-is or create theme.overlay
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    width: "85%",
    maxWidth: 320,
    backgroundColor: COLORS.white, // theme white
    borderRadius: 16,
    padding: 20,
  },
  popupTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  popupText: { fontSize: 14, marginBottom: 16 },
  popupBtns: { flexDirection: "row", gap: 12 },
  popupBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
});
