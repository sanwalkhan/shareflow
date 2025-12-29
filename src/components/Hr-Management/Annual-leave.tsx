import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../Constants/theme";
import Leave from "./Leave";


const Annual: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dashboard</Text>
    </View>
  );
};

export default Annual;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.hrBg,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 22,
    fontWeight: "600",
    color: COLORS.black,
  },
});
