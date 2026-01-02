import React from "react";
import { Text, Pressable, ViewStyle } from "react-native";
import { HR_THEME } from "../../../../Constants/theme";

type Props = {
  title: string;
  active?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
};

const HrButton: React.FC<Props> = ({ title, active, onPress, style }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          height: HR_THEME.sidebar.itemHeight,
          borderRadius: HR_THEME.sidebar.radius,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: active
            ? HR_THEME.sidebar.activeBg
            : HR_THEME.sidebar.inactiveBg,
        },
        style,
      ]}
    >
      <Text
        style={{
          fontFamily: active
            ? HR_THEME.fonts.heading
            : HR_THEME.fonts.body,
          fontWeight: active ? "700" : "600",
          color: HR_THEME.sidebar.textColor,
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default HrButton;
