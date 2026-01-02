import React, { useState } from "react";
import {
  View,
  Text,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import HrButton from "./Components/HrButton";
import { HR_THEME } from "../../../Constants/theme";

type Props = {
  activePage: string;
  onChangePage: (page: string) => void;
};

const menuItems = [
  { key: "personal", label: "Personal Details", icon: "person" },
  { key: "contact", label: "Contact Details", icon: "phone" },
  { key: "next", label: "Next of Kin Details", icon: "group" },
  { key: "education", label: "Education Qualifications", icon: "school" },
  { key: "guarantor", label: "Guarantor Details", icon: "verified-user" },
  { key: "family", label: "Family Details", icon: "family-restroom" },
  { key: "jobdocs", label: "Job Details", icon: "work" },
  { key: "financial", label: "Financial Details", icon: "account-balance" },
];

const Sidebar: React.FC<Props> = ({ activePage, onChangePage }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [tooltip, setTooltip] = useState<string | null>(null);

  return (
    <View
      style={{
        width: isMobile ? 72 : 300,
        backgroundColor: "#fff",
        borderRadius: HR_THEME.card.radius,
        paddingVertical: 20,
        paddingHorizontal: isMobile ? 8 : 18,
        alignItems: "center",
      }}
    >
      {menuItems.map((item) =>
        isMobile ? (
          /* ---------------- MOBILE ICON MODE ---------------- */
          <Pressable
  key={item.key}
  onPress={() => onChangePage(item.key)}
  onPressIn={() => setTooltip(item.label)}
  onPressOut={() => setTooltip(null)}
  onLongPress={() => setTooltip(item.label)}
  style={{
    marginBottom: 16,
    alignItems: "center",
  }}
>
  <View
    style={{
      width: 48,
      height: 48,
      borderRadius: 14,
      backgroundColor:
        activePage === item.key
          ? HR_THEME.sidebar.activeBg
          : HR_THEME.sidebar.inactiveBg,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <MaterialIcons
      name={item.icon as any}
      size={22}
      color={HR_THEME.sidebar.textColor}
    />
  </View>

  {/* Tooltip */}
{tooltip === item.label && (
  <View
    style={{
      position: "absolute",
      bottom: 56, // ⬅ above icon
      backgroundColor: "#000",
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 6,
      zIndex: 999,
      maxWidth: 160,
      alignSelf: "center",
    }}
  >
    <Text
      style={{
        color: "#fff",
        fontSize: 12,
        textAlign: "center",
        fontFamily: HR_THEME.fonts.body,
      }}
    >
      {item.label}
    </Text>

    {/* Tooltip Arrow */}
    <View
      style={{
        position: "absolute",
        bottom: -6,
        left: "50%",
        marginLeft: -6,
        width: 0,
        height: 0,
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderTopWidth: 6,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderTopColor: "#000",
      }}
    />
  </View>
)}

</Pressable>

        ) : (
          /* ---------------- DESKTOP FULL MODE ---------------- */
          <HrButton
            key={item.key}
            title={item.label}
            active={activePage === item.key}
            onPress={() => onChangePage(item.key)}
            style={{ marginBottom: 14, width: "100%" }}
          />
        )
      )}
    </View>
  );
};

export default Sidebar;
