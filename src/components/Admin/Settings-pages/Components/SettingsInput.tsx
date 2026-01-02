import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { COLORS, SETTINGS_THEME } from "../../../../Constants/theme";

interface Props {
  value: string;
  placeholder?: string;
  multiline?: boolean;
}

const SettingsInput = ({ value, placeholder, multiline }: Props) => {
  return (
    <View style={styles.wrapper}>
      <TextInput
        value={value}
        placeholder={placeholder}
        multiline={multiline}
        style={[
          styles.input,
          multiline && { height: 80, textAlignVertical: "top" },
        ]}
        placeholderTextColor={SETTINGS_THEME.input.placeholder}
      />
    </View>
  );
};

export default SettingsInput;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  input: {
    height: SETTINGS_THEME.input.height,
    borderRadius: SETTINGS_THEME.input.radius,
    borderWidth: 1,
    borderColor: SETTINGS_THEME.input.border,
    paddingHorizontal: SETTINGS_THEME.input.paddingX,
    fontFamily: SETTINGS_THEME.fonts.body,
    fontSize: 14,
    color: SETTINGS_THEME.input.textColor,
    backgroundColor: SETTINGS_THEME.input.bg,
  },
});
