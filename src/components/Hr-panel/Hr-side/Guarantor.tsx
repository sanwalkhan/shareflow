import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  useWindowDimensions,
} from "react-native";
import HrInput from "./Components/HrInput";
import HrButton from "./Components/HrButton";
import { COLORS, HR_THEME } from "../../../Constants/theme";

const Guarantor: React.FC = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    if (!name || !job || !phone) {
      Alert.alert("Error", "Please fill all required fields.");
      return;
    }
    Alert.alert("Success", "Guarantor details updated successfully!");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>View Guarantor Details</Text>

      <HrInput
        label="Guarantor’s Name"
        value={name}
        onChangeText={setName}
      />

      <HrInput
        label="Job title / Occupation"
        value={job}
        onChangeText={setJob}
      />

      <HrInput
        label="Phone No"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <HrButton
        title="Update"
        active
        onPress={handleSubmit}
        style={[
          styles.updateButton,
          isMobile && styles.updateButtonMobile,
        ]}
      />
    </ScrollView>
  );
};

export default Guarantor;

const styles = StyleSheet.create({
  container: {
    padding: 32,
    backgroundColor: COLORS.white,
    borderRadius: HR_THEME.card.radius,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 36,
  },
  updateButton: {
    width: 260,
    marginTop: 24,
  },
  updateButtonMobile: {
    width: "100%",
  },
});
