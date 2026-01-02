// HrInput.tsx
import React from "react";
import { TextInput, View, Text, ViewStyle } from "react-native";
import { HR_THEME } from "../../../../Constants/theme";

type Props = {
  label?: string;
  value?: string;
  onChangeText?: (t: string) => void;
  placeholder?: string;
  style?: ViewStyle;
  multiline?: boolean;
  keyboardType?: any;
};

const HrInput: React.FC<Props> = ({
  label,
  value,
  onChangeText,
  placeholder,
  style,
  multiline,
  keyboardType,
}) => {
  return (
    <View style={{ marginBottom: 36 }}> {/* ✅ MORE SPACE BETWEEN FIELDS */}
      {label && (
        <Text
          style={{
            fontFamily: HR_THEME.fonts.heading,
            fontSize: 15,
            color: HR_THEME.text.primary,
            marginBottom: 18, // ✅ MORE SPACE LABEL → INPUT
          }}
        >
          {label}
        </Text>
      )}

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={HR_THEME.text.muted}
        keyboardType={keyboardType}
        multiline={multiline}
        style={[
          {
            backgroundColor: HR_THEME.input.bg,
            color: HR_THEME.input.textColor,
            borderRadius: HR_THEME.input.radius,
            padding: HR_THEME.input.padding,
            fontFamily: HR_THEME.fonts.body,
            minHeight: multiline ? 120 : 52,
          },
          style,
        ]}
      />
    </View>
  );
};

export default HrInput;
