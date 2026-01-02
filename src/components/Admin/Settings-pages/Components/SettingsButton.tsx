import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { SETTINGS_THEME } from "../../../../Constants/theme";

const SettingsButton = ({ title }: { title: string }) => {
  return (
    <TouchableOpacity style={styles.btn}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SettingsButton;

const styles = StyleSheet.create({
  btn: {
    height: SETTINGS_THEME.button.height,
    borderRadius: SETTINGS_THEME.button.radius,
    backgroundColor: SETTINGS_THEME.button.primaryBg,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  text: {
    color: SETTINGS_THEME.button.text,
    fontFamily: SETTINGS_THEME.fonts.subHeading,
    fontSize: 14,
  },
});
