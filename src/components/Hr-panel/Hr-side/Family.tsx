import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  View,
  useWindowDimensions,
} from "react-native";
import HrInput from "./Components/HrInput";
import HrButton from "./Components/HrButton";
import { COLORS, HR_THEME } from "../../../Constants/theme";

const Family: React.FC = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const [fullName, setFullName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleUpdate = () => {
    if (!fullName || !relationship || !phone || !address) {
      Alert.alert("Error", "Please fill all required fields.");
      return;
    }
    Alert.alert("Success", "Family details updated successfully!");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>View Family Details</Text>

      <HrInput
        label="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />

      <View style={[styles.row, isMobile && styles.rowMobile]}>
        <View style={styles.column}>
          <HrInput
            label="Relationship"
            value={relationship}
            onChangeText={setRelationship}
          />
        </View>

        <View style={styles.column}>
          <HrInput
            label="Phone No"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>
      </View>

      <HrInput
        label="Address"
        value={address}
        onChangeText={setAddress}
        multiline
      />

      <HrButton
        title="Update"
        active
        onPress={handleUpdate}
        style={[
          styles.updateButton,
          isMobile && styles.updateButtonMobile,
        ]}
      />
    </ScrollView>
  );
};

export default Family;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: COLORS.white,
    borderRadius: HR_THEME.card.radius,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 32,
  },
  row: {
    flexDirection: "row",
    gap: 24,
  },
  rowMobile: {
    flexDirection: "column",
    gap: 16,
  },
  column: {
    flex: 1,
  },
  updateButton: {
    width: 260,
    marginTop: 24,
  },
  updateButtonMobile: {
    width: "100%",
  },
});
