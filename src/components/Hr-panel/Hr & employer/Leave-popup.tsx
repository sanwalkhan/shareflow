import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from "react-native";

import { COLORS, HR_MANAGEMENT_THEME } from "../../../Constants/theme";
import like from "../../../assets/like.png";

interface LeavePopupProps {
  visible: boolean;
  onClose: () => void;
}

const LeavePopup: React.FC<LeavePopupProps> = ({ visible, onClose }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      {/* Overlay */}
      <View style={styles.overlay}>
        {/* Card */}
        <View
          style={[
            styles.card,
            isMobile && { width: "90%", padding: 24 },
          ]}
        >
          {/* Icon */}
          <Image source={like} style={styles.icon} />

          {/* Text */}
          <Text style={styles.title}>Great Job!</Text>
          <Text style={styles.message}>
            Your leave application would{"\n"}
            be reviewed by the admin.
          </Text>

          {/* Button */}
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LeavePopup;

/* ===========================
   STYLES
=========================== */

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    width: 420,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 15,
  },

  icon: {
    width: 110,
    height: 110,
    resizeMode: "contain",
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1242EB",
    marginBottom: 10,
    textAlign: "center",
  },

  message: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: 26,
  },

  button: {
    width: "100%",
    backgroundColor: "#1242EB",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
