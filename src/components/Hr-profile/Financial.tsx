import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import HrInput from "./Components/HrInput";
import HrButton from "./Components/HrButton";
import { COLORS, HR_THEME } from "../../Constants/theme";

const Financial: React.FC = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const [bank, setBank] = useState("");
  const [account, setAccount] = useState("");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Financial Details</Text>

      <HrInput label="Bank Name" value={bank} onChangeText={setBank} />
      <HrInput
        label="Account Number"
        value={account}
        onChangeText={setAccount}
      />

      <HrButton
        title="Update"
        active
        style={[
          styles.button,
          isMobile && styles.buttonMobile,
        ]}
      />
    </ScrollView>
  );
};

export default Financial;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: COLORS.white,
    borderRadius: HR_THEME.card.radius,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 24,
  },
  button: {
    width: 260,
    alignSelf: "center",
    marginTop: 32,
  },
  buttonMobile: {
    width: "100%",
  },
});
