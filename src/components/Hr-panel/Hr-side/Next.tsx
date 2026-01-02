import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  useWindowDimensions,
} from "react-native";
import HrInput from "./Components/HrInput";
import HrButton from "./Components/HrButton";
import { COLORS } from "../../../Constants/theme";

const Next: React.FC = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [phone, setPhone] = useState("");
  const [relationship, setRelationship] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = () => {
    if (!name || !phone || !relationship || !address) {
      Alert.alert("Error", "Please fill all required fields.");
      return;
    }
    Alert.alert("Success", "Next of kin details updated successfully!");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.row, isMobile && styles.rowMobile]}>
        <View style={styles.flex}>
          <HrInput
            label="Next of kin name"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.flex}>
          <HrInput
            label="Job / Occupation"
            value={job}
            onChangeText={setJob}
          />
        </View>
      </View>

      <View style={[styles.row, isMobile && styles.rowMobile]}>
        <View style={styles.flex}>
          <HrInput
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.flex}>
          <HrInput
            label="Relationship"
            value={relationship}
            onChangeText={setRelationship}
          />
        </View>
      </View>

      <HrInput
        label="Residential Address"
        value={address}
        onChangeText={setAddress}
        multiline
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

export default Next;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: COLORS.white,
  },
  row: {
    flexDirection: "row",
    gap: 28,
  },
  rowMobile: {
    flexDirection: "column",
    gap: 16,
  },
  flex: {
    flex: 1,
  },
  updateButton: {
    width: 200,
    marginTop: 40,
  },
  updateButtonMobile: {
    width: "100%",
  },
});
