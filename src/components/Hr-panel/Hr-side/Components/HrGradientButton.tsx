import React from "react";
import { Text, Pressable, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { HR_THEME } from "../../../../Constants/theme";

type Props = {
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
};

const HrGradientButton: React.FC<Props> = ({ title, onPress, style }) => {
  return (
    <Pressable onPress={onPress} style={[{ borderRadius: 15 }, style]}>
      <LinearGradient
        colors={["#121C3E", "#28A745"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          height: HR_THEME.sidebar.itemHeight,
          borderRadius: HR_THEME.sidebar.radius,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontFamily: HR_THEME.fonts.heading,
            fontSize: 16,
            fontWeight: "700",
            color: "#FFFFFF",
          }}
        >
          {title}
        </Text>
      </LinearGradient>
    </Pressable>
  );
};

export default HrGradientButton;
