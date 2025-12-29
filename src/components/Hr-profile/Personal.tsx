import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { HR_THEME, COLORS } from "../../Constants/theme";

import Avatar from "../../assets/Avator.png";
import EditIcon from "../../assets/Vector.png";

const Personal: React.FC = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={[styles.card, isMobile && styles.cardMobile]}>
      <TouchableOpacity style={styles.editBtn}>
        <Image source={EditIcon} style={styles.editIcon} />
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>

      <View style={styles.avatarWrapper}>
        <Image source={Avatar} style={styles.avatar} />
      </View>

      <Text style={styles.label}>Employee Name</Text>
      <Text style={styles.name}>Biruk Dawit</Text>

      <Text style={styles.label}>Department</Text>
      <Text style={styles.value}>Design & Marketing</Text>

      <View style={[styles.row, isMobile && styles.rowMobile]}>
        <View style={styles.col}>
          <Text style={styles.label}>Job Title</Text>
          <Text style={styles.value}>UI / UX Designer</Text>
        </View>

        <View style={styles.col}>
          <Text style={styles.label}>Job Category</Text>
          <Text style={styles.value}>Full time</Text>
        </View>
      </View>
    </View>
  );
};

export default Personal;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: HR_THEME.card.radius,
    padding: 32,
    alignItems: "center",
  },
  cardMobile: {
    padding: 20,
  },
  editBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  editIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
  },
  editText: {
    fontSize: 14,
    color: COLORS.secondary,
  },
  avatarWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.button,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  label: {
    fontSize: 13,
    color: HR_THEME.text.muted,
    marginTop: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    marginTop: 24,
    width: "100%",
  },
  rowMobile: {
    flexDirection: "column",
    gap: 16,
  },
  col: {
    flex: 1,
    alignItems: "center",
  },
});
