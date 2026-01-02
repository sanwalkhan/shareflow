import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { SETTINGS_THEME } from "../../../../Constants/theme";

const SettingsToggle = ({ enabled }: { enabled: boolean }) => {
  const [isOn, setIsOn] = useState(enabled);
  const translateX = useState(new Animated.Value(enabled ? 20 : 0))[0];

  const toggle = () => {
    Animated.timing(translateX, {
      toValue: isOn ? 0 : 20,
      duration: 180,
      useNativeDriver: true,
    }).start();

    setIsOn(!isOn);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={toggle}
      style={[
        styles.toggle,
        {
          backgroundColor: isOn
            ? SETTINGS_THEME.toggle.active
            : SETTINGS_THEME.toggle.inactive,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.dot,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </TouchableOpacity>
  );
};

export default SettingsToggle;

const styles = StyleSheet.create({
  toggle: {
    width: 42,
    height: 22,
    borderRadius: 22,
    padding: 3,
    justifyContent: "center",
  },

  dot: {
    width: 16,
    height: 16,
    backgroundColor: "#fff",
    borderRadius: 16,

    /* subtle shadow like native toggles */
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
});
