import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { COLORS, SETTINGS_THEME } from "../../../../Constants/theme";
import SelectIcon from "./select.png";

type Props = {
  value: string;
  options: string[];
  onChange?: (val: string) => void;
};

const SettingsSelect = ({ value, options, onChange }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={{ marginBottom: 16 }}>
      {/* Select Box */}
      <Pressable onPress={() => setOpen(!open)} style={styles.container}>
        <Text style={styles.text}>{value}</Text>
        <Image source={SelectIcon} style={styles.icon} />
      </Pressable>

      {/* Dropdown */}
      {open && (
        <View style={styles.dropdown}>
          {options.map((item) => (
            <Pressable
              key={item}
              style={styles.option}
              onPress={() => {
                onChange?.(item);
                setOpen(false);
              }}
            >
              <Text style={styles.optionText}>{item}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

export default SettingsSelect;

const styles = StyleSheet.create({
  container: {
    height: SETTINGS_THEME.input.height,
    borderRadius: SETTINGS_THEME.input.radius,
    borderWidth: 1,
    borderColor: SETTINGS_THEME.input.border,
    backgroundColor: SETTINGS_THEME.input.bg,
    paddingHorizontal: SETTINGS_THEME.input.paddingX,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  text: {
    flex: 1,
    fontFamily: SETTINGS_THEME.fonts.body,
    fontSize: 14,
    color: COLORS.textPrimary,
  },

  icon: {
    width: 16,
    height: 16,
    tintColor: COLORS.textMuted,
    marginLeft: 8,
  },

  dropdown: {
    borderWidth: 1,
    borderColor: SETTINGS_THEME.input.border,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    marginTop: 4,
    overflow: "hidden",
  },

  option: {
    paddingVertical: 12,
    paddingHorizontal: 14,
  },

  optionText: {
    fontSize: 14,
    fontFamily: SETTINGS_THEME.fonts.body,
    color: COLORS.textPrimary,
  },
});
